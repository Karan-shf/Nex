import { Notif } from "../Domain/Models/notif.js";

export async function notifCreate(notif) {
    return await Notif.create(notif);
}

export async function notifRead(condition,limit,offset) {
    return await Notif.findAll({ 
        where: condition, 
        limit: limit,
        offset: offset,
        order: [
            ['isSeen', 'ASC'],
            ['createdAt', 'DESC'],
        ]
    });
}

export async function notifReadByID(id) {
    return await Notif.findByPk(id);
}

export async function notifCountUnseen(id) {
    return await Notif.count({where: {userID:id, isSeen: false}});
}

export async function notifUpdate(condition,limit,offset) {
    return await Notif.update({isSeen:true},{where:condition,limit:limit,offset:offset});
}