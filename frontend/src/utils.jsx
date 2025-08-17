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