const express = require("express");
const mongodb = require("mongodb");

//Create an Express router
const router = express.Router();

//Function to validate film data
const validate = (data) => {
  const errors = {};

  //Check if required fields are empty
  if (!data.title) errors.title = "Title field can't be blank";
  if (!data.description)
    errors.description = "Description field can't be blank";
  if (!data.price) errors.price = "Price field can't be blank";
  if (!data.director) errors.director = "Director field can't be blank";
  if (!data.duration) errors.duration = "Duration field can't be blank";
  if (!data.image) errors.image = "Image field can't be blank";

  //Check for invalid values (price and duration must be postive)
  if (data.price <= 0) errors.price = "Wrong price";
  if (data.duration <= 0) errors.duration = "Duration must be positive value";

  return errors;
};

//GET route to fetch all films
router.get("/", (req, res) => {
  const db = req.app.get("db");

  //Fetch all films from the databse
  db.collection("films")
    .find({})
    .toArray((err, films) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }
      res.json({ films }); //send films as json response
    });
});
//GET route to fetch a single film
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

router.post("/", (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.film);

  if (Object.keys(errors).length === 0) {
    db.collection("films").insertOne(req.body.film, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }
      //send the newly inserted film as JSON response
      res.json({ film: r.obs[0] });
    });
  } else {
    //Send 400 bad request response with validation errors
    res.status(400).json({ errors });
  }
});

//Put route to update a film by ID
router.put("/:_id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;
  const errors = validate(filmData);

  if (Object.keys(errors).length === 0) {
    cb.collection("films").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: filmData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }
        //Send the updated film as Json response
        res.json({ film: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

//Delete route to delete a film by ID

router.delete("/:_id", (req, res) => {
  const db = req.app.get("db");

  //Delete the film from the database by ID
  db.collection("films").deleteOne(
    {
      _id: new mongodb.ObjectId(req.params._id),
    },
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
