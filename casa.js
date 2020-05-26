const mongoose = require("mongoose");

const CasaEsquema = new mongoose.Schema({
  imagenes: [{ type: String }],
  titulo: String,
  ubicacion: String,
  precio: Number,
  comodidades: { habitaciones: Number, camas: Number, baños: Number },
  servicios: [{ type: String }],
  numeroDeEstrellas: Number,
  numeroDeOpiniones: Number,
  url: String,
});

module.exports = mongoose.model("Casa", CasaEsquema);
