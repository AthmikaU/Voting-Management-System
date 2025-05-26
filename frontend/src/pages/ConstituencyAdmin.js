import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/constituency.css";

function ConstituencyAdmin() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [constituencyId, setConstituencyId] = useState("");

  // Function to fetch candidates by constituencyId
  const fetchCandidates = (id) => {
    axios
      .get(`http://localhost:5000/candidates/${id}`)
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error("Error fetching candidates:", err);
      });
  };

  useEffect(() => {
    const constituencyInfo = JSON.parse(localStorage.getItem("constituencyInfo"));
    if (!constituencyInfo) {
      navigate("/");
      return;
    }

    const id = constituencyInfo.constituency_id;
    setConstituencyId(id);
    fetchCandidates(id);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("constituencyInfo");
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
          <p><strong>Privileges:</strong> Manage voter records, oversee election processes, monitor candidate participation, etc.</p>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="mt-5">
        <h4>Candidates in {constituencyId}</h4>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Candidate ID</th>
              <th>Candidate Name</th>
              <th>Party Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No candidates found</td>
              </tr>
            ) : (
              candidates.map((candidate, index) => (
                <tr key={candidate.candidate_id}>
                  <td>{index + 1}</td>
                  <td>{candidate.candidate_id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.party_name}</td>
                  <td>{candidate.votes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConstituencyAdmin;
