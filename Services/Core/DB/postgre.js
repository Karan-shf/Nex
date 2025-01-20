import { Sequelize } from 'sequelize';
import { dbName, dbHost, dbUser, dbPassword, dbDialect } from '../utilities/configs/config.js';
import logger from '../utilities/loggers/generalLogger.js';
import dbLogger from '../utilities/loggers/dbLogger.js';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: (msg) => dbLogger.info(msg)
});

export async function db() {
    sequelize.authenticate()
    .then(() => logger.info('Connection to postgreSQL established successfully.'))
    .catch((err) => logger.error('Unable to connect to the postgre database', err))
    
    sequelize.sync({ alter:true }).then(() => logger.info('All models synchronized successfully.'));
}

process.on('SIGINT', async () => {
    await sequelize.close();
    logger.info("postgreSQL Connection Closed");
    process.exit(0);
});

// export async function closeConnection() {
//     await sequelize.close();
// }

// export async function syncModels() {
// }