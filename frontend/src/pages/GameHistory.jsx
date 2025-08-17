import '../App.css';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { formatDate, formatTime } from '@/utils';
import { HiOutlineEmojiSad } from "react-icons/hi";
import logo from '../assets/versus2.png'

function GameHistory() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/getHistory")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {error==true && (
          <div className="error-server-message">
            <HiOutlineEmojiSad className="sad-icon" />
            <div>No se pudo conectar con el servidor, por favor intente más tarde.</div>
          </div>
        )}

        {error==false && (
          <>
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
                            <td><span className={game.winner-1==0 ? "textBold" : ""}>{game.players[0].name}</span> <img src={logo} className="versus-logo" alt="logo" /> <span className={game.winner-1==1 ? "textBold" : ""}>{game.players[1].name}</span></td>
                            <td>{game.players[0].tries} <i>vs</i> {game.players[1].tries}</td>
                            <td>{formatTime(game.players[0].time)} <i>vs</i> {formatTime(game.players[1].time)}</td>
                            <td>{game.winner!=0 ? game.players[game.winner - 1].name : (<i>Empate</i>)}</td>
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
