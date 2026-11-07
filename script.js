// Storage Key for local persistence
var STORAGE_KEY = "virtualDogParkPetV1";

// Breed to local SVG mapping
var BREED_ASSETS = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// Current active dog state
var currentDog = null;

// DOM Elements
var adoptionForm = document.getElementById("adoption-form");
var breedSelect = document.getElementById("breed-select");
var nameInput = document.getElementById("dog-name-input");
var formError = document.getElementById("form-error");

var petDashboard = document.getElementById("pet-dashboard");
var petAvatar = document.getElementById("pet-avatar");
var displayName = document.getElementById("display-name");
var displayBreed = document.getElementById("display-breed");
var displayDay = document.getElementById("display-day");
var displayStage = document.getElementById("display-stage");
var displayHappiness = document.getElementById("display-happiness");
var growthBar = document.getElementById("growth-bar");
var petMessage = document.getElementById("pet-message");

var feedBtn = document.getElementById("feed-btn");
var playBtn = document.getElementById("play-btn");
var nextDayBtn = document.getElementById("next-day-btn");
var startOverBtn = document.getElementById("start-over-btn");

/**
 * Returns growth stage string according to day rules
 */
function stageFor(day) {
  if (day === 1) {
    return "Puppy";
  } else if (day === 2 || day === 3) {
    return "Young Dog";
  } else {
    return "Adult Dog";
  }
}

/**
 * Saves current dog state to browser localStorage
 */
function savePetToStorage() {
  if (currentDog) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentDog));
  }
}

/**
 * Restores dog state from browser localStorage if available
 */
function loadPetFromStorage() {
  var savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      currentDog = JSON.parse(savedData);
      renderPetUI("Welcome back to your dog!");
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
      currentDog = null;
    }
  }
}

/**
 * Handles adoption submission
 */
function handleAdopt(event) {
  event.preventDefault();

  var trimmedName = nameInput.value.trim();

  if (trimmedName.length === 0) {
    formError.textContent = "Please enter a valid dog name (cannot be blank).";
    return;
  }

  if (trimmedName.length > 20) {
    formError.textContent = "The dog name must not exceed 20 characters.";
    return;
  }

  formError.textContent = "";

  // Starting state: Day 1, Puppy, Happiness 50
  currentDog = {
    name: trimmedName,
    breed: breedSelect.value,
    day: 1,
    happiness: 50
  };

  nameInput.value = "";
  savePetToStorage();
  renderPetUI(currentDog.name + " has joined the dog park!");
}

/**
 * Feed handler: +10 happiness, maximum 100
 */
function handleFeed() {
  if (!currentDog) {
    return;
  }

  currentDog.happiness = Math.min(100, currentDog.happiness + 10);
  savePetToStorage();
  renderPetUI(currentDog.name + " enjoyed the meal! (+10 happiness)");
}

/**
 * Play handler: +10 happiness, maximum 100
 */
function handlePlay() {
  if (!currentDog) {
    return;
  }

  currentDog.happiness = Math.min(100, currentDog.happiness + 10);
  savePetToStorage();
  renderPetUI(currentDog.name + " enjoyed playing! (+10 happiness)");
}

/**
 * Next Day handler:
 * +1 day, -5 happiness (minimum 0)
 */
function handleNextDay() {
  if (!currentDog) {
    return;
  }

  currentDog.day += 1;
  currentDog.happiness = Math.max(0, currentDog.happiness - 5);

  savePetToStorage();
  var currentStage = stageFor(currentDog.day);
  renderPetUI("A new day has arrived. " + currentDog.name + " is now a " + currentStage + "! (-5 happiness)");
}

/**
 * Start Over handler:
 * Asks for confirmation; deletes data only on confirm
 */
function handleStartOver() {
  if (!currentDog) {
    return;
  }

  var confirmed = window.confirm("Are you sure you want to start over? This will remove your current dog and reset all progress.");

  if (confirmed) {
    localStorage.removeItem(STORAGE_KEY);
    currentDog = null;
    petDashboard.classList.add("hidden");
    nameInput.value = "";
    formError.textContent = "";
  }
}

/**
 * Updates UI and visual indicators safely using textContent
 */
function renderPetUI(message) {
  if (!currentDog) {
    return;
  }

  var currentStage = stageFor(currentDog.day);

  // Safe text rendering
  displayName.textContent = currentDog.name;
  displayBreed.textContent = currentDog.breed;
  displayDay.textContent = currentDog.day;
  displayStage.textContent = currentStage;
  displayHappiness.textContent = currentDog.happiness + "/100";

  // Avatar path mapping
  petAvatar.src = BREED_ASSETS[currentDog.breed] || "assets/beagle.svg";
  petAvatar.alt = "Illustration of " + currentDog.name + " the " + currentDog.breed;

  // Visual growth indicators (both avatar size and progress bar)
  if (currentStage === "Puppy") {
    petAvatar.className = "stage-puppy";
    growthBar.style.width = "33%";
  } else if (currentStage === "Young Dog") {
    petAvatar.className = "stage-young";
    growthBar.style.width = "66%";
  } else {
    petAvatar.className = "stage-adult";
    growthBar.style.width = "100%";
  }

  petMessage.textContent = message || "";
  petDashboard.classList.remove("hidden");
}

// Event Listeners
adoptionForm.addEventListener("submit", handleAdopt);
feedBtn.addEventListener("click", handleFeed);
playBtn.addEventListener("click", handlePlay);
nextDayBtn.addEventListener("click", handleNextDay);
startOverBtn.addEventListener("click", handleStartOver);

// Restore saved progress on page load or refresh
window.addEventListener("DOMContentLoaded", loadPetFromStorage);