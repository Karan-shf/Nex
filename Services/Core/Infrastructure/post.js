import {Post} from "../Domain/Models/post.js"

export async function postCreate(post) {
    return await Post.create(post);
}

export async function postRead(condition) {
    return await Post.findAll({ where:condition });
}

export async function postReadByPK(id) {
    return await Post.findByPk(id);
}