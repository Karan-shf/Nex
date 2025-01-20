import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
// import { toggleFollowing } from "../../Application/following.js";
import { getTopTags } from "../../Application/tag.js";

const router = Router();

router.get("/topTags", auth, getTopTags);

export default router;