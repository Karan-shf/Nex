// import { sequelize } from "../../DB/postgre.js";
// import logger from "../../utilities/loggers/generalLogger.js";
// import following from "../Schemas/following.js";

// export const Following = sequelize.define("Following", following);

// // Following.sync({force:true}).then(() => logger.info("Following Model Synced")).catch((ex) => logger.error(ex.message, ex));
import { Following } from "../Domain/Models/following";

export async function followingCreate(following) {
    return await Following.create(following);
}

export async function followingRead(condition) {
    return await Following.findAll({ where:condition });
}