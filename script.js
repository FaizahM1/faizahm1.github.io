// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const themeHeart = document.getElementById("themeHeart");
const body = document.body;

function currentTheme() {
  return body.classList.contains("blue-theme") ? "blue" : "brown";
}

function setThemeUi() {
  const theme = currentTheme();
  themeLabel.textContent = theme;
  themeHeart.textContent = theme === "blue" ? "♥︎" : "♡";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("blue-theme");
  setThemeUi();
  launchConfetti(themeConfettiColors(currentTheme()), 65);
});

function themeConfettiColors(theme) {
  if (theme === "blue") return ["#0f2b3e", "#2b5f88", "#58a6ff"];
  return ["#3b2d22", "#6b5636", "#8b6f47"];
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

// flip cards + heart swap
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", (e) => {
    card.classList.toggle("flipped");

    const heart = card.querySelector(".fact-heart");
    heart.textContent = card.classList.contains("flipped") ? "♥︎" : "♡";

    burstConfettiAt(e.clientX, e.clientY, themeConfettiColors(currentTheme()), 16);
  });
});

// floating gifs
const gifUrls = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif"
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
function launchConfetti(colors, count = 60) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];

    const duration = 1800 + Math.random() * 1200;
    const drift = (Math.random() * 120 - 60);

    c.animate([
      { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0.9 },
      { transform: `translateY(110vh) translateX(${drift}px) rotate(720deg)`, opacity: 0 }
    ], { duration, easing: "linear", fill: "forwards" });

    document.body.appendChild(c);
    setTimeout(() => c.remove(), duration + 100);
  }
}

function burstConfettiAt(x, y, colors, count = 14) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.position = "fixed";
    piece.style.width = "8px";
    piece.style.height = "8px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = "0.85";

    const dx = (Math.random() * 140 - 70);
    const dy = (Math.random() * 160 + 60);

    piece.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
      { transform: `translate(${dx}px, ${-dy}px) rotate(${Math.random() * 720}deg) scale(0.9)`, opacity: 0 }
    ], { duration: 650 + Math.random() * 350, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" });

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1100);
  }
}

window.addEventListener("load", () => {
  setThemeUi();
});
