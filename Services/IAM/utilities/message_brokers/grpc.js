import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../loggers/generalLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../../../media.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const mediaProto = grpc.loadPackageDefinition(packageDefinition).media;

// export default new mediaProto.MediaService('localhost:8087', grpc.credentials.createInsecure()); // export grpc client
const grpcClient = new mediaProto.MediaService('localhost:8087', grpc.credentials.createInsecure()); // export grpc client

export default function uploadFileGrpc(grpcRequest) {
    return new Promise((resolve, reject) => {
        grpcClient.UploadFile(grpcRequest, (err, response) => {
            if (err) {
                logger.error('gRPC upload failed', err);
                return reject(new Error('Failed to upload file.'));
            }
            logger.info("File uploaded via gRPC", response);
            resolve(response);
        });
    });
}