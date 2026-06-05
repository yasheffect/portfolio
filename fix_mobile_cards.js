const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Change grid to auto-rows-[auto] on mobile, and fixed rows on md/lg
indexHtml = indexHtml.replace(
    /auto-rows-\[250px\] md:auto-rows-\[350px\]/g, 
    'auto-rows-[400px] sm:auto-rows-[400px] lg:auto-rows-[350px]'
);

// 2. Remove row-span-2 on mobile so all cards are uniformly 400px tall!
// We only want row-span-2 on lg breakpoint for the puzzle layout.
indexHtml = indexHtml.replace(/row-span-2/g, 'lg:row-span-2');
indexHtml = indexHtml.replace(/lg:lg:row-span-2/g, 'lg:row-span-2'); // just in case

// 3. For works.html, let's verify if they need height adjustments.
let worksHtml = fs.readFileSync('works.html', 'utf8');
// works.html uses masonry columns. The images are w-full h-auto, so they are never cut.
// But we can ensure they have a min-height or look tall enough.
// Actually, they are not cut in works.html. The user said "fix it there too if needed".
// It is NOT needed in works.html because h-auto preserves aspect ratio perfectly.

fs.writeFileSync('index.html', indexHtml);
fs.writeFileSync('works.html', worksHtml);

console.log('Fixed mobile card heights to 400px to prevent image cutting!');
