const params = new URLSearchParams(window.location.search);

document.querySelector("#firstName").textContent = params.get("firstName") || "Not provided";
document.querySelector("#lastName").textContent = params.get("lastName") || "Not provided";
document.querySelector("#email").textContent = params.get("email") || "Not provided";
document.querySelector("#phone").textContent = params.get("phone") || "Not provided";
document.querySelector("#birthDate").textContent = params.get("birthDate") || "Not provided";
document.querySelector("#program").textContent = params.get("program") || "Not provided";
document.querySelector("#studyMode").textContent = params.get("studyMode") || "Not provided";

const interests = params.getAll("interest");
document.querySelector("#interest").textContent =
  interests.length > 0 ? interests.join(", ") : "None selected";

document.querySelector("#comments").textContent = params.get("comments") || "No comments"