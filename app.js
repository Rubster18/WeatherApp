
const kelvinTemp = 273;
//const apiKey = "bd231dae6e6543c08e48120bb7214b0c";
const apiKey ="0bc9ec7bb66a4bbda7e92c0aca433251";

var userInputs = document.querySelector(".city").value;

//selection of weather box items

const boxNoti = document.querySelector(".notification");
const boxIcon = document.querySelector(".weather-icon");
const boxTemperature = document.querySelector(".temperature-value p");
const boxDescrip = document.querySelector(".temperature-description p");
const boxLocal = document.querySelector(".location p");



const weather = {};

weather.temperature = {
    unit: "celcius"
}

/* //user browser and/or denies
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, errorFunction);
}else{
    boxNoti.style.display ="block";
    boxNoti.innerHTML = "<p> Browser doesn't use geolocation</p>";
} */

//position 

function setPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeather(lat, lon);
}

//errors?

function errorFunction(error){
    boxNoti.style.display ="block";
    boxNoti.innerHTML = `<p> ${error.message}</p>`;
}

//use api for weather object

function getWeather(lat, lon) {
    let api ='http://api.openweathermap.org/data/2.5/weather?q=`${city}`&appid=379977dd9efc9c834bc08b24149ae8c1';
  console.log(api);
  fetch(api)
    .then(function(response){
        let recieving = response.json();
        return recieving; 
    })
    .then (function(recieving){
        weather.temperature.value = Math.floor(recieving.main.temp - kelvinTemp); 
        weather.description = recieving.weather[0].description;
        weather.iconId = recieving.weather[0].icon;
        weather.country = recieving.sys.country;
        weather.city = recieving.name;
    })
    .then(function(){
        displayWeather();
    })
}

//changes in HTML

function displayWeather(){
    boxIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    boxTemperature.innerHTML = `${weather.temperature.value}º<span>C</span>`;
    boxDescrip.innerHTML = `<p>${weather.description}</p>`;
    boxLocal.innerHTML = `<p>${weather.country}, ${weather.city}`;
}
