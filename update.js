const fs = require('fs');

const updateGrid = (file, cols) => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the main flex col gap-6 with grid
    content = content.replace(/class="flex flex-col gap-6 md:gap-12 mb-12 md:mb-16"/, `class="grid grid-cols-1 md:grid-cols-${cols} gap-6 md:gap-8 mb-12 md:mb-16"`);
    
    // Remove any remaining mb-6 in the class
    content = content.replace(/relative bg-neutral-900 mb-6/g, 'relative bg-neutral-900');
    
    fs.writeFileSync(file, content);
};

const updateVideos = (file) => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    // replace autoplay loop muted playsinline with controls loop playsinline
    content = content.replace(/<video autoplay loop muted playsinline/g, '<video controls loop playsinline');
    fs.writeFileSync(file, content);
}

// 1. Static grids
updateGrid('other-static.html', 3);
updateGrid('other-reels.html', 2);
updateGrid('fintech-reels.html', 3);
updateGrid('fnb-reels.html', 3);

// 2. Video controls
['other-reels.html', 'fintech-reels.html', 'fnb-reels.html', 'hotstar-reel.html'].forEach(f => updateVideos(f));

// 3. Index.html Services updates
let index = fs.readFileSync('index.html', 'utf8');

// Brand Identity
index = index.replace(/data-img="https:\/\/images\.unsplash\.com\/photo-1626785773579-c909653a9485\?q=80&w=600&auto=format&fit=crop"/, 'data-img="assets/Bad%20Boy%20Pizza/cover.png" onclick="window.location.href=\'bad-boy-pizza.html\'"');

// Print Design
index = index.replace(/data-img="https:\/\/images\.unsplash\.com\/photo-1558655146-d09347e92766\?q=80&w=2664&auto=format&fit=crop"/, 'data-img="assets/Brochure/Cover.jpg" onclick="window.location.href=\'real-estate-brochure.html\'"');

// Social Media Designs
index = index.replace(/data-img="https:\/\/images\.unsplash\.com\/photo-1561070791-2526d30994b5\?q=80&w=600&auto=format&fit=crop"/, 'data-img="assets/other_static_cover.png" onclick="window.location.href=\'other-static.html\'"');

// Motion Graphics
index = index.replace(/data-img="https:\/\/images\.unsplash\.com\/photo-1522202176988-66273c2fd55f\?q=80&w=600&auto=format&fit=crop"/, 'data-img="assets/hotstar_cover.png" onclick="window.location.href=\'hotstar-reel.html\'"');

fs.writeFileSync('index.html', index);
console.log('Update finished.');
