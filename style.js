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

function getForecast() {
  
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          
          displayForecast(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather');
    });
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

var displayForecast = function (city, citySearchTerm) {
  if (city.length === 0) {
    forecastContainerEl.textContent = 'No city found.';
    // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
    return;
  }

//   citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < city.length; i++) {
    // The result will be `<github-username>/<github-repository-name>`
    var cityName = city[i].owner.login + '/' + city[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    forecastContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
// cityButtonsEl.addEventListener('click', buttonClickHandler);
