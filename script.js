// ===============================
// Smooth Scrolling & Navigation
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded - Initializing...');
    
    // Initialize theme from localStorage - must be first
    initializeTheme();
    
    // Setup theme toggle listeners
    setupThemeToggleListeners();
    
    // Initialize scroll progress bar
    initializeScrollProgress();
    
    // Initialize particles and typing effect
    createFloatingParticles();
    typeWriter();
    
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight effect to project cards
                if (targetId.startsWith('#project-')) {
                    highlightProjectCard(targetElement);
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-lg)';
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        
        // Update scroll progress
        updateScrollProgress();
    });

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ===============================
// Highlight Project Card Effect
// ===============================
function highlightProjectCard(element) {
    // Add highlight animation
    element.style.animation = 'highlightPulse 2s ease-out';
    
    // Remove animation after it completes
    setTimeout(() => {
        element.style.animation = '';
    }, 2000);
}

// Add CSS animation for highlight effect
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes highlightPulse {
        0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            transform: scale(1);
        }
        25% {
            box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
            transform: scale(1.02);
        }
        50% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            transform: scale(1);
        }
        75% {
            box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
            transform: scale(1.02);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            transform: scale(1);
        }
    }
`;
document.head.appendChild(highlightStyle);

// ===============================
// Scroll Progress Bar
// ===============================
function initializeScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// ===============================
// Dark/Light Theme Toggle
// ===============================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme immediately
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function setupThemeToggleListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const navThemeToggle = document.getElementById('navThemeToggle');
    
    console.log('=== THEME TOGGLE SETUP ===');
    console.log('themeToggle element:', themeToggle);
    console.log('navThemeToggle element:', navThemeToggle);
    
    if (!themeToggle) {
        console.error('ERROR: themeToggle button not found!');
    }
    if (!navThemeToggle) {
        console.error('ERROR: navThemeToggle button not found!');
    }
    
    // Add event listeners for both toggle buttons
    if (themeToggle) {
        // Remove any existing onclick first
        themeToggle.onclick = null;
        
        themeToggle.onclick = function(e) {
            console.log('=== THEME TOGGLE CLICKED ===');
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
            return false;
        };
        
        console.log('themeToggle onclick attached:', themeToggle.onclick !== null);
    }
    
    if (navThemeToggle) {
        // Remove any existing onclick first
        navThemeToggle.onclick = null;
        
        navThemeToggle.onclick = function(e) {
            console.log('=== NAV THEME TOGGLE CLICKED ===');
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
            return false;
        };
        
        console.log('navThemeToggle onclick attached:', navThemeToggle.onclick !== null);
    }
    
    console.log('=== SETUP COMPLETE ===');
}

function toggleTheme() {
    console.log('=== TOGGLE THEME FUNCTION CALLED ===');
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    console.log('Current theme:', currentTheme);
    console.log('New theme:', newTheme);
    
    // Add transition class for smooth theme change
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    console.log('Theme updated to:', newTheme);
    
    // Add visual feedback
    createThemeChangeEffect();
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const navThemeToggle = document.getElementById('navThemeToggle');
    const icon = theme === 'light' ? 'fa-moon' : 'fa-sun';
    
    if (themeToggle) {
        const iconElement = themeToggle.querySelector('i');
        if (iconElement) {
            iconElement.className = `fas ${icon}`;
        } else {
            themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        }
    }
    if (navThemeToggle) {
        const iconElement = navThemeToggle.querySelector('i');
        if (iconElement) {
            iconElement.className = `fas ${icon}`;
        } else {
            navThemeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        }
    }
}

function createThemeChangeEffect() {
    // Create ripple effect on theme change
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.3;
        pointer-events: none;
        z-index: 10000;
        animation: ripple 0.6s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(200);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===============================
// Intersection Observer for Animations
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    const animateElements = document.querySelectorAll('.toc-card, .project-detailed, .value-card, .tech-card, .testimonial-card, .aspiration-card, .leadership-item, .ethics-card, .lesson-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add entrance animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ===============================
// Parallax Effect on Cover Section
// ===============================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const coverSection = document.querySelector('.cover-section');
        
        if (coverSection && scrolled < window.innerHeight) {
            coverSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

initParallax();

// ===============================
// Dynamic Card Tilt Effect
// ===============================
function initCardTilt() {
    const cards = document.querySelectorAll('.toc-card, .tech-card, .value-card, .testimonial-card, .aspiration-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize after page load
window.addEventListener('load', () => {
    setTimeout(initCardTilt, 500);
});

// ===============================
// Dynamic Background Gradient on Cards
// ===============================
function initDynamicGradient() {
    const projectCards = document.querySelectorAll('.project-detailed');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    ${getComputedStyle(document.documentElement).getPropertyValue('--light-bg').trim()},
                    ${getComputedStyle(document.documentElement).getPropertyValue('--white').trim()}
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                card.style.background = '#1e293b';
            } else {
                card.style.background = '#ffffff';
            }
        });
    });
}

window.addEventListener('load', () => {
    setTimeout(initDynamicGradient, 500);
});

// ===============================
// Magnetic Button Effect for Theme Toggle
// ===============================
function initMagneticEffect() {
    const buttons = document.querySelectorAll('.theme-toggle, .nav-theme-toggle');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

window.addEventListener('load', initMagneticEffect);

// ===============================
// Typing Effect for Cover Title (Optional)
// ===============================
function createTypingEffect() {
    const titleElement = document.querySelector('.cover-title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        }
    }
    
    // Uncomment to enable typing effect
    // setTimeout(typeChar, 500);
}

// createTypingEffect();

// ===============================
// Skill Bar Animation
// ===============================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-progress');
            if (skillBar) {
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

window.addEventListener('load', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});

// ===============================
// Scroll to Top Button (Optional)
// ===============================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===============================
// Stats Counter Animation
// ===============================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const targetText = statNumber.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                if (!isNaN(target)) {
                    statNumber.classList.add('animated');
                    statNumber.textContent = '0';
                    animateCounter(statNumber, target);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ===============================
// Print/Download Resume Functionality
// ===============================
function setupResumeDownload() {
    const downloadBtn = document.querySelector('.resume-download .btn-primary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can replace this with actual PDF download link
            alert('To download the full resume, please add your PDF file link in the HTML.');
            // window.open('path/to/your/resume.pdf', '_blank');
        });
    }
}

setupResumeDownload();

// ===============================
// Testimonials Auto-rotation (Optional)
// ===============================
function setupTestimonialRotation() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;
    const rotationInterval = 5000; // 5 seconds

    function highlightTestimonial(index) {
        testimonials.forEach((card, i) => {
            if (i === index) {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = 'var(--shadow-xl)';
                card.style.borderColor = 'var(--primary-color)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'var(--shadow-md)';
                card.style.borderColor = 'transparent';
            }
        });
    }

    // Uncomment below to enable auto-rotation
    /*
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        highlightTestimonial(currentIndex);
    }, rotationInterval);
    */
}

setupTestimonialRotation();

// ===============================
// Copy Email to Clipboard
// ===============================
function setupEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied to clipboard!');
            });
        });
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark-bg);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

setupEmailCopy();

// ===============================
// Loading Screen (Optional)
// ===============================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================
// Floating Particles Animation
// ===============================
function createFloatingParticles() {
    const coverSection = document.querySelector('.cover-section');
    if (!coverSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    // Create 50 floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${left}%;
            bottom: -10px;
            animation: floatUp ${animationDuration}s linear ${animationDelay}s infinite;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    coverSection.insertBefore(particlesContainer, coverSection.firstChild);
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ===============================
// Text Typing Effect for Cover Title
// ===============================
function typeWriter() {
    const titleElement = document.querySelector('.cover-title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid rgba(255, 255, 255, 0.7)';
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 500);
        }
    }
    
    setTimeout(type, 500);
}

// ===============================
// Console Message
// ===============================
console.log('%c👋 Welcome to Bhavsar Harsh\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #64748b;');
console.log('%cGitHub: https://github.com/Harsh15505', 'font-size: 12px; color: #10b981;');
