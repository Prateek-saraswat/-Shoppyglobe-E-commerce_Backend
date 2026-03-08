import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";


//  POST /api/cart
export const addToCart = async (req, res) => {
  try {

    // Extract productId and quantity from request body
    const { productId, quantity } = req.body;

    // Get logged-in user's ID from JWT token (set by authMiddleware)
    const  userId  = req.user.id;

    // Validate required fields
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "ProductId and quantity are required" });
    }

    // Check if the product exists in DB before adding to cart
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find existing cart for this user
    let cart = await Cart.findOne({ userId });

    // No cart exists — create a new one with this item
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
        // Cart exists — check if product is already in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );
      if (existingItem) {
        // Product already in cart — increase its quantity
        existingItem.quantity += quantity;
      } else {
        // Product not in cart — add as new item
        cart.items.push({ productId, quantity });
      }
    }
     // Save updated cart to MongoDB
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};

//  PUT /api/cart/:productId
export const updateCart = async (req, res) => {
  try {

    // Get productId from URL params, quantity from body
    const { productId } = req.params;
    const { quantity } = req.body;

    // Get logged-in user's ID from JWT token
    const userId = req.user.id;


    // Validate quantity — must be a positive number
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }


    // Find the user's cart in MongoDB
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    //  Update quantity
    item.quantity = quantity;

    //  Save cart
    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
  try {

    // Get productId from URL params
    const { productId } = req.params;

    // Get logged-in user's ID from JWT token
    const userId = req.user.id;


    // Find the user's cart in MongoDB
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item with matching productId
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    // Save updated cart to MongoDB
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};
