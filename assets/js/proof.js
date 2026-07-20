/**
 * PROOF.JS — Race filtering and expansion
 */
(function(){
  "use strict";
  var btns=document.querySelectorAll(".filter[data-filter]");
  var cards=document.querySelectorAll(".proof-card[data-category]");
  var loadBtn=document.querySelector(".load-more-btn");
  var batch=9;
  if(!btns.length||!cards.length)return;
  showCards("all");
  btns.forEach(function(b){b.addEventListener("click",function(){btns.forEach(function(x){x.classList.remove("filter--active")});b.classList.add("filter--active");showCards(b.dataset.filter)})});
  function showCards(f){var shown=0;cards.forEach(function(c){var cat=c.dataset.category,tags=c.dataset.tags?c.dataset.tags.split(","):[],match=f==="all"||cat===f||tags.indexOf(f)!==-1;if(match){shown++;c.style.display=shown<=batch?"":"none"}else{c.style.display="none"}});
    if(loadBtn){var hidden=cards.length-shown;loadBtn.parentElement.style.display=hidden>0?"":"none";loadBtn.textContent="Load More"}
  }
  if(loadBtn)loadBtn.addEventListener("click",function(){cards.forEach(function(c){if(c.style.display==="none")c.style.display=""});loadBtn.parentElement.style.display="none"});
  document.querySelectorAll(".proof-card").forEach(function(c){var ex=c.querySelector(".proof-card__expand");if(!ex)return;ex.addEventListener("click",function(e){e.stopPropagation();c.classList.toggle("proof-card--expanded");ex.textContent=c.classList.contains("proof-card--expanded")?"Show Less":"Show More"})});
})();
