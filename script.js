// year
document.getElementById('year').textContent = new Date().getFullYear();

// ── DARK MODE ──
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('night');
  spawnFlowers(window.innerWidth / 2, window.innerHeight / 2, 16);
});

// ── NAME CLICK → squiggle + show photo ──
const heroName = document.getElementById('heroName');
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');

heroName.addEventListener('click', () => {
  heroName.classList.remove('squiggle');
  void heroName.offsetWidth; // force reflow
  heroName.classList.add('squiggle');
  setTimeout(() => photoOverlay.classList.add('show'), 200);
});

photoClose.addEventListener('click', () => photoOverlay.classList.remove('show'));
photoOverlay.addEventListener('click', e => {
  if (e.target === photoOverlay) photoOverlay.classList.remove('show');
});

// ── LOGO CLICK → also show photo ──
const logoLink = document.getElementById('logoLink');
if (logoLink) {
  logoLink.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => photoOverlay.classList.add('show'), 400);
  });
}

// ── COURSES COLLAPSIBLE ──
const coursesToggle = document.getElementById('coursesToggle');
const coursesBox = document.getElementById('coursesBox');
const toggleIcon = document.getElementById('toggleIcon');

// start open
let coursesOpen = true;

coursesToggle.addEventListener('click', () => {
  coursesOpen = !coursesOpen;
  if (coursesOpen) {
    coursesBox.classList.remove('collapsed');
    toggleIcon.textContent = '▲';
    coursesToggle.setAttribute('aria-expanded', 'true');
  } else {
    coursesBox.classList.add('collapsed');
    toggleIcon.textContent = '▼';
    coursesToggle.setAttribute('aria-expanded', 'false');
  }
});

coursesToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    coursesToggle.click();
  }
});

// ── ESCAPE closes photo overlay ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') photoOverlay.classList.remove('show');
});

// ── FLOWER CONFETTI ──
const flowerSrcs = ['flower1.png', 'flower2.png'];

function spawnFlowers(cx, cy, count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = flowerSrcs[Math.floor(Math.random() * flowerSrcs.length)];
      img.className = 'flower-confetti';
      const size = 22 + Math.random() * 24;
      const dx = (Math.random() - 0.5) * 280;
      const dur = 2.0 + Math.random() * 1.4;
      const rot = (Math.random() - 0.5) * 130;
      const sc = 0.55 + Math.random() * 0.55;
      img.style.cssText = `left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;--dx:${dx}px;--dur:${dur}s;--rot:${rot}deg;--sc:${sc}`;
      document.body.appendChild(img);
      setTimeout(() => img.remove(), (dur + 0.1) * 1000);
    }, i * 55);
  }
}

// double click anywhere → flowers
document.addEventListener('dblclick', e => spawnFlowers(e.clientX, e.clientY, 10));

// mobile double tap
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) spawnFlowers(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 10);
  lastTap = now;
}, { passive: true });

// page load burst
window.addEventListener('load', () => {
  setTimeout(() => spawnFlowers(window.innerWidth / 2, window.innerHeight * 0.35, 16), 500);
});
