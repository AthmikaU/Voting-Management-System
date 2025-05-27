// src/pages/AdminPage.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/admin_page.css"; 

function AdminPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetVotes = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/admin/reset-votes");
      setMessage("✅ All votes have been reset successfully.");
    } catch (err) {
      setMessage("❌ Failed to reset votes.");
    } finally {
      setLoading(false);
    }
  };

  const publishResults = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/admin/publish-results");
      setMessage("✅ Results published successfully. Redirecting...");
      setTimeout(() => {
        window.location.href = "/results";
      }, 1500);
    } catch (err) {
      setMessage("❌ Failed to publish results.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    window.location.href = "/";
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="button-container">
        <button
          onClick={resetVotes}
          disabled={loading}
          className="admin-button"
        >
          Reset All Votes
        </button>

        <button
          onClick={publishResults}
          disabled={loading}
          className="admin-button"
        >
          Publish Results
        </button>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}

export default AdminPage;
