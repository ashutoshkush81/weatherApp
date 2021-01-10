const userInput = document.getElementById('city-location');
const cardContainer = document.querySelector('.card');
const loader = document.querySelector('#loader');
const dayOrNightTimeImg = document.getElementById('time');
const weatherIcon = document.getElementById("weather-icon");
const cityName = document.getElementById('cityName');
const weatherCondition = document.getElementById('weather-condition');
const temp = document.getElementById('temp');

// Show card
const showCard = () =>{
    // First of all we need to hide the loader.
    if(!loader.classList.contains('displayHidden')){
        loader.classList.add('displayHidden');
    }
    // Now we need to remove displayHidden class
    cardContainer.classList.remove('displayHidden');
}

// Hide card
const hideCard = () =>{
    // First of all we need to hide the card
    if(!cardContainer.classList.contains('displayHidden')){
        cardContainer.classList.add('displayHidden');
    }
    // Now we need to remove displayHidden class
    loader.classList.remove('displayHidden');
}


const updateUI = (data) => {
    // Using properties of destructor
    const { cityDesc, weather } = data;

    // find either it is day or night and then update the img src 
    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'imgages/day.svg';
    } else {
        timeSrc = 'imgages/night.svg';
    }
    dayOrNightTimeImg.setAttribute('src', timeSrc);

    // Set icons according to the weatherIcon number
    const iconNumber = `imgages/icons/${weather.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src',iconNumber);

    cityName.innerText = cityDesc.EnglishName;
    weatherCondition.innerText = weather.WeatherText;
    temp.innerText = weather.Temperature.Metric.Value;


};


// It will return the cityDesc and cityWeather
const updateCity = async (city) => {
    hideCard();
    const cityDesc = await getCity(city);
    const weather = await getWeather(cityDesc.Key);
    showCard();
    return {
        cityDesc: cityDesc,
        weather: weather
    };
    showCard();
    // Another sorthand notation of will be return {cityDesc,weather};
};

// Add eventlistner to get input city
userInput.addEventListener('submit', city => {
    // Prevent default method on submit event
    city.preventDefault();

    // Get the value from the form
    const name = userInput.city.value.trim();
    userInput.reset();

    // get information of input city
    
    updateCity(name).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
    
});