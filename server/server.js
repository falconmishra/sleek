import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import catergoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import multer from "multer";

// const upload = multer({ storage: storage });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://192.168.137.129:5173",
    // origin: "http://localhost:5173",
    // origin: true,
  })
);

dotenv.config();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", catergoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
