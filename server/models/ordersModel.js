import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  products: [
    {
      productName: {
        type: String,
        required: true,
      },
      productPicture: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
