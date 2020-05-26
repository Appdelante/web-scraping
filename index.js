const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { guardarCasas } = require("./guardarEnDb");

(async () => {
  console.log("Empezando scrapper...");

  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 500,
  });
  const page = await browser.newPage();
  const casas = [];

  await page.goto("https://nextviaje.now.sh/");

  const urls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".FilaCasas__cartas a"),
      (nodo) => nodo.href
    )
  );

  for (const url of urls) {
    await page.goto(url);

    const detallesDeLaCasa = await page.evaluate(() => {
      const imagenes = [
        ...document.querySelectorAll(".CasaVista__fotos img"),
      ].map((img) => img.src);

      const titulo = document.querySelector(".CasaVista__titulo").innerText;
      const ubicacion = document.querySelector(".CasaVista__titulo + div")
        .innerText;
      const precio = Number(
        document
          .querySelector(".CasaVista__precio")
          .innerText.replace(/[^0-9]/g, "")
      );

      const comodidades = [
        ...document.querySelectorAll(".CasaVista__cuartos span"),
      ].reduce((acc, comodidad) => {
        const [cantidad, nombre] = comodidad.innerText.split(" ");
        acc[nombre] = Number(cantidad);

        return acc;
      }, {});

      const servicios = [
        ...document.querySelectorAll(".CasaVista__extra"),
      ].map((nodo) => nodo.innerText.toLowerCase());
      const numeroDeEstrellas = Number(
        document.querySelector(".Opiniones__numero-de-estrellas").innerText
      );
      const numeroDeOpiniones = Number(
        document
          .querySelector(".Opiniones__numero-de-opiniones")
          .innerText.replace(/[^0-9]/g, "")
      );

      return {
        imagenes,
        titulo,
        ubicacion,
        precio,
        comodidades,
        servicios,
        numeroDeEstrellas,
        numeroDeOpiniones,
        url: window.location.href,
      };
    });

    casas.push(detallesDeLaCasa);
  }

  // const data = JSON.stringify(casas);
  // fs.writeFileSync(path.join(__dirname, "casas.json"), data);

  await guardarCasas(casas);

  console.log("Casas guardadas exitosamente");

  await browser.close();
  process.exit();
})();
