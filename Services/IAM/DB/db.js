import { postgreConnect, sequelize } from "./postgre.js";
import { redisConnect, redisClient } from "./redis.js";
import logger from "../utilities/loggers/generalLogger.js";

export default async function() {
    await postgreConnect();
    await redisConnect();
}

process.on('SIGINT', async () => {
    await redisClient.quit();
    await sequelize.close();
    logger.info("postgreSQL and Redis Connections Closed");
    process.exit(0);
});