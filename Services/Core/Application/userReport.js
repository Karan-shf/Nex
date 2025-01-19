import { userReportCreate } from "../Infrastructure/userReport.js"
// import user
import reportValidate from "../Contracts/report.js";
import { notifCreate } from "../Infrastructure/notif.js";
import { sendUserValidationRequest } from "../utilities/message_brokers/rabbitmq.js";

export async function reportUser(req, res) {

    const { error } = reportValidate(req.body);
    if (error) return res.status(400).json({ "error": error.details });

    if (req.user.id==req.body.reportedID) return res.status(400).json({"error": "you can't report yourself"});
    
    const response = await sendUserValidationRequest(req.body.reportedID);
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(400).json({"error": "invalid report id. user with the given id does not exist"});

    req.body.userID = req.user.id;

    const userReport = await userReportCreate(req.body);

    await notifCreate({userID: req.user.id, content: `Thanks For Submiting Your Report. Our Team are on It as You're Reading This Message`});
    await notifCreate({userID: req.body.reportedID, content: `Your Account Has Been Reported of the Acts of ${userReport.reportType}. Our Team is Currently Inspecting the Matter. If the Report is Accespted You Will be Banned from the Platform`});

    return res.status(200).json(userReport);
}