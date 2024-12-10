import { myKey } from "./scripts/key.js"


// Current weather tab
let currentTemp = document.getElementById("currentTemp");
let lowTemp = document.getElementById("lowTemp")
let highTemp = document.getElementById("highTemp");
let city = document.getElementById("city");
let weatherIcon = document.getElementById("weatherIcon");

// Recommend Tab
let recommend = document.getElementById("recommend");

// Favorite List 
let top5List = document.getElementById("top5List");
let top5 = [];

// Weather Tabs
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");

// Test Button
let testButton = document.getElementById("testButton");

async function getAPI()
{
    
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${myKey}`)    
    const data = await response.json();
    console.log(data.list);
    return data;
}
getAPI();

testButton.addEventListener("click", async function()
{
   let data = await getAPI();

   console.log("Current Day")
   console.log("The current temperature is " + data.list[0].main.temp);
   console.log(`Weather Icon: ${data.list[0].weather[0].description}`);
   console.log("The min temperature is " + data.list[0].main.temp_min);
   console.log("The max temperature is " + data.list[0].main.temp_max);

   currentTemp.innerText = data.list[0].main.temp;
   highTemp.innerText = data.list[0].main.temp_min;
   lowTemp.innerText = data.list[0].main.temp_min;
   weatherIcon.innerText = data.list[0].main.temp_min;
//    city.innerText = data.list[0].main.temp_min;
//    recommend.innerText = data.list[0].main.temp_min;

async function convertData()
{
    let data = await getAPI();

    console.log
}



   console.log("Tuesday")
   console.log("The current temperature is " + data.list[8].main.temp);
   console.log(`Weather Icon: ${data.list[8].weather[0].description}`);
   console.log("The min temperature is " + data.list[8].main.temp_min);
   console.log("The max temperature is " + data.list[8].main.temp_max);

   console.log("Wednsday")
   console.log("The current temperature is " + data.list[16].main.temp);
   console.log(`Weather Icon: ${data.list[16].weather[0].description}`);
   console.log("The min temperature is " + data.list[16].main.temp_min);
   console.log("The max temperature is " + data.list[16].main.temp_max);

   console.log("Thursday")
   console.log("The current temperature is " + data.list[24].main.temp);
   console.log(`Weather Icon: ${data.list[24].weather[0].description}`);
   console.log("The min temperature is " + data.list[24].main.temp_min);
   console.log("The max temperature is " + data.list[24].main.temp_max);

   console.log("Friday")
   console.log("The current temperature is " + data.list[34].main.temp);
   console.log(`Weather Icon: ${data.list[34].weather[0].description}`);
   console.log("The min temperature is " + data.list[34].main.temp_min);
   console.log("The max temperature is " + data.list[34].main.temp_max);
});
