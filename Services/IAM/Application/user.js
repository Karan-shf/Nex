import createJwtToken from "./token.js";
import { userCreate, userRead, userReadByID } from "../Infrastructure/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import registerValidate from "../Contracts/register.js";
import loginValidate from "../Contracts/login.js";
import otpSendEmailValidate from "../Contracts/otpSendEmail.js";
import checkEmailValidate from "../Contracts/checkEmail.js";
import crypto from "crypto";
import sendMail from "./nodeMailer.js";
import { otpCreate, otpDelete, otpRead } from "../Infrastructure/otp.js";
import logger from "../utilities/loggers/generalLogger.js";
// import grpcClient from "../utilities/message_brokers/grpc.js";
import uploadFileGrpc from "../utilities/message_brokers/grpc.js";
import fileValidate from "../Contracts/file.js";
import editProfileValidate from "../Contracts/editProfile.js";


export async function userRegister(req,res) {

    let reqData = JSON.parse(req.body.reqData);

    const {error} = registerValidate(reqData);
    if (error) return res.status(400).json({"error": error.details});

    let user = await userRead({ email: reqData.email });
    user = user[0];
    if (user) return res.status(400).json({"error": "the given email is already taken"});

    user = await userRead({ username: reqData.username });
    user = user[0];
    if (user) return res.status(400).json({"error": "the given username is already taken"});

    let otp = await otpRead( reqData.email);
    if (!otp) return res.status(404).json({"error":"no otp found"});

    // otp = otp.toJSON();

    // if (otp.expireTime.getTime() < Date.now()) {
    //     await otpDelete({id: otp.id});
    //     return res.status(400).json({"message":"otp expire time has passed"});
    // }

    if (otp != reqData.verificationCode) return res.status(400).json({"error":"incorrect otp code"});

    await otpDelete(reqData.email);

    logger.info(`${reqData.email} verified`);

    // let user = await User.findOne({ where: { email: reqData.email} });

    const salt = await bcrypt.genSalt(10);
    reqData.password = await bcrypt.hash(reqData.password, salt);

    if (req.file && !fileValidate(req.file, ["image"])) return res.status(400).json({ "error": "file media type is not correct" });

    user = await userCreate(reqData);
    
    const token = createJwtToken(user.id, false);

    if (req.file) {

        const grpcRequest = {
            file: req.file.buffer,
            filename: req.file.filename,
            originalname: req.file.originalname,
            uploadedBy: user?.id || 'anonymous',
        };

        const grpcResponse = await uploadFileGrpc(grpcRequest);

        user.profilePic = grpcResponse.filename;
    
        // grpcClient.UploadFile(grpcRequest, async (err, response) => {
        //     if (err) {
        //         logger.error('gRPC upload failed', err);
        //         return res.status(500).send('Failed to upload file.');
        //     }
    
        //     logger.info("File uploaded via gRPC", response);
    
        //     user.profilePic = response.filename;
        //     user = await user.save();

        //     return res.status(200).header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
        // });
    }

    user = await user.save();

    return res.status(200).header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
     
}

export async function userLogin(req,res) {

    const {error} = loginValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});
    
    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (!user) return res.status(400).json({"error": "invalid email or password"});
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({"error": "invalid email or password"});

    if (user.isBanned) return res.status(403).json({error:"unfortunately You Were Banned From the Platform :("});
    
    const token = createJwtToken(user.id, false);
    
    res.status(200).header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
}

export async function me(req,res) {
    return res.json({"user": _.omit(req.user, ["password"])});
}


export async function checkEmail(req,res) {

    const {error} = checkEmailValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    // if (req.body.email==="") return res.status(400).json({"error": "no email provided"});

    let user = await userRead({ email: req.body.email });

    user = user[0];

    if (user) return res.status(400).json({"message": "the given email is already taken", "success": false});

    return res.json({"success": true});
}

export async function checkUsername(req,res) {
    if (req.body.username==="") return res.status(400).json({"error": "no username provided"});
    // let user = await User.findOne({ where: { username: req.body.username} });
    let user = await userRead({ username: req.body.username});
    user = user[0];
    if (user) return res.status(400).json({"message": "the given username is already taken", "success": false});
    return res.json({"success": true});
}

export async function sendVerificationEmail(req,res) {

    const {error} = otpSendEmailValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    // let user = await User.findOne({ where: { email: req.body.email} });
    let user = await userRead({ email: req.body.email });

    user = user[0];
    if (user) return res.status(400).json({"error": "the given email is already taken"});

    const confirmationCode = crypto.randomBytes(4).toString("hex")

    // console.log(user)

    const emailSent = await sendMail({
        title: "Email Confirmation - Float Team",
        text: `Welcome to NEX,\n\nYour confirmation code is: ${confirmationCode}\n\nThis code is valid for 20 minutes.`,
        targetEmail: req.body.email
    });

    logger.info(`confirmation email sent to ${req.body.email}`,emailSent);

    const otp = await otpCreate(req.body.email, confirmationCode);

    return res.json({"otp": otp});
}

export async function getIdFromUsername(req,res) {
    
    const users = await userRead({username: req.params.username});
    const user = users[0];

    if (!user) return res.status(404).json({error:"user not found"});

    return res.status(200).json(user.id);
}


export async function editUserProfile(req,res) {
    
    const reqData = JSON.parse(req.body.reqData);

    const {error} = editProfileValidate(reqData);
    if (error) return res.status(400).json({"error": error.details});

    let user = await userReadByID(req.user.id);

    user.name = reqData.name;
    user.aboutUser = reqData.aboutUser;

    let profilePic;
    let backGroundPic;

    req.files.forEach(file => {
        if (file.fieldname=="profilePic") {
            profilePic = file;
        } else if (file.fieldname=="backGroundPic") {
            backGroundPic = file;
        }
    });

    if (profilePic) {

        const profilePicgrpcRequest = {
            file: profilePic.buffer,
            filename: profilePic.filename,
            originalname: profilePic.originalname,
            uploadedBy: req.user?.id || 'anonymous',
        };

        const profilePicgrpcResponse = await uploadFileGrpc(profilePicgrpcRequest);

        user.profilePic = profilePicgrpcResponse.filename;
    
        // grpcClient.UploadFile(profilePicgrpcRequest, (err, response) => {
        //     if (err) {
        //         logger.error('gRPC upload failed', err);
        //         return res.status(500).send('Failed to upload file.');
        //     }
    
        //     logger.info("File uploaded via gRPC", response);
    
            
        //     // user = await user.save();
            

        //     // return res.status(200).header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
        // })
        console.log(1234);
    }

    if (backGroundPic) {

        const backGroundPicgrpcRequest = {
            file: backGroundPic.buffer,
            filename: backGroundPic.filename,
            originalname: backGroundPic.originalname,
            uploadedBy: req.user?.id || 'anonymous',
        };

        const backGroundPicgrpcResponse = await uploadFileGrpc(backGroundPicgrpcRequest);

        user.backGroundPic = backGroundPicgrpcResponse.filename;
    }

    user = await user.save();

    return res.status(200).json(_.omit(user.toJSON(), ["password"]));
}