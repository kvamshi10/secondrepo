(function(){
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  window.addEventListener('resize', resize, {passive:true}); resize();
  class P{ constructor(){ this.reset(); } reset(){ this.x=Math.random()*w; this.y=Math.random()*h; this.vx=(Math.random()-0.5)*0.6; this.vy=(Math.random()-0.5)*0.6; this.r=1+Math.random()*2.5; this.a=0.2+Math.random()*0.6 } step(){ this.x+=this.vx; this.y+=this.vy; if(this.x<-10||this.x>w+10||this.y<-10||this.y>h+10) this.reset() } draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${this.a})`; ctx.fill() } }
  function initParticles(n=70){ particles=[]; for(let i=0;i<n;i++) particles.push(new P()) }
  initParticles();
  function loop(){ ctx.clearRect(0,0,w,h); ctx.globalCompositeOperation='lighter'; for(const p of particles){ p.step(); p.draw() } ctx.lineWidth=0.6; for(let i=0;i<particles.length;i++){ for(let j=i+1;j<particles.length;j++){ const a=particles[i], b=particles[j]; const dx=a.x-b.x, dy=a.y-b.y; const d=dx*dx+dy*dy; if(d<20000){ const alpha=0.12-d/20000*0.12; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(124,58,237,${alpha})`; ctx.stroke() } } } ctx.globalCompositeOperation='source-over'; requestAnimationFrame(loop) }
  loop();
  // typing
  const typed=document.getElementById('typed'); const roles=['Frontend Engineer','UI Animator','Interactive Designer','Open-source Contributor']; let ri=0,ci=0,deleting=false;
  function tick(){ const role=roles[ri]; if(!deleting){ ci++; typed.textContent=role.slice(0,ci); if(ci===role.length){ deleting=true; setTimeout(tick,1400); return } } else { ci--; typed.textContent=role.slice(0,ci); if(ci===0){ deleting=false; ri=(ri+1)%roles.length } } setTimeout(tick, deleting?60:90) }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ()=>setTimeout(tick,500)); else setTimeout(tick,500);
  document.querySelectorAll('.nav a').forEach(a=>{ a.addEventListener('click', e=>{ e.preventDefault(); const el=document.querySelector(a.getAttribute('href')); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}) }) });
})();
