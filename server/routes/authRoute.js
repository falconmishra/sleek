import express from "express";
import {
  routerController,
  loginController,
  testController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authController.js";
import {
  isAdmin,
  requireSignIn,
  validateCookie,
} from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing
router.post("/register", routerController);
router.post("/login", loginController);

//user router
router.get("/getUserByToken/:token", validateCookie, testController);

//protected admin route
router.get("/admin-test", requireSignIn, isAdmin, testController);

//forgotPassword
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

export default router;
