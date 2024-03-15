const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const icon = document.querySelector('.icon img');
const resetBtn = document.getElementById('changeCityBtn');
const displayForm = document.getElementById('formInput');

const updateUI = async (data) => {
    // destruct properties
    const {
        cityDets,
        weather,
        sunrise,
        sunset,
        forecast
    } = data;

    // Get Time of city //
    const getLocalTime = (timeZone) => {
        const currentTime = new Date();
        const timeOptions = {
            timeZone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const formatter = new Intl.DateTimeFormat('fr-FR', timeOptions);
        return formatter.format(currentTime);
    }

    // Get Time of city //
    const cityTimeZone = cityDets.TimeZone.Name;
    const localTime = getLocalTime(cityTimeZone);
    console.log("Local time:", localTime);

    // defined the night/day/twilight //
    const getTimeOfDay = (localTime) => {
        const hour = parseInt(localTime.split(':')[0]); // Extraire l'heure de la chaîne de caractères

        if (hour >= 8 && hour < 18) {
            return "day";
        } else if ((hour >= 6 && hour < 8) || (hour >= 18 && hour < 21)) {
            return "twilight";
        } else {
            return "night";
        }
    };

    // Get weather icon code
    const weatherIconCode = weather.WeatherIcon;
    console.log("Weather icon code:", weatherIconCode);

    // Atribute WeatherIconCode to Weather
    const getWeatherType = (weatherIconCode) => {
        const weatherTypes = {
            'Soleil': [1, 2, 3, 4, 30, 33, 34],
            'Nuageux': [5, 6, 7, 38],
            'Pluie': [12, 13, 14, 18, 39, 40],
            'Vent': [32, 35, 36],
            'Brume': [8, 11, 37],
            'Neige': [22, 23, 24, 25, 26, 29, 44],
            'Tempete': [15, 16, 17, 19, 20, 21, 31, 41, 42, 43]
        };

        // Search for the code of the weatherTypes
        for (const [weatherType, codes] of Object.entries(weatherTypes)) {
            if (codes.includes(weatherIconCode)) {
                return weatherType;
            }
        }
        return 'Autre';
    };

    // Changing Background with hour and weather //
    const backgroundImages = {
        'day': {
            'Soleil': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-day.gif', 
            'Nuageux': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-day.gif', 
            'Pluie': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-day.gif', 
            'Vent': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-day.gif', 
            'Brume': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-day.gif', 
            'Neige': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-day.gif', 
            'Tempete': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-day.gif' 
        },
        'twilight': {
            'Soleil': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-twilight.gif', 
            'Nuageux': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-twilight.gif', 
            'Pluie': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-twilight.gif', 
            'Vent': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-twilight.gif', 
            'Brume': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-twilight.gif', 
            'Neige': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-twilight.gif',  
            'Tempete': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-twilight.gif' 
        },
        'night': {
            'Soleil': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-night.gif', 
            'Nuageux': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-night.gif', 
            'Pluie': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-night.gif', 
            'Vent': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-night.gif', 
            'Brume': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-night.gif', 
            'Neige': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-night.gif', 
            'Tempete': 'https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-night.gif' 
        }
    };

    // Get Time of day and weather type
    const timeOfDay = getTimeOfDay(localTime);
    const weatherType = getWeatherType(weatherIconCode);

    console.log("Type de météo:", weatherType);
    console.log("Time of day:", getTimeOfDay(localTime));

    // Get the path of the background image
    const backgroundImage = backgroundImages[timeOfDay][weatherType];
    console.log("Chemin du fond d'écran:", backgroundImage);

    // Changing the background with the backgroundImage
    const changeContainerBackground = (backgroundImageUrl) => {
        const containerBody = document.querySelector('.container-body');
        containerBody.style.backgroundImage = `url(${backgroundImageUrl})`;
        containerBody.style.backgroundSize = 'cover';
        containerBody.style.opacity = '1';
        containerBody.style.backgroundRepeat = 'no-repeat';
    };

    changeContainerBackground(backgroundImage);

// Get morning and afternoon temperature from forecast
const getMorningAfternoonTemperature = (forecast) => {
    // Fonction pour convertir les températures en Celsius
    const convertToCelsius = (tempInOtherUnit) => {
        return Math.floor((tempInOtherUnit - 32) * 5 / 9); // Conversion de Fahrenheit à Celsius et arrondi vers le bas
    };

    const morningTemperature = Math.floor((forecast[0].Temperature.Value - 32) * 5 / 9);
    const afternoonTemperature = Math.floor((forecast[5].Temperature.Value - 32) * 5 / 9);
    return { morningTemperature, afternoonTemperature };
};

const { morningTemperature, afternoonTemperature } = getMorningAfternoonTemperature(forecast);
console.log("Morning temperature:", morningTemperature);
console.log("Afternoon temperature:", afternoonTemperature);




    // update UI when city selected
    card.innerHTML = `
    <div class="align-top-card">
        <div class="txt-top-card">
            <div class="weather-name">${weather.WeatherText}</div>
            <h5 class="city-name-desc">${cityDets.EnglishName}, ${cityDets.Country.EnglishName}, ${cityDets.AdministrativeArea.EnglishName}</h5>
        </div>
        <div class="temp-txt">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg</span>
        </div>
    </div>
    <div class="cardimgtemp">
        <div class="infoday">
            <div class="cardinfoday">
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Ce matin il devrait faire:</p>
                    <div class="temp-txt">
                        <span>${morningTemperature}</span>
                        <span>&deg</span>
                    </div>
                    <span class="weatherofpartday">${getWeatherType(forecast[0].WeatherIcon)}</span>
                </div>
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Le soleil se lève à:</p>
                    <span class="infocardhours">${sunrise}</span>
                </div>
            </div>
            <div class="cardinfoday">
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Cet après midi il devrait faire:</p>
                    <div class="temp-txt">
                        <span>${afternoonTemperature}</span>
                        <span>&deg</span>
                    </div>
                    <span class="weatherofpartday">${getWeatherType(forecast[5].WeatherIcon)}</span>
                </div>
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Le soleil se couche à:</p>
                    <span class="infocardhours">${sunset}</span>
                </div>
            </div>
        </div>
    </div>
    `;

    // update Day / Night icon and Images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // remove d-none class if city selected
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
        // Si la classe d-none a été supprimée, affichez le bouton resetBtn
        resetBtn.style.display = 'block';
        displayForm.style.display = 'none';
    }

    console.log(data);
};

const getSun = async (cityLat, cityLong) => {
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${cityLat}&lng=${cityLong}&date=today&formatted=0`);
    const result = await response.json();
    console.log(result);

    const sunrise = new Date(result.results.sunrise).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'h');
    const sunset = new Date(result.results.sunset).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'h');

    return {
        sunrise,
        sunset
    };
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    const { sunrise, sunset } = await getSun(cityDets.GeoPosition.Latitude, cityDets.GeoPosition.Longitude);
    const forecast = await getHourlyForecast(cityDets.Key); // Appel à la fonction pour obtenir les prévisions horaires
    return {
        cityDets,
        weather,
        sunrise,
        sunset,
        forecast
    };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));
});

resetBtn.addEventListener('click', () => {
    // Rechargez la page
    window.location.reload();
});
