document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const topNav = document.querySelector('.top-nav');
    const stickyNav = document.querySelector('.sticky-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        if (scrollTop > window.innerHeight) {
            topNav.style.display = 'none';
            stickyNav.style.display = 'block';
        } else {
            topNav.style.display = 'block';
            stickyNav.style.display = 'none';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Animated Headers
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

    // Hero Carousel
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;

        const showItem = (index) => {
            container.style.transform = `translateX(-${index * 100}%)`;
        };

        const nextItem = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        };

        const prevItem = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        };

        leftArrow.addEventListener('click', prevItem);
        rightArrow.addEventListener('click', nextItem);

        // Auto-scroll
        setInterval(nextItem, 5000);
    }
});
