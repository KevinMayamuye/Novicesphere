// Package Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const standardPackages = document.getElementById('standard-packages');
    const premiumPackages = document.getElementById('premium-packages');
    const packageToggleBtn = document.getElementById('packageToggleBtn');
    const packageDropdownMenu = document.getElementById('packageDropdownMenu');

    // Toggle between Standard and Premium packages
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            
            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide appropriate packages
            if (packageType === 'standard') {
                standardPackages.style.display = 'block';
                premiumPackages.style.display = 'none';
            } else {
                standardPackages.style.display = 'none';
                premiumPackages.style.display = 'block';
            }
        });
    });

    // Package dropdown functionality
    if (packageToggleBtn && packageDropdownMenu) {
        packageToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            packageToggleBtn.classList.toggle('active');
            packageDropdownMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!packageToggleBtn.contains(e.target) && !packageDropdownMenu.contains(e.target)) {
                packageToggleBtn.classList.remove('active');
                packageDropdownMenu.classList.remove('active');
            }
        });

        // Handle dropdown item clicks
        const dropdownItems = packageDropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const packageType = this.getAttribute('data-package');
                
                // Update toggle buttons
                toggleBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-package') === packageType) {
                        btn.classList.add('active');
                    }
                });
                
                // Show appropriate packages
                if (packageType === 'standard') {
                    standardPackages.style.display = 'block';
                    premiumPackages.style.display = 'none';
                } else {
                    standardPackages.style.display = 'none';
                    premiumPackages.style.display = 'block';
                }
                
                // Close dropdown
                packageToggleBtn.classList.remove('active');
                packageDropdownMenu.classList.remove('active');
            });
        });
    }

    // FAQ Functionality
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('faq-question')) {
                const item = e.target.closest('.faq-item');
                // Close other open items
                document.querySelectorAll('.faq-item.active').forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove('active');
                });
                // Toggle current item
                item.classList.toggle('active');
            }
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

    // Schedule call buttons
    const scheduleBtns = document.querySelectorAll('.schedule-btn');
    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // You can implement a modal or redirect to a scheduling page
            alert('Schedule a free call functionality - implement your preferred scheduling solution');
        });
    });

    // Add bursary buttons
    const addonBtns = document.querySelectorAll('.addon-btn');
    addonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // You can implement a modal or redirect to bursary services
            alert('Add bursary functionality - implement your preferred bursary solution');
        });
    });

    // FAQ CTA buttons
    const faqCtaBtns = document.querySelectorAll('.faq-cta .btn');
    faqCtaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText.toLowerCase().includes('career')) {
                alert('Career advice functionality - implement your preferred solution');
            } else if (buttonText.toLowerCase().includes('apply')) {
                // Scroll to packages section
                const packagesSection = document.querySelector('.packages-section, #packages');
                if (packagesSection) {
                    packagesSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                alert('Learn more functionality - implement your preferred solution');
            }
        });
    });
}); 