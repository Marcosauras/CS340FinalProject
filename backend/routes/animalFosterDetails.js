const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Get all Medical Records in the database
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("CALL sp_GetAnimalFosterDetails();");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

module.exports = router;