// models/ElectionStatus.js
const mongoose = require("mongoose");

const electionStatusSchema = new mongoose.Schema({
  conducted: { type: Boolean, default: false },
  resultsPublished: { type: Boolean, default: false }  // NEW flag
});

module.exports = mongoose.model("ElectionStatus", electionStatusSchema);
