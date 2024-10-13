const puppeteer = require('puppeteer');

(async () => {
  // Log message before launching browser:
  console.log('Abriendo Chrome con pantalla visible...');

  // Launch the browser instance with headless: false to show the browser window:
  const browser = await puppeteer.launch({
    headless: false,  // Set to false to display the browser
  });

  // Create a new page
  const page = await browser.newPage();
  
  // Go to the website
  await page.goto('https://www.autobild.es/coches/subaru');

  // Print the browser viewport size:
  console.log(
    'Viewport:',
    await page.evaluate(() => ({
      deviceScaleFactor: window.devicePixelRatio,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }))
  );

  // Close the browser
  //await browser.close();
})();
