import logo from '../assets/logoapp-oficial.png'
import '../App.css';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { formatDate } from '@/utils';
import { HiOutlineEmojiSad } from "react-icons/hi";

function GameHistory() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/getHistory")
      .then((res) => res.json())
      .then((data) => setData(data.games))
      .catch((error) => {
        setError(true);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {error && (
          <div className="error-server-message">
            <HiOutlineEmojiSad className="sad-icon" />
            <div>No se pudo conectar con el servidor, por favor intente más tarde.</div>
          </div>
        )}

        {!error && (
          <>
            <div>
              <h1>Historial de juegos</h1>
            </div>

            <table className="game-history-table">
                <thead className="game-history-header">
                    <tr>
                        <th>Duelo</th>
                        <th>Intentos</th>
                        <th>Tiempo</th>
                        <th>Ganador</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody className="game-history-data">
                    {data && data.map((game, index) => (
                        <tr key={index}>
                            <td>{game.players[0].name} <b>vs</b> {game.players[1].name}</td>
                            <td>{game.players[0].tries} <b>vs</b> {game.players[1].tries}</td>
                            <td>{game.players[0].time} <b>vs</b> {game.players[1].time}</td>
                            <td><b>{game.players[game.winner - 1].name}</b></td>
                            <td>{formatDate(new Date(game.date))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </>
        )}

      </header>
    </div>
  );
}

export default GameHistory;
