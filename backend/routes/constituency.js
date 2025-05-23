const express = require("express");
const router = express.Router();
const Constituency = require("../models/Constituency");

router.post("/add", async (req, res) => {
  try {
    const newConstituency = new Constituency(req.body);
    await newConstituency.save();
    res.json({ success: true, message: "Constituency added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add constituency" });
  }
});

module.exports = router;