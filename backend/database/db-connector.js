// -- Citation for the following sever.js setup
// -- 2/10/2026
// -- Copied from:
// -- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
// Get an instance of mysql we can use in the app
const mysql = require("mysql2");

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_hamimarc', // example: cs340_MyOnidIsBilboBaggins
    password: 's7wm5QWYFI1Y', // last 4 of your OSU ID number
    database: 'cs340_hamimarc' // should be same as user
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;