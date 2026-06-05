// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Implementation
    const customCursor = document.querySelector('.custom-cursor');
    const interactives = document.querySelectorAll('.interactive, a, button, .hover-target');

    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        
        // Setup doodle trail
        const trailElements = [];
        const trailLength = 6; // short trail
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.classList.add('cursor-trail-dot');
            
            // scale and fade out the tail gently
            const scale = 1 - (i / trailLength) * 0.6; // Scale goes from 1 to 0.4
            gsap.set(dot, { scale: scale, opacity: 1 - (i / trailLength) * 0.4 });
            document.body.appendChild(dot);
            
            trailElements.push({
                xTo: gsap.quickTo(dot, "x", {duration: 0.1 + (i * 0.04), ease: "power2.out"}),
                yTo: gsap.quickTo(dot, "y", {duration: 0.1 + (i * 0.04), ease: "power2.out"})
            });
        }

        window.addEventListener('mousemove', (e) => {
            // Direct mapping for immediate response (no lag for the main pointer)
            customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Update trail
            trailElements.forEach((point) => {
                point.xTo(e.clientX);
                point.yTo(e.clientY);
            });
        });

        // Click interaction
        window.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
        });
        window.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });

        // Hover effects
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 2. Preloader and Initial Page Load Animations
    const preloader = document.getElementById('software-preloader');

          // 3D Tilt Effect for Splash Box (Pro Max UI/UX)
      if (preloader) {
          const splashBox = document.querySelector('.splash-box');
          gsap.set(splashBox, { transformPerspective: 1200, transformStyle: "preserve-3d" });
          
          preloader.addEventListener('mousemove', (e) => {
              // Get mouse position relative to center of screen (from -1 to 1)
              const xAxis = (e.clientX / window.innerWidth) * 2 - 1;
              const yAxis = (e.clientY / window.innerHeight) * 2 - 1;
              
              // Max rotation of 6 degrees
              const rotX = yAxis * -6; 
              const rotY = xAxis * 6;  
              
              gsap.to(splashBox, {
                  rotationY: rotY,
                  rotationX: rotX,
                  x: xAxis * 7.5, // slight translation
                  y: yAxis * 7.5,
                  boxShadow: `${xAxis * -10}px ${yAxis * -10}px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.08)`,
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
          });
    }

    
    // Main page timeline (paused initially)
    const tl = gsap.timeline({ paused: true });

    tl.to('.nav-container', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });

    if (preloader) {
        // Elements
        const loadingText = document.getElementById('loading-text');
        const loadingBar = document.getElementById('loading-bar');
        const loadingPercentage = document.getElementById('loading-percentage');
        const splashImg = document.getElementById('splash-img');

        // Show splash box with a slight pop
        gsap.to('.splash-box', {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.1
        });
        
        // Slowly zoom in the artwork
        if(splashImg) {
            splashImg.style.transform = 'scale(1)';
        }

        const loadStrings = [
            "Reading preferences...",
            "Loading fonts...",
            "Initializing layout engines...",
            "Loading WebGL context...",
            "Preparing creative assets...",
            "Starting workspace..."
        ];

        let progress = 0;
        const totalTime = 4000; // 4 seconds
        const intervalTime = 30;
        const stringChangeInterval = totalTime / loadStrings.length;

        let startTime = Date.now();
        
        const loadingInterval = setInterval(() => {
            let elapsed = Date.now() - startTime;
            progress = Math.min((elapsed / totalTime) * 100, 100);
            
            // Update UI
            if (loadingBar) loadingBar.style.width = `${progress}%`;
            if (loadingPercentage) loadingPercentage.innerText = `${Math.floor(progress)}%`;

            // Update text based on elapsed time
            let stringIndex = Math.min(Math.floor(elapsed / stringChangeInterval), loadStrings.length - 1);
            if (loadingText) loadingText.innerText = loadStrings[stringIndex];

            if (progress >= 100) {
                clearInterval(loadingInterval);
                
                // Exit Splash Screen and start page animations
                const exitTl = gsap.timeline();
                exitTl.to('.splash-box', {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.5,
                    ease: "power2.in",
                    delay: 0.2
                }).to(preloader, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        tl.play(); // Start main page animations
                    }
                }, "-=0.2");
            }
        }, intervalTime);
    } else {
        // Fallback if no preloader
        tl.play();
    }


    // 3. Native IMG Sequence Animation (ScrollTrigger)
    const seqImg = document.getElementById("hero-img-seq");
    
    if (seqImg) {
        const frameCount = 240;
        const currentFrame = index => `./scoll-vid-v2/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

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
    }

    // --- Text Splitter Utility ---
    function splitTextByChar(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.innerText.trim();
            el.innerHTML = '';
            const words = text.split(' ');
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.overflow = 'hidden';
                wordSpan.style.verticalAlign = 'top';
                
                const chars = word.split('');
                chars.forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.style.display = 'inline-block';
                    charSpan.innerText = char;
                    charSpan.classList.add('split-char');
                    charSpan.style.transform = 'translateY(110%)';
                    wordSpan.appendChild(charSpan);
                });
                
                el.appendChild(wordSpan);
                
                if (wordIndex < words.length - 1) {
                    el.appendChild(document.createTextNode('\u00A0')); // non-breaking space for accurate layout
                }
            });
        });
    }

    // Apply splitting
    splitTextByChar('#hero h1');
    splitTextByChar('#about h2');
    splitTextByChar('#works h2');
    splitTextByChar('#contact h2');
    splitTextByChar('.service-title');

    // Fade in hero text towards the halfway mark of the scroll sequence
    gsap.to('.hero-element', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#hero",
            start: "40% top",
            end: "65% top",
            scrub: true,
        }
    });

    // Fade out the initial scroll prompt early in the scroll
    gsap.to('#scroll-prompt', {
        opacity: 0,
        y: -30,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "15% top",
            scrub: true,
        }
    });

    gsap.to('#hero h1 .split-char', {
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#hero",
            start: "65% bottom",
            toggleActions: "play none none reverse"
        }
    });

    // 4. Scroll Animations for other sections
    
    // About Section
    gsap.to('.about-panel', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
        }
    });

    gsap.to('.about-text', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about",
            start: "top 60%",
        }
    });

    gsap.to('#about h2 .split-char', {
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: {
            trigger: "#about",
            start: "top 60%",
        }
    });

    gsap.to('.about-skills-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".about-skills-header",
            start: "top 85%",
        }
    });

    gsap.to('.magnetic-wrap', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".skills-container",
            start: "top 85%",
        }
    });

    // Magnetic 3D Effect utility
    function setupMagnetic3D(wrapSelector, itemSelector, config) {
        const wraps = document.querySelectorAll(wrapSelector);
        wraps.forEach(wrap => {
            const item = itemSelector ? wrap.querySelector(itemSelector) : wrap;
            if (!item) return;
            
            // Set perspective on the parent wrapper for true 3D depth, and preserve-3d on the rotating item
            gsap.set(wrap, { perspective: config.perspective || 1000 });
            gsap.set(item, { transformStyle: "preserve-3d" });
            
            // If requested, push the inner text/icons out on the Z axis to create depth
            if (config.popInnerElements) {
                const innerEls = item.querySelectorAll('div, span, img, h3, ul');
                gsap.set(innerEls, { transform: "translateZ(20px)" });
            }
            
            const xTo = gsap.quickTo(item, "x", {duration: 0.5, ease: "power3"});
            const yTo = gsap.quickTo(item, "y", {duration: 0.5, ease: "power3"});
            const rotateXTo = gsap.quickTo(item, "rotateX", {duration: 0.5, ease: "power3"});
            const rotateYTo = gsap.quickTo(item, "rotateY", {duration: 0.5, ease: "power3"});
            
            const moveStrength = config.moveStrength || 0;
            const tiltStrength = config.tiltStrength || 0;
            
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const relX = e.clientX - (rect.left + rect.width / 2);
                const relY = e.clientY - (rect.top + rect.height / 2);
                
                if (moveStrength > 0) {
                    xTo(relX * moveStrength);
                    yTo(relY * moveStrength);
                }
                
                if (tiltStrength > 0) {
                    const xPercent = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
                    const yPercent = Math.max(-1, Math.min(1, relY / (rect.height / 2)));
                    rotateXTo(-yPercent * tiltStrength);
                    rotateYTo(xPercent * tiltStrength);
                }
            });
            
            wrap.addEventListener('mouseleave', () => {
                if (moveStrength > 0) {
                    xTo(0);
                    yTo(0);
                }
                if (tiltStrength > 0) {
                    rotateXTo(0);
                    rotateYTo(0);
                }
            });
        });
    }

    // Setup the effects
    // Skill Pills: true 3D tilt with perspective, popping inner text out
    setupMagnetic3D('.magnetic-wrap', '.skill-pill', { moveStrength: 0.08, tiltStrength: 12, perspective: 1000, popInnerElements: true });
    
    // Properties Box: Added a wrapper to avoid scrollTrigger conflicts, true 3D tilt
    setupMagnetic3D('.magnetic-3d-wrap', '.magnetic-3d-item', { moveStrength: 0.02, tiltStrength: 2.5, perspective: 1200, popInnerElements: false });

    // Services Section Image Preview Logic
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const serviceItems = document.querySelectorAll('.service-item');
        const previewContainer = document.querySelector('.services-image-preview');
        const previewImg = document.getElementById('service-preview-img');

        gsap.to('.services-header', {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: "#services",
                start: "top 80%",
            }
        });

        // Handle hover for services to show preview image and follow cursor
        if (window.matchMedia("(min-width: 768px)").matches && previewContainer) {
            
            // Setup GSAP quickTo for highly performant cursor tracking
            const xTo = gsap.quickTo(previewContainer, "left", {duration: 0.6, ease: "power3"});
            const yTo = gsap.quickTo(previewContainer, "top", {duration: 0.6, ease: "power3"});
            
            servicesSection.addEventListener('mousemove', (e) => {
                // Offset the image so it sits to the bottom-right of the cursor
                xTo(e.clientX + 20);
                yTo(e.clientY + 20);
            });

            serviceItems.forEach(item => {
                // Animate text reveal on scroll for each item
                gsap.to(item.querySelectorAll('.split-char'), {
                    y: 0,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    }
                });

                item.addEventListener('mouseenter', () => {
                    const imgSrc = item.getAttribute('data-img');
                    if (previewImg) previewImg.src = imgSrc;
                    gsap.to(previewContainer, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(previewContainer, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.4,
                        ease: "power2.in"
                    });
                });
            });
        }
    }

    // Works Section
    gsap.to('.works-header', {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: "#works",
            start: "top 80%",
        }
    });

    gsap.to('#works h2 .split-char', {
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: {
            trigger: "#works",
            start: "top 80%",
        }
    });

    gsap.utils.toArray('.work-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            }
        });
    });

    // Contact Section
    gsap.to('.contact-element', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        }
    });

    gsap.to('#contact h2 .split-char', {
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        }
    });

    // ==========================================
    // Works Page: Gallery Filtering Logic
    // ==========================================
    function initWorksFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const workCards = document.querySelectorAll('.work-card');

        if (!filterBtns.length || !workCards.length) return;

        // Animate title in on load
        splitTextByChar('.page-title');
        gsap.to('.page-title .split-char', {
            y: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
            delay: 0.2
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');

                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-black', 'text-white', 'active');
                    b.classList.add('border-black/20', 'text-neutral-600');
                    b.classList.remove('border-black');
                });
                btn.classList.remove('border-black/20', 'text-neutral-600');
                btn.classList.add('bg-black', 'text-white', 'border-black', 'active');

                // GSAP Animation for filtering
                gsap.to(workCards, {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Set display logic
                        workCards.forEach(card => {
                            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });

                        const visibleCards = Array.from(workCards).filter(c => c.style.display !== 'none');
                        
                        gsap.set(visibleCards, { y: 20, scale: 0.95, opacity: 0 });
                        gsap.to(visibleCards, {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: "back.out(1.2)"
                        });
                        
                        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                    }
                });
            });
        });
    }

    initWorksFilter();

    // ==========================================
    // STAGGER TESTIMONIALS LOGIC
    // ==========================================
    const testimonialsData = [
        { testimonial: "My favorite solution in the market. We work 5x faster with Yash.", by: "Alex, CEO at TechCorp", imgSrc: "https://i.pravatar.cc/150?img=1" },
        { testimonial: "I'm confident my branding is top-tier with YY. I can't say that about other designers.", by: "Dan, CTO at SecureNet", imgSrc: "https://i.pravatar.cc/150?img=2" },
        { testimonial: "I know it's cliche, but we were lost before we found Yash. Can't thank you guys enough!", by: "Stephanie, COO at InnovateCo", imgSrc: "https://i.pravatar.cc/150?img=3" },
        { testimonial: "The products make planning for the future seamless. Can't recommend them enough!", by: "Marie, CFO at FuturePlanning", imgSrc: "https://i.pravatar.cc/150?img=4" },
        { testimonial: "If I could give 11 stars, I'd give 12.", by: "Andre, Head of Design at CreativeSolutions", imgSrc: "https://i.pravatar.cc/150?img=5" },
        { testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.", by: "Jeremy, Product Manager at TimeWise", imgSrc: "https://i.pravatar.cc/150?img=6" },
        { testimonial: "Took some convincing, but now that we're working together, we're never going back.", by: "Pam, Marketing Director at BrandBuilders", imgSrc: "https://i.pravatar.cc/150?img=7" },
        { testimonial: "I would be lost without the in-depth analytics design. The ROI is EASILY 100X for us.", by: "Daniel, Data Scientist at AnalyticsPro", imgSrc: "https://i.pravatar.cc/150?img=8" },
        { testimonial: "It's just the best. Period.", by: "Fernando, UX Designer at UserFirst", imgSrc: "https://i.pravatar.cc/150?img=9" },
        { testimonial: "I switched 5 years ago and never looked back.", by: "Andy, DevOps Engineer at CloudMasters", imgSrc: "https://i.pravatar.cc/150?img=10" },
        { testimonial: "I've been searching for a designer like this for YEARS. So glad I finally found one!", by: "Pete, Sales Director at RevenueRockets", imgSrc: "https://i.pravatar.cc/150?img=11" },
        { testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.", by: "Marina, HR Manager at TalentForge", imgSrc: "https://i.pravatar.cc/150?img=12" },
        { testimonial: "The customer support is unparalleled. Always there when we need them.", by: "Olivia, Customer Success Manager at ClientCare", imgSrc: "https://i.pravatar.cc/150?img=13" },
        { testimonial: "The aesthetic gains we've seen are off the charts!", by: "Raj, Operations Manager at StreamlineSolutions", imgSrc: "https://i.pravatar.cc/150?img=14" },
        { testimonial: "A game-changer for our brand identity!", by: "Lila, Workflow Specialist at ProcessPro", imgSrc: "https://i.pravatar.cc/150?img=15" },
        { testimonial: "The scalability of this design system is impressive. It grows with our business seamlessly.", by: "Trevor, Scaling Officer at GrowthGurus", imgSrc: "https://i.pravatar.cc/150?img=16" },
        { testimonial: "I appreciate how he continually innovates. Always one step ahead.", by: "Naomi, Innovation Lead at FutureTech", imgSrc: "https://i.pravatar.cc/150?img=17" },
        { testimonial: "The ROI we've seen is incredible. It's paid for itself many times over.", by: "Victor, Finance Analyst at ProfitPeak", imgSrc: "https://i.pravatar.cc/150?img=18" },
        { testimonial: "The designs are so robust, yet easy to use. It's the perfect balance.", by: "Yuki, Tech Lead at BalancedTech", imgSrc: "https://i.pravatar.cc/150?img=19" },
        { testimonial: "We've tried many designers, but Yash stands out in terms of reliability and performance.", by: "Zoe, Performance Manager at ReliableSystems", imgSrc: "https://i.pravatar.cc/150?img=20" }
    ];

    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    
    if (track && prevBtn && nextBtn) {
        let cardSize = window.innerWidth >= 640 ? 365 : 290;
        const SQRT_5000 = Math.sqrt(5000);
        let list = [...testimonialsData];
        let domCards = [];

        // Initialize DOM Elements
        const initTestimonials = () => {
            try {
                track.innerHTML = '';
                domCards = [];
                list.forEach((t, index) => {
                    const card = document.createElement('div');
                    // Removed 'transition-all' for a moment to see if it causes issues on load, added explicit border
                    card.className = "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 hover-target";
                    card.innerHTML = `
                        <span class="card-fold absolute block origin-top-right rotate-45" style="right: -2px; top: 48px; width: ${SQRT_5000}px; height: 2px;"></span>
                        <img src="${t.imgSrc}" alt="Avatar" class="mb-4 h-14 w-14 rounded-full object-cover object-top border-2 border-black" style="box-shadow: 3px 3px 0px #ff4d00">
                        <h3 class="card-text text-base sm:text-xl font-medium mt-6">"${t.testimonial}"</h3>
                        <p class="card-author absolute bottom-8 left-8 right-8 mt-2 text-sm italic">- ${t.by}</p>
                    `;
                    
                    card.addEventListener('click', () => {
                        const currentPos = parseInt(card.getAttribute('data-pos'));
                        if(currentPos !== 0) handleMove(currentPos);
                    });
                    
                    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

                    track.appendChild(card);
                    domCards.push(card);
                });
                updateCards();
            } catch (err) {
                track.innerHTML = `<div style="color:red; font-size:20px; z-index:99999; position:relative; padding: 20px; background:white; border: 2px solid red;">ERROR init: ${err.message}</div>`;
            }
        };

        const updateCards = () => {
            try {
                domCards.forEach((card, index) => {
                    const position = list.length % 2 
                        ? index - Math.floor(list.length / 2) 
                        : index - list.length / 2;
                    
                    card.setAttribute('data-pos', position);
                    const isCenter = position === 0;

                    if (isCenter) {
                        card.classList.add('z-10', 'bg-[#ff4d00]', 'text-white', 'border-[#ff4d00]');
                        card.classList.remove('z-0', 'bg-white', 'text-black', 'border-black/10', 'hover:border-[#ff4d00]/50', 'bg-black', 'border-black');
                        card.style.boxShadow = "none";
                        card.querySelector('.card-fold').classList.add('bg-black');
                        card.querySelector('.card-fold').classList.remove('bg-black/10');
                        card.querySelector('.card-text').classList.add('text-white');
                        card.querySelector('.card-text').classList.remove('text-black');
                        card.querySelector('.card-author').classList.add('text-white/80');
                        card.querySelector('.card-author').classList.remove('text-black/60');
                        card.querySelector('img').style.boxShadow = "none";
                    } else {
                        card.classList.add('z-0', 'bg-white', 'text-black', 'border-black/10', 'hover:border-[#ff4d00]/50');
                        card.classList.remove('z-10', 'bg-[#ff4d00]', 'text-white', 'border-[#ff4d00]', 'bg-black', 'border-black');
                        card.style.boxShadow = "none";
                        card.querySelector('.card-fold').classList.add('bg-black/10');
                        card.querySelector('.card-fold').classList.remove('bg-black');
                        card.querySelector('.card-text').classList.add('text-black');
                        card.querySelector('.card-text').classList.remove('text-white');
                        card.querySelector('.card-author').classList.add('text-black/60');
                        card.querySelector('.card-author').classList.remove('text-white/80');
                        card.querySelector('img').style.boxShadow = "3px 3px 0px #ff4d00";
                    }

                    card.style.width = `${cardSize}px`;
                    card.style.height = `${cardSize}px`;
                    card.style.clipPath = `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`;
                    card.style.transform = `
                        translate(-50%, -50%) 
                        translateX(${(cardSize / 1.5) * position}px)
                        translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
                        rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
                    `;
                });
            } catch (err) {
                track.innerHTML = `<div style="color:red; font-size:20px; z-index:99999; position:relative; padding: 20px; background:white; border: 2px solid red;">ERROR update: ${err.message}</div>`;
            }
        };

        const handleMove = (steps) => {
            if (steps > 0) {
                for (let i = steps; i > 0; i--) {
                    domCards.push(domCards.shift());
                }
            } else {
                for (let i = steps; i < 0; i++) {
                    domCards.unshift(domCards.pop());
                }
            }
            updateCards();
        };

        prevBtn.addEventListener('click', () => handleMove(-1));
        nextBtn.addEventListener('click', () => handleMove(1));

        window.addEventListener('resize', () => {
            const matches = window.innerWidth >= 640;
            const newSize = matches ? 365 : 290;
            if(newSize !== cardSize) {
                cardSize = newSize;
                updateCards();
            }
        });

        initTestimonials();
    }
});
