const fs = require('fs');

const createWebPage = (id, title, coverImg, screenshotImg) => {
    let template = fs.readFileSync('motion-graphic-reel.html', 'utf8');
    
    // Replace titles
    template = template.replace(/Motion Graphics/g, 'Web Design');
    template = template.replace(/Disney\+ <span class="text-accent italic font-handwriting pr-2">Hotstar<\/span>/, 
        `${title.split(' ')[0]} <span class="text-accent italic font-handwriting pr-2">${title.substring(title.indexOf(' ') + 1)}</span>`);
    template = template.replace(/Disney\+ Hotstar Reel/g, title);
    template = template.replace(/Motion Graphic Showreel/g, 'Website Design & UI/UX');
    
    // Replace text content
    template = template.replace(/\[Placeholder Challenge\][\s\S]*?<\/p>/, '[Placeholder Challenge] The client needed a modern, highly engaging web presence that effectively communicated their brand identity while providing a seamless user experience across all devices.</p>');
    template = template.replace(/\[Placeholder Solution\][\s\S]*?<\/p>/, '[Placeholder Solution] We developed a comprehensive UI/UX strategy, creating intuitive user flows and a sleek, responsive design system. The final website is optimized for performance and conversion.</p>');
    
    // Replace cover
    template = template.replace(/assets\/hotstar_cover\.png/g, coverImg);
    
    // Replace the video gallery with the screenshot
    const galleryHtml = `
    <!-- Dynamic Asset Gallery -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 pb-32">
        <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
            <img src="${screenshotImg}" alt="${title} Full Page" class="w-full h-auto">
        </div>
    </section>
    `;
    
    template = template.replace(/<!-- Dynamic Asset Gallery -->[\s\S]*?<\/section>/, galleryHtml);
    
    // Replace next project
    template = template.replace(/Tech Review Series/g, 'Works Archive');
    template = template.replace(/href="#"/, 'href="works.html"');
    
    fs.writeFileSync(`${id}-web.html`, template);
};

// Create the 3 pages
createWebPage('eatanytime', 'Eat Anytime', 'assets/Web Design/eatanytime_cover.png', 'assets/Web Design/eatanytime.png');
createWebPage('chtrbox', 'Chtrbox Agency', 'assets/Web Design/chtrbox.png', 'assets/Web Design/chtrbox.png');
createWebPage('ghostkitchens', 'Ghost Kitchens', 'assets/Web Design/ghostkitchens.png', 'assets/Web Design/ghostkitchens.png');

console.log('Web pages regenerated correctly.');
