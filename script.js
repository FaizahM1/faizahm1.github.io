Script · JS
// year
document.getElementById('year').textContent = new Date().getFullYear();
 
// night mode
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night');
  confetti();
});
 
// name squiggle + photo overlay
const heroName = document.getElementById('heroName');
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');
 
if (heroName) {
  heroName.addEventListener('click', () => {
    // squiggle
    heroName.classList.remove('squiggle');
    void heroName.offsetWidth;
    heroName.classList.add('squiggle');
    // show photo after brief delay
    setTimeout(() => photoOverlay.classList.add('show'), 200);
  });
}
 
if (photoClose) {
  photoClose.addEventListener('click', () => photoOverlay.classList.remove('show'));
}
 
if (photoOverlay) {
  photoOverlay.addEventListener('click', e => {
    if (e.target === photoOverlay) photoOverlay.classList.remove('show');
  });
}
 
// collapsible courses
document.querySelectorAll('.courses-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    toggle.nextElementSibling.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
  });
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
// floating flowers on double click / double tap
const flowers = ['flower1.png', 'flower2.png'];
const sizes = [50, 60, 70, 55];
 
function spawnFlower(x, y) {
  const img = document.createElement('img');
  img.src = flowers[Math.floor(Math.random() * flowers.length)];
  img.className = 'float-flower';
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  img.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
  document.body.appendChild(img);
  setTimeout(() => img.remove(), 2600);
}
 
document.addEventListener('dblclick', e => spawnFlower(e.clientX, e.clientY));
 
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) spawnFlower(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  lastTap = now;
}, { passive: true });
 
// confetti
function confetti() {
  const night = document.body.classList.contains('night');
  const colors = night
    ? ['#6b1a1a', '#f5ede0', '#a03030', '#3a1010']
    : ['#6b1a1a', '#8b2a2a', '#f5ede0', '#ddd4c4', '#a03535'];
  for (let i = 0; i < 55; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    const size = 5 + Math.random() * 6;
    c.style.cssText = `left:${Math.random()*100}vw;top:-12px;width:${size}px;height:${size}px;background:${colors[i%colors.length]};border-radius:${Math.random()>0.5?'50%':'2px'};position:fixed`;
    const dur = 1500 + Math.random() * 900;
    const dx = (Math.random() - 0.5) * 80;
    c.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(110vh) translateX(${dx}px) rotate(${360+Math.random()*360}deg)`, opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), dur);
  }
}
 
window.addEventListener('load', () => setTimeout(confetti, 400));
