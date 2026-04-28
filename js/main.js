// ===========================
// MOBILE MENU TOGGLE
// ===========================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.includes('#')) {
            const target = document.querySelector(href.split('#')[1] ? '#' + href.split('#')[1] : null);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===========================
// FAQ ACCORDION
// ===========================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would normally send to a backend service
        // For now, we'll simulate success
        console.log('Form submitted:', formData);
        
        // Show success message
        const successDiv = document.getElementById('formSuccess');
        if (successDiv) {
            successDiv.style.display = 'block';
            contactForm.style.display = 'none';
            
            // Reset after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successDiv.style.display = 'none';
            }, 5000);
        }
    });
}

// ===========================
// PRICING PLAN BUTTON HANDLERS
// ===========================

const pricingButtons = document.querySelectorAll('.pricing-card .btn, .gift-card .btn');

pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.pricing-card') || this.closest('.gift-card');
        if (card) {
            const planName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price, .gift-price');
            const priceText = price ? price.textContent : 'Unknown';
            
            // Simulate redirect or action
            alert(`Great choice! ${planName}\n${priceText}\n\nRedirecting to signup...`);
            
            // In production, this would redirect to a signup/checkout page
            // window.location.href = '/signup?plan=' + planName.toLowerCase();
        }
    });
});

// ===========================
// ACTIVE NAVIGATION HIGHLIGHT
// ===========================

function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNav);

// ===========================
// SCROLL TO TOP BEHAVIOR
// ===========================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===========================
// DYNAMIC COUNTER ANIMATION
// ===========================

function animateCounters() {
    const counters = document.querySelectorAll('.impact-number, .price');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                if (counter.textContent.includes('€')) {
                    counter.textContent = '€' + current.toFixed(0);
                } else if (counter.textContent.includes('kg')) {
                    counter.textContent = current.toFixed(0) + 'kg';
                } else if (counter.textContent.includes('L')) {
                    counter.textContent = current.toFixed(0) + 'L';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = current.toFixed(0) + '%';
                } else if (counter.textContent.includes('x')) {
                    counter.textContent = current.toFixed(0) + 'x';
                } else {
                    counter.textContent = current.toFixed(0);
                }
                requestAnimationFrame(updateCount);
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
}

// Call animation on page load
window.addEventListener('load', animateCounters);

// ===========================
// GIFT BUTTON HANDLERS
// ===========================

const giftButtons = document.querySelectorAll('.gift-card .btn');

giftButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const giftCard = this.closest('.gift-card');
        const giftName = giftCard.querySelector('h3').textContent;
        const giftPrice = giftCard.querySelector('.gift-price').textContent;
        
        alert(`Selected: ${giftName}\nPrice: ${giftPrice}\n\nThis would open a gift purchase flow.`);
    });
});

// ===========================
// LAZY LOADING IMAGES (if any)
// ===========================

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
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ===========================
// UTILITY: SCROLL POSITION PRESERVATION
// ===========================

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPos', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem('scrollPos');
    }
});

// ===========================
// ACCESSIBILITY: FOCUS MANAGEMENT
// ===========================

document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #FF8C42';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ===========================
// PERFORMANCE: DEBOUNCE SCROLL
// ===========================

let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Perform expensive operations here if needed
    }, 250);
}, false);

// ===========================
// INITIALIZATION
// ===========================

console.log('🐯 TauschTiger website loaded successfully!');
console.log('Ready to convert visitors into subscribers 🎉');
