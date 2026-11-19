const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const currentNumber = document.querySelector(".current-number");
const progressBar = document.querySelector(".progress-bar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

let currentSlide = 0;
let autoplay;

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");

  const position = currentSlide + 1;
  currentNumber.textContent = String(position).padStart(2, "0");
  progressBar.style.width = `${(position / slides.length) * 100}%`;
}

function startAutoplay() {
  window.clearInterval(autoplay);
  autoplay = window.setInterval(() => showSlide(currentSlide + 1), 5500);
}

function restartAutoplay() {
  startAutoplay();
}

previousButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  restartAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  restartAutoplay();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar navegación" : "Abrir navegación");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

startAutoplay();
