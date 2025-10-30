// Typing animation
const texts = ['Web Developer', 'UI/UX Designer', 'Cybersecurity Expert'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Function to update hero section content
function updateHeroContent(command) {
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    
    switch(command) {
        case 'dark':
            document.body.style.backgroundColor = '#1a1a1a';
            heroLeft.style.color = '#ffffff';
            heroRight.style.color = '#ffffff';
            break;
            
        case 'light':
            document.body.style.backgroundColor = '#ffffff';
            heroLeft.style.color = '#333333';
            heroRight.style.color = '#333333';
            break;
            
        case 'gradient':
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            heroLeft.style.color = '#ffffff';
            heroRight.style.color = '#ffffff';
            break;
            
        case 'reset':
            document.body.style.backgroundColor = '';
            document.body.style.background = '';
            heroLeft.style.color = '';
            heroRight.style.color = '';
            break;
            
        default:
            console.log('Invalid command');
    }
}

// Add command listener
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '/') {
        const command = prompt('Enter command (dark/light/gradient/reset):');
        if (command) {
            updateHeroContent(command.toLowerCase());
        }
    }
});

function type() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Mobile Menu Functionality
let menuBtn, navLinks;
const body = document.body;

function closeMenu() {
    if (!menuBtn || !navLinks) return;
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    // Fallback to ensure menu hides even if CSS conflicts
    navLinks.style.right = '';
    navLinks.style.display = '';
}

function openMenu() {
    if (!menuBtn || !navLinks) return;
    menuBtn.classList.add('active');
    navLinks.classList.add('active');
    body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    // Fallback to ensure menu shows on all devices
    navLinks.style.display = 'flex';
    navLinks.style.right = '0';
}

function initMenu() {
    menuBtn = document.querySelector('.menu-btn');
    navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Keyboard support for menu button
    menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    });

    // Touch support for Android
    menuBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }, { passive: false });
    
    // Close menu when clicking a link
    const navLinkEls = document.querySelectorAll('.nav-links a');
    navLinkEls.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
        link.addEventListener('touchstart', () => {
            closeMenu();
        }, { passive: true });
    });
}

// Close menu when clicking outside
function handleOutsideClick(e) {
    if (menuBtn && navLinks && !menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        closeMenu();
    }
}
document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick, { passive: true });

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuBtn && navLinks) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        navLinks.style.right = '';
        navLinks.style.display = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navAnchors.forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else if (link.classList.contains('active')) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}, { root: null, threshold: 0.6 });

sections.forEach(sec => sectionObserver.observe(sec));

// Form submission - removed duplicate handler (handled in handleResponsiveForm)

// Removed manual scroll animation handler in favor of IntersectionObserver below

// 3D tilt effect for cards
document.querySelectorAll('.service-card, .portfolio-box, .skill').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Disable hover effects on touch devices
function updateTouchStatus() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Call on page load
updateTouchStatus();

// Add scroll-based animations for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Add floating label effect
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value) {
            field.parentElement.classList.remove('focused');
        }
    });
});

// Enhanced Responsive Navigation
const handleResponsiveNav = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScroll = 0;

    // Handle scroll events (passive)
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background change
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // Handle window resize for menu
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && menuBtn && navLinks) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }, 250);
    });
};

// Enhanced Responsive Images
const handleResponsiveImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Only set lazy if not explicitly prioritized
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }
        // Add error handling
        img.onerror = function() {
            this.src = 'placeholder.png';
            this.alt = 'Image failed to load';
        };
    });
};

// Enhanced Touch Device Support
const handleTouchDevices = () => {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects on touch devices
        const elements = document.querySelectorAll('.service-card, .portfolio-box, .skill');
        elements.forEach(element => {
            element.style.transform = 'none';
        });
    }
};

// Enhanced Scroll Animations
const handleScrollAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
};

// Enhanced Form Handling
const handleResponsiveForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check Cloudflare Turnstile if present
        const turnstileResponse = document.querySelector('input[name="cf-turnstile-response"]');
        if (turnstileResponse && !turnstileResponse.value) {
            alert('Please complete the security verification.');
            return;
        }
        
        // Get form values
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Reset form (including Turnstile)
                    form.reset();
                    // Reset Turnstile widget if present
                    if (typeof turnstile !== 'undefined' && turnstile.reset) {
                        try {
                            turnstile.reset();
                        } catch (e) {
                            // Fallback: try to remove the hidden input manually
                            const turnstileInput = document.querySelector('input[name="cf-turnstile-response"]');
                            if (turnstileInput) {
                                turnstileInput.remove();
                            }
                        }
                    }
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                }, 1500);
            }
        }
    });
};

// Initialize all responsive features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize menu functionality
    initMenu();
    
    // Start typing animation
    type();
    
    // Initialize other features
    handleResponsiveNav();
    handleResponsiveImages();
    handleTouchDevices();
    handleScrollAnimations();
    handleResponsiveForm();
});
