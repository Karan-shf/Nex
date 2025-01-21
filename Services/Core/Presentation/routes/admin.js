import { Router } from "express";
import { adminAuth } from "../../middlewares/auth.js";
import { getAllPosts, getPendingReports, getHistoryReports, getUserReports, getPostReports, processPostReport, processUserReport } from "../../Application/admin.js";

const router = Router();

router.get("/allPosts", adminAuth, getAllPosts);

router.get("/userReports/pending", adminAuth, getPendingReports, getUserReports);

router.get("/userReports/history", adminAuth, getHistoryReports, getUserReports);

router.get("/postReports/pending", adminAuth, getPendingReports, getPostReports);

router.get("/postReports/history", adminAuth, getHistoryReports, getPostReports);

router.post("/processReport/postReport", adminAuth, processPostReport);

router.post("/processReport/userReport", adminAuth, processUserReport);

export default router;