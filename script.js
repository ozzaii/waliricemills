document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initializeNavbar();
        });

    // Initialize other components
    initializeContactForm();
    initializeFAQ();
    initializeFadeIn();
    initializeBackToTop();

    initializeRiceCalculator();
    initializeRecipeCategories();
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
    const container = carousel.querySelector('.carousel-container');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelector('.carousel-indicators');
    const prevBtn = carousel.querySelector('.carousel-arrow.left');
    const nextBtn = carousel.querySelector('.carousel-arrow.right');
    let currentIndex = 0;

    // Create indicators
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    function showSlide(index) {
        container.style.transform = `translateX(-${index * 100}%)`;
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        updateIndicators(index);
    }

    function updateIndicators(index) {
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }

    // Intelligent image trimming
    function adjustImagePosition(img) {
        const container = img.closest('.carousel-item');
        const containerAspect = container.offsetWidth / container.offsetHeight;
        const imgAspect = img.naturalWidth / img.naturalHeight;

        if (containerAspect > imgAspect) {
            const scale = container.offsetWidth / img.naturalWidth;
            const height = img.naturalHeight * scale;
            const topOffset = (container.offsetHeight - height) / 2;

            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.top = `${topOffset}px`;
            img.style.left = '0';
            img.style.transform = 'none';
        } else {
            const scale = container.offsetHeight / img.naturalHeight;
            const width = img.naturalWidth * scale;
            const leftOffset = (container.offsetWidth - width) / 2;

            img.style.width = 'auto';
            img.style.height = '100%';
            img.style.top = '0';
            img.style.left = `${leftOffset}px`;
            img.style.transform = 'none';
        }
    }

    // Adjust image position on window resize
    function adjustAllImages() {
        items.forEach(item => {
            const img = item.querySelector('img');
            adjustImagePosition(img);
        });
    }

    window.addEventListener('resize', adjustAllImages);
    window.addEventListener('load', adjustAllImages);

    // Initialize the first slide
    showSlide(currentIndex);
    adjustAllImages();
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
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
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

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initializeRiceCalculator() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calculatorForms = document.querySelectorAll('.calculator-form');
    const personalForm = document.getElementById('personalRiceCalculatorForm');
    const bulkForm = document.getElementById('bulkRiceCalculatorForm');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calculatorForms.forEach(form => {
                form.style.display = form.id === `${btn.dataset.tab}-calculator` ? 'block' : 'none';
            });
        });
    });

    personalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const people = document.getElementById('numberOfPeople').value;
        const mealType = document.getElementById('mealType').value;
        const riceType = document.getElementById('riceType').value;
        const result = calculatePersonalRice(people, mealType, riceType);
        displayPersonalResult(result);
    });

    bulkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const eventType = document.getElementById('eventType').value;
        const guestCount = document.getElementById('guestCount').value;
        const riceType = document.getElementById('bulkRiceType').value;
        const result = calculateBulkRice(eventType, guestCount, riceType);
        displayBulkResult(result);
    });
}

function calculatePersonalRice(people, mealType, riceType) {
    const baseServing = mealType === 'main' ? 75 : 50; // grams per person
    let totalGrams = people * baseServing;
    
    if (riceType === 'brown') totalGrams *= 1.2; // Brown rice requires more
    
    const cups = (totalGrams / 180).toFixed(2); // 1 cup ≈ 180g of uncooked rice
    return { grams: totalGrams, cups: cups };
}

function calculateBulkRice(eventType, guestCount, riceType) {
    let baseServing;
    switch(eventType) {
        case 'wedding': baseServing = 100; break;
        case 'corporate': baseServing = 80; break;
        case 'restaurant': baseServing = 90; break;
        default: baseServing = 85;
    }
    
    let totalKilos = (guestCount * baseServing) / 1000; // Convert to kilos
    
    if (riceType === 'parboiled') totalKilos *= 0.9; // Parboiled rice expands more
    
    return { kilos: totalKilos.toFixed(2) };
}

function displayPersonalResult(result) {
    const resultDiv = document.getElementById('personalCalculatorResult');
    resultDiv.innerHTML = `
        <p><i class="fas fa-check-circle"></i> You need approximately:</p>
        <p><strong>${result.grams} grams</strong> or <strong>${result.cups} cups</strong> of uncooked rice.</p>
    `;
}

function displayBulkResult(result) {
    const resultDiv = document.getElementById('bulkCalculatorResult');
    resultDiv.innerHTML = `
        <p><i class="fas fa-check-circle"></i> For your event, you'll need approximately:</p>
        <p><strong>${result.kilos} kilograms</strong> of uncooked rice.</p>
        <p><i class="fas fa-info-circle"></i> We recommend contacting us for a personalized quote for bulk orders.</p>
    `;
}

function initializeRecipeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            recipeCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeHeroCarousel);

