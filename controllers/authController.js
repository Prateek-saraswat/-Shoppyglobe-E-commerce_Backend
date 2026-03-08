import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


//  POST /api/register
export const register = async (req, res) => {
  try {
    // Extract name, email, password from request body
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with this email already exists in DB
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email already registered" });
    }

     // Hash the password before saving (salt rounds: 10)
    // Never store plain text passwords in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user to MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered sucessfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST /api/login
export const login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate that all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // / Generate JWT token with user ID as payload
    // Token expires in 7 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Return token — frontend stores this for future protected requests
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};
