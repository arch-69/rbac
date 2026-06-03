import { createContainer, asClass } from "awilix";
import UserRepo from "./repositories/user.repo.js";
import AuthService from "./services/auth.service.js";
import Auth from "./controllers/Auth.controller.js";
import TaskRepo from "./repositories/task.repo.js";
import TaskService from "./services/task.service.js";
import RoleRepo from "./repositories/role.repo.js";
import UserService from "./services/user.service.js";

const container = createContainer();

container.register({
  userRepo: asClass(UserRepo).singleton(),
  authService: asClass(AuthService).singleton(),
  authController: asClass(Auth).singleton(),
  taskRepo: asClass(TaskRepo).singleton(),
  taskService: asClass(TaskService).singleton(),
  roleRepo: asClass(RoleRepo).singleton(),
  userService: asClass(UserService).singleton(),
});

export default container;
