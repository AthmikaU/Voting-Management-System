import React, {useEffect, useState} from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function BallotPaper() {
    const [voter, setVote] = useState(null);
    // const navigate = useNavigate(); 

    useEffect(() => {
        const stored = localStorage.getItem("voterInfo");
        if (stored) {
        const { voter_id } = JSON.parse(stored);

        axios.get(`http://localhost:5000/vote/${voter_id}`)
            .then(res => setVote(res.data))
            .catch(() => setVote(null));
        }
    }, []);


    return(
        <h1 className="text-center mt-4 text-success">Ballot Paper for Voter </h1>
    );
}

export default BallotPaper;