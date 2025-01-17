import { sequelize } from '../../DB/postgre.js';
import logger from '../../utilities/loggers/generalLogger.js';
import userSchema from "../schemas/user.js";

export const User = sequelize.define('User', userSchema);

User.sync({alter:true}).then(() => logger.info("User Model Synced")).catch((ex) => logger.error(ex.message, ex));