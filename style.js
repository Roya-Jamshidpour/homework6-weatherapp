var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city');
var icon = document.getElementById('#weather-icon');
var forecastContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');
let lat, lon, setUv

// city buttons 
var seattleButton = document.querySelector('#seattle')
var tokyoButton = document.querySelector('#tokyo')
var losAngelesButton = document.querySelector('#los-angeles')
var buenorAiresButton = document.querySelector('#buenos-aires')
var romeButton = document.querySelector('#rome')



var APIKey = "50bdbcf3a8d7a1e4f6f3760fb6754d99";
// empty string to put user-input city into
var city = [];
 // URL to make queries to weather API
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// function to take user input for city weather search
var formSubmitHandler = function (event) {
  event.preventDefault();
  
  city = cityInputEl.value;
  
  if (city) {
    getForecast(city);
    // getUVIndex(city);

    forecastContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city.');
  }
};

// Buttons to load weather info for specific cities
function buttonClickHandler(event) {
  
  cityButtonsEl = event.target.getAttribute('preselected-city');
  city = cityButtonsEl
  getForecast(city)
  }

// fetches weather info from API
function getForecast(city) {
//   gets weather in imperial units
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          lon = data.coord.lon
          lat = data.coord.lat
          getUVIndex(lat, lon);
          displayForecast(data);
        
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather');
    });
};
// function to get UV Index for city
function getUVIndex(lat, lon) {
    let setUv = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`
    fetch(setUv)
    .then(function (response) {
        response.json().then(function (data){
             setUv = data.value
             console.log(setUv)
            displayForecast(setUv);
        })
    }) 
   
};
// function to display forecast within a card for current day
function displayForecast(data, setUv) {
    // getUVIndex(lat, lon);
    console.log(setUv);
    let currentDate = new Date();
    // let weatherIcon = data.weather[0].icon + ".png"
    var cityName = data['name'];
    var currentTemp = data.main.temp ;
    var currentWind = data.wind.speed;
    var currentHumidity = data.main.humidity;
    console.log(cityName, currentTemp, currentDate, currentWind, currentHumidity);

  
    // displays name above weather display 
    citySearchTerm.innerHTML = cityName;

    // Forecast Container Element
    forecastContainerEl.classList = 'flex-row align-center current-card-body'

    // current weather card
    let currentWeatherCardEl = document.createElement('div');
    currentWeatherCardEl.classList = 'flex-column align-center current-card-body card';

    // append "today" to top of card as title
    let todayTitle = document.createElement('header');
    todayTitle.textContent = "TODAY in " + city;
    currentWeatherCardEl.appendChild(todayTitle);

    // append weather icon to card
    // let weatherIMG = document.getElementById("#weather-icon")
    // weatherIMG.innerHTML = icon;
    // currentWeatherCardEl.appendChild(weatherIMG)

    // appended date to weather card
    let cardDate = document.createElement('span');
    cardDate.textContent = currentDate;
    currentWeatherCardEl.appendChild(cardDate);

    // append temperature value to card
    let cardTemp = document.createElement('span');
    cardTemp.textContent = "Current Temperature : " + currentTemp + "℉";
    currentWeatherCardEl.appendChild(cardTemp);

    // append wind value to card
    let windValue = document.createElement('span');
    windValue.textContent = "Current Wind : " + currentWind + "mph";
    currentWeatherCardEl.appendChild(windValue);

    // append humidity to card
    let humidityValue = document.createElement('span');
    humidityValue.textContent = "Current Humidity : " + currentHumidity + "%"
    currentWeatherCardEl.appendChild(humidityValue);

    // append weather card into forecast container
    forecastContainerEl.appendChild(currentWeatherCardEl);

    }

userFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
