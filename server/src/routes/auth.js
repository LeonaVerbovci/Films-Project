const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST route to handle user authentication
router.post("/", async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body.credentials;

  // Get reference to the database from the Express app
  const db = req.app.get("db");

  try {
    // Find the user in the database
    const user = await db.collection("users").findOne({ email });

    // If user exists
    if (user) {
      // Compare provided password with hashed password stored in database
      if (bcrypt.compareSync(password, user.password)) {
        // If password matches, generate a JWT token with user data and send it in the response
        const token = jwt.sign(
          { user: { _id: user._id, email: user.email, role: user.role } },
          process.env.JWT_SECRET
        );
        res.json({ token });
      } else {
        // If password doesn't match, send 401 Unauthorized response
        res.status(401).json({ errors: { global: "Invalid credentials" } });
      }
    } else {
      // If user doesn't exist, send 401 Unauthorized response
      res.status(401).json({ errors: { global: "Invalid credentials" } });
    }
  } catch (err) {
    // Handle database error
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});

module.exports = router;
