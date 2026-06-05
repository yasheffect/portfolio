const fs = require('fs');

const itemsData = [
    {
        id: 'bad-boy',
        file: 'bad-boy-pizza.html',
        category: 'brand-identity',
        categoryLabel: 'Brand Identity',
        title: 'Bad Boy Pizza',
        subtitle: 'Identity & Motion Graphics',
        img: 'assets/Bad%20Boy%20Pizza/cover.png',
        indexClasses: 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2'
    },
    {
        id: 'ghost',
        file: 'ghostkitchens-web.html',
        category: 'web-design',
        categoryLabel: 'Web Design',
        title: 'Ghost Kitchens',
        subtitle: 'Web Design / UI UX',
        img: 'assets/Web Design/ghostkitchens.png',
        indexClasses: 'col-span-1'
    },
    {
        id: 'chtrbox',
        file: 'chtrbox-web.html',
        category: 'web-design',
        categoryLabel: 'Web Design',
        title: 'Chtrbox Agency',
        subtitle: 'Web Design / UI UX',
        img: 'assets/Web Design/chtrbox.png',
        indexClasses: 'col-span-1'
    },
    {
        id: 'hotstar',
        file: 'hotstar-reel.html',
        category: 'motion-graphics',
        categoryLabel: 'Motion Graphics',
        title: 'Hotstar Reel',
        subtitle: 'Motion Graphic Showreel',
        img: 'assets/hotstar_cover.png',
        indexClasses: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1'
    },
    {
        id: 'bajaj',
        file: 'bajaj-finserv.html',
        category: 'social-media',
        categoryLabel: 'Social Media',
        title: 'Bajaj Finserv',
        subtitle: 'Mutual Funds Statics',
        img: 'assets/Bajaj%20Finserv/7.png',
        indexClasses: 'col-span-1 lg:col-span-1 lg:row-span-2'
    },
    {
        id: 'other-statics',
        file: 'other-static.html',
        category: 'social-media',
        categoryLabel: 'Social Media',
        title: 'Social Media Statics',
        subtitle: 'Static Designs',
        img: 'assets/other_static_cover.png',
        indexClasses: 'col-span-1'
    },
    {
        id: 'fintech',
        file: 'fintech-reels.html',
        category: 'motion-graphics',
        categoryLabel: 'Motion Graphics',
        title: 'Fintech Reels',
        subtitle: 'Reels',
        img: 'assets/fintech_cover.png',
        indexClasses: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1'
    },
    {
        id: 'other-reels',
        file: 'other-reels.html',
        category: 'motion-graphics',
        categoryLabel: 'Motion Graphics',
        title: 'Other Reels',
        subtitle: 'Various Reels',
        img: 'assets/other_reels_cover.png',
        indexClasses: 'col-span-1'
    },
    {
        id: 'emailer',
        file: 'e-mailer.html',
        category: 'digital-design',
        categoryLabel: 'E-Mailer Design',
        title: 'E-Mailer Design',
        subtitle: 'Digital Campaigns',
        img: 'assets/E-Mailer%20design/Cover.jpg',
        indexClasses: 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1'
    },
    {
        id: 'salsette',
        file: 'real-estate-brochure.html',
        category: 'print-design',
        categoryLabel: 'Print Design',
        title: 'Salsette 27',
        subtitle: 'Brochure Design',
        img: 'assets/Brochure/Cover.jpg',
        indexClasses: 'col-span-1'
    }
];

function generateIndexItem(item) {
    return `
                  <a href="${item.file}"
                      class="work-item group hover-target bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 opacity-0 translate-y-10 relative block border border-black/5 h-full ${item.indexClasses}">
                      <div class="absolute inset-0 flex flex-col">
                        <div class="relative w-full flex-1 overflow-hidden bg-neutral-100">
                          <img src="${item.img}"
                              alt="${item.title}"
                              class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                          </div>
                          <div
                              class="absolute top-5 right-5 badge-glow bg-[#0a0a0a] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                              ${item.categoryLabel}</div>
                      </div>
                      <div class="p-6 md:p-8 flex justify-between items-start bg-white z-10 shrink-0">
                          <div>
                              <h3
                                  class="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-2 relative inline-block text-black group-hover:text-[#FF4D00] transition-colors duration-300">
                                  ${item.title}</h3>
                              <p class="text-neutral-400 text-xs md:text-sm uppercase tracking-widest font-semibold">${item.subtitle}</p>
                          </div>
                          <span
                              class="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] group-hover:text-white transition-all duration-500 text-black shrink-0">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                              </svg>
                          </span>
                      </div>
                      </div>
                  </a>`;
}

function generateWorksItem(item) {
    return `
<a href="${item.file}" class="work-card break-inside-avoid mb-6 group block interactive bg-white/90 backdrop-blur-sm p-4 pb-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5" data-category="${item.category}">
                    <div class="relative w-full rounded-2xl overflow-hidden mb-6 bg-neutral-200">
                        <img src="${item.img}" alt="${item.title}" class="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div class="absolute top-4 left-4">
                            <span class="badge-glow bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">${item.categoryLabel}</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-heading font-bold text-2xl mb-1 group-hover:text-accent transition-colors">${item.title}</h3>
                        <p class="text-neutral-500 text-sm">${item.subtitle}</p>
                    </div>
                </a>`;
}

// Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const indexGridRegex = /(<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-\[350px\] sm:auto-rows-\[350px\] lg:auto-rows-\[350px\] gap-6 items-stretch grid-flow-dense">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
const indexCards = itemsData.map(generateIndexItem).join('\n');
indexHtml = indexHtml.replace(indexGridRegex, `$1\n${indexCards}\n$2`);
fs.writeFileSync('index.html', indexHtml);

// Update works.html
let worksHtml = fs.readFileSync('works.html', 'utf8');
const worksGridRegex = /(<div id="works-grid"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/main>)/;
const worksCards = itemsData.map(generateWorksItem).join('\n');
worksHtml = worksHtml.replace(worksGridRegex, `$1\n${worksCards}\n$2`);
fs.writeFileSync('works.html', worksHtml);

console.log('Reordered cards on both pages!');
