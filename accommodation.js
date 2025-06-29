// Sample accommodation data (in a real app, this would come from an API)
const accommodations = [
    {
        id: 1,
        name: "Greenfield Student Residence",
        type: "Private",
        campus: "University of Johannesburg",
        distance: "0.8 km",
        price: 3500,
        rating: 4.5,
        image: "Assets/accommodation1.jpg",
        description: "Modern student residence with 24/7 security, study rooms, and social areas. Single and shared rooms available.",
        amenities: ["WiFi", "Laundry", "Study Room", "Security", "Cleaning Service"]
    },
    {
        id: 2,
        name: "UJ Auckland Park Residence",
        type: "Residence",
        campus: "University of Johannesburg",
        distance: "On Campus",
        price: 2800,
        rating: 4.2,
        image: "Assets/accommodation2.jpg",
        description: "Official university residence with meal plans included. Close to all campus facilities.",
        amenities: ["WiFi", "Meal Plan", "Laundry", "24/7 Security"]
    },
    {
        id: 3,
        name: "The Student Hub",
        type: "Apartment",
        campus: "Wits University",
        distance: "1.2 km",
        price: 4200,
        rating: 4.7,
        image: "Assets/accommodation3.jpg",
        description: "Luxury student apartments with gym and swimming pool. Individual leases available.",
        amenities: ["WiFi", "Gym", "Pool", "Laundry", "Cleaning Service", "Security"]
    },
    {
        id: 4,
        name: "Pretoria Student Village",
        type: "Private",
        campus: "University of Pretoria",
        distance: "2.5 km",
        price: 3200,
        rating: 4.0,
        image: "Assets/accommodation4.jpg",
        description: "Affordable student housing with regular social events and study support.",
        amenities: ["WiFi", "Laundry", "Study Room", "Security"]
    },
    {
        id: 5,
        name: "Cape Town Student Lofts",
        type: "Apartment",
        campus: "University of Cape Town",
        distance: "1.8 km",
        price: 4800,
        rating: 4.8,
        image: "Assets/accommodation5.jpg",
        description: "Stylish loft apartments with mountain views. Perfect for students who want comfort and style.",
        amenities: ["WiFi", "Laundry", "Cleaning Service", "Security", "Study Lounge"]
    },
    {
        id: 6,
        name: "Stellenbosch Gardens",
        type: "House",
        campus: "Stellenbosch University",
        distance: "3.0 km",
        price: 2500,
        rating: 3.9,
        image: "Assets/accommodation6.jpg",
        description: "Shared houses in quiet neighborhood. Great for students who prefer a home-like environment.",
        amenities: ["WiFi", "Garden", "Parking", "Security"]
    }
];

// DOM Elements
const accommodationGrid = document.getElementById('accommodationGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const campusFilter = document.getElementById('campusFilter');
const priceFilter = document.getElementById('priceFilter');
const typeFilter = document.getElementById('typeFilter');
const sortBy = document.getElementById('sortBy');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const applicationModal = document.getElementById('applicationModal');
const closeModal = document.querySelector('.close-modal');
const applicationForm = document.getElementById('applicationForm');

// Pagination variables
let currentPage = 1;
const itemsPerPage = 4;

// Display accommodations
function displayAccommodations(data, page = 1) {
    // Clear previous results
    accommodationGrid.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Update pagination controls
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevPage.disabled = page === 1;
    nextPage.disabled = page === totalPages || totalPages === 0;
    
    // Display each accommodation
    paginatedData.forEach(accommodation => {
        const card = document.createElement('div');
        card.className = 'accommodation-card';
        card.innerHTML = `
            <div class="accommodation-image">
                <img src="${accommodation.image}" alt="${accommodation.name}">
                <div class="price-tag">R${accommodation.price}/mo</div>
            </div>
            <div class="accommodation-details">
                <h3>${accommodation.name}</h3>
                <div class="accommodation-meta">
                    <span class="type">${accommodation.type}</span>
                    <span class="rating">${'★'.repeat(Math.floor(accommodation.rating))}${'☆'.repeat(5 - Math.floor(accommodation.rating))} ${accommodation.rating}</span>
                </div>
                <div class="accommodation-location">
                    <span>${accommodation.campus}</span>
                    <span>${accommodation.distance} from campus</span>
                </div>
                <p class="description">${accommodation.description}</p>
                <div class="amenities">
                    ${accommodation.amenities.map(amenity => `<span>${amenity}</span>`).join('')}
                </div>
                <button class="btn apply-btn" data-id="${accommodation.id}">Apply Now</button>
            </div>
        `;
        accommodationGrid.appendChild(card);
    });
    
    // Add event listeners to apply buttons
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', () => {
            openApplicationModal(button.dataset.id);
        });
    });
}

