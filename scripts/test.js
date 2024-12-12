import { myKey } from "./key.js";

let currentTemp = document.getElementById("currentTemp");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let city = document.getElementById("city");
let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");

let weatherIcon = document.getElementById("weatherIcon");
let weatherIcon1 = document.getElementById("weatherIcon1");
let weatherIcon2 = document.getElementById("weatherIcon2");
let weatherIcon3 = document.getElementById("weatherIcon3");
let weatherIcon4 = document.getElementById("weatherIcon4");

let recKey = document.getElementById("recKey");
let recValue = document.getElementById("recValue");

let day1 = document.getElementById("day1");
let dayWeek1 = document.getElementById("dayWeek1");

let day2 = document.getElementById("day2");
let dayWeek2 = document.getElementById("dayWeek2");

let day3 = document.getElementById("day3");
let dayWeek3 = document.getElementById("dayWeek3");

let day4 = document.getElementById("day4");
let dayWeek4 = document.getElementById("dayWeek4");

let testButton = document.getElementById("testButton");
let testButtonRec = document.getElementById("testButtonRec");
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get Main data
async function getAPI(lat, lon) 
{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`);
        if (!response.ok) throw new Error("Failed to fetch weather data.");
        const data = await response.json();
        return data;
   
}

async function getWeekAPI(lat, lon) 
{
    
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?exclude=minutely,alerts,hourly&lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`);
        if (!response.ok) throw new Error("Failed to fetch weekly weather data.");
        const data = await response.json();
        return data;
}

// Get Food Data
async function getFoodData() 
{
        const response = await fetch("./data/food.json");
        if (!response.ok) throw new Error("Failed to fetch food data.");
        const data = await response.json();
        return data;
   
}

// Food Function
async function grabRandomFood(currentTemp) 
{
    const data = await getFoodData();
    if (!data) return;

    let tempLimit = 75;
    let foodArray = currentTemp >= tempLimit ? data.food.cold : data.food.hot;
    let randomIndex = Math.floor(Math.random() * foodArray.length);
    return foodArray[randomIndex];
}

// Update UI
function updateWeatherUI(weatherData, weekData) 
{
    currentTemp.innerText = Math.trunc(weatherData.list[0].main.temp);
    lowTemp.innerText = Math.trunc(weatherData.list[0].main.temp_min);
    highTemp.innerText = Math.trunc(weatherData.list[0].main.temp_max);
    city.innerText = `${weatherData.city.name}, ${weatherData.city.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`;

    // Weekly tabs
    const days = [day1, day2, day3, day4];
    const weatherIcons = [weatherIcon1, weatherIcon2, weatherIcon3, weatherIcon4];
    const dayWeek = [dayWeek1, dayWeek2, dayWeek3, dayWeek4];

    for (let i = 1; i < 4; i++) 
    {
        const dayData = weekData.daily[i];
        const dayDate = new Date(dayData.dt * 1000);
        days[i - 1].innerText = Math.round(dayData.temp.day);
        weatherIcons[i - 1].src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        dayWeek[i - 1].innerText = daysOfWeek[dayDate.getDay()];
    }
}

testButtonRec.addEventListener("click", async function () 
{
    let recommendTab = await grabRandomFood(currentTemp.innerText);
    if (!recommendTab) return;

    let foodKey = Object.keys(recommendTab);
    let foodValue = Object.values(recommendTab);

    recKey.innerText = foodKey + ":";
    recValue.innerText = foodValue;
    console.log(recommendTab);
});


searchBtn.addEventListener("click", async function () 
{
    const cityName = searchBar.value.trim();
    if (!cityName) 
    {
        alert("Please enter a city name.");
        return;
    }

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${myKey}`);
    if (!response.ok) throw new Error("City not found.");
    const geoData = await response.json();

    if (!geoData || geoData.length === 0) 
    {
        alert("City not found. Please enter a valid city name.");
        return;
    }
    const {lat, lon} = geoData[0];
    const weatherData = await getAPI(lat, lon);
    const weekData = await getWeekAPI(lat, lon);
    updateWeatherUI(weatherData, weekData);
    alert("Failed to fetch city data. Please try again.");
});