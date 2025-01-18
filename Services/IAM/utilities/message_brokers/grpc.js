import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../../../media.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const mediaProto = grpc.loadPackageDefinition(packageDefinition).media;

export default new mediaProto.MediaService('localhost:8087', grpc.credentials.createInsecure()); // export grpc client