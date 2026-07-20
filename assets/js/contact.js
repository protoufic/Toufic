/**
 * CONTACT.JS — Contact panel form enhancement
 */
(function () {
  "use strict";

  // Pre-fill intent from data attributes on opener buttons
  document.querySelectorAll("[data-intent]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var intent = btn.dataset.intent;
      var select = document.getElementById("contact-intent");
      if (select) {
        select.value = intent;
        // Trigger change to show/hide partnership fields
        select.dispatchEvent(new Event("change"));
      }
    });
  });

  // Show/hide partnership fields based on intent
  var intentSelect = document.getElementById("contact-intent");
  var partnerFields = document.querySelectorAll(".partner-field");

  if (intentSelect) {
    intentSelect.addEventListener("change", function () {
      var isPartner = intentSelect.value === "Partnership";
      partnerFields.forEach(function (field) {
        field.style.display = isPartner ? "" : "none";
      });
    });
    // Initial state
    intentSelect.dispatchEvent(new Event("change"));
  }

  // WhatsApp button handler
  document.querySelectorAll("[data-whatsapp]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var message = btn.dataset.whatsapp || "Hello Toufic, I would like to discuss a possible partnership for the Six Continents mission.";
      var url = "https://wa.me/96176923943?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener");
    });
  });
})();
