import express from "express";
import authRouter from "./auth.routes.js";

const router = express.Router();

router.use("/api/auth", authRouter);

export default router;
