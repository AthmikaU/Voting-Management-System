// server/models/Voter.js
const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  voter_id: String,
  first_name: String,
  last_name: String,
  password: String,
});

module.exports = mongoose.model("Voter", VoterSchema);
