const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/voting_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const voterRoutes = require("./routes/voter");
const authRoutes = require("./routes/auth");
const partyRoutes = require("./routes/party");
const constituencyRoutes = require("./routes/constituency");
const candidateRoutes = require("./routes/candidateRoutes");
const adminRoutes = require("./routes/admin");

app.use("/voter", voterRoutes);
app.use("/auth", authRoutes);
app.use("/party", partyRoutes);
app.use("/constituency", constituencyRoutes);
app.use("/candidates", candidateRoutes);
app.use("/admin", adminRoutes);

// Root auth route for login
app.use("/", authRoutes);

app.post("/logout", (req, res) => {
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));
