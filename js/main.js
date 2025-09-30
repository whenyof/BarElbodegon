// ========================================
// MAIN JAVASCRIPT - El Bodegón de La Collada
// ========================================

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

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

// Enhanced mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCount, 1);
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
        stat.setAttribute('data-target', number);
        stat.textContent = '0' + (text.includes('+') ? '+' : '');
    });
});

// Reviews animation pause on hover
const reviewsTrack = document.querySelector('.reviews-track');
if (reviewsTrack) {
    reviewsTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    reviewsTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Preload critical images
const preloadImages = () => {
    const criticalImages = [
        'wp-content/uploads/2024/07/15.png',
        'wp-content/uploads/2024/07/cropped-Bar-El-Bodegon-2.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);
