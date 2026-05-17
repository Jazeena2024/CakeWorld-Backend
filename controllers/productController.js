import Product from "../models/Product.js";

// ✅ ADD PRODUCT
export const addProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      description,
      image
    } = req.body;    

    const product = new Product({
      name,
      price,
      description,
      image
    });

    await product.save();

    res.json(product);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg: "Deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      description,
      image
    } = req.body;

    const updatedData = {
      name,
      price,
      description,
      image
    };

    const updated =
      await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

//Search Product
export const searchProducts = async (req, res) => {

  try {

    const query = req.query.q;

    const products = await Product.find({

      name: {
        $regex: query,
        $options: "i"
      }

    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};