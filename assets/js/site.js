(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  // Navigation
  const nav = $('.site-nav');
  const toggle = $('.nav-toggle');
  const body = document.body;
  const syncNav = () => nav?.classList.toggle('scrolled', scrollY > 18);
  syncNav();
  addEventListener('scroll', syncNav, { passive: true });
  toggle?.addEventListener('click', () => body.classList.toggle('menu-open'));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => body.classList.remove('menu-open')));

  // Global progress
  const progress = $('.scroll-progress');
  const syncProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  syncProgress();
  addEventListener('scroll', syncProgress, { passive: true });

  // Reveal
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -7% 0px' });
    $$('.reveal,.stagger').forEach(el => io.observe(el));
  } else {
    $$('.reveal,.stagger').forEach(el => el.classList.add('in-view'));
  }

  // Countdown
  const daysEl = $('[data-deadline-days]');
  if (daysEl) {
    const deadline = new Date('2027-11-27T23:59:59+03:00');
    daysEl.textContent = Math.max(0, Math.ceil((deadline - new Date()) / 86400000)).toLocaleString();
  }

  // Scroll-linked film. The supplied MP4 is re-encoded with dense keyframes for smooth seeking.
  const film = $('.mission-film');
  const video = $('#missionFilm');
  const poster = $('.film-poster');
  const meter = $('.film-meter i');
  const chapters = $$('.film-chapter');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (film && video && !reduced) {
    let duration = 15.069;
    let targetTime = 0;
    let lastSet = -1;
    let ready = false;
    let raf = 0;
    const thresholds = [0, .18, .39, .60, .79];

    const setChapter = p => {
      let active = 0;
      thresholds.forEach((t, i) => { if (p >= t) active = i; });
      chapters.forEach((c, i) => c.classList.toggle('active', i === active));
    };

    const readProgress = () => {
      const rect = film.getBoundingClientRect();
      const distance = Math.max(1, film.offsetHeight - innerHeight);
      const p = clamp(-rect.top / distance, 0, 1);
      targetTime = p * Math.max(.1, duration - .045);
      if (meter) meter.style.width = `${p * 100}%`;
      setChapter(p);
    };

    const seekLoop = () => {
      if (ready && Math.abs(targetTime - lastSet) > .018 && !document.hidden) {
        try {
          video.currentTime = targetTime;
          lastSet = targetTime;
        } catch (_) {}
      }
      raf = requestAnimationFrame(seekLoop);
    };

    const markReady = () => {
      duration = Number.isFinite(video.duration) ? video.duration : duration;
      ready = video.readyState >= 2;
      if (ready) {
        video.classList.add('ready');
        poster?.setAttribute('aria-hidden', 'true');
        readProgress();
      }
    };
    video.muted = true;
    video.playsInline = true;
    video.pause();
    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.load();

    // Some mobile browsers require a user gesture before time-based video seeking.
    const primeVideo = () => {
      video.play().then(() => {
        video.pause();
        video.currentTime = targetTime;
      }).catch(() => {});
    };
    addEventListener('touchstart', primeVideo, { once: true, passive: true });
    addEventListener('pointerdown', primeVideo, { once: true, passive: true });

    readProgress();
    addEventListener('scroll', readProgress, { passive: true });
    addEventListener('resize', readProgress);
    raf = requestAnimationFrame(seekLoop);
    addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  // Map
  const mapData = {
    northamerica: ['North America', 'One qualifying IRONMAN chapter. Race selection is not public until entry, rules, visa, recovery and funding are controlled.'],
    southamerica: ['South America', 'One qualifying IRONMAN chapter. Travel, bike transport, climate and recovery spacing must all work.'],
    europe: ['Europe', 'One qualifying IRONMAN chapter. The race must fit the final record rules and the complete training plan.'],
    africa: ['Africa', 'One qualifying IRONMAN chapter. The route stays private until it is safe, funded and executable.'],
    asia: ['Asia', 'One qualifying IRONMAN chapter planned around the academic calendar, travel access and final record guidelines.'],
    oceania: ['Oceania', 'One qualifying IRONMAN chapter. The final route must work physically, legally and financially.']
  };
  const mapTitle = $('#mapTitle');
  const mapCopy = $('#mapCopy');
  $$('.map-node').forEach(node => node.addEventListener('click', () => {
    $$('.map-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    const [title, copy] = mapData[node.dataset.continent] || ['Six Continents', 'Route under review.'];
    if (mapTitle) mapTitle.textContent = title;
    if (mapCopy) mapCopy.textContent = copy;
  }));

  // Partner dialog
  const dialog = $('#partnerDialog');
  $$('[data-open-partner]').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    if (dialog?.showModal) dialog.showModal();
    else location.href = 'mailto:protoufic@gmail.com?subject=Six%20Continents%20Partnership';
  }));
  $$('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => dialog?.close()));
  dialog?.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
  $('#partnerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Six Continents partnership — ${form.get('company') || form.get('name') || 'Inquiry'}`);
    const bodyText = [
      `Name: ${form.get('name') || ''}`,
      `Company: ${form.get('company') || ''}`,
      `Email: ${form.get('email') || ''}`,
      `Interest: ${form.get('route') || ''}`,
      '',
      form.get('message') || ''
    ].join('\n');
    location.href = `mailto:protoufic@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    dialog.close();
  });

  // Copy blocks
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const label = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => btn.textContent = label, 1200);
    } catch (_) {}
  }));

  // Lightbox. Works with static galleries and race cards created by record.js.
  const lightbox = $('#lightbox');
  const lbImg = $('#lightboxImage');
  const lbCaption = $('#lightboxCaption');
  let lbItems = [];
  let lbIndex = 0;
  const showLightboxItem = () => {
    const item = lbItems[lbIndex];
    if (!item || !lbImg) return;
    lbImg.src = item.src;
    lbImg.alt = item.caption || '';
    if (lbCaption) lbCaption.textContent = item.caption || '';
  };
  const openLightbox = (items, index = 0) => {
    if (!lightbox || !items?.length) return;
    lbItems = items;
    lbIndex = clamp(index, 0, items.length - 1);
    showLightboxItem();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };
  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    lightbox?.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };
  window.openMissionLightbox = openLightbox;
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;
    e.preventDefault();
    const group = trigger.dataset.gallery || 'default';
    const triggers = $$(`[data-lightbox][data-gallery="${CSS.escape(group)}"]`);
    const items = triggers.map(t => ({ src: t.dataset.full || t.getAttribute('href') || t.querySelector('img')?.src, caption: t.dataset.caption || t.querySelector('img')?.alt || '' }));
    openLightbox(items, triggers.indexOf(trigger));
  });
  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  $('[data-lightbox-prev]')?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showLightboxItem(); });
  $('[data-lightbox-next]')?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbItems.length; showLightboxItem(); });
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showLightboxItem(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbItems.length; showLightboxItem(); }
  });
})();
