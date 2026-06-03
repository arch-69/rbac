import express from "express";
import { hasPermission } from "../middlewares/Auth.middleware.js";
import container from "../container.js";

const adminRoutes = express.Router();
const userController = container.resolve("userController");

adminRoutes.post(
  "/create-role",
  hasPermission("role:create", "role:manage"),
  userController.createRole,
);

export default adminRoutes;
