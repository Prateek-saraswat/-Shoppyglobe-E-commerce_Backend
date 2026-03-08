import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import  connectDB  from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use("/api", authRoutes);     // POST /api/register, /api/login
app.use("/api", productRoutes);  // GET  /api/products
app.use("/api", cartRoutes);     // POST /api/cart






app.get("/", (req, res) => {
  res.send("ShoppyGlobe API is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Server running on https://localhost:${PORT}`)
})