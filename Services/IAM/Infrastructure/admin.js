import { Admin } from "../Domain/models/admin.js";

export async function adminCreate(admin) {
    return await Admin.create(admin);
}

export async function adminRead(condition) {
    return await Admin.findOne({ where: condition });
}

export async function adminReadByID(id) {
    return await Admin.findByPk(id);
}