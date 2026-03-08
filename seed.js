import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "./models/Product.js";
import connectDB from "./config/db.js"
dotenv.config()

const sampleProducts = [
  {
    name: "iPhone 15",
    price: 999,
    description: "Latest Apple iPhone with advanced features",
    stock: 50,
    productImageUrl: "https://example.com/iphone15.jpg",
    category: "Electronics",
  },
  {
    name: "Nike Air Max",
    price: 129,
    description: "Comfortable running shoes",
    stock: 100,
    productImageUrl: "https://example.com/nikeairmax.jpg",
    category: "Footwear",
  },
  {
    name: "MacBook Pro",
    price: 1999,
    description: "Powerful laptop for professionals",
    stock: 30,
    productImageUrl: "https://example.com/macbookpro.jpg",
    category: "Electronics",
  },
  {
    name: "Sony Headphones",
    price: 299,
    description: "Noise cancelling wireless headphones",
    stock: 75,
    productImageUrl: "https://example.com/sonyheadphones.jpg",
    category: "Electronics",
  },
  {
    name: "Levi's Jeans",
    price: 59,
    description: "Classic fit denim jeans",
    stock: 200,
    productImageUrl: "https://example.com/levisjeans.jpg",
    category: "Clothing",
  },
];

const seedDB = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Delete existing products
    await Product.deleteMany();
    console.log("Existing products deleted!");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted!");

    // Disconnect
    mongoose.disconnect();
    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
