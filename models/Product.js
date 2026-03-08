import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Name of the product
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Price of the product — cannot be negative
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Short description about the product
    description: {
      type: String,
      required: true,
      trim: true,
    },
     // Number of units available in stock — cannot be negative
    stock: {
      type: Number,
      required: true,
      min: 0,
    },

      // URL of the product image to display on frontend
    productImageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    // Category the product belongs to (e.g. Electronics, Clothing)
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// Export Product model to use in productController.js and seed.js
export const Product = mongoose.model("Product", productSchema);
