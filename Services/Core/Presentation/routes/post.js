import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost, getPost, getPostInFeed, getPostComments, searchPost } from "../../Application/post.js";
import uploader from "../../middlewares/uploader.js"
import { toggleLike } from "../../Application/postLikes.js";
import { toggleBookmark } from "../../Application/postBookmark.js";
import postList from "../../Application/postList.js";

const router = Router();

router.post("/", auth, uploader.single("file"), createPost);

router.post("/toggleLike", auth, toggleLike);

router.post("/toggleBookmark", auth, toggleBookmark);

router.get("/feed", auth, getPostInFeed, postList);

router.get("/comments", auth, getPostComments, postList);

router.get("/search", auth, searchPost, postList);

router.get("/:id", auth, getPost);

export default router;