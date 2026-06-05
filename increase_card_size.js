const fs = require('fs');

let worksHtml = fs.readFileSync('works.html', 'utf8');

// Replace lg:columns-3 with lg:columns-2
worksHtml = worksHtml.replace(
    /class="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-10 filter-container"/g,
    'class="columns-1 md:columns-2 lg:columns-2 gap-8 md:gap-10 filter-container"'
);

fs.writeFileSync('works.html', worksHtml);
console.log('Changed desktop columns from 3 to 2 to make cards bigger');
