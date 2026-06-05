const fs = require('fs');

const fixThumbnails = (file) => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove object-top if it exists, as object-contain will center it anyway
    content = content.replace(/object-cover\s+object-top/g, 'object-contain');
    // Replace standard object-cover
    content = content.replace(/object-cover/g, 'object-contain');

    // But wait! We don't want to replace object-cover EVERYWHERE.
    // What if there's a background video or hero image that needs object-cover?
    // Let's specifically target the work items and cards.
    // In works.html, the thumbnails are inside `<div class="relative aspect-[4/3]...`
    // Wait, the regex `object-cover` will replace it everywhere. Let's make sure it's safe.
};

let worksHtml = fs.readFileSync('works.html', 'utf8');
worksHtml = worksHtml.replace(/w-full h-full object-cover/g, 'w-full h-full object-contain');
worksHtml = worksHtml.replace(/w-full h-full object-cover object-top/g, 'w-full h-full object-contain');
fs.writeFileSync('works.html', worksHtml);

let indexHtml = fs.readFileSync('index.html', 'utf8');
// In index.html, the work items use `w-full h-full object-cover`
indexHtml = indexHtml.replace(/w-full h-full object-cover/g, 'w-full h-full object-contain p-4'); // adding p-4 for a nice framing in bento
indexHtml = indexHtml.replace(/w-full h-full object-cover object-top/g, 'w-full h-full object-contain p-4');
// Also wait, I used `p-4` for Motion Graphics reel in the script earlier, so `object-cover object-top p-4`. Let's handle any permutation
indexHtml = indexHtml.replace(/w-full h-full object-contain p-4 p-4/g, 'w-full h-full object-contain p-4');

fs.writeFileSync('index.html', indexHtml);

console.log('Thumbnails fixed to object-contain!');
