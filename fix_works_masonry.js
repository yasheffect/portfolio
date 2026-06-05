const fs = require('fs');

let worksHtml = fs.readFileSync('works.html', 'utf8');

// Replace the CSS Grid with CSS Columns for proper Masonry layout
worksHtml = worksHtml.replace(
    /<div id="works-grid" class="grid grid-cols-1 md:grid-cols-2\s*gap-8 md:gap-10">/g,
    '<div id="works-grid" class="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-10 filter-container">'
);

// Just in case it has any other variations:
worksHtml = worksHtml.replace(
    /<div id="works-grid" class="grid[^>]*>/g,
    '<div id="works-grid" class="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-10 filter-container">'
);

fs.writeFileSync('works.html', worksHtml);
console.log('Fixed works.html grid to masonry!');
