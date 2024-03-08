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