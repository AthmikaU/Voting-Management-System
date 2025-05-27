// In routes/constituency.js
const express = require('express');
const router = express.Router();
const Constituency = require('../models/Constituency');

router.get('/:id', async (req, res) => {
  try {
    const constituency = await Constituency.findOne({ constituency_id: req.params.id });
    if (!constituency) {
      return res.status(404).json({ message: 'Constituency not found' });
    }
    res.json({ name: constituency.name });
  } catch (err) {
    console.error('Error fetching constituency:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;