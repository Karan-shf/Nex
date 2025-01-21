import {UserReport} from "../Domain/Models/userReport.js";

export async function userReportCreate(userReport) {
    return await UserReport.create(userReport);
}

export async function userReportReadById(id) {
    return await UserReport.findByPk(id);
}

export async function userReportRead(condition,limit,offset) {
    return await UserReport.findAll({ 
        where: condition,
        limit: limit,
        offset: offset,
        order: [["createdAt", 'DESC']]
    });
}