import { postRead, postReadByPK } from "../Infrastructure/post.js";
import { userReportRead, userReportReadById } from "../Infrastructure/userReport.js";
import { postReportRead, postReportReadByID } from "../Infrastructure/postReport.js";
import { sendEntFetchRequest } from "../utilities/message_brokers/rabbitmq.js";
import processReportValidate from "../Contracts/processReport.js";
import { sendBanUserRequest } from "../utilities/message_brokers/rabbitmq.js";
import { Op } from "sequelize";

export async function getAllPosts(req,res) {
    const validOrderTypes = ["postDate","views","likes"];
    
    if (!validOrderTypes.includes(req.query.order)) return res.status(400).json({error:"invalid order type",validOrderType:validOrderTypes});
    
    const Posts = await postRead({}, req.query.limit, req.query.offset,req.query.order);

    const MorePosts = await postRead({}, 1, req.query.offset+req.query.limit,req.query.order);
    const hasMore = MorePosts.length==0? false:true;

    return res.status(200).json({
        hasMore:hasMore,
        data: Posts
    });
}

export async function getUserReports(req,res) {

    const userReports = await userReportRead(req.condition, req.query.limit, req.query.offset);

    const userIDs = [];
    userReports.forEach(report => {
        userIDs.push(report.reportedID);
        userIDs.push(report.userID);
    });

    const response = await sendEntFetchRequest(userIDs,"user");
    if (response.error) return res.status(500).json({"error": response.error});

    const findUserUsername = userID => {
        // console.log(userID)
        let answer;
        response.users.forEach(rabbitMQresponse => {
            // console.log(rabbitMQresponse)
            if (rabbitMQresponse.id == userID) answer = rabbitMQresponse.username;
        })
        return answer;
    }

    const responses = [];

    userReports.forEach(report => {
        let response = report.toJSON();
        response.userID = {
            id: report.userID,
            username: findUserUsername(report.userID)
        };
        response.reportedID = {
            id: report.reportedID,
            username: findUserUsername(report.reportedID)
        }
        responses.push(response);
    });


    const MoreReports = await userReportRead(req.condition, 1, req.query.offset+req.query.limit);
    const hasMore = MoreReports.length==0? false:true;

    return res.status(200).json({
        hasMore:hasMore,
        data: responses
    });
}

export async function getPendingReports(req,res, next) {

    req.condition = {reportState:"Pending"};

    next();
    
    // const userReports = await userReportRead({reportState:"Pending"}, req.query.limit, req.query.offset);

    // const userIDs = [];
    // userReports.forEach(report => {
    //     userIDs.push(report.reportedID);
    //     userIDs.push(report.userID);
    // });

    // const response = await sendEntFetchRequest(userIDs,"user");
    // if (response.error) return res.status(500).json({"error": response.error});

    // const findUserUsername = userID => {
    //     // console.log(userID)
    //     let answer;
    //     response.users.forEach(rabbitMQresponse => {
    //         // console.log(rabbitMQresponse)
    //         if (rabbitMQresponse.id == userID) answer = rabbitMQresponse.username;
    //     })
    //     return answer;
    // }

    // const responses = [];

    // userReports.forEach(report => {
    //     let response = report.toJSON();
    //     response.userID = {
    //         id: report.userID,
    //         username: findUserUsername(report.userID)
    //     };
    //     response.reportedID = {
    //         id: report.reportedID,
    //         username: findUserUsername(report.reportedID)
    //     }
    //     responses.push(response);
    // });


    // const MoreReports = await userReportRead({reportState:"Pending"}, 1, req.query.offset+req.query.limit);
    // const hasMore = MoreReports.length==0? false:true;

    // return res.status(200).json({
    //     hasMore:hasMore,
    //     data: responses
    // });
}

export async function getHistoryReports(req,res,next) {

    req.condition = {reportState:{[Op.in]: ["Accepted","Ignored"]}};

    next();
    
    // const userReports = await userReportRead({reportState:{[Op.in]: ["Accepted","Ignored"]}}, req.query.limit, req.query.offset);

    // const MoreReports = await userReportRead({reportState:{[Op.in]: ["Accepted","Ignored"]}}, 1, req.query.offset+req.query.limit);
    // const hasMore = MoreReports.length==0? false:true;

    // return res.status(200).json({
    //     hasMore:hasMore,
    //     data: userReports
    // });
}

export async function getPostReports(req,res) {

    const postReports = await postReportRead(req.condition, req.query.limit, req.query.offset);

    const userIDs = [];
    postReports.forEach(report => {
        userIDs.push(report.reportedID);
        userIDs.push(report.userID);
    });

    const response = await sendEntFetchRequest(userIDs,"user");
    if (response.error) return res.status(500).json({"error": response.error});

    const findUserUsername = userID => {
        // console.log(userID)
        let answer;
        response.users.forEach(rabbitMQresponse => {
            // console.log(rabbitMQresponse)
            if (rabbitMQresponse.id == userID) answer = rabbitMQresponse.username;
        })
        return answer;
    }

    const responses = [];

    postReports.forEach(report => {
        let response = report.toJSON();
        response.userID = {
            id: report.userID,
            username: findUserUsername(report.userID)
        };
        responses.push(response);
    });


    const MoreReports = await postReportRead(req.condition, 1, req.query.offset+req.query.limit);
    const hasMore = MoreReports.length==0? false:true;

    return res.status(200).json({
        hasMore:hasMore,
        data: responses
    });
}

export async function processPostReport(req,res) {
    
    const {error} = processReportValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    let report = await postReportReadByID(req.body.reportID);
    if (!report) return res.status(404).json({"error": "report not found"});
    if (!report.reportState=="Pending") return res.status(400).json({"error": "report has already been answered"});

    report.reportState = req.body.status;
    await report.save();

    if (req.body.status == "Accepted") {

        let reportedPost = await postReadByPK(report.reportedID);

        reportedPost.is_banned = true;
        await reportedPost.save();
    }

    return res.status(200).json({success:true});
}

export async function processUserReport(req,res) {
    
    const {error} = processReportValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    let report = await userReportReadById(req.body.reportID);
    if (!report) return res.status(404).json({"error": "report not found"});
    if (!report.reportState=="Pending") return res.status(400).json({"error": "report has already been answered"});

    report.reportState = req.body.status;
    await report.save();

    // if (req.body.status == "Accepted") {

    //     let reportedPost = await postReadByPK(report.reportedID);

    //     reportedPost.is_banned = true;
    //     await reportedPost.save();
    // }
    const response = await sendBanUserRequest(report.reportedID);
    if (response.error) return res.status(500).json({error:response.error});

    return res.status(200).json({success:true});
}