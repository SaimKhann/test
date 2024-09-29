const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'saim@123',
  database: 'test'
});

// Route to fetch all students
app.get('/students', (req, res) => {
  pool.query('SELECT * FROM students', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

// Route to add a student
app.post('/students', (req, res) => {
  const { name, age } = req.body;
  pool.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json({ id: results.insertId, name, age });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
