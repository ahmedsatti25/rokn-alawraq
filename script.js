(() => {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  const slider = document.getElementById('serviceSlider');
  const slides = slider ? [...slider.querySelectorAll('.slide')] : [];
  const dotsWrap = document.getElementById('dots');
  const progress = document.getElementById('progressBar');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  let index = 0;
  let timer = null;
  let started = false;
  const duration = 5000;

  if (slider && slides.length) {
    slides.forEach((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `عرض ${slide.dataset.title || 'الخدمة ' + (i + 1)}`);
      dot.addEventListener('click', () => { show(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    const dots = [...dotsWrap.children];

    function animateProgress() {
      if (!progress) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${duration}ms linear`;
          progress.style.width = '100%';
        });
      });
    }

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        const active = n === index;
        slide.classList.toggle('active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, n) => dot.classList.toggle('active', n === index));
      animateProgress();
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function start() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stop();
      timer = setInterval(() => show(index + 1), duration);
      started = true;
    }
    function restart() { start(); }

    prev.addEventListener('click', () => { show(index - 1); restart(); });
    next.addEventListener('click', () => { show(index + 1); restart(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', () => { if (started) start(); });
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', () => { if (started) start(); });

    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { show(index - 1); restart(); }
      if (e.key === 'ArrowLeft') { show(index + 1); restart(); }
    });

    let touchStart = 0;
    slider.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; stop(); }, {passive:true});
    slider.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 45) show(index + (delta > 0 ? -1 : 1));
      start();
    }, {passive:true});

    show(0);
    start();
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
