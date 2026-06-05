const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace flex flex-col with grid grid-rows-[1fr_auto] on the work-item cards
indexHtml = indexHtml.replace(
    /class="work-item([^"]*) flex flex-col([^"]*)"/g, 
    'class="work-item$1 grid grid-rows-[1fr_auto]$2"'
);

// Replace flex-1 with h-full on the image container inside the work-item cards
// The image container looks like: <div class="relative w-full flex-1 overflow-hidden bg-neutral-100">
indexHtml = indexHtml.replace(
    /class="relative w-full flex-1 overflow-hidden bg-neutral-100"/g,
    'class="relative w-full h-full overflow-hidden bg-neutral-100"'
);

fs.writeFileSync('index.html', indexHtml);
console.log('Applied grid grid-rows-[1fr_auto] fix to index.html');
