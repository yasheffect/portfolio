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

// Parse out all the <a class="work-card"> blocks from works.html
const cards = [];
const cardRegex = /<a href="([^"]+)" class="work-card[\s\S]*?<\/a>/g;
let match;
while ((match = cardRegex.exec(worksHtml)) !== null) {
    cards.push({
        href: match[1],
        html: match[0]
    });
}

// Re-order the cards
const orderedCards = [];
const remainingCards = [...cards];

for (const p of priorityList) {
    const idx = remainingCards.findIndex(c => c.href === p);
    if (idx !== -1) {
        orderedCards.push(remainingCards[idx]);
        remainingCards.splice(idx, 1);
    }
}
// Append the rest
orderedCards.push(...remainingCards);

// Replace the works-grid in works.html
const newGridHtml = `\n` + orderedCards.map(c => c.html).join('\n') + `\n`;
worksHtml = worksHtml.replace(
    /(<div id="works-grid"[^>]*>)([\s\S]*?)(<\/div>\s*<\/main>)/,
    `$1${newGridHtml}            $3`
);
fs.writeFileSync('works.html', worksHtml);

// Now for index.html Selected Works
let indexHtml = fs.readFileSync('index.html', 'utf8');

// I need to extract properties of the top 10 items to build the 10-item bento grid for index.html
// First, extract the cover images and titles from the work cards
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
        category: getProp(c.html, /data-category="([^"]+)"/),
        badge: getProp(c.html, /<span class="badge-glow[^>]*>([^<]+)<\/span>/) || 'Design'
    };
});

// Create the 10-item grid
const bentoGrid = top10.map((item, index) => {
    // Generate layout based on index
    let spanClasses = "";
    if (index === 0) spanClasses = "md:col-span-2 md:row-span-2"; // Bad boy pizza
    else if (index === 1) spanClasses = "md:col-span-1 md:row-span-1"; // Ghost kitchens
    else if (index === 2) spanClasses = "md:col-span-1 md:row-span-1"; // Chtrbox
    else if (index === 3) spanClasses = "md:col-span-2 md:row-span-1"; // Hotstar
    else if (index === 4) spanClasses = "md:col-span-1 md:row-span-1"; // Bajaj
    else if (index === 5) spanClasses = "md:col-span-1 md:row-span-1"; // Other statics
    else if (index === 6) spanClasses = "md:col-span-1 md:row-span-1"; // Fintech
    else if (index === 7) spanClasses = "md:col-span-1 md:row-span-1"; // Other reels
    else if (index === 8) spanClasses = "md:col-span-1 md:row-span-1"; // Emailer
    else if (index === 9) spanClasses = "md:col-span-2 md:row-span-1"; // Salsette 27
    else spanClasses = "md:col-span-1 md:row-span-1";

    return `                <!-- Work Item ${index + 1} -->
                <a href="${item.href}"
                    class="work-item block group hover-target bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 opacity-0 translate-y-10 ${spanClasses} flex flex-col">
                    <div
                        class="relative w-full flex-1 overflow-hidden bg-neutral-100 border-b border-black/5">
                        <img src="${item.cover}"
                            alt="${item.title}"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
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

// Replace the grid in index.html
const indexGridRegex = /(<div class="grid grid-cols-1 md:grid-cols-3 auto-rows-\[250px\] md:auto-rows-\[350px\] gap-6 items-stretch">)[\s\S]*?(<div class="mt-20 flex justify-center works-header opacity-0">)/;

indexHtml = indexHtml.replace(indexGridRegex, `$1\n${bentoGrid}\n            </div>\n\n            $2`);

fs.writeFileSync('index.html', indexHtml);

console.log('Reordered works grid and updated index.html selected works with 10 items!');
