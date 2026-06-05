const fs = require('fs');

const priorityList = [
    'bad-boy-pizza.html',
    'ghostkitchens-web.html',
    'chtrbox-web.html',
    'hotstar-reel.html',
    'bajaj-finserv.html',
    'other-static.html',
    'fintech-reels.html',
    'other-reels.html',
    'e-mailer.html',
    'real-estate-brochure.html'
];

let worksHtml = fs.readFileSync('works.html', 'utf8');

// FIX THUMBNAILS: Revert object-contain back to object-cover
worksHtml = worksHtml.replace(/w-full h-full object-contain/g, 'w-full h-auto object-cover');
worksHtml = worksHtml.replace(/w-full h-auto object-cover p-4/g, 'w-full h-auto object-cover');

// Fix works grid layout to Masonry
worksHtml = worksHtml.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch filter-container" id="works-grid">/,
    '<div class="columns-1 md:columns-2 lg:columns-3 gap-6 filter-container" id="works-grid">'
);
// Some cases might not have filter-container
worksHtml = worksHtml.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" id="works-grid">/,
    '<div class="columns-1 md:columns-2 lg:columns-3 gap-6" id="works-grid">'
);

// Add break-inside-avoid and mb-6 to work-cards, and remove aspect-[4/3]
worksHtml = worksHtml.replace(/class="work-card /g, 'class="work-card break-inside-avoid mb-6 ');
worksHtml = worksHtml.replace(/aspect-\[4\/3\] /g, '');

// Save works.html
fs.writeFileSync('works.html', worksHtml);

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Fix preloader
indexHtml = indexHtml.replace(
    /class="w-full h-full object-contain p-4 object-\[50%_25%\] opacity-60 transition-transform duration-\[4000ms\] ease-out scale-110"/,
    'class="w-full h-full object-cover opacity-60 transition-transform duration-[4000ms] ease-out scale-110"'
);

// Add grid-flow-dense to index.html grid
indexHtml = indexHtml.replace(
    /<div class="grid grid-cols-1 md:grid-cols-3 auto-rows-\[250px\] md:auto-rows-\[350px\] gap-6 items-stretch">/,
    '<div class="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[350px] gap-6 items-stretch grid-flow-dense">'
);

fs.writeFileSync('index.html', indexHtml);

// Now re-run the reordering logic to fix the index.html bento grid spans
// Parse works.html again to get the updated HTML for cards
worksHtml = fs.readFileSync('works.html', 'utf8');
const cards = [];
const cardRegex = /<a href="([^"]+)" class="work-card[\s\S]*?<\/a>/g;
let match;
while ((match = cardRegex.exec(worksHtml)) !== null) {
    cards.push({ href: match[1], html: match[0] });
}

const orderedCards = [];
const remainingCards = [...cards];
for (const p of priorityList) {
    const idx = remainingCards.findIndex(c => c.href === p);
    if (idx !== -1) {
        orderedCards.push(remainingCards[idx]);
        remainingCards.splice(idx, 1);
    }
}
orderedCards.push(...remainingCards);

const getProp = (html, regex) => {
    const m = html.match(regex);
    return m ? m[1] : '';
};

const top10 = orderedCards.slice(0, 10).map(c => {
    return {
        href: c.href,
        cover: getProp(c.html, /src="([^"]+)"/),
        title: getProp(c.html, /<h3[^>]*>([^<]+)<\/h3>/),
        subTitle: getProp(c.html, /<p class="text-neutral-500[^>]*>([^<]+)<\/p>/),
        badge: getProp(c.html, /<span class="badge-glow[^>]*>([^<]+)<\/span>/) || 'Design'
    };
});

const bentoGrid = top10.map((item, index) => {
    let spanClasses = "";
    if (index === 0) spanClasses = "md:col-span-2 md:row-span-2"; // Bad boy pizza
    else if (index === 1) spanClasses = "md:col-span-2 md:row-span-1"; // Ghost kitchens
    else if (index === 2) spanClasses = "md:col-span-2 md:row-span-1"; // Chtrbox
    else if (index === 3) spanClasses = "md:col-span-2 md:row-span-1"; // Hotstar
    else if (index === 4) spanClasses = "md:col-span-1 md:row-span-1"; // Bajaj
    else if (index === 5) spanClasses = "md:col-span-1 md:row-span-1"; // Other statics
    else if (index === 6) spanClasses = "md:col-span-1 md:row-span-2"; // Fintech
    else if (index === 7) spanClasses = "md:col-span-1 md:row-span-2"; // Other reels
    else if (index === 8) spanClasses = "md:col-span-1 md:row-span-2"; // Emailer
    else if (index === 9) spanClasses = "md:col-span-2 md:row-span-1"; // Salsette 27
    else spanClasses = "md:col-span-1 md:row-span-1";

    let objectClass = "object-cover";
    // For tall items, maybe object-top is better if they are phones? Actually object-center is fine.
    
    return `                <!-- Work Item ${index + 1} -->
                <a href="${item.href}"
                    class="work-item block group hover-target bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 opacity-0 translate-y-10 ${spanClasses} flex flex-col">
                    <div
                        class="relative w-full flex-1 overflow-hidden bg-neutral-100 border-b border-black/5">
                        <img src="${item.cover}"
                            alt="${item.title}"
                            class="w-full h-full ${objectClass} transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                        </div>
                        <div
                            class="absolute top-4 right-4 badge-glow bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                            ${item.badge}</div>
                    </div>
                    <div class="p-6 flex justify-between items-start">
                        <div>
                            <h3
                                class="font-heading font-bold text-2xl mb-1 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-0.5 after:left-0 after:bg-black after:origin-bottom-right group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:transition-transform after:duration-300">
                                ${item.title}</h3>
                            <p class="text-neutral-500 text-sm uppercase tracking-widest mt-1">${item.subTitle}</p>
                        </div>
                        <span
                            class="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </div>
                </a>`;
}).join('\n\n');

indexHtml = fs.readFileSync('index.html', 'utf8');
const indexGridRegex = /(<div class="grid grid-cols-1 md:grid-cols-3 auto-rows-\[250px\] md:auto-rows-\[350px\] gap-6 items-stretch grid-flow-dense">)[\s\S]*?(<div class="mt-20 flex justify-center works-header opacity-0">)/;

indexHtml = indexHtml.replace(indexGridRegex, `$1\n${bentoGrid}\n            </div>\n\n            $2`);

fs.writeFileSync('index.html', indexHtml);
console.log('Super fix applied!');
