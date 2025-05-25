const mongoose = require('mongoose');

const ConstituencySchema = new mongoose.Schema({
  constituency_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

// Export the model only if it hasn't been compiled before
module.exports = mongoose.models.Constituency || mongoose.model("Constituency", ConstituencySchema);
