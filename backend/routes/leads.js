const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all leads
router.get('/', (req, res) => {
  db.query('SELECT * FROM leads', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new lead
router.post('/', (req, res) => {
  const { name, email, source, status, notes } = req.body;
  db.query(
    'INSERT INTO leads (name, email, source, status, notes) VALUES (?, ?, ?, ?, ?)',
    [name, email, source, status, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Lead added', leadId: result.insertId });
    }
  );
});

// Update lead
router.put('/:id', (req, res) => {
  const { status, notes } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE leads SET status = ?, notes = ? WHERE id = ?',
    [status, notes, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Lead updated' });
    }
  );
});

// Delete lead
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM leads WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Lead deleted' });
  });
});

module.exports = router;