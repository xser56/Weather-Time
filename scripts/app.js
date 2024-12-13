import { myKey } from "./key.js";
import { getAPI, getWeekAPI, getFoodData } from "./grabData.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";

let currentTemp = document.getElementById("currentTemp");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let city = document.getElementById("city");
let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");

let favoriteButton = document.getElementById("favoriteButton");
let favoriteList = document.getElementById("favoriteList"); 

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

let daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

// Inputs

// Favorite Button
favoriteButton.addEventListener("click", function () 
{
    let cityName = city.innerText.replace("📍", "").trim();
    let favorites = getFromLocalStorage("favorites") || []; 

    if (favorites.includes(cityName))
    {
        favorites = favorites.filter(city => city !== cityName);

        saveToLocalStorage("favorites", favorites);
    } 
    else 
    {
        
        if (favorites.length >= 5) 
        {
            favorites.shift(); 
        }
        favorites.push(cityName);

        saveToLocalStorage("favorites", favorites); 
    }

    updateFavoritesUI();
});

// Search Button Input
searchBtn.addEventListener("click", async function () 
{
    let foodData = await grabRandomFood();

    const cityName = searchBar.value.trim();

    if (!cityName) 
    {
        return;
    }

    // Grab Geo API
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${myKey}`);
    const geoData = await response.json();

    if (!geoData || geoData.length === 0) 
    {
        alert("City not found. Please enter a valid city name."); // Make placeholser text or something 
        return;
    }
    const {lat, lon} = geoData[0];
    const weatherData = await getAPI(lat, lon);
    const weekData = await getWeekAPI(lat, lon);

    // Local Storage
    saveToLocalStorage("weatherData", weatherData);
    saveToLocalStorage("weekData", weekData);
    saveToLocalStorage("foodData", foodData)
    updateUI(weatherData, weekData, foodData);
});

// DOM
async function updateUI(weatherData, weekData) 
{
    const weatherIconData = weatherData.list[0].weather[0].icon;
    const grabWeatherIcon = `https://openweathermap.org/img/wn/${weatherIconData}@2x.png`;

    currentTemp.innerText = Math.trunc(weatherData.list[0].main.temp);
    lowTemp.innerText = Math.trunc(weatherData.list[0].main.temp_min);
    highTemp.innerText = Math.trunc(weatherData.list[0].main.temp_max);
    city.innerText = `📍 ${weatherData.city.name}, ${weatherData.city.country}`;
    weatherIcon.src = grabWeatherIcon;
    console.log(grabWeatherIcon);
    
    // Weekly tabs
    const days = [day1, day2, day3, day4];
    const weatherIcons = [weatherIcon1, weatherIcon2, weatherIcon3, weatherIcon4];
    const dayWeek = [dayWeek1, dayWeek2, dayWeek3, dayWeek4];

    for (let i = 1; i < 5; i++) 
    {
        const dayData = weekData.daily[i];
        const dayName = weekData.daily[i];
        const dayNameDate = new Date(dayName.dt * 1000);
        const weekDataIcon = weekData.daily[i].weather[0].icon;

        days[i - 1].innerText = Math.round(dayData.temp.day);
        weatherIcons[i - 1].src = `https://openweathermap.org/img/wn/${weekDataIcon}@2x.png`;
        dayWeek[i - 1].innerText = daysOfWeek[dayNameDate.getDay()];
    }

    //Recommend Tab
    let recommendTab = await grabRandomFood();

    let foodKey = Object.keys(recommendTab);
    let foodValue = Object.values(recommendTab);

    recKey.innerText = foodKey + ":";
    recValue.innerText = foodValue;
    console.log(recommendTab);
}

// Favorite Tab
function updateFavoritesUI() 
{
    let favorites = getFromLocalStorage("favorites") || [];

    favoriteList.innerHTML = ""; 

    favorites.forEach(city => 
    {
        let listItem = document.createElement("li");
        listItem.textContent = city;


        // Remove
        let removeBtn = document.createElement("removeButton");
        removeBtn.textContent = " - Remove";
        removeBtn.onclick = () => removeFavorite(city);

        listItem.appendChild(removeBtn);
        
        favoriteList.appendChild(listItem);
    });
    console.log("Favorites UI updated:", favorites);
}

// Global Save
document.addEventListener("DOMContentLoaded", function () {
    updateFavoritesUI(); // Update favorites list UI on page load

    const savedWeatherData = getFromLocalStorage("weatherData");
    const savedWeekData = getFromLocalStorage("weekData");
    const savedFoodData = getFromLocalStorage("foodData");

    if (savedWeatherData && savedWeekData && savedFoodData) {
        console.log("Local storage data: ", savedWeatherData, savedWeekData, savedFoodData);
        updateUI(savedWeatherData, savedWeekData, savedFoodData);
    } else {
        console.log("No local storage data found.");
    }
});

// Functions

// Get Food
async function grabRandomFood(currentTemp) 
{
    const data = await getFoodData();
    if (!data) return;
    
    let tempLimit = 75;
    let foodArray = currentTemp >= tempLimit ? data.food.cold : data.food.hot;
    let randomIndex = Math.floor(Math.random() * foodArray.length);
    return foodArray[randomIndex];
}

// Remove from favorites
function removeFavorite(cityName) 
{
    let favorites = getFromLocalStorage("favorites") || [];
    favorites = favorites.filter(city => city !== cityName);
    console.log("Removed from favorites:", cityName);
    console.log("Updated favorites:", favorites);

    saveToLocalStorage("favorites", favorites);
    updateFavoritesUI();
}

