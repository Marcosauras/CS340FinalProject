const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Get all Adopters in the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetAdopters();');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

// Get a single Adopter by ID
router.get('/:id', async (req, res) => {
  const adopterID = parseInt(req.params.id);
  if (isNaN(adopterID)) {
    return res.status(400).send('Invalid adopter ID');
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM Adopters WHERE adopterID = ?;',
      [adopterID]
    );
    if (rows.length === 0) {
      return res.status(404).send('Adopter not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching adopter:', error);
    res.status(500).send('Database error');
  }
});

// Create a new Adopter
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateAdopter(?, ?, ?, ?, @new_id);`;
    await db.query(query, [data.name, data.phone, data.email, data.note]);

    res.status(200).json({ message: 'Adopter created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Update the Adopter
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_UpdateAdopter(?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.adopterID,
      data.name,
      data.phone,
      data.email,
      data.note,
    ]);

    res.status(200).json({ message: 'Adopter updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Delete the Adopter
router.post('/delete', async (req, res) => {
  try {
    console.log("This is a test for Delete")
    const data = req.body;
    const query = `CALL sp_DeleteAdopter(?);`;
    await db.query(query, [data.adopterID]);

    res.status(200).json({ message: 'Adopter deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
module.exports = router;
