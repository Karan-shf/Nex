import { sequelize } from "../../DB/postgre.js";
import logger from "../../utilities/loggers/generalLogger.js";
// import following from "../Schemas/following.js";
import notif from "../Schemas/notif.js";

export const Notif = sequelize.define("Notif", notif);

// Notif.sync({force:true}).then(() => logger.info("Notif Model Synced")).catch((ex) => logger.error(ex.message, ex));