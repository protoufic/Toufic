(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const body = document.body;

  // Navigation
  const nav = $('.site-nav');
  const toggle = $('.nav-toggle');
  const updateNav = () => nav?.classList.toggle('scrolled', scrollY > 16);
  updateNav();
  addEventListener('scroll', updateNav, { passive: true });
  toggle?.addEventListener('click', () => body.classList.toggle('menu-open'));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => body.classList.remove('menu-open')));

  // Page progress
  const progress = $('.scroll-progress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  };
  updateProgress();
  addEventListener('scroll', updateProgress, { passive: true });

  // Reveals
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -7% 0px' });
    $$('.reveal,.stagger,.discipline-card').forEach(el => observer.observe(el));
  } else {
    $$('.reveal,.stagger,.discipline-card').forEach(el => el.classList.add('in-view'));
  }

  // Deadline counter
  $$('[data-deadline-days]').forEach(el => {
    const deadline = new Date('2027-11-27T23:59:59+03:00');
    el.textContent = Math.max(0, Math.ceil((deadline - new Date()) / 86400000)).toLocaleString();
  });

  // Reliable scroll film: image sequence on canvas. This avoids browser video-seeking failures.
  const film = $('.mission-film');
  const canvas = $('#filmCanvas');
  const poster = $('.film-poster');
  const meter = $('.film-progress i');
  const indexLabel = $('.film-index');
  const chapters = $$('.film-chapter');
  if (film && canvas && !reduced) {
    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const frameCount = 181;
    const frames = new Array(frameCount);
    let currentFrame = -1;
    let targetFrame = 0;
    let raf = 0;
    let canvasW = 0, canvasH = 0;
    const chapterStarts = [0, .17, .33, .49, .65, .82];

    const path = i => `assets/frames/mission/frame_${String(i + 1).padStart(4, '0')}.webp`;
    const loadFrame = i => {
      if (i < 0 || i >= frameCount || frames[i]) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = path(i);
      img.onload = () => {
        frames[i] = img;
        if (i === 0) {
          canvas.classList.add('ready');
          drawFrame(0);
          poster?.setAttribute('aria-hidden', 'true');
        }
      };
      img.onerror = () => { frames[i] = null; };
      frames[i] = img;
    };

    // Load opening frames first, then the rest in waves.
    for (let i = 0; i < 18; i++) loadFrame(i);
    const loadAll = () => {
      let i = 18;
      const batch = () => {
        const end = Math.min(frameCount, i + 18);
        for (; i < end; i++) loadFrame(i);
        if (i < frameCount) setTimeout(batch, 70);
      };
      batch();
    };
    if ('requestIdleCallback' in window) requestIdleCallback(loadAll, { timeout: 1000 });
    else setTimeout(loadAll, 250);

    const resizeCanvas = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvasW = Math.round(innerWidth * dpr);
      canvasH = Math.round(innerHeight * dpr);
      if (canvas.width !== canvasW || canvas.height !== canvasH) {
        canvas.width = canvasW;
        canvas.height = canvasH;
      }
      if (currentFrame >= 0) drawFrame(currentFrame, true);
    };

    const findFrame = index => {
      if (frames[index]?.complete && frames[index].naturalWidth) return frames[index];
      for (let d = 1; d < 20; d++) {
        const a = index - d, b = index + d;
        if (a >= 0 && frames[a]?.complete && frames[a].naturalWidth) return frames[a];
        if (b < frameCount && frames[b]?.complete && frames[b].naturalWidth) return frames[b];
      }
      return frames[0]?.complete ? frames[0] : null;
    };

    const drawFrame = (index, force = false) => {
      if (!force && index === currentFrame) return;
      const img = findFrame(index);
      if (!img || !img.naturalWidth) return;
      const scale = Math.max(canvasW / img.naturalWidth, canvasH / img.naturalHeight);
      const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvasW, canvasH);
      context.drawImage(img, (canvasW - w) / 2, (canvasH - h) / 2, w, h);
      currentFrame = index;
    };

    const setChapter = p => {
      let active = 0;
      chapterStarts.forEach((t, i) => { if (p >= t) active = i; });
      chapters.forEach((chapter, i) => chapter.classList.toggle('active', i === active));
      if (indexLabel) indexLabel.textContent = `${String(active + 1).padStart(2, '0')} / 06`;
    };

    const readFilm = () => {
      const rect = film.getBoundingClientRect();
      const distance = Math.max(1, film.offsetHeight - innerHeight);
      const p = clamp(-rect.top / distance, 0, 1);
      targetFrame = Math.round(p * (frameCount - 1));
      if (meter) meter.style.width = `${p * 100}%`;
      setChapter(p);
    };

    const loop = () => {
      drawFrame(targetFrame);
      raf = requestAnimationFrame(loop);
    };
    resizeCanvas();
    readFilm();
    addEventListener('resize', resizeCanvas);
    addEventListener('scroll', readFilm, { passive: true });
    raf = requestAnimationFrame(loop);
    addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  // Interactive map
  const mapData = {
    northamerica: ['North America', 'One qualifying full IRONMAN chapter. Final race announced only after entry, rules, visa, recovery and funding are controlled.'],
    southamerica: ['South America', 'One qualifying full IRONMAN chapter. Climate, travel, bike transport and recovery spacing must all work.'],
    europe: ['Europe', 'One qualifying full IRONMAN chapter selected against the record rules, academic calendar and training plan.'],
    africa: ['Africa', 'One qualifying full IRONMAN chapter. The route stays private until it is safe, funded and executable.'],
    asia: ['Asia', 'One qualifying full IRONMAN chapter planned around travel access, academic commitments and final record guidelines.'],
    oceania: ['Oceania', 'One qualifying full IRONMAN chapter. The final route must work physically, legally and financially.']
  };
  const mapTitle = $('#mapTitle');
  const mapCopy = $('#mapCopy');
  const activateMap = key => {
    $$('.map-node').forEach(n => n.classList.toggle('active', n.dataset.continent === key));
    $$('.map-list-mobile button').forEach(n => n.classList.toggle('active', n.dataset.continent === key));
    const [title, copy] = mapData[key] || ['Six Continents', 'Final route under review.'];
    if (mapTitle) mapTitle.textContent = title;
    if (mapCopy) mapCopy.textContent = copy;
  };
  $$('[data-continent]').forEach(node => node.addEventListener('click', () => activateMap(node.dataset.continent)));

  // Partnership choice dialog
  const dialog = $('#contactDialog');
  $$('[data-open-contact]').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    if (dialog?.showModal) dialog.showModal();
    else location.href = 'mailto:protoufic@gmail.com?subject=Six%20Continents%20Partnership';
  }));
  $$('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => dialog?.close()));
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  // Lightbox
  const lightbox = $('#lightbox');
  const lbImg = $('#lightboxImage');
  const lbCaption = $('#lightboxCaption');
  let lbItems = [], lbIndex = 0;
  const showItem = () => {
    const item = lbItems[lbIndex];
    if (!item || !lbImg) return;
    lbImg.src = item.src; lbImg.alt = item.caption || '';
    if (lbCaption) lbCaption.textContent = item.caption || '';
  };
  const openLightbox = (items, index = 0) => {
    if (!lightbox || !items.length) return;
    lbItems = items; lbIndex = clamp(index, 0, items.length - 1); showItem();
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); body.classList.add('modal-open');
  };
  const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); body.classList.remove('modal-open'); };
  window.openMissionLightbox = openLightbox;
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;
    e.preventDefault();
    const group = trigger.dataset.gallery || 'default';
    const triggers = $$(`[data-lightbox][data-gallery="${CSS.escape(group)}"]`);
    const items = triggers.map(t => ({
      src: t.dataset.full || t.getAttribute('href') || t.querySelector('img')?.src,
      caption: t.dataset.caption || t.querySelector('img')?.alt || ''
    })).filter(x => x.src);
    openLightbox(items, Math.max(0, triggers.indexOf(trigger)));
  });
  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  $('[data-lightbox-prev]')?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showItem(); });
  $('[data-lightbox-next]')?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbItems.length; showItem(); });
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); dialog?.close(); body.classList.remove('menu-open'); }
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showItem(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbItems.length; showItem(); }
  });

  // Small pointer tilt, only on capable devices
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }
})();
