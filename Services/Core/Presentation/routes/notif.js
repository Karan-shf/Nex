import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
// import { toggleFollowing } from "../../Application/following.js";
import { getUserNotifs, viewNotif, getUnseenNotifCount } from "../../Application/notif.js";

const router = Router();

router.get("/", auth, getUserNotifs);

// router.put("/:id", auth, viewNotif);

router.get("/count", auth, getUnseenNotifCount);

export default router;