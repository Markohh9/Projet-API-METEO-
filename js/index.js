const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {



    // destruct properties
    const {
        cityDets,
        weather
    } = data;



    // update UI when city selected
    details.innerHTML = `

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
    `;

    // update Day / Night icon and Images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);


    // remove d-none class if city selected

    // remove d-none class if city selected
if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
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

// Changing Background with hour and weather //

const backgroundImages = {
    'day': {
        'Soleil': '../img/weather/sun-day.gif',
        'Nuageux': '../img/weather/cloud-day.gif',
        'Pluie' : '../img/weather/rain-day.gif',
        'Vent' : '../img/weather/wind-day.gif',
        'Brume' : '../img/weather/fog-day.gif',
        'Neige' : '../img/weather/snow-day.gif',
        'Tempete' : '../img/weather/storm-day.gif'
    },
    'twilight': {
        'Soleil': '../img/weather/sun-twilight.gif',
        'Nuageux': '../img/weather/cloud-twilight.gif',
        'Pluie' : '../img/weather/rain-twilight.gif',
        'Vent' : '../img/weather/wind-twilight.gif',
        'Brume' : '../img/weather/fog-twilight.gif',
        'Neige' : '../img/weather/snow-twilight.gif',
        'Tempete' : '../img/weather/storm-twilight.gif'
    },
    'night': {
        'Soleil': '../img/weather/sun-night.gif',
        'Nuageux': '../img/weather/cloud-night.gif',
        'Pluie' : '../img/weather/rain-night.gif',
        'Vent' : '../img/weather/wind-night.gif',
        'Brume' : '../img/weather/fog-night.gif',
        'Neige' : '../img/weather/snow-night.gif',
        'Tempete' : '../img/weather/storm-night.gif'
    }
};