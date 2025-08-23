import logo from '../assets/versus.png'
import '../App.css';
import { FaPlay, FaRandom } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

import { useRef } from 'react'

function New() {
  const navigate = useNavigate();
  const name1 = useRef(null);
  const name2 = useRef(null);

  const startGame = () => {
    if (name1.current.value === "" || name2.current.value === "") {
      alert("Ingresa el nombre de ambos jugadores.");
      return;
    }

    const temp = name1.current.value;
    const random = Math.random();
    if (random < 0.5) {
      name1.current.value = name2.current.value;
      name2.current.value = temp;
    }
    navigate("/play", {
      state: { player1: name1.current.value, player2: name2.current.value }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-names-container">
          <Input ref={name1} className="input-name" placeholder="Name 1" autoFocus />
          <img src={logo} className="App-logo" alt="logo" />
          <Input ref={name2} className="input-name" placeholder="Name 2" />
        </div>
        <Button className="btn-menu btn-play" onClick={startGame}>
          <FaPlay /> Jugar
        </Button>
      </header>
    </div>
  );
}

export default New;
