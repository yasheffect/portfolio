const fs = require('fs');

const createWebPage = (id, title, coverImg, desktopImg, tabletImg, mobileImg) => {
    let template = fs.readFileSync('motion-graphic-reel.html', 'utf8');
    
    // Replace top badge
    template = template.replace(/Motion Graphics/g, 'Web Design');
    
    // Replace Title
    const titleParts = title.split(' ');
    const firstWord = titleParts[0];
    const restWords = titleParts.slice(1).join(' ');
    template = template.replace(
        /Motion <span class="text-accent italic font-handwriting pr-2">Reel<\/span>/, 
        `${firstWord} <span class="text-accent italic font-handwriting pr-2">${restWords}<\/span>`
    );
    
    // Replace alt tags and header info
    template = template.replace(/Motion Reel Cover/g, `${title} Cover`);
    
    template = template.replace(/<p class="font-medium text-black">Motion Design<\/p>/, '<p class="font-medium text-black">Web Design & UI/UX</p>');
    template = template.replace(/<p class="font-medium text-black">Showreel<\/p>/, '<p class="font-medium text-black">Website, UI/UX</p>');
    
    // Replace Cover Image
    template = template.replace(/assets\/Motion%20graphic%20reel%20for%20agency\/Cover\.png/g, coverImg);
    
    // Replace text content
    template = template.replace(/\[Placeholder Challenge\][\s\S]*?<\/p>/, '[Placeholder Challenge] The client needed a modern, highly engaging web presence that effectively communicated their brand identity while providing a seamless user experience across all devices.</p>');
    template = template.replace(/\[Placeholder Solution\][\s\S]*?<\/p>/, '[Placeholder Solution] We developed a comprehensive UI/UX strategy, creating intuitive user flows and a sleek, responsive design system. The final website is optimized for performance and conversion across Desktop, Tablet, and Mobile.</p>');
    
    // Replace the video gallery with the multiple screenshots
    const galleryHtml = `
    <!-- Dynamic Asset Gallery -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 pb-32">
        <div class="flex flex-col gap-12">
            <!-- Desktop -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
                <img src="${desktopImg}" alt="${title} Desktop" class="w-full h-auto">
            </div>
            
            <!-- Mobile and Tablet side-by-side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <!-- Tablet -->
                <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-xl border border-black/10 relative bg-neutral-100 flex items-center justify-center p-8 bg-neutral-200">
                    <img src="${tabletImg}" alt="${title} Tablet" class="w-full max-w-[500px] h-auto rounded-xl shadow-lg">
                </div>
                <!-- Mobile -->
                <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-xl border border-black/10 relative bg-neutral-100 flex items-center justify-center p-8 bg-neutral-200">
                    <img src="${mobileImg}" alt="${title} Mobile" class="w-full max-w-[300px] h-auto rounded-[2rem] shadow-lg">
                </div>
            </div>
        </div>
    </section>
    `;
    
    template = template.replace(/<!-- Dynamic Asset Gallery -->[\s\S]*?<\/section>/, galleryHtml);
    
    // Replace next project
    template = template.replace(/Tech Review Series/g, 'Works Archive');
    template = template.replace(/href="#"/, 'href="works.html"');
    template = template.replace(/https:\/\/images\.unsplash\.com\/photo-1616440347437-b1c73416efc2\?q=80&w=2000&auto=format&fit=crop/, 'assets/Web%20Design/eatanytime.png');
    
    fs.writeFileSync(`${id}-web.html`, template);
};

// Create the 3 pages
createWebPage(
    'eatanytime', 
    'Eat Anytime', 
    'assets/Web Design/eatanytime_cover.png', 
    'assets/Web Design/eatanytime.png',
    'assets/Web Design/eatanytime_tablet.png',
    'assets/Web Design/eatanytime_mobile.png'
);
createWebPage(
    'chtrbox', 
    'Chtrbox Agency', 
    'assets/Web Design/chtrbox.png', 
    'assets/Web Design/chtrbox.png',
    'assets/Web Design/chtrbox_tablet.png',
    'assets/Web Design/chtrbox_mobile.png'
);
createWebPage(
    'ghostkitchens', 
    'Ghost Kitchens', 
    'assets/Web Design/ghostkitchens.png', 
    'assets/Web Design/ghostkitchens.png',
    'assets/Web Design/ghostkitchens_tablet.png',
    'assets/Web Design/ghostkitchens_mobile.png'
);

console.log('Web pages regenerated perfectly.');
