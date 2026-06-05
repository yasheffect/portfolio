const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');

const tiltLogic = `
    // 3D Tilt Effect for Splash Box
    if (preloader) {
        gsap.set(preloader, { perspective: 1000 });
        const splashBox = document.querySelector('.splash-box');
        
        preloader.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            gsap.to(splashBox, {
                rotationY: -xAxis,
                rotationX: yAxis,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out",
                duration: 0.5
            });
        });

        preloader.addEventListener('mouseleave', () => {
            gsap.to(splashBox, {
                rotationY: 0,
                rotationX: 0,
                ease: "power2.out",
                duration: 1
            });
        });
    }
`;

// Insert the logic right after getting the preloader
scriptJs = scriptJs.replace(
    /const preloader = document.getElementById\('software-preloader'\);/,
    `const preloader = document.getElementById('software-preloader');\n${tiltLogic}`
);

fs.writeFileSync('script.js', scriptJs);
console.log('Added 3D tilt effect to preloader!');
