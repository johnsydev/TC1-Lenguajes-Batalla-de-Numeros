const express = require("express");
const fs = require("fs")
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(express.json());

// Ruta inicial, petición GET, devuelve un mensaje para saber que el servidor está encendido.
app.get("/api", (req, res) => {
  res.json({ message: "Servidor online!" });
});

/*
  Dirección: /api/getHistory
  Petición: GET
  Descripción:
    Este método está encargado de abrir el archivo data.json y retornar la lista de juegos.
    Si el archivo data.json no existe, lo crea.
    Si ocurre un error desconocido, devuelve un mensaje de error con el código 500.
*/
app.get("/api/getHistory", (req, res) => {
  try {
    if (!fs.existsSync("data.json")) {S
      fs.writeFileSync("data.json", JSON.stringify({ games: [] }, null, 2));
    }
    const data = fs.readFileSync("data.json", "utf-8");
    const info = JSON.parse(data);
    res.json(info.games);
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

/*
  Dirección: /api/addGame
  Petición: POST
  Descripción:
    Recibe una petición que es un json con la información del juego.
    Luego, abre el archivo data.json y agrega el juego al array de juegos.
    Si el archivo data.json no existe, lo crea.
    Si ocurre un error desconocido, devuelve un mensaje de error con el código 500.
*/
app.post("/api/addGame", (req, res) => {
  try {
    if (!fs.existsSync("data.json")) {
      fs.writeFileSync("data.json", JSON.stringify({ games: [] }, null, 2));
    }
    const data = fs.readFileSync("data.json", "utf-8");
    const info = JSON.parse(data);
    info.games.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(info, null, 2));
    res.json({ status: "ok", message: "Juego agregado exitosamente" });
  } catch (err) {
    res.status(500).json({ status: "error", error: "No se pudo leer el archivo" });
  }
});

// Inicia el servidor e imprime en consola el puerto donde está funcionando.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});