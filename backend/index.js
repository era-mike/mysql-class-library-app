const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'library',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
