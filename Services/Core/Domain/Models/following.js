import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
import following from "../Schemas/following.js";

export const Following = sequelize.define("Following", following);

// Following.sync({force:true}).then(() => logger.info("Following Model Synced")).catch((ex) => logger.error(ex.message, ex));