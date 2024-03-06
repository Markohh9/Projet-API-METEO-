document.addEventListener("DOMContentLoaded", function() {
    const cityForm = document.getElementById("cityForm");
    const cityInput = document.getElementById("cityInput");
    const container = document.getElementById("container");

    cityForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city !== "") {
            localStorage.setItem("savedCity", city);
            cityInput.value = "";
            displayCity(city);
        }
    });

    const savedCity = localStorage.getItem("savedCity");
    if (savedCity) {
        displayCity(savedCity);
    }

    function displayCity(city) {
        container.innerHTML = ""; // Clear container content
        const cityName = document.createElement("h2");
        cityName.textContent = city;
        container.appendChild(cityName);
        cityName.style.fontSize = "36px";

        // Create close icon
        const closeIcon = document.createElement("i");
        closeIcon.className = "fas fa-times";
        closeIcon.style.cursor = "pointer";
        cityName.appendChild(closeIcon);

        // Add click event to close icon
        closeIcon.addEventListener("click", function() {
            localStorage.removeItem("savedCity");
            container.innerHTML = ""; // Clear container content
            container.appendChild(cityForm); // Re-append city form
        });
    }
});
