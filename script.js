document.addEventListener('DOMContentLoaded',()=>{
  const m=document.getElementById('menu'),n=document.getElementById('nav'),t=document.getElementById('top');
  if(m&&n)m.onclick=()=>n.classList.toggle('open');
  document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>n&&n.classList.remove('open'));
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    items.forEach(x=>x.classList.add('animate-ready'));
    const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.1});
    items.forEach(x=>o.observe(x));
  }else items.forEach(x=>x.classList.add('visible'));
  addEventListener('scroll',()=>t&&t.classList.toggle('show',scrollY>500));
  if(t)t.onclick=()=>scrollTo({top:0,behavior:'smooth'});
  const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
});
