require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

const leadsRouter = require('./routes/leads');
app.use('/api/leads', leadsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});