import express from "express";
import {
  routerController,
  loginController,
  testController,
  forgotPasswordController,
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
router.get("/test", validateCookie, testController);

//protected admin route
router.get("/test", requireSignIn, isAdmin, testController);

//forgotPassword
router.post("/forgot-password", forgotPasswordController);

export default router;
