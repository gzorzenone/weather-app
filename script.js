async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e278f23e4e77493488e134141230509&q=${location}&days=3&aqi=no&alerts=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();

  return weatherData;
}

const Weather = (location, days) => {
  return {
    location,
    days,
  };
};

function processWeatherData(weatherData) {
  let day1Date = weatherData.forecast.forecastday[0].date;
  let day1MaxTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
  let day1MinTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
  let day2Date = weatherData.forecast.forecastday[1].date;
  let day2MaxTemp = weatherData.forecast.forecastday[1].day.maxtemp_c;
  let day2MinTemp = weatherData.forecast.forecastday[1].day.mintemp_c;
  let day3Date = weatherData.forecast.forecastday[2].date;
  let day3MaxTemp = weatherData.forecast.forecastday[2].day.maxtemp_c;
  let day3MinTemp = weatherData.forecast.forecastday[2].day.mintemp_c;

  return Weather(
    weatherData.location.name,
    [
      {
        day1Date,
        day1MaxTemp,
        day1MinTemp,
      },
      {
        day2Date,
        day2MaxTemp,
        day2MinTemp,
      },
      {
        day3Date,
        day3MaxTemp,
        day3MinTemp,
      },
    ],
  );
}

const form = document.querySelector("form");
const container = document.querySelector(".container");
const locationTxt = document.querySelector("#location");

form.addEventListener("submit", (event) => {
  (async () => {
    const weatherData = processWeatherData(await getWeatherData(locationTxt.value));

    const locationDiv = document.createElement("div");
    locationDiv.classList.add("location");
    locationDiv.textContent = weatherData.location;
    container.appendChild(locationDiv);

    weatherData.days.forEach((value, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const date = document.createElement("div");
      date.classList.add("date");
      date.textContent = Object.values(weatherData.days[index])[0];
      card.appendChild(date);

      const maxTemp = document.createElement("div");
      maxTemp.classList.add("max-temp");
      maxTemp.textContent = "Max. Temperature: " + Object.values(weatherData.days[index])[1] + "°C";
      card.appendChild(maxTemp);

      const minTemp = document.createElement("div");
      minTemp.classList.add("min-temp");
      minTemp.textContent = "Min. Temperature: " + Object.values(weatherData.days[index])[2] + "°C";
      card.appendChild(minTemp);

      container.appendChild(card);
    });
  })();

  event.preventDefault();
});