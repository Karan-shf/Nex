import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postReport from "../Schemas/report.js";

export const PostReport = sequelize.define("PostReport", postReport);

// PostReport.sync({force:true}).then(() => logger.info("Post-Reports Model Synced")).catch((ex) => logger.error(ex.message, ex));