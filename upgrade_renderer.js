const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
    /<canvas id="hero-canvas" class="absolute inset-0 w-full h-full object-cover opacity-80 z-0"><\/canvas>/,
    '<img id="hero-img-seq" class="absolute inset-0 w-full h-full object-cover opacity-80 z-0" src="./scoll-vid-v2/ezgif-frame-001.jpg" alt="Hero Sequence">'
);

fs.writeFileSync('index.html', indexHtml);


// 2. Update script.js
let scriptJs = fs.readFileSync('script.js', 'utf8');

const oldCanvasLogic = `    // 3. Canvas Image Sequence Animation (ScrollTrigger)
    const canvas = document.getElementById("hero-canvas");
    
    if (canvas) {
        const context = canvas.getContext("2d");
        
        const frameCount = 240; // Based on ezgif frames 1 to 240
        // Path configuration relative to portfolio folder
        const currentFrame = index => \`./scoll-vid-v2/ezgif-frame-\${index.toString().padStart(3, '0')}.jpg\`;

        const images = [];
        const ezgif = {
            frame: 0
        };

        // Preload all images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        function render() {
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            // Ensure high quality smoothing is applied every frame just in case
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            
            // Draw current image centered and covering the canvas (object-fit: cover equivalent)
            const img = images[Math.round(ezgif.frame)] || images[0];
            
            if (img && img.complete && img.naturalWidth !== 0) {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                
                // Round coordinates to prevent sub-pixel rendering blur
                const centerShift_x = Math.round((canvas.width - img.width * ratio) / 2);
                const centerShift_y = Math.round((canvas.height - img.height * ratio) / 2);  
                const drawWidth = Math.round(img.width * ratio);
                const drawHeight = Math.round(img.height * ratio);
                
                context.drawImage(img, 0, 0, img.width, img.height,
                                centerShift_x, centerShift_y, drawWidth, drawHeight);
            }
        }

        // Initial draw once first image loads
        images[0].onload = render;

        // Set canvas dimensions to match viewport, accounting for Retina/high-DPI displays
        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            
            // Set actual internal canvas resolution to match physical display pixels
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            
            // Ensure the CSS display size remains strictly the viewport size
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            
            // Ensure smooth scaling
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            
            // Re-render immediately on resize so it doesn't blank out
            if (images.length > 0 && images[0].complete) {
                render();
            }
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // GSAP ScrollTrigger for Canvas Sequence
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(ezgif, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom bottom", // 300vh height means it scrolls for 200vh
                scrub: 0.5
            },
            onUpdate: render
        });
    }`;

// Since regex on this huge block is brittle, I'll use a precise replace
const newLogic = `    // 3. Native IMG Sequence Animation (ScrollTrigger)
    const seqImg = document.getElementById("hero-img-seq");
    
    if (seqImg) {
        const frameCount = 240;
        const currentFrame = index => \`./scoll-vid-v2/ezgif-frame-\${index.toString().padStart(3, '0')}.jpg\`;

        const images = [];
        const ezgif = { frame: 0 };

        // Preload all images silently in memory
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        function render() {
            const index = Math.round(ezgif.frame);
            if (images[index] && images[index].src) {
                // Switching native img src forces the browser's hardware-accelerated scaler
                // which is far superior to Canvas 2D interpolation for JPEGs
                seqImg.src = images[index].src;
            }
        }

        gsap.registerPlugin(ScrollTrigger);

        gsap.to(ezgif, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5
            },
            onUpdate: render
        });
    }`;

// Doing string replacement since we have the exact text
if (scriptJs.includes(oldCanvasLogic)) {
    scriptJs = scriptJs.replace(oldCanvasLogic, newLogic);
    fs.writeFileSync('script.js', scriptJs);
    console.log('Successfully replaced canvas with native img sequence!');
} else {
    console.log('Could not find old canvas logic!');
}
