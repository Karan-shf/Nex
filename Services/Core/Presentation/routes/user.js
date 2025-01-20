import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { getUserBookmarks } from "../../Application/postBookmark.js";
import postList from "../../Application/postList.js";

const router = Router();

router.get("/bookmarks", auth, getUserBookmarks, postList);

export default router;