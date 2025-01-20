import { postCreate, postRead, postReadByPK, postCommentNum } from "../Infrastructure/post.js";
import postValidate from "../Contracts/post.js";
import fileValidate from "../Contracts/file.js";
import grpcClient from "../utilities/message_brokers/grpc.js";
import logger from "../utilities/loggers/generalLogger.js";
import { extractPostTags } from "./tag.js";
import { postLikesRead } from "../Infrastructure/postLikes.js";
import { postBookmarkRead } from "../Infrastructure/postBookmarks.js"
import { sendUserValidationRequest } from "../utilities/message_brokers/rabbitmq.js";
// import { sendEntFetchRequest } from "../utilities/message_brokers/rabbitmq.js";
import { postViewsCreate } from "../Infrastructure/postViews.js"
import { Op } from "sequelize";
// import findPostAuthor from "./postAuthor.js"
import { notifCreate } from "../Infrastructure/notif.js";
import validateSearchPost from "../Contracts/searchPost.js"
import objectIDValidate from "../Contracts/objectID.js";
import { extractPostMentions } from "./user.js";

export async function createPost(req, res) {

    let reqData = JSON.parse(req.body.reqData);

    const {error} = postValidate(reqData);
    if (error) return res.status(400).json({"error": error.details});
    if (reqData.quotedFrom && reqData.repliesTo) return res.status(400).json({"error": "post can not have both quote and reply params"});

    if (req.file && !fileValidate(req.file, ["image", "video"])) return res.status(400).json({ "error": "file media type is not corerect" });

    reqData.userID = req.user.id;
    reqData.postDate = Date.now();

    if (reqData.quotedFrom) {
        const quote = await postReadByPK(reqData.quotedFrom);
        if (!quote) return res.status(404).json({"error":"quote not found"})
        reqData.postType = "Quote";
    } else if (reqData.repliesTo) {
        const reply = await postReadByPK(reqData.repliesTo);
        if (!reply) return res.status(404).json({"error":"reply not found"})
        reply.comments++;
        reply.save();
        reqData.postType = "Comment";
        await notifCreate({ userID: reply.userID, content: `@${req.user.username} has commented on one of your posts` });
    } else {
        reqData.postType = "Post";
    }

    let post = await postCreate(reqData);

    extractPostTags(post.content, post.id);
    extractPostMentions(post.content, post.id, req.user.username);

    if (req.file) {

        const grpcRequest = {
            file: req.file.buffer,
            filename: req.file.filename,
            originalname: req.file.originalname,
            uploadedBy: req.user?.id || 'anonymous',
        };

        grpcClient.UploadFile(grpcRequest, async (err, response) => {
            if (err) {
                logger.error('gRPC upload failed', err);
                return res.status(500).send('Failed to upload file.');
            }

            logger.info("File uploaded via gRPC", response);

            post.mediaFileName = response.filename;
            post.mediaType = req.file.mimetype.split("/")[0];
            post = await post.save();

            return res.status(200).json(post);
        });
    } else {

        return res.status(200).json(post);
    }
}

export async function getPost(req, res) {

    const { error } = objectIDValidate({id:req.params.id});
    if (error) return res.status(400).json({ "error": error.details });

    let post = await postReadByPK(req.params.id);
    if (!post) return res.status(404).json({"error":"post not found"})

    post.views++;
    await postViewsCreate({userID: req.user.id, postID: post.id});
    post = await post.save();

    post = post.toJSON();

    // post.commentNum = await postCommentNum(post.id);

    const postLike = await postLikesRead({userID:req.user.id, postID: post.id});
    post.isLiked = postLike.length == 0 ? false:true;

    const postBookmark = await postBookmarkRead({userID:req.user.id, postID: post.id});
    post.isBookmarked = postBookmark.length == 0 ? false:true;

    const response = await sendUserValidationRequest(post.userID, "id");
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(500).json({"error": `userID(${post.userID}) in post with id ${post.id} is incorrect`});

    post.author = {
        userID: response.user.id,
        name: response.user.name,
        username: response.user.name,
        profilePic: response.user.profilePic,
    }

    return res.status(200).json(post);
}

