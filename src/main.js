// main.js
import axios from "axios";
const api = "http://localhost:3000/users";

// Render the principal UI
function renderForm() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 2rem;
        background-color: #f4f4f4;
      }
      h1 {
        color: #333;
      }
      form {
        margin-bottom: 1rem;
      }
      input, button {
        margin-right: 0.5rem;
        padding: 0.3rem;
      }
      ul {
        background-color: #fff;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      #interactionCountDisplay {
        color: #333;
        font-weight: bold;
      }
      #lastSavedUser {
        font-style: italic;
        color: #555;
      }
    </style>

    <h1>User Register</h1>
    <form id="userForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" required>
      <button type="submit" id="saveButton">Save data</button>
      <button type="button" id="clearButton">Clear users</button>
      <button type="button" id="resetInteractions">Restart interactions</button>
    </form>
    <div id="output"></div>
    <div id="interactionCountDisplay"></div>
    <div id="lastSavedUser"></div>
  `;

  document.getElementById("userForm").addEventListener("submit", e => {
    e.preventDefault();
    handleSave();
    updateInteractionCount();
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    handleClear();
    updateInteractionCount();
  });

  document.getElementById("resetInteractions").addEventListener("click", resetInteractionCount);

  displayUsers();
  displayInteractionCount();
}

// Save one user in database
function handleSave() {
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value);

  if (!name || isNaN(age)) {
    alert("Please insert a valid name and number age.");
    return;
  }

  const newUser = { name, age };

  axios.get(api)
    .then(res => {
      const users = res.data;
      const exists = users.some(u => normalize(u.name) === normalize(name));

      if (exists) {
        alert("This user already exists.");
        return;
      }

      return axios.post(api, newUser);
    })
    .then(res => {
      if (res) {
        document.getElementById("lastSavedUser").textContent =
          `Last user saved: ${res.data.name}, ${res.data.age} years old.`;
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        displayUsers();
      }
    })
    .catch(err => console.error("Error saving user:", err));
}

function normalize(str) {
  return str.trim().toLowerCase();
}

// Show all users from json-server
function displayUsers() {
  axios.get(api)
    .then(res => {
      const users = res.data;
      const output = document.getElementById("output");

      if (users.length > 0) {
        output.innerHTML = "<h3>Registered Users:</h3><ul>" +
          users.map(u => `<li>${u.name}, ${u.age} years old</li>`).join("") +
          "</ul>";
      } else {
        output.textContent = "There are no users.";
      }
    })
    .catch(err => console.error("Error loading users:", err));
}

// Delete all users
function handleClear() {
  axios.get(api)
    .then(res => {
      const deletePromises = res.data.map(user =>
        axios.delete(`${api}/${user.id}`)
      );
      return Promise.all(deletePromises);
    })
    .then(() => {
      document.getElementById("lastSavedUser").textContent = "";
      displayUsers();
    })
    .catch(err => console.error("Error deleting users:", err));
}

// Add one interaction
function updateInteractionCount() {
  let count = parseInt(sessionStorage.getItem("interactionCount")) || 0;
  count++;
  sessionStorage.setItem("interactionCount", count);
  displayInteractionCount();
}

// Show the interaction counter
function displayInteractionCount() {
  const count = sessionStorage.getItem("interactionCount") || "0";
  document.getElementById("interactionCountDisplay").textContent =
    `Interactions in this session: ${count}`;
}

// Restart the counter to zero
function resetInteractionCount() {
  sessionStorage.setItem("interactionCount", "0");
  displayInteractionCount();
}

// Start all app
function init() {
  if (!sessionStorage.getItem("interactionCount")) {
    sessionStorage.setItem("interactionCount", "0");
  }
  renderForm();
}

// Run when page load
window.addEventListener("DOMContentLoaded", init);
