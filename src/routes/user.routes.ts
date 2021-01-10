import {Router} from "express";
import userController from "../controllers/user.controller";
import {verifyToken, isAdmin} from "../middlewares";

const router = Router();

router.route("/").post([verifyToken, isAdmin], userController.createUser);

export {router};
