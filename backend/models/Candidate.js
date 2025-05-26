const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  candidate_id: String,
  name: String,
  constituency: String,
  party_id: String,
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Candidate", candidateSchema);