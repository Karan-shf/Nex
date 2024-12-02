import { Router } from "express";
import {Auth} from "../../middlewares/auth.js";
import { userRegister, userLogin, me, checkEmail, checkUsername, sendVerificationEmail } from "../../Application/user.js";

const router = Router();

router.post("/register", userRegister);

router.post("/login",  userLogin);

router.post("/check/email", checkEmail);

router.post("/check/username", checkUsername);

router.get("/me",Auth, me);

router.post("/otp/sendEmail", sendVerificationEmail);

// router.post("/otp/checkEmail", checkVerificationEmail);

export default router;