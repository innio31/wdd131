// filtered-temples.js - Enhanced Temple Album with Filtering

// Set current year in footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;

// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // 3 ADDITIONAL TEMPLES
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl: "https://churchofjesuschristtemples.org/johannesburg-south-africa-temple/photographs/johannesburg-south-africa-temple-exterior-2/400x250.jpg"
    },
    {
        templeName: "Salt Lake City",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-767885-wallpaper.jpg"
    }
];

// Function to create temple card HTML
function createTempleCard(temple) {
    return `
    <figure class="temple-card">
      <img src="${temple.imageUrl}" 
           alt="${temple.templeName}" 
           loading="lazy"
           width="400" 
           height="250">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    </figure>
  `;
}

// Function to display temples
function displayTemples(filteredTemples) {
    const templeCardsContainer = document.getElementById('temple-cards');
    templeCardsContainer.innerHTML = filteredTemples.map(createTempleCard).join('');
}

// Filter functions
function filterTemples(filterType) {
    switch (filterType) {
        case 'old':
            return temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
        case 'new':
            return temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
        case 'large':
            return temples.filter(temple => temple.area > 90000);
        case 'small':
            return temples.filter(temple => temple.area < 10000);
        case 'home':
        default:
            return temples;
    }
}

// Event listener for navigation
document.addEventListener('DOMContentLoaded', function () {
    // Display all temples initially
    displayTemples(temples);

    // Add click event listeners to nav links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const filterType = this.getAttribute('data-filter');
            const filteredTemples = filterTemples(filterType);
            displayTemples(filteredTemples);

            // Update active state (optional visual enhancement)
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Hamburger menu functionality (from your original code)
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');

    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '&#9776;';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');

    // Insert hamburger button before nav
    nav.parentNode.insertBefore(hamburgerBtn, nav);

    // Toggle navigation function
    function toggleNav() {
        navList.classList.toggle('nav-open');
        hamburgerBtn.classList.toggle('active');
        hamburgerBtn.innerHTML = hamburgerBtn.classList.contains('active') ? '&times;' : '&#9776;';
    }

    hamburgerBtn.addEventListener('click', toggleNav);

    // Close menu when clicking on a link (mobile)
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
            navList.classList.remove('nav-open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.innerHTML = '&#9776;';
        }
    });
});