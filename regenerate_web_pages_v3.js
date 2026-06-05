const fs = require('fs');

const createWebPage = (id, title, coverImg, img1, img2, img3) => {
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
    template = template.replace(/\[Placeholder Solution\][\s\S]*?<\/p>/, '[Placeholder Solution] We developed a comprehensive UI/UX strategy, creating intuitive user flows and a sleek, responsive design system. The final website is optimized for performance and conversion. Below is a deep dive into the desktop experience.</p>');
    
    // Replace the video gallery with the multiple desktop screenshots
    const galleryHtml = `
    <!-- Dynamic Asset Gallery -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 pb-32">
        <div class="flex flex-col gap-12 md:gap-20">
            <!-- Section 1 -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
                <img src="${img1}" alt="${title} Desktop Section 1" class="w-full h-auto">
            </div>
            
            <!-- Section 2 -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
                <img src="${img2}" alt="${title} Desktop Section 2" class="w-full h-auto">
            </div>

            <!-- Section 3 -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-100">
                <img src="${img3}" alt="${title} Desktop Section 3" class="w-full h-auto">
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
    'assets/Web Design/eatanytime_desktop_1.png',
    'assets/Web Design/eatanytime_desktop_2.png',
    'assets/Web Design/eatanytime_desktop_3.png'
);
createWebPage(
    'chtrbox', 
    'Chtrbox Agency', 
    'assets/Web Design/chtrbox.png', 
    'assets/Web Design/chtrbox_desktop_1.png',
    'assets/Web Design/chtrbox_desktop_2.png',
    'assets/Web Design/chtrbox_desktop_3.png'
);
createWebPage(
    'ghostkitchens', 
    'Ghost Kitchens', 
    'assets/Web Design/ghostkitchens.png', 
    'assets/Web Design/ghostkitchens_desktop_1.png',
    'assets/Web Design/ghostkitchens_desktop_2.png',
    'assets/Web Design/ghostkitchens_desktop_3.png'
);

console.log('Web pages regenerated perfectly with 3 desktop sections.');
