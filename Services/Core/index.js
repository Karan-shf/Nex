import "express-async-errors";
import express from "express";
// import { db } from "./DB/db.js";
import { db } from "./DB/postgre.js";
import { port } from "./utilities/configs/config.js";
import routes from "./Presentation/routes.js";
import logger from "./utilities/loggers/generalLogger.js";

db();

const app = express();
routes(app);

app.listen(port, () => logger.info(`listening on port ${port}...`));