import express from "express"
import { getAllProducts, getProductById } from "../controllers/productController.js"



// Create Express router instance
const router = express.Router()


//   GET /api/products
//  Fetch all products from MongoDB
router.get('/products' , getAllProducts)


//  GET /api/products/:id
//   Fetch a single product by its MongoDB ID
router.get('/products/:id' , getProductById)

export default router