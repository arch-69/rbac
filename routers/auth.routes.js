import express from "express";
import container from "../container.js";
const authRouter = express.Router();

const authController = container.resolve("authController");

authRouter.post("/register", authController.register);

export default authRouter;
