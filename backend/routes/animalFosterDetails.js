const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Get all Animal Foster Records in the database

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetAnimalFosterDetails();');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});
// Get a single Animal Foster Record by ID
router.get('/:id', async (req, res) => {
  const fosterID = parseInt(req.params.id);
  if (isNaN(fosterID)) {
    return res.status(400).send('Invalid foster ID');
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM AnimalFosterDetails WHERE animalFosterDetailID = ?;',
      [fosterID]
    );
    if (rows.length === 0) {
      return res.status(404).send('Foster record not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching foster record:', error);
    res.status(500).send('Database error');
  }
});
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateAnimalFosterDetail(?, ?, ?, ?, @new_id);`;
    await db.query(query, [
      data.animalID,
      data.fosterID,
      data.startDate,
      data.endDate,
    ]);

    res.status(200).json({ message: 'Foster record created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_UpdateAnimalFosterDetail(?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.animalFosterDetailID,
      data.animalID,
      data.fosterID,
      data.startDate,
      data.endDate,
    ]);
    res.status(200).json({ message: 'Foster record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_DeleteAnimalFosterDetail(?);`;
    await db.query(query, [data.animalFosterDetailID]);
    res.status(200).json({ message: 'Foster record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
