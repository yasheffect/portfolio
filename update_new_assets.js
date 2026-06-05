const fs = require('fs');

const updateGhostKitchens = () => {
    let content = fs.readFileSync('ghostkitchens-web.html', 'utf8');

    // Add CSS Browser Frame to Cover
    const coverRegex = /<div class="w-full max-w-\[1400px\] mx-auto bg-neutral-100 rounded-\[2rem\] overflow-hidden relative interactive group shadow-2xl border border-black\/10">\s*<!-- Main Hero Image -->\s*<img src="assets\/Web Design\/ghostkitchens\.png" alt="Ghost Kitchens Cover" class="w-full h-auto group-hover:scale-105 transition-transform duration-700 origin-top">\s*<\/div>/;
    
    const newCover = `
        <div class="w-full max-w-[1400px] mx-auto bg-neutral-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative interactive group shadow-2xl border border-black/10">
            <!-- Fake Browser Chrome -->
            <div class="w-full h-8 md:h-12 bg-neutral-200/80 backdrop-blur border-b border-black/5 flex items-center px-4 md:px-6 gap-2">
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <!-- Main Hero Image -->
            <div class="w-full h-[400px] md:h-[600px] overflow-hidden">
                <img src="assets/Web Design/ghostkitchens.png" alt="Ghost Kitchens Cover" class="w-full h-auto group-hover:translate-y-[-10%] transition-transform duration-[2s] origin-top">
            </div>
        </div>
    `;
    
    content = content.replace(coverRegex, newCover);

    // Add Videos above the screenshots in the gallery
    const galleryStartRegex = /<!-- Dynamic Asset Gallery -->\s*<section class="max-w-\[1400px\] mx-auto px-4 md:px-8 py-12 pb-32">\s*<div class="flex flex-col gap-12 md:gap-20">/;
    
    const newGalleryStart = `<!-- Dynamic Asset Gallery -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 pb-32">
        <div class="flex flex-col gap-12 md:gap-20">
            
            <!-- Video 1: Homepage -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-900">
                <video controls autoplay loop playsinline muted class="w-full h-auto object-cover">
                    <source src="assets/Web Design/ghostkitchens_homepage.mp4" type="video/mp4">
                </video>
            </div>

            <!-- Video 2: Franchise Page -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-900">
                <video controls autoplay loop playsinline muted class="w-full h-auto object-cover">
                    <source src="assets/Web Design/ghostkitchens_franchise_page.mp4" type="video/mp4">
                </video>
            </div>
`;
    
    content = content.replace(galleryStartRegex, newGalleryStart);
    fs.writeFileSync('ghostkitchens-web.html', content);
};

const updateChtrbox = () => {
    let content = fs.readFileSync('chtrbox-web.html', 'utf8');

    // Add CSS Browser Frame to Cover
    const coverRegex = /<div class="w-full max-w-\[1400px\] mx-auto bg-neutral-100 rounded-\[2rem\] overflow-hidden relative interactive group shadow-2xl border border-black\/10">\s*<!-- Main Hero Image -->\s*<img src="assets\/Web Design\/chtrbox\.png" alt="Chtrbox Agency Cover" class="w-full h-auto group-hover:scale-105 transition-transform duration-700 origin-top">\s*<\/div>/;
    
    const newCover = `
        <div class="w-full max-w-[1400px] mx-auto bg-neutral-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative interactive group shadow-2xl border border-black/10">
            <!-- Fake Browser Chrome -->
            <div class="w-full h-8 md:h-12 bg-neutral-200/80 backdrop-blur border-b border-black/5 flex items-center px-4 md:px-6 gap-2">
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <!-- Main Hero Image -->
            <div class="w-full h-[400px] md:h-[600px] overflow-hidden">
                <img src="assets/Web Design/chtrbox.png" alt="Chtrbox Agency Cover" class="w-full h-auto group-hover:translate-y-[-10%] transition-transform duration-[2s] origin-top">
            </div>
        </div>
    `;
    
    content = content.replace(coverRegex, newCover);

    // Add Videos above the screenshots in the gallery
    const galleryStartRegex = /<!-- Dynamic Asset Gallery -->\s*<section class="max-w-\[1400px\] mx-auto px-4 md:px-8 py-12 pb-32">\s*<div class="flex flex-col gap-12 md:gap-20">/;
    
    const newGalleryStart = `<!-- Dynamic Asset Gallery -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 pb-32">
        <div class="flex flex-col gap-12 md:gap-20">
            
            <!-- Video 1: Homepage -->
            <div class="w-full rounded-[2rem] overflow-hidden interactive group shadow-2xl border border-black/10 relative bg-neutral-900">
                <video controls autoplay loop playsinline muted class="w-full h-auto object-cover">
                    <source src="assets/Web Design/chtrbox_homepage.mp4" type="video/mp4">
                </video>
            </div>
`;
    
    content = content.replace(galleryStartRegex, newGalleryStart);
    fs.writeFileSync('chtrbox-web.html', content);
};

updateGhostKitchens();
updateChtrbox();
console.log('Finished updating files with videos and CSS mockups.');
