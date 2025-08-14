import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
        <div className="navlinks">
            <Link to="/new">New game</Link>
        </div>
        <div className="navtitle">
            Numbers Battle
        </div>
        <div className="navlinks">
            <Link to="/history">History</Link>
        </div>
    </nav>
  );
}