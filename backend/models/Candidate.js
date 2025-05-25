const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  candidate_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  constituency: { type: String, required: true }, 
  party_id: { type: String, required: true } // Connects to party_id of Party
});

module.exports = mongoose.model("Candidate", CandidateSchema);
