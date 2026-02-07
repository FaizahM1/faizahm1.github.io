// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function currentTheme() {
  return body.classList.contains("blue-theme") ? "blue" : "brown";
}

function themeConfettiColors(theme) {
  if (theme === "blue") return ["#2b5f88", "#58a6ff", "#79c0ff"];
  return ["#3b2d22", "#6b5636", "#8b6f47"];
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("blue-theme");
  launchConfetti(themeConfettiColors(currentTheme()), 90);
});

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
}, { root: null, threshold: [0.2, 0.35, 0.5, 0.65] });

sections.forEach(s => io.observe(s));

// floating gifs
const gifUrls = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/xxGHKPrjQKU6BByuzZ/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTM0ZTM5Nmlsd2Y0ZGR2MTRydGdtczlwNWtoc2U4bmw2djZuMWI1NSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/GZ1kHk53BUdDXsQWmP/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTM0ZTM5Nmlsd2Y0ZGR2MTRydGdtczlwNWtoc2U4bmw2djZuMWI1NSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/CkISXfgTSLTmZUOwJE/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWR4YTQ2MndzY3ZrZnA3YzV3aTZlMGk1cDhub213YTMxZ3luczJncyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1nc2JAjeYlG2VhXH2Z/giphy.gif"
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

// desktop double click
document.addEventListener("dblclick", (e) => {
  spawnClickGif(e.clientX, e.clientY);
});

// mobile double tap
let lastTap = 0;
document.addEventListener("pointerdown", (e) => {
  const now = Date.now();
  const delta = now - lastTap;

  if (delta > 0 && delta < 320) {
    spawnClickGif(e.clientX, e.clientY);
  }

  lastTap = now;
});

// fun facts flip + subtle burst
const factCards = Array.from(document.querySelectorAll(".flip-card"));

factCards.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.classList.toggle("flipped");
    burstConfettiAt(e.clientX, e.clientY, themeConfettiColors(currentTheme()), 18);
  });
});

// confetti helpers
function launchConfetti(colors, count = 90) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 0.35 + "s";
    c.style.animationDuration = 2.0 + Math.random() * 1.4 + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4200);
  }
}

function burstConfettiAt(x, y, colors, count = 14) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${x + (Math.random() * 40 - 20)}px`;
    piece.style.top = `${y + (Math.random() * 10 - 5)}px`;
    piece.style.width = "8px";
    piece.style.height = "8px";
    piece.style.position = "fixed";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = "0.85";
    piece.style.borderRadius = "3px";

    const dx = (Math.random() * 120 - 60);
    const dy = (Math.random() * 140 + 60);

    piece.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
      { transform: `translate(${dx}px, ${-dy}px) rotate(${Math.random() * 720}deg) scale(0.9)`, opacity: 0 }
    ], {
      duration: 650 + Math.random() * 350,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "forwards"
    });

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1100);
  }
}

// on load: small confetti
window.addEventListener("load", () => {
  launchConfetti(themeConfettiColors(currentTheme()), 50);
});
