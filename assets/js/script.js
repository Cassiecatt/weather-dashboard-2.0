//Global Variables
var searchButton = document.querySelector("#search-button");
var userSearch = document.querySelector("#search-term").value;
var weatherContainer = document.querySelector("#weather-container");

//Make a fetch request to current weather API

var getWeather = function () {
    var userSearch = document.querySelector("#search-term").value;
    var apiUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      userSearch +
      "&units=imperial&APPID=a2c9a8e2a17021895f105341626feb6f";
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("getWeather", data)

        //Create div with a class of card / ID of city-info
        var cityInfo = document.createElement("div");
        cityInfo.classList.add("card");
        cityInfo.setAttribute("id", "city-info");
        weatherContainer.appendChild(cityInfo);

        //Clear old content from city-info div
        var cityInfo = document.querySelector("#city-info");
        cityInfo.textContent = " ";
     
        // Create city name variable and append to container 
        var cityName = document.createElement("h3");
        cityName.textContent =
        data.name + " (" + new Date().toLocaleDateString() + ")";
        cityInfo.appendChild(cityName);

         //Temperature variable
        var temperature = document.createElement("p");
        temperature.textContent = "Temperature: " + data.main.temp + "°F"; // need to convert to °F
        cityInfo.appendChild(temperature);

        //Humidity variable
        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        cityInfo.appendChild(humidity);

        //Wind speed variable
        var windSpeed = document.createElement("p");
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + "MPH";
        cityInfo.appendChild(windSpeed);

        //UV variable

    });
};





//Function grabbing user search in input field
var searchValue = function () {
    getWeather();
    var userSearch = document.querySelector("#search-term").value;
  };
  
  // Event Listener - when button is clicked getWeather function runs
  searchButton.addEventListener("click", searchValue);