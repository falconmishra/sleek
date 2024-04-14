import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    secretQuestion: {
      type: String,

      trim: true,
    },
    token: {
      type: String,
      trim: true,
      unique: true,
      default: "",
    },
    pincode: {
      type: String,
      trim: true,
    },
    address: {
      type: String,

      trim: true,
    },
    resetToken: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
