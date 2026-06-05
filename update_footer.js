const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The new "Let's Create" email button matching the View All Projects design
const newButton = `
              <a href="mailto:yasheffect@gmail.com" class="interactive group relative inline-flex items-center justify-center px-12 py-5 mb-16 bg-[#0a0a0a] text-white rounded-full overflow-hidden transition-transform hover:scale-105 duration-500 shadow-xl hover:shadow-[#FF4D00]/20 contact-element opacity-0 translate-y-4">
                  <span class="absolute inset-0 w-full h-full bg-[#FF4D00] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span class="relative z-10 font-heading font-bold text-sm md:text-base tracking-[0.2em] uppercase flex items-center gap-3">
                      Email Me
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-2 transition-transform duration-300">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                  </span>
              </a>`;

// Replace the old Contact Me button
const oldButtonRegex = /<a href="mailto:hello@yashyadav\.com"[\s\S]*?<\/div><\/a>/;
indexHtml = indexHtml.replace(oldButtonRegex, newButton);

// If the user's code didn't perfectly match `</div></a>`, let's try a fallback:
if (indexHtml.includes('mailto:hello@yashyadav.com')) {
    // try looser regex
    indexHtml = indexHtml.replace(/<a href="mailto:[^"]+"[\s\S]*?<\/a>/, newButton);
}

// The new Social Links
const newSocialLinks = `
                  <div class="flex gap-6 mt-4 md:mt-0">
                      <a href="https://www.instagram.com/lensatiionn" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">Instagram</a>
                      <a href="https://www.behance.net/yash_yadav" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">Behance</a>
                      <a href="https://www.linkedin.com/in/yash-yadav-2b24b5228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">LinkedIn</a>
                  </div>`;

// Replace the old Social Links
const oldSocialRegex = /<div class="flex gap-6 mt-4 md:mt-0">[\s\S]*?<\/div>/;
indexHtml = indexHtml.replace(oldSocialRegex, newSocialLinks);

fs.writeFileSync('index.html', indexHtml);
console.log('Updated footer successfully');
