export function getTip(input, secretNumber) {
  if (input < secretNumber) return "Más alto";
  if (input > secretNumber) return "Más bajo";
  return "¡Correcto!";
}

export function formatTime(timer) {
  const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function formatDate(date) {
  const fecha = date;
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const anio = date.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${anio}`;
  return fechaFormateada;
}

export function checkWinner(users) {
  const tries1 = users[0].getTotalTries();
  const tries2 = users[1].getTotalTries();

  if (tries1 == tries2)
  {
    const times1 = users[0].getTotalTime();
    const times2 = users[1].getTotalTime();

    if (times1 == times2) return 0;
    if (times1 < times2) return 1;
    return 2;
  }

  if (tries1 < tries2) return 1;
  return 2;

}