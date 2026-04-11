const hamButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const servicesContainer = document.querySelector("#services-container");
const modal = document.querySelector("#service-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalCompany = document.querySelector("#modal-company");
const closeModalButton = document.querySelector("#close-modal");
const lastService = document.querySelector("#last-service");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

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

async function loadServices() {
  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Services data was not loaded.");
    }

    const services = await response.json();

    displayServices(services);
    showLastService();
  } catch (error) {
    console.error(error);
    servicesContainer.innerHTML = "<p>Sorry, services are not available right now.</p>";
  }
}

function displayServices(services) {
  const servicesHTML = services.map((service) => {
    return `
      <article class="service-card">
        <h2>${service.name}</h2>
        <p><strong>Category:</strong> ${service.category}</p>
        <p><strong>Company:</strong> ${service.company}</p>
        <p>${service.description}</p>
        <p><strong>Price:</strong> ${service.priceNote}</p>
        <button class="learn-more" data-id="${service.id}">Learn More</button>
      </article>
    `;
  }).join("");

  servicesContainer.innerHTML = servicesHTML;

  const buttons = document.querySelectorAll(".learn-more");

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

function openModal(service) {
  modalTitle.textContent = service.name;
  modalCategory.textContent = `Category: ${service.category}`;
  modalDescription.textContent = service.details;
  modalCompany.textContent = `Company: ${service.company} | Price: ${service.priceNote}`;

  localStorage.setItem("lastServiceViewed", service.name);

  if (modal) {
    modal.showModal();
  }

  showLastService();
}

function showLastService() {
  const savedService = localStorage.getItem("lastServiceViewed");

  if (savedService) {
    lastService.textContent = savedService;
  } else {
    lastService.textContent = "No service viewed yet.";
  }
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    const dialogBox = modal.getBoundingClientRect();
    const clickedInside =
      event.clientX >= dialogBox.left &&
      event.clientX <= dialogBox.right &&
      event.clientY >= dialogBox.top &&
      event.clientY <= dialogBox.bottom;

    if (!clickedInside) {
      modal.close();
    }
  });
}

loadServices();