const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The string we want to fix safely without using wildcards:
//                     </div></a>
//                       <a href="#" class="interactive hover:text-black transition-colors">Behance</div></a>
//                       <a href="#" class="interactive hover:text-black transition-colors">LinkedIn</div></a>
//                   </div>

const badHtml = `</div></a>
                      <a href="#" class="interactive hover:text-black transition-colors">Behance</div></a>
                      <a href="#" class="interactive hover:text-black transition-colors">LinkedIn</div></a>
                  </div>`;

if (indexHtml.includes(badHtml)) {
    indexHtml = indexHtml.replace(badHtml, `</div>\n                  </div>`);
    fs.writeFileSync('index.html', indexHtml);
    console.log('Fixed exactly!');
} else {
    // If the indentation is slightly different, let's use a very tight regex
    const tightRegex = /<\/div><\/a>\s*<a href="[^"]*"[^>]*>Behance<\/div><\/a>\s*<a href="[^"]*"[^>]*>LinkedIn<\/div><\/a>\s*<\/div>/;
    if (tightRegex.test(indexHtml)) {
        indexHtml = indexHtml.replace(tightRegex, '</div>\n                  </div>');
        fs.writeFileSync('index.html', indexHtml);
        console.log('Fixed via regex!');
    } else {
        console.log('Could not find the exact bad string.');
    }
}
