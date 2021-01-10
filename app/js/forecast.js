
// Get weather info (like day or night, sunny or cloudy and temp..) from given city id.
const getWeather = async (id) =>{
    const resourceUrl = `http://dataservice.accuweather.com/currentconditions/v1/${id}`;
    const queryUrl = `?apikey=${key}`;
    const request = await fetch(resourceUrl + queryUrl);
    const data = await request.json();
    return data[0];
}


// Find city details from the given city.
const getCity = async (city) =>{
    const resourceUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const queryUrl = `?apikey=${key}&q=${city}`;
    const request = await fetch(resourceUrl + queryUrl);
    const data = await request.json();
    return data[0];
}
