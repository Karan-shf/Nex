import followingIDValidate from "../Contracts/following.js";
import { followingCreate, followingRead } from "../Infrastructure/following.js";
// import { postReadByPK } from "../Infrastructure/post.js";
import { notifCreate } from "../Infrastructure/notif.js"
import { sendUserValidationRequest } from "../utilities/message_brokers/rabbitmq.js";


export async function toggleFollowing(req, res) {

    const {error} = followingIDValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    if (req.user.id == req.body.followingID) return res.status(400).json({"error": "you can't follow yourself"});

    const response = await sendUserValidationRequest(req.body.followingID);
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(400).json({"error": "invalid following id. user with the given id does not exist"});

    req.body.followerID = req.user.id;

    // const postLikes = await postLikesRead({userID: req.user.id, postID: req.body.postID});
    const followingObjs = await followingRead(req.body);
    let followerObj = followingObjs[0];

    if (followerObj) {
        await followerObj.destroy();
        return res.status(200).json({"message":"successfully unfollowed the user"});
    }

    followerObj = await followingCreate(req.body);

    const notif = await notifCreate({userID: req.body.followingID, content: `You Have a New Follower. Your Account Has Been Followed by @${req.user.username}`});
    
    return res.status(200).json({
        "message": "successfully followed the user",
        "object": followerObj,
        "notif": notif
    });
}