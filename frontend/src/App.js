// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminPage from "./pages/AdminPage";
import VoterDashboard from "./pages/VoterDashboard";
import PartyPage from "./pages/PartyPage";
import ConstituencyAdmin from "./pages/ConstituencyAdmin";
import EditProfile from "./pages/EditProfile";
import BallotPaper from "./pages/BallotPaper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/voter_dashboard" element={<VoterDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/vote" element={<BallotPaper/>} />

        <Route path="/party" element={<PartyPage />} />
        
        <Route path="/constituency_admin" element={<ConstituencyAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
