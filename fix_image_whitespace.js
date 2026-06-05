const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The image tags have `object-cover`. Let's add `object-top` to push bottom white space out of view.
// And let's reduce the row height to 350px across the board to ensure a slightly wider aspect ratio.
indexHtml = indexHtml.replace(/object-cover transition-transform/g, 'object-cover object-top transition-transform');

// Replace auto-rows-[400px] with auto-rows-[350px]
indexHtml = indexHtml.replace(/auto-rows-\[400px\] sm:auto-rows-\[400px\] lg:auto-rows-\[350px\]/g, 'auto-rows-[350px] sm:auto-rows-[350px] lg:auto-rows-[350px]');

fs.writeFileSync('index.html', indexHtml);
console.log('Applied object-top and reduced height to 350px');
