/**
 * PROOF.JS — Race archive filtering, expansion, and load-more
 */
(function () {
  "use strict";

  var filterButtons = document.querySelectorAll(".filter[data-filter]");
  var raceCards = document.querySelectorAll(".proof-card[data-category]");
  var loadMoreBtn = document.querySelector(".load-more-btn");
  var visibleCount = 0;
  var batchSize = 8;

  if (filterButtons.length === 0 || raceCards.length === 0) return;

  // Initialize: show first batch
  showCards("all");

  // Filter click
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;

      // Update active state
      filterButtons.forEach(function (b) { b.classList.remove("filter--active"); });
      btn.classList.add("filter--active");

      showCards(filter);
    });
  });

  function showCards(filter) {
    visibleCount = 0;
    var shown = 0;

    raceCards.forEach(function (card) {
      var category = card.dataset.category;
      var tags = card.dataset.tags ? card.dataset.tags.split(",") : [];
      var match = filter === "all" || category === filter || tags.indexOf(filter) !== -1;

      if (match) {
        card.style.display = "";
        visibleCount++;
        if (shown < batchSize) {
          card.style.display = "";
          shown++;
        } else {
          card.style.display = "none";
        }
      } else {
        card.style.display = "none";
      }
    });

    updateLoadMore();
  }

  function updateLoadMore() {
    if (!loadMoreBtn) return;
    var hiddenCards = document.querySelectorAll('.proof-card[data-category]:not([style*="display: none"])');
    var hidden = 0;
    hiddenCards.forEach(function (c) {
      if (c.style.display === "none") hidden++;
    });
    if (hidden > 0) {
      loadMoreBtn.style.display = "";
      loadMoreBtn.textContent = "Load More (" + hidden + " remaining)";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      var activeFilter = document.querySelector(".filter--active");
      var filter = activeFilter ? activeFilter.dataset.filter : "all";

      raceCards.forEach(function (card) {
        var category = card.dataset.category;
        var tags = card.dataset.tags ? card.dataset.tags.split(",") : [];
        var match = filter === "all" || category === filter || tags.indexOf(filter) !== -1;

        if (match && card.style.display === "none") {
          card.style.display = "";
        }
      });

      loadMoreBtn.style.display = "none";
    });
  }

  // Expand/collapse race cards
  document.querySelectorAll(".proof-card").forEach(function (card) {
    var expandBtn = card.querySelector(".proof-card__expand");
    if (!expandBtn) return;

    expandBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      card.classList.toggle("proof-card--expanded");
      expandBtn.textContent = card.classList.contains("proof-card--expanded") ? "Show Less" : "Show More";
    });
  });
})();
