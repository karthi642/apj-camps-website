// Slider functionality
class ImageSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slider-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.sliderContainer = document.querySelector('.slider-container');
        this.autoSlideInterval = null;
        
        this.init();
    }

    init() {
        // Event listeners for buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Event listeners for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Hover to stop/start auto-slide
        this.sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());

        // Start auto-slide
        this.startAutoSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        // Update active slide
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update active indicator
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            }
        });
    }

    startAutoSlide() {
        // Auto advance slide every 5 seconds
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        // Stop auto-slide on hover
        clearInterval(this.autoSlideInterval);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if it's an external link (WhatsApp)
        if (!this.href.includes('wa.me')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                closeMenu();
            }
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

function closeMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    }
});

// Animate elements on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation || 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe tech cards
document.querySelectorAll('.tech-card').forEach(card => {
    observer.observe(card);
});

// Observe insight cards
document.querySelectorAll('.insight-card').forEach(card => {
    observer.observe(card);
});

// Observe partner cards
document.querySelectorAll('.partner-card').forEach(card => {
    observer.observe(card);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    
    // Extract number from text (e.g., "10K+" -> 10)
    const match = element.textContent.match(/\d+/);
    if (!match) return;
    
    const finalNumber = parseInt(match[0]);
    const increment = finalNumber / (duration / 16);
    const suffix = element.textContent.replace(/\d+/g, '');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= finalNumber) {
            element.textContent = finalNumber + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.hasAttribute('data-animated')) {
                    animateCounter(stat, 1000);
                    stat.setAttribute('data-animated', 'true');
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const subjectInput = this.querySelector('input[placeholder="Subject"]');
        const messageInput = this.querySelector('textarea');
        
        // Simple validation
        if (nameInput.value && emailInput.value && subjectInput.value && messageInput.value) {
            // Show success message
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            }, 3000);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.apply-btn, .cta-button, .product-btn, .partner-btn, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't create ripple for external links
        if (this.href && this.href.includes('wa.me')) return;
        
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .apply-btn, .cta-button, .product-btn, .partner-btn, .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero content below slider
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const sliderContainer = document.querySelector('.slider-container');
    const scrollY = window.scrollY;
    
    if (heroContent && scrollY < sliderContainer.offsetHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Logo click - scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    logo.style.cursor = 'pointer';
}

// Lazy loading for images (when images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Console message
console.log('%cWelcome to APJ Camps!', 'color: #1e40af; font-size: 24px; font-weight: bold;');
console.log('%cBuilding leaders for tomorrow through excellence in education', 'color: #0ea5e9; font-size: 14px;');

// Smooth scroll for all browsers
document.documentElement.style.scrollBehavior = 'smooth';