import {UserReport} from "../Domain/Models/userReport.js";

export async function userReportCreate(userReport) {
    return await UserReport.create(userReport);
}

export async function userReportRead(condition) {
    return await UserReport.findAll({ where:condition });
}