import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import tag from "../Schemas/tag.js";
import { Post } from "./post.js";

export const Tag = sequelize.define("Tag", tag, { timestamps:false });

// Post.belongsToMany(Tag, {through: "PostTags"});
// Tag.belongsToMany(Post, {through: "PostTags"});

// Tag.sync({force:true}).then(() => logger.info("Tags Model Synced")).catch((ex) => logger.error(ex.message, ex));