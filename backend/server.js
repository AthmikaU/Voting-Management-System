// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/voting_system", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// const voterRoutes = require("./routes/voter");
// const authRoutes = require("./routes/auth");
// const partyRoutes = require("./routes/party");
// const constituencyRoutes = require("./routes/constituency");
// const candidateRoutes = require("./routes/candidateRoutes");
// const adminRoutes = require("./routes/admin");

// app.use("/voter", voterRoutes);
// app.use("/auth", authRoutes);
// app.use("/party", partyRoutes);
// app.use("/constituency", constituencyRoutes);
// app.use("/candidates", candidateRoutes);
// app.use("/admin", adminRoutes);

// // Root auth route for login
// app.use("/", authRoutes);

// app.post("/logout", (req, res) => {
//   res.json({ success: true });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env file

const app = express();

// Use dynamic CORS for development or deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// MongoDB connection using Atlas URI from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection failed:", err));

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

// Logout route
app.post("/logout", (req, res) => {
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
