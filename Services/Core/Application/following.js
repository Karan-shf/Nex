import followingIDValidate from "../Contracts/following.js";
import { followingCreate, followingRead, followingReadInf } from "../Infrastructure/following.js";
import { notifCreate } from "../Infrastructure/notif.js"
import { sendUserValidationRequest } from "../utilities/message_brokers/rabbitmq.js";
import { sendEntFetchRequest } from "../utilities/message_brokers/rabbitmq.js";
import _ from "lodash";


export async function toggleFollowing(req, res) {

    const { error } = followingIDValidate(req.body);
    if (error) return res.status(400).json({ "error": error.details });

    if (req.user.id == req.body.followingID) return res.status(400).json({ "error": "you can't follow yourself" });

    const response = await sendUserValidationRequest(req.body.followingID, "id");
    if (response.error) return res.status(500).json({"error": response.error});
    if (!response.user) return res.status(400).json({"error": "invalid following id. user with the given id does not exist"});

    req.body.followerID = req.user.id;

    // const postLikes = await postLikesRead({userID: req.user.id, id: req.body.id});
    const followingObjs = await followingRead(req.body);
    let followerObj = followingObjs[0];

    if (followerObj) {
        await followerObj.destroy();
        return res.status(200).json({ "message": "successfully unfollowed the user" });
    }

    followerObj = await followingCreate(req.body);

    const notif = await notifCreate({ userID: req.body.followingID, content: `You Have a New Follower. Your Account Has Been Followed by @${req.user.username}` });

    return res.status(200).json({
        "message": "successfully followed the user",
        "object": followerObj,
        "notif": notif
    });
}

export async function getUserFollowers(req,res) {

    const followers = await followingReadInf({followingID:req.query.id}, req.query.limit, req.query.offset);

    const followersIDs = [];

    followers.forEach(follower => followersIDs.push(follower.followerID));

    const rabbitMQresponses = await sendEntFetchRequest(followersIDs,"user");
    if (rabbitMQresponses.error) return res.status(500).json({"error": rabbitMQresponses.error});

    const followerCards = [];

    rabbitMQresponses.users.forEach(user => followerCards.push(_.pick(user,["id","name","profilePic","username","aboutUser","verificationState"])));

    const moreFollowers = await followingReadInf({followingID:req.query.id} , 1, req.query.offset+req.query.limit);
    const hasMore = moreFollowers.length == 0 ? false:true;

    return res.status(200).json({
        hasMore: hasMore,
        data: followerCards
    });
}

export async function getUserFollowings(req,res) {

    const followings = await followingReadInf({followerID:req.query.id}, req.query.limit, req.query.offset);

    const followingsIDs = [];

    followings.forEach(following => followingsIDs.push(following.followingID));

    const rabbitMQresponses = await sendEntFetchRequest(followingsIDs,"user");
    if (rabbitMQresponses.error) return res.status(500).json({"error": rabbitMQresponses.error});

    const followingCards = [];

    rabbitMQresponses.users.forEach(user => followingCards.push(_.pick(user,["id","name","profilePic","username","aboutUser"])));

    const moreFollowings = await followingReadInf({followerID:req.query.id} , 1, req.query.offset+req.query.limit);
    const hasMore = moreFollowings.length == 0 ? false:true;

    return res.status(200).json({
        hasMore: hasMore,
        data: followingCards
    });
}