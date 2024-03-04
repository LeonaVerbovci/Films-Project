const express = require("express");
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail.js");

const router = express.Router();

async function validate(user, db) {
  const errors = {};

  try {
    const existingUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (existingUser) {
      errors.email = "User with such email already exists";
    }

    if (!user.email) {
      errors.email = "Can't be blank";
    } else if (!isEmail(user.email)) {
      errors.email = "Invalid email address";
    }

    if (!user.password) {
      errors.password = "Can't be blank";
    }

    if (user.password !== user.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords must match";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  } catch (err) {
    return {
      isValid: false,
      errors: { global: `Database error ${err}` },
    };
  }
}

// POST router to handle user registration
router.post("/", async (req, res) => {
  const user = {
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
    role: "user",
  };

  const db = req.app.get("db");

  try {
    const { isValid, errors } = await validate(req.body.user, db);

    if (!isValid) {
      res.status(400).json({ errors });
      return;
    }

    await db.collection("users").insertOne(user);
    res.json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});

module.exports = router;
