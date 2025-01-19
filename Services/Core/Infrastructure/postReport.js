import {PostReport} from "../Domain/Models/postReport.js";

export async function postReportCreate(postReport) {
    return await PostReport.create(postReport);
}

export async function postReportRead(condition) {
    return await PostReport.findAll({ where:condition });
}