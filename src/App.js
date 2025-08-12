import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input type="button" className="btn-menu btn-play" value="Jugar" />
        <input type="button" className="btn-menu btn-history" value="Historial de juegos" />
      </header>
    </div>
  );
}

export default App;
