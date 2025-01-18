import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import userReport from "../Schemas/report.js";

export const UserReport = sequelize.define("UserReport", userReport);

// UserReport.sync({force:true}).then(() => logger.info("User-Reports Model Synced")).catch((ex) => logger.error(ex.message, ex));