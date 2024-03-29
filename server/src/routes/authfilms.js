const express = require("express");
const mongodb = require("mongodb");

//needs to be fixed
const authenticate = require("../middlewares/authenticate");
const adminOnly = require("../middlewares/adminOnly");

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

router.get("/", async (req, res) => {
  try {
    const db = req.app.get("db");
    const films = await db.collection("films").find({}).toArray();
    res.json({ films });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ errors: { global: err.message } });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const db = req.app.get("db");
    const film = await db
      .collection("films")
      .findOne({ _id: new mongodb.ObjectId(req.params._id) });
    res.json({ film });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ errors: { global: err } });
  }
});

router.post("/", authenticate, adminOnly, async (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.film);
  if (Object.keys(errors).length === 0) {
    try {
      const r = await db.collection("films").insertOne(req.body.film);
      const insertedId = r.insertedId; // Get the inserted ID

      // Fetch the inserted film object from the database using the inserted ID
      const insertedFilm = await db
        .collection("films")
        .findOne({ _id: insertedId });

      res.json({ film: insertedFilm }); // Send back the inserted film object
    } catch (err) {
      console.error("err", err);
      res.status(500).json({ errors: { global: err } });
    }
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", authenticate, adminOnly, async (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;
  const errors = validate(filmData);
  console.log("req", req.params);
  if (Object.keys(errors).length === 0) {
    try {
      const r = await db
        .collection("films")
        .findOneAndUpdate(
          { _id: new mongodb.ObjectId(req.params._id) },
          { $set: filmData },
          { returnOriginal: false }
        );
      console.log("filmdata", filmData);
      res.json({ film: req.body.film });
    } catch (err) {
      console.error("err", err);
      res.status(500).json({ errors: { global: err } });
    }
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", authenticate, adminOnly, async (req, res) => {
  const db = req.app.get("db");

  try {
    await db
      .collection("films")
      .deleteOne({ _id: new mongodb.ObjectId(req.params._id) });
    res.json({});
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ errors: { global: err } });
  }
});

module.exports = router;
