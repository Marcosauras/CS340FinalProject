const db = require('./database/db-connector');
// Express library used to create a web server that will listen and respond to API calls from the frontend
const express = require('express');
// Instantiate an express object to interact with the server
const app = express();

// Middleware to allow cross-origin requests
const cors = require('cors');
const PORT = 63033;
const MY_ONID = "hamimarc";

// If on FLIP or classwork, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:3037
// EX (FLIP/classwork) http://classwork.engr.oregonstate.edu:63033
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know
            
// importing all the routes
const animalRoutes = require("./routes/animals");
const fosterRoutes = require("./routes/fosters");
const applicationRoutes = require("./routes/applications");
const adoptersRoutes = require("./routes/adopters");
const medicalRecordRoutes = require("./routes/medicalRecords");
const animalFosterDetailsRoutes = require("./routes/animalFosterDetails")

// use the routes
app.use("/animals", animalRoutes);
app.use("/applications", applicationRoutes);
app.use("/fosters", fosterRoutes);
app.use("/adopters", adoptersRoutes);
app.use("/medicalRecords", medicalRecordRoutes);
app.use("/animalFosterDetails", animalFosterDetailsRoutes)
// ressets the database with seeded info
app.post("/reset", async (req, res) => {
  try {
    await db.query("CALL sp_ResetDatabase();"); 
    res.status(200).json({ message: "Database was reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error when resetting the database");
  }
});



// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});