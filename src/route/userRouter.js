import Router from "express";
import verifyJWT from "../middleware/auth.js";
import {
  userRegister,
  userLogin,
  userProfile,
} from "../controller/userController.js";

const router = Router();

router.route("/profile").post(verifyJWT, userProfile);
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

export default router;
