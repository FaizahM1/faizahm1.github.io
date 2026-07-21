document.getElementById('year').textContent = new Date().getFullYear();

// ── DARK MODE ──
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night');
  flowerRain(25);
  confettiRain(40);
});

// ── PHOTO OVERLAY ──
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');

function showPhoto() {
  photoOverlay.classList.add('show');
}
function hidePhoto() {
  photoOverlay.classList.remove('show');
}

photoClose.addEventListener('click', hidePhoto);
photoOverlay.addEventListener('click', e => {
  if (e.target === photoOverlay) hidePhoto();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hidePhoto();
});

// name click → squiggle + photo
const heroName = document.getElementById('heroName');
heroName.addEventListener('click', () => {
  heroName.classList.remove('squiggle');
  void heroName.offsetWidth;
  heroName.classList.add('squiggle');
  setTimeout(showPhoto, 200);
});

// logo click → scroll top + photo
document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(showPhoto, 300);
});

// ── COURSES COLLAPSIBLE ──
const coursesToggle = document.getElementById('coursesToggle');
const coursesBox = document.getElementById('coursesBox');
const toggleIcon = document.getElementById('toggleIcon');
let open = true;

coursesToggle.addEventListener('click', () => {
  open = !open;
  coursesBox.classList.toggle('collapsed', !open);
  toggleIcon.textContent = open ? '▲' : '▼';
  coursesToggle.setAttribute('aria-expanded', String(open));
});
coursesToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); coursesToggle.click(); }
});

// ── FLOWER RAIN ──
const flowerSrcs = ['flower1.png', 'flower2.png'];

function flowerRain(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = flowerSrcs[Math.floor(Math.random() * flowerSrcs.length)];
      img.className = 'flower-confetti';
      const size = 20 + Math.random() * 22;
      const startX = Math.random() * window.innerWidth;
      const driftX = (Math.random() - 0.5) * 120;
      const fallDist = window.innerHeight + 100;
      const dur = 2.2 + Math.random() * 1.6;
      const rot = (Math.random() - 0.5) * 180;
      const delay = Math.random() * 0.5;
      img.style.cssText = `left:${startX}px;top:-${size+10}px;width:${size}px;height:${size}px;--dx:${driftX}px;--dy:${fallDist}px;--dur:${dur+delay}s;--rot:${rot}deg;--delay:${delay}s`;
      document.body.appendChild(img);
      setTimeout(() => img.remove(), (dur + delay + 0.2) * 1000);
    }, i * 65);
  }
}

// ── REGULAR CONFETTI ──
function confettiRain(count) {
  const colors = ['#5c1212','#9b2222','#f5ede0','#ddd0bc','#7a1a1a','#e8d5b0'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      const size = 6 + Math.random() * 7;
      const startX = Math.random() * window.innerWidth;
      const driftX = (Math.random() - 0.5) * 100;
      const dur = 1.8 + Math.random() * 1.4;
      const rot = Math.random() * 720;
      const delay = Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isRect = Math.random() > 0.5;
      c.style.cssText = `left:${startX}px;top:-10px;width:${size}px;height:${isRect ? size*1.6 : size}px;background:${color};border-radius:${isRect ? '2px' : '50%'};--dx:${driftX}px;--dy:${window.innerHeight+60}px;--dur:${dur+delay}s;--rot:${rot}deg;--delay:${delay}s`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), (dur + delay + 0.2) * 1000);
    }, i * 40);
  }
}

// double click → both
document.addEventListener('dblclick', () => { flowerRain(14); confettiRain(25); });

let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) { flowerRain(14); confettiRain(25); }
  lastTap = now;
}, { passive: true });

// page load
window.addEventListener('load', () => setTimeout(() => { flowerRain(18); confettiRain(35); }, 400));
