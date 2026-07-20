/**
 * SCROLL-STORY.JS — Dynamic mission stage with scroll-linked states
 */
(function () {
  "use strict";

  var stage = document.querySelector(".scroll-stage");
  if (!stage) return;

  var states = stage.querySelectorAll(".scroll-stage__state");
  var progress = stage.querySelector(".scroll-stage__progress-fill");
  var stageHeight = stage.offsetHeight;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update() {
    var rect = stage.getBoundingClientRect();
    var viewportH = window.innerHeight;
    var totalScroll = stageHeight - viewportH;
    var scrolled = -rect.top;
    var pct = Math.max(0, Math.min(1, scrolled / totalScroll));

    if (progress) {
      progress.style.width = (pct * 100) + "%";
    }

    // Update states based on scroll position
    states.forEach(function (state, i) {
      var stateStart = i / states.length;
      var stateEnd = (i + 1) / states.length;

      if (pct >= stateStart && pct < stateEnd) {
        state.classList.add("scroll-stage__state--active");
        state.style.opacity = "1";
        state.style.transform = "translateY(0)";
      } else {
        state.classList.remove("scroll-stage__state--active");
        state.style.opacity = "0";
        state.style.transform = "translateY(20px)";
      }
    });
  }

  if (!reducedMotion) {
    window.addEventListener("scroll", update, { passive: true });
    update();
  } else {
    // Show all states immediately for reduced motion
    states.forEach(function (state) {
      state.style.opacity = "1";
      state.style.transform = "none";
    });
  }
})();
