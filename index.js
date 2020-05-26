const puppeteer = require("puppeteer");

(async () => {
  console.log("Empezando scrapper...");

  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 500,
  });
  const page = await browser.newPage();

  await page.goto("https://nextviaje.now.sh/");

  const urls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".FilaCasas__cartas a"),
      (nodo) => nodo.href
    )
  );

  await page.goto(urls[0]);
  const detallesDeLaCasa = await page.evaluate(() => {
    const imagenes = [
      ...document.querySelectorAll(".CasaVista__fotos img"),
    ].map((img) => img.src);

    const titulo = document.querySelector(".CasaVista__titulo").innerText;
    const ubicacion = document.querySelector(".CasaVista__titulo + div")
      .innerText;

    return {
      imagenes,
      titulo,
      ubicacion,
    };
  });

  console.log(detallesDeLaCasa);
})();
