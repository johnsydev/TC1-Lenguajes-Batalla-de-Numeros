import logo from '../assets/react.svg'
import '../App.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect, useRef } from 'react';
import { getTip, formatTime } from '@/utils';
import Player from '@/classes/Player'

function Play() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.player1) {
      navigate("/new", { replace: true });
    }
  }, [location, navigate]);

  if (!location.state?.player1) {
    return null; // evita renderizar basura mientras redirige
  }

  //inputs and vars
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState(null);
  const [numberInput, setNumberInput] = useState("");
  const inputRef = useRef(null);

  //alerts
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertTitle, setAlertTitle] = useState("Incorrecto");

  const [users, setUsers] = useState(() => [
    new Player(location.state.player1),
    new Player(location.state.player2),
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(users[0]);


  //cronometer
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRunning = useRef(false);
  let timeInterval = useRef(null);

  useEffect(() => {
    const numero = Math.floor(Math.random() * 100) + 1;
    setGuess(numero);
    startTimer();
    console.log("Número a adivinar:", numero);
    inputRef.current?.focus();
  }, []);

  const handleNumber = () => {
    if (numberInput == null || numberInput == "") return;
    setCount(count + 1);
    if (numberInput == guess)
    {
      setAlertTitle("Correcto!");
      currentPlayer.addTime(formatTime(timer))
      stopTimer();
    }
    if (!alertVisible) setAlertVisible(true);
    currentPlayer.addTry(numberInput);

    const pista = getTip(numberInput, guess);
    setAlertMsg(pista);
    setNumberInput("");
    inputRef.current?.focus();
  };

  const startTimer = () => {
    if (timerRunning.current) return;
    if (isRunning) return;

    timerRunning.current = true;
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((actual) => actual + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (!isRunning) return;
    timerRunning.current = false;
    setIsRunning(false);
    clearInterval(timeInterval.current);
  };


  return (
    <div className="App">
      <header className="App-header">
        
        <div className="playgame">
          <div className="ingame-stats">
            <div className="stats-container">
              <h1 className="title-section">Estadísticas del juego</h1>
              <div className="stats-player">
                {
                  
                  users.map((player, index) => (
                    <div className="stats-details-player">
                      <div className="stats-item stats-item-name">
                        <span>Jugador {index+1}: </span>
                        <span>{player.name}</span>
                      </div>
                      
                      {
                        users[0].getTries().map((x, count) => (
                          <>
                            <div className="stats-item">
                              <span>Ronda {count+1}: </span>
                            </div>
                            <div className="stats-item">
                              <span>Intentos: {player.getTries()[count].length}</span>
                            </div>
                            <div className="stats-item">
                              <span>Tiempo: {player.getTimes()[count]}</span>
                            </div>
                            <hr />
                          </>
                        ))
                      }

                    </div>
                  ))

                }
              </div>

            </div>
          </div>

          <div className="ingame-section">
            <div className="game-header">
              <h1>Ronda {currentPlayer.getCurrentRound()}</h1>
              <h2>Turno de: {currentPlayer.name}</h2>
            </div>
            <div className="info-container">
              <div className="info-tries">
                <span>Intentos: </span>
                <span>{count}</span>
              </div>
              <div className="info-time">
                <span>Tiempo: </span>
                <span>{formatTime(timer)}</span>
              </div>

            </div>

            <Input className="btn-menu btn-game" ref={inputRef} placeholder="Número" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} />
            <button className="btn-menu btn-game" onClick={handleNumber}>
              Comprobar
            </button>

            <div className="info-tips">

              {alertVisible && (
                <Alert className="bg-transparent text-white border border-white">
                  <AlertTitle>{alertTitle}</AlertTitle>
                  <AlertDescription>
                    {alertMsg}
                  </AlertDescription>
                </Alert>
              )}
            </div>

          </div>

          <div className="ingame-numberhistory">
            
            <div className="numberhistory-container">
              <h1 className="title-section">Historial</h1>
              <ul>
                  
                {
                currentPlayer.getCurrentTries().length==0 && (
                  <li className="ingame-numberhistory-item">No hay historial</li>
                )
                }

                {
                currentPlayer.getCurrentTries().map((tryy, index) => (
                  <li className="ingame-numberhistory-item" key={index}>{tryy}</li>
                ))
                }
                  
              </ul>
            </div>
            
            
          </div>
        </div>
      </header>
    </div>
  );
}

export default Play;
