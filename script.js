// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
    if (navLinks.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close on link click (mobile only)
const allLinks = document.querySelectorAll('.nav-link');
allLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
});

// Close nav if overlay is clicked
window.addEventListener('click', function(e) {
    if (document.body.classList.contains('menu-open') && e.target === document.body) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
});

// Close nav on resize to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
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

// CTA Dropdown functionality
const ctaBtn = document.getElementById('ctaBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (ctaBtn && dropdownMenu) {
    ctaBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        ctaBtn.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!ctaBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            ctaBtn.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking on a dropdown item
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            ctaBtn.classList.remove('active');
            dropdownMenu.classList.remove('active');
        });
    });
}

// Career Guidance CTA Dropdown functionality
const careerCtaBtn = document.getElementById('careerCtaBtn');
const careerDropdownMenu = document.getElementById('careerDropdownMenu');

if (careerCtaBtn && careerDropdownMenu) {
    careerCtaBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        careerCtaBtn.classList.toggle('active');
        careerDropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!careerCtaBtn.contains(e.target) && !careerDropdownMenu.contains(e.target)) {
            careerCtaBtn.classList.remove('active');
            careerDropdownMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking on a dropdown item
    const careerDropdownItems = careerDropdownMenu.querySelectorAll('.dropdown-item');
    careerDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            careerCtaBtn.classList.remove('active');
            careerDropdownMenu.classList.remove('active');
        });
    });
}

// Review Modal and Form Handling
const reviewModal = document.getElementById('reviewModal');
const addReviewBtn = document.getElementById('addReviewBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const reviewForm = document.getElementById('reviewForm');
const reviewsTrack = document.getElementById('reviewsTrack');
const starRatingInput = document.getElementById('starRatingInput');
const ratingValueInput = document.getElementById('ratingValue');

if (reviewModal && addReviewBtn && closeModalBtn && reviewForm) {
    // Star rating input logic
    starRatingInput.addEventListener('click', e => {
        if (e.target.classList.contains('star')) {
            const rating = e.target.dataset.value;
            ratingValueInput.value = rating;
            
            // Visually select stars
            const stars = [...starRatingInput.children];
            stars.forEach(star => {
                star.classList.toggle('selected', star.dataset.value <= rating);
            });
        }
    });

    addReviewBtn.addEventListener('click', () => {
        reviewModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        reviewModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == reviewModal) {
            reviewModal.style.display = 'none';
        }
    });

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('reviewerName').value;
        const school = document.getElementById('reviewerSchool').value;
        const country = document.getElementById('reviewerCountry').value;
        const reviewText = document.getElementById('reviewerText').value;
        const imageFile = document.getElementById('reviewerImage').files[0];
        const rating = ratingValueInput.value;

        // Create star rating HTML
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<span class="star ${i <= rating ? 'filled' : 'empty'}">&#9733;</span>`;
        }

        const newReviewCard = document.createElement('div');
        newReviewCard.className = 'review-card';

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;
            const flagSrc = `https://flagcdn.com/${country.toLowerCase()}.svg`;
            
            newReviewCard.innerHTML = `
                <div class="review-card-header">
                    <img src="${imgSrc}" alt="Reviewer image">
                    <div class="reviewer-info">
                        <h4>${name}</h4>
                        <span>${school} <img src="${flagSrc}" alt="${country} flag" class="country-flag"></span>
                    </div>
                </div>
                <div class="review-rating">${starsHTML}</div>
                <p class="review-body">"${reviewText}"</p>
            `;
            
            reviewsTrack.prepend(newReviewCard);
            reviewModal.style.display = 'none';
            reviewForm.reset();
             // Reset stars in form
            [...starRatingInput.children].forEach(star => star.classList.remove('selected'));
            ratingValueInput.value = 0;
        };
        
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            // Use a default image if none is uploaded
            const imgSrc = `https://i.pravatar.cc/100?u=${name}`; // Use name for a unique avatar
            const flagSrc = `https://flagcdn.com/${country.toLowerCase()}.svg`;

            newReviewCard.innerHTML = `
                <div class="review-card-header">
                    <img src="${imgSrc}" alt="Reviewer image">
                    <div class="reviewer-info">
                        <h4>${name}</h4>
                        <span>${school} <img src="${flagSrc}" alt="${country} flag" class="country-flag"></span>
                    </div>
                </div>
                <div class="review-rating">${starsHTML}</div>
                <p class="review-body">"${reviewText}"</p>
            `;
            reviewsTrack.prepend(newReviewCard);
            reviewModal.style.display = 'none';
            reviewForm.reset();
             // Reset stars in form
            [...starRatingInput.children].forEach(star => star.classList.remove('selected'));
            ratingValueInput.value = 0;
        }
    });
}

// Final CTA Dropdown
const finalCtaBtn = document.getElementById('finalCtaBtn');
const finalDropdownMenu = document.getElementById('finalDropdownMenu');

if (finalCtaBtn && finalDropdownMenu) {
    finalCtaBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        finalCtaBtn.classList.toggle('active');
        finalDropdownMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!finalCtaBtn.contains(e.target) && !finalDropdownMenu.contains(e.target)) {
            finalCtaBtn.classList.remove('active');
            finalDropdownMenu.classList.remove('active');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open items
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Applications Subheader Dropdown Logic
const applicationsMenuTrigger = document.getElementById('applicationsMenuTrigger');
const applicationsSubheader = document.getElementById('applicationsSubheader');

if (applicationsMenuTrigger && applicationsSubheader) {
    function openSubheader() {
        applicationsMenuTrigger.classList.add('active');
        applicationsSubheader.classList.add('active');
    }
    function closeSubheader() {
        applicationsMenuTrigger.classList.remove('active');
        applicationsSubheader.classList.remove('active');
    }
    applicationsMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (applicationsSubheader.classList.contains('active')) {
            closeSubheader();
        } else {
            openSubheader();
        }
    });
    // Keyboard accessibility
    applicationsMenuTrigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (applicationsSubheader.classList.contains('active')) {
                closeSubheader();
            } else {
                openSubheader();
            }
        }
        if (e.key === 'Escape') {
            closeSubheader();
        }
    });
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!applicationsMenuTrigger.contains(e.target) && !applicationsSubheader.contains(e.target)) {
            closeSubheader();
        }
    });
    // Close on Escape globally
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSubheader();
        }
    });
}

// Universal Dropdown Handler
function setupUniversalDropdowns() {
    // Handles all .cta-dropdown/.dropdown-menu pairs
    document.querySelectorAll('.cta-dropdown').forEach(dropdown => {
        const btn = dropdown.querySelector('.cta-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close all other dropdowns first
            document.querySelectorAll('.cta-btn.active').forEach(b => {
                if (b !== btn) b.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            btn.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close dropdown when clicking on a dropdown item
        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                btn.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.cta-btn.active').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => menu.classList.remove('active'));
    });
}

// Universal FAQ Accordion Handler
function setupUniversalFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function() {
            // Close other open items
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== item) openItem.classList.remove('active');
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// On DOMContentLoaded, setup universal handlers
window.addEventListener('DOMContentLoaded', function() {
    setupUniversalDropdowns();
    setupUniversalFAQ();
});