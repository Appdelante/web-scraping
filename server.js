const express = require("express");
const mongoose = require("mongoose");
const Casa = require("./casa");

mongoose.connect("mongodb://127.0.0.1:27017/nextviaje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", function (error) {
  console.log("Error conectandome a MongoDB", error);
  process.exit(1);
});

const app = express();
const puerto = 3010;

app.get("/api/casas", async (req, res) => {
  const {
    numeroDeEstrellas,
    servicios,
    comodidad,
    numeroDeComodidad,
  } = req.query;

  const query = {};

  if (numeroDeEstrellas) {
    query.numeroDeEstrellas = Number(numeroDeEstrellas);
  }

  if (servicios) {
    const s = servicios.split(",");
    query.servicios = { $all: s };
  }

  if (comodidad && numeroDeComodidad) {
    query[`comodidades.${comodidad}`] = Number(numeroDeComodidad);
  }

  const resultados = await Casa.find(query);

  res.json(resultados);
});

app.listen(puerto, () => console.log(`Escuchando en puerto: ${puerto}`));
