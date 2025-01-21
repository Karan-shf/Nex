import loginValidate from "../Contracts/login.js";
import { adminRead, adminCreate } from "../Infrastructure/admin.js";
import { userReadByID, userReadInf } from "../Infrastructure/user.js"
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

export async function getAllUsers(req,res) {

    const validOrderTypes = ["name","email","username"];

    if (!validOrderTypes.includes(req.query.order)) return res.status(400).json({error:"invalid order type",validOrderType:validOrderTypes});
    
    // const users
    const Users = await userReadInf({}, req.query.limit, req.query.offset,req.query.order);

    const MoreUsers = await userReadInf({}, 1, req.query.offset+req.query.limit,req.query.order);
    const hasMore = MoreUsers.length==0? false:true;

    return res.status(200).json({
        hasMore:hasMore,
        data: Users
    })
}

export async function toggleVerifyUser(req,res) {
    
    let user = await userReadByID(req.body.userID);
    if (!user) return res.status(404).json({error:"user not found"});

    if (user.verificationState == "notVerified") {
        user.verificationState = "verified";
    } else if (user.verificationState == "verified") {
        user.verificationState = "notVerified";
    } 

    user = await user.save();

    return res.status(200).json(user);
}