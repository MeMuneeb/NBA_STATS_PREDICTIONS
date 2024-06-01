import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Teams.css";
import useSortableData from "../hooks/useSortableData";

function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teams")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => console.error("Failed to fetch teams:", err));
  }, []);

  const {
    items: sortedTeams,
    requestSort,
    sortIndicator,
  } = useSortableData(teams, { key: "w_pct", direction: "descending" });

  return (
    <div className='teams-container'>
      <h1>Teams</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("team_name")}>Team {sortIndicator("team_name")}</th>
            <th onClick={() => requestSort("w_pct")}>Win% {sortIndicator("w_pct")}</th>
            <th onClick={() => requestSort("fg_pct")}>FG% {sortIndicator("fg_pct")}</th>
            <th onClick={() => requestSort("ast")}>AST {sortIndicator("ast")}</th>
            <th onClick={() => requestSort("reb")}>REB {sortIndicator("reb")}</th>
            <th onClick={() => requestSort("tov")}>TOV {sortIndicator("tov")}</th>
            <th onClick={() => requestSort("stl")}>STL {sortIndicator("stl")}</th>
            <th onClick={() => requestSort("blk")}>BLK {sortIndicator("blk")}</th>
            <th onClick={() => requestSort("plus_minus")}>+/- {sortIndicator("plus_minus")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr key={team._id} onClick={() => (window.location.href = `/teams/${team.team_id}`)}>
              <td>{team.team_name}</td>
              <td>{team.w_pct}</td>
              <td>{team.fg_pct}</td>
              <td>{team.ast}</td>
              <td>{team.reb}</td>
              <td>{team.stl}</td>
              <td>{team.blk}</td>
              <td>{team.tov}</td>
              <td>{team.plus_minus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamsPage;
