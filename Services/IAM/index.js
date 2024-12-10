import "express-async-errors";
import express from "express";
import { db } from "./DB/db.js";
import { port } from "./utilities/configs/config.js";
import routes from "./Presentation/routes.js";
import logger from "./utilities/loggers/generalLogger.js";

db();

const app = express();
routes(app);

app.listen(port, () => logger.info(`listening on port ${port}...`));

// TODO:
// change OTP database to redis
// change API Gate Way 
// complete unit tests
// add status(200) to endpoints -> for swagger autogen 

// DONE:
// Add Document (swagger)