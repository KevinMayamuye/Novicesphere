// Bursary Applications Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bursaryPackageBtn = document.getElementById('bursaryPackageBtn');
    const bursaryPackageMenu = document.getElementById('bursaryPackageMenu');

    // Bursary package dropdown functionality
    if (bursaryPackageBtn && bursaryPackageMenu) {
        bursaryPackageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            bursaryPackageBtn.classList.toggle('active');
            bursaryPackageMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!bursaryPackageBtn.contains(e.target) && !bursaryPackageMenu.contains(e.target)) {
                bursaryPackageBtn.classList.remove('active');
                bursaryPackageMenu.classList.remove('active');
            }
        });

        // Handle dropdown item clicks
        const dropdownItems = bursaryPackageMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const packageType = this.getAttribute('href').substring(1);
                
                // Scroll to the appropriate package
                const targetPackage = document.querySelector(`[data-package="${packageType}"]`);
                if (targetPackage) {
                    targetPackage.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close dropdown
                bursaryPackageBtn.classList.remove('active');
                bursaryPackageMenu.classList.remove('active');
            });
        });
    }

    // FAQ Accordion Fix
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

    // Schedule call buttons
    const scheduleBtns = document.querySelectorAll('.schedule-btn');
    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // You can implement a modal or redirect to a scheduling page
            alert('Schedule a free call functionality - implement your preferred scheduling solution');
        });
    });

    // Explore more options buttons
    const exploreBtns = document.querySelectorAll('.explore-btn');
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // You can implement a modal or redirect to explore more options
            alert('Explore more options functionality - implement your preferred solution');
        });
    });

    // FAQ CTA buttons
    const faqCtaBtns = document.querySelectorAll('.faq-cta .btn');
    faqCtaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Schedule a Free Call') {
                alert('Schedule a free call functionality - implement your preferred scheduling solution');
            } else if (buttonText === 'Explore More Options') {
                alert('Explore more options functionality - implement your preferred solution');
            } else if (buttonText === 'Apply for a Bursary Now') {
                // Scroll to packages section
                const packagesSection = document.querySelector('.packages-section');
                if (packagesSection) {
                    packagesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Support CTA buttons
    const supportCtaBtns = document.querySelectorAll('.support-cta .btn');
    supportCtaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Schedule a Free Call') {
                alert('Schedule a free call functionality - implement your preferred scheduling solution');
            } else if (buttonText === 'Explore More Options') {
                // You can implement a modal or redirect to explore more options
                alert('Explore more options functionality - implement your preferred solution');
            }
        });
    });

    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 