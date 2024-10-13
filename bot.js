const { plugin } = require('puppeteer-with-fingerprints');

// Set the service key for the plugin (you can buy it here https://bablosoft.com/directbuy/FingerprintSwitcher/2).
// Leave an empty string to use the free version.
plugin.setServiceKey('');

(async () => {
  // Get a fingerprint from the server:
  const fingerprint = await plugin.fetch({
    tags: ['Microsoft Windows', 'Chrome'],
  });

  // Apply fingerprint:
  plugin.useFingerprint(fingerprint);

  // Log message before launching browser:
  console.log('Abriendo Chrome con pantalla visible...');

  // Launch the browser instance with headless: false to show the browser window:
  const browser = await plugin.launch({
    headless: false,  // Set to false to display the browser
  });

  // The rest of the code is the same as for a standard `puppeteer` library:
  const page = await browser.newPage();
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

  //wait browser.close();
})();
