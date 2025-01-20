import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { getUserBookmarks } from "../../Application/postBookmark.js";
import postList from "../../Application/postList.js";
import { getUserProfilebyID, getUserProfileByUsername } from "../../Application/user.js";

const router = Router();

router.get("/bookmarks", auth, getUserBookmarks, postList);

router.get("/profile-id/:id", auth, getUserProfilebyID);

router.get("/profile-username/:username", auth, getUserProfileByUsername);

export default router;