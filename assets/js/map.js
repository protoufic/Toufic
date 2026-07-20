/**
 * MAP.JS — Interactive six-continent mission map
 */
(function () {
  "use strict";

  var mapContainer = document.querySelector(".map-container");
  if (!mapContainer) return;

  var points = mapContainer.querySelectorAll(".map-point");
  var tooltip = mapContainer.querySelector(".map-tooltip");
  if (!tooltip) return;

  var activePoint = null;

  points.forEach(function (point) {
    point.addEventListener("mouseenter", function () {
      showTooltip(point);
    });

    point.addEventListener("mouseleave", function () {
      hideTooltip();
    });

    point.addEventListener("click", function () {
      if (activePoint === point) {
        hideTooltip();
        activePoint = null;
      } else {
        showTooltip(point);
        activePoint = point;
      }
    });

    // Keyboard accessibility
    point.setAttribute("tabindex", "0");
    point.setAttribute("role", "button");
    point.setAttribute("aria-label", point.dataset.name || "Continent");

    point.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activePoint === point) {
          hideTooltip();
          activePoint = null;
        } else {
          showTooltip(point);
          activePoint = point;
        }
      }
    });

    point.addEventListener("focus", function () {
      showTooltip(point);
    });

    point.addEventListener("blur", function () {
      if (activePoint !== point) {
        hideTooltip();
      }
    });
  });

  function showTooltip(point) {
    var name = point.dataset.name || "";
    var status = point.dataset.status || "";
    var purpose = point.dataset.purpose || "";
    var race = point.dataset.race || "";
    var label = point.dataset.label || "";

    tooltip.querySelector(".map-tooltip__title").textContent = label + " — " + name;
    tooltip.querySelector(".map-tooltip__status").textContent = status === "started" ? "In Progress" : "Planned";
    tooltip.querySelector(".map-tooltip__text").textContent = purpose + (race ? " " + race : "");

    // Position tooltip
    var rect = point.getBoundingClientRect();
    var containerRect = mapContainer.getBoundingClientRect();
    var left = rect.left - containerRect.left + rect.width / 2;
    var top = rect.top - containerRect.top - 10;

    // Keep within bounds
    var tooltipWidth = 240;
    if (left + tooltipWidth / 2 > containerRect.width) {
      left = containerRect.width - tooltipWidth - 10;
    } else if (left - tooltipWidth / 2 < 0) {
      left = 10;
    } else {
      left = left - tooltipWidth / 2;
    }

    tooltip.style.left = left + "px";
    tooltip.style.top = (top - tooltip.offsetHeight) + "px";
    tooltip.classList.add("map-tooltip--visible");

    // Update active state
    points.forEach(function (p) { p.classList.remove("map-point--active"); });
    point.classList.add("map-point--active");
  }

  function hideTooltip() {
    tooltip.classList.remove("map-tooltip--visible");
    points.forEach(function (p) { p.classList.remove("map-point--active"); });
  }

  // Close tooltip on outside click
  document.addEventListener("click", function (e) {
    if (!mapContainer.contains(e.target)) {
      hideTooltip();
      activePoint = null;
    }
  });

  // Animated route line (SVG path drawing)
  var routeLine = mapContainer.querySelector(".map-route");
  if (routeLine) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          routeLine.classList.add("map-route--animate");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(mapContainer);
  }
})();
