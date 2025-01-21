import { postReportCreate } from "../Infrastructure/postReport.js"
import { postReadByPK } from "../Infrastructure/post.js";
import reportValidate from "../Contracts/report.js";
import { notifCreate } from "../Infrastructure/notif.js";

export async function reportPost(req, res) {

    const { error } = reportValidate(req.body);
    if (error) return res.status(400).json({ "error": error.details });

    const post = await postReadByPK(req.body.reportedID);
    if (!post) return res.status(400).json({ "error": "invalid postID. post does not exist" });

    req.body.userID = req.user.id;

    const postReport = await postReportCreate(req.body);

    await notifCreate({ userID: req.user.id, content: `Thanks For Submiting Your Report. Our Team are on It as You're Reading This Message` });

    return res.status(200).json(postReport);
}