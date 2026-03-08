import express from "express"
import { login, register } from "../controllers/authController.js"

// Create Express router instance
const router = express.Router()


// POST /api/register -  Register a new user
router.post('/register' , register)

// POST /api/login - Authenticate user and return JWT token
router.post('/login' , login)

export default router;