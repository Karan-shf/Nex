import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { toggleFollowing, getUserFollowers, getUserFollowings } from "../../Application/following.js";

const router = Router();

router.post("/", auth, toggleFollowing);

router.get("/userFollowers", auth, getUserFollowers);

router.get("/userFollowings", auth, getUserFollowings);

export default router;