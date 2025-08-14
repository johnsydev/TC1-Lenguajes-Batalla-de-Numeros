import logo from '../assets/react.svg'
import '../App.css';

import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"

function Play() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Input className="btn-menu btn-play" placeholder="JUGANDO 1" />
        <Input className="btn-menu btn-history" placeholder="Name 2" />
        <button className="btn-menu btn-play" onClick={() => navigate("/play")}>
          Jugar
        </button>
      </header>
    </div>
  );
}

export default Play;
