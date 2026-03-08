import { Product } from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ message: "products fetch sucessfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "sucessfullt fetced product", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
