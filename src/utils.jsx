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