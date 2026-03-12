const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// -- Citation for the following foster routes
// -- 3/02/2022
// -- Adapted from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Get all Medical Records in the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_GetMedicalRecords();');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

router.get('/:id', async (req, res) => {
  const recordID = parseInt(req.params.id);
  if (isNaN(recordID)) {
    return res.status(400).send('Invalid medical record ID');
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM MedicalRecords WHERE medicalRecordID = ?;',
      [recordID]
    );
    if (rows.length === 0) {
      return res.status(404).send('Medical record not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching medical record:', error);
    res.status(500).send('Database error');
  }
});

router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_CreateMedicalRecord(?, ?, ?, @new_id);`;
    await db.query(query, [data.animalID, data.appointmentDate, data.note]);

    res.status(200).json({ message: 'Medical record created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/update', async (req, res) => {
  try {
    console.log("Hello there")
    const data = req.body;
    const query = `CALL sp_UpdateMedicalRecord(?, ?, ?, ?);`;
    await db.query(query, [
      data.medicalRecordID,
      data.animalID,
      data.appointmentDate,
      data.note,
    ]);

    res.status(200).json({ message: 'Medical record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_DeleteMedicalRecord(?);`;
    await db.query(query, [data.medicalRecordID]);

    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
module.exports = router;
