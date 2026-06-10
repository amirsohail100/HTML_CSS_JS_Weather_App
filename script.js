const apiKey = "35a9d07e2e4880ac2afbe625cdf62b95";
console.log(apiKey.length);
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Check karein agar response sahi hai (status 200)
    if (response.status == 404) {
        alert("Invalid City Name!");
        return; // Function ko yahin rok dein
    } else if (response.status == 401) {
        alert("Invalid API Key! Please check your key.");
        return;
    }

    var data = await response.json();
    console.log(data);

    // Ab data access karna safe hai
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherIcon = document.querySelector(".weather-icon");
    if (data.weather && data.weather[0]) {
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        alert("Please enter a city name");
    }
});