export async function getPostInFeed(req, res, next) {

    // version 1.0 => recomands recently uploaded posts

    req.condition = { postType: { [Op.in]: ["Post","Quote"] } };

    next();

    // const postLikes = await postLikesRead({userID:req.user.id});
    // let userLikes = [];
    // postLikes.forEach(postLike => userLikes.push(postLike.postID));

    // const postBookmarks = await postBookmarkRead({userID:req.user.id});
    // let userBookmarks = [];
    // postBookmarks.forEach(postBookmark => userBookmarks.push(postBookmark.postID));
    
    // const posts = await postRead({ postType: { [Op.in]: ["Post","Quote"] } } , req.query.limit, req.query.offset);

    // let userIDs = [];
    // posts.forEach(post => userIDs.push(post.userID));
    
    // const rabbitMQresponses = await sendEntFetchRequest(userIDs,"user");
    // if (rabbitMQresponses.error) return res.status(500).json({"error": rabbitMQresponses.error});

    // // console.log(rabbitMQresponses)

    // // const findPostAuthor = postUserID => {
    // //     // console.log(postUserID)
    // //     let answer;
    // //     rabbitMQresponses.users.forEach(rabbitMQresponse => {
    // //         // console.log(rabbitMQresponse)
    // //         if (rabbitMQresponse.id == postUserID) answer = rabbitMQresponse;
    // //     })
    // //     return answer;
    // // }

    // let responses = [];
    // posts.forEach(post => {
    //     let response = post.toJSON();
    //     response.isLiked = userLikes.includes(response.id)? true:false;
    //     response.isBookmarked = userBookmarks.includes(response.id)? true:false;
    //     const postAuthor = findPostAuthor(response.userID,rabbitMQresponses);
    //     response.author = {
    //         userID: postAuthor.id,
    //         name: postAuthor.name,
    //         username: postAuthor.name,
    //         profilePic: postAuthor.profilePic,
    //     };
    //     responses.push(response);
    // });

    // const morePosts = await postRead({ postType: { [Op.in]: ["Post","Quote"] } } , 1, req.query.offset+req.query.limit);
    // const hasMore = morePosts.length == 0 ? false:true;

    // return res.status(200).json({
    //     hasMore: hasMore,
    //     data: responses
    // });
}

export async function getPostComments(req,res,next) {

    const { error } = objectIDValidate({id:req.query.id});
    if (error) return res.status(400).json({ "error": error.details });

    req.condition = {
        postType: "Comment",
        repliesTo: req.query.id
    };

    next();
    
    // const comments = await postRead({
    //     postType: "Comment",
    //     repliesTo: req.query.id
    // },req.query.limit, req.query.offset);

    // let userIDs = [];
    // comments.forEach(comment => userIDs.push(comment.userID));

    // const rabbitMQresponses = await sendEntFetchRequest(userIDs,"user");
    // if (rabbitMQresponses.error) return res.status(500).json({"error": rabbitMQresponses.error});

    // let responses = [];
    // comments.forEach(comment => {
    //     let response = comment.toJSON();
    //     const commentAuthor = findPostAuthor(response.userID,rabbitMQresponses);
    //     response.author = {
    //         userID: commentAuthor.id,
    //         name: commentAuthor.name,
    //         username: commentAuthor.name,
    //         profilePic: commentAuthor.profilePic,
    //     };
    //     responses.push(response);
    // });

    // const moreComments = await postRead({
    //     postType: "Comment",
    //     repliesTo: req.query.id
    // } , 1, req.query.offset+req.query.limit);
    // const hasMore = moreComments.length == 0 ? false:true;

    // return res.status(200).json({
    //     hasMore: hasMore,
    //     data: responses
    // });
}

export async function searchPost(req,res,next) {

    const err = validateSearchPost(req.query.userID, req.query.content, req.query.startDate, req.query.endDate);
    if (err) return res.status(400).json({error:err});

    // let searchCondition;

    if (req.query.userID) {
        const { error } = objectIDValidate({id:req.query.userID});
        if (error) return res.status(400).json({ "error": error.details });
        req.condition = {userID: req.query.userID}
    } else {
        if (!req.query.startDate || !req.query.endDate) {
            req.condition = { 
                content: { [Op.iLike]: `%${req.query.content}%` }
            };
        } else {
            req.condition = { 
                postDate: { [Op.between]: [req.query.startDate, req.query.endDate] },
                content: { [Op.iLike]: `%${req.query.content}%` }
            };
        }
    }

    next();

    // const posts = await postRead(searchCondition, req.query.limit, req.query.offset);

    // const morePosts = await postRead(searchCondition, 1, req.query.offset+req.query.limit);
    // const hasMore = morePosts.length == 0 ? false:true;
    
    // return res.status(200).json({
    //     hasMore: hasMore,
    //     data: posts
    // });
}