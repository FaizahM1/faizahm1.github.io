document.getElementById('year').textContent = new Date().getFullYear()

document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night')
  flowerRain(25)
})

const photoOverlay = document.getElementById('photoOverlay')
const photoClose = document.getElementById('photoClose')

photoClose.addEventListener('click', () => photoOverlay.classList.remove('show'))
photoOverlay.addEventListener('click', e => {
  if (e.target === photoOverlay) photoOverlay.classList.remove('show')
})
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') photoOverlay.classList.remove('show')
})

document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

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

document.addEventListener('dblclick', () => flowerRain(14))

let lastTap = 0
document.addEventListener('touchend', e => {
  const now = Date.now()
  if (now - lastTap < 300) flowerRain(14)
  lastTap = now
}, { passive: true })

window.addEventListener('load', () => setTimeout(() => flowerRain(18), 400))
