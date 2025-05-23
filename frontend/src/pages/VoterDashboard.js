import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VoterDashboard() {
  const [voter, setVoter] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const stored = localStorage.getItem("voterInfo");
    if (stored) {
      const { voter_id } = JSON.parse(stored);

      axios.get(`http://localhost:5000/voter/${voter_id}`)
        .then(res => setVoter(res.data))
        .catch(() => setVoter(null));
    }
  }, []);

  if (!voter) return <div>Loading voter info...</div>;

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light justify-content-between">
        <span className="navbar-brand h1">Online Voting Management System</span>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("voterInfo");
            navigate("/"); 
          }}
        >
          Logout
        </button>
      </nav>

      <h1 className="text-center mt-4">Welcome, {voter.first_name} {voter.last_name}!</h1>

      <div className="profile-container d-flex mt-4 p-3 bg-white rounded shadow">
        <img
          src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/person-circle.svg"
          alt="Profile Icon"
          style={{ width: 150, height: 150 }}
        />
        <div className="ml-4">
          <p><strong>Voter ID:</strong> {voter.voter_id}</p>
          <p><strong>Name:</strong> {voter.first_name} {voter.last_name}</p>
          <p>
            <strong>Constituency:</strong>{" "}
            {voter.constituency
                ? `${voter.constituency.constituency_id} - ${voter.constituency.name}`
                : "Not assigned"}
          </p>
          <p><strong>Address:</strong> {voter.address || ""}</p>
          <p><strong>Phone:</strong> {voter.phone || ""}</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/edit-profile")} 
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => navigate("/vote")} 
        >
          Vote Now
        </button>
      </div>
    </div>
  );
}

export default VoterDashboard;
