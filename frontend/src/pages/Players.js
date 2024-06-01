import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Players.css";
import useSortableData from "../hooks/useSortableData";

function PlayersPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/players")
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => console.error("Failed to fetch players:", err));
  }, []);

  const {
    items: sortedPlayers,
    requestSort,
    sortIndicator,
  } = useSortableData(players, { key: "pts", direction: "descending" });

  return (
    <div className='players-container'>
      <h1>NBA Players</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("player_name")}>Name {sortIndicator("player_name")}</th>
            <th onClick={() => requestSort("team_abbreviation")}>
              Team {sortIndicator("team_abbreviation")}
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
              <td>{player.team_abbreviation}</td>
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
  );
}

export default PlayersPage;
