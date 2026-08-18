const items = [
  { name: "Persona 5 Royal", year: 2020, console: "PlayStation 4" },
  { name: "The legend of Zelda: Twilight princess", year: 2006, console: "Nintendo Wii" },
  { name: "Genshin impact", year: 2023, console: "PC" },
  { name: "Grand Theft Auto V", year: 2013, console: "PlayStation 4" },
  { name: "The legend of Zelda: Tears of the kingdom", year: 2023, console: "Nintendo Switch" },
  { name: "Expedition 33", year: 2025, console: "PC" }
];

const collectionList = document.querySelector("#collection-list");
const collectionFilter = document.querySelector("#collection-filter");
const noResults = document.querySelector("#no-results");
const itemForm = document.querySelector("#item-form");

function createItemElement(item, index) {
  const article = document.createElement("article");
  article.classList.add("collection-item");
  article.dataset.index = index;

  const heading = document.createElement("h3");
  heading.textContent = item.name;

  const year = document.createElement("p");
  year.textContent = `Release year: ${item.year}`;

  const consolePlayed = document.createElement("p");
  consolePlayed.textContent = `Console: ${item.console}`;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("remove-item");
  removeButton.textContent = "Remove";

  article.append(
    heading,
    year,
    consolePlayed,
    removeButton
  );

  return article;
}

function renderItems() {
  const filterText = collectionFilter.value.trim().toLowerCase();
  collectionList.textContent = "";
  const filteredItems = items.filter((item) => {
    const searchableText =
      `${item.name} ${item.year} ${item.console}`.toLowerCase();
    return searchableText.includes(filterText);
  });

  filteredItems.forEach((item) => {
    const originalIndex = items.indexOf(item);
    const itemElement = createItemElement(
      item,
      originalIndex
    );
    collectionList.append(itemElement);
  });

  if (filteredItems.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }
}

collectionFilter.addEventListener("input", renderItems);
itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#game-name");
  const yearInput = document.querySelector("#game-year");
  const consoleInput = document.querySelector("#game-console");
  const name = nameInput.value.trim();
  const year = yearInput.value.trim();
  const consolePlayed = consoleInput.value.trim();

  if (!name || !year || !consolePlayed) {
    return;
  }

  items.push({
    name: name,
    year: Number(year),
    console: consolePlayed
  });

  itemForm.reset();

  renderItems();
});

collectionList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("remove-item")) {
    return;
  }
  const itemElement = event.target.parentElement;
  const index = Number(
    itemElement.dataset.index
  );

  items.splice(index, 1);
  renderItems();
});

const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const contactSuccess = document.querySelector("#contact-success");

function validateContactForm() {
  let isValid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  contactSuccess.textContent = "";

  if (nameInput.value.trim().length < 2) {
    nameError.textContent =
      "Please enter at least 2 characters.";
    isValid = false;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent =
      "Please enter a message with at least 10 characters.";
    isValid = false;
  }
  return isValid;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateContactForm()) {
    contactSuccess.textContent =
      "Your message is valid.";
    contactForm.reset();
  }
});

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim().length >= 2) {
    nameError.textContent = "";
  }
});

emailInput.addEventListener("input", () => {
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "";
  }
});

messageInput.addEventListener("input", () => {
  if (messageInput.value.trim().length >= 10) {
    messageError.textContent = "";
  }
});

const themeToggle =
  document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", () => {
  const darkModeIsActive =
    document.body.classList.toggle("dark-theme"); 
  themeToggle.setAttribute(
    "aria-pressed",
    darkModeIsActive
  );

  if (darkModeIsActive) {
    themeToggle.textContent = "Light mode";
  } else {
    themeToggle.textContent = "Dark mode";
  }
});

renderItems();