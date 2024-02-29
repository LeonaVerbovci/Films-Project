//module for JSON web token(JWT) generation and verification
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");

//Middleware function to verify the JWT in the request header
module.exports = (req, res, next) => {
  //Extract the JWT token from the authorization header
  const authorizationHeader = req.headers.authorization;

  let token;
  //Check if the authorization header exists and extract the token
  if (authorizationHeader) {
    //Extract token from "Bearer <token>"
    token = authorizationHeader.split(" ")[1];
  }
  //If token exists, verify it
  if (token) {
    //verify the token with JWT Library and the secreet key stored in the ENV variable
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401),
          json({ errors: { global: "You must be authenticated" } });
      } else {
        //If verification succeed, set the user ID in the request object and call the next middleware
        //convert user ID to mongoDB objectID
        req.userId = new mongodb.ObjectId(decoded.user._id);
        next();
      }
    });
  } else {
    //If token does not exist, send 403 Forbidden response
    res.status(403).json({
      errors: { global: "You must be authenticated" },
    });
  }
};
