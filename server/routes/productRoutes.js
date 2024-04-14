import express from "express";
import {
  isAdmin,
  requireSignIn,
  validateCookie,
} from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  getProductByCategory,
  productPhotoController,
  updateProductController,
  searchProduct,
  getRandomProductsController,
} from "../controllers/productController.js";
import fileUploadMiddleware from "../middlewares/productMiddlewares.js";
import multer from "multer";

const router = express.Router();

//routes for products
router.post(
  "/createProduct",
  // isAdmin,
  validateCookie,
  fileUploadMiddleware,
  createProductController
);
//update product
router.put(
  "/updateProduct/:pid",

  validateCookie,
  isAdmin,
  updateProductController
);

//get products
router.get("/getProducts", getProductController);

router.get("/getRandomProducts/:count", getRandomProductsController);

//single product
router.get("/getProduct/:slug", getSingleProductController);

//get-photo
router.get("/productPhoto/:pid", productPhotoController);

//delete product
router.delete("/deleteProduct/:pid", deleteProductController);

//filter product
router.get("/getProductsByCategory/:category", getProductByCategory);
router.get("/searchProduct/:query", searchProduct);

export default router;
