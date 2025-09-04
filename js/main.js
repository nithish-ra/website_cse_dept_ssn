// Header year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const themeBtn = document.getElementById("theme-toggle");

// Apply saved theme on page load
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  themeBtn.textContent = "🌞";
} else {
  themeBtn.textContent = "🌙";
}

// Toggle theme and save preference
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌞";
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "🌙";
  }
});

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const canvas = document.getElementById("placementChart");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  // Match canvas resolution to CSS size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Now redraw your chart content
  drawChart();
}

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Example: simple bar chart drawing
  ctx.fillStyle = "#5b8cff";
  const barWidth = canvas.width / 10;
  const barHeight = canvas.height * 0.6;
  ctx.fillRect(50, canvas.height - barHeight, barWidth, barHeight);

  // (replace with your real chart drawing logic)
}

// Resize on load + when window resizes
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
