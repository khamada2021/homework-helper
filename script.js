// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initNavScroll();
    initBackToTop();
    initFormSubmission();
    initCounterAnimation();
    initCurrentYear();
    initScrollAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
function initNavScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling down
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // Highlight active nav link based on scroll position
        highlightNavLink();
        
        lastScrollTop = scrollTop;
    });
    
    // Highlight active nav link
    function highlightNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Submission
function initFormSubmission() {
    const form = document.getElementById('requestForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const contact = document.getElementById('contact').value;
            const contactInfo = document.getElementById('contactInfo').value.trim();
            const subject = document.getElementById('subject').value;
            const deadline = document.getElementById('deadline').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !contact || !contactInfo || !subject || !deadline || !message) {
                showFormMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Validate contact info based on method
            if (contact === 'telegram') {
                if (!contactInfo.startsWith('@') && contactInfo.length < 5) {
                    showFormMessage('يرجى إدخال اسم مستخدم تيليجرام صحيح (يبدأ ب @)', 'error');
                    return;
                }
            } else if (contact === 'whatsapp' || contact === 'phone') {
                const phoneRegex = /^(05)[0-9]{8}$/;
                if (!phoneRegex.test(contactInfo)) {
                    showFormMessage('يرجى إدخال رقم هاتف صحيح (مثال: 0512345678)', 'error');
                    return;
                }
            } else if (contact === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(contactInfo)) {
                    showFormMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                    return;
                }
            }
            
            // Show loading message
            showFormMessage('جاري إرسال طلبك...', 'success');
            
            // Simulate form submission (replace with actual AJAX request)
            setTimeout(function() {
                // Success message
                showFormMessage('تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
                
                // Reset form
                form.reset();
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    function showFormMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
        }
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Animate counter
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
            
            counter.classList.add('animated');
        }
        
        // Check counters on scroll
        let animated = false;
        
        function checkCounters() {
            if (!animated && isInViewport(document.querySelector('.stats-box'))) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                animated = true;
            }
        }
        
        // Initial check
        checkCounters();
        
        // Check on scroll
        window.addEventListener('scroll', checkCounters);
    }
}

// Current Year in Footer
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Simple scroll animation for elements
    function checkScroll() {
        const elements = document.querySelectorAll('.service-card, .step, .contact-method');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial styles for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .step, .contact-method');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on scroll and load
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Initial check
    checkScroll();
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});