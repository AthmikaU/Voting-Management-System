const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schemas
const voterSchema = new mongoose.Schema({
  voter_id: String,
  first_name: String,
  last_name: String,
  password: String,
});

const partySchema = new mongoose.Schema({
  party_id: String,
  password: String,
});

const constituencySchema = new mongoose.Schema({
  constituency_id: String,
  password: String,
});

// Models - check if already compiled to avoid OverwriteModelError
const Voter = mongoose.models.Voter || mongoose.model("Voter", voterSchema);
const Party = mongoose.models.Party || mongoose.model("Party", partySchema);
const Constituency = mongoose.models.Constituency || mongoose.model("Constituency", constituencySchema);

// POST /login
router.post("/login", async (req, res) => {
  const { role } = req.body;

  try {
    if (role === "admin") {
      const { password } = req.body;
      if (password === "admin123") return res.json({ success: true, redirect: "/admin" });
      return res.status(401).json({ error: "Invalid Admin credentials" });
    }

    if (role === "voter") {
      const { voter_id, first_name, last_name, password } = req.body;
      const voter = await Voter.findOne({ voter_id, first_name, last_name, password });
      if (voter) 
        return res.json({ 
          success: true, 
          redirect: "/voter_dashboard",
          voter: {
            voter_id: voter.voter_id,
            first_name: voter.first_name,
            last_name: voter.last_name
          }
        });
      return res.status(401).json({ error: "Invalid Voter credentials" });
    }

    if (role === "party") {
      const { party_id, password } = req.body;
      const party = await Party.findOne({ party_id, password });
      if (party) return res.json({ success: true, redirect: "/party" });
      return res.status(401).json({ error: "Invalid Party credentials" });
    }

    if (role === "constituency") {
      const { constituency_id, password } = req.body;
      const constituency = await Constituency.findOne({ constituency_id, password });
      if (constituency) return res.json({ success: true, redirect: "/constituency_admin" });
      return res.status(401).json({ error: "Invalid Constituency credentials" });
    }

    res.status(400).json({ error: "Invalid role" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;