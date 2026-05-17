
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";


dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword
  });

  console.log("Admin Created");
  process.exit();
};

createAdmin();