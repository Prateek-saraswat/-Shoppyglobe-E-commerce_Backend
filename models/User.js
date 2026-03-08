import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: true,
    },
    // Email used for login — must be unique across all users
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Hashed password — plain text password is never stored
    // bcryptjs hashes it before saving in authController.js
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);


// Export User model to use in authController.js
export const User = mongoose.model("User" , userSchema)