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
    const carousels = document.querySelectorAll('.hero-carousel');

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;

        function showItem(index) {
            items.forEach(item => item.classList.remove('active'));
            items[index].classList.add('active');
        }

        function nextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }

        function prevItem() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        }

        leftArrow.addEventListener('click', () => {
            prevItem();
            resetInterval();
        });

        rightArrow.addEventListener('click', () => {
            nextItem();
            resetInterval();
        });

        // Auto-scroll
        let intervalId = setInterval(nextItem, 5000);

        // Pause auto-scroll on hover
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', () => intervalId = setInterval(nextItem, 5000));

        // Reset interval when user interacts
        function resetInterval() {
            clearInterval(intervalId);
            intervalId = setInterval(nextItem, 5000);
        }

        // Ensure images are fully loaded before displaying
        items.forEach(item => {
            const img = item.querySelector('img');
            img.addEventListener('load', () => {
                // Optionally, perform any adjustments if needed
            });
        });

        // Initial display
        showItem(currentIndex);

        // Adjust images on window resize if necessary
        window.addEventListener('resize', () => {
            // Implement any dynamic adjustments if required
        });
    });
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

// Dummy calculation functions (implement your own logic)
function calculatePersonalRice(people, mealType, riceType) {
    // Example calculation
    const perPerson = mealType === 'standard' ? 0.5 : 0.75; // kg per person
    return {
        kilos: (people * perPerson).toFixed(2)
    };
}

function displayPersonalResult(result) {
    const resultDiv = document.getElementById('personalCalculatorResult');
    resultDiv.innerHTML = `
        <p><i class="fas fa-check-circle"></i> For your meal, you'll need approximately:</p>
        <p><strong>${result.kilos} kilograms</strong> of uncooked rice.</p>
    `;
}

function calculateBulkRice(eventType, guestCount, riceType) {
    // Example calculation
    const perGuest = 0.6; // kg per guest
    return {
        kilos: (guestCount * perGuest).toFixed(2)
    };
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
