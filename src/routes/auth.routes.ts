import {Router} from "express";
import authCtrl from "../controllers/auth.controller";
  
const router = Router();

router.post("/signin", authCtrl.signIn);
router.post("/signup", authCtrl.signUp);

export {router};
