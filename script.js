Script · JS
// year
document.getElementById('year').textContent = new Date().getFullYear();
 
// night mode
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night');
  spawnFlowerConfetti(window.innerWidth / 2, window.innerHeight / 2, 20);
});
 
// name click → squiggle + show photo
const heroName = document.getElementById('heroName');
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');
 
if (heroName) {
  heroName.addEventListener('click', () => {
    heroName.classList.remove('squiggle');
    void heroName.offsetWidth;
    heroName.classList.add('squiggle');
    setTimeout(() => photoOverlay.classList.add('show'), 250);
  });
}
if (photoClose) photoClose.addEventListener('click', () => photoOverlay.classList.remove('show'));
if (photoOverlay) photoOverlay.addEventListener('click', e => { if (e.target === photoOverlay) photoOverlay.classList.remove('show'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); photoOverlay?.classList.remove('show'); } });
 
// collapsible courses — open by default
document.querySelectorAll('.courses-toggle').forEach(toggle => {
  // start open
  toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
 
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    toggle.nextElementSibling.classList.toggle('collapsed');
    toggle.setAttribute('aria-expanded', open);
  });
  toggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });
});
 
// pdf modal
const overlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalFrame = document.getElementById('modalFrame');
 
function openPDF(url, title) {
  modalTitle.textContent = title;
  modalFrame.src = url;
  overlay.classList.add('open');
}
 
function closeModal() {
  overlay.classList.remove('open');
  setTimeout(() => { modalFrame.src = ''; }, 300);
}
 
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
 
// ── FLOWER CONFETTI ──
// using the actual flower images as confetti particles
const flowerSrcs = ['flower1.png', 'flower2.png'];
 
function spawnFlowerConfetti(cx, cy, count = 12) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = flowerSrcs[Math.floor(Math.random() * flowerSrcs.length)];
      img.className = 'flower-confetti';
 
      const size = 24 + Math.random() * 22; // small: 24-46px
      const dx = (Math.random() - 0.5) * 260;
      const dur = 2.2 + Math.random() * 1.2;
      const rot = (Math.random() - 0.5) * 120;
      const scale = 0.6 + Math.random() * 0.5;
 
      img.style.cssText = `
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        --dx: ${dx}px;
        --dur: ${dur}s;
        --rot: ${rot}deg;
        --scale: ${scale};
      `;
      document.body.appendChild(img);
      setTimeout(() => img.remove(), dur * 1000 + 100);
    }, i * 60);
  }
}
 
// double click anywhere → flower burst
document.addEventListener('dblclick', e => spawnFlowerConfetti(e.clientX, e.clientY, 10));
 
// mobile double tap
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) spawnFlowerConfetti(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 10);
  lastTap = now;
}, { passive: true });
 
// page load flower burst
window.addEventListener('load', () => {
  setTimeout(() => spawnFlowerConfetti(window.innerWidth / 2, window.innerHeight / 3, 18), 500);
});
 
