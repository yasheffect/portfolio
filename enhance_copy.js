const fs = require('fs');

// INDEX.HTML Replacements
let indexHtml = fs.readFileSync('index.html', 'utf8');

const indexReplacements = {
    // Hero
    'Crafting visual narratives with': 'Elevating brands through strategic design and',
    'Explore my digital playground of selected works.': 'A curated showcase of multidisciplinary digital experiences.',
    
    // Services
    'My Expertise': 'What I Do',
    'Creative Services': 'Areas of Expertise',
    'Bringing static designs to life with dynamic animations, explainer videos, and scroll-stopping visual effects.': 'Breathing life into static designs through dynamic animations, immersive video editing, and scroll-stopping visual effects.',
    'Crafting memorable logos, typography systems, and cohesive brand guidelines that tell your unique story.': 'Forging memorable visual identities, comprehensive typography systems, and cohesive brand guidelines that tell your unique story.',
    'Designing intuitive, conversion-focused user interfaces with pixel-perfect attention to detail and modern aesthetics.': 'Designing intuitive, conversion-focused user interfaces with pixel-perfect attention to detail and scalable aesthetics.',
    'Creating viral-worthy content, engaging reels, and aesthetic static posts that dominate the algorithm.': 'Crafting high-impact content, engaging reels, and aesthetic static campaigns that elevate your digital presence.',
    
    // About
    'Behind the pixels': 'The Creative Mind',
    "I'm Yash, a passionate designer specializing in motion graphics, brand identity, and web design. I believe in the power of visual storytelling to elevate brands and create meaningful connections. When I'm not designing, you can find me exploring the streets of Mumbai with my camera.": "I'm Yash, a multidisciplinary designer specializing in motion graphics, brand identity, and digital experiences. I believe in the power of visual storytelling to elevate brands and forge meaningful connections. With a meticulous eye for detail, I transform complex ideas into compelling visual narratives.",
    
    // Footer
    'Got an idea?': 'Have a project in mind?',
};

for (const [oldText, newText] of Object.entries(indexReplacements)) {
    indexHtml = indexHtml.replace(oldText, newText);
}

fs.writeFileSync('index.html', indexHtml);


// WORKS.HTML Replacements
let worksHtml = fs.readFileSync('works.html', 'utf8');

const worksReplacements = {
    'Selected <span class="text-accent italic font-handwriting">Works</span>': 'Project <span class="text-accent italic font-handwriting">Archive</span>',
    'An archive of my favorite projects spanning branding, motion design, and digital experiences.': 'A comprehensive collection of my professional projects spanning branding, motion design, and digital experiences.'
};

for (const [oldText, newText] of Object.entries(worksReplacements)) {
    worksHtml = worksHtml.replace(oldText, newText);
}

// Change title tag of works.html
worksHtml = worksHtml.replace('<title>Yash Yadav | Selected Works</title>', '<title>Yash Yadav | Project Archive</title>');

fs.writeFileSync('works.html', worksHtml);

console.log('Enhanced website copy successfully');
