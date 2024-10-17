// utils/cssInjector.js
export async function cssInjector(page) {
    await page.evaluate(() => {
        // Set background color, text color, and button styles for the entire page
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                background-color: white !important;
                color: white !important;
            }
            button {
                background-color: white !important;
                color: white !important;
                border: 1px solid white !important;
            }
        `;
        document.head.appendChild(style); // Inject the CSS into the page
    });
}
