const fs = require('fs');

function optimizeFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Navbar text scaling
    html = html.replace(/text-\[8px\] md:text-\[10px\]/g, 'text-[10px] sm:text-xs md:text-sm');
    html = html.replace(/w-\[95%\] max-w-\[360px\] md:w-auto md:max-w-\[440px\]/g, 'w-[90%] max-w-[400px] sm:w-auto md:max-w-[500px]');
    html = html.replace(/text-lg md:text-xl/g, 'text-xl md:text-2xl');

    // 2. Hero typography (only in index.html)
    html = html.replace(/text-\[16vw\] md:text-\[14.5vw\]/g, 'text-[18vw] sm:text-[16vw] md:text-[14.5vw] lg:text-[13vw]');
    html = html.replace(/text-\[9px\] md:text-xs tracking-\[0.3em\]/g, 'text-[10px] sm:text-[11px] md:text-sm tracking-[0.2em] md:tracking-[0.3em]');

    // 3. About Section spacing & fonts
    html = html.replace(/text-4xl md:text-5xl lg:text-7xl/g, 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl');
    html = html.replace(/gap-8 md:gap-16/g, 'gap-10 md:gap-16');

    // 4. Works Page filters (works.html)
    html = html.replace(/flex flex-wrap gap-2 md:gap-4 filter-container/g, 'flex flex-nowrap md:flex-wrap overflow-x-auto pb-4 gap-2 md:gap-4 filter-container hide-scrollbar scroll-smooth');

    // 5. Grid layouts
    // Make Bento grid strictly lg:grid-cols-3 to prevent tablet layout holes
    html = html.replace(/grid grid-cols-1 md:grid-cols-3/g, 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
    
    // Bento Spans:
    // Update portrait to be row-span-2 across all devices, but col-span 1
    html = html.replace(/class="([^"]*)col-span-1 row-span-2([^"]*)"/g, 'class="$1col-span-1 sm:col-span-1 lg:col-span-1 row-span-2$2"');
    
    // Update landscape to be col-span-2 only on md/lg, and col-span-1 on mobile
    html = html.replace(/class="([^"]*)col-span-2 row-span-1([^"]*)"/g, 'class="$1col-span-1 sm:col-span-2 lg:col-span-2 row-span-1$2"');

    // Update square to just be 1x1
    html = html.replace(/class="([^"]*)col-span-1 row-span-1([^"]*)"/g, 'class="$1col-span-1 sm:col-span-1 lg:col-span-1 row-span-1$2"');

    // 6. Testimonials grid
    html = html.replace(/grid-cols-1 md:grid-cols-2 gap-6/g, 'grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10');

    // 7. Footer text
    html = html.replace(/text-\[12vw\] md:text-\[10vw\]/g, 'text-[14vw] sm:text-[12vw] md:text-[10vw]');

    fs.writeFileSync(filePath, html);
    console.log(`Optimized breakpoints in ${filePath}`);
}

['index.html', 'works.html'].forEach(optimizeFile);

// Also add the hide-scrollbar CSS utility to style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
if (!styleCss.includes('hide-scrollbar')) {
    styleCss += `\n\n/* Hide scrollbar for horizontal scroll areas */\n.hide-scrollbar::-webkit-scrollbar {\n    display: none;\n}\n.hide-scrollbar {\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n}\n`;
    fs.writeFileSync('style.css', styleCss);
    console.log('Added hide-scrollbar utility to style.css');
}
