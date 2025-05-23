const express = require("express");
const router = express.Router();
const Party = require("../models/Party");

router.post("/add", async (req, res) => {
  try {
    const newParty = new Party(req.body);
    await newParty.save();
    res.json({ success: true, message: "Party added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add party" });
  }
});

module.exports = router;
