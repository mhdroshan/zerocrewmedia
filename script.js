document.addEventListener("DOMContentLoaded", () => {
    
    // Prevent flash of unstyled content
    document.body.classList.add('loaded');

    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    // 2. Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic Navigation Background based on scroll
    ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {className: 'navbar-scrolled', targets: '.hero-nav'}
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Hero Animations - 2026 Kinetic Reveal
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.slide-up-1', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
    .fromTo('.kinetic-line', 
        { y: '120%' }, 
        { y: '0%', duration: 1.2, stagger: 0.15, ease: 'expo.out' }, '-=0.6')
    .fromTo('.slide-up-3', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.8')
    .fromTo('.slide-up-4', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .fromTo('.hero-glass-container', 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2')
    .fromTo('.scroll-indicator', 
        { opacity: 0 }, 
        { opacity: 0.5, duration: 1, ease: 'power2.inOut' }, '-=0.5');

    // Floating cards mouse reaction
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.card-1', { x: xPos * 1.5, y: yPos * 1.5, duration: 2, ease: 'power2.out' });
        gsap.to('.card-2', { x: -xPos * 2, y: -yPos * 2, duration: 2, ease: 'power2.out' });
        gsap.to('.card-3', { x: xPos * 0.8, y: -yPos * 1.2, duration: 2, ease: 'power2.out' });
    });

    // Hero Parallax Background
    gsap.to('#hero-bg-interactive', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Section Headers
    gsap.fromTo('.header-trigger', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#showcase',
                start: 'top 80%',
            }
        }
    );

    gsap.fromTo('.header-trigger-2', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#services',
                start: 'top 80%',
            }
        }
    );

    // Service Cards Stagger
    gsap.fromTo('.service-card',
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#services',
                start: 'top 70%'
            }
        }
    );

    // Form Fades
    gsap.fromTo('.form-fade',
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 75%'
            }
        }
    );

    // Contact Parallax
    gsap.to('.contact-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
        }
    });

    // 3. Reels Showcase Animation
    setTimeout(() => {
        // Setup initial GSAP reveals for reels items
        gsap.fromTo('.reels-item',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.reels-grid',
                    start: 'top 85%'
                }
            }
        );
    }, 100);

    // 4. Video Controls & Intersection Observer
    const videoObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Play when 50% in view
    };

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src && !video.getAttribute('src')) {
                    video.src = video.dataset.src;
                    video.load();
                    
                    const card = video.closest('.reels-card');
                    if (card) {
                        const skeleton = card.querySelector('.video-skeleton');
                        video.addEventListener('loadeddata', () => {
                            if (skeleton) skeleton.classList.add('loaded');
                        }, { once: true });
                    }
                    observer.unobserve(video);
                }
            }
        });
    }, { rootMargin: '300px 0px' });

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const card = video.closest('.reels-card');
            if (!card) return;
            
            const isManuallyPaused = card.dataset.manuallyPaused === 'true';

            if (entry.isIntersecting) {
                if (!isManuallyPaused) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            card.classList.remove('is-paused');
                            updatePlayPauseIcon(card, false);
                        }).catch(e => {
                            // Autoplay prevented by browser
                            card.classList.add('is-paused');
                            updatePlayPauseIcon(card, true);
                        });
                    }
                }
            } else {
                video.pause();
                card.classList.add('is-paused');
                updatePlayPauseIcon(card, true);
            }
        });
    }, videoObserverOptions);

    function updatePlayPauseIcon(card, isPaused) {
        const playIcon = card.querySelector('.v-icon-play');
        const pauseIcon = card.querySelector('.v-icon-pause');
        if (playIcon && pauseIcon) {
            if (isPaused) {
                playIcon.classList.remove('v-hidden');
                pauseIcon.classList.add('v-hidden');
            } else {
                playIcon.classList.add('v-hidden');
                pauseIcon.classList.remove('v-hidden');
            }
        }
    }

    function updateMuteIcon(card, isMuted) {
        const mutedIcon = card.querySelector('.v-icon-muted');
        const unmutedIcon = card.querySelector('.v-icon-unmuted');
        if (mutedIcon && unmutedIcon) {
            if (isMuted) {
                mutedIcon.classList.remove('v-hidden');
                unmutedIcon.classList.add('v-hidden');
            } else {
                mutedIcon.classList.add('v-hidden');
                unmutedIcon.classList.remove('v-hidden');
            }
        }
    }

    const reelsCardsArr = document.querySelectorAll('.reels-card');
    reelsCardsArr.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        // Remove autoplay to avoid all videos playing simultaneously on load
        video.removeAttribute('autoplay');
        card.classList.add('is-paused'); // Initial visual state

        // Inject UI
        const controlsHTML = `
            <div class="video-controls-overlay">
                <button class="v-btn play-pause-btn" aria-label="Play/Pause">
                    <svg class="v-icon v-icon-play large-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg class="v-icon v-icon-pause large-icon v-hidden" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
            </div>
            <div class="video-sound-control">
                <button class="v-btn mute-btn" aria-label="Mute/Unmute">
                    <svg class="v-icon v-icon-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    <svg class="v-icon v-icon-unmuted v-hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                </button>
            </div>
        `;
        card.insertAdjacentHTML('beforeend', controlsHTML);

        // Setup Event Listeners
        const playPauseBtn = card.querySelector('.play-pause-btn');
        const muteBtn = card.querySelector('.mute-btn');

        const togglePlay = (e) => {
            if (e) e.stopPropagation();
            if (video.paused) {
                video.play();
                card.dataset.manuallyPaused = 'false';
                card.classList.remove('is-paused');
                updatePlayPauseIcon(card, false);
            } else {
                video.pause();
                card.dataset.manuallyPaused = 'true';
                card.classList.add('is-paused');
                updatePlayPauseIcon(card, true);
            }
        };

        playPauseBtn.addEventListener('click', togglePlay);
        
        // Also allow clicking anywhere on the card to toggle play/pause
        card.addEventListener('click', (e) => {
            // Prevent toggling if they clicked the mute button or its children
            if (!e.target.closest('.mute-btn') && !e.target.closest('a')) {
                togglePlay();
            }
        });

        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            updateMuteIcon(card, video.muted);
        });

        if (video.dataset.src) {
            lazyLoadObserver.observe(video);
        }
        videoObserver.observe(video);
    });

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Setup infinite marquee duplicating items natively
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    marqueeTracks.forEach(track => {
        const marqueeClone = track.innerHTML;
        track.innerHTML += marqueeClone; // Double the contents for seamless scroll
    });

    // --- Custom Cursor & Magnetic Interactions ---
    const cursor = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('custom-cursor-follower');
    const heroBlob = document.getElementById('hero-blob-interactive');

    if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        // Center blob initially
        if (heroBlob) {
            gsap.set(heroBlob, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            });
        }

        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            // Native Cursor
            cursor.style.left = `${clientX}px`;
            cursor.style.top = `${clientY}px`;
            
            // Follower uses slight delay via transform
            gsap.to(cursorFollower, {
                x: clientX,
                y: clientY,
                duration: 0.15,
                ease: 'power2.out'
            });

            // Hero Blob moves slightly with the cursor for parallax if we are at top of page
            if (heroBlob && window.scrollY < window.innerHeight) {
                const xPercent = (clientX / window.innerWidth) - 0.5;
                const yPercent = (clientY / window.innerHeight) - 0.5;
                gsap.to(heroBlob, {
                    x: (window.innerWidth / 2) + xPercent * 400,
                    y: (window.innerHeight / 2) + yPercent * 400,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });

        // Add hover effects for buttons and links
        const interactiveElements = document.querySelectorAll('a, button, input, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
                // Reset magnetic transforms if applied
                if (el.classList.contains('btn-primary') || el.classList.contains('btn-secondary')) {
                    gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
                }
            });
        });

        // Magnetic Buttons
        const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width/2;
                const y = e.clientY - rect.top - rect.height/2;
                
                gsap.to(el, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    // 3D Tilt on Reels Cards - Desktop Only
    const reelsCards = document.querySelectorAll('.reels-card');
    if (window.matchMedia("(pointer: fine)").matches) {
        reelsCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xOffset = (x - rect.width/2) / rect.width;
                const yOffset = (y - rect.height/2) / rect.height;

                gsap.to(card, {
                    rotationY: xOffset * 15,
                    rotationX: -yOffset * 15,
                    transformPerspective: 900,
                    ease: 'power1.out',
                    duration: 0.4
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'power2.out',
                    duration: 0.6
                });
            });
        });
    }
});
