// year
document.getElementById('year').textContent = new Date().getFullYear();

// theme
const btn = document.getElementById('themeBtn');
const body = document.body;

btn.addEventListener('click', () => {
  body.classList.toggle('blue-theme');
  confetti(body.classList.contains('blue-theme'));
});

// facts flip
document.querySelectorAll('.fact').forEach(f => {
  f.addEventListener('click', () => {
    f.classList.toggle('flip');
  });
});

// gifs on double click
const gifs = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WRXNJYnmTfaCUsU4Sw/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlobGs4MXg2YWhmcHZscDQzMWR5cno2bWFtNjhqZW45a2g3Z2ptayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2TS9xzVB4DSzYNFcWO/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bWl1Z3cybWxkeDc4azMxcHg4eDBhMDg1MzJjMTdyanhmNDhwNWd2YiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/RNRPgP2ntCu1jva1VY/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJjZ2ZvNm1xampxdml5NTVxcWdmMXNrbmxxcDRpZ2Vwb3Jqc2ZkeCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mG2pJcdFjjePzeHmVi/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/GZ1kHk53BUdDXsQWmP/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI2cWVnc2p0cHllZzMwZHZyZmZmdGJsdXNyb205ZWRxM3FvajE4NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/CkISXfgTSLTmZUOwJE/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVyOHgzcmdhZHdmcmJiaXJodDdmODl6NXRteWQ2aDloeml6MnoyYSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1nc2JAjeYlG2VhXH2Z/giphy.gif'
];

function spawn(x, y) {
  if (Math.random() < 0.5) {
    const g = document.createElement('img');
    g.src = gifs[Math.floor(Math.random() * gifs.length)];
    g.className = 'gif';
    g.style.left = x + 'px';
    g.style.top = y + 'px';
    document.body.appendChild(g);
    setTimeout(() => g.remove(), 3000);
  }
}

document.addEventListener('dblclick', e => spawn(e.clientX, e.clientY));

let last = 0;
document.addEventListener('pointerdown', e => {
  const now = Date.now();
  if (now - last < 300) spawn(e.clientX, e.clientY);
  last = now;
});

// confetti
function confetti(blue) {
  const colors = blue ? ['#0f2b3e', '#2b5f88', '#58a6ff'] : ['#3b2d22', '#6b5636', '#8b6f47'];
  
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = '-10px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const dur = 1800 + Math.random() * 1000;
    const x = Math.random() * 100 - 50;
    
    c.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(110vh) translateX(${x}px) rotate(720deg)`, opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    
    document.body.appendChild(c);
    setTimeout(() => c.remove(), dur);
  }
}

// page load
window.addEventListener('load', () => {
  setTimeout(() => confetti(body.classList.contains('blue-theme')), 300);
});
