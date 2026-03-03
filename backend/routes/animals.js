const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');
// -- Citation for the following animal routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Gets all the animals in the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetAnimals();');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send('Database error');
  }
});

// Gets a single animal by ID
router.get('/:id', async (req, res) => {
  const animalID = parseInt(req.params.id);
  if (isNaN(animalID)) {
    return res.status(400).send('Invalid animal ID');
  }

  try {
    const [rows] = await db.query('SELECT * FROM Animals WHERE animalID = ?;', [
      animalID,
    ]);
    if (rows.length === 0) {
      return res.status(404).send('Animal not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching animal:', error);
    res.status(500).send('Database error');
  }
});

// Create a new animal
router.post('/create', async (req, res) => {
  try {
    const data = req.body;

    let age = parseInt(data.age);
    if (isNaN(age)) age = null;

    const query = `CALL sp_CreateAnimal(?, ?, ?, ?, ?, @new_id);`;
    await db.query(query, [data.name, data.species, data.breed, data.sex, age]);

    res.status(200).json({ message: 'Animal created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Update the animal
router.post("/update", async (req, res) => {
  try {
    const data = req.body;

    const animalID = Number(data.animalID);
    if (Number.isNaN(animalID)) {
      return res.status(400).json({ message: "Invalid animal ID" });
    }

    const age =
      data.age === "" || data.age === null || data.age === undefined
        ? null
        : parseInt(data.age, 10);

    if (age !== null && Number.isNaN(age)) {
      return res.status(400).json({ message: "Invalid age" });
    }

    const query = 'CALL sp_UpdateAnimal(?, ?, ?, ?, ?, ?);';
    await db.query(query, [
      animalID,
      data.name,
      data.species,
      data.breed,
      data.sex,
      age,
    ]);

    return res.status(200).json({ message: "Animal updated successfully" });
  }  catch (error) {
  console.error("Error executing update:", error);
  return res.status(500).json({
    message: "Database error",
    error: error.message,
    code: error.code
  });
}
});

// Deletes an animal based on ID
router.post('/delete', async (req, res) => {
  try {
    await db.query('CALL sp_DeleteAnimal(?);', [req.body.delete_animal_id]);

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).send('Database error');
  }
});

module.exports = router;
