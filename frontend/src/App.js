import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Predictor from "./pages/Predictor";
import TeamDetails from "./pages/TeamDetails";
import PlayerDetails from "./pages/PlayerDetails";
import Teams from "./pages/Teams";
import Players from "./pages/Players";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/predictions' element={<Predictor />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/players' element={<Players />} />
            <Route path='/teams/:team_id' element={<TeamDetails />} />
            <Route path='/players/:player_id' element={<PlayerDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
