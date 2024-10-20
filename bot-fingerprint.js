import { plugin } from 'puppeteer-with-fingerprints';
import dotenv from 'dotenv';
import fs from 'fs';  // To read the file
import path from 'path';
import { fileURLToPath } from 'url';  // To handle ES module directory paths
import { moveMouseInBannerArea } from './utils/moveMouseInBannerArea.js';  // Assuming the function is in this path

// Helper to get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function injectAdOverlayScript(page) {
  // Read the adOverlayScript.js file from the utils folder
  const scriptPath = path.resolve(__dirname, './utils/adOverlayScript.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  // Evaluate the script inside the browser context
  await page.evaluate(scriptContent);
}

async function randomScroll(page) {
  // Scroll randomly up or down
  const scrollAmount = Math.floor(Math.random() * 1000);  // Random scroll between 0 and 1000px
  const direction = Math.random() > 0.5 ? 1 : -1;  // Randomly decide to scroll up or down
  await page.evaluate((scrollAmount, direction) => {
    window.scrollBy(0, scrollAmount * direction);
  }, scrollAmount, direction);
}

async function tryBannerActions(page, maxRetries = 100) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Step 1: Scroll randomly
    await randomScroll(page);
    await new Promise(resolve => setTimeout(resolve, 7000));  
    // Step 2: Inject the adOverlay script
    await injectAdOverlayScript(page);
    await new Promise(resolve => setTimeout(resolve, 3000));  


    // Step 3: Call moveMouseInBannerArea function
    const moveMouseResult = await moveMouseInBannerArea();
    console.log('Move Mouse Result:', moveMouseResult);

    // Check the result
    if (moveMouseResult.result === "click successful") {
      console.log("Success!");
      break;  // Stop if the click was successful
    } else if (moveMouseResult.result === "no banner" || moveMouseResult.result === "click not detected") {
      console.log(`Attempt ${attempt + 1}: No banner or click not detected, retrying...`);

      if (attempt === maxRetries - 1) {
        // If max retries reached, refresh the page
        console.log(`Max attempts reached (${maxRetries}), refreshing the page...`);
        await page.reload({ waitUntil: ["load", "networkidle2"] });
      }
    }
  }

  // Close the browser if max retries are reached
  if (maxRetries > 0) {
    console.log('Max retries reached, closing browser...');
    await page.browser().close();
  }
}

async function main() {
  dotenv.config();
  plugin.setServiceKey(process.env.FINGERPRINT_SERVICE_KEY || '');

  const fingerprint = await plugin.fetch({
    tags: ['Microsoft Windows', 'Firefox'],
  });

  plugin.useFingerprint(fingerprint, {
    safeElementSize: true,
  });

  const browser = await plugin.launch({
    headless: false,
    timeout: 60000,  // Increase timeout for the browser launch
  });

  const page = await browser.newPage();

  await page.goto("https://www.autobild.es/", {
    waitUntil: ["load", "networkidle2", "domcontentloaded"],
    timeout: 60000,  // Increase navigation timeout to 60 seconds
  });

  await new Promise(resolve => setTimeout(resolve, 40000));  

  // Press 'Enter'
  page.keyboard.press('Enter');
  console.log('Enter pressed...');

  // Start trying banner actions with a limit of 5 attempts
  await tryBannerActions(page, 5);
}

main().catch(console.error);
