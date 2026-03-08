import mongoose from "mongoose";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// connectDB - Connects to MongoDB using Mongoose
//  Uses MONGO_URI from .env file
//  Exits process if connection fails
  const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1)
  }
};

// Export connectDB to use in server.js
export default connectDB;