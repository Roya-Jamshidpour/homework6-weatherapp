var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city');
var icon = document.querySelector('#weather-icon');
var forecastContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');

// city buttons 
var seattleButton = document.querySelector('#seattle').addEventListener('click' , buttonClickHandler);
var tokyoButton = document.querySelector('#tokyo').addEventListener('click' , buttonClickHandler);
var losAngelesButton = document.querySelector('#los-angeles').addEventListener('click' , buttonClickHandler);
var buenorAiresButton = document.querySelector('#buenos-aires').addEventListener('click' , buttonClickHandler);
var romeButton = document.querySelector('#rome').addEventListener('click' , buttonClickHandler);



var APIKey = "76f1e6ec8ad2c03d7834f08abb441680";
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
    console.log(cityButtonsEl)
  }

// fetches weather info from API
function getForecast() {
//   gets weather in imperial units
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          let lat = data.coord.lat
          let lon = data.coord.lon
          displayForecast(data);
        //   getUVIndex(lat, lon);
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
// function getUVIndex(lat, lon) {
//     console.log(lat, lon)
//     // THIS FETCH IS NOT WORKING FOR SOME REASON
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "$&lon=$" + lon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=" + APIKey)
//     .then(response => response.json())
//     console.log(data)
//         .then(data => {
//             let UVI = data['current']['uvi'];
    
// })
// };
// function to display forecast within a card for current day
function displayForecast(data) {
    let currentDate = new Date();
    let weatherIcon = data.weather[0].icon + '.png';
    var cityName = data['name'];
    var currentTemp = data.main.temp ;
    var currentWind = data.wind.speed;
    var currentHumidity = data.main.humidity;
    console.log(cityName, weatherIcon, currentTemp, currentDate, currentWind, currentHumidity);
    // displays name above weather display 
    citySearchTerm.innerHTML = cityName;

    // Forecast Container Element
    forecastContainerEl.classList = 'flex-row align-center current-card-body'

    // current weather card
    let currentWeatherCardEl = document.createElement('div');
    currentWeatherCardEl.classList = 'flex-column align-center current-card-body card';

    // append "today" to top of card as title
    let todayTitle = document.createElement('header');
    todayTitle.textContent = "TODAY";
    currentWeatherCardEl.appendChild(todayTitle);

    // append weather icon to card
    icon.innerHTML = weatherIcon;
    currentWeatherCardEl.appendChild(icon)

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


    


// var getFeaturedRepos = function (language) {
//   // The `q` parameter is what language we want to query, the `+is:featured` flag adds a filter to return only featured repositories
//   // The `sort` parameter will instruct GitHub to respond with all of the repositories in order by the number of issues needing help
  
//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayForecast(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

userFormEl.addEventListener('submit', formSubmitHandler)


// cityButtonsEl.addEventListener('click', buttonClickHandler);
