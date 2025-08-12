import logo from '../assets/react.svg'
import '../App.css';

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Link to="/new" className="btn-menu">
          Jugar
        </Link>
        <Link to="/history" className="btn-menu">
          Historial de juegos
        </Link>
      </header>
    </div>
  );
}

export default Home;
