/**
 * CONTACT.JS — Contact form enhancement
 */
(function(){
  "use strict";
  document.querySelectorAll("[data-intent]").forEach(function(btn){
    btn.addEventListener("click",function(){var s=document.getElementById("c-intent");if(s)s.value=btn.dataset.intent});
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function(btn){
    btn.addEventListener("click",function(e){e.preventDefault();window.open("https://wa.me/96176923943?text="+encodeURIComponent("Hello Toufic, I would like to discuss a possible partnership for the Six Continents mission."),'_blank','noopener')});
  });
})();
