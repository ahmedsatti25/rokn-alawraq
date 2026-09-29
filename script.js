/* =========================================================
   RUKN AL AWRAQ
   Main JavaScript - v6.0
========================================================= */

"use strict";


/* =========================================================
   SETTINGS
========================================================= */

/*
  مهم جداً بالنسبة للخريطة:

  ضع هنا رابط Google Maps الدقيق للمحل.

  للحصول على الرابط:
  1. افتح Google Maps.
  2. حدد مكان ركن الأوراق بالضبط.
  3. اضغط "مشاركة".
  4. انسخ رابط Google Maps.
  5. ألصقه مكان الرابط الموجود بين علامات الاقتباس.

  مثال:
  const MAPS_LINK = "https://maps.app.goo.gl/XXXXXXXX";

  إذا تركته كما هو، سيستخدم رابط البحث الحالي.
*/

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=سوق%20كاب%20الجداد%20مستوصف%20حاجة%20آمنة%20الطبي";


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const mapsBtn = document.getElementById("mapsBtn");
const yearEl = document.getElementById("year");


/* =========================================================
   YEAR
========================================================= */

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   GOOGLE MAPS
========================================================= */

if (mapsBtn) {
  mapsBtn.href = MAPS_LINK;
}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {
  if (!menuBtn || !nav) return;

  menuBtn.classList.remove("active");
  nav.classList.remove("open");

  menuBtn.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}


function toggleMenu() {
  if (!menuBtn || !nav) return;

  const isOpen = nav.classList.contains("open");

  if (isOpen) {
    closeMenu();
  } else {
    menuBtn.classList.add("active");
    nav.classList.add("open");

    menuBtn.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  }
}


if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}


/* Close menu after clicking a navigation link */

if (nav) {
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}


/* Close menu when pressing Escape */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {
  if (!header) return;

  if (window.scrollY > 25) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

function updateActiveNav() {

  if (!sections.length || !navLinks.length) return;

  const scrollPosition =
    window.scrollY + window.innerHeight * 0.35;

  let currentSection = "home";

  sections.forEach(section => {

    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (
      scrollPosition >= top &&
      scrollPosition < top + height
    ) {
      currentSection = section.id;
    }

  });

  navLinks.forEach(link => {

    const target = link.getAttribute("href");

    link.classList.toggle(
      "active",
      target === `#${currentSection}`
    );

  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});

updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".service-card, .feature, .work-placeholder, .location-box, .contact-box"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("reveal");
          
          requestAnimationFrame(() => {
            entry.target.classList.add("visible");
          });

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

}


/* =========================================================
   SERVICE CARD INTERACTION
========================================================= */

document.querySelectorAll(".service-card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.setProperty("--hover-scale", "1");
  });

});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const headerHeight =
      header ? header.offsetHeight : 0;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      10;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

  });

});


/* =========================================================
   PHONE NUMBER PROTECTION
========================================================= */

document.querySelectorAll('a[href^="tel:"]').forEach(link => {

  link.addEventListener("click", () => {

    /*
      يمكنك إضافة Analytics هنا لاحقاً
      إذا أردت معرفة عدد الضغطات على الاتصال.
    */

  });

});


/* =========================================================
   WHATSAPP BUTTON TRACKING HOOK
========================================================= */

document.querySelectorAll(
  'a[href*="wa.me"]'
).forEach(link => {

  link.addEventListener("click", () => {

    /*
      زر واتساب جاهز للتتبع مستقبلاً.
    */

  });

});


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener("resize", () => {

  /*
    إذا انتقل المستخدم من الهاتف إلى سطح المكتب
    أثناء فتح القائمة، نغلق القائمة.
  */

  if (window.innerWidth > 850) {
    closeMenu();
  }

});


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add("page-loaded");

});
