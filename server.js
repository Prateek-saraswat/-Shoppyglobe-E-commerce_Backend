import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import  connectDB  from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import productRoutes from './routes/productRoutes.js'

// Load environment variables from .env file
dotenv.config()

// Create Express application instance
const app = express()
// Enable CORS — allows frontend to make requests to this API
app.use(cors())
//  Parse incoming JSON request bodies (enables req.body)
app.use(express.json())

// Connect to MongoDB Atlas
connectDB()

// Auth routes   — POST /api/register, POST /api/login
app.use("/api", authRoutes);     

// Product routes — GET /api/products, GET /api/products/:id
app.use("/api", productRoutes);  

// Cart routes   — POST /api/cart, PUT /api/cart/:id, DELETE /api/cart/:id
app.use("/api", cartRoutes);     





// Base route to confirm API is running
app.get("/", (req, res) => {
  res.send("ShoppyGlobe API is running...");
});


// Catches any request that doesn't match above routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running on https://localhost:${PORT}`)
})