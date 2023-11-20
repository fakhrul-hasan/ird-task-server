const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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

//getting sub categories by category
app.get('/subCategories/:id', (req, res)=>{
  const categoryId = req.params.id;
    db.all('SELECT * FROM sub_category WHERE cat_id = ?', [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

//getting duas by category
app.get('/duas/:catName', (req, res)=>{
  const catId = req.query.cat;
    db.all('SELECT * FROM dua WHERE cat_id = ?', [catId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

//getting duas by category and subcategory
app.get('/duas/:catId/:subcatId', (req, res)=>{
  const catId = req.params.catId;
  const subcatId = req.params.subcatId;
    db.all('SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?', [catId, subcatId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });