const key = '81bRm2ZyIz2I7s15OEbtgkOvvSSTr3Rs';

//get weather //
const getWeather = async (id) => {

    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city //

const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json()

    return data[0];
};