import { Router } from "express";
import {Auth} from "../../middlewares/auth.js";
import { userRegister, userLogin, me, checkEmail, checkUsername, sendVerificationEmail } from "../../Application/user.js";
import uploader from "../../middlewares/uploader.js";

const router = Router();

router.post("/register", uploader.single("file"), userRegister);

router.post("/login",  userLogin);

router.post("/check/email", checkEmail);

router.post("/check/username", checkUsername);

router.get("/me",Auth, me);
// router.get("/me",Auth, me);
router.get("/test", (req,res) => {
    return res.status(200).json({"message":"hello"});
});

router.post("/otp/sendEmail", sendVerificationEmail);

export default router;