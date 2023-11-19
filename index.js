const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = process.env.port || 9000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database/dua_main.sqlite');

app.get('/', (req, res)=>{
    res.send('Welcome to IRD Task');
});

// getting all categories
app.get('/categories', (req, res)=>{
    db.all('SELECT * FROM category',[], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

//getting all sub categories
app.get('/subCategories', (req, res)=>{
    db.all('SELECT * FROM sub_category',[], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

//getting all dua
app.get('/dua', (req, res)=>{
    db.all('SELECT * FROM dua',[], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });