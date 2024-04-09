import express from "express";
import {
  cancelOrderController,
  createOrderController,
  getOrderByUserIdController,
  getOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import { isAdmin, validateCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createOrder/:uid", validateCookie, createOrderController);
router.get(
  "/getOrderByUserId/:uid",
  validateCookie,
  getOrderByUserIdController
);
router.get("/getOrders", isAdmin, getOrdersController);
router.put(
  "/updateOrderStatus/:oid/status/:status",
  validateCookie,
  isAdmin,
  updateOrderStatusController
);
router.post("/cancelOrder/:uid/:oid", validateCookie, cancelOrderController);

export default router;
