Script · JS
// year in footer
document.getElementById('year').textContent = new Date().getFullYear();
 
// theme toggle
const btn = document.getElementById('themeBtn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('night');
  confetti(document.body.classList.contains('night'));
});
 
// flip cards
document.querySelectorAll('.fact').forEach(f => {
  f.addEventListener('click', e => {
    f.classList.toggle('flip');
    burst(e.clientX, e.clientY);
  });
});
 
// mini burst on card flip
function burst(x, y) {
  const night = document.body.classList.contains('night');
  const colors = night ? ['#e8907a', '#c47060'] : ['#c4745a', '#e8a090', '#8fa68a'];
  for (let i = 0; i < 10; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`;
    const dx = (Math.random() - 0.5) * 100;
    const dy = -(Math.random() * 90 + 30);
    c.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.5)`, opacity: 0 }
    ], { duration: 550, easing: 'cubic-bezier(0.2,0.8,0.2,1)', fill: 'forwards' });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 560);
  }
}
 
// double-click gifs
const gifs = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJjZ2ZvNm1xampxdml5NTVxcWdmMXNrbmxxcDRpZ2Vwb3Jqc2ZkeCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mG2pJcdFjjePzeHmVi/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/GZ1kHk53BUdDXsQWmP/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVyOHgzcmdhZHdmcmJiaXJodDdmODl6NXRteWQ2aDloeml6MnoyYSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1nc2JAjeYlG2VhXH2Z/giphy.gif'
];
 
function spawnGif(x, y) {
  const g = document.createElement('img');
  g.src = gifs[Math.floor(Math.random() * gifs.length)];
  g.className = 'gif';
  g.style.left = x + 'px';
  g.style.top = y + 'px';
  document.body.appendChild(g);
  setTimeout(() => g.remove(), 2800);
}
 
document.addEventListener('dblclick', e => spawnGif(e.clientX, e.clientY));
 
// tap-to-tap double tap on mobile
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) spawnGif(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  lastTap = now;
});
 
// confetti rain on theme switch
function confetti(night) {
  const colors = night
    ? ['#0d0b09', '#e8907a', '#2a2420']
    : ['#c4745a', '#e8a090', '#8fa68a', '#f9f6f2'];
  for (let i = 0; i < 55; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    const size = 6 + Math.random() * 6;
    c.style.cssText = `left:${Math.random()*100}vw;top:-12px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'3px'}`;
    const dur = 1600 + Math.random() * 900;
    const dx = (Math.random() - 0.5) * 80;
    c.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(110vh) translateX(${dx}px) rotate(${360 + Math.random()*360}deg)`, opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), dur);
  }
}
 
// confetti on load
window.addEventListener('load', () => setTimeout(() => confetti(false), 400));
 
