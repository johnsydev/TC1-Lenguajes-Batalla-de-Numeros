import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
        <div className="navlinks">
            <Link to="/new">Nuevo juego</Link>
        </div>
        <div className="navtitle">
            <Link to="/">Batalla de Números</Link>
        </div>
        <div className="navlinks">
            <Link to="/history">Historial</Link>
        </div>
    </nav>
  );
}