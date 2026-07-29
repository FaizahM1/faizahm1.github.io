Script · JS
document.getElementById('year').textContent = new Date().getFullYear()
 
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night')
  startRain(25)
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
 
document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
 
function makeSVG(color) {
  const petals = [0,60,120,180,240,300].map(a =>
    `<ellipse rx="7" ry="13" transform="rotate(${a})" fill="${color}" opacity="0.9"/>`
  ).join('')
  return 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g transform="translate(20,20)">${petals}<circle r="5" fill="#6b1212"/></g></svg>`
  )
}
 
const colors = ['#8b2020','#7a1a1a','#9b3030','#a03535']
 
function drop(src) {
  const img = document.createElement('img')
  img.src = src
  img.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0;'
  const size = 18 + Math.random() * 20
  img.style.left = (Math.random() * window.innerWidth) + 'px'
  img.style.top = (-size - 10) + 'px'
  img.style.width = size + 'px'
  img.style.height = size + 'px'
  document.body.appendChild(img)
 
  const dx = (Math.random() - 0.5) * 130
  const dur = (2.5 + Math.random() * 1.8) * 1000
  const rot = (Math.random() - 0.5) * 220
  const totalY = window.innerHeight + 120
  const start = performance.now()
 
  function step(now) {
    const t = Math.min((now - start) / dur, 1)
    const y = t * t * totalY
    const opacity = t < 0.08 ? t / 0.08 : t > 0.85 ? (1 - t) / 0.15 : 1
    img.style.transform = `translate(${dx * t}px, ${y}px) rotate(${rot * t}deg)`
    img.style.opacity = opacity
    if (t < 1) requestAnimationFrame(step)
    else img.remove()
  }
  requestAnimationFrame(step)
}
 
let pngOk = false
const test = new Image()
test.onload = () => { pngOk = true }
test.src = 'flower1.png'
 
function startRain(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const src = pngOk
        ? (Math.random() > 0.5 ? 'flower1.png' : 'flower2.png')
        : makeSVG(colors[Math.floor(Math.random() * colors.length)])
      drop(src)
    }, i * 70)
  }
}
 
document.addEventListener('dblclick', () => startRain(14))
 
let lastTap = 0
document.addEventListener('touchend', e => {
  const now = Date.now()
  if (now - lastTap < 300) startRain(14)
  lastTap = now
}, { passive: true })
 
window.addEventListener('load', () => setTimeout(() => startRain(20), 600))