// Filter and sort accommodations
function filterAndSortAccommodations() {
    let results = [...accommodations];
    
    // Search by name, campus or location
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        results = results.filter(acc => 
            acc.name.toLowerCase().includes(searchTerm) || 
            acc.campus.toLowerCase().includes(searchTerm) ||
            acc.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by campus
    if (campusFilter.value) {
        results = results.filter(acc => acc.campus === campusFilter.value);
    }
    
    // Filter by price range
    if (priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        if (priceFilter.value.endsWith('+')) {
            results = results.filter(acc => acc.price >= 8000);
        } else {
            results = results.filter(acc => acc.price >= min && acc.price <= max);
        }
    }
    
    // Filter by type
    if (typeFilter.value) {
        results = results.filter(acc => acc.type === typeFilter.value);
    }
    
    // Sort results
    switch (sortBy.value) {
        case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'distance':
            results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
            break;
        case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    // Reset to page 1 when filters change
    currentPage = 1;
    displayAccommodations(results, currentPage);
}

// Open application modal
function openApplicationModal(accommodationId) {
    const accommodation = accommodations.find(acc => acc.id === parseInt(accommodationId));
    if (accommodation) {
        document.getElementById('accommodationId').value = accommodationId;
        applicationModal.style.display = 'block';
    }
}

// Close modal
function closeModalFunc() {
    applicationModal.style.display = 'none';
}

// Event Listeners
searchButton.addEventListener('click', filterAndSortAccommodations);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterAndSortAccommodations();
});

[campusFilter, priceFilter, typeFilter, sortBy].forEach(filter => {
    filter.addEventListener('change', filterAndSortAccommodations);
});

prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndSortAccommodations();
    }
});

nextPage.addEventListener('click', () => {
    currentPage++;
    filterAndSortAccommodations();
});

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === applicationModal) {
        closeModalFunc();
    }
});

applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    const formData = {
        accommodationId: document.getElementById('accommodationId').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        studentNumber: document.getElementById('studentNumber').value,
        institution: document.getElementById('institution').value,
        moveInDate: document.getElementById('moveInDate').value,
        message: document.getElementById('message').value
    };
    
    console.log('Application submitted:', formData);
    
    // Show success message
    alert('Your application has been submitted successfully! We will contact you shortly.');
    
    // Close modal and reset form
    closeModalFunc();
    applicationForm.reset();
});

// Initial display
filterAndSortAccommodations();

// Hero Background Slideshow
const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
const heroNavButtons = document.querySelectorAll('.slideshow-nav button');
let currentHeroSlide = 0;
let heroSlideInterval;

function showHeroSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroNavButtons.forEach(btn => btn.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroNavButtons[index].classList.add('active');
    currentHeroSlide = index;
}

function nextHeroSlide() {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
}

function startHeroSlideshow() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

// Initialize slideshow
if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroSlideshow();
}

// Navigation controls
heroNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(heroSlideInterval);
        showHeroSlide(parseInt(button.getAttribute('data-index')));
        startHeroSlideshow();
    });
});

// Pause on hover
const heroSection = document.querySelector('.accommodation-hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(heroSlideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        startHeroSlideshow();
    });
}

// Header scroll effect for accommodation page
window.addEventListener('scroll', function() {
  const header = document.querySelector('.accommodation-header');
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});