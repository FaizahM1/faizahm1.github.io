document.getElementById('year').textContent = new Date().getFullYear();

// dark mode
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night');
  flowerRain(30);
});

// name click → squiggle + photo
const heroName = document.getElementById('heroName');
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');

heroName.addEventListener('click', () => {
  heroName.classList.remove('squiggle');
  void heroName.offsetWidth;
  heroName.classList.add('squiggle');
  setTimeout(() => photoOverlay.classList.add('show'), 200);
});

photoClose.addEventListener('click', () => photoOverlay.classList.remove('show'));
photoOverlay.addEventListener('click', e => {
  if (e.target === photoOverlay) photoOverlay.classList.remove('show');
});

// logo click → scroll to top + show photo
document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => photoOverlay.classList.add('show'), 500);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') photoOverlay.classList.remove('show');
});

// courses collapsible
const coursesToggle = document.getElementById('coursesToggle');
const coursesBox = document.getElementById('coursesBox');
const toggleIcon = document.getElementById('toggleIcon');
let open = true;

coursesToggle.addEventListener('click', () => {
  open = !open;
  coursesBox.classList.toggle('collapsed', !open);
  toggleIcon.textContent = open ? '▲' : '▼';
  coursesToggle.setAttribute('aria-expanded', open);
});

coursesToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); coursesToggle.click(); }
});

// ── FLOWER RAIN — falls from top like confetti ──
const flowerSrcs = ['flower1.png', 'flower2.png'];

function flowerRain(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = flowerSrcs[Math.floor(Math.random() * flowerSrcs.length)];
      img.className = 'flower-confetti';

      const size = 20 + Math.random() * 22;
      // start from random x across full width, just above viewport
      const startX = Math.random() * window.innerWidth;
      const driftX = (Math.random() - 0.5) * 120;
      const fallDist = window.innerHeight + 100;
      const dur = 2.2 + Math.random() * 1.6;
      const rot = (Math.random() - 0.5) * 180;
      const delay = Math.random() * 0.4;

      img.style.cssText = `
        left: ${startX}px;
        top: -${size + 10}px;
        width: ${size}px;
        height: ${size}px;
        --dx: ${driftX}px;
        --dy: ${fallDist}px;
        --dur: ${dur + delay}s;
        --rot: ${rot}deg;
        --delay: ${delay}s;
      `;
      document.body.appendChild(img);
      setTimeout(() => img.remove(), (dur + delay + 0.2) * 1000);
    }, i * 60);
  }
}

// double click → flower rain
document.addEventListener('dblclick', () => flowerRain(18));

let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) flowerRain(18);
  lastTap = now;
}, { passive: true });

// page load
window.addEventListener('load', () => setTimeout(() => flowerRain(22), 400));
