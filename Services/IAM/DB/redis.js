// import redis from "redis";
import { createClient } from "redis";
import { redisHost, redisPort } from "../utilities/configs/config.js";
import logger from "../utilities/loggers/generalLogger.js";

// export const redisClient = redis.createClient({
export const redisClient = createClient({
    url: `redis://${redisHost}:${redisPort}`
});

redisClient.on('connect', () => {
    logger.info('Connected to Redis');
});
  
redisClient.on('error', (err) => {
    logger.error('Redis connection error: ' + err, err);
});

export async function redisConnect() {
    await redisClient.connect();
}