import express from "express";
import morgan from "morgan";
import error from "../Middlewares/error.js";
import cors from "../Middlewares/cors.js";
import uploader from "../Middlewares/uploader.js";
import swaggerDocument from "../Middlewares/swagger_output.json" with { type: 'json' };
import swaggerUi from "swagger-ui-express";
import logger from "../utilities/loggers/generalLogger.js";
import { gfs } from "../DB/db.js";
import crypto from "crypto";
import path from "path";
import mongoose from "mongoose";

export default function(app) {

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(cors);

    app.post("/upload", uploader.single("file"), (req, res) => {
        console.log("1")
        // throw new Error("gav")
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        console.log("2")
        console.log(req.file);

        const filename = crypto.randomBytes(16).toString("hex") + path.extname(req.file.originalname);
    
        const uploadStream = gfs.openUploadStream(filename, {
            metadata: { 
                uploadedBy: req.user ? req.user._id : "anonymous",
                originalname: req.file.originalname
            }, // Add custom metadata if needed
        });

        console.log("3")
    
        uploadStream.end(req.file.buffer);

        console.log("4")
    
        uploadStream.on("finish", () => {
            const file = {
                filename: uploadStream.filename,
                id: uploadStream.id,
                // bucketName: uploadStream.s.options.bucketName,
                uploadDate: new Date(),
            };
    
            logger.info("File uploaded successfully:", file);
            res.status(201).json({ file });
        });

        uploadStream.on("error", (err) => {
            // console.error("File upload error:", err);
            // res.status(500).send("File upload failed.");
            throw new Error(err);
        });

        // return res.status(201).send("salam")
    });

    app.get("/", async (req, res) => {
        const files = await gfs.find({}).toArray();
        if (!files || files.length === 0) return res.status(404).json({ message: "No files found" });
        res.json(files);
    });

    app.get("/file/:filename", (req, res) => {
        const filename = req.params.filename;
    
        const downloadStream = gfs.openDownloadStreamByName(filename);
    
        downloadStream.on("data", (chunk) => {
            res.write(chunk);
        });
    
        downloadStream.on("end", () => {
            res.end();
        });
    
        downloadStream.on("error", (err) => {
            // console.error("File not found:", err.message);
            res.status(404).json({
                message: "File not found.",
                err: err
            });
        });
    });

    app.delete("/file/:id", async (req, res) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid file ID.");
        }

        const fileId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
       
        await gfs.delete(fileId);
        res.status(200).send("File deleted successfully.");
    });

    app.use(error);
}