// ========================================
// OPTIMIZED MAIN JAVASCRIPT - El Bodegón de La Collada
// Performance optimized for 90+ PageSpeed score
// ========================================

// Initialize AOS with performance optimizations
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
}

// Throttled scroll handler for better performance
let scrollTimeout;
const handleScroll = () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = requestAnimationFrame(() => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
};

// Use passive event listeners for better performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Smart navigation for section links
document.querySelectorAll('a[data-section-link]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionName = this.getAttribute('data-section-link');
        const currentPage = window.location.pathname.split('/').pop();
        
        // If we're on the main page (index.html or just /), scroll to section
        if (currentPage === 'index.html' || currentPage === '' || currentPage === 'barelbodegon.es') {
            const target = document.querySelector(`#${sectionName}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // If we're on another page, redirect to the full page
            window.location.href = `${sectionName}.html`;
        }
    });
});

// Smooth scrolling for regular anchor links
document.querySelectorAll('a[href^="#"]:not([data-section-link])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced mobile menu toggle with performance optimizations
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Optimized intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Optimized parallax effect with requestAnimationFrame
let parallaxFrame;
const handleParallax = () => {
    if (parallaxFrame) {
        cancelAnimationFrame(parallaxFrame);
    }
    
    parallaxFrame = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
};

// Only enable parallax on desktop and if user hasn't requested reduced motion
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', handleParallax, { passive: true });
}

// Optimized counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!target) return;
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('+') ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };

        updateCount();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Set data-target attributes for counters
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (number) {
            stat.setAttribute('data-target', number);
            stat.textContent = '0' + (text.includes('+') ? '+' : '');
        }
    });
});

// Reviews animation pause on hover with performance optimization
const reviewsTrack = document.querySelector('.reviews-track');
if (reviewsTrack) {
    let isHovered = false;
    
    reviewsTrack.addEventListener('mouseenter', function() {
        isHovered = true;
        this.style.animationPlayState = 'paused';
    });
    
    reviewsTrack.addEventListener('mouseleave', function() {
        isHovered = false;
        this.style.animationPlayState = 'running';
    });
}

// Optimized image lazy loading
const lazyLoadImages = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
};

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalResources = [
        'css/main.css',
        'css/components.css',
        'css/responsive.css'
    ];
    
    criticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
};

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalResources);

// Performance monitoring
const performanceObserver = () => {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
                if (entry.entryType === 'layout-shift') {
                    if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                }
            }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
};

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    performanceObserver();
}

// Service Worker registration for caching (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Optimize font loading
const optimizeFonts = () => {
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1rem Inter'),
            document.fonts.load('700 1.8rem Playfair Display'),
            document.fonts.load('600 2rem Dancing Script')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
};

// Initialize font optimization
document.addEventListener('DOMContentLoaded', optimizeFonts);

// Cleanup function for better memory management
const cleanup = () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    if (parallaxFrame) {
        cancelAnimationFrame(parallaxFrame);
    }
};

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Export functions for testing (if in module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleScroll,
        animateCounters,
        lazyLoadImages,
        cleanup
    };
}
