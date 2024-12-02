import { jwtSecret } from "../utilities/configs/config.js";
// import { User } from "../Domain/models/user.js";
import jwt from "jsonwebtoken";
import { userReadByID } from "../Infrastructure/user.js";
import { adminReadByID } from "../Infrastructure/admin.js";


export async function Auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("no token provided");

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (decoded.isAdmin) {
            const admin = await adminReadByID(decoded._id);
            req.admin = admin.toJSON();
        } else {
            const user = await userReadByID(decoded._id);
            req.user = user.toJSON();
        }
        next();
    } catch (error) {
        return res.status(400).send("invalid token");
    }
}

export async function adminAuth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("no token provided");

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (!decoded.isAdmin) return res.status(403).send("access denied! admin only");
        const admin = await adminReadByID(decoded._id);
        req.admin = admin.toJSON();
        next();
    } catch (error) {
        return res.status(400).send("invalid token");
    }
}