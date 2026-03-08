import { Product } from "../models/Product.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {

     // Fetch all products from MongoDB products collection
    const products = await Product.find();


     // Return all products in response
    res.status(200).json({ message: "products fetch sucessfully", products });
  } catch (error) {

    // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};


// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {

    // Extract product ID from URL params
    const { id } = req.params;

      // Find product by its MongoDB ObjectId
    const product = await Product.findById(id);


    // If no product found with given ID, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    // Return the found product
    res.status(200).json({ message: "sucessfullt fetced product", product });
  } catch (error) {

     // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};
