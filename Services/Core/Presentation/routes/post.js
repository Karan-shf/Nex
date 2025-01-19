import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost, getPost, getPostInFeed, getPostComments } from "../../Application/post.js";
import uploader from "../../middlewares/uploader.js"
import { toggleLike } from "../../Application/postLikes.js";
import { toggleBookmark } from "../../Application/postBookmark.js";

const router = Router();

router.post("/", auth, uploader.single("file"), createPost);

router.post("/toggleLike", auth, toggleLike);

router.post("/toggleBookmark", auth, toggleBookmark);

router.get("/feed", auth, getPostInFeed);

router.get("/comments", auth, getPostComments);

router.get("/:id", auth, getPost);

export default router;