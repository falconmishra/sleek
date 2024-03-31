import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    MRP: {
      type: String,
      require: true,
    },
    discount: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    company: {
      type: String,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      // data: Buffer,
      // contentType: String,
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
