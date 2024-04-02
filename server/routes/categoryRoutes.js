import express from "express";
import {
  isAdmin,
  requireSignIn,
  validateCookie,
} from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
router.post(
  "/create-category",

  validateCookie,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get All category
router.get("/getCategories", getCategories);
//get single category
router.get("/getCategory/:slug", getCategory);
//delete category
router.delete("/deleteCategory/:id", isAdmin, deleteCategory);

export default router;
