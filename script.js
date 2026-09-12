// Breskvar redesign — light, dependency-free interactions.
(function () {
  "use strict";
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  // Sticky nav shadow/border on scroll
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Reveal on scroll (progressive enhancement — content is visible without JS)
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Contact form → opens the visitor's email client to the academy (no backend).
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "Povpraševanje — " + (d.get("program") || "trening");
      var body =
        "Ime: " + (d.get("ime") || "") + "\n" +
        "E-pošta: " + (d.get("email") || "") + "\n" +
        "Program: " + (d.get("program") || "") + "\n\n" +
        (d.get("sporocilo") || "");
      window.location.href =
        "mailto:tenis.breskvar@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  // Footer year (kept static-safe)
  var y = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = y; });
})();
