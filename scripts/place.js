// --- Footer Information ---
// Get the current year
const currentYear = new Date().getFullYear();
// Get the last modified date of the document
const lastModified = new Date(document.lastModified);

// Find the footer element
const footerElement = document.querySelector('footer');

// Update the footer's HTML content.
footerElement.innerHTML = `
    <p>&copy; ${currentYear} Impact Digital Academy | Emmanuel Ademuyiwa</p>
    <p>Last Modified: ${lastModified.toLocaleDateString()}</p>
`;

// --- Wind Chill Calculation ---
// Static values for temperature (F) and wind speed (mph)
const temperatureF = 45; // Change this to your static value
const windSpeedMph = 10; // Change this to your static value

// Function to calculate wind chill (Imperial/Fahrenheit)
function calculateWindChill(temp, speed) {
    // Wind Chill (F) formula: 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
    return 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
}

// Get the HTML element where we will display the wind chill
const windChillElement = document.getElementById('wind-chill-value');

// Check if conditions are met for viable wind chill calculation
if (temperatureF <= 50 && windSpeedMph > 3) {
    // Conditions met: calculate the wind chill
    const windChill = calculateWindChill(temperatureF, windSpeedMph);
    // Display the wind chill, rounded to 1 decimal place
    windChillElement.textContent = `${windChill.toFixed(1)}°F`;
} else {
    // Conditions not met: display "N/A"
    windChillElement.textContent = 'N/A';
}