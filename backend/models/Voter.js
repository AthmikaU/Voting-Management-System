const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  voter_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  constituency: { type: String, required: true }
});

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
