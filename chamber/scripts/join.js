const hamButton = document.querySelector("#ham-btn");
const navigation = document.querySelector("#nav-bar");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const timestampField = document.querySelector("#timestamp");

if (hamButton && navigation) {
  hamButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
    hamButton.classList.toggle("show");
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

const modalLinks = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-btn");

modalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modalId = link.dataset.modal;
    const modal = document.querySelector(`#${modalId}`);

    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  });
});

const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      dialog.close();
    }
  });
});