import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>NBA Stats and Predictions</h1>
        </Link>
        <nav>
          <div>
            <Link to='/predictions'>Predictor</Link>
            <Link to='/teams'>Teams</Link>
            <Link to='/players'>Players</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
