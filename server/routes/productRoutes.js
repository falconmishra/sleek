import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

//routes for products
router.post(
  "/createProduct",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
//update product
router.put(
  "/updateProduct/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

//get products
router.get("/getProducts", getProductController);

//single product
router.get("/getProduct/:slug", getSingleProductController);

//get-photo
router.get("/productPhoto/:pid", productPhotoController);

//delete product
router.delete("/deleteProduct/:pid", deleteProductController);

//filter product
router.get("/productFilters", productFiltersController);

export default router;
