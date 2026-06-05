const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The `<a>` tags currently have `grid grid-rows-[1fr_auto]`. We need to change that to `relative block`.
indexHtml = indexHtml.replace(/grid grid-rows-\[1fr_auto\]/g, 'relative block');

// Now, we need to wrap the contents of the `<a>` tag in `<div class="absolute inset-0 flex flex-col">`
// Since each card starts with `<div class="relative w-full h-full overflow-hidden bg-neutral-100">`
// and ends with `</a>`.
// Wait, regex might be tricky if we don't match the exact start and end.
// Let's replace the first `div` to include the wrapper.
indexHtml = indexHtml.replace(
    /<div\s+class="relative w-full h-full overflow-hidden bg-neutral-100">/g,
    '<div class="absolute inset-0 flex flex-col">\n                      <div class="relative w-full flex-1 overflow-hidden bg-neutral-100">'
);

// Now we need to close the wrapper `</div>` right before the `</a>`.
// Each card's text container ends, then the `</a>` tag closes.
// We can find `</a>` that follows the card structure.
// Actually, it's safer to just iterate through the cards and build them.
// Let's use the same approach I used in super_fix.js: parse and rebuild the grid completely.
// But we can just use a smarter replace.
// Let's just find the `</a>` tags that belong to the works-grid.
// It's much safer to find the start of the `</a>` that ends the work item.

// To do this reliably without regex errors:
const cardsArea = indexHtml.split('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
if (cardsArea.length > 1) {
    let beforeGrid = cardsArea[0];
    let gridAndAfter = cardsArea[1];
    
    // Replace all `</a>` with `</div></a>` inside the grid block, 
    // EXCEPT the ones that don't belong to a card.
    // Wait, are there other `</a>` in the grid block?
    // No, only the 10 work items!
    // Actually, let's just do a string replace for the whole card structure!
    
    // Instead of regex, let's do this:
    let modifiedGridAndAfter = gridAndAfter.replace(/<\/a>/g, '</div></a>');
    
    indexHtml = beforeGrid + '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' + modifiedGridAndAfter;
}

// Ensure we don't accidentally close too many divs if run twice.
fs.writeFileSync('index.html', indexHtml);
console.log('Applied absolute inset-0 flex wrapper fix!');
