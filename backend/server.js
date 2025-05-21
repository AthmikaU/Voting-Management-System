const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/voting_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const Voter = mongoose.model("Voter", new mongoose.Schema({
  voter_id: String,
  first_name: String,
  last_name: String,
  password: String,
}));

const Party = mongoose.model("Party", new mongoose.Schema({
  party_id: String,
  password: String,
}));

const Constituency = mongoose.model("Constituency", new mongoose.Schema({
  constituency_id: String,
  password: String,
}));

// POST /login
app.post("/login", async (req, res) => {
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
      if (voter) return res.json({ success: true, redirect: "/voter_dashboard" });
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

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
