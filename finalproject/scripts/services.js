const hamButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const servicesContainer = document.querySelector("#services-container");
const modal = document.querySelector("#service-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalCompany = document.querySelector("#modal-company");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");
const closeModalButton = document.querySelector("#close-modal");
const lastService = document.querySelector("#last-service");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// simple responsive menu
if (hamButton && navBar) {
  hamButton.addEventListener("click", () => {
    navBar.classList.toggle("show");
    hamButton.classList.toggle("show");

    const expanded = hamButton.classList.contains("show");
    hamButton.setAttribute("aria-expanded", expanded);
  });
}

// footer dates
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// show last service from localStorage
function displayLastService() {
  const savedService = localStorage.getItem("lastServiceViewed");

  if (lastService) {
    if (savedService) {
      lastService.textContent = savedService;
    } else {
      lastService.textContent = "No service viewed yet.";
    }
  }
}

// open modal with service details
function openModal(service) {
  if (!modal) return;

  modalTitle.textContent = service.name;
  modalCategory.textContent = `Category: ${service.category}`;
  modalCompany.textContent = `Company: ${service.company}`;
  modalDescription.textContent = service.details;
  modalPrice.textContent = `Price Note: ${service.priceNote}`;

  localStorage.setItem("lastServiceViewed", service.name);
  displayLastService();

  modal.showModal();
}

// build service cards
function displayServices(services) {
  if (!servicesContainer) return;

  const cards = services.map((service) => {
    return `
      <article class="service-card">
        <h2>${service.name}</h2>
        <p><strong>Category:</strong> ${service.category}</p>
        <p><strong>Company:</strong> ${service.company}</p>
        <p>${service.description}</p>
        <p><strong>Featured:</strong> ${service.featured ? "Yes" : "No"}</p>
        <button type="button" class="learn-more-btn" data-id="${service.id}">Learn More</button>
      </article>
    `;
  }).join("");

  servicesContainer.innerHTML = cards;

  const buttons = document.querySelectorAll(".learn-more-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceId = Number(button.dataset.id);
      const selectedService = services.find((service) => service.id === serviceId);

      if (selectedService) {
        openModal(selectedService);
      }
    });
  });
}

// fetch local JSON
async function getServices() {
  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Services data could not be loaded.");
    }

    const data = await response.json();
    displayServices(data);
  } catch (error) {
    console.error(error);

    if (servicesContainer) {
      servicesContainer.innerHTML = "<p>Services are not available right now.</p>";
    }
  }
}

// close modal button
if (closeModalButton && modal) {
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
}

// close modal when clicking outside
if (modal) {
  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      modal.close();
    }
  });
}

displayLastService();
getServices();