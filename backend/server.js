const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Amma@8008729881',
  database: 'chat_app'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User registered!' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.send({ message: 'Invalid credentials' });
    }
  });
});

app.get('/messages/:user_id/:recipient_id', (req, res) => {
  const { user_id, recipient_id } = req.params;
  const sql = `SELECT messages.id, sender.username AS sender, recipient.username AS recipient, messages.message, messages.timestamp 
               FROM messages 
               JOIN users AS sender ON messages.user_id = sender.id 
               JOIN users AS recipient ON messages.recipient_id = recipient.id 
               WHERE (messages.user_id = ? AND messages.recipient_id = ?) OR (messages.user_id = ? AND messages.recipient_id = ?)
               ORDER BY messages.timestamp ASC`;
  db.query(sql, [user_id, recipient_id, recipient_id, user_id], (err, results) => {
    if (err) throw err;
    res.json(results);  
  });
});



app.post('/messages', (req, res) => {
  const { user_id, recipient_id, message } = req.body;
  const sql = 'INSERT INTO messages (user_id, recipient_id, message) VALUES (?, ?, ?)';
  db.query(sql, [user_id, recipient_id, message], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Message sent!' });
  });
});

app.get('/users', (req, res) => {
  const sql = 'SELECT id, username FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT id, username FROM users WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]); 
  });
});


app.listen(3001, () => {
  console.log('Server started on port 3001');
});