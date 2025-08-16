import logo from '../assets/react.svg'
import '../App.css';

import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect, useRef } from 'react';
import { getTip, formatTime } from '@/utils';

function Play() {
  const navigate = useNavigate();

  //inputs and vars
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState(null);
  const [numberInput, setNumberInput] = useState(null);

  //alerts
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertTitle, setAlertTitle] = useState("Incorrecto");

  //try
  const [users, setUsers] = useState([
    { id: 1, name: "Name 1", tries: [] },
    { id: 2, name: "Name 2", tries: [] },
  ]);

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
  }, []);

  const handleNumber = () => {
    if (numberInput == null) return;
    setCount(count + 1);
    if (numberInput == guess)
    {
      setAlertTitle("Correcto!");
      stopTimer();
    }
    if (!alertVisible) setAlertVisible(true);
    users[0].tries.push(numberInput);

    const pista = getTip(numberInput, guess);
    setAlertMsg(pista);
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
              <h1>Estadísticas del juego</h1>
              <div className="stats-player">
                <div className="stats-item stats-item-name">
                  <span>Jugador: </span>
                  <span>{users[0].name}</span>
                </div>
                

              </div>
              <div className="stats-player">
                <div className="stats-item stats-item-name">
                  <span>Jugador: </span>
                  <span>{users[0].name}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="ingame-section">

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

            <Input className="btn-menu btn-play" placeholder="Número" onChange={(e) => setNumberInput(e.target.value)} />
            <button className="btn-menu btn-play" onClick={handleNumber}>
              Comprobar
            </button>

            <div className="info-tips">

              {alertVisible && (
                <Alert>
                  <AlertTitle>{alertTitle}</AlertTitle>
                  <AlertDescription>
                    {alertMsg}
                  </AlertDescription>
                </Alert>
              )}
            </div>

          </div>

          <div className="ingame-numberhistory">
            <ul>
              {
                users[0].tries.map((tryy, index) => (
                  <li className="ingame-numberhistory-item" key={index}>{tryy}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Play;
