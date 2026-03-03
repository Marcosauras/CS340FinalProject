const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");


// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Gets all the animals in the database
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Fosters;");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Create a new foster
router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateFoster(?, ?, ?, ?, ?, @new_id);`;
    await db.query(query, [data.name, data.phone, data.email, data.capacity]);

    res.status(200).json({ message: "foster created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Updates the foster
router.post("/update", async (req, res) => {
  try {
    const data = req.body;

    await db.query("CALL sp_UpdateFoster(?, ?, ?, ?, ?);", [
      data.update_foster_id,
      data.update_foster_name,
      data.update_foster_phone,
      data.update_foster_email,
      data.update_foster_capacity
    ]);

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Deletes a foster based on ID
router.post("/delete", async (req, res) => {
  try {
    await db.query("CALL sp_DeleteFoster(?);", [
      req.body.delete_foster_id
    ]);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).send("Database error");
  }
});

module.exports = router;