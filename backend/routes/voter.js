const express = require("express");
const router = express.Router();
const Voter = require("../models/Voter"); 

router.get("/:id", async (req, res) => {
  try {
    const voter = await Voter.findOne({ voter_id: req.params.id });
    if (!voter) return res.status(404).json({ error: "Voter not found" });
    res.json(voter);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

