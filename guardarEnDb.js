const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/nextviaje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", function (error) {
  console.log("Error conectandome a MongoDB", error);
  process.exit(1);
});

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
const Casa = mongoose.model("Casa", CasaEsquema);

exports.guardarCasas = async (casas) => {
  for (const casa of casas) {
    try {
      await new Casa(casa).save();
    } catch (error) {
      console.log(`Problema guardando casa con el titulo ${titulo}`, error);
    }
  }
};
