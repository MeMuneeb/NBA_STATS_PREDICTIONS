import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Predictor.css";

function Predictor() {
  const [teams, setTeams] = useState([]);
  const [team1_id, setTeam1_id] = useState("");
  const [team2_id, setTeam2_id] = useState("");
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teams") // Fetch all teams
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePrediction = () => {
    console.log(team1_id, team2_id);
    axios
      .post("http://localhost:3000/api/predictions", { team1_id, team2_id })
      .then((res) => {
        setPrediction(res.data.prediction);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='predictor'>
      <h2>Match Predictor</h2>
      <div>
        <select className='dropdown' value={team1_id} onChange={(e) => setTeam1_id(e.target.value)}>
          <option value=''>Select Team 1</option>
          {teams.map((team) => (
            <option key={team.team_id} value={team.team_id}>
              {team.team_name}
            </option>
          ))}
        </select>
        <select className='dropdown' value={team2_id} onChange={(e) => setTeam2_id(e.target.value)}>
          <option value=''>Select Team 2</option>
          {teams.map((team) => (
            <option key={team.team_id} value={team.team_id}>
              {team.team_name}
            </option>
          ))}
        </select>
        <button onClick={handlePrediction}>Predict</button>
      </div>
      {prediction && <h4>Prediction Result: {prediction}</h4>}
    </div>
  );
}

export default Predictor;
