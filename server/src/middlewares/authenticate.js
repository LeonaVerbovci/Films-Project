const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");

// Middleware function to verify the JWT token in the request header
module.exports = async (req, res, next) => {
  try {
    // Extract the jwt token from the authorization header
    const authorizationHeader = req.headers.authorization;

    let token;

    // Check if authorization header exists and extract the token
    if (authorizationHeader) {
      // Extract token from "Bearer <token>"
      token = authorizationHeader.split(" ")[1];
    }

    // If token exists, verify it
    if (token) {
      // Verify the token with JWT library and the secret key stored in the ENV variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Set the user ID in the request object and call the next middleware
      // Convert user ID to MongoDB ObjectId
      req.userId = new mongodb.ObjectId(decoded.user._id);
      next();
    } else {
      // If token does not exist, send 403 Forbidden response
      res.status(403).json({ errors: { global: "You must be authenticated" } });
    }
  } catch (err) {
    // If an error occurs during token verification, send 401 Unauthorized response
    res.status(401).json({ errors: { global: "You must be authenticated" } });
  }
};
