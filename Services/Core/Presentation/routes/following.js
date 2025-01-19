import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { toggleFollowing } from "../../Application/following.js";

const router = Router();

router.post("/", auth, toggleFollowing);

export default router;