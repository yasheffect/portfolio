const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The corrupted HTML looks like:
//                     </div></a>
//                       <a href="#" class="interactive hover:text-black transition-colors">Behance</div></a>
//                       <a href="#" class="interactive hover:text-black transition-colors">LinkedIn</div></a>
//                   </div>
//               </div>
//           </div>
//       </section>

// Let's replace the whole contact footer area cleanly.

const cleanFooter = `
              <div
                  class="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-sm text-neutral-500 font-medium contact-element opacity-0">
                  <p>&copy; 2026 Yash Yadav. All rights reserved.</p>
                  <div class="flex gap-6 mt-4 md:mt-0">
                      <a href="https://www.instagram.com/lensatiionn" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">Instagram</a>
                      <a href="https://www.behance.net/yash_yadav" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">Behance</a>
                      <a href="https://www.linkedin.com/in/yash-yadav-2b24b5228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" class="interactive hover:text-black transition-colors">LinkedIn</a>
                  </div>
              </div>
          </div>
      </section>`;

// Regex to capture from `<div class="w-full flex flex-col md:flex-row` to `</section>` at the end of the contact section
const footerRegex = /<div[\s\S]*?class="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black\/10 text-sm text-neutral-500 font-medium contact-element opacity-0">[\s\S]*?<\/section>/;

indexHtml = indexHtml.replace(footerRegex, cleanFooter);

fs.writeFileSync('index.html', indexHtml);
console.log('Fixed footer HTML corruption');
