const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The button string:
const buttonHtmlRegex = /\s*<!-- View All Projects Button -->[\s\S]*?(?=<\/div>\s*<\/section>\s*<!-- About Section -->)/;
const match = indexHtml.match(buttonHtmlRegex);

if (match) {
    const buttonHtml = match[0];
    
    // Remove it from the Hero section
    indexHtml = indexHtml.replace(buttonHtmlRegex, '');
    
    // Now insert it into the Works section
    // The works section ends like this:
    // </a>\n</div>\n        </div>\n    </section>\n\n    <!-- Testimonials Section -->
    const worksEndRegex = /(<\/div>\s*)(<\/div>\s*<\/section>\s*<!-- Testimonials Section -->)/;
    
    indexHtml = indexHtml.replace(worksEndRegex, `$1${buttonHtml}\n$2`);
    
    fs.writeFileSync('index.html', indexHtml);
    console.log('Moved button successfully');
} else {
    console.log('Button not found in hero section');
}
