import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postLikes from "../Schemas/postOpts.js";

export const PostLikes = sequelize.define("PostLike", postLikes);

// PostLikes.sync({force:true}).then(() => logger.info("Post-Likes Model Synced")).catch((ex) => logger.error(ex.message, ex));