import { sequelize } from '../../DB/postgre.js';
import logger from '../../utilities/loggers/generalLogger.js';
import adminSchema from "../schemas/admin.js";

export const Admin = sequelize.define("Admin", adminSchema);

Admin.sync({alter:true}).then(() => logger.info("Admin model synced")).catch((ex) => logger.error(ex.message, ex));