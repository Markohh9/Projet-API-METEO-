const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');
const resetBtn = document.getElementById('changeCityBtn');
const displayForm = document.getElementById('form');



const updateUI = (data) => {





    // destruct properties
    const {
        cityDets,
        weather,
        sunrise,
        sunset
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
    getLocalTime();

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


    //

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
            'Soleil': '../img/weather/sun-day.gif', //
            'Nuageux': '../img/weather/cloud-day.gif', //
            'Pluie': '../img/weather/rain-day.gif', //
            'Vent': '../img/weather/wind-day.gif', //
            'Brume': '../img/weather/fog-day.gif', //
            'Neige': '../img/weather/snow-day.gif', //
            'Tempete': '../img/weather/storm-day.gif' //
        },
        'twilight': {
            'Soleil': '../img/weather/sun-twilight.gif', //
            'Nuageux': '../img/weather/cloud-twilight.gif', //
            'Pluie': '../img/weather/rain-twilight.gif',
            'Vent': '../img/weather/wind-twilight.gif',
            'Brume': '../img/weather/fog-twilight.gif',
            'Neige': '../img/weather/snow-twilight.gif',
            'Tempete': '../img/weather/storm-twilight.gif'
        },
        'night': {
            'Soleil': '../img/weather/sun-night.gif', //
            'Nuageux': '../img/weather/cloud-night.gif', //
            'Pluie': '../img/weather/rain-night.gif', //
            'Vent': '../img/weather/wind-night.gif', //
            'Brume': '../img/weather/fog-night.gif', //
            'Neige': '../img/weather/snow-night.gif', //
            'Tempete': '../img/weather/storm-night.gif' //
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


    // get lat and long of the city//

    const cityLat = cityDets.GeoPosition.Latitude;
    const cityLong = cityDets.GeoPosition.Longitude;

    console.log(cityLat)
    console.log(cityLong)
    console.log(getLocalTime(cityTimeZone))

    // get sunset and sunrise with api //
    async function getSun() {
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${cityLat}&lng=${cityLong}&date=today`);
        const result = await response.json();
        console.log(result);

        const sunrise = result.results.sunrise;
        const sunset = result.results.sunset;

        return {
            sunrise,
            sunset
        };
    }

    getSun().then(({
        sunrise,
        sunset
    }) => {
        updateUI({
            cityDets,
            weather,
            sunrise,
            sunset
        });
    }).catch(error => console.log(error));
















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
                            <p class="infocardtitle">Ce matin il fera</p>
                            <div class="temp-txt">
                                <span>${weather.Temperature.Metric.Value}</span>
                                <span>&deg</span>
                            </div>
                        </div>
                        <div class="cardsectioninfo">
                            <p class="infocardtitle">Le soleil se lève à:</p>
                            <span class="infocardhours">${sunrise}</span>
                        </div>
                    </div>


                    <div class="cardinfoday">
                        <div class="cardsectioninfo">
                            <p class="infocardtitle">Cet après midi il fera:</p>
                            <div class="temp-txt">
                                <span>${weather.Temperature.Metric.Value}</span>
                                <span>&deg</span>
                            </div>
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




    console.log(data)




}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
        weather
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