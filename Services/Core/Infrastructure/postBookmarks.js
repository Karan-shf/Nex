import {PostBookmarks} from "../Domain/Models/postBookmarks.js";

export async function postBookmarkCreate(postBookmark) {
    return await PostBookmarks.create(postBookmark);
}

export async function postBookmarkRead(condition) {
    return await PostBookmarks.findAll({ where:condition });
}