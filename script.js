const form = document.querySelector("[data-form]");

class Weather {
  constructor(text, tempCelc) {
    this.text = text;
    this.tempCelc = tempCelc;
  }
  getWeather() {
    return this.text;
  }
  getTemp() {
    return this.tempCelc;
  }
}

class Location {
  constructor(region, country, month) {
    this.region = region;
    this.country = country;
    this.month = month;
  }
  getRegion() {
    return this.region;
  }
  getCountry() {
    return this.country;
  }
  getMonth() {
    return this.month;
  }
}

function getQuery() {
  const input = document.querySelector("[data-input]").value;
  const apiKey = "3e8b9febda644a9eb79151126232709";
  return `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}`;
}

async function getData() {
  try {
    const response = await fetch(getQuery(), { mode: "cors" });
    const weatherApiData = await response.json();

    const locationRegion = weatherApiData.location.name;
    const locationCountry = weatherApiData.location.country;
    const locationTime = weatherApiData.location.localtime;

    const weatherText = weatherApiData.current.condition.text;
    const temperatureC = weatherApiData.current.temp_c;

    const weather = new Weather(weatherText, temperatureC);
    const location = new Location(
      locationRegion,
      locationCountry,
      getMonth(locationTime)
    );
    console.log(weatherApiData);
    render(weather, location);
  } catch (err) {
    console.log(err);
  }
}

const getMonth = (string) => {
  const arr = string.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month_index = parseInt(arr[1], 10) - 1;
  return months[month_index];
};

const render = (weather, location) => {
  const month = document.querySelector("[data-month]");
  const country = document.querySelector("[data-country]");
  const weatherText = document.querySelector("[data-weather]");
  const tempC = document.querySelector("[data-temp]");

  month.innerText = location.getMonth();
  country.innerHTML = location.getRegion() + "," + location.getCountry();
  weatherText.innerText = weather.getWeather();
  tempC.innerText = weather.getTemp() + "°C";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData();
});
