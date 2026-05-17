import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  searchProducts
} from "../controllers/productController.js";



import { verifyAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js"; // ✅ default import

const router = express.Router();

// ✅ ADD PRODUCT (with image)
router.post("/", verifyAdmin, upload.single("image"), addProduct);

// ✅ GET PRODUCTS
router.get("/", getProducts);

// ✅ DELETE PRODUCT
router.delete("/:id", verifyAdmin, deleteProduct);

// ✅ UPDATE PRODUCT (🔥 FIXED - added upload middleware)
router.put("/:id", verifyAdmin, upload.single("image"), updateProduct);

//Search Product
router.get("/search",searchProducts);
    


export default router;