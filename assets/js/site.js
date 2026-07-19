(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const config = window.SITE_CONFIG || {};
  const body = document.body;
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;

  body.classList.toggle('reduced-motion', prefersReducedMotion);

  /* Header and standard mobile navigation */
  const header = $('.site-header');
  const navToggle = $('.nav-toggle');
  const navPanel = $('#primaryNavigation');
  const setMenu = open => {
    if (!navToggle || !navPanel) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navPanel.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
  };
  navToggle?.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  $$('.nav-link, .nav-partner', navPanel || document).forEach(link => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  let headerTicking = false;
  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', scrollY > 18);
    headerTicking = false;
  };
  addEventListener('scroll', () => {
    if (!headerTicking) {
      headerTicking = true;
      requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  updateHeader();

  const page = body.dataset.page;
  if (page) {
    $$(`[data-nav="${CSS.escape(page)}"]`).forEach(link => {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    });
  }

  /* Scroll progress */
  const scrollProgress = $('.scroll-progress');
  let progressTicking = false;
  const updateProgress = () => {
    const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    scrollProgress?.style.setProperty('--scroll-progress', String(clamp(scrollY / distance)));
    progressTicking = false;
  };
  addEventListener('scroll', () => {
    if (!progressTicking) {
      progressTicking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  /* Viewport reveals */
  const revealItems = $$('.reveal, .stagger');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  /* Accurate, real deadline countdown */
  const deadline = new Date('2027-11-27T23:59:59+03:00');
  $$('[data-deadline-days]').forEach(node => {
    const days = Math.max(0, Math.ceil((deadline - Date.now()) / 86400000));
    node.textContent = new Intl.NumberFormat('en-US').format(days);
  });

  /* Reusable scroll-controlled video scene */
  class ScrollVideoScene {
    constructor(section) {
      this.section = section;
      this.video = $('video', section);
      this.poster = $('.scene-poster', section);
      this.cues = $$('.scene-cue', section);
      this.meter = $('.scene-meter > i', section);
      this.targetTime = 0;
      this.lastSeek = -1;
      this.duration = Number(section.dataset.duration) || 1;
      this.ready = false;
      this.active = false;
      this.failed = false;
      this.visibleProgress = 0;
      this.frame = 0;
      this.boundUpdate = () => this.updateFromScroll();
      this.init();
    }

    init() {
      if (!this.video || prefersReducedMotion) {
        this.section.classList.add('scene-static');
        this.cues.forEach(cue => cue.classList.add('is-active'));
        return;
      }

      this.video.muted = true;
      this.video.playsInline = true;
      this.video.pause();
      this.video.setAttribute('aria-hidden', 'true');

      const markReady = () => {
        if (Number.isFinite(this.video.duration) && this.video.duration > 0) this.duration = this.video.duration;
        if (this.video.readyState >= 2) {
          this.ready = true;
          this.section.classList.add('scene-ready');
          this.poster?.setAttribute('aria-hidden', 'true');
          this.updateFromScroll(true);
        }
      };

      this.video.addEventListener('loadedmetadata', markReady);
      this.video.addEventListener('loadeddata', markReady);
      this.video.addEventListener('canplay', markReady);
      this.video.addEventListener('error', () => {
        this.failed = true;
        this.section.classList.add('scene-failed');
        this.cues.forEach(cue => cue.classList.add('is-active'));
      });

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target !== this.section) return;
          this.active = entry.isIntersecting;
          if (this.active) {
            this.updateFromScroll(true);
            this.startLoop();
          } else {
            this.stopLoop();
          }
        });
      }, { rootMargin: '20% 0px 20% 0px', threshold: 0 });
      this.observer.observe(this.section);

      this.video.load();
      this.updateFromScroll(true);
    }

    getProgress() {
      const rect = this.section.getBoundingClientRect();
      const travel = Math.max(1, this.section.offsetHeight - innerHeight);
      return clamp(-rect.top / travel);
    }

    updateCues(progress) {
      this.cues.forEach(cue => {
        const start = Number(cue.dataset.start ?? 0);
        const end = Number(cue.dataset.end ?? 1);
        const edge = 0.055;
        const fadeIn = start <= 0 ? 1 : clamp((progress - start) / edge);
        const fadeOut = end >= 1 ? 1 : clamp((end - progress) / edge);
        const opacity = Math.min(fadeIn, fadeOut);
        cue.style.setProperty('--cue-opacity', opacity.toFixed(3));
        cue.style.setProperty('--cue-shift', `${(1 - opacity) * 22}px`);
        cue.classList.toggle('is-active', progress >= start && progress <= end);
      });
    }

    updateFromScroll(force = false) {
      if (this.failed || prefersReducedMotion) return;
      const progress = this.getProgress();
      this.visibleProgress = progress;
      const safeDuration = Math.max(0.05, this.duration - 0.035);
      this.targetTime = progress * safeDuration;
      this.meter?.style.setProperty('--scene-progress', String(progress));
      this.updateCues(progress);
      if (force && this.ready) this.seek();
    }

    seek() {
      if (!this.ready || document.hidden) return;
      const threshold = this.active ? 0.026 : 0.08;
      if (Math.abs(this.targetTime - this.lastSeek) < threshold) return;
      try {
        this.video.currentTime = this.targetTime;
        this.lastSeek = this.targetTime;
      } catch (_) {
        /* Poster remains visible as graceful fallback. */
      }
    }

    startLoop() {
      if (this.frame || prefersReducedMotion) return;
      const loop = () => {
        this.updateFromScroll();
        this.seek();
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    }

    stopLoop() {
      if (!this.frame) return;
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }

    prime() {
      if (!this.video || this.ready || this.failed) return;
      const promise = this.video.play();
      if (promise?.then) {
        promise.then(() => {
          this.video.pause();
          this.video.currentTime = this.targetTime || 0.001;
        }).catch(() => {});
      }
    }
  }

  const scrollScenes = $$('.scroll-video-scene').map(section => new ScrollVideoScene(section));
  const primeScenes = () => scrollScenes.forEach(scene => scene.prime());
  addEventListener('pointerdown', primeScenes, { once: true, passive: true });
  addEventListener('touchstart', primeScenes, { once: true, passive: true });
  addEventListener('resize', () => scrollScenes.forEach(scene => scene.updateFromScroll(true)), { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scrollScenes.forEach(scene => scene.updateFromScroll(true));
  });

  /* Interactive SVG continent map */
  const map = $('.continent-map');
  const mapTitle = $('#continentTitle');
  const mapCopy = $('#continentCopy');
  const mapData = {
    northamerica: ['North America', 'One qualifying full IRONMAN chapter. The final event is announced only when entry, rules, travel, recovery and funding are controlled.'],
    southamerica: ['South America', 'One qualifying full IRONMAN chapter, planned around climate, bike transport, visa access and recovery.'],
    europe: ['Europe', 'One qualifying full IRONMAN chapter that must fit the final record rules, academic calendar and training plan.'],
    africa: ['Africa', 'One qualifying full IRONMAN chapter. The route remains private until it is safe, funded and ready to execute.'],
    asia: ['Asia', 'One qualifying full IRONMAN chapter, planned around travel access, preparation and the final Guinness World Records guidelines.'],
    oceania: ['Oceania', 'One qualifying full IRONMAN chapter. Distance, travel, recovery and logistics must work as one system.']
  };
  const activateContinent = node => {
    if (!node) return;
    $$('.map-point', map || document).forEach(point => {
      const active = point === node;
      point.classList.toggle('is-active', active);
      point.setAttribute('aria-pressed', String(active));
    });
    const [title, copy] = mapData[node.dataset.continent] || ['Six Continents', 'Mission route under review.'];
    if (mapTitle) mapTitle.textContent = title;
    if (mapCopy) mapCopy.textContent = copy;
  };
  $$('.map-point', map || document).forEach(node => {
    node.addEventListener('click', () => activateContinent(node));
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateContinent(node);
      }
    });
  });

  /* Optional restrained cursor depth */
  if (finePointer && !prefersReducedMotion) {
    $$('.depth-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 3.5).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 4.5).toFixed(2)}deg`);
        card.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* Dialog helpers with focus restoration */
  let lastFocused = null;
  const getFocusable = root => $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', root)
    .filter(element => !element.hidden && getComputedStyle(element).display !== 'none');
  const trapFocus = (event, root) => {
    if (event.key !== 'Tab') return;
    const focusable = getFocusable(root);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const partnerDialog = $('#partnerDialog');
  const openPartnerDialog = trigger => {
    lastFocused = trigger || document.activeElement;
    if (partnerDialog?.showModal) {
      partnerDialog.showModal();
      body.classList.add('modal-open');
      requestAnimationFrame(() => $('input, select, textarea, button', partnerDialog)?.focus());
    } else {
      location.href = `mailto:${config.contactEmail || 'protoufic@gmail.com'}?subject=Six%20Continents%20Partnership`;
    }
  };
  const closePartnerDialog = () => {
    partnerDialog?.close();
    body.classList.remove('modal-open');
    lastFocused?.focus?.();
  };
  $$('[data-open-partner]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    openPartnerDialog(button);
  }));
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', closePartnerDialog));
  partnerDialog?.addEventListener('click', event => {
    if (event.target === partnerDialog) closePartnerDialog();
  });
  partnerDialog?.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePartnerDialog();
    }
    trapFocus(event, partnerDialog);
  });

  const channelList = $('#contactChannels');
  const addChannel = (label, url, className = '') => {
    if (!channelList || !url) return;
    const link = document.createElement('a');
    link.className = `contact-channel ${className}`.trim();
    link.href = url;
    link.target = url.startsWith('http') ? '_blank' : '';
    if (link.target) link.rel = 'noopener';
    link.innerHTML = `<span>${label}</span><span aria-hidden="true">↗</span>`;
    channelList.append(link);
  };
  addChannel('Continue by email', `mailto:${config.contactEmail || 'protoufic@gmail.com'}?subject=Six%20Continents%20Partnership`, 'contact-channel--primary');
  addChannel('Continue on WhatsApp', config.whatsappUrl);
  addChannel('Schedule a call', config.calendlyUrl);

  $('#partnerForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') || '').trim();
    const name = String(form.get('name') || '').trim();
    const subject = `Six Continents partnership — ${company || name || 'Enquiry'}`;
    const bodyText = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Work email: ${form.get('email') || ''}`,
      `Brand goal: ${form.get('goal') || ''}`,
      `Market or audience: ${form.get('market') || ''}`,
      `Partnership interest: ${form.get('route') || ''}`,
      `Preferred contact: ${form.get('preferred') || ''}`,
      '',
      String(form.get('message') || '').trim()
    ].join('\n');
    const mailto = `mailto:${config.contactEmail || 'protoufic@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    const result = $('#partnerResult');
    const emailLink = $('#preparedEmailLink');
    if (emailLink) emailLink.href = mailto;
    if (result) {
      result.hidden = false;
      result.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      emailLink?.focus();
    } else {
      location.href = mailto;
    }
  });

  /* Copy helpers */
  $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1200);
    } catch (_) {
      target.focus?.();
    }
  }));

  /* Accessible image lightbox */
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightboxImage');
  const lightboxCaption = $('#lightboxCaption');
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;
  const renderLightbox = () => {
    const item = lightboxItems[lightboxIndex];
    if (!item || !lightboxImage) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.caption || '';
    if (lightboxCaption) lightboxCaption.textContent = item.caption || '';
  };
  const openLightbox = (items, index = 0, trigger = null) => {
    if (!lightbox || !items?.length) return;
    lightboxItems = items;
    lightboxIndex = clamp(index, 0, items.length - 1);
    lightboxTrigger = trigger || document.activeElement;
    renderLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    $('[data-lightbox-close]', lightbox)?.focus();
  };
  const closeLightbox = () => {
    lightbox?.classList.remove('is-open');
    lightbox?.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    if (lightboxImage) lightboxImage.src = '';
    lightboxTrigger?.focus?.();
  };
  window.openMissionLightbox = openLightbox;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-lightbox]');
    if (!trigger) return;
    event.preventDefault();
    const group = trigger.dataset.gallery || 'default';
    const triggers = $$(`[data-lightbox][data-gallery="${CSS.escape(group)}"]`);
    const items = triggers.map(item => ({
      src: item.dataset.full || item.getAttribute('href') || $('img', item)?.src,
      caption: item.dataset.caption || $('img', item)?.alt || ''
    }));
    openLightbox(items, Math.max(0, triggers.indexOf(trigger)), trigger);
  });
  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  $('[data-lightbox-prev]')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  });
  $('[data-lightbox-next]')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    renderLightbox();
  });
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox?.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      renderLightbox();
    }
    if (event.key === 'ArrowRight') {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      renderLightbox();
    }
    trapFocus(event, lightbox);
  });
})();
