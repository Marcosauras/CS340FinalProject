const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Get all applications in the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetApplications();');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});
router.get('/:id', async (req, res) => {
  const applicationID = parseInt(req.params.id);
  if (isNaN(applicationID)) {
    return res.status(400).send('Invalid application ID');
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM Applications WHERE applicationID = ?;',
      [applicationID]
    );
    if (rows.length === 0) {
      return res.status(404).send('Application not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).send('Database error');
  }
});
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateApplication(?, ?, ?, ?, @new_id);`;
    await db.query(query, [
      data.animalID,
      data.adopterID,
      data.status,
      data.applicationDate,
    ]);
    res.status(200).json({ message: 'Application created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_UpdateApplication(?, ?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.applicationID,
      data.adopterID,
      data.animalID,
      data.applicationDate,
      data.status,
      data.adoptedDate
    ]);
    res.status(200).json({ message: 'Application updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_DeleteApplication(?);`;
    await db.query(query, [data.deleteApplicationID]);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
