import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { addToCart, removeFromCart, updateCart } from "../controllers/cartController.js"


// Create Express router instance
const router = express.Router()



//    POST /api/cart
//     Add a product to the cart
router.post('/cart' , protect , addToCart)


//   PUT /api/cart/:productId
//  Update quantity of a product in the cart
router.put('/cart/:productId' , protect , updateCart)


//   DELETE /api/cart/:productId
//   Remove a product from the cart
router.delete('/cart/:productId' , protect , removeFromCart)

export default router