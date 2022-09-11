import { toggleForm, clearForm } from "./form";
import "../css/index.css";
import { fetchCards } from "./cards";
import { initDB, getDB, postDB, deleteDB } from "./database";
import { Tooltip, Toast, Popover } from "bootstrap";

import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

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
    postDb(name, email, phone, profile);
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