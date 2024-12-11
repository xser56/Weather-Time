import { myKey } from "./key.js";

let currentTemp = document.getElementById("currentTemp");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let city = document.getElementById("city");

let weatherIcon = document.getElementById("weatherIcon");
let weatherIcon2 = document.getElementById("weatherIcon2");
let weatherIcon3 = document.getElementById("weatherIcon3");
let weatherIcon4 = document.getElementById("weatherIcon4");

let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");

let rec = document.getElementById("rec");

// Test Button
let testButton = document.getElementById("testButton");

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

async function getFoodData() // Local data
{
    const response = await fetch("./data/food.json")
    const data = await response.json();
    console.log(data.food.cold[0].food1);
    return data;
}

testButtonRec.addEventListener("click", async function()
{
    let data = await getFoodData();
    rec.innerText = data.food.cold[0].food1;
});

// Test Shit
testButton.addEventListener("click", async function()
{
    let data = await getAPI();
    let weekData = await getWeekAPI();

    // Current Day
    weatherIcon.innerText = data.list[0].weather[0].icon;
    currentTemp.innerText = Math.trunc(data.list[0].main.temp);
    lowTemp.innerText = Math.trunc(data.list[0].main.temp_min);
    highTemp.innerText = Math.trunc(data.list[0].main.temp_max);
    city.innerText = data.city.name, data.city.country;

    // 1st Day
    weatherIcon1.innerText = weekData.daily[0].weather[0].icon;
    day1.innerText = Math.round(weekData.daily[0].temp.day);

    // 2nd Day
    weatherIcon2.innerText = weekData.daily[1].weather[0].icon;
    day2.innerText = Math.round(weekData.daily[1].temp.day);

    // 3rd Day
    weatherIcon3.innerText = weekData.daily[2].weather[0].icon;
    day3.innerText = Math.round(weekData.daily[2].temp.day);

    // 4th Day
    weatherIcon4.innerText = weekData.daily[3].weather[0].icon;
    day4.innerText = Math.round(weekData.daily[3].temp.day);

});
