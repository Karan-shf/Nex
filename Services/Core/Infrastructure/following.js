import { Following } from "../Domain/Models/following.js";

export async function followingCreate(following) {
    return await Following.create(following);
}

export async function followingRead(condition) {
    return await Following.findAll({ where:condition });
}