import express from "express";
import morgan from "morgan";
import posts from "./routes/post.js";
import reports from "./routes/report.js";
import followings from "./routes/following.js";
import notifs from "./routes/notif.js"
import user from "./routes/user.js";
import tags from "./routes/tags.js";
import admin from "./routes/admin.js";
import error from "../middlewares/error.js";
import cors from "../middlewares/cors.js";
import logger from "../utilities/loggers/generalLogger.js";
import { auth } from "../middlewares/auth.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../middlewares/swagger_output.json" with { type: 'json' };

export default function(app) {

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(cors);

    app.use("/post", posts);
    app.use("/report", reports);
    app.use("/following", followings);
    app.use("/notif", notifs);
    app.use("/user", user);
    app.use("/tag", tags);
    app.use("/admin", admin);

    app.use(error);
}