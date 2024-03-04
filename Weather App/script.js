const weatherApiKey = '6ae0db5472cb64623d67ab312ca105f6';

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search_bar button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(weatherApiUrl + city + `&appid=${weatherApiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".visibility").innerHTML = data.visibility + "m";

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = "img/clouds.svg";
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = "img/clear.svg";
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = "img/rain.svg";
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "img/drizzle.svg";
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = "img/mist.svg";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});