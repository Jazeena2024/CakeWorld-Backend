import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";
import adminauth from "./routes/adminauth.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin",adminauth)
app.use("/api/payment",paymentRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});