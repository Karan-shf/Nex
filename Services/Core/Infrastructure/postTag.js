import {PostTag} from "../Domain/Models/postTag.js";

export async function postTagCreate(postTag) {
    return await PostTag.create(postTag);
}

export async function postTagRead(condition) {
    return await PostTag.findAll({ where:condition });
}