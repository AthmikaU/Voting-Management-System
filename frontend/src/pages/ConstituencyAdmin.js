// src/pages/ConstituencyAdmin.js
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/constituency.css';

function ConstituencyAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("constituencyInfo"); // store login info
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light justify-content-between">
        <span className="navbar-brand h1">Online Voting Management System</span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <h1 className="text-center mt-4">Welcome, Constituency Admin!</h1>

      <div className="profile-container d-flex mt-4 p-3 bg-white rounded shadow align-items-center">
        <img
          src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/person-circle.svg"
          alt="Profile Icon"
          style={{ width: 150, height: 150 }}
        />
        <div className="ms-5">
          <p><strong>Role:</strong> Constituency Admin</p>
          <p><strong>Privileges:</strong> Manage voter records, oversee election processes in the constituency, monitor candidate participation, etc.</p>
        </div>
      </div>
    </div>
  );
}

export default ConstituencyAdmin;
