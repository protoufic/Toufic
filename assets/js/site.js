/**
 * SITE.JS — Maximum conversion, maximum interaction
 * Zero filler code. Every line earns its place.
 */
(function(){
  "use strict";

  /* NAV */
  var nav=document.querySelector(".nav");
  var toggle=document.querySelector(".nav__toggle");
  var mobileMenu=document.querySelector(".mobile-menu");
  var mobileLinks=document.querySelectorAll(".mobile-menu__link,.mobile-menu__cta .btn");

  window.addEventListener("scroll",function(){nav.classList.toggle("nav--scrolled",window.scrollY>50)},{passive:true});
  nav.classList.toggle("nav--scrolled",window.scrollY>50);

  if(toggle&&mobileMenu){
    toggle.addEventListener("click",function(){
      var open=mobileMenu.classList.contains("mobile-menu--open");
      if(open)closeMobile();else openMobile();
    });
    mobileLinks.forEach(function(l){l.addEventListener("click",closeMobile)});
  }
  function openMobile(){mobileMenu.classList.add("mobile-menu--open");toggle.classList.add("nav__toggle--open");toggle.setAttribute("aria-expanded","true");document.body.style.overflow="hidden"}
  function closeMobile(){mobileMenu.classList.remove("mobile-menu--open");toggle.classList.remove("nav__toggle--open");toggle.setAttribute("aria-expanded","false");document.body.style.overflow=""}

  /* ESCAPE */
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){closeMobile();closeContact();closeLightbox()}
  });

  /* SCROLL REVEAL */
  var reveals=document.querySelectorAll(".reveal");
  if(reveals.length){
    var rob=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("reveal--visible");rob.unobserve(e.target)}});
    },{threshold:0.08,rootMargin:"0px 0px -40px 0px"});
    reveals.forEach(function(el){rob.observe(el)});
  }

  /* COUNTDOWN */
  var cdEl=document.querySelector("[data-countdown]");
  if(cdEl){
    var deadline=new Date(cdEl.dataset.countdown+"T23:59:59Z");
    function tick(){
      var d=deadline-new Date();
      if(d<=0){cdEl.innerHTML='<div class="countdown__item"><div class="countdown__value">0</div><div class="countdown__label">Days</div></div>';return}
      var days=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
      cdEl.innerHTML='<div class="countdown__item"><div class="countdown__value">'+days+'</div><div class="countdown__label">Days</div></div><div class="countdown__item"><div class="countdown__value">'+String(h).padStart(2,'0')+'</div><div class="countdown__label">Hours</div></div><div class="countdown__item"><div class="countdown__value">'+String(m).padStart(2,'0')+'</div><div class="countdown__label">Min</div></div><div class="countdown__item"><div class="countdown__value">'+String(s).padStart(2,'0')+'</div><div class="countdown__label">Sec</div></div>';
    }
    tick();setInterval(tick,1000);
  }

  /* ANIMATED COUNTERS */
  var counters=document.querySelectorAll("[data-count-to]");
  if(counters.length){
    var cob=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){animCounter(e.target);cob.unobserve(e.target)}});
    },{threshold:0.5});
    counters.forEach(function(el){cob.observe(el)});
  }
  function animCounter(el){
    var target=parseInt(el.dataset.countTo,10),suf=el.dataset.countSuffix||"",pre=el.dataset.countPrefix||"",dur=1800,start=performance.now();
    (function step(now){
      var p=Math.min((now-start)/dur,1),ease=1-Math.pow(1-p,3);
      el.textContent=pre+Math.floor(ease*target).toLocaleString()+suf;
      if(p<1)requestAnimationFrame(step);
    })(start);
  }

  /* DISTANCE BARS */
  var bars=document.querySelectorAll(".distance-bar__fill[data-width]");
  if(bars.length){
    var bob=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.style.width=e.target.dataset.width;bob.unobserve(e.target)}});
    },{threshold:0.3});
    bars.forEach(function(el){el.style.width="0%";bob.observe(el)});
  }

  /* CONTACT PANEL */
  var panel=document.querySelector(".contact-panel");
  var overlay=document.querySelector(".contact-panel__overlay");
  document.querySelectorAll("[data-open-contact]").forEach(function(btn){
    btn.addEventListener("click",function(e){e.preventDefault();openContact()});
  });
  document.querySelectorAll("[data-close-contact]").forEach(function(btn){btn.addEventListener("click",closeContact)});
  if(overlay)overlay.addEventListener("click",closeContact);

  function openContact(){
    if(panel)panel.classList.add("contact-panel--open");
    if(overlay)overlay.classList.add("contact-panel__overlay--open");
    document.body.style.overflow="hidden";
    setTimeout(function(){var f=panel.querySelector("input,select,textarea");if(f)f.focus()},350);
  }
  function closeContact(){
    if(panel)panel.classList.remove("contact-panel--open");
    if(overlay)overlay.classList.remove("contact-panel__overlay--open");
    document.body.style.overflow="";
  }

  /* CONTACT FORM */
  var form=document.getElementById("contact-form");
  if(form)form.addEventListener("submit",function(e){
    e.preventDefault();
    var fd=new FormData(form);
    var subj=encodeURIComponent((fd.get("intent")||"Partnership")+" — Six Continents");
    var body=encodeURIComponent("Intent: "+fd.get("intent")+"\nName: "+fd.get("name")+"\nCompany: "+fd.get("company")+"\nRole: "+fd.get("role")+"\nEmail: "+fd.get("email")+"\nGoal: "+fd.get("goal")+"\nType: "+fd.get("type")+"\nFunding: "+fd.get("funding")+"\n\nMessage:\n"+fd.get("message"));
    window.location.href="mailto:protoufic@gmail.com?subject="+subj+"&body="+body;
  });

  /* WHATSAPP */
  document.querySelectorAll("[data-whatsapp]").forEach(function(btn){
    btn.addEventListener("click",function(e){
      e.preventDefault();
      window.open("https://wa.me/96176923943?text="+encodeURIComponent("Hello Toufic, I would like to discuss a possible partnership for the Six Continents mission."),'_blank','noopener');
    });
  });

  /* CONVERSION OPTIONS */
  document.querySelectorAll(".conversion-block__option").forEach(function(opt){
    opt.addEventListener("click",function(){
      document.querySelectorAll(".conversion-block__option").forEach(function(o){o.classList.remove("conversion-block__option--selected")});
      opt.classList.add("conversion-block__option--selected");
    });
  });

  /* LIGHTBOX */
  var lb=document.querySelector(".lightbox");
  var lbImg=lb?lb.querySelector(".lightbox__img"):null;
  var lbItems=[],lbIdx=0;
  document.querySelectorAll("[data-lightbox]").forEach(function(el){
    el.addEventListener("click",function(){
      lbItems=Array.from(document.querySelectorAll("[data-lightbox]"));
      lbIdx=lbItems.indexOf(el);
      openLB(el.dataset.lightbox||el.querySelector("img")?.src);
    });
  });
  function openLB(s){if(!lb||!lbImg)return;lbImg.src=s;lb.classList.add("lightbox--open");document.body.style.overflow="hidden"}
  function closeLightbox(){if(!lb)return;lb.classList.remove("lightbox--open");document.body.style.overflow=""}
  if(lb){
    lb.querySelector(".lightbox__close")?.addEventListener("click",closeLightbox);
    lb.addEventListener("click",function(e){if(e.target===lb)closeLightbox()});
    lb.querySelector(".lightbox__prev")?.addEventListener("click",function(){lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;lbImg.src=lbItems[lbIdx].dataset.lightbox||lbItems[lbIdx].querySelector("img")?.src});
    lb.querySelector(".lightbox__next")?.addEventListener("click",function(){lbIdx=(lbIdx+1)%lbItems.length;lbImg.src=lbItems[lbIdx].dataset.lightbox||lbItems[lbIdx].querySelector("img")?.src});
  }

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click",function(e){var t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"})}});
  });

  /* ACTIVE NAV */
  var cp=window.location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav__link").forEach(function(l){
    var h=l.getAttribute("href");
    if(h===cp||(cp===""&&h==="index.html"))l.classList.add("nav__link--active");
  });
})();
