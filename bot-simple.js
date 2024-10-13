import puppeteer from 'puppeteer';
import { getBannerArea } from './utils/detectBanner.js'; 
import { moveMouseInBannerArea } from './utils/mouseMovement.js';  
//

const fetchBannerData = async () => {
  try {
    const bannerData = await getBannerArea();
    console.log('Banner Data:', bannerData);
    return bannerData;  // Return the bannerData for further use
  } catch (error) {
    console.error('Error while fetching banner data:', error);
    return null;  // Return null in case of error
  }
};

(async () => {
  console.log('Abriendo Chrome con pantalla visible...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto('https://www.autobild.es/coches/subaru');

  console.log('Esperando 5 segundos...');
  await new Promise(resolve => setTimeout(resolve, 20000)); 

  const bannerData = await fetchBannerData();

  // If banner data contains valid information, move the mouse within the area
  if (bannerData && bannerData.message === 'Close button found') {
    const maxTimeSeconds = 60;  // Set how long to search for a clickable element

    // Call the API to move the mouse in the banner area
    const moveResponse = await moveMouseInBannerArea(bannerData.banner_area, maxTimeSeconds);
    console.log('Move Mouse Response:', moveResponse);
  }

  // Print the browser viewport size for debugging
  console.log(
    'Viewport:',
    await page.evaluate(() => ({
      deviceScaleFactor: window.devicePixelRatio,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }))
  );

  // Close the browser if needed
  // await browser.close();
})();
