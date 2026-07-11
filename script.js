
/* ── PARTICLES ─────────────────────────────────────────── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['rgba(212,175,55,', 'rgba(139,92,246,', 'rgba(196,181,253,', 'rgba(232,121,160,', 'rgba(103,232,249,'];
const SHAPES = ['✦', '◈', '⬡', '·', '✧', '∘'];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = H + 20;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 0.6 + 0.2;
    this.drift = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.6 + 0.2;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
    this.isShape = Math.random() > 0.7;
    this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  }
  draw() {
    const progress = this.life / this.maxLife;
    const fade = progress < 0.1 ? progress / 0.1 : progress > 0.9 ? (1 - progress) / 0.1 : 1;
    ctx.globalAlpha = this.alpha * fade;
    if (this.isShape) {
      ctx.fillStyle = this.color + (this.alpha * fade) + ')';
      ctx.font = `${this.size * 4}px serif`;
      ctx.fillText(this.shape, this.x, this.y);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (this.alpha * fade) + ')';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    this.life++;
    if (this.life > this.maxLife) this.reset();
  }
}

for (let i = 0; i < 60; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife;
  p.y = Math.random() * H;
  particles.push(p);
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

/* ── SCROLL REVEAL ─────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ── NAV SCROLL EFFECT ─────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 60
    ? 'rgba(4,3,10,0.92)'
    : 'rgba(4,3,10,0.7)';
});

/* ── WHATSAPP ───────────────────────────────────────────── */
const WA_NUMBER = '9779765377227'; 
function orderWhatsApp(product) {
  const msg = `✨ Hello Mystic Aura Stone!\n\nI'm interested in ordering:\n🔮 *${product}*\n\nPlease share more details about availability and shipping. Thank you! 🙏`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function sendWhatsAppForm() {
  const name = document.getElementById('fname').value || 'Customer';
  const select = document.querySelector('select');
  const product = select.value || 'Crystal Collection';
  const msg = `✨ Hello Mystic Aura Stone!\n\nMy name is *${name}*.\n\nI'm interested in: *${product}*\n\nPlease help me place an order. Thank you! 🙏`;
  const url = `https://wa.me/${+9779765377227}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* ── STAGGER PRODUCT CARDS ─────────────────────────────── */
document.querySelectorAll('.product-card.reveal').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.benefit-card.reveal').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});


// Client-side deterrents (not true security)
document.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("dragstart",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
 const k=(e.key||"").toLowerCase();
 if(e.key==="F12"||
   (e.ctrlKey&&k==="u")||
   (e.ctrlKey&&k==="s")||
   (e.ctrlKey&&e.shiftKey&&["i","j","c"].includes(k))){
   e.preventDefault();
 }
});
setInterval(()=>{
 const t=160;
 if(window.outerWidth-window.innerWidth>t||window.outerHeight-window.innerHeight>t){
   document.body.innerHTML='<div style="display:flex;height:100vh;align-items:center;justify-content:center;background:#000;color:#fff;font:24px Arial">Developer Tools Detected</div>';
 }
},1000);
if(window.top!==window.self){window.top.location=window.location;}
