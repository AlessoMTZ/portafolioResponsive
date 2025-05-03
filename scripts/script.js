// Loading Animation
window.addEventListener('load', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1000);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Section Animation on Scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
});

// Smooth Scroll for Navigation Links
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

// Form Animation
const form = document.querySelector('form');
const formInputs = form.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to header
const headerTitle = document.querySelector('header h1');
const headerSubtitle = document.querySelector('header h3');
const headerText = headerTitle.textContent;
const subtitleText = headerSubtitle.textContent;

headerTitle.textContent = '';
headerSubtitle.textContent = '';

let i = 0;
let j = 0;

function typeWriter() {
    if (i < headerText.length) {
        headerTitle.textContent += headerText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else if (j < subtitleText.length) {
        if (j === 0) headerSubtitle.textContent = '';
        headerSubtitle.textContent += subtitleText.charAt(j);
        j++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 500);

// Language Toggle
let currentLanguage = 'en'; // Default language

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        if (currentLanguage === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-es');
        }
    });

    // Update navbar links
    const navLinks = document.querySelectorAll('.nav-link');
    const translations = {
        'about': { en: 'About Me', es: 'Sobre mí' },
        'education': { en: 'Education', es: 'Educación' },
        'skills': { en: 'Skills', es: 'Skills' },
        'projects': { en: 'Projects', es: 'Proyectos' },
        'hobbies': { en: 'Hobbies', es: 'Hobbies' },
        'contact': { en: 'Contact', es: 'Contacto' }
    };

    navLinks.forEach(link => {
        const section = link.getAttribute('href').substring(1);
        if (translations[section]) {
            link.textContent = translations[section][currentLanguage];
        }
    });

    // Update navbar brand
    document.querySelector('.navbar-brand').textContent = currentLanguage === 'en' ? 'My Portfolio' : 'Mi Portafolio';

    // Update language button label
    const languageLabel = document.getElementById('languageLabel');
    if (languageLabel) {
        languageLabel.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    }
}

// Add event listener for language toggle
document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

// Initialize language
updateLanguage();

// EmailJS Configuration con validación de entorno
const PUBLIC_KEY = EMAILJS_PUBLIC_KEY;
const SERVICE_ID = EMAILJS_SERVICE_ID;
const TEMPLATE_ID = EMAILJS_TEMPLATE_ID;

if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    console.warn('⚠️ Faltan variables de entorno para EmailJS. Verifica tu archivo config.js');
}

if (PUBLIC_KEY) {
    (function() {
        emailjs.init(PUBLIC_KEY);
    })();
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = currentLanguage === 'en' ? 'Sending...' : 'Enviando...';
        
        // Prepare template parameters
        const templateParams = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            message: document.getElementById('message').value,
            to_email: 'gastonmetzgera@gmail.com'
        };

        if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
            formStatus.innerHTML = '<div class="alert alert-danger">Error de configuración del correo. Contacta al administrador.</div>';
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        // Send email using EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function() {
                // Show success message
                formStatus.innerHTML = currentLanguage === 'en' 
                    ? '<div class="alert alert-success">Message sent successfully!</div>'
                    : '<div class="alert alert-success">¡Mensaje enviado con éxito!</div>';
                
                // Reset form
                contactForm.reset();
            })
            .catch(function(error) {
                // Show error message
                formStatus.innerHTML = currentLanguage === 'en'
                    ? '<div class="alert alert-danger">Error sending message. Please try again.</div>'
                    : '<div class="alert alert-danger">Error al enviar el mensaje. Por favor, inténtalo de nuevo.</div>';
                console.error('Error:', error);
            })
            .finally(function() {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
}
