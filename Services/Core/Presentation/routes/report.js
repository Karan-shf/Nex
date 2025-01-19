import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { reportPost } from "../../Application/postReport.js";
import { reportUser } from "../../Application/userReport.js";

const router = Router();

router.post("/post", auth, reportPost);

router.post("/user", auth, reportUser);

export default router;