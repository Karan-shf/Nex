import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postBookmarks from "../Schemas/postOpts.js";

export const PostBookmarks = sequelize.define("PostBookmark", postBookmarks);

// PostBookmarks.sync({force:true}).then(() => logger.info("Post-Bookmarks Model Synced")).catch((ex) => logger.error(ex.message, ex));