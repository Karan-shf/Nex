import "express-async-errors";
import express from "express";
import { db } from "./DB/db.js";
import { port } from "./utilities/configs/config.js";
import routes from "./Presentation/routes.js";
import logger from "./utilities/loggers/generalLogger.js";
import grpcSetup from "./utilities/message_brokers/grpc.js";

db();
grpcSetup();

const app = express();
routes(app);

app.listen(port, () => logger.info(`listening on port ${port}...`));