function process() {
    var searchCountry = document.getElementById("box1").value;
    document.getElementById("box1").value = "";

    var countryUrl = `https://restcountries.com/v3.1/name/${searchCountry}`;

    fetch(countryUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('Country not found');
            }
            displayCountryDetails(data);
            showWeatherButton(searchCountry);
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

function displayCountryDetails(items) {
    var oldContent = document.getElementById("container");
    oldContent.textContent = "";

    for (var r = 0; r < items.length; r++) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = `<img src="${items[r].flags.png}">  <br> <br>
                            Name: <b>${items[r].name.common}</b> <br> <br>
                            Capital: ${items[r].capital} <br>
                            Region: ${items[r].region} <br>
                            Population: ${items[r].population} <br>`;

        newDiv.classList.add("innerStyle");
        oldContent.appendChild(newDiv);
    }
}

function showWeatherButton(searchCountry) {
    var weatherButton = document.createElement("button");
    weatherButton.textContent = "Get Weather";
    weatherButton.onclick = function() {
        getWeatherDetails(searchCountry);
    };
    document.getElementById("container").appendChild(weatherButton);
}

function getWeatherDetails(searchCountry) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCountry}&appid=226d5ad27b664aae45e4f54383bb019b`;

    fetch(weatherUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            displayWeatherDetails(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherDetails(data) {
    var weatherContainer = document.createElement("div");

    var cityName = data.city.name;
    var countryName = data.city.country;
    var temperature = (data.list[0].main.temp - 273.15).toFixed(2);
    var description = data.list[0].weather[0].description;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;

    weatherContainer.innerHTML = `<h3>Weather in ${cityName}, ${countryName}</h3>
                                  <p>Temperature: ${temperature}°C</p>
                                  <p>Description: ${description}</p>
                                  <p>Humidity: ${humidity}%</p>
                                  <p>Wind Speed: ${windSpeed} m/s</p>`;

    document.getElementById("container").appendChild(weatherContainer);
}
