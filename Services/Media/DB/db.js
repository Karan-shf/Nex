import mongoose from "mongoose";
import logger from "../utilities/loggers/generalLogger.js";
import { dbName, dbHost, dbPassword, dbUsername, dbPort } from "../utilities/configs/config.js";
// import Grid from "gridfs-stream";
import { GridFSBucket } from "mongodb";

export const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

export let gfs;

export function db() {
    mongoose.connect(mongoURI)
    .then(() => {
        logger.info("Connected to MongoDB...");

        const conn = mongoose.connection;

        // gfs = Grid(conn.db, mongoose.mongo);
        // gfs.collection("uploads");
        gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
        logger.info("GridFS initialized successfully...");
    })
    .catch((ex) => logger.error("Error While Connecting to mongoDB", ex));
}