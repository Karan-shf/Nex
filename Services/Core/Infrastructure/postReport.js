import {PostReport} from "../Domain/Models/postReport.js";

export async function postReportCreate(postReport) {
    return await PostReport.create(postReport);
}

export async function postReportRead(condition,limit,offset) {
    return await PostReport.findAll({ 
        where: condition,
        limit: limit,
        offset: offset,
        order: [["createdAt", 'DESC']]
    });
}

export async function postReportReadByID(id) {
    return await PostReport.findByPk(id);
}