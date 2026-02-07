// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// theme toggle
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("blue-theme");
  const isBlue = body.classList.contains("blue-theme");
  launchConfetti(isBlue);
});

// fact cards flip
document.querySelectorAll(".fact-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// floating gifs
const gifUrls = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJjZ2ZvNm1xampxdml5NTVxcWdmMXNrbmxxcDRpZ2Vwb3Jqc2ZkeCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mG2pJcdFjjePzeHmVi/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/GZ1kHk53BUdDXsQWmP/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/CkISXfgTSLTmZUOwJE/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVyOHgzcmdhZHdmcmJiaXJodDdmODl6NXRteWQ2aDloeml6MnoyYSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1nc2JAjeYlG2VhXH2Z/giphy.gif",
];

function spawnGif(x, y) {
  if (Math.random() < 0.55) {
    const gif = document.createElement("img");
    gif.src = gifUrls[Math.floor(Math.random() * gifUrls.length)];
    gif.className = "click-gif";
    gif.style.left = `${x}px`;
    gif.style.top = `${y}px`;
    document.body.appendChild(gif);
    setTimeout(() => gif.remove(), 3200);
  }
}

document.addEventListener("dblclick", (e) => {
  spawnGif(e.clientX, e.clientY);
});

let lastTap = 0;
document.addEventListener("pointerdown", (e) => {
  const now = Date.now();
  const delta = now - lastTap;
  if (delta > 0 && delta < 320) spawnGif(e.clientX, e.clientY);
  lastTap = now;
});

// confetti
function launchConfetti(isBlue) {
  const colors = isBlue
    ? ["#0f2b3e", "#2b5f88", "#58a6ff"]
    : ["#3b2d22", "#6b5636", "#8b6f47"];

  for (let i = 0; i < 55; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];

    const duration = 1700 + Math.random() * 1100;
    const drift = Math.random() * 120 - 60;

    c.animate(
      [
        { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0.9 },
        {
          transform: `translateY(110vh) translateX(${drift}px) rotate(720deg)`,
          opacity: 0,
        },
      ],
      { duration, easing: "linear", fill: "forwards" }
    );

    document.body.appendChild(c);
    setTimeout(() => c.remove(), duration + 80);
  }
}

// page load confetti
window.addEventListener("load", () => {
  const isBlue = body.classList.contains("blue-theme");
  setTimeout(() => launchConfetti(isBlue), 300);
});
