import { jwtSecret } from "../utilities/configs/config.js";
import jwt from "jsonwebtoken";

export default function(id,isAdmin) {
    const payload = {_id: id, isAdmin: isAdmin};

    const options = {expiresIn: "24h"};

    return jwt.sign(payload, jwtSecret, options);
}