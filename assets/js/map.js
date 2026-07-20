/**
 * MAP.JS — Interactive six-continent map
 */
(function(){
  "use strict";
  var mc=document.querySelector(".map-container");
  if(!mc)return;
  var pts=mc.querySelectorAll(".map-point"),tt=mc.querySelector(".map-tooltip"),active=null;
  if(!tt)return;
  pts.forEach(function(p){
    p.setAttribute("tabindex","0");p.setAttribute("role","button");p.setAttribute("aria-label",p.dataset.name||"Continent");
    p.addEventListener("mouseenter",function(){show(p)});
    p.addEventListener("mouseleave",function(){hide()});
    p.addEventListener("click",function(){if(active===p){hide();active=null}else{show(p);active=p}});
    p.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();if(active===p){hide();active=null}else{show(p);active=p}}});
    p.addEventListener("focus",function(){show(p)});
    p.addEventListener("blur",function(){if(active!==p)hide()});
  });
  function show(p){
    tt.querySelector(".map-tooltip__title").textContent=(p.dataset.label||"")+" — "+(p.dataset.name||"");
    tt.querySelector(".map-tooltip__status").textContent=p.dataset.status==="started"?"In Progress":"Planned";
    tt.querySelector(".map-tooltip__text").textContent=p.dataset.purpose||"";
    var r=p.getBoundingClientRect(),cr=mc.getBoundingClientRect(),left=r.left-cr.left+r.width/2,top=r.top-cr.top-10;
    var tw=220;left=Math.max(10,Math.min(left-tw/2,cr.width-tw-10));
    tt.style.left=left+"px";tt.style.top=(top-tt.offsetHeight)+"px";
    tt.classList.add("map-tooltip--visible");
    pts.forEach(function(x){x.classList.remove("map-point--active")});p.classList.add("map-point--active");
  }
  function hide(){tt.classList.remove("map-tooltip--visible");pts.forEach(function(x){x.classList.remove("map-point--active")})}
  document.addEventListener("click",function(e){if(!mc.contains(e.target)){hide();active=null}});
})();
