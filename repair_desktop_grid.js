const fs = require('fs');

const spans = {
    'bad-boy-pizza.html': 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2',
    'ghostkitchens-web.html': 'col-span-1',
    'chtrbox-web.html': 'col-span-1',
    'hotstar-reel.html': 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1',
    'bajaj-finserv.html': 'col-span-1',
    'other-static.html': 'col-span-1',
    'fintech-reels.html': 'col-span-1 lg:row-span-2',
    'other-reels.html': 'col-span-1 lg:row-span-2',
    'e-mailer.html': 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2',
    'real-estate-brochure.html': 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1'
};

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The base classes that every card has
const baseClasses = "work-item group hover-target bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 opacity-0 translate-y-10 flex flex-col border border-black/5 h-full";

// Regex to find each anchor and replace its class attribute
for (const [href, spanClasses] of Object.entries(spans)) {
    // Find the <a> tag with this href and its class attribute
    // Note: The class attribute might span multiple lines
    const regex = new RegExp(`(<a href="${href}"\\s+class=")([^"]+)(")`, 'g');
    
    indexHtml = indexHtml.replace(regex, (match, p1, p2, p3) => {
        // Construct the new class string
        return `${p1}${baseClasses} ${spanClasses}${p3}`;
    });
}

// Ensure the grid itself has the correct columns and rows
// We want: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
// auto-rows-[400px] sm:auto-rows-[400px] lg:auto-rows-[350px]
const gridRegex = /class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-\[400px\] sm:auto-rows-\[400px\] lg:auto-rows-\[350px\] gap-6 items-stretch grid-flow-dense"/;
if (!gridRegex.test(indexHtml)) {
    console.log("Grid container classes might be wrong, patching...");
    indexHtml = indexHtml.replace(
        /class="grid [^"]*grid-flow-dense"/,
        'class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] sm:auto-rows-[400px] lg:auto-rows-[350px] gap-6 items-stretch grid-flow-dense"'
    );
}

fs.writeFileSync('index.html', indexHtml);
console.log('Successfully repaired desktop Bento Grid spans!');
