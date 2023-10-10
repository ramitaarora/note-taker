const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/index.js');

// Middleware

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET Routes

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Port

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


