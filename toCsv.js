const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

const casas = JSON.parse(fs.readFileSync("./casas.json"));

const campos = [
  "titulo",
  "ubicacion",
  "precio",
  "numeroDeEstrellas",
  "numeroDeOpiniones",
  "url",
  {
    label: "baños",
    value: (row, campo) => {
      return row["comodidades"]["baños"] || campo.default;
    },
    dafault: "NULL",
  },
  {
    label: "habitaciones",
    value: (row, campo) => {
      return row["comodidades"]["habitaciones"] || campo.default;
    },
    dafault: "NULL",
  },
  {
    label: "camas",
    value: (row, campo) => {
      return row["comodidades"]["camas"] || campo.default;
    },
    dafault: "NULL",
  },
];

const json2csvParser = new Parser({ fields: campos });
const csv = json2csvParser.parse(casas);

fs.writeFileSync(path.join(__dirname, "casas.csv"), csv);
