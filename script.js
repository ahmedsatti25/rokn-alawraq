document.addEventListener('DOMContentLoaded',()=>{
  const m=document.getElementById('menu'), n=document.getElementById('nav'), t=document.getElementById('top');
  if(m&&n)m.addEventListener('click',()=>n.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>n&&n.classList.remove('open')));

  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const o=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}
      });
    },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
    items.forEach(x=>{x.classList.add('animate-ready');o.observe(x)});
  }else items.forEach(x=>x.classList.add('visible'));

  let ticking=false;
  const updateTop=()=>{
    if(t) t.classList.toggle('show',window.scrollY>500);
    ticking=false;
  };
  window.addEventListener('scroll',()=>{
    if(!ticking){ticking=true;requestAnimationFrame(updateTop)}
  },{passive:true});
  if(t)t.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
});
