import { createContainer, asClass } from "awilix";
import UserRepo from "./repositories/user.repo.js";
import AuthService from "./services/auth.service.js";
import Auth from "./controllers/Auth.controller.js";

const container = createContainer();

container.register({
  userRepo: asClass(UserRepo).singleton(),
  authService: asClass(AuthService).singleton(),
  authController: asClass(Auth).singleton(),
});

export default container;
