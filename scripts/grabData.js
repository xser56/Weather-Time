import { myKey } from "./key.js";
 
async function getAPI(lat, lon) 
{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`);
    const data = await response.json();
    return data;
}

async function getWeekAPI(lat, lon) 
{
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?exclude=minutely,alerts,hourly&lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`);
    const data = await response.json();
    return data;
}

async function getFoodData() 
{
    const response = await fetch("./data/food.json");
    const data = await response.json();
    return data;
}

export {getAPI, getWeekAPI, getFoodData}