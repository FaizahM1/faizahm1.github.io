// script.js

// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// theme setup
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function currentTheme() {
  return body.classList.contains("brown-theme") ? "brown" : "blue";
}

function applyTheme(theme) {
  body.classList.toggle("brown-theme", theme === "brown");
  body.classList.toggle("blue-theme", theme === "blue");
  themeLabel.textContent = theme;
  localStorage.setItem("theme", theme);
}

(function initTheme() {
  // start dark mode by default, but remember user choice
  const saved = localStorage.getItem("theme");
  applyTheme(saved || "brown");
})();

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "blue" ? "brown" : "blue";
  applyTheme(next);
  launchConfetti(themeConfettiColors(next), 55);
});

function themeConfettiColors(theme) {
  return theme === "blue"
    ? ["#0f2b3e", "#2b5f88", "#58a6ff"]
    : ["#3b2d22", "#6b5636", "#8b6f47"];
}

// nav active highlight
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-links a[data-section]"));

function setActiveLink(id) {
  navLinks.forEach(a => a.classList.toggle("active", a.dataset.section === id));
}

const io = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) setActiveLink(visible.target.id);
}, { threshold: [0.25, 0.4, 0.6] });

sections.forEach(s => io.observe(s));

// quick facts flip + heart fill
document.querySelectorAll(".fact-card").forEach(card => {
  card.addEventListener("click", (e) => {
    card.classList.toggle("flipped");

    const heartPath = card.querySelector(".heart-svg path");
    const flipped = card.classList.contains("flipped");
    heartPath.setAttribute("fill", flipped ? "currentColor" : "none");

    burstConfettiAt(e.clientX, e.clientY, themeConfettiColors(currentTheme()), 14);
  });
});

// floating gifs (creds to giphy.com!) 
const gifUrls = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif"
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJjZ2ZvNm1xampxdml5NTVxcWdmMXNrbmxxcDRpZ2Vwb3Jqc2ZkeCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mG2pJcdFjjePzeHmVi/giphy.gif"
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/GZ1kHk53BUdDXsQWmP/giphy.gif"
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/CkISXfgTSLTmZUOwJE/giphy.gif"
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVyOHgzcmdhZHdmcmJiaXJodDdmODl6NXRteWQ2aDloeml6MnoyYSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1nc2JAjeYlG2VhXH2Z/giphy.gif"

];

function spawnClickGif(x, y) {
  if (Math.random() < 0.55) {
    const gif = document.createElement("img");
    gif.src = gifUrls[Math.floor(Math.random() * gifUrls.length)];
    gif.className = "click-gif";
    gif.style.left = `${x}px`;
    gif.style.top = `${y}px`;
    document.body.appendChild(gif);
    setTimeout(() => gif.remove(), 3000);
  }
}

document.addEventListener("dblclick", (e) => {
  spawnClickGif(e.clientX, e.clientY);
});

let lastTap = 0;
document.addEventListener("pointerdown", (e) => {
  const now = Date.now();
  const delta = now - lastTap;
  if (delta > 0 && delta < 320) spawnClickGif(e.clientX, e.clientY);
  lastTap = now;
});

// confetti helpers
function launchConfetti(colors, count = 50) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];

    const duration = 1700 + Math.random() * 1100;
    const drift = (Math.random() * 120 - 60);

    c.animate([
      { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0.9 },
      { transform: `translateY(110vh) translateX(${drift}px) rotate(720deg)`, opacity: 0 }
    ], { duration, easing: "linear", fill: "forwards" });

    document.body.appendChild(c);
    setTimeout(() => c.remove(), duration + 80);
  }
}

function burstConfettiAt(x, y, colors, count = 12) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];

    const dx = (Math.random() * 140 - 70);
    const dy = (Math.random() * 150 + 60);

    piece.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
      { transform: `translate(${dx}px, ${-dy}px) rotate(${Math.random() * 720}deg) scale(0.9)`, opacity: 0 }
    ], { duration: 600 + Math.random() * 320, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" });

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1000);
  }
}
