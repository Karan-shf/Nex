import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use("/IAM", createProxyMiddleware(
    {target: "http://localhost:8000", changeOrigin:true }
));

app.listen(8888, () => console.log("API Gateway running on port 8888"));