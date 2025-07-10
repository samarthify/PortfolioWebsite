// Initialize particles.js with better error handling
document.addEventListener('DOMContentLoaded', function() {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        // Try the simple method first
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80 },
                    color: { value: "#4ac9ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#4ac9ff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out"
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
            console.log('Particles.js loaded successfully with inline config');
        } catch (error) {
            console.error('Error with inline config, trying JSON file:', error);
            // Fallback to JSON file
            particlesJS.load('particles-js', 'particles.json', function() {
                console.log('Particles.js loaded successfully from JSON');
            });
        }
    } else {
        console.error('Particles.js library not loaded');
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
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav ul');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation for hero section
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation when page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Experience timeline animations
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-section').forEach(section => {
    statsObserver.observe(section);
});

// Download resume functionality
const downloadResumeBtn = document.querySelector('.download-resume');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your resume file path here
        const resumeUrl = 'path/to/your/resume.pdf';
        
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'YourName_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Social media links functionality
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add any additional functionality here
        // For example, analytics tracking
        console.log('Social link clicked:', link.href);
    });
});

// Contact alternatives functionality
document.querySelectorAll('.alternative-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add functionality for alternative contact methods
        const type = item.querySelector('h4').textContent.toLowerCase();
        
        if (type.includes('email')) {
            window.open('mailto:your-email@gmail.com', '_blank');
        } else if (type.includes('linkedin')) {
            window.open('https://linkedin.com/in/your-profile', '_blank');
        }
    });
}); 

// Contact form handling
const contactForm = document.querySelector('.contact-form');
const feedback = document.querySelector('.form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.classList.add('loading');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Clear previous feedback
        feedback.style.display = 'none';
        feedback.textContent = '';
        feedback.className = 'form-feedback';
        
        // Validate fields
        const name = contactForm.querySelector('#entry\\.2005620554');
        const email = contactForm.querySelector('#entry\\.1045781291');
        const subject = contactForm.querySelector('#entry\\.1065046570');
        const message = contactForm.querySelector('#entry\\.839337160');
        let valid = true;
        
        // Reset error states
        [name, email, subject, message].forEach(field => {
            field.classList.remove('input-error');
        });
        
        // Validate each field
        if (!name.value.trim()) {
            valid = false;
            name.classList.add('input-error');
        }
        
        if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
            valid = false;
            email.classList.add('input-error');
        }
        
        if (!subject.value.trim()) {
            valid = false;
            subject.classList.add('input-error');
        }
        
        if (!message.value.trim()) {
            valid = false;
            message.classList.add('input-error');
        }
        
        if (!valid) {
            feedback.textContent = 'Please fill in all required fields with valid information.';
            feedback.style.display = 'block';
            feedback.classList.add('error');
            
            // Reset button
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
            return;
        }
        
        try {
            // Submit to Google Forms
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for Google Forms
            });
            
            // Since we're using no-cors, we can't read the response
            // But Google Forms will handle the submission
            feedback.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.';
            feedback.style.display = 'block';
            feedback.classList.add('success');
            contactForm.reset();
            
            // Show success animation
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            feedback.textContent = 'There was an error sending your message. Please try again later.';
            feedback.style.display = 'block';
            feedback.classList.add('error');
            
            // Reset button
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required')) {
                if (!input.value.trim()) {
                    input.classList.add('input-error');
                } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
                    input.classList.add('input-error');
                } else {
                    input.classList.remove('input-error');
                }
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('input-error')) {
                input.classList.remove('input-error');
            }
        });
    });
    
    // Add placeholder attributes for better UX
    const nameInput = contactForm.querySelector('#entry\\.2005620554');
    const emailInput = contactForm.querySelector('#entry\\.1045781291');
    const subjectInput = contactForm.querySelector('#entry\\.1065046570');
    const messageInput = contactForm.querySelector('#entry\\.839337160');
    
    if (nameInput) nameInput.setAttribute('placeholder', ' ');
    if (emailInput) emailInput.setAttribute('placeholder', ' ');
    if (subjectInput) subjectInput.setAttribute('placeholder', ' ');
    if (messageInput) messageInput.setAttribute('placeholder', ' ');
} 