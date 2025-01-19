import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postViews from "../Schemas/postViews.js";

export const PostViews = sequelize.define("PostView", postViews);

// PostViews.sync({force:true}).then(() => logger.info("Post-Views Model Synced")).catch((ex) => logger.error(ex.message, ex));