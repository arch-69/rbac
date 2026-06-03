import express from "express";
import authRouter from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import adminRoutes from "./admin.routes.js";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/task", taskRoutes);
router.use("/api/admin", adminRoutes);

export default router;
