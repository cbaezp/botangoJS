/* With fingerprints */

// Import `puppeteer-with-fingerprints` instead of `puppeteer`
// const puppeteer = require('puppeteer');
// const { plugin } = require('puppeteer-with-fingerprints');

import { plugin } from 'puppeteer-with-fingerprints';
import dotenv from 'dotenv';
// Set the service key for the plugin (you can buy it here https://bablosoft.com/directbuy/FingerprintSwitcher/2).
// Leave an empty string to use the free version.
//plugin.setServiceKey('');




async function main() {
    // Set the service key for the plugin (you can buy it here https://bablosoft.com/directbuy/FingerprintSwitcher/2).
    // Leave an empty string to use the free version.
    const result = dotenv.config();
    plugin.setServiceKey(process.env.FINGERPRINT_SERVICE_KEY || '');
  
    // Optionally omit key parameter if you do not need an override:
    const fingerprint = await plugin.fetch({
      tags: ['Microsoft Windows', 'Chrome'],
    });
  
    plugin.useFingerprint(fingerprint);
  
    // Omit the key option if you do not need an override:
    await plugin.launch({ headless: false });
  }
  
  main();