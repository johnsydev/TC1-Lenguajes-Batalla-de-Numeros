class Player {
  constructor(name) {
    this.name = name;
    this.tries = [[], [], []];
    this.times = ["", "", ""];
    this.roundActual = 1;
  }

  addTry(tryValue) {
    this.tries[this.roundActual-1].push(tryValue);
  }

  addTime(timeValue) {
    this.times[this.roundActual-1] = timeValue;
  }

  addRound() {
    this.roundActual++;
  }

  getTries() {
    return this.tries;
  }

  getCurrentTries() {
    return this.tries[this.roundActual - 1];
  }

  getTimes() {
    return this.times;
  }

  getCurrentRound() {
    return this.roundActual;
  }
}


export default Player;