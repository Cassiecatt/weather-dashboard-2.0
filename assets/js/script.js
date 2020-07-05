//Global Variables
var searchButton = document.querySelector("#search-button");
var userSearch = document.querySelector("#search-term").value;
var weatherContainer = document.querySelector("#weather-container");

//Make a fetch request to current weather API

var getWeather = function () {
    var userSearch = document.querySelector("#search-term");
    var apiUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      userSearch.value +
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
        // cityInfo.textContent = " ";
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
        uvIndex(data.coord.lat, data.coord.lon);

        //Call forecast function
        forecast();
        userSearch.value = ""
    });
};

// uvIndex function
var uvIndex = function (lat, lon) {
    var apiUrl =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=a2c9a8e2a17021895f105341626feb6f&lat=" +
      lat +
      "&lon=" +
      lon;
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data[0].value)
        var cityInfo = document.querySelector("#city-info");
        var uv = document.createElement("p");
        uv.textContent = "UV Index: " 
        //creating buttonEl to change color of uv value
        var buttonEl = document.createElement("span");
        buttonEl.classList.add("btn", "btn-sm");
        buttonEl.innerHTML = data[0].value;

       if (data[0].value < 3) {
            buttonEl.classList.add("btn-success");
       }
       else if (data[0].value < 7) {
            buttonEl.classList.add("btn-warning");
       } else {
           buttonEl.classList.add("btn-danger");
       }
        uv.appendChild(buttonEl)
        cityInfo.appendChild(uv);
      });
  };

  // Forecast function
var forecast = function() {
    var userSearch = document.querySelector("#search-term").value;
    var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    userSearch +
    "&units=imperial&appid=a2c9a8e2a17021895f105341626feb6f&lat";
  fetch(apiUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    console.log("forecast", data);
 

    //Create another div holding 5 day forecast information
    var forecastContainer = document.createElement("div");
    forecastContainer.classList.add("card", "mt-3", "p-2");
    forecastContainer.setAttribute("id", "forecast-container");
    // forecastContainer.textContent = " ";
    weatherContainer.appendChild(forecastContainer);

    //Clear old content from forecast div
    var forecastContainer = document.querySelector("#forecast-container");
    forecastContainer.textContent = " ";

    //Create header 
    var forecastHeader = document.createElement("h3");
    forecastHeader.textContent = " 5-Day Forecast:";
    forecastContainer.appendChild(forecastHeader);

    //Create forecast container
    var forecast = document.createElement("div");
    forecast.classList.add("container");
    forecast.setAttribute("id", "forecast");
    forecastContainer.appendChild(forecast);

    //Create div with a row class
    var fiveDayForecast = document.createElement("div");
    fiveDayForecast.classList.add("row");
    fiveDayForecast.setAttribute("id", "display-forecast");
    forecast.appendChild(fiveDayForecast);


    //Only look at forecast for 3:00:00 on each day
    for (var i = 2; i < data.list.length; i += 8 ) {
        if (data.list[i].dt_txt.indexOf("6:00:00") != -1) {

            //create div inside forecast to append variables to
            var weatherCard = document.createElement("div");
            weatherCard.classList.add("card", "col-md-2", "bg-primary", "text-white");
            fiveDayForecast.appendChild(weatherCard);

            //date variable
            var dateEl = document.createElement("h6");
            dateEl.classList.add("font-weight-bold");
            dateEl.textContent = new Date(
            data.list[i].dt_txt).toLocaleDateString();
            weatherCard.appendChild(dateEl);

            //icon variable
            var iconImg = document.createElement("img");
            iconImg.classList.add("card-img");
            iconImg.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
            weatherCard.appendChild(iconImg);

            //temperature variable
            var temp = document.createElement("p");
            temp.classList.add("card-text");
            temp.textContent = "Temp: " + data.list[i].main.temp_max + "°F";
            weatherCard.appendChild(temp);


            //humidity variable
            var humidity = document.createElement("p");
            humidity.classList.add("card-text");
            humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            weatherCard.appendChild(humidity);

        }
    }

  })
}




//Function grabbing user search in input field
var searchValue = function () {
    getWeather();
    var userSearch = document.querySelector("#search-term").value;
  };
  
  // Event Listener - when button is clicked getWeather function runs
  searchButton.addEventListener("click", searchValue);