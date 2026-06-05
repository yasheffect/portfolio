const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The grid container ends, and right after it we need the button before the max-w-7xl div closes.
// Since we used regex `<\/div>\s*<\/div>\s*<\/section>` we replaced the grid closing tag, the max-w-7xl closing tag, and the section closing tag.
// So currently the end of the section looks like:
// </a>
// </div>
// </div>
// </section>

// We want to insert the button between the first </div> (which closes the grid) and the second </div> (which closes max-w-7xl).

const buttonHtml = `
              </div>
              
              <!-- View All Projects Button -->
              <div class="mt-20 flex justify-center w-full opacity-0" id="view-all-btn-container">
                  <a href="works.html" class="interactive group relative inline-flex items-center justify-center px-10 py-5 bg-[#0a0a0a] text-white rounded-full overflow-hidden transition-transform hover:scale-105 duration-500 shadow-xl hover:shadow-[#FF4D00]/20">
                      <span class="absolute inset-0 w-full h-full bg-[#FF4D00] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                      <span class="relative z-10 font-heading font-bold text-sm md:text-base tracking-[0.2em] uppercase flex items-center gap-3">
                          View All Projects
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-2 transition-transform duration-300">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                      </span>
                  </a>
              </div>
`;

// Find the last </a> that belongs to the grid.
// Actually, it's safer to just replace `</div>\n</div>\n</section>`
indexHtml = indexHtml.replace(/<\/div>\s*<\/div>\s*<\/section>/, buttonHtml + '\n          </div>\n      </section>');

fs.writeFileSync('index.html', indexHtml);
console.log('Restored the View All Projects button!');
