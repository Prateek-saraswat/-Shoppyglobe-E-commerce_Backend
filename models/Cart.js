import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    // Reference to the User who owns this cart
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

      // Array of items added to the cart
    // Each item contains a product reference and quantity
    items: [
      {

        // Reference to the Product added to cart
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

// Export Cart model to use in cartController.js
export const Cart = mongoose.model("Cart", cartSchema);
