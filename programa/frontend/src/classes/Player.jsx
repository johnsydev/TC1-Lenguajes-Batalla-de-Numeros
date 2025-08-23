/*
  Nombre: Player
  Parámetros de entrada: El constructor no tiene.
  Descripción: Clase encargada de manejar los datos del jugador en cada ronda.
*/
class Player {
  static uid = 0;
  constructor(name) {
    this.id = Player.uid;
    this.name = name;
    this.tries = [[], [], []];
    this.times = [0, 0, 0];
    this.roundActual = 1;
    Player.uid++;
  }

  // Agrega un número que fue intentado por el jugador a la ronda actual
  addTry(tryValue) {
    this.tries[this.roundActual-1].push(tryValue);
  }

  // Agrega el tiempo tardado adivinando el número en la ronda actual
  addTime(timeValue) {
    this.times[this.roundActual-1] = timeValue;
  }

  // Agrega una nueva ronda al contador de rondas
  addRound() {
    this.roundActual++;
  }

  // Retorna un array de 3 elementos, que dentro de ellos contiene los números intentados por el jugador en cada ronda
  getTries() {
    return this.tries;
  }

  // Retorna un array con los números intentados por el jugador en la ronda actual
  getCurrentTries() {
    return this.tries[this.roundActual - 1];
  }

  // Retorna un array de 3 elementos con los tiempos tardados por el jugador en cada ronda
  getTimes() {
    return this.times;
  }

  // Retorna el número de ronda actual
  getCurrentRound() {
    return this.roundActual;
  }

  // Retorna el total de intentos realizados por el jugador sumando las 3 rondas
  getTotalTries() {
    return this.tries[0].length + this.tries[1].length + this.tries[2].length;
  }

  // Retorna el total de tiempo tardado por el jugador sumando las 3 rondas
  getTotalTime() {
    return this.times.reduce((a, b) => a + b, 0);
  }

  // Retorna el id del otro jugador (no del actual)
  getOtherId() {
    return this.id == 0 ? 1 : 0;
  }

  // Obtiene la información de la ronda anterior
  // Como luego de ganar se agrega una ronda, entonces por eso se utiliza -2
  getLastRoundInfo() {
    return { tries: this.tries[this.roundActual-2].length, time: this.times[this.roundActual-2] }
  }
}


export default Player;