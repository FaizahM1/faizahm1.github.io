Script · JS
document.getElementById('year').textContent = new Date().getFullYear()
 
// dark mode
document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('night')
  flowerRain(25)
})
 
// grades
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
 
// flower svg
function makeFlower(color) {
  const petals = [0,60,120,180,240,300].map(a =>
    `<ellipse rx="7" ry="13" transform="rotate(${a})" fill="${color}" opacity="0.85"/>`
  ).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g transform="translate(20,20)">${petals}<circle r="5" fill="#6b1212"/></g></svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}
 
const colors = ['#8b2020','#7a1a1a','#9b3030','#c4745a']
 
function flowerRain(count) {
  for (let i = 0; i < count; i++) {
    const delay = i * 65
    setTimeout(() => {
      const img = document.createElement('img')
      img.src = makeFlower(colors[Math.floor(Math.random() * colors.length)])
      img.className = 'flower-confetti'
 
      const size = 18 + Math.random() * 20
      const x = Math.random() * window.innerWidth
      const dx = (Math.random() - 0.5) * 120
      const dur = (2.4 + Math.random() * 1.8) * 1000
      const rot = (Math.random() - 0.5) * 200
 
      img.style.cssText = `
        position:fixed;
        left:${x}px;
        top:-${size + 10}px;
        width:${size}px;
        height:${size}px;
        pointer-events:none;
        z-index:9999;
        opacity:1;
        transition:none;
      `
      document.body.appendChild(img)
 
      // js
      const start = performance.now()
      const totalY = window.innerHeight + 100
 
      function step(now) {
        const t = Math.min((now - start) / dur, 1)
        const ease = t * t 
        const y = ease * totalY
        const x2 = dx * t
        const r = rot * t
        const opacity = t < 0.08 ? t / 0.08 : t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1
        img.style.transform = `translate(${x2}px, ${y}px) rotate(${r}deg)`
        img.style.opacity = opacity
        if (t < 1) requestAnimationFrame(step)
        else img.remove()
      }
      requestAnimationFrame(step)
    }, delay)
  }
}
 
// png, svg
function tryRain(count) {
  const test = new Image()
  test.onload = () => pngRain(count)
  test.onerror = () => flowerRain(count)
  test.src = 'flower1.png'
}
 
function pngRain(count) {
  const srcs = ['flower1.png', 'flower2.png']
  for (let i = 0; i < count; i++) {
    const delay = i * 65
    setTimeout(() => {
      const img = document.createElement('img')
      img.src = srcs[Math.floor(Math.random() * srcs.length)]
      img.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0;'
 
      const size = 18 + Math.random() * 20
      const x = Math.random() * window.innerWidth
      const dx = (Math.random() - 0.5) * 120
      const dur = (2.4 + Math.random() * 1.8) * 1000
      const rot = (Math.random() - 0.5) * 200
 
      img.style.left = x + 'px'
      img.style.top = (-size - 10) + 'px'
      img.style.width = size + 'px'
      img.style.height = size + 'px'
      document.body.appendChild(img)
 
      const start = performance.now()
      const totalY = window.innerHeight + 100
 
      function step(now) {
        const t = Math.min((now - start) / dur, 1)
        const ease = t * t
        const y = ease * totalY
        const x2 = dx * t
        const r = rot * t
        const opacity = t < 0.08 ? t / 0.08 : t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1
        img.style.transform = `translate(${x2}px, ${y}px) rotate(${r}deg)`
        img.style.opacity = opacity
        if (t < 1) requestAnimationFrame(step)
        else img.remove()
      }
      requestAnimationFrame(step)
    }, delay)
  }
}
 
document.addEventListener('dblclick', () => tryRain(14))
 
let lastTap = 0
document.addEventListener('touchend', e => {
  const now = Date.now()
  if (now - lastTap < 300) tryRain(14)
  lastTap = now
}, { passive: true })
 
window.addEventListener('load', () => setTimeout(() => tryRain(20), 500))
