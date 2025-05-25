import React, { useState } from 'react';
import axios from 'axios';
import './styles/login.css';

function Login() {
  const [role, setRole] = useState("voter");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { ...formData, role });

      if (res.data.success) {
        if (role === "voter" && res.data.voter) {
          localStorage.setItem("voterInfo", JSON.stringify(res.data.voter));
        }
        if (role === "party" && res.data.party) {
          localStorage.setItem("partyInfo", JSON.stringify(res.data.party));
        }
        window.location.href = res.data.redirect;
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1 className="text-center mb-4">Login</h1>

        {/* Role Switcher */}
        {role !== "admin" && (
          <ul className="nav nav-pills mb-3">
            {["voter", "party", "constituency"].map(r => (
              <li className="nav-item" key={r}>
                <button
                  className={`nav-link ${role === r ? "active" : ""}`}
                  onClick={() => {
                    setRole(r);
                    setFormData({});
                    setError("");
                  }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Login Form */}
        <div className="tab-content mt-4">
          <form onSubmit={handleSubmit}>
            {role === "voter" && (
              <>
                <input name="voter_id" placeholder="Voter ID" required onChange={handleChange} />
                <input name="first_name" placeholder="First Name" required onChange={handleChange} />
                <input name="last_name" placeholder="Last Name" required onChange={handleChange} />
              </>
            )}
            {role === "party" && (
              <>
                <input name="party_id" placeholder="Party ID" required onChange={handleChange} />
              </>
            )}
            {role === "constituency" && (
              <input name="constituency_id" placeholder="Constituency ID" required onChange={handleChange} />
            )}
            {/* Admin password or shared password input */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>

        {/* Admin & View Results Buttons (Spacing Preserved) */}
        <div className="button-group">
          <div className="admin-btn">
            <button onClick={() => {
              setRole("admin");
              setFormData({});
              setError("");
            }} className="btn">Admin Login</button>
          </div>
          <div className="view-results-btn">
            <button onClick={() => window.location.href = "/results"} className="btn">View Results</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
