import { places } from "../data/places.mjs";

const hamButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (hamButton && navBar) {
  hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("discover-last-visit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDifference = Math.floor((now - Number(lastVisit)) / 86400000);

    if (daysDifference < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  localStorage.setItem("discover-last-visit", now);
}

function displayCards() {
  cardsContainer.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    cardsContainer.appendChild(card);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

displayVisitMessage();
displayCards();