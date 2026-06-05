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

// We need to parse worksHtml to get the top 10 items
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

// Generate PERFECT BENTO GRID HTML
const bentoGrid = top10.map((item, index) => {
    let spanClasses = "";
    // Perfect 3x6 Bento Grid Math:
    if (index === 0) spanClasses = "md:col-span-2 md:row-span-2"; // Bad boy pizza (2x2)
    else if (index === 1) spanClasses = "md:col-span-1 md:row-span-1"; // Ghost kitchens (1x1)
    else if (index === 2) spanClasses = "md:col-span-1 md:row-span-1"; // Chtrbox (1x1)
    else if (index === 3) spanClasses = "md:col-span-2 md:row-span-1"; // Hotstar (2x1)
    else if (index === 4) spanClasses = "md:col-span-1 md:row-span-1"; // Bajaj (1x1)
    else if (index === 5) spanClasses = "md:col-span-1 md:row-span-1"; // Other statics (1x1)
    else if (index === 6) spanClasses = "md:col-span-1 md:row-span-2"; // Fintech (1x2)
    else if (index === 7) spanClasses = "md:col-span-1 md:row-span-2"; // Other reels (1x2)
    else if (index === 8) spanClasses = "md:col-span-1 md:row-span-2"; // Emailer (1x2)
    else if (index === 9) spanClasses = "md:col-span-2 md:row-span-1"; // Salsette 27 (2x1)
    else spanClasses = "md:col-span-1 md:row-span-1";
    
    // Some visual tweaks for Pro Max UI/UX
    // 1. Give the image container absolute fill so the text box floats nicely at the bottom, 
    //    or keep the standard flex-col layout but make it ultra-sleek.
    // The current layout has a white card base, with image flex-1 on top, and text p-6 on bottom.
    // This is fine, but for row-span-2 items, they get extremely tall.
    // Let's use `h-full` to ensure the work-item fills the cell correctly.

    return `                <!-- Work Item ${index + 1} -->
                <a href="${item.href}"
                    class="work-item group hover-target bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 opacity-0 translate-y-10 ${spanClasses} flex flex-col border border-black/5 h-full">
                    <div
                        class="relative w-full flex-1 overflow-hidden bg-neutral-100">
                        <img src="${item.cover}"
                            alt="${item.title}"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                        </div>
                        <div
                            class="absolute top-5 right-5 badge-glow bg-[#0a0a0a] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                            ${item.badge}</div>
                    </div>
                    <div class="p-6 md:p-8 flex justify-between items-start bg-white z-10 shrink-0">
                        <div>
                            <h3
                                class="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-2 relative inline-block text-black group-hover:text-[#FF4D00] transition-colors duration-300">
                                ${item.title}</h3>
                            <p class="text-neutral-400 text-xs md:text-sm uppercase tracking-widest font-semibold">${item.subTitle}</p>
                        </div>
                        <span
                            class="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] group-hover:text-white transition-all duration-500 text-black">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </div>
                </a>`;
}).join('\n\n');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace the grid in index.html
const indexGridRegex = /(<div class="grid grid-cols-1 md:grid-cols-3 auto-rows-\[250px\] md:auto-rows-\[350px\] gap-6 items-stretch grid-flow-dense">)[\s\S]*?(<div class="mt-20 flex justify-center works-header opacity-0">)/;

indexHtml = indexHtml.replace(indexGridRegex, `$1\n${bentoGrid}\n            </div>\n\n            $2`);

fs.writeFileSync('index.html', indexHtml);
console.log('Fixed bento grid holes and leveled up UI/UX');
