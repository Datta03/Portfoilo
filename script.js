/* ===========================
   QA Portfolio — script.js
   =========================== */

'use strict';

// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function getStoredTheme() {
  return localStorage.getItem('portfolio-theme') || 'dark';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// Apply on load
applyTheme(getStoredTheme());

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

// ===========================
// Mobile Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen.toString());
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ===========================
// Smooth Scroll for all anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ===========================
// Scroll Reveal Animation
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// Skill Bar Animation
// ===========================
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      // Small delay for visual effect
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, {
  threshold: 0.3
});

skillBars.forEach(bar => skillObserver.observe(bar));

// ===========================
// Typing Animation (Hero)
// ===========================
const typedTextEl = document.getElementById('typedText');
const words = ['quality', 'reliability', 'excellence', 'confidence', 'precision'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  if (!typedTextEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  typingTimeout = setTimeout(typeEffect, delay);
}

// Start typing after a short delay
setTimeout(typeEffect, 1200);

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formSubmit = document.getElementById('formSubmit');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
  input.style.borderColor = '#ef4444';
  // Remove existing error
  const existing = input.parentElement.querySelector('.field-error');
  if (existing) existing.remove();
  const error = document.createElement('p');
  error.className = 'field-error';
  error.style.cssText = 'color:#ef4444; font-size:0.78rem; margin-top:4px;';
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function clearFieldError(input) {
  input.style.borderColor = '';
  const error = input.parentElement.querySelector('.field-error');
  if (error) error.remove();
}

// Live validation
contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
  field.addEventListener('input', () => clearFieldError(field));
  field.addEventListener('blur', () => clearFieldError(field));
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  if (!firstName.value.trim()) {
    showFieldError(firstName, 'First name is required.');
    isValid = false;
  }
  if (!lastName.value.trim()) {
    showFieldError(lastName, 'Last name is required.');
    isValid = false;
  }
  if (!email.value.trim() || !validateEmail(email.value)) {
    showFieldError(email, 'Please enter a valid email address.');
    isValid = false;
  }
  if (!subject.value) {
    showFieldError(subject, 'Please select a subject.');
    isValid = false;
  }
  if (!message.value.trim() || message.value.trim().length < 10) {
    showFieldError(message, 'Message must be at least 10 characters.');
    isValid = false;
  }

  if (!isValid) return;

  // Simulate form submission
  formSubmit.textContent = 'Sending...';
  formSubmit.disabled = true;
  formSubmit.style.opacity = '0.7';

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    formSubmit.textContent = 'Send Message 🚀';
    formSubmit.disabled = false;
    formSubmit.style.opacity = '';

    // Hide success after 6 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 6000);
  }, 1200);
});

// ===========================
// Hero Parallax (subtle)
// ===========================
const heroSection = document.querySelector('.hero');
const heroGrid = document.querySelector('.hero-grid');

if (heroGrid) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ===========================
// Tool Card Hover Tilt Effect
// ===========================
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===========================
// Keyboard Accessibility
// ===========================
document.addEventListener('keydown', (e) => {
  // Close mobile nav with Escape
  if (e.key === 'Escape') {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ===========================
// Prefers Reduced Motion
// ===========================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable typing animation
  clearTimeout(typingTimeout);
  if (typedTextEl) typedTextEl.textContent = 'quality';

  // Instantly show all reveal elements
  revealElements.forEach(el => el.classList.add('visible'));

  // Instantly fill skill bars
  skillBars.forEach(bar => {
    bar.style.width = bar.getAttribute('data-width') + '%';
    bar.style.transition = 'none';
  });
}

console.log('%c🧪 QA Portfolio — Built with precision!', 'color: #2563eb; font-size: 14px; font-weight: bold;');
