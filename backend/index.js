const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'library',
});

// Check database and table existence
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');

    // Check if the 'books' table exists
    const sqlFile = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    db.query(
        "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = 'library' AND table_name = 'books'",
        (err, results) => {
            if (err) throw err;

            if (results[0].count === 0) {
                // Initialize database if 'books' table does not exist
                db.query(sqlFile, err => {
                    if (err) throw err;
                    console.log('Database initialized with sample data');
                });
            } else {
                console.log('Database already initialized');
            }
        }
    );
});

// API routes
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
