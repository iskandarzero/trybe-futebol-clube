import { Router } from "express";
import UserController from "../controllers/user.controller";

const loginRoute = Router();

const userController = new UserController();

loginRoute.post('/', userController.validateFields, userController.login);
loginRoute.get('/validate', userController.validateRole);

export default loginRoute;
