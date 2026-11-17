// Footer: current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu
const menuButton = document.getElementById("menu-button");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.textContent = isOpen ? "✖" : "☰"; // X when open, hamburger when closed
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
