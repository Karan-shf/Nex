import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost } from "../../Application/post.js";
import uploader from "../../middlewares/uploader.js"
import { toggleLike } from "../../Application/postLikes.js";
import { toggleBookmark } from "../../Application/postBookmark.js";

const router = Router();

router.post("/", auth, uploader.single("file"), createPost);

router.post("/toggleLike", auth, toggleLike);

router.post("/toggleBookmark", auth, toggleBookmark);

export default router;