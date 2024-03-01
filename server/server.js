import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import catergoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
//configure morgan middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

dotenv.config();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", catergoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
