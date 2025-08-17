const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Servidor online!" });
});

app.get("/api/getHistory", (req, res) => {
  res.json(
    { games: [
        {
            players: [{name: "Johnsy", tries: 17, time:234}, {name: "David", tries: 25, time:253}], 
            winner: 1,
            date: new Date("2025-08-15")
        },
        {
            players: [{name: "Sergio", tries: 32, time:302}, {name: "Erin", tries: 26, time:287}], 
            winner: 2,
            date: new Date("2025-08-16")
        }
    ] }
);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});