module.exports = async (req, res, next) => {
  try {
    // Get reference to the database from the Express app
    const db = req.app.get("db");

    // Find the user in the database using their ID
    const user = await db.collection("users").findOne({ _id: req.userId });

    // If user is found and has admin role, call the next middleware function
    if (user && user.role === "admin") {
      next();
    } else {
      // If user is not found or does not have admin role, send 403 Forbidden response
      res.status(403).json({
        errors: { global: "You are unauthorized for this action" },
      });
    }
  } catch (err) {
    // Handle database errors
    console.error(err);
    res.status(500).json({ errors: { global: err.message } });
  }
};
