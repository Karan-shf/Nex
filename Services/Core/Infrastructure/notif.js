import { Notif } from "../Domain/Models/notif.js";

export async function notifCreate(notif) {
    return await Notif.create(notif);
}

export async function notifRead(condition) {
    return await Notif.findAll({ where:condition });
}