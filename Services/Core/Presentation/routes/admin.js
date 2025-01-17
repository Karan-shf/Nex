import { Router } from "express";
import { adminAuth } from "../../middlewares/auth.js";
import { adminLogin, me } from "../../Application/admin.js"
import { adminInsert } from "../../Application/admin.js";

const router = Router();

router.post("/login", adminLogin);

router.get("/me", adminAuth, me);

router.post("/add", adminInsert);


export default router;