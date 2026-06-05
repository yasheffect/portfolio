const puppeteer = require('puppeteer');
const fs = require('fs');

const sites = [
    { name: 'eatanytime', url: 'https://eatanytime.in/' },
    { name: 'chtrbox', url: 'https://chtrbox.com/' },
    { name: 'ghostkitchens', url: 'https://ghostkitchensindia.com/' }
];

(async () => {
    const outDir = 'assets/Web Design';
    const browser = await puppeteer.launch({ headless: "new" });

    for (const site of sites) {
        console.log(`Capturing ${site.name} mobile and tablet...`);
        try {
            const page = await browser.newPage();
            
            // Mobile
            await page.setViewport({ width: 375, height: 812, isMobile: true });
            await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({ path: `${outDir}/${site.name}_mobile.png`, fullPage: false });
            
            // Tablet
            await page.setViewport({ width: 768, height: 1024 });
            await page.reload({ waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({ path: `${outDir}/${site.name}_tablet.png`, fullPage: false });
            
            await page.close();
            console.log(`Saved ${site.name} mobile and tablet.`);
        } catch (e) {
            console.error(`Failed to capture ${site.name}:`, e);
        }
    }

    await browser.close();
    console.log('Done screenshots.');
})();
