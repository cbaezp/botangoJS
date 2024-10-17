import { plugin } from 'puppeteer-with-fingerprints';
import dotenv from 'dotenv';
import { cssInjector } from './utils/cssInjector.js';  





async function main() {
    // Set the service key for the plugin (you can buy it here https://bablosoft.com/directbuy/FingerprintSwitcher/2).
    // Leave an empty string to use the free version.
    const result = dotenv.config();
    plugin.setServiceKey(process.env.FINGERPRINT_SERVICE_KEY || '');
  
    // Optionally omit key parameter if you do not need an override:
    const fingerprint = await plugin.fetch({
      tags: ['Microsoft Windows', 'Chrome'],
    });
  
    plugin.useProxy('198.23.239.134:6540:tfvzcruz:6zudy0o1txki', {
        changeGeolocation: true,

    })
    plugin.useFingerprint(fingerprint,{
        safeElementSize: true,
    });
  
    // Omit the key option if you do not need an override:

    const browser = await plugin.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://github.com/', { waitUntil: 'networkidle0' });

    await cssInjector(page);



  }
  
  main();