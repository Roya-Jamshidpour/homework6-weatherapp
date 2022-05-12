var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var cityInputEl = document.querySelector('#city');
var forecastContainerEl = document.querySelector('#forecast-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var APIKey = "76f1e6ec8ad2c03d7834f08abb441680";
var city = [];

var formSubmitHandler = function (event) {
  event.preventDefault();
  
  city = nameInputEl.value.trim();
  
  if (city) {
    getForecast(city);

    forecastContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};

var buttonClickHandler = function (event) {
  // `event.target` is a reference to the DOM element of what programming language button was clicked on the page
  var language = event.target.getAttribute('data-language');

  // If there is no language read from the button, don't attempt to fetch repos
  if (language) {
    getFeaturedRepos(language);

    forecastContainerEl.textContent = '';
  }
};

var getForecast = function (city) {
    // URL to make queries to weather API
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(queryULR)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var getFeaturedRepos = function (language) {
  // The `q` parameter is what language we want to query, the `+is:featured` flag adds a filter to return only featured repositories
  // The `sort` parameter will instruct GitHub to respond with all of the repositories in order by the number of issues needing help
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    forecastContainerEl.textContent = 'No repositories found.';
    // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    // The result will be `<github-username>/<github-repository-name>`
    var repoName = repos[i].owner.login + '/' + repos[i].name;

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
languageButtonsEl.addEventListener('click', buttonClickHandler);
