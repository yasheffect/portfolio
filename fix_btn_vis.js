const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/class="mt-20 flex justify-center w-full opacity-0" id="view-all-btn-container"/g, 'class="mt-20 flex justify-center w-full"');
fs.writeFileSync('index.html', html);
console.log('Fixed button visibility');
