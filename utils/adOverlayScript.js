// adOverlayScript.js

(function() {
    // The extractDomain function to ensure we focus on the SLD and TLD
    function extractDomain(url) {
      let hostname;
  
      try {
        // Try to parse the URL normally
        const urlObj = new URL(url);
        hostname = urlObj.hostname;
      } catch (e) {
        const atIndex = url.lastIndexOf('@');
        if (atIndex !== -1) {
          // Extract the domain part of the email
          hostname = url.slice(atIndex + 1);
        } else {
          try {
            // Try adding 'http://' to handle URLs without protocol
            const urlObj = new URL('http://' + url);
            hostname = urlObj.hostname;
          } catch (e2) {
            hostname = '';
          }
        }
      }
  
      // Handle domains by keeping only the last two parts (SLD + TLD)
      const domainParts = hostname.split('.');
      if (domainParts.length >= 2) {
        const lastParts = domainParts.slice(-2); // Get last two parts (SLD + TLD)
        if (domainParts.length > 2 && lastParts[0] === 'co') {
          return domainParts.slice(-3).join('.'); // handle domains like .co.uk
        }
        return lastParts.join('.');
      }
      return hostname;
    }
  
    // Your list of ad domains
    const adSourcesRaw = [
      'adtheorent.com',
      'googlesyndication.com',
      'doubleclick.net',
      'adservice.google.com',
      // ... add more domains here ...
    ];
  
    // Process adSourcesRaw through extractDomain to ensure standard domain format
    const adSourcesSet = new Set(adSourcesRaw.map(domain => extractDomain(domain.toLowerCase())));
  
    // Select all elements with the specified tags
    const elements = document.querySelectorAll('iframe, img, video, a, script, div, amp-img');
  
    elements.forEach(element => {
      // Get the src or href attribute
      const src = element.getAttribute('src') || element.getAttribute('href');
  
      // First, check src or href
      if (src) {
        const domain = extractDomain(src).toLowerCase();
        if (adSourcesSet.has(domain)) {
          // Create an overlay div
          const overlay = document.createElement('div');
          overlay.style.position = 'absolute';
          overlay.style.backgroundColor = '#00FF00'; // Neon green background
          overlay.style.opacity = '1'; // Semi-transparent to let the underlying element be visible
          overlay.style.pointerEvents = 'none'; // Make sure it doesn't block interaction with the element
          overlay.style.zIndex = '9999'; // Bring the overlay to the front
  
          // Get element's position and dimensions
          const rect = element.getBoundingClientRect();
          overlay.style.left = `${rect.left + window.scrollX}px`;
          overlay.style.top = `${rect.top + window.scrollY}px`;
          overlay.style.width = `${rect.width}px`;
          overlay.style.height = `${rect.height}px`;
  
          // Append the overlay to the body
          document.body.appendChild(overlay);
        }
      } else if (element.tagName.toLowerCase() === 'iframe') {
        // If src is not present, check id or name for ad-related patterns
        const iframeId = element.getAttribute('id') || '';
        const iframeName = element.getAttribute('name') || '';
  
        // Check if the iframe id or name contains 'google_ads_iframe'
        if (iframeId.includes('google_ads_iframe') || iframeName.includes('google_ads_iframe')) {
          // Create an overlay div
          const overlay = document.createElement('div');
          overlay.style.position = 'absolute';
          overlay.style.backgroundColor = '#00FF00'; // Neon green background
          overlay.style.opacity = '1'; // Semi-transparent to let the underlying element be visible
          overlay.style.pointerEvents = 'none'; // Make sure it doesn't block interaction with the element
          overlay.style.zIndex = '9999'; // Bring the overlay to the front
  
          // Get element's position and dimensions
          const rect = element.getBoundingClientRect();
          overlay.style.left = `${rect.left + window.scrollX}px`;
          overlay.style.top = `${rect.top + window.scrollY}px`;
          overlay.style.width = `${rect.width}px`;
          overlay.style.height = `${rect.height}px`;
  
          // Append the overlay to the body
          document.body.appendChild(overlay);
        }
      }
    });
  })();
  