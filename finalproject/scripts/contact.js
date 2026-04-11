const hamButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const submittedField = document.querySelector("#submitted");
const results = document.querySelector("#results");

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

// add date and time to hidden field
if (submittedField) {
  submittedField.value = new Date().toLocaleString("en-US");
}

// show form results on thankyou page
if (results) {
  const params = new URLSearchParams(window.location.search);

  results.innerHTML = `
    <p><strong>Name:</strong> ${params.get("name") || ""}</p>
    <p><strong>Phone:</strong> ${params.get("phone") || ""}</p>
    <p><strong>Email:</strong> ${params.get("email") || ""}</p>
    <p><strong>Service:</strong> ${params.get("service") || ""}</p>
    <p><strong>Message:</strong> ${params.get("message") || ""}</p>
    <p><strong>Submitted:</strong> ${params.get("submitted") || ""}</p>
  `;
}