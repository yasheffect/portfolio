const fs = require('fs');

// 1. Fix works.html
let works = fs.readFileSync('works.html', 'utf8');

const replacement = `
                <!-- Eat Anytime -->
                <a href="eatanytime-web.html" class="work-card group block interactive bg-white/90 backdrop-blur-sm p-4 pb-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5" data-category="web">
                    <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-200">
                        <img src="assets/Web Design/eatanytime_cover.png" alt="Eat Anytime" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div class="absolute top-4 left-4">
                            <span class="badge-glow bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">Web Design</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-heading font-bold text-2xl mb-1 group-hover:text-accent transition-colors">Eat Anytime</h3>
                        <p class="text-neutral-500 text-sm">Web Design / UI UX</p>
                    </div>
                </a>

                <!-- Chtrbox -->
                <a href="chtrbox-web.html" class="work-card group block interactive bg-white/90 backdrop-blur-sm p-4 pb-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5" data-category="web">
                    <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-200">
                        <img src="assets/Web Design/chtrbox.png" alt="Chtrbox" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 object-top">
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div class="absolute top-4 left-4">
                            <span class="badge-glow bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">Web Design</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-heading font-bold text-2xl mb-1 group-hover:text-accent transition-colors">Chtrbox Agency</h3>
                        <p class="text-neutral-500 text-sm">Web Design / UI UX</p>
                    </div>
                </a>

                <!-- Ghost Kitchens -->
                <a href="ghostkitchens-web.html" class="work-card group block interactive bg-white/90 backdrop-blur-sm p-4 pb-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5" data-category="web">
                    <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-200">
                        <img src="assets/Web Design/ghostkitchens.png" alt="Ghost Kitchens" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 object-top">
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div class="absolute top-4 left-4">
                            <span class="badge-glow bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">Web Design</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-heading font-bold text-2xl mb-1 group-hover:text-accent transition-colors">Ghost Kitchens</h3>
                        <p class="text-neutral-500 text-sm">Web Design / UI UX</p>
                    </div>
                </a>
`;

// Replace the old bad cards with the correct format
works = works.replace(/<!-- Eat Anytime -->[\s\S]*?<!-- Ghost Kitchens -->[\s\S]*?<\/a>/, replacement.trim());

fs.writeFileSync('works.html', works);


// 2. Fix index.html services
let index = fs.readFileSync('index.html', 'utf8');

// I will just use standard anchor tags wrapping the inner text of the services, so that clicking anywhere works!
// Wait, the safest way is to wrap the <li> content in an <a> tag.
// But the <li> has hover-target etc. Let's just wrap the <span> text inside an <a>.
// Brand Identity
index = index.replace(/<span\s+class="service-title([^>]*)>Brand\s*Identity<\/span>/, '<span class="service-title$1><a href="bad-boy-pizza.html" class="block w-full h-full">Brand Identity</a></span>');
index = index.replace(/<span\s+class="service-title([^>]*)>Print\s*Design<\/span>/, '<span class="service-title$1><a href="real-estate-brochure.html" class="block w-full h-full">Print Design</a></span>');
index = index.replace(/<span\s+class="service-title([^>]*)>Social\s*Media Designs<\/span>/, '<span class="service-title$1><a href="other-static.html" class="block w-full h-full">Social Media Designs</a></span>');
index = index.replace(/<span\s+class="service-title([^>]*)>Motion\s*Graphics<\/span>/, '<span class="service-title$1><a href="hotstar-reel.html" class="block w-full h-full">Motion Graphics</a></span>');
index = index.replace(/<span\s+class="service-title([^>]*)>Web\s*Design & UI\/UX<\/span>/, '<span class="service-title$1><a href="eatanytime-web.html" class="block w-full h-full">Web Design & UI/UX</a></span>');

fs.writeFileSync('index.html', index);
console.log('Fixed cards and links.');
