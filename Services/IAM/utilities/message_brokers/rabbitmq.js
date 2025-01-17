import amqp from "amqplib";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../configs/config.js";
import { userReadByID } from "../../Infrastructure/user.js";
import { adminReadByID } from "../../Infrastructure/admin.js";
import logger from "../loggers/generalLogger.js";
import { rabbitmqConnectionURI } from "../configs/config.js";

export default async function setupRabbitMQ() {
    try {
        const connection = await amqp.connect(rabbitmqConnectionURI);
        const channel = await connection.createChannel();

        const queue = "token_validation";

        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (message) => {
            const { token } = JSON.parse(message.content.toString());
            let response = { isValid: false };

            try {
                const decoded = jwt.verify(token, jwtSecret);
                response.isValid = true;

                if (decoded.isAdmin) {
                    const admin = await adminReadByID(decoded._id);
                    response.data = { admin: admin.toJSON() };
                } else {
                    const user = await userReadByID(decoded._id);
                    response.data = { user: user.toJSON() };
                }
            } catch (error) {
                response.error = "Invalid token";
            }

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(JSON.stringify(response)),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
        });

        logger.info("RabbitMQ is listening for token validation requests...");
    } catch (error) {
        logger.error("RabbitMQ Error:", error);
    }
}

// setupRabbitMQ();
