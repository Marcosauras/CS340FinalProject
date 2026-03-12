const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
console.log("fosters router loaded");
// Get all fosters in the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetFosters();');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

router.get('/:id', async (req, res) => {
  const fosterID = parseInt(req.params.id);
  if (isNaN(fosterID)) {
    return res.status(400).send('Invalid foster ID');
  }

  try {
    const [rows] = await db.query('SELECT * FROM Fosters WHERE fosterID = ?;', [
      fosterID,
    ]);
    if (rows.length === 0) {
      return res.status(404).send('Foster record not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching foster record:', error);
    res.status(500).send('Database error');
  }
});

// sends a request to the database to run the Procedure sp_CreateFoster
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateFoster(?, ?, ?, ?, @new_id);`;
    await db.query(query, [data.name, data.phone, data.email, data.capacity]);

    res.status(200).json({ message: 'Foster record created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/update', async (req, res) => {
  try {
    console.log("update route hit");
    const data = req.body;
    const query = `CALL sp_UpdateFoster(?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.fosterID,
      data.name,
      data.phone,
      data.email,
      data.capacity,
    ]);

    res.status(200).json({ message: 'Foster record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    await db.query('CALL sp_DeleteFoster(?);', [req.body.deleteFosterId]);

    res.status(200).json({ message: 'Foster record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
module.exports = router;
