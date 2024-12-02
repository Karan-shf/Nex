import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
import cors from "cors"

const app = express();

app.use(morgan("dev"));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['x-auth-token'], 
    credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/IAM", createProxyMiddleware(
    {target: "http://localhost:8000", changeOrigin:true }
));

app.listen(8888, () => console.log("API Gateway running on port 8888"));