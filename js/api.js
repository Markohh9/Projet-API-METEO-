const key = 'QYNEVaq6boAcuRIN5Zn8XNBs7uO1QWEd';

//get weather //
const getWeather = async (id) => {
    const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
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

// get HourlyForecast //
const getHourlyForecast = async (locationKey) => {
    const base = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}`;
    const query = `?apikey=${key}`;

    try {
        const response = await fetch(base + query);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching hourly forecast:", error);
        return []; // Return an empty array if forecast data is not available
    }
};
