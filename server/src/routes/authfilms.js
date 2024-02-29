const express = require("express");
const mongodb = require("mongodb");
const authenticate = require("../authenticate");
const adminOnly = require("../adminOnly");

const router = express.Router();

const validate = (data) => {
  const errors = {};

  if (!data.title) errors.title = "Title field can't be blank";
  if (!data.description)
    errors.description = "Description field can't be blank";
  if (!data.price) errors.price = "Price field can't be blank";
  if (!data.director) errors.director = "Director field can't be blank";
  if (!data.duration) errors.duration = "Duration field can't be blank";
  if (!data.img) errors.img = "This field can't be blank";
  if (data.price <= 0) errors.price = "Wrong price";
  if (data.duration <= 0)
    errors.duration = "Duration must be only positive value";

  return errors;
};

router.get("/", (req, res) => {
  const db = req.app.get("db");
  db.collection("films")
    .find({})
    .toArray((err, films) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ films });
    });
});

router.get("/:_id", (req, res) => {
  const db = req.app.get("db");
  db.collection("films").findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, film) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film });
    }
  );
});

router.post("/", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.film);

  if (Object.keys(errors).length === 0) {
    db.collection("films").insertOne(req.body.film, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;
  const errors = validate(filmData);

  if (Object.keys(errors).length === 0) {
    db.collection("films").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: filmData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ film: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");

  db.collection("films").deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

module.exports = router;
