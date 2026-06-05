const fs = require('fs');

// 1. Update index.html Scroll Prompt and Title padding
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/text-5xl md:text-7xl/g, 'text-4xl sm:text-5xl md:text-7xl');
indexHtml = indexHtml.replace(/text-lg md:text-xl/g, 'text-base sm:text-lg md:text-xl');
indexHtml = indexHtml.replace(/w-6 h-10/g, 'w-5 h-8 md:w-6 md:h-10'); // mouse indicator
fs.writeFileSync('index.html', indexHtml);

// 2. Disable Services Hover on Mobile
let scriptJs = fs.readFileSync('script.js', 'utf8');
scriptJs = scriptJs.replace(
    /item\.addEventListener\('mouseenter', \(e\) => \{/,
    "item.addEventListener('mouseenter', (e) => {\n            if(window.innerWidth < 768) return;"
);
scriptJs = scriptJs.replace(
    /item\.addEventListener\('mousemove', \(e\) => \{/,
    "item.addEventListener('mousemove', (e) => {\n            if(window.innerWidth < 768) return;"
);
fs.writeFileSync('script.js', scriptJs);

// 3. Process all Project Detail HTML files
const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'works.html');

htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // Navbar text scaling
    html = html.replace(/text-\[8px\] md:text-\[10px\]/g, 'text-[10px] sm:text-xs md:text-sm');
    html = html.replace(/w-\[95%\] max-w-\[360px\] md:w-auto md:max-w-\[440px\]/g, 'w-[90%] max-w-[400px] sm:w-auto md:max-w-[500px]');
    html = html.replace(/text-lg md:text-xl/g, 'text-xl md:text-2xl');

    // Title text
    html = html.replace(/text-5xl md:text-7xl lg:text-\[6rem\]/g, 'text-4xl sm:text-5xl md:text-7xl lg:text-[6rem]');
    
    // Grid in header
    html = html.replace(/grid-cols-2 md:grid-cols-4/g, 'grid-cols-2 sm:grid-cols-4');
    
    // Content Blocks
    html = html.replace(/gap-16/g, 'gap-10 md:gap-16');
    html = html.replace(/text-3xl/g, 'text-2xl sm:text-3xl');
    
    // Next Project Section
    html = html.replace(/py-32 md:py-48/g, 'py-20 sm:py-32 md:py-48');
    html = html.replace(/text-5xl md:text-8xl/g, 'text-4xl sm:text-5xl md:text-8xl');

    fs.writeFileSync(file, html);
    console.log(`Optimized ${file}`);
});
