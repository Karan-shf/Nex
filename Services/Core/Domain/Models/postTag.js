import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import postTag from "../Schemas/postTag.js";
import { Post } from "./post.js";

export const PostTag = sequelize.define("PostTag", postTag);

// Post.belongsToMany(Tag, {through: "PostTags"});
// Tag.belongsToMany(Post, {through: "PostTags"});

// PostTag.sync({force:true}).then(() => logger.info("Tags Model Synced")).catch((ex) => logger.error(ex.message, ex));