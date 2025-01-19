import amqp from "amqplib";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../configs/config.js";
import { userReadByID, userRead } from "../../Infrastructure/user.js";
import { adminReadByID, adminRead } from "../../Infrastructure/admin.js";
import logger from "../loggers/generalLogger.js";
import { rabbitmqConnectionURI } from "../configs/config.js";
import { Op } from "sequelize"

export default async function setupRabbitMQ() {
    try {
        const connection = await amqp.connect(rabbitmqConnectionURI);
        const channel = await connection.createChannel();

        const queue = "token_validation";
        const userQueue = "user_validation";
        const entFetchQueue = "entity_fetch"

        await channel.assertQueue(queue, { durable: false });
        await channel.assertQueue(userQueue, { durable: false });
        await channel.assertQueue(entFetchQueue, { durable: false });

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

        channel.consume(userQueue, async (message) => {

            const { userID } = JSON.parse(message.content.toString());
            let response = { user: null };

            try {
                const user = await userReadByID(userID);
                if (user) {
                    response.user = user;
                }
            } catch (error) {
                response.error = "error while fetching user from databsae";
            }

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(JSON.stringify(response)),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
        });

        channel.consume(entFetchQueue, async (message) => {
            const { entIDs , entType } = JSON.parse(message.content.toString());
            let response = {};

            try {

                if (entType == "admin") {
                    const admins = await adminRead({id:{[Op.in]:entIDs}});
                    response.admins = admins;
                    
                } else if (entType == "user") {
                    const users = await userRead({id:{[Op.in]:entIDs}});
                    response.users = users;
                    
                } else {
                    response.error = "wrong entity type";
                }
            } catch (error) {
                response.error = "error while fetching entity from database";
            }

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(JSON.stringify(response)),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
        });

        logger.info("RabbitMQ is listening for requests...");
    } catch (error) {
        logger.error("RabbitMQ Error:", error);
    }
}

// setupRabbitMQ();
