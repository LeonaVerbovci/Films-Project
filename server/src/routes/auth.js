const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

//POST route to  handle user authentication
router.post("/", (req, res) => {
  // Extract email and apassword from request body
  const { email, password } = req.body.credentials;

  //GET RENFERENCE TO THE DATABASE FROM THE EXPRESS APP
  const db = req.app.get("db");

  db.collection("users").findOne({ email }, (err, doc) => {
    // handle database error
    if (err) {
      req.status(500).json({ errors: { global: err } });
      return;
    }

    // if user exists
    if (doc) {
      // Compare provided password with hashed password stored in database
      if (bcrypt.compareSync(password, doc.password)) {
        // If password matches, generate a JWT token with user data and send it in the response
        const token = jwt.sign(
          { user: { _id: doc._id, email: doc.email, role: doc.role } },
          process.env.JWT_SECRET
        );
        res.json({ token });
      } else {
        // if password doesnt match send 401 UnAuthorized response
        res.status(401).json({ errors: { global: "Invalid credentials" } });
      }
    } else {
      // If user doesnt exist
      res.status(401).json({ errors: { global: "Invalid credentials" } });
    }
  });
});
module.exports = router;
