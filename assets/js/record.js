(() => {
  'use strict';
  const list = document.getElementById('raceList');
  if (!list || !window.RACES) return;
  const search = document.getElementById('raceSearch');
  const year = document.getElementById('raceYear');
  const discipline = document.getElementById('raceDiscipline');
  const result = document.getElementById('raceResult');
  const load = document.getElementById('loadMoreRaces');
  const count = document.getElementById('raceCount');
  let limit = 12;

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const filtered = () => {
    const q = (search?.value || '').trim().toLowerCase();
    const y = year?.value || 'all';
    const d = discipline?.value || 'all';
    const r = result?.value || 'all';
    return [...window.RACES]
      .sort((a,b) => b.year - a.year || b.order - a.order)
      .filter(x => !q || [x.name,x.location,x.distance,x.result,x.note].join(' ').toLowerCase().includes(q))
      .filter(x => y === 'all' || String(x.year) === y)
      .filter(x => d === 'all' || x.discipline === d)
      .filter(x => r === 'all' || (r === 'podium' ? x.podium : !x.podium));
  };

  const imageButton = (src, caption, gallery, index, extra = '') => `
    <button type="button" data-race-lightbox data-gallery-id="${esc(gallery)}" data-index="${index}" class="${extra}">
      <img loading="lazy" src="${esc(src)}" alt="${esc(caption)}">
    </button>`;

  const renderCard = race => {
    const gallery = race.images || [];
    const links = (race.links || []).map(x => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)} <span>↗</span></a>`).join('');
    const initial = gallery.slice(0,3).map((src,i) => imageButton(src,`${race.name} — ${race.year}`,race.id,i)).join('');
    const more = gallery.length > 3 ? `<button type="button" class="btn btn-small" data-race-view-all="${esc(race.id)}">View full gallery (${gallery.length})</button>` : '';
    return `<article class="race-card" data-race-id="${esc(race.id)}">
      <button class="race-summary" type="button" aria-expanded="false">
        <span class="race-year">${race.year}</span>
        <span class="race-name">${esc(race.name)}</span>
        <span class="race-meta">${esc(race.distance)} · ${esc(race.location)}</span>
        <span class="race-result">${esc(race.result)}</span>
        <span class="race-plus" aria-hidden="true">+</span>
      </button>
      <div class="race-details">
        <div class="race-detail-grid">
          <div class="race-facts">
            <div class="race-fact"><b>Date</b><span>${esc(race.date)}</span></div>
            <div class="race-fact"><b>Location</b><span>${esc(race.location)}</span></div>
            <div class="race-fact"><b>Distance</b><span>${esc(race.distance)}</span></div>
            <div class="race-fact"><b>Time</b><span>${esc(race.time)}</span></div>
            <div class="race-fact"><b>Result</b><span>${esc(race.result)}</span></div>
            <div class="race-fact"><b>Discipline</b><span>${esc(race.discipline)}</span></div>
          </div>
          <div>
            <p class="race-note">${esc(race.note || '')}</p>
            <div class="race-links">${links || '<span class="muted">This race is recorded in the archive. No public link is attached yet.</span>'}</div>
          </div>
        </div>
        ${gallery.length ? `<div class="race-images">${initial}</div><div class="load-row">${more}</div>` : ''}
      </div>
    </article>`;
  };

  const render = () => {
    const data = filtered();
    const shown = data.slice(0, limit);
    list.innerHTML = shown.map(renderCard).join('') || '<div class="empty-state">No races match those filters.</div>';
    if (count) count.textContent = `${data.length} race${data.length === 1 ? '' : 's'}`;
    if (load) {
      load.hidden = data.length <= limit;
      load.textContent = `Load more races (${data.length - limit})`;
    }
  };

  [search,year,discipline,result].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', () => { limit = 12; render(); }));
  load?.addEventListener('click', () => { limit += 12; render(); });

  list.addEventListener('click', e => {
    const summary = e.target.closest('.race-summary');
    if (summary) {
      const card = summary.closest('.race-card');
      card.classList.toggle('open');
      summary.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
      return;
    }
    const image = e.target.closest('[data-race-lightbox]');
    if (image) {
      const id = image.dataset.galleryId;
      const race = window.RACES.find(x => x.id === id);
      if (!race) return;
      const items = race.images.map(src => ({ src, caption: `${race.name} — ${race.year}` }));
      window.openMissionLightbox?.(items, Number(image.dataset.index || 0));
      return;
    }
    const all = e.target.closest('[data-race-view-all]');
    if (all) {
      const race = window.RACES.find(x => x.id === all.dataset.raceViewAll);
      if (race) window.openMissionLightbox?.(race.images.map(src => ({ src, caption: `${race.name} — ${race.year}` })), 0);
    }
  });

  render();
})();
