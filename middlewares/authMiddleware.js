import jwt from "jsonwebtoken";


    // protect
    //   Verifies JWT token before allowing access to protected routes
    //   Add 'protect' before any route handler to make it private

const protect = (req, res, next) => {
  try {

     // Get the Authorization header from the incoming request
    const authHeader = req.headers.authorization;


    // If no Authorization header found, block the request
    if (!authHeader) {
      return res.status(401).json({ message: "No token , access denied" });
    }

    // Token must start with "Bearer" or "JWT" prefix
    if (!authHeader.startsWith("JWT ") && !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }


    // Extract actual token by removing "Bearer " or "JWT " prefix
    const token = authHeader.split(" ")[1];

     // Verify token using JWT_SECRET_KEY from .env
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);


    // Attach decoded user data (id) to request object
    // This makes req.user.id available in all protected route controllers
    req.user = decode;

    // Token is valid — allow request to proceed to the route handler
    next();
  } catch (error) {

     // Token verification failed — expired, invalid or tampered
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
