document.addEventListener('DOMContentLoaded', () => {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initializeNavbar();
        });

    function initializeNavbar() {
        const topNav = document.querySelector('.top-nav');
        const stickyNav = document.querySelector('.sticky-nav');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = stickyNav.querySelector('.nav-links');

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Sticky header and hide/show on scroll
        let lastScrollTop = 0;
        let scrollThreshold = 100; // Adjust this value as needed

        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Show/hide top nav
            if (currentScroll <= scrollThreshold) {
                topNav.style.opacity = 1;
                stickyNav.style.display = 'none';
            } else {
                topNav.style.opacity = 0;
                stickyNav.style.display = 'block';
            }

            // Show/hide sticky nav
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down and past threshold
                stickyNav.style.top = `-${stickyNav.offsetHeight}px`;
            } else {
                // Scrolling up or above threshold
                stickyNav.style.top = '0';
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
        }, false);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero carousel
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;

        function showItem(index) {
            container.style.transform = `translateX(-${index * 100}%)`;
        }

        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        });

        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        });
    }

    // Animate headers on scroll
    const animatedHeaders = document.querySelectorAll('.animate-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedHeaders.forEach(header => observer.observe(header));

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // FAQ Accordion (if present on the page)
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
});
