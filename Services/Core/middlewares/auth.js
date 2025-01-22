import { sendTokenValidationRequest } from "../utilities/message_brokers/rabbitmq.js";
import logger from "../utilities/loggers/generalLogger.js";

export async function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No token provided");

    try {
        const response = await sendTokenValidationRequest(token);

        if (!response.isValid) return res.status(400).send(response.error);

        if (response.data.admin) req.user = response.data.admin;
        if (response.data.user) req.user = response.data.user;

        next();
    } catch (error) {
        logger.error("Token validation error", error);
        res.status(500).json({
            "message":"Internal server error",
            "error": error
        });
    }
}

export async function adminAuth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No token provided");

    try {
        const response = await sendTokenValidationRequest(token);

        if (!response.isValid) return res.status(400).send(response.error);
        if (!response.data.admin) return res.status(403).send("access denied! admin only");

        req.admin = response.data.admin;

        next();
    } catch (error) {
        logger.error("Token validation error", error);
        res.status(500).json({
            "message":"Internal server error",
            "error": error
        });
    }
}
