import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/TeamDetails.css"; 
import useSortableData from "../hooks/useSortableData";

const TeamDetails = () => {
  const { team_id } = useParams(); // Getting team_id from URL
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const {
    items: sortedPlayers,
    requestSort,
    sortIndicator,
  } = useSortableData(players, { key: "pts", direction: "descending" });

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamResponse = await axios.get(`http://localhost:3000/api/teams/${team_id}`);
        console.log(teamResponse);
        setTeam(teamResponse.data.team[0]);
        const playersResponse = await axios.get(`http://localhost:3000/api/teams/${team_id}`);
        setPlayers(playersResponse.data.players);
      } catch (error) {
        console.error("Failed to fetch team details:", error);
      }
    };
    fetchTeamDetails();
  }, [team_id]); // Dependency array includes team_id to refetch if it changes

  return (
    <div className='team-details-container'>
      <div className='team-stats'>
        <h2>{team.team_name}</h2>
        <p>Win%: {team.w_pct}</p>
        <p>FG%: {team.fg_pct}</p>
        <p>AST: {team.ast}</p>
        <p>REB: {team.reb}</p>
        <p>STL: {team.stl}</p>
        <p>BLK: {team.blk}</p>
        <p>TOV: {team.tov}</p>
        <p>+/-: {team.plus_minus}</p>
      </div>
      <div className='player-stats'>
        <h3>Players</h3>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("player_name")}>
                Name {sortIndicator("player_name")}
              </th>
              <th onClick={() => requestSort("pts")}>PTS {sortIndicator("pts")}</th>
              <th onClick={() => requestSort("w_pct")}>WIN% {sortIndicator("w_pct")}</th>
              <th onClick={() => requestSort("fg_pct")}>FG% {sortIndicator("fg_pct")}</th>
              <th onClick={() => requestSort("ast")}>AST {sortIndicator("ast")}</th>
              <th onClick={() => requestSort("reb")}>REB {sortIndicator("reb")}</th>
              <th onClick={() => requestSort("stl")}>STL {sortIndicator("stl")}</th>
              <th onClick={() => requestSort("blk")}>BLK {sortIndicator("blk")}</th>
              <th onClick={() => requestSort("tov")}>TOV {sortIndicator("tov")}</th>
              <th onClick={() => requestSort("plus_minus")}>+/- {sortIndicator("plus_minus")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr
                key={player._id}
                onClick={() => (window.location.href = `/players/${player.player_id}`)}
              >
                <td>{player.player_name}</td>
                <td>{player.pts}</td>
                <td>{player.w_pct}</td>
                <td>{player.fg_pct}</td>
                <td>{player.ast}</td>
                <td>{player.reb}</td>
                <td>{player.stl}</td>
                <td>{player.blk}</td>
                <td>{player.tov}</td>
                <td>{player.plus_minus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDetails;
