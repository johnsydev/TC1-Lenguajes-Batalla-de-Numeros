import logo from '../assets/logoapp-oficial.png'
import '../App.css';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

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

        <p className="server-status">{!data ? "Conectando al servidor..." : data}</p>
      </header>
    </div>
  );
}

export default Home;
