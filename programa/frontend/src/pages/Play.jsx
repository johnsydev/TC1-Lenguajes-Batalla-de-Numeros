import logo from '../assets/versus2.png'
import '../App.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect, useRef } from 'react';
import { getTip, formatTime, checkWinner } from '@/utils';
import Player from '@/classes/Player'

const API_URL = import.meta.env.VITE_API_URL || "/api";

/*
  Página para jugar.
  Contiene toda la lógica y flujo del juego.
*/
function Play() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.player1) {
      navigate("/new", { replace: true });
    }
  }, [location, navigate]);

  if (!location.state?.player1) {
    return null;
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

  const [playing, setPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  /*
  Función para finalizar el juego.
  Envía la información del juego al backend.
  */
  const endGame = () => {

    const numWinner = checkWinner(users)-1;
    setGameEnded(true);

    fetch(`${API_URL}/addGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        players: users.map((user) => ({
          name: user.name,
          tries: user.getTotalTries(),
          time: user.getTotalTime(),
        })),
        winner: numWinner + 1,
        date: new Date().toISOString(),
      }),
    });
  };

  /*
  Función para cambiar de turno de jugador
  Reinicia las variables necesarias y continúa con el siguiente jugador.
  Si se acabaron las 3 rondas, se envía a la función endGame.
  */
  const nextPlayer = () => {
    //clean data
    setGuess(null);
    setCount(0);
    setNumberInput("");
    setAlertVisible(false);
    setAlertTitle("Incorrecto");
    setIsRunning(false);
    setTimer(0);
    timerRunning.current = false;

    currentPlayer.addRound();

    if (currentPlayer == users[0]) {
      setCurrentPlayer(users[1]);
    }
    else {
      if (currentPlayer.getCurrentRound() == 4) {
        endGame();
        return;
      }
      setCurrentPlayer(users[0]);
    }
  };

  /*
  Función para iniciar un turno.
  Establece el número aleatorio e inicia el cronómetro.
  */
  const startRound = () => {
    const numero = Math.floor(Math.random() * 100) + 1;
    setGuess(numero);
    startTimer();
    inputRef.current?.focus();
  };

  // Inicia los turnos cada vez que cambia un jugador de ronda.
  useEffect(() => {
    if (currentPlayer && gameStarted && playing) {
      startRound();
    }
  }, [currentPlayer]);

  /*
  Función para obtener el número que se ingresa para intentar adivinar.
  Agrega el intento, muestra mensajes de ayuda.
  Si se adivina el número detiene el cronómetro y pasa al siguiente turno con nextPlayer.
  */
  const handleNumber = async () => {
    if (numberInput == null || numberInput == "") return;
    setCount(count + 1);
    currentPlayer.addTry(numberInput);
    if (numberInput == guess)
    {
      setAlertTitle("Correcto!");
      currentPlayer.addTime(timer);
      stopTimer();
      setPlaying(false);
      nextPlayer();
    }
    if (!alertVisible) setAlertVisible(true);
    
    const pista = getTip(numberInput, guess);
    setAlertMsg(pista);
    setNumberInput("");
    inputRef.current?.focus();
  };

  /*
  Función para iniciar el cronómetro.
  */
  const startTimer = () => {
    if (timerRunning.current) return;
    if (isRunning) return;

    timerRunning.current = true;
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((actual) => actual + 1);
    }, 1000);
  };

  /*
  Función para detener el cronómetro.
  */
  const stopTimer = () => {
    if (!isRunning) return;
    timerRunning.current = false;
    setIsRunning(false);
    clearInterval(timeInterval.current);
  };

  /*
  Función para iniciar la ronda y salir de la pantalla de pausa.
  */
  const handleResume = () => {

    setPlaying(true);
    if (!gameStarted)
    {
      setCurrentPlayer(users[0]);
      setGameStarted(true);
      startRound();
    }
    else {
      startRound();
    }
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
                    <div key={index} className="stats-details-player">
                      <div className="stats-item stats-item-name">
                        <span>Jugador {index+1}: </span>
                        <span>{player.name}</span>
                      </div>
                      
                      {
                        users[0].getTries().map((x, count) => (
                          <div className="round-stats-container" key={count}>
                            <div className="stats-item stats-item-col">
                              <span><b>Ronda {count+1}:</b></span>
                            </div>
                            <div className="stats-item-col">
                              <div className="stats-item">
                                <span>Intentos: {player.getTries()[count].length}</span>
                              </div>
                              <div className="stats-item">
                                <span>Tiempo: {formatTime(player.getTimes()[count])}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      }

                    </div>
                  ))

                }
              </div>

            </div>
          </div>

          {playing && (
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

              <Input type="number" className="btn-menu btn-game" ref={inputRef} placeholder="Número" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} />
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
          )}

          {!playing && !gameEnded && (
            <div className="ingame-section game-stopped">
              <h1>{gameStarted ? "¡Correcto!" : "¡Bienvenido!"}</h1>
              {gameStarted && (
                <div className="info-container">
                  <div className="info-tries">
                    <span>Intentos: </span>
                    <span>{users[currentPlayer.getOtherId()].getLastRoundInfo().tries}</span>
                  </div>
                  <div className="info-time">
                    <span>Tiempo: </span>
                    <span>{formatTime(users[currentPlayer.getOtherId()].getLastRoundInfo().time)}</span>
                  </div>
                </div>
              )}
              <p>El juego está en pausa. Reanuda para continuar jugando.</p>
              <p>Ronda: {currentPlayer.getCurrentRound()}</p>
              <p>Es turno de: {currentPlayer.name}</p>
              {!gameStarted && (
                <button className="btn-menu btn-game" onClick={handleResume}>Iniciar juego</button>
              )}
              {gameStarted && (
                <button className="btn-menu btn-game" onClick={handleResume}>Iniciar turno</button>
              )}
            </div>
          )}

          {gameEnded && (
            <div className="ingame-section game-ended">
              <div className="endinfo-container">
                <h1>¡Juego terminado!</h1>
                <div>
                  <span className={checkWinner(users)-1==0 ? "textBold" : ""}>{users[0].name}</span> <img src={logo} className="versus-logo" alt="logo" /> <span className={checkWinner(users)-1==1 ? "textBold" : ""}>{users[1].name}</span>
                </div>
                <div>
                  <span>Intentos: </span>
                  <span>{users[0].getTotalTries()} <i>vs</i> {users[1].getTotalTries()}</span>
                </div>
                <div>
                  <span>Tiempo: </span>
                  <span>{formatTime(users[0].getTotalTime())} <i>vs</i> {formatTime(users[1].getTotalTime())}</span>
                </div>
                <div>
                  <span>Puedes ver la información de cada ronda en el panel izquierdo</span>
                </div>
                <div>
                  <span><b>{checkWinner(users) === 0 ? (<i>Empate</i>) : `Ganador: ${users[checkWinner(users) - 1].name}`}</b></span>
                </div>
              </div>
            </div>
          )}

          <div className="ingame-numberhistory">
            
            <div className="numberhistory-container">
              {!gameEnded && (
                <>
                  <h1 className="title-section">Historial</h1>
                  <ul>
                      
                    {
                    currentPlayer?.getCurrentTries()?.length==0 && (
                      <li className="ingame-numberhistory-item">No hay historial</li>
                    )
                    }

                    {
                    currentPlayer?.getCurrentTries()?.map((tryy, index) => (
                      <li className="ingame-numberhistory-item" key={index}>{tryy}</li>
                    ))
                    }
                      
                  </ul>
                </>
              )}
            </div>
            
          </div>
        </div>
      </header>
    </div>
  );
}

export default Play;
