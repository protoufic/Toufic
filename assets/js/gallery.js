/**
 * GALLERY.JS — Lightbox gallery
 */
(function(){
  "use strict";
  var items=document.querySelectorAll(".gallery-item[data-lightbox]");
  if(!items.length)return;
  var lb=document.querySelector(".lightbox"),img=lb?lb.querySelector(".lightbox__img"):null;
  var imgs=[],idx=0;
  items.forEach(function(it,i){imgs.push(it.dataset.lightbox);it.addEventListener("click",function(){idx=i;open()})});
  function open(){if(!lb||!img)return;img.src=imgs[idx];lb.classList.add("lightbox--open");document.body.style.overflow="hidden"}
  function close(){if(!lb)return;lb.classList.remove("lightbox--open");document.body.style.overflow=""}
  function prev(){idx=(idx-1+imgs.length)%imgs.length;if(img)img.src=imgs[idx]}
  function next(){idx=(idx+1)%imgs.length;if(img)img.src=imgs[idx]}
  if(lb){lb.querySelector(".lightbox__close")?.addEventListener("click",close);lb.addEventListener("click",function(e){if(e.target===lb)close()});lb.querySelector(".lightbox__prev")?.addEventListener("click",prev);lb.querySelector(".lightbox__next")?.addEventListener("click",next)}
  document.addEventListener("keydown",function(e){if(!lb||!lb.classList.contains("lightbox--open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")prev();if(e.key==="ArrowRight")next()});
})();
