import { sendUserValidationRequest } from "../utilities/message_brokers/rabbitmq.js";
import objectIDValidate from "../Contracts/objectID.js";
import { notifCreate } from "../Infrastructure/notif.js";

export async function getUserProfilebyID(req,res) {

    const { error } = objectIDValidate({id:req.params.id});
    if (error) return res.status(400).json({ "error": error.details });
    
    const response = await sendUserValidationRequest(req.params.id, "id");
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(404).json({"error": "invalid user id. user with the given id does not exist"});

    return res.status(200).json(response.user);
}

export async function getUserProfileByUsername(req,res) {
    
    const response = await sendUserValidationRequest(req.params.username, "username");
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(404).json({"error": "invalid username. user with the given username does not exist"});

    return res.status(200).json(response.user);
}

export async function extractPostMentions(content, postID, Username) {

    console.log(content);

    const mentions = content.match(/@\w+/g);
    console.log(mentions);

    if (mentions) {
        mentions.forEach(async mention => {
            const response = await sendUserValidationRequest(mention.substring(1), "username");
            if (!response.error && response.user) await notifCreate({ userID: response.user.id, content: `You Have Been Mentioned on This Post by @${Username}.%*^${postID}` });
        });
    }

}