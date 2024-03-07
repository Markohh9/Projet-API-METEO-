const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');


const updateUI = (data) => {



    // destruct properties
    const { cityDets, weather } = data;



    // update UI when city selected
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg</span>
        </div>
    `;

    // remove d-none class if city selected

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};

};

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(err));
});