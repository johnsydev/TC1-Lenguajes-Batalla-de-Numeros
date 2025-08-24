import '../App.css';

import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

/*
  Página que aparece si se ingresa a un enlace no existente.
*/
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title404">404</h1>
        <h2 className="subtitle404">Página no encontrada</h2>
      </header>
    </div>
  );
}

export default NotFound;
