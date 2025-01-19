import objectIDValidate from "../Contracts/objectID.js";
import { postLikesRead, postLikesCreate } from "../Infrastructure/postLikes.js";
import { postReadByPK } from "../Infrastructure/post.js";
import { notifCreate } from "../Infrastructure/notif.js"


export async function toggleLike(req, res) {

    const { error } = objectIDValidate(req.body);
    if (error) return res.status(400).json({ "error": error.details });

    let post = await postReadByPK(req.body.postID);
    if (!post) return res.status(400).json({ "error": "given post id does not exist!" })

    req.body.userID = req.user.id;

    const postLikes = await postLikesRead(req.body);
    let postLike = postLikes[0];

    if (postLike) {
        await postLike.destroy();

        post.likes--;
        await post.save();

        return res.status(200).json({ "message": "successfully unliked the post" });
    }

    post.likes++;
    await post.save();

    postLike = await postLikesCreate(req.body);

    const notif = await notifCreate({ userID: post.userID, content: `Your Post Has been Liked by @${req.user.username}` });

    return res.status(200).json({
        "message": "successfully liked the post",
        "object": postLike,
        "notif": notif
    });
}