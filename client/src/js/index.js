import { toggleForm, clearForm } from "./form";
import "../css/index.css";
import { fetchCards } from "./cards";
import { initDB, getDB, postDB, deleteDB } from "./database";
import { Tooltip, Toast, Popover } from "bootstrap";

import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});

window.addEventListener("load", function () {
  initDB();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
  fetchCards();
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDB(name, email, phone, profile);
  } else {
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
    // Grab ID from the button element attached to the contact card
    let id = parseInt(e.id);
    // Delete the card
    deleteDB(id);
    // Reload the ROM
    fetchCards();
};

window.editCard = (e) => {
    profileId = parseInt(e.dataset.id);

    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;

    form.style.display = "block";

    // Toggles the Submit button so that it now Updates an existing contact instead of posting a new one
    submitBtnToUpdate = true;
};

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
  navigator.serviceWorker.register('./service-worker.js');
})};