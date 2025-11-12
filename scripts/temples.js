// temples.js - JavaScript for Temple Album

// Set current year in footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');

    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '&#9776;'; // Hamburger icon
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');

    // Insert hamburger button before nav
    nav.parentNode.insertBefore(hamburgerBtn, nav);

    // Toggle navigation function
    function toggleNav() {
        navList.classList.toggle('nav-open');
        hamburgerBtn.classList.toggle('active');

        // Change icon based on state
        if (hamburgerBtn.classList.contains('active')) {
            hamburgerBtn.innerHTML = '&times;'; // Close icon (X)
        } else {
            hamburgerBtn.innerHTML = '&#9776;'; // Hamburger icon
        }
    }

    // Add click event to hamburger button
    hamburgerBtn.addEventListener('click', toggleNav);

    // Close menu when clicking on a link (mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navList.classList.remove('nav-open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.innerHTML = '&#9776;';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            // Ensure menu is visible on larger screens
            navList.classList.remove('nav-open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.innerHTML = '&#9776;';
        }
    });
});