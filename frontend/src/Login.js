import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
  const [role, setRole] = useState("voter");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { ...formData, role });
      window.location.href = res.data.redirect;
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1 className="text-center mb-4">Login</h1>
        <ul className="nav nav-pills mb-3">
          {["voter", "party", "constituency"].map(r => (
            <li className="nav-item" key={r}>
              <button
                className={`nav-link ${role === r ? "active" : ""}`}
                onClick={() => { setRole(r); setError(""); setFormData({}); }}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            </li>
          ))}
        </ul>

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
              <input name="party_id" placeholder="Party ID" required onChange={handleChange} />
            )}
            {role === "constituency" && (
              <input name="constituency_id" placeholder="Constituency ID" required onChange={handleChange} />
            )}
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>


        {/* Admin Login Modal */}
        <div className="admin-btn text-center mt-4">
          <button onClick={() => setRole("admin")} className="btn">Admin Login</button>
        </div>
        {role === "admin" && (
          <form onSubmit={handleSubmit} className="mt-3">
            <input name="password" type="password" placeholder="Admin Password" required onChange={handleChange} />
            <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
          </form>
        )}
        <div className="text-center mt-3 view-results-btn ">
          <a href="/results" className="btn">View Results</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
