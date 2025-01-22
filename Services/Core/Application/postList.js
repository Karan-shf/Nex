import { postLikesRead } from "../Infrastructure/postLikes.js";
import { postBookmarkRead } from "../Infrastructure/postBookmarks.js";
import { postRead } from "../Infrastructure/post.js";
import { sendEntFetchRequest } from "../utilities/message_brokers/rabbitmq.js";
import findPostAuthor from "./postAuthor.js";
import _ from "lodash";

export default async function postList(req, res) {

    // version 1.0 => recomands recently uploaded posts

    // console.log(req.user);
    

    const postLikes = await postLikesRead({userID:req.user.id});
    let userLikes = [];
    postLikes.forEach(postLike => userLikes.push(postLike.postID));

    const postBookmarks = await postBookmarkRead({userID:req.user.id});
    let userBookmarks = [];
    postBookmarks.forEach(postBookmark => userBookmarks.push(postBookmark.postID));

    req.condition.is_banned = false;
    
    // const posts = await postRead(req.condition , req.query.limit, req.query.offset, "postDate");
    const posts = await postRead(req.condition , req.query.limit, req.query.offset, req.order);

    let userIDs = [];
    posts.forEach(post => userIDs.push(post.userID));
    
    const rabbitMQresponses = await sendEntFetchRequest(userIDs,"user");
    if (rabbitMQresponses.error) return res.status(500).json({"error": rabbitMQresponses.error});

    // console.log(rabbitMQresponses)

    // const findPostAuthor = postUserID => {
    //     // console.log(postUserID)
    //     let answer;
    //     rabbitMQresponses.users.forEach(rabbitMQresponse => {
    //         // console.log(rabbitMQresponse)
    //         if (rabbitMQresponse.id == postUserID) answer = rabbitMQresponse;
    //     })
    //     return answer;
    // }

    let responses = [];
    posts.forEach(post => {
        let response = post.toJSON();
        response.isLiked = userLikes.includes(response.id)? true:false;
        response.isBookmarked = userBookmarks.includes(response.id)? true:false;
        const postAuthor = findPostAuthor(response.userID,rabbitMQresponses);
        response.author = {
            userID: postAuthor.id,
            name: postAuthor.name,
            username: postAuthor.username,
            profilePic: postAuthor.profilePic,
            verificationState: postAuthor.verificationState
        };
        // response.author = _.pick(postAuthor,["id","name","username","profilePic","verificationState"])
        responses.push(response);
    });

    const morePosts = await postRead(req.condition , 1, req.query.offset+req.query.limit, req.order);
    const hasMore = morePosts.length == 0 ? false:true;

    return res.status(200).json({
        hasMore: hasMore,
        data: responses
    });
}
