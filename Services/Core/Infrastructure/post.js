import {Post} from "../Domain/Models/post.js"

export async function postCreate(post) {
    return await Post.create(post);
}

export async function postRead(condition,limit,offset) {
    return await Post.findAll({ 
        where: condition, 
        limit: limit,
        offset: offset,
        order: [['postDate', 'DESC']]
    });
}

export async function postReadByPK(id) {
    return await Post.findByPk(id);
}

export async function postCommentNum(id) {
    return await Post.count({ where:{
        repliesTo: id,
        postType: "Comment",
    }});
}