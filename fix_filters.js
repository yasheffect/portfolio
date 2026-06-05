const fs = require('fs');

let worksHtml = fs.readFileSync('works.html', 'utf8');

const missingFilters = `            
            <!-- Filters -->
            <div class="flex flex-wrap gap-2 md:gap-4 filter-container">
                <button class="filter-btn active interactive px-5 py-2 rounded-full border border-black text-sm font-semibold tracking-wide transition-all bg-black text-white" data-filter="all">All</button>
                <button class="filter-btn interactive px-5 py-2 rounded-full border border-black/20 text-sm font-semibold tracking-wide transition-all hover:border-black text-neutral-600 hover:text-black" data-filter="brand-identity">Brand Identity</button>
                <button class="filter-btn interactive px-5 py-2 rounded-full border border-black/20 text-sm font-semibold tracking-wide transition-all hover:border-black text-neutral-600 hover:text-black" data-filter="print-design">Print Design</button>
                <button class="filter-btn interactive px-5 py-2 rounded-full border border-black/20 text-sm font-semibold tracking-wide transition-all hover:border-black text-neutral-600 hover:text-black" data-filter="social-media">Social Media</button>
                <button class="filter-btn interactive px-5 py-2 rounded-full border border-black/20 text-sm font-semibold tracking-wide transition-all hover:border-black text-neutral-600 hover:text-black" data-filter="web-design">Web Design & UI/UX</button>
                <button class="filter-btn interactive px-5 py-2 rounded-full border border-black/20 text-sm font-semibold tracking-wide transition-all hover:border-black text-neutral-600 hover:text-black" data-filter="motion-graphics">Motion Graphics</button>
            </div>
        </div>
    </header>
`;

worksHtml = worksHtml.replace(/An archive of my favorite projects spanning branding, motion design, and digital experiences\.\s*<\/p>/, `An archive of my favorite projects spanning branding, motion design, and digital experiences.\n            </p>\n${missingFilters}`);

fs.writeFileSync('works.html', worksHtml);
console.log('Restored filters correctly!');
