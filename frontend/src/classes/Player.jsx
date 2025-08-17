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

  getTotalTries() {
    return this.tries[0].length + this.tries[1].length + this.tries[2].length;
  }

  getTotalTime() {
    return this.times.reduce((a, b) => a + b, 0);
  }

  getOtherId() {
    return this.id == 0 ? 1 : 0;
  }

  getLastRoundInfo() {
    return { tries: this.tries[this.roundActual-2].length, time: this.times[this.roundActual-2] }
  }
}


export default Player;