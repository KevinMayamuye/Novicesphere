// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Close on link click (mobile only)
const allLinks = document.querySelectorAll('.nav-link');
allLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
        }
    });
});

// Simple counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace(/\D/g, '');
    const increment = target / speed;
    
    if (counter.innerText.includes('/')) {
        // For the 24/7 counter
        counter.innerText = '24/7';
        return;
    }
    
    if (count < target) {
        counter.innerText = '0';
        const updateCount = () => {
            const current = +counter.innerText.replace(/\D/g, '');
            const increment = target / speed;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        updateCount();
    }
});

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

const animateOnScroll = () => {
    featureCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Make navbar more visible when scrolling
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Mobile dropdown functionality
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    if (window.innerWidth < 992) {
        dropdown.addEventListener('click', function(e) {
            if (e.target === this || this.contains(e.target)) {
                const content = this.querySelector('.dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                e.stopPropagation();
            }
        });
    }
});

// Close dropdowns when clicking elsewhere
document.addEventListener('click', function() {
    if (window.innerWidth < 992) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.style.display = 'none';
        });
    }
});

// ------------------------------------------------------------------------------------Slideshow functionality
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.slideshow-nav button');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    slides[index].classList.add('active');
    navButtons[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 10000);
}

// Initialize
showSlide(0);
startSlideshow();

// Navigation controls
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(parseInt(button.getAttribute('data-index')));
        startSlideshow();
    });
});

// Pause on hover
const slideshowCard = document.querySelector('.slideshow-card');
slideshowCard.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slideshowCard.addEventListener('mouseleave', () => {
    startSlideshow();
});