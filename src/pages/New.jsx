import logo from '../assets/react.svg'
import '../App.css';

function New() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input type="button" className="btn-menu btn-play" value="NEW" />
        <input type="button" className="btn-menu btn-history" value="Historial de juegos" />
      </header>
    </div>
  );
}

export default New;
