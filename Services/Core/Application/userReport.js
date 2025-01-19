import { userReportCreate } from "../Infrastructure/userReport.js"
// import user
import reportValidate from "../Contracts/report.js";
import { notifCreate } from "../Infrastructure/notif.js";

export async function reportUser(req, res) {

    const {error} = reportValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    if (req.user.id==req.body.reportedID) return res.status(400).json({"error": "you can't report yourself"});
    
    /* 
    TODO: make a rabbitmq server in iam that takes a userID and checks whether this user exists or not
    and make a call to it inside this endpoint
    */

    req.body.userID = req.user.id;

    const postReport = await userReportCreate(req.body);

    await notifCreate({userID: req.user.id, content: `Thanks For Submiting Your Report. Our Team are on It as You're Reading This Message`});
    await notifCreate({userID: req.body.reportedID, content: `Your Account Has Been Reported of the Acts of ${postReport.reportType}. Our Team is Currently Inspecting the Matter. If the Report is Accespted You Will be Banned from the Platform`});

    return res.status(200).json(postReport);
}