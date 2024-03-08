const key = 'uYLf6AbMjpAMTI8gfI4WRn3PZ1ug3UzG';

//get weather //
const getWeather = async (id) => {

    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${id}?apikey=${key}&language=fr`

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