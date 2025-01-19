import {PostViews} from "../Domain/Models/postViews.js";

export async function postViewsCreate(postView) {
    return await PostViews.create(postView);
}

export async function postViewsRead(condition) {
    return await PostViews.findAll({ where:condition });
}