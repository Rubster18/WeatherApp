const kelvinTemp = 273;
//const apiKey = "bd231dae6e6543c08e48120bb7214b0c";
const apiKey ="&appid=379977dd9efc9c834bc08b24149ae8c1";

const mapApiKey ="AIzaSyDkUQmYKVXAqmvTclQG8Edff38YsNPSsu8"
let city;


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

//errors?

function errorFunction(error){
    boxNoti.style.display ="block";
    boxNoti.innerHTML = `<p> ${error.message}</p>`;
}
//get user input



const cityCheck = () => {
    city = document.querySelector(".city").value;
    getWeather(city);
}

//use api for weather object


function getWeather(city) {
    let api ="http://api.openweathermap.org/data/2.5/weather?q=";
    var completeURL = api + city + apiKey;
    console.log(completeURL);

  fetch(completeURL)
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
let lat = position.coords.latitude;
let lng = position.coords.longitude;

function initMap () {
    //map options
    let options = {
        zoom: 8,
        center: {lat:lat , lng:lng }
    }
    // create map
    let map = new google.map.Map(document.querySelector(".map"), options);

    //add marker
    let marker = new google.maps.Marker( {position: {lat:lat , lng:lng }, map: map});
}