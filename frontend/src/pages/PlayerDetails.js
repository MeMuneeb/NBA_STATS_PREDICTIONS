import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/PlayerDetails.css";

function PlayerDetails() {
  const { player_id } = useParams(); // Extracting playerId from URL params
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/players/${player_id}`);
        console.log(response);
        setPlayer(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch player details:", error);
      }
    };

    fetchPlayerDetails();
  }, [player_id]);

  if (!player) {
    return <p>Loading...</p>;
  }

  return (
    <div className='player-details-container'>
      <h1>{player.player_name}</h1>
      <div className='player-stats'>
        <p>Team: {player.team_abbreviation}</p>
        <p>PTS: {player.pts}</p>
        <p>WIN%: {player.w_pct}%</p>
        <p>FG%: {player.fg_pct}%</p>
        <p>AST: {player.ast}</p>
        <p>REB: {player.reb}</p>
        <p>STL: {player.stl}</p>
        <p>BLK: {player.blk}</p>
        <p>TOV: {player.tov}</p>
        <p>+/-: {player.plus_minus}</p>
      </div>
    </div>
  );
}

export default PlayerDetails;
