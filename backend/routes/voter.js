const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Voter = require("../models/Voter");

// Get voter by voter_id
router.get("/:id", async (req, res) => {
  try {
    const voter = await Voter.findOne({ voter_id: req.params.id });
    if (!voter) return res.status(404).json({ error: "Voter not found" });
    res.json(voter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update profile: address, phone, and optionally password
router.put("/:voter_id", async (req, res) => {
  const { voter_id } = req.params;
  const { address, phone, password } = req.body;

  // Validate phone number if provided
  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
  }

  try {
    const updateFields = {};
    if (address !== undefined) updateFields.address = address;
    if (phone !== undefined) updateFields.phone = phone;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const result = await Voter.updateOne({ voter_id }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Voter not found" });
    }

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

module.exports = router;
