/**
 * SITE.JS — Core interactions, navigation, scroll reveal, countdown
 */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     NAVIGATION
  ----------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link, .mobile-menu__cta .btn");

  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
    lastScroll = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.contains("mobile-menu--open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add("mobile-menu--open");
    toggle.classList.add("nav__toggle--open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("mobile-menu--open");
    toggle.classList.remove("nav__toggle--open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
      closeContactPanel();
      closeLightbox();
    }
  });

  /* -----------------------------------------------------------
     SCROLL REVEAL
  ----------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     COUNTDOWN
  ----------------------------------------------------------- */
  const countdownEl = document.querySelector("[data-countdown]");
  if (countdownEl) {
    const deadline = new Date(countdownEl.dataset.countdown + "T23:59:59Z");

    function updateCountdown() {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        countdownEl.innerHTML =
          '<div class="countdown__item"><div class="countdown__value">0</div><div class="countdown__label">Days</div></div>';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      countdownEl.innerHTML =
        '<div class="countdown__item"><div class="countdown__value">' +
        days +
        '</div><div class="countdown__label">Days</div></div>' +
        '<div class="countdown__item"><div class="countdown__value">' +
        String(hours).padStart(2, "0") +
        '</div><div class="countdown__label">Hours</div></div>' +
        '<div class="countdown__item"><div class="countdown__value">' +
        String(mins).padStart(2, "0") +
        '</div><div class="countdown__label">Minutes</div></div>' +
        '<div class="countdown__item"><div class="countdown__value">' +
        String(secs).padStart(2, "0") +
        '</div><div class="countdown__label">Seconds</div></div>';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* -----------------------------------------------------------
     ANIMATED COUNTERS
  ----------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.countSuffix || "";
    const prefix = el.dataset.countPrefix || "";
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* -----------------------------------------------------------
     DISTANCE BARS
  ----------------------------------------------------------- */
  const bars = document.querySelectorAll(".distance-bar__fill[data-width]");
  if (bars.length > 0) {
    const barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(function (el) {
      el.style.width = "0%";
      barObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     CONTACT PANEL
  ----------------------------------------------------------- */
  const contactPanel = document.querySelector(".contact-panel");
  const contactOverlay = document.querySelector(".contact-panel__overlay");
  const contactOpeners = document.querySelectorAll("[data-open-contact]");
  const contactClosers = document.querySelectorAll("[data-close-contact]");

  contactOpeners.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openContactPanel();
    });
  });

  contactClosers.forEach(function (btn) {
    btn.addEventListener("click", closeContactPanel);
  });

  if (contactOverlay) {
    contactOverlay.addEventListener("click", closeContactPanel);
  }

  function openContactPanel() {
    if (contactPanel) contactPanel.classList.add("contact-panel--open");
    if (contactOverlay) contactOverlay.classList.add("contact-panel__overlay--open");
    document.body.style.overflow = "hidden";
    // Focus first input
    setTimeout(function () {
      var firstInput = contactPanel.querySelector("input, select, textarea");
      if (firstInput) firstInput.focus();
    }, 400);
  }

  function closeContactPanel() {
    if (contactPanel) contactPanel.classList.remove("contact-panel--open");
    if (contactOverlay) contactOverlay.classList.remove("contact-panel__overlay--open");
    document.body.style.overflow = "";
  }

  /* -----------------------------------------------------------
     CONTACT FORM — mailto
  ----------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(contactForm);
      var intent = fd.get("intent") || "General";
      var name = fd.get("name") || "";
      var company = fd.get("company") || "";
      var role = fd.get("role") || "";
      var email = fd.get("email") || "";
      var goal = fd.get("goal") || "";
      var type = fd.get("type") || "";
      var funding = fd.get("funding") || "";
      var message = fd.get("message") || "";

      var subject = encodeURIComponent(
        intent + " Enquiry — Six Continents Mission"
      );
      var body = encodeURIComponent(
        "Intent: " +
          intent +
          "\n\nName: " +
          name +
          "\nCompany: " +
          company +
          "\nRole: " +
          role +
          "\nEmail: " +
          email +
          "\nGoal: " +
          goal +
          "\nPartnership Type: " +
          type +
          "\nFunding: " +
          funding +
          "\n\nMessage:\n" +
          message
      );

      window.location.href =
        "mailto:protoufic@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* -----------------------------------------------------------
     CONVERSION BLOCK OPTION SELECT
  ----------------------------------------------------------- */
  const convOptions = document.querySelectorAll(".conversion-block__option");
  convOptions.forEach(function (opt) {
    opt.addEventListener("click", function () {
      convOptions.forEach(function (o) {
        o.classList.remove("conversion-block__option--selected");
      });
      opt.classList.add("conversion-block__option--selected");
    });
  });

  /* -----------------------------------------------------------
     LIGHTBOX
  ----------------------------------------------------------- */
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox__img") : null;
  const lightboxClose = lightbox ? lightbox.querySelector(".lightbox__close") : null;
  const lightboxPrev = lightbox ? lightbox.querySelector(".lightbox__prev") : null;
  const lightboxNext = lightbox ? lightbox.querySelector(".lightbox__next") : null;
  let lightboxImages = [];
  let lightboxIndex = 0;

  document.querySelectorAll("[data-lightbox]").forEach(function (el, i) {
    el.addEventListener("click", function () {
      lightboxImages = Array.from(document.querySelectorAll("[data-lightbox]"));
      lightboxIndex = lightboxImages.indexOf(el);
      openLightbox(el.dataset.lightbox || el.querySelector("img")?.src);
    });
  });

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("lightbox--open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("lightbox--open");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    var src = lightboxImages[lightboxIndex].dataset.lightbox || lightboxImages[lightboxIndex].querySelector("img")?.src;
    if (src) lightboxImg.src = src;
  });
  if (lightboxNext) lightboxNext.addEventListener("click", function () {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    var src = lightboxImages[lightboxIndex].dataset.lightbox || lightboxImages[lightboxIndex].querySelector("img")?.src;
    if (src) lightboxImg.src = src;
  });

  /* -----------------------------------------------------------
     SMOOTH SCROLL FOR ANCHOR LINKS
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -----------------------------------------------------------
     ACTIVE NAV LINK
  ----------------------------------------------------------- */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("nav__link--active");
    }
  });
})();
