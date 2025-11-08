// ===================================
// Navigation & Scroll Effects
// ===================================

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===================================
// Smooth Scrolling
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animation elements
const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
animateElements.forEach(el => observer.observe(el));

// Stagger animation for service cards and gallery items
const serviceCards = document.querySelectorAll('.service-card');
const galleryItems = document.querySelectorAll('.gallery-item');

serviceCards.forEach((card, index) => {
    const delay = card.getAttribute('data-delay') || index * 100;
    card.style.transitionDelay = `${delay}ms`;
});

galleryItems.forEach((item, index) => {
    const delay = item.getAttribute('data-delay') || index * 100;
    item.style.transitionDelay = `${delay}ms`;
});

// ===================================
// Back to Top Button
// ===================================

const backToTopButton = document.getElementById('backToTop');
const floatingBooksy = document.getElementById('floatingBooksy');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
        floatingBooksy.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
        floatingBooksy.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Dynamic Gallery Hover Effects
// ===================================

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===================================
// Service Card Parallax Effect
// ===================================

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Typing Effect for Home Section
// ===================================

const tagline = document.querySelector('.tagline');
if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 800);
}

// Smooth fade-in for home content
window.addEventListener('load', () => {
    const homeText = document.querySelector('.home-text');
    if (homeText) {
        homeText.style.opacity = '0';
        homeText.style.transform = 'translateY(30px)';
        setTimeout(() => {
            homeText.style.transition = 'opacity 1s ease, transform 1s ease';
            homeText.style.opacity = '1';
            homeText.style.transform = 'translateY(0)';
        }, 300);
    }
});

// ===================================
// Counter Animation for Experience Badge
// ===================================

const experienceBadge = document.querySelector('.badge-number');
if (experienceBadge) {
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    function animateCounter() {
        const target = 2024;
        const start = 2020;
        const duration = 2000;
        const startTime = Date.now();
        
        function update() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (target - start) * progress);
            experienceBadge.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                experienceBadge.textContent = 'EST';
            }
        }
        
        update();
    }
    
    badgeObserver.observe(experienceBadge);
}

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Create cursor trail circles if you want to add them
function createCursorTrail() {
    const colors = ['#4A2C2A', '#8B4513', '#D4AF37'];
    
    for (let i = 0; i < 10; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            background-color: ${colors[i % colors.length]};
            opacity: ${1 - i * 0.1};
        `;
        document.body.appendChild(circle);
    }
}

// Uncomment to enable cursor trail
// createCursorTrail();

// ===================================
// Lazy Loading Images
// ===================================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Scroll Progress Indicator
// ===================================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #8B4513);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedSetActiveNav = debounce(setActiveNav, 10);
window.addEventListener('scroll', debouncedSetActiveNav);

// ===================================
// Console Message
// ===================================

console.log('%c110 Barbershop Website', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cCrafted with excellence | Est. 2024', 'color: #8B4513; font-size: 14px;');
console.log('%cWhere Tradition Meets Style', 'color: #4A2C2A; font-size: 12px; font-style: italic;');

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================

// Uncomment to prevent right-click on images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ===================================
// Form Validation (if you add a contact form)
// ===================================

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form validation and submission logic here
        const formData = new FormData(contactForm);
        
        // Example: Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===================================
// Mobile Touch Enhancements
// ===================================

// Improve touch interaction on mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles or behaviors
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// Easter Egg: Konami Code
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    console.log('%c🎉 You found the secret! Welcome to the VIP lounge! 🎉', 'color: #D4AF37; font-size: 20px;');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
