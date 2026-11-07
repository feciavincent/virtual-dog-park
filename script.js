// Virtual Dog Park - Round 2 State and Logic

// Active pet state object
let currentDog = null;

// DOM Elements
const adoptionForm = document.getElementById("adoption-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("dog-name-input");
const formError = document.getElementById("form-error");

const petDashboard = document.getElementById("pet-dashboard");
const displayName = document.getElementById("display-name");
const displayBreed = document.getElementById("display-breed");
const displayDay = document.getElementById("display-day");
const displayStage = document.getElementById("display-stage");
const displayHappiness = document.getElementById("display-happiness");
const happinessBar = document.getElementById("happiness-bar");
const petMessage = document.getElementById("pet-message");

const feedBtn = document.getElementById("feed-btn");
const playBtn = document.getElementById("play-btn");

/**
 * Handles adoption form submission.
 * Validates input, initializes dog state, and renders the dashboard.
 */
function handleAdopt(event) {
  event.preventDefault();

  // Trim whitespace from both ends
  const rawName = nameInput.value;
  const trimmedName = rawName.trim();

  // Validate: non-empty check
  if (trimmedName.length === 0) {
    formError.textContent = "Please enter a valid dog name (cannot be blank).";
    return;
  }

  // Validate: 20 character length check
  if (trimmedName.length > 20) {
    formError.textContent = "The dog name must not exceed 20 characters.";
    return;
  }

  // Clear any existing error
  formError.textContent = "";

  // Initialize new dog state
  currentDog = {
    name: trimmedName,
    breed: breedSelect.value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  // Clear form input
  nameInput.value = "";

  // Render pet dashboard
  renderPetUI(`${currentDog.name} has joined the dog park!`);
}

/**
 * Feeds the dog (+10 happiness, max 100).
 */
function handleFeed() {
  if (!currentDog) return;

  // Add 10 happiness without exceeding 100
  currentDog.happiness = Math.min(100, currentDog.happiness + 10);
  renderPetUI(`${currentDog.name} enjoyed a tasty meal! (+10 happiness)`);
}

/**
 * Plays with the dog (+10 happiness, max 100).
 */
function handlePlay() {
  if (!currentDog) return;

  // Add 10 happiness without exceeding 100
  currentDog.happiness = Math.min(100, currentDog.happiness + 10);
  renderPetUI(`${currentDog.name} enjoyed the play time! (+10 happiness)`);
}

/**
 * Safely updates the pet dashboard using textContent.
 */
function renderPetUI(message) {
  if (!currentDog) return;

  // Safe insertion as plain text (prevents HTML/script injection)
  displayName.textContent = currentDog.name;
  displayBreed.textContent = currentDog.breed;
  displayDay.textContent = currentDog.day;
  displayStage.textContent = currentDog.stage;
  displayHappiness.textContent = `${currentDog.happiness} / 100`;

  // Update visual progress bar width
  happinessBar.style.width = `${currentDog.happiness}%`;

  // Show status feedback
  petMessage.textContent = message || "";

  // Ensure dashboard is visible
  petDashboard.classList.remove("hidden");
}

// Event Listeners
adoptionForm.addEventListener("submit", handleAdopt);
feedBtn.addEventListener("click", handleFeed);
playBtn.addEventListener("click", handlePlay);