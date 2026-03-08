import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { addToCart, removeFromCart, updateCart } from "../controllers/cartController.js"

const router = express.Router()


router.post('/cart' , protect , addToCart)

router.put('/cart/:productId' , protect , updateCart)
router.delete('/cart/:productId' , protect , removeFromCart)

export default router