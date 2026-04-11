const hamButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");

const testimonialsContainer = document.querySelector("#testimonials");

const apiKey = "a6d43ff69ad066b14fb2f04047830d42";
const lat = 40.2338;
const lon = -111.6585;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

if (hamButton && navBar) {
  hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error("Weather data was not loaded.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error(error);

    if (currentTemp) {
      currentTemp.textContent = "Unavailable";
    }

    if (weatherDesc) {
      weatherDesc.textContent = "Weather service unavailable.";
    }
  }
}

function displayWeather(data) {
  if (!currentTemp || !weatherDesc || !weatherIcon) return;

  currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
  weatherDesc.textContent = capitalizeWords(data.weather[0].description);

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", data.weather[0].description);
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function getTestimonials() {
  try {
    const response = await fetch("data/testimonials.json");

    if (!response.ok) {
      throw new Error("Testimonials data was not loaded.");
    }

    const data = await response.json();
    displayTestimonials(data);
  } catch (error) {
    console.error(error);

    if (testimonialsContainer) {
      testimonialsContainer.innerHTML = "<p>Testimonials are not available right now.</p>";
    }
  }
}

function displayTestimonials(testimonials) {
  if (!testimonialsContainer) return;

  const selectedTestimonials = testimonials.slice(0, 3);

  const cards = selectedTestimonials.map((item) => {
    const stars = "★".repeat(item.rating);

    return `
      <article class="testimonial-card">
        <img src="${item.image}" alt="${item.name}" width="300" height="300" loading="lazy">
        <h3>${item.name}</h3>
        <p class="testimonial-service">${item.service}</p>
        <p class="testimonial-stars">${stars}</p>
        <p class="testimonial-text">${item.text}</p>
      </article>
    `;
  }).join("");

  testimonialsContainer.innerHTML = cards;
}

getWeather();
getTestimonials();