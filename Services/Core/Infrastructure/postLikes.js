import {PostLikes} from "../Domain/Models/postLikes.js";

export async function postLikesCreate(postLike) {
    return await PostLikes.create(postLike);
}

export async function postLikesRead(condition) {
    return await PostLikes.findAll({ where:condition });
}