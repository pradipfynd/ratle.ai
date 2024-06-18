
        function isDesktop() {
            const userAgent = navigator.userAgent;
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return !mobileRegex.test(userAgent);
        }

        document.addEventListener('DOMContentLoaded', function () {
            if (isDesktop()) {
                // Smooth scrolling and synchronized video playback for desktop
                try {
                    const lenis = new Lenis();

                    function raf(time) {
                        lenis.raf(time);
                        requestAnimationFrame(raf);
                    }

                    requestAnimationFrame(raf);

                    gsap.registerPlugin(ScrollTrigger);

                    lenis.on('scroll', (e) => {
                        ScrollTrigger.update();
                    });

                    gsap.ticker.add((time) => {
                        lenis.raf(time * 1000);
                    });

                    gsap.ticker.lagSmoothing(33.33, 0.1);

                    const video = document.getElementById('hero-video');
                    const heroSection = document.getElementById('hero-section');

                    video.addEventListener('loadedmetadata', () => {
                        const maxDuration = 34; // Maximum duration to play the video
                        const viewportHeight = window.innerHeight; // Height of the viewport

                        // Set the height of the hero section dynamically
                        heroSection.style.height = '14000px';

                        function handleScroll() {
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            const scrollHeight = parseFloat(heroSection.style.height);
                            const progress = scrollTop / (scrollHeight - viewportHeight);
                            video.currentTime = progress * maxDuration;
                        }

                        window.addEventListener('scroll', handleScroll);
                    });
                } catch (error) {
                    console.error('Error initializing Lenis or GSAP:', error);
                }
            } else {
                // Autoplay video for mobile and tablet devices
                const video = document.getElementById('hero-video');
                video.setAttribute('autoplay', '');
                video.setAttribute('playsinline', '');
            }
        });

