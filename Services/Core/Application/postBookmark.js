import objectIDValidate from "../Contracts/objectID.js";
import { postBookmarkCreate, postBookmarkRead } from "../Infrastructure/postBookmarks.js";
import { postReadByPK } from "../Infrastructure/post.js";
import { Op } from "sequelize";

export async function toggleBookmark(req, res) {

    const { error } = objectIDValidate({id:req.body.postID});
    if (error) return res.status(400).json({ "error": error.details });

    let post = await postReadByPK(req.body.postID);
    if (!post) return res.status(400).json({ "error": "given post id does not exist!" })

    req.body.userID = req.user.id;

    const postBookmarks = await postBookmarkRead(req.body);
    let postBookmark = postBookmarks[0];

    if (postBookmark) {
        await postBookmark.destroy();

        post.bookmarks--;
        await post.save();

        return res.status(200).json({ "message": "successfully unBookmarkd the post" });
    }

    post.bookmarks++;
    await post.save();

    postBookmark = await postBookmarkCreate(req.body);

    return res.status(200).json({
        "message": "successfully Bookmarkd the post",
        "object": postBookmark
    });
}

export async function getUserBookmarks(req, res, next) {
    
    const userBookmakrs = await postBookmarkRead({userID:req.user.id});

    let postIDs = [];

    userBookmakrs.forEach(bookmark => postIDs.push(bookmark.postID));

    console.log(req.query.limit, req.query.offset);

    req.condition = {id:{[Op.in]:postIDs}};

    next();
}