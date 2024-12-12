import { myKey } from "./key.js";

let currentTemp = document.getElementById("currentTemp");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let city = document.getElementById("city");
let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");


let weatherIcon = document.getElementById("weatherIcon");
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
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

async function getAPI()
{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?=&lat=37.961632&lon=-121.275604&units=imperial&appid=${myKey}`);
    const data = await response.json();
    return data;
}

async function getWeekAPI() 
{
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?exclude=minutely,alerts,hourly&lat=37.961632&lon=-121.275604&appid=${myKey}&units=imperial`);
    const data = await response.json();
    return data;    
}

async function getFoodData() 
{
    const response = await fetch("./data/food.json")
    const data = await response.json();
    return data;
}

// Food Function 
async function grabRandomFood(currentTemp)
{

    let data = await getFoodData();
    let tempLimit = 75;
    let foodArray;

    if (currentTemp >= tempLimit)
    {
        foodArray = data.food.cold;
    }
    else
    {
        foodArray = data.food.hot;
    }
    let randomIndex = Math.floor(Math.random() * foodArray.length);

    return foodArray[randomIndex];
}

// Recommend Text
testButtonRec.addEventListener("click", async function()
{
    let recommendTab = await grabRandomFood();
    let foodKey = Object.keys(recommendTab);
    let foodValue = Object.values(recommendTab);

    recKey.innerText = foodKey + ":";
    recValue.innerText = foodValue;
    console.log(recommendTab);
});


searchBar.add


// API Test Shit
testButton.addEventListener("click", async function()
{
    let data = await getAPI();
    let weekData = await getWeekAPI();
    let recommendTab = await grabRandomFood();
    
    // Current Day
    weatherIcon.innerText = data.list[0].weather[0].icon;
    currentTemp.innerText = Math.trunc(data.list[0].main.temp);
    lowTemp.innerText = Math.trunc(data.list[0].main.temp_min);
    highTemp.innerText = Math.trunc(data.list[0].main.temp_max);
    city.innerText = `${data.city.name}, ${data.city.country}`;
    
    // Recommend Tab
    let foodKey = Object.keys(recommendTab);
    let foodValue = Object.values(recommendTab);
    recKey.innerText = foodKey + ":";
    recValue.innerText = foodValue;
    console.log(recommendTab);

    // 1st Day
    let day1Date = new Date(weekData.daily[1].dt * 1000);
    weatherIcon1.innerText = weekData.daily[0].weather[0].icon;
    day1.innerText = Math.round(weekData.daily[0].temp.day);
    dayWeek1.innerText = daysOfWeek[day1Date.getDay()]; 

    // 2nd Day
    let day2Date = new Date(weekData.daily[2].dt * 1000);
    weatherIcon2.innerText = weekData.daily[1].weather[0].icon;
    day2.innerText = Math.round(weekData.daily[1].temp.day);
    dayWeek2.innerText = daysOfWeek[day2Date.getDay()];

    // 3rd Day
    let day3Date = new Date(weekData.daily[3].dt * 1000);
    weatherIcon3.innerText = weekData.daily[2].weather[0].icon;
    day3.innerText = Math.round(weekData.daily[2].temp.day);
    dayWeek3.innerText = daysOfWeek[day3Date.getDay()];

    // 4th Day
    let day4Date = new Date(weekData.daily[4].dt * 1000);
    weatherIcon4.innerText = weekData.daily[3].weather[0].icon;
    day4.innerText = Math.round(weekData.daily[3].temp.day);
    dayWeek4.innerText = daysOfWeek[day4Date.getDay()];

});
