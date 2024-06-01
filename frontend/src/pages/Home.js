import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Importing CSS for styling

const Home = () => {
  const [easternConference, setEasternConference] = useState([]);
  const [westernConference, setWesternConference] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/standings");
        const standings = response.data;
        setEasternConference(standings.filter((team) => team.conference === "East"));
        setWesternConference(standings.filter((team) => team.conference === "West"));
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, []);

  const renderTable = (teams, conferenceName) => (
    <div>
      <h2>{conferenceName} Conference</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Record</th>
            <th>GB</th>
            <th>Win%</th>
            <th>Home</th>
            <th>Road</th>
            <th>Last 10</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.team_id}>
              <td className='name'>{team.team_name}</td>
              <td>{team.conf}</td>
              <td>{team.gb}</td>
              <td>{team.w_pct}</td>
              <td>{team.home}</td>
              <td>{team.road}</td>
              <td>{team.last10}</td>
              <td>
                <a href={`/teams/${team.team_id}`}>Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {renderTable(easternConference, "Eastern")}
      {renderTable(westernConference, "Western")}
    </div>
  );
};

export default Home;
