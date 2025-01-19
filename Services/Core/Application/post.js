import { postCreate,postRead } from "../Infrastructure/post.js";
import postValidate from "../Contracts/post.js";
import fileValidate from "../Contracts/file.js";
import grpcClient from "../utilities/message_brokers/grpc.js";
import logger from "../utilities/loggers/generalLogger.js";
import { extractPostTags } from "./tag.js";

export async function createPost(req, res) {

    let reqData = JSON.parse(req.body.reqData);

    const {error} = postValidate(reqData);
    if (error) return res.status(400).json({"error": error.details});

    if (req.file && !fileValidate(req.file, ["image","video"])) return res.status(400).json({"error": "file media type is not corerect"});

    reqData.userID = req.user.id;

    if (reqData.quotedFrom) {
        reqData.postType = "Quote";
    } else if (reqData.repliesTo) {
        reqData.postType = "Comment";
    } else {
        reqData.postType = "Post";
    }
    
    let post = await postCreate(reqData);

    extractPostTags(post.content, post.id);

    if (req.file) {

        const grpcRequest = {
            file: req.file.buffer,
            filename: req.file.filename,
            originalname: req.file.originalname,
            uploadedBy: req.user?.id || 'anonymous',
        };
    
        grpcClient.UploadFile(grpcRequest, async (err, response) => {
            if (err) {
                logger.error('gRPC upload failed', err);
                return res.status(500).send('Failed to upload file.');
            }
    
            logger.info("File uploaded via gRPC", response);
    
            post.mediaFileName = response.filename;
            post.mediaType = req.file.mimetype.split("/")[0];
            post = await post.save();

            return res.status(200).json(post);
        });
    } else {

        return res.status(200).json(post);
    } 
}
