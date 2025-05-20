// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
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

// Start typing animation
type();

// Mobile Menu Functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function closeMenu() {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
}

function openMenu() {
    menuBtn.classList.add('active');
    navLinks.classList.add('active');
    body.classList.add('menu-open');
}

menuBtn.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
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

// Close menu when clicking outside
function handleOutsideClick(e) {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        closeMenu();
    }
}
document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick, { passive: true });

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
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

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll Down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll Up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    // Add scrolled class when scrolling down
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, subject, message });

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation check
animateOnScroll();

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

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
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let lastScroll = 0;

    // Handle scroll events
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
    });

    // Enhanced mobile menu functionality
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
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
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
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
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            let isValid = true;
            form.querySelectorAll('input, textarea').forEach(field => {
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
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                }, 1500);
            }
        });
    }
};

// Initialize all responsive features
document.addEventListener('DOMContentLoaded', () => {
    handleResponsiveNav();
    handleResponsiveImages();
    handleTouchDevices();
    handleScrollAnimations();
    handleResponsiveForm();
});
