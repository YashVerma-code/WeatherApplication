const apikey = "573c7fd23cfba150269ece32b0f2300c";

const months = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec",];

const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

var today = new Date();
var date =days[today.getDay() - 1] +", " +today.getDate() +" " +months[today.getMonth()] +" " +today.getFullYear();

let btn = document.querySelector("button");
let currDateBox = document.querySelector(".date-time span");
currDateBox.innerHTML = date;

window.addEventListener("load", async () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=kanpur&appid=${apikey}`;
  await fillWeatherdetail(url);
  console.log("updated");
});

async function fillWeatherdetail(url) {
  try {
    let res = await axios.get(url);
    let dataArr = res.data;
    console.log(dataArr);
    let temp = document.querySelector(".temperature span");
    let mintemp = document.querySelector(".min-temp");
    let maxtemp = document.querySelector(".max-temp");
    let windSpeed = document.querySelector(".wind-speed");
    let humidity = document.querySelector(".humidity-value");
    let loactionName = document.querySelector(".location span");
    let weatherImage = document.querySelector(".weather-image");
    loactionName.innerHTML = dataArr.name;
    // dataArr.name.charAt(0).toUpperCase() + dataArr.name.slice(1).toLowerCase();

    if (dataArr.weather[0].main == "Clouds") {
      weatherImage.style.backgroundImage=`url('/images/clouds.gif')`;
    } else if (dataArr.weather[0].main == "Rain") {
      weatherImage.style.backgroundImage=`url('/images/rain.gif')`;
    } else if (dataArr.weather[0].main == "Clear") {
      weatherImage.style.backgroundImage=`url('/images/sunny.gif')`;
    } else if (dataArr.weather[0].main == "Mist") {
      weatherImage.style.backgroundImage=`url('/images/mist.gif')`;
    } else if (dataArr.weather[0].main == "Snow") {
      weatherImage.style.backgroundImage=`url('/images/snow.gif')`;
    } else if (dataArr.weather[0].main == "Drizzle") {
      weatherImage.style.backgroundImage=`url('/images/sky-clouds.gif')`;
    }else{
      console.log("else part executed");
    }
    mintemp.innerHTML = dataArr.main.temp_min + "&deg;" + " C";
    maxtemp.innerHTML = dataArr.main.temp_max + "&deg;" + " C";
    windSpeed.innerHTML = dataArr.wind.speed + " Km/hr";
    humidity.innerHTML = dataArr.main.humidity + " %";
    temp.innerHTML = dataArr.main.temp + " &deg;" + "C";
  } catch (err) {
    console.log("Error!:-- " + err);
  }
}

btn.addEventListener("click", async () => {
  let place = document.querySelector(".inputText input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${place}&appid=${apikey}`;
  await fillWeatherdetail(url);
});
