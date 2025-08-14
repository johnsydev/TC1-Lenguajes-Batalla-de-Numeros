import logo from '../assets/versus.png'
import '../App.css';

import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

function New() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        

        <div className="input-names-container">
          <Input className="input-name" placeholder="Name 1" />
          <img src={logo} className="App-logo" alt="logo" />
          <Input className="input-name" placeholder="Name 2" />
        </div>
        <Button className="btn-menu btn-play" onClick={() => navigate("/play")}>
          Jugar
        </Button>
      </header>
    </div>
  );
}

export default New;
