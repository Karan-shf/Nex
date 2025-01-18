import {Tag} from "../Domain/Models/tag.js";

export async function tagCreate(tag) {
    return await Tag.create(tag);
}

export async function tagRead(condition) {
    return await Tag.findAll({ where:condition });
}