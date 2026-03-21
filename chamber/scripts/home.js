const apiKey = "a274b56154d36c0337aa0b89d8bd6196";
const lat = 40.2338;
const lon = -111.6585;

const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");
const forecastList = document.querySelector("#forecast-list");
const spotlightContainer = document.querySelector("#spotlights");

const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

if (navButton && navBar) {
  navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}

async function apiFetch() {
  try {
    const responseCurrent = await fetch(urlCurrent);
    const dataCurrent = await responseCurrent.json();
    displayCurrentWeather(dataCurrent);

    const responseForecast = await fetch(urlForecast);
    const dataForecast = await responseForecast.json();
    displayForecast(dataForecast.list);
  } catch (error) {
    console.error(error);
    currentTemp.textContent = "Unavailable";
    weatherDesc.textContent = "Weather service unavailable.";
    forecastList.innerHTML = "<p>Forecast unavailable.</p>";
  }
}

function displayCurrentWeather(data) {
  currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
  weatherDesc.textContent = capitalizeWords(data.weather[0].description);

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", data.weather[0].description);
}

function displayForecast(list) {
  forecastList.innerHTML = "";

  const groupedDays = groupForecastByDay(list);
  const selectedDays = groupedDays.slice(0, 3);

  selectedDays.forEach((day, index) => {
    const item = document.createElement("div");
    item.classList.add("forecast-day");

    const date = new Date(day.dt_txt);
    const label = index === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "long" });

    item.innerHTML = `<span>${label}</span><span>${Math.round(day.main.temp)}°F</span>`;

    forecastList.appendChild(item);
  });
}

function groupForecastByDay(list) {
  const days = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!days[date]) {
      days[date] = item;
    }
  });

  return Object.values(days);
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const filteredMembers = data.members.filter(
      (member) => member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error(error);

    if (spotlightContainer) {
      spotlightContainer.innerHTML = "<p>Spotlights unavailable.</p>";
    }
  }
}

function displaySpotlights(members) {
  if (!spotlightContainer) return;

  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const image = document.createElement("img");
    image.setAttribute("src", member.image);
    image.setAttribute("alt", `${member.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "300");
    image.setAttribute("height", "200");

    const phone = document.createElement("p");
    phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

    const address = document.createElement("p");
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;

    const website = document.createElement("p");
    website.innerHTML = `<strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`;

    const membership = document.createElement("p");
    membership.innerHTML = `<strong>Membership:</strong> ${getMembershipLevel(member.membership)}`;

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(website);
    card.appendChild(membership);

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 2) return "Silver";
  if (level === 3) return "Gold";
  return "Member";
}

apiFetch();
getSpotlights();

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;