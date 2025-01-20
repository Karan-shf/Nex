import { Following } from "../Domain/Models/following.js";

export async function followingCreate(following) {
    return await Following.create(following);
}

export async function followingRead(condition) {
    return await Following.findAll({ where:condition });
}

export async function followingReadInf(condition,limit,offset) {
    return await Following.findAll({
        where:condition, 
        limit:limit, 
        offset:offset,
        order: [['createdAt', 'DESC']]
    });
}