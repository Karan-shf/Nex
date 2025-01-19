import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postSchema from "../Schemas/post.js";

export const Post = sequelize.define("Post", postSchema, { timestamps:false });

// Post.sync({alter:true}).then(() => logger.info("Post Model Synced")).catch((ex) => logger.error(ex.message, ex));