const express = require("express");
const fs = require("fs")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Servidor online!" });
});

app.get("/api/getHistory", (req, res) => {
  try {
    const data = fs.readFileSync("data.json", "utf-8");
    const info = JSON.parse(data);
    res.json(info.games);
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

app.post("/api/addGame", (req, res) => {
  try {
    const data = fs.readFileSync("data.json", "utf-8");
    const info = JSON.parse(data);
    info.games.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(info, null, 2));
    res.json({ status: "ok", message: "Juego agregado exitosamente" });
  } catch (err) {
    res.status(500).json({ status: "error", error: "No se pudo leer el archivo" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});