// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

/*document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});*/

// Demo Screen Tabs
const screenTabs = document.querySelectorAll('.screen-tab');
const demoImages = document.querySelectorAll('.demo-image');

screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and images
        screenTabs.forEach(t => t.classList.remove('active'));
        demoImages.forEach(img => img.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding image
        const screenType = tab.getAttribute('data-screen');
        const activeImage = document.getElementById(`screen-${screenType}`);
        if (activeImage) {
            activeImage.classList.add('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in a real app, this would send to a server)
        showNotification('Thank you for your interest! Our team will contact you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log data for demo purposes
        console.log('Form submitted:', data);
    });
}

// Scroll to Contact Section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Download Brochure Function
function downloadBrochure() {
    // In a real application, this would trigger a PDF download
    showNotification('Brochure download will begin shortly...', 'info');
    
    // Simulate download delay
    setTimeout(() => {
        showNotification('Thank you for downloading our brochure! Check your downloads folder.', 'success');
    }, 1500);
    
    // For demo purposes, we'll create a simple alert
    console.log('Brochure download initiated');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class=\"notification-content\">
            <span class=\"notification-icon\">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class=\"notification-message\">${message}</span>
        </div>
        <button class=\"notification-close\" onclick=\"this.parentElement.remove()\">×</button>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00d4ff'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 16px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.5;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .step-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Floating Animation for Hero Cards
function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        card.style.animation = `floatCard ${randomDuration}s infinite ease-in-out`;
        card.style.animationDelay = `-${randomDelay}s`;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateFloatingCards();
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stats section and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Form Validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            input.style.borderColor = '';
        }
    });
});

// Pricing Card Hover Effect
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    console.log('Edu-Tech website loaded successfully!');
    
    // Add loading animation complete class
    document.body.classList.add('loaded');
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add cursor trail effect (optional enhancement)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 1024) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

//Downloads the broucher
function downloadBrochure() {
    const link = document.createElement("a");
    link.href = "images/BEHS_logo.png";
    link.download = "BEHS_logo.png";
    link.click();
}

// Print console welcome message
console.log('%c🎓 Edu-Tech - Empowering Education Through Technology', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
console.log('%cWebsite developed with modern web technologies', 'color: #ff00ff; font-size: 12px;');


