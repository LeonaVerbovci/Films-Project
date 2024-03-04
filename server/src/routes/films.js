const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const validate = (data) => {
  const errors = {};
  if (!data.title) errors.title = "Title field can't be blank";
  if (!data.description)
    errors.description = "Description field can't be blank";
  if (!data.price) errors.price = "Price field cannot be blank";
  if (!data.director) errors.director = "Director field cannot be blank";
  if (!data.duration) errors.duration = "Duration field cnanot be blank";
  if (!data.img) errors.img = "This field cannot be blank";
  if (data.price <= 0) errors.price = "Wrong price";
  if (data.duration <= 0) errors.duration = "Duration must be positive value";
  return errors;
};
router.get("/", async (req, res) => {
  try {
    const db = req.app.get("db");
    const films = await db.collection("films").find({}).toArray();
    res.json({ films });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});
router.post("/", async (req, res) => {
  try {
    const db = req.app.get("db");
    const errors = validate(req.body.film);
    if (Object.keys(errors).length === 0) {
      const r = await db.collection("films").insertOne(req.body.film);
      res.json({ film: r.ops[0] });
    } else {
      res.status(400).json({ errors });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});
router.put("/:_id", async (req, res) => {
  try {
    const db = req.app.get("db");
    const { _id, ...filmData } = req.body.film;
    const errors = validate(filmData);
    if (Object.keys(errors).length === 0) {
      const r = await db
        .collection("films")
        .findOneAndUpdate(
          { _id: new mongodb.ObjectId(req.params._id) },
          { $set: filmData },
          { returnOriginal: false }
        );
      res.json({ film: r.value });
    } else {
      res.status(400).json({ errors });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});
router.delete("/:_id", async (req, res) => {
  try {
    const db = req.app.get("db");
    await db
      .collection("films")
      .deleteOne({ _id: new mongodb.ObjectId(req.params._id) });
    res.json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
});
module.exports = router;
