import express from "express";
import container from "../container.js";
import { hasPermission } from "../middlewares/Auth.middleware.js";

const taskRoutes = express.Router();
const task = container.resolve("taskController");

taskRoutes.post("/create", hasPermission("task:create"), task.createTask);

export default taskRoutes;
