var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city');
var forecastContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');

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
    getUVIndex(city);

    forecastContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city.');
  }
};
// TEND TO BUTTONS LATER
// var buttonClickHandler = function (event) {
//   // `event.target` is a reference to the DOM element of what city button was clicked on the page
//   var preselectedCity = event.target.getAttribute('preselected-city');

//   // If there is no city read from the button, don't attempt to fetch weather
//   if (city) {
//     getFeaturedRepos(city);

//     forecastContainerEl.textContent = '';
//   }
// };
// fetches weather info fromo API
function getForecast() {
  
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          let lat = data.coord.lat
          let lon = data.coord.lon
          displayForecast(lat, lon);
          getUVIndex(lat, lon);
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
function getUVIndex() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily,alerts&appid=&appid=76f1e6ec8ad2c03d7834f08abb441680")
    // fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "$&lon=$" + lon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=" + APIkey)
    .then(response => response.json())
        .then(data => {
            let UVI = data['current']['uvi'];
    
})
};
    


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

// displays weather forecast in dynamically created cards
function displayForecast() {
  
  for (var i = 0; i < city.length; i++) {
    var cityName = citySearchTerm.value
    citySearchTerm.textContent = cityName

    var cityEl = document.createElement('div');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = cityName;

    forecastContainerEl.appendChild(titleEl);

    var weatherEl = document.createElement('span');
    weatherEl.classList = 'flex-row align-center';

    cityEl.appendChild(weatherEl);

    
  }
};

userFormEl.addEventListener('submit', formSubmitHandler)


// cityButtonsEl.addEventListener('click', buttonClickHandler);
