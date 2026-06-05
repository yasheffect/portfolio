const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');

const targetCode = `      // 3D Tilt Effect for Splash Box
      if (preloader) {
          gsap.set(preloader, { perspective: 1000 });
          const splashBox = document.querySelector('.splash-box');
          
          preloader.addEventListener('mousemove', (e) => {
              const xAxis = (window.innerWidth / 2 - e.pageX) / 360;
              const yAxis = (window.innerHeight / 2 - e.pageY) / 360;
              
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
          });`;

const replacementCode = `      // 3D Tilt Effect for Splash Box (Pro Max UI/UX)
      if (preloader) {
          const splashBox = document.querySelector('.splash-box');
          gsap.set(splashBox, { transformPerspective: 1200, transformStyle: "preserve-3d" });
          
          preloader.addEventListener('mousemove', (e) => {
              // Get mouse position relative to center of screen (from -1 to 1)
              const xAxis = (e.clientX / window.innerWidth) * 2 - 1;
              const yAxis = (e.clientY / window.innerHeight) * 2 - 1;
              
              // Max rotation of 12 degrees
              const rotX = yAxis * -12; 
              const rotY = xAxis * 12;  
              
              gsap.to(splashBox, {
                  rotationY: rotY,
                  rotationX: rotX,
                  x: xAxis * 15, // slight translation
                  y: yAxis * 15,
                  boxShadow: \`\${xAxis * -20}px \${yAxis * -20}px 50px rgba(0,0,0,0.15), 0 30px 60px rgba(0,0,0,0.1)\`,
                  ease: "power2.out",
                  duration: 0.8
              });
          });
  
          preloader.addEventListener('mouseleave', () => {
              gsap.to(splashBox, {
                  rotationY: 0,
                  rotationX: 0,
                  x: 0,
                  y: 0,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  ease: "elastic.out(1, 0.5)",
                  duration: 1.5
              });
          });`;

if (scriptJs.includes(targetCode)) {
    scriptJs = scriptJs.replace(targetCode, replacementCode);
    fs.writeFileSync('script.js', scriptJs);
    console.log('Successfully applied Pro Max hover to preloader!');
} else {
    console.log('Target code not found. Trying a regex approach...');
    
    // Fallback regex approach
    const regex = /\/\/ 3D Tilt Effect for Splash Box[\s\S]*?duration:\ 1\n\s*\}\);\n\s*\}\);/g;
    if(regex.test(scriptJs)) {
        scriptJs = scriptJs.replace(regex, replacementCode);
        fs.writeFileSync('script.js', scriptJs);
        console.log('Applied via regex!');
    } else {
        console.log('Regex also failed.');
    }
}
