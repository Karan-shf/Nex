import express from "express";
import morgan from "morgan";
import error from "../Middlewares/error.js";
import cors from "../Middlewares/cors.js";
import uploader from "../Middlewares/uploader.js";
import swaggerDocument from "../Middlewares/swagger_output.json" with { type: 'json' };
import swaggerUi from "swagger-ui-express";
import logger from "../utilities/loggers/generalLogger.js";
import { upload, allFiles, getFile, deleteFile } from "../Application/media.js";
import { auth } from "../Middlewares/auth.js";


export default function(app) {

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(cors);

    app.post("/upload", auth, uploader.single("file"), upload);

    app.get("/", auth, allFiles);

    app.get("/file/:filename", getFile);

    app.delete("/file/:id", auth, deleteFile);

    app.use(error);
}