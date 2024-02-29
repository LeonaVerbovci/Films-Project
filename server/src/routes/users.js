const express = require("express");
const bcrypt = require("bcrypt"); //librari qe perdore me i bo hash password
const isEmail = require("validator/lib/isEmail.js"); //librari per me kqyr a eshte email apo jo

const router = express.Router(); //per me kriju nje express router

function validate(user, db, cb) {
  const errors = {};

  db.collection("users").findOne({ email: user.email }, (err, doc) => {
    if (err)
      return { isValid: false, errors: { global: `Database error ${err}` } };

    if (doc) errors.email = "User with such email already exists";
    if (!user.email) errors.email = "Can't be blank";
    if (!isEmail(user.email)) errors.email = "Invalid email address";
    if (!user.password) errors.password = "Can't be blank";
    if (user.password !== user.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords must match";
    }

    //Callback with validation result
    return cb({
      isValid: Object.keys(errors).length === 0,
      errors,
    });
  });
}

//post router to handle user registration
router.post("/", (req, res) => {
  //Extract user data from request body
  const user = {
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
    role: "user",
  };

  const db = req.app.get("db");

  validate(req.body.user, db, ({ isValid, errors }) => {
    //If there are validations errors, send a 400 response with the errors
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      //if user data is valid, insert the user into the db
      db.collection("users").insertOne(user, (err) => {
        //handle database insertion error
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        //send a success response
        res.json({});
      });
    }
  });
});

module.exports = router;
