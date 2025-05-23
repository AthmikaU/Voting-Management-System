const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/voting_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route Imports
const voterRoutes = require("./routes/voter");
const authRoutes = require("./routes/auth");
// const partyRoutes = require("./routes/party");
// const constituencyRoutes = require("./routes/constituency");

// Route Usage
app.use("/", authRoutes);  // includes /login
app.use("/voter", voterRoutes);
// app.use("/party", partyRoutes);
// app.use("/constituency", constituencyRoutes);

// Logout
app.post("/logout", (req, res) => {
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));