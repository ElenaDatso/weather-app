//Navigation bar-------------------------------------------------------------------------------------
const searchForm = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const citySpan = document.querySelector('.the-city');
const temperatureSpan = document.getElementById('current-temp');
const currentLocationBtn = document.getElementById('get-location');

const now = new Date();
const dayNum = now.getDay();
const hour = now.getHours();
const minutes = now.getMinutes();
const date = now.getDate();
const monthNum = now.getMonth();

const currentWeekDay = document.getElementById('week-day');
const currentHours = document.getElementById('hours');
const currentMinutes = document.getElementById('minutes');
const currentDate = document.getElementById('date');
const currentMonth = document.getElementById('month');

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '4d80f4196b972622c7113645a58d336a';
const metricUnits = 'metric';


// current time---------------------------------------------------------------------------------------

const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekDayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];


currentWeekDay.innerHTML = weekDayName[dayNum];
currentHours.innerHTML = hour;
currentMinutes.innerHTML = minutes;
currentDate.innerHTML = date;
currentMonth.innerHTML = monthName[monthNum];

//City get & display---------------------------------------------------------------------------------------------------


searchForm.addEventListener('submit', displayTheCity);

function displayTheCity(event) {
  event.preventDefault();
  let cityValue = searchInput.value;
  citySpan.innerHTML = searchInput.value;
  axios
    .get(`${apiUrl}q=${cityValue}&appid=${apiKey}&units=${metricUnits}`)
    .then(displayTheTemperature);
  searchInput.value = '';
}

function displayTheTemperature(response) {
  temperatureSpan.innerHTML = Math.round(response.data.main.temp);
}
//API get and display current location-----------------------------------------------------------------------------------+

const apiGetLocationUrl = 'http://api.openweathermap.org/geo/1.0/reverse?';

currentLocationBtn.addEventListener('click', getLocation);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchDetails);
}

function fetchDetails(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  axios
    .get(`${apiGetLocationUrl}lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
    .then(displayCurCity);
}

const displayCurCity = (response) => {
  citySpan.innerHTML = response.data[0].name.split(' ')[0];
  axios
    .get(
      `${apiUrl}q=${
        response.data[0].name.split(' ')[0]
      }&appid=${apiKey}&units=${metricUnits}`
    )
    .then(displayCurTemp);
};

function displayCurTemp(response) {
  temperatureSpan.innerHTML = Math.round(response.data.main.temp);
}

//temperature units switch-------------------------------------------------------------------------------------------------

const celciumUnit = document.getElementById('C');
const farengeitUnit = document.getElementById('F');

celciumUnit.addEventListener('click', displayCelc);
farengeitUnit.addEventListener('click', displayFareng);

function displayCelc(event) {
  event.preventDefault();
  if (celciumUnit.classList.contains('active')) {
    temperatureSpan.innerHTML = 16;
  } else {
    celciumUnit.classList.add('active');
    celciumUnit.classList.remove('not-active');
    farengeitUnit.classList.add('not-active');
    farengeitUnit.classList.remove('active');
    temperatureSpan.innerHTML = 16;
  }
}

function displayFareng(event) {
  event.preventDefault();
  if (farengeitUnit.classList.contains('active')) {
    temperatureSpan.innerHTML = 66;
  } else {
    farengeitUnit.classList.add('active');
    farengeitUnit.classList.remove('not-active');
    celciumUnit.classList.remove('active');
    celciumUnit.classList.add('not-active');
    temperatureSpan.innerHTML = 66;
  }
}

// API weather ---------------------------------------------------------------------------------

// const city = prompt('Enter the city!').toLowerCase().trim();
// let ifTrueCity = weather[city];
// if (city.length === 0) {
//   alert('You havent chosen the city');
// } else if (ifTrueCity) {
//   alert(
//     `It is currently ${Math.round(weather[city].temp)}°C (${Math.round(
//       (weather[city].temp * 5) / 9 + 32
//     )}°F) in ${city} with a humidity of ${weather[city].humidity}%`
//   );
// } else if (!ifTrueCity) {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }
