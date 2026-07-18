Script · JS
// year
document.getElementById('year').textContent = new Date().getFullYear();
 
// night mode
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('night');
  confetti();
});
 
// name squiggle on click
const heroName = document.getElementById('heroName');
if (heroName) {
  heroName.addEventListener('click', () => {
    heroName.classList.remove('squiggle');
    void heroName.offsetWidth; // reflow
    heroName.classList.add('squiggle');
  });
}
 
// collapsible courses
document.querySelectorAll('.courses-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    const box = toggle.nextElementSibling;
    box.classList.toggle('open');
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
 
// floating flowers on double click
const flowers = ['flower1.png', 'flower2.png'];
 
function spawnFlower(x, y) {
  const img = document.createElement('img');
  img.src = flowers[Math.floor(Math.random() * flowers.length)];
  img.className = 'float-flower';
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  document.body.appendChild(img);
  setTimeout(() => img.remove(), 2800);
}
 
document.addEventListener('dblclick', e => spawnFlower(e.clientX, e.clientY));
 
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) spawnFlower(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  lastTap = now;
});
 
// confetti on theme switch
function confetti() {
  const night = document.body.classList.contains('night');
  const colors = night
    ? ['#6b1a1a', '#f5ede0', '#a03030']
    : ['#6b1a1a', '#8b2a2a', '#f5ede0', '#ddd4c4'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    const size = 6 + Math.random() * 5;
    c.style.cssText = `left:${Math.random()*100}vw;top:-10px;width:${size}px;height:${size}px;background:${colors[i%colors.length]};border-radius:${Math.random()>0.5?'50%':'2px'};position:fixed`;
    const dur = 1500 + Math.random() * 800;
    const dx = (Math.random() - 0.5) * 70;
    c.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(110vh) translateX(${dx}px) rotate(360deg)`, opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), dur);
  }
}
 
// confetti on load
window.addEventListener('load', () => setTimeout(confetti, 500));
 
