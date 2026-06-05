const fs = require('fs');

const createWebPage = (id, title, coverImg, screenshotImg) => {
    let template = fs.readFileSync('motion-graphic-reel.html', 'utf8');
    
    // Replace titles
    template = template.replace(/Motion Graphics/g, 'Web Design');
    template = template.replace(/Disney\+ <span class="text-accent italic font-handwriting pr-2">Hotstar<\/span>/, 
        `${title.split(' ')[0]} <span class="text-accent italic font-handwriting pr-2">${title.substring(title.indexOf(' ') + 1)}</span>`);
    template = template.replace(/Disney\+ Hotstar Reel/g, title);
    
    // Replace cover
    template = template.replace(/assets\/hotstar_cover.png/g, coverImg);
    
    // Replace gallery section with a single image grid
    const galleryHtml = `
        <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
            <img src="${screenshotImg}" alt="${title} Full Page" class="w-full h-auto">
        </div>
    `;
    
    template = template.replace(/<div class="col-span-1 md:col-span-8 lg:col-span-9">[\s\S]*?<\/div>\s*<\/div>/, `<div class="col-span-1 md:col-span-8 lg:col-span-9">\n<div class="space-y-6">\n${galleryHtml}\n</div>\n</div>`);
    
    fs.writeFileSync(`${id}-web.html`, template);
};

// Create the 3 pages
createWebPage('eatanytime', 'Eat Anytime', 'assets/Web Design/eatanytime_cover.png', 'assets/Web Design/eatanytime.png');
createWebPage('chtrbox', 'Chtrbox Agency', 'assets/Web Design/chtrbox.png', 'assets/Web Design/chtrbox.png');
createWebPage('ghostkitchens', 'Ghost Kitchens', 'assets/Web Design/ghostkitchens.png', 'assets/Web Design/ghostkitchens.png');

// Update works.html
let works = fs.readFileSync('works.html', 'utf8');

const newWorks = `
                <!-- Eat Anytime -->
                <a href="eatanytime-web.html" class="work-card group cursor-none relative block">
                    <div class="rounded-[2rem] overflow-hidden mb-6 relative interactive h-[300px] md:h-[400px]">
                        <img src="assets/Web Design/eatanytime_cover.png" alt="Eat Anytime" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-heading font-bold text-2xl mb-2">Eat Anytime</h3>
                            <p class="text-neutral-500 text-sm font-medium">Web Design / UI UX</p>
                        </div>
                    </div>
                </a>

                <!-- Chtrbox -->
                <a href="chtrbox-web.html" class="work-card group cursor-none relative block">
                    <div class="rounded-[2rem] overflow-hidden mb-6 relative interactive h-[300px] md:h-[400px]">
                        <img src="assets/Web Design/chtrbox.png" alt="Chtrbox" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-heading font-bold text-2xl mb-2">Chtrbox Agency</h3>
                            <p class="text-neutral-500 text-sm font-medium">Web Design / UI UX</p>
                        </div>
                    </div>
                </a>

                <!-- Ghost Kitchens -->
                <a href="ghostkitchens-web.html" class="work-card group cursor-none relative block">
                    <div class="rounded-[2rem] overflow-hidden mb-6 relative interactive h-[300px] md:h-[400px]">
                        <img src="assets/Web Design/ghostkitchens.png" alt="Ghost Kitchens" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-heading font-bold text-2xl mb-2">Ghost Kitchens</h3>
                            <p class="text-neutral-500 text-sm font-medium">Web Design / UI UX</p>
                        </div>
                    </div>
                </a>
`;

works = works.replace(/<div id="works-grid" class="grid grid-cols-1 md:grid-cols-2  gap-8 md:gap-10">/, `<div id="works-grid" class="grid grid-cols-1 md:grid-cols-2  gap-8 md:gap-10">\n${newWorks}`);

fs.writeFileSync('works.html', works);

// Update index.html Service #5
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(/data-img="https:\/\/images\.unsplash\.com\/photo-1618005182384-a83a8bd57fbe\?q=80&w=2564&auto=format&fit=crop"/, 'data-img="assets/Web%20Design/eatanytime_cover.png" onclick="window.location.href=\'eatanytime-web.html\'"');
fs.writeFileSync('index.html', index);

console.log('Web pages generated and linked.');
