import userModel from "../models/userModel.js";
import ordersModel from "../models/ordersModel.js";

import nodemailer from "nodemailer";

const sendOrderdMail = async (email, total, products) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const productsListHTML = products
      .map(
        (product) => `
      <li>
        <strong>${product.productName}</strong>: ${product.quantity} x $${
          product.price
        } = $${product.quantity * product.price}
      </li>
    `
      )
      .join("");

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Order Confirmation",
      html: `
      <h1>Order Confirmation</h1>
      <p>Hello there!</p>
      <p>Your order has been placed successfully. Below are the details of your order:</p>
      <ul>
        ${productsListHTML}
      </ul>
      <p>Total Price : $${total}</p>
      <p>If you have any questions or concerns regarding your order, please feel free to contact us.</p>
      <p>Thank you for choosing us!</p>
      <p>Best regards,<br>Your Sleek Team</p>
    `,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been sent : ", info.response);
      }
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Email  could not be sent" });
  }
};
export const createOrderController = async (req, res) => {
  const { uid } = req.params;
  const { products, totalPrice, address } = req.body;

  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const order = new ordersModel({
      customerId: uid,
      customerEmail: user.email,
      products: products,
      totalPrice: totalPrice,
      address: address,
    });
    sendOrderdMail(user.email, totalPrice, products);
    await order.save();

    return res.status(201).send({
      success: true,
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

export const getOrderByUserIdController = async (req, res) => {
  const userId = req.params.uid;

  try {
    const orders = await ordersModel.find({ customerId: userId });

    if (!orders || orders.length === 0) {
      return res.status(201).send({ message: "No orders found for the user" });
    }

    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await ordersModel.find();

    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: "No orders found" });
    }

    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.oid;
    const { status } = req.params;

    // Find the order by ID
    const order = await ordersModel.findById(orderId);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Update the order status
    order.status = status;

    // Save the updated order
    await order.save();

    // Send a success response
    res.status(200).send({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const userId = req.params.uid;
    const orderId = req.params.oid;

    // Find the order by user ID and order ID
    const order = await ordersModel.findOne({
      _id: orderId,
      customerId: userId,
    });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Check if the order is already canceled
    if (order.status === "Canceled") {
      return res.status(400).send({ message: "Order is already canceled" });
    }

    // Update the order status to Canceled
    order.status = "Cancelled";

    // Save the updated order
    await order.save();

    // Send a success response
    res.status(200).send({ message: "Order canceled successfully" });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
