import { Router } from "express";
import { adminAuth } from "../../middlewares/auth.js";
import { adminLogin, me, getAllUsers, toggleVerifyUser } from "../../Application/admin.js"
import { adminInsert } from "../../Application/admin.js";

const router = Router();

router.post("/login", adminLogin);

router.get("/me", adminAuth, me);

router.post("/add", adminInsert);

router.get("/allUsers", adminAuth, getAllUsers);

router.post("/toggleVerifyUser", adminAuth, toggleVerifyUser);


export default router;