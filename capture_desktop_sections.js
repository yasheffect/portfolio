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
        console.log(`Capturing ${site.name} sections...`);
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 3000)); // wait for load
            
            // Section 1
            await page.screenshot({ path: `${outDir}/${site.name}_desktop_1.png`, fullPage: false });
            
            // Scroll to Section 2
            await page.evaluate(() => window.scrollBy(0, 900));
            await new Promise(r => setTimeout(r, 1500)); // wait for animations
            await page.screenshot({ path: `${outDir}/${site.name}_desktop_2.png`, fullPage: false });

            // Scroll to Section 3
            await page.evaluate(() => window.scrollBy(0, 900));
            await new Promise(r => setTimeout(r, 1500)); // wait for animations
            await page.screenshot({ path: `${outDir}/${site.name}_desktop_3.png`, fullPage: false });

            await page.close();
            console.log(`Saved 3 desktop sections for ${site.name}.`);
        } catch (e) {
            console.error(`Failed to capture ${site.name}:`, e);
        }
    }

    await browser.close();
    console.log('Done screenshots.');
})();
