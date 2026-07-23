document.getElementById('year').textContent = new Date().getFullYear()

// night mode toggle
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night')
  flowerRain(25)
  confettiRain(40)
})

// photo overlay
const photoOverlay = document.getElementById('photoOverlay')
const photoClose = document.getElementById('photoClose')

function showPhoto() { photoOverlay.classList.add('show') }
function hidePhoto() { photoOverlay.classList.remove('show') }

photoClose.addEventListener('click', hidePhoto)
photoOverlay.addEventListener('click', e => { if (e.target === photoOverlay) hidePhoto() })
document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePhoto() })

// click name -> squiggle + show face
const heroName = document.getElementById('heroName')
heroName.addEventListener('click', () => {
  heroName.classList.remove('squiggle')
  void heroName.offsetWidth
  heroName.classList.add('squiggle')
  setTimeout(showPhoto, 200)
})

// click logo -> scroll up + show face
document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(showPhoto, 300)
})

// grades collapse
const toggle = document.getElementById('coursesToggle')
const box = document.getElementById('coursesBox')
const icon = document.getElementById('toggleIcon')
let open = true

toggle.addEventListener('click', () => {
  open = !open
  box.classList.toggle('collapsed', !open)
  icon.textContent = open ? '▲' : '▼'
})
toggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click() }
})

// flower rain
const flowers = ['flower1.png', 'flower2.png']

function flowerRain(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const img = document.createElement('img')
      img.src = flowers[Math.floor(Math.random() * flowers.length)]
      img.className = 'flower-confetti'
      const size = 20 + Math.random() * 22
      const x = Math.random() * window.innerWidth
      const dx = (Math.random() - 0.5) * 120
      const dur = 2.2 + Math.random() * 1.6
      const rot = (Math.random() - 0.5) * 180
      const delay = Math.random() * 0.5
      img.style.cssText = `left:${x}px;top:-${size+10}px;width:${size}px;height:${size}px;--dx:${dx}px;--dy:${window.innerHeight+100}px;--dur:${dur+delay}s;--rot:${rot}deg;--delay:${delay}s`
      document.body.appendChild(img)
      setTimeout(() => img.remove(), (dur + delay + 0.2) * 1000)
    }, i * 65)
  }
}

// confetti
function confettiRain(count) {
  const colors = ['#5c1212','#9b2222','#f5ede0','#ddd0bc','#7a1a1a','#e8d5b0']
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div')
      c.className = 'confetti-piece'
      const size = 6 + Math.random() * 7
      const x = Math.random() * window.innerWidth
      const dx = (Math.random() - 0.5) * 100
      const dur = 1.8 + Math.random() * 1.4
      const rot = Math.random() * 720
      const delay = Math.random() * 0.5
      const color = colors[Math.floor(Math.random() * colors.length)]
      const round = Math.random() > 0.5
      c.style.cssText = `left:${x}px;top:-10px;width:${size}px;height:${round ? size : size*1.6}px;background:${color};border-radius:${round ? '50%' : '2px'};--dx:${dx}px;--dy:${window.innerHeight+60}px;--dur:${dur+delay}s;--rot:${rot}deg;--delay:${delay}s`
      document.body.appendChild(c)
      setTimeout(() => c.remove(), (dur + delay + 0.2) * 1000)
    }, i * 40)
  }
}

// double tap/click anywhere
document.addEventListener('dblclick', () => { flowerRain(14); confettiRain(25) })

let lastTap = 0
document.addEventListener('touchend', e => {
  const now = Date.now()
  if (now - lastTap < 300) { flowerRain(14); confettiRain(25) }
  lastTap = now
}, { passive: true })

// on load
window.addEventListener('load', () => {
  setTimeout(() => { flowerRain(18); confettiRain(35) }, 400)
})
