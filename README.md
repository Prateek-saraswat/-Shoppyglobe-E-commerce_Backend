# ShoppyGlobe Backend

## Github-Link - https://github.com/Prateek-saraswat/-Shoppyglobe-E-commerce_Backend

A Node.js and Express.js REST API backend for an e-commerce application with MongoDB database.

## Features

- **User Authentication**: Register and login with JWT-based authentication
- **Product Management**: Browse and view products
- **Shopping Cart**: Add, update, and remove items from cart (authenticated users only)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcryptjs
- **Frontend Connectivity**: CORS enabled

## Project Structure

```
shoppyeglobe_backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js  # User registration and login logic
│   ├── cartController.js  # Cart management operations
│   └── productController.js # Product fetching operations
├── middlewares/
│   └── authMiddleware.js  # JWT token verification
├── models/
│   ├── Cart.js            # Cart Mongoose model
│   ├── Product.js         # Product Mongoose model
│   └── User.js            # User Mongoose model
├── routes/
│   ├── authRoutes.js      # Authentication API routes
│   ├── cartRoutes.js      # Cart API routes
│   └── productRoutes.js   # Product API routes
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── seed.js                # Database seeding script
└── server.js              # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

## Running the Application

### Development Mode

```bash
npm start
```

The server will run on `http://localhost:3000`

### Seeding Database

To populate the database with sample products:

```bash
node seed.js
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login user | No |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get product by ID | No |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/cart` | Add item to cart | Yes |
| PUT | `/api/cart/:productId` | Update item quantity | Yes |
| DELETE | `/api/cart/:productId` | Remove item from cart | Yes |

## API Request/Response Examples

### Register User

**Request:**
```json
POST /api/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "user registered sucessfully",
  "user": {
    "id": "user_id",
    "email": "john@example.com"
  }
}
```

### Login User

**Request:**
```json
POST /api/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Add to Cart

**Request:**
```json
POST /api/cart
{
  "productId": "product_id",
  "quantity": 2
}
```

**Headers:**
```
Authorization: JWT your_jwt_token_here
```

**Response:**
```json
{
  "message": "Item added to cart",
  "cart": {
    "userId": "user_id",
    "items": [
      {
        "productId": "product_id",
        "quantity": 2
      }
    ]
  }
}
```

## Sample Products

The seed script includes these sample products:

- iPhone 15 - $999 (Electronics)
- Nike Air Max - $129 (Footwear)
- MacBook Pro - $1999 (Electronics)
- Sony Headphones - $299 (Electronics)
- Levi's Jeans - $59 (Clothing)

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

