// src/pages/ResultsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for back navigation
import axios from "axios";
import "../styles/results_page.css";

function ResultsPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [electionConducted, setElectionConducted] = useState(false);
    const navigate = useNavigate(); // initialize navigate

    useEffect(() => {
    async function fetchData() {
        try {
        const statusRes = await axios.get("http://localhost:5000/admin/election-status");
        setElectionConducted(statusRes.data.conducted);
        const resultsPublished = statusRes.data.resultsPublished;

        if (statusRes.data.conducted && resultsPublished) {
            const res = await axios.get("http://localhost:5000/admin/results");
            setResults(res.data);
        }
        } catch (err) {
        setError("⚠️ Failed to fetch results or status.");
        } finally {
        setLoading(false);
        }
    }

    fetchData();
    }, []);

  const handleBack = () => {
    navigate(-1); // go back one page
  };

  if (loading) return <div className="results-container"><p>Loading results...</p></div>;
  if (error) return <div className="results-container"><p className="error">{error}</p></div>;

  return (
    <div className="results-container">
      <h1 className="text-center  my-4 mt-2">ONLINE VOTING MANAGEMENT SYSTEM</h1>
      <h2 className="results-title">ELECTION RESULTS</h2>

      {!electionConducted ? (
        <div className="result-card">
          <p className="no-election text-black">🚫 No election has been conducted yet.</p>
        </div>
      ) : results.length === 0 ? (
        <div className="result-card">
          <p className="no-results">Results have not been published yet.</p>
        </div>
      ) : (
        results.map(({ constituency, winner }) => (
          <div className="result-card" key={constituency.id}>
            <h3 className="constituency-name">
              {constituency.id} : {constituency.name}
            </h3>
            <p className="winner-info">
              Winner: <strong>{winner.name}</strong> (Party: <strong>{winner.party_name}</strong>)<br />
              Votes: <strong>{winner.votes}</strong>
            </p>
          </div>
        ))
      )}

      <button className="back-button" onClick={handleBack}>← Back</button>
    </div>
  );
}

export default ResultsPage;