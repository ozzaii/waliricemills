document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initializeNavbar();
        });

    // Initialize other components
    initializeHeroCarousel();
    initializeAnimatedHeaders();
    initializeContactForm();
    initializeFAQ();

    // Add this to your existing script.js file
    initializeParallax();
    initializeFadeIn();
    initializeCustomCursor();
    initializeDarkMode();
    initializeBackToTop();
});

function initializeNavbar() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-links li');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        // Toggle between hamburger and close icon
        menuToggle.textContent = mobileMenu.classList.contains('show') ? '✕' : '☰';
        navLinks.forEach((link, index) => {
            if (mobileMenu.classList.contains('show')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuToggle.textContent = '☰'; // Reset to hamburger icon
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initializeHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;
        let startX, moveX;
        let isSwiping = false;

        function showItem(index) {
            container.style.transform = `translateX(-${index * 100}%)`;
        }

        function nextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }

        function prevItem() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        }

        leftArrow.addEventListener('click', prevItem);
        rightArrow.addEventListener('click', nextItem);

        // Touch events for mobile swipe
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            moveX = e.touches[0].clientX;
            const diff = startX - moveX;
            if (Math.abs(diff) > 50) { // Threshold for swipe
                if (diff > 0) {
                    nextItem();
                } else {
                    prevItem();
                }
                isSwiping = false;
            }
        });

        container.addEventListener('touchend', () => {
            isSwiping = false;
        });

        // Auto-scroll
        setInterval(nextItem, 5000);

        // Show arrows on touch or click for mobile devices
        if ('ontouchstart' in window) {
            const heroSection = carousel.closest('.hero-section');
            heroSection.addEventListener('touchstart', showArrows);
            heroSection.addEventListener('click', showArrows);
        }

        function showArrows() {
            const heroSection = carousel.closest('.hero-section');
            heroSection.classList.add('arrows-visible');
            setTimeout(() => {
                heroSection.classList.remove('arrows-visible');
            }, 3000);
        }
    }
}

function initializeAnimatedHeaders() {
    const animateHeaders = () => {
        const headers = document.querySelectorAll('.animate-header');
        headers.forEach(header => {
            const headerTop = header.getBoundingClientRect().top;
            const headerBottom = header.getBoundingClientRect().bottom;
            if (headerTop < window.innerHeight && headerBottom > 0) {
                header.classList.add('animate');
            } else {
                header.classList.remove('animate');
            }
        });
    };

    window.addEventListener('scroll', animateHeaders);
    animateHeaders(); // Run once on load
}

function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

function initializeParallax() {
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach(section => {
        section.style.backgroundImage = `url('${section.dataset.background}')`;
    });
}

function initializeFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.remove('visible');
                entry.target.classList.add('hidden');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.classList.add('hidden');
        observer.observe(element);
    });
}

function initializeCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌓';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
