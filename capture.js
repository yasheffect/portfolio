const puppeteer = require('puppeteer');
const fs = require('fs');

const sites = [
    { name: 'eatanytime', url: 'https://eatanytime.in/' },
    { name: 'chtrbox', url: 'https://chtrbox.com/' },
    { name: 'ghostkitchens', url: 'https://ghostkitchensindia.com/' }
];

(async () => {
    // Ensure the output directory exists
    const outDir = 'assets/Web Design';
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const site of sites) {
        console.log(`Capturing ${site.name}...`);
        try {
            await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
            // Wait an extra 2 seconds for animations to settle
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({ path: `${outDir}/${site.name}.png`, fullPage: false });
            console.log(`Saved ${site.name}.png`);
        } catch (e) {
            console.error(`Failed to capture ${site.name}:`, e);
        }
    }

    await browser.close();
    console.log('Done.');
})();
