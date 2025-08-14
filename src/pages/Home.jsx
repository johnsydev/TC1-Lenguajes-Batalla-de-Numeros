import logo from '../assets/logoapp-oficial.png'
import '../App.css';

import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Button className="btn-menu" onClick={() => navigate("/new")}>
          Jugar
        </Button>
        <Button className="btn-menu" onClick={() => navigate("/history")}>
          Historial de juegos
        </Button>
      </header>
    </div>
  );
}

export default Home;
