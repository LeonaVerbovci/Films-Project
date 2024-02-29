//Middleware function to check if the user making the request is an admin

module.exports = (req, res, next) => {
  //Get reference to the database from the Express app
  const db = req.app.get("db");

  //Find the user in the databse using their ID
  db.collection("users").findOne({ _id: req.userId }, (err, user) => {
    //Handle database errors
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    //If user is found and has admin role, call the next middleware function
    if (user && user.role === "admin") {
      next();
    } else {
      // if user is not found or does not have admin role, send 403 Forbidden response
      res.status(403).json({
        errors: { global: "You are unauthorized for this action" },
      });
    }
  });
};
