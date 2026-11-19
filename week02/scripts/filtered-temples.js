// Footer: current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu
const menuButton = document.getElementById("menu-button");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.textContent = isOpen ? "✖" : "☰";
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Temple data
const temples = [
  // 1. PASTE the sample temples from the Canvas assignment here (keep the same properties).
  // 2. Then keep the three extra temples below. Replace imageUrl with an absolute
  //    image address from ChurchofJesusChristTemples.org if you want to match the
  //    assignment exactly, and double-check each fact on that website.
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/temple-placeholder.jpeg"
  },
  {
    templeName: "Kinshasa Democratic Republic of the Congo",
    location: "Kinshasa, Democratic Republic of the Congo",
    dedicated: "2019, April, 14",
    area: 12000,
    imageUrl: "images/temple-placeholder.jpeg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/temple-placeholder.jpeg"
  }
];

const gallery = document.getElementById("gallery");
const pageTitle = document.getElementById("page-title");

// Build and show a temple card for every temple in the list
function displayTemples(list) {
  gallery.innerHTML = "";

  list.forEach((temple) => {
    const card = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.width = 400;
    img.height = 250;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><span class="label">Location:</span> ${temple.location}</p>
      <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
      <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    `;

    card.append(img, caption);
    gallery.appendChild(card);
  });
}

// The dedication year is the first part of the "dedicated" text
const dedicatedYear = (temple) => parseInt(temple.dedicated.split(",")[0], 10);

const filters = {
  home: () => temples,
  old: () => temples.filter((t) => dedicatedYear(t) < 1900),
  new: () => temples.filter((t) => dedicatedYear(t) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000)
};

// Respond to the navigation links
const navLinks = document.querySelectorAll("#primary-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((l) => {
      l.classList.remove("active");
      l.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    pageTitle.textContent = link.textContent;
    displayTemples(filters[link.id]());

    // Close the mobile menu after choosing
    navList.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Show all temples on first load
displayTemples(temples);
