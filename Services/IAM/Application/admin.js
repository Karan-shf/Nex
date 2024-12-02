import loginValidate from "../Contracts/login.js";
import { adminRead } from "../Infrastructure/admin.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import createJwtToken from "./token.js";

export async function adminInsert(req, res) {
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash("arsam123", salt);

    await adminCreate({
        name: "arsam",
        email: "arsam@gmail.com",
        password: password,
        birthDate: "2004-01-01",
        username: "mrpolarbear"
    })

    console.log("user created")
    res.send("user created")
}


export async function adminLogin(req, res) {

    const { error } = loginValidate(req.body);
    if (error) return res.status(400).json({ "error": error.details });

    let admin = await adminRead({ email: req.body.email });
    if (!admin) return res.status(400).json({ "error": "invalid email or password" });

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword) return res.status(400).json({ "error": "invalid email or password" });

    const token = createJwtToken(admin.id, true);

    res.header("x-auth-token", token).json({ "admin": _.omit(admin.toJSON(), ["password"]) });
}

export async function me(req, res) {
    return res.json({ "user": _.omit(req.admin, ["password"]) });
}