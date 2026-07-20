/**
 * GALLERY.JS — Warsaw race gallery with lightbox
 */
(function () {
  "use strict";

  var galleryItems = document.querySelectorAll(".gallery-item[data-lightbox]");
  if (galleryItems.length === 0) return;

  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".lightbox__img") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox__close") : null;
  var lightboxPrev = lightbox ? lightbox.querySelector(".lightbox__prev") : null;
  var lightboxNext = lightbox ? lightbox.querySelector(".lightbox__next") : null;

  var images = [];
  var currentIndex = 0;

  galleryItems.forEach(function (item, i) {
    images.push(item.dataset.lightbox);
    item.addEventListener("click", function () {
      currentIndex = i;
      open();
    });
  });

  function open() {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add("lightbox--open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!lightbox) return;
    lightbox.classList.remove("lightbox--open");
    document.body.style.overflow = "";
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
  }

  if (lightboxClose) lightboxClose.addEventListener("click", close);
  if (lightboxPrev) lightboxPrev.addEventListener("click", prev);
  if (lightboxNext) lightboxNext.addEventListener("click", next);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("lightbox--open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
