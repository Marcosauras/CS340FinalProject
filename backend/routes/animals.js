const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");


// -- Citation for the following animal routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Gets all the animals in the database
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Animals;");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Create a new animal
router.post("/create", async (req, res) => {
  try {
    const data = req.body;

    let age = parseInt(data.age);
    if (isNaN(age)) age = null;

    const query = `CALL sp_CreateAnimal(?, ?, ?, ?, ?, @new_id);`;
    await db.query(query, [data.name, data.species, data.breed, data.sex, data.age]);

    res.status(200).json({ message: "Animal created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Updates the animal
router.post("/update", async function (req, res) {
  try {
    const data = req.body;

    if (isNaN(animalID)) {
      return res.status(400).send("Invalid animal ID");
    }

    if (isNaN(parseInt(data.age))) {
      data.age = null;
    }

    const query = "CALL sp_UpdateAnimal(?, ?, ?, ?, ?, ?);";
    await db.query(query, [
      data.animalID,
      data.name,
      data.species,
      data.breed,
      data.sex,
      data.age,
    ]);

  } catch (error) {
    console.error("Error executing update:", error);
    res.status(500).json({
      message: "Database error",
      error: error.message,
      code: error.code
    });
  }
});

// Deletes an animal based on ID
router.post("/delete", async (req, res) => {
  try {
    await db.query("CALL sp_DeleteAnimal(?);", [
      req.body.delete_animal_id
    ]);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).send("Database error");
  }
});

module.exports = router;