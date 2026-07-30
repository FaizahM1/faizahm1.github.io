Script · JS
document.getElementById('year').textContent = new Date().getFullYear()
 
const themeBtn = document.getElementById('themeBtn')
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('night')
    bloom(10)
  })
}
 
const toggle = document.getElementById('coursesToggle')
const box = document.getElementById('coursesBox')
const icon = document.getElementById('toggleIcon')
let open = true
 
if (toggle && box && icon) {
  toggle.addEventListener('click', () => {
    open = !open
    box.classList.toggle('collapsed', !open)
    icon.textContent = open ? '\u25B2' : '\u25BC'
    toggle.setAttribute('aria-expanded', String(open))
  })
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click() }
  })
}
 
const logoLink = document.getElementById('logoLink')
if (logoLink) {
  logoLink.addEventListener('click', e => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
 
const SOURCES = ['flower2.png', 'flowers3.png', 'flowers4.png']
const ready = []
SOURCES.forEach(src => {
  const probe = new Image()
  probe.onload = () => ready.push(src)
  probe.src = src
})
 
function fallbackSVG() {
  const petals = [0, 60, 120, 180, 240, 300].map(a =>
    `<ellipse rx="7" ry="13" transform="rotate(${a})" fill="#e090a8" opacity="0.9"/>`
  ).join('')
  return 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g transform="translate(20,20)">${petals}<circle r="5" fill="#c47090"/></g></svg>`
  )
}
 
function pickSource() {
  if (!ready.length) return fallbackSVG()
  return ready[Math.floor(Math.random() * ready.length)]
}
 
function sprout(x, y) {
  const img = document.createElement('img')
  img.src = pickSource()
  img.alt = ''
  img.className = 'flower-confetti'
 
  const size = 28 + Math.random() * 34
  img.style.width = size + 'px'
  img.style.height = 'auto'
  img.style.left = (x - size / 2) + 'px'
  img.style.top = (y - size / 2) + 'px'
  document.body.appendChild(img)
 
  const drift = (Math.random() - 0.5) * 90
  const rise = 50 + Math.random() * 70
  const spin = (Math.random() - 0.5) * 90
 
  const anim = img.animate([
    { transform: 'translate(0px, 0px) scale(0.05) rotate(0deg)', opacity: 0 },
    { transform: `translate(${drift * 0.35}px, ${-rise * 0.3}px) scale(1.12) rotate(${spin * 0.35}deg)`, opacity: 0.95, offset: 0.28 },
    { transform: `translate(${drift * 0.7}px, ${-rise * 0.65}px) scale(1) rotate(${spin * 0.7}deg)`, opacity: 0.85, offset: 0.6 },
    { transform: `translate(${drift}px, ${-rise}px) scale(0.86) rotate(${spin}deg)`, opacity: 0 }
  ], {
    duration: 1700 + Math.random() * 900,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  })
 
  anim.onfinish = () => img.remove()
  anim.oncancel = () => img.remove()
}
 
function bloom(count, x, y) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const px = x == null ? Math.random() * window.innerWidth : x + (Math.random() - 0.5) * 150
      const py = y == null ? Math.random() * window.innerHeight * 0.75 : y + (Math.random() - 0.5) * 110
      sprout(px, py)
    }, i * 85)
  }
}
 
document.addEventListener('dblclick', e => bloom(9, e.clientX, e.clientY))
 
let lastTap = 0
document.addEventListener('touchend', e => {
  const now = Date.now()
  const touch = e.changedTouches[0]
  if (now - lastTap < 300 && touch) bloom(9, touch.clientX, touch.clientY)
  lastTap = now
}, { passive: true })
 
window.addEventListener('load', () => setTimeout(() => bloom(12), 500))
