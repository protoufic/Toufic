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
  const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const getFiltered = () => {
    const q = (search?.value || '').trim().toLowerCase();
    const y = year?.value || 'all';
    const d = discipline?.value || 'all';
    const r = result?.value || 'all';
    return [...window.RACES]
      .sort((a,b) => b.year - a.year || b.order - a.order)
      .filter(x => !q || [x.name,x.location,x.distance,x.result,x.note,x.time].join(' ').toLowerCase().includes(q))
      .filter(x => y === 'all' || String(x.year) === y)
      .filter(x => d === 'all' || x.discipline === d)
      .filter(x => r === 'all' || (r === 'podium' ? x.podium : !x.podium));
  };

  const renderCard = race => {
    const gallery = race.images || [];
    const links = (race.links || []).map(link => `<a class="btn btn-small" href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label)} <span>↗</span></a>`).join('');
    const images = gallery.slice(0,4).map((src,i) => `<button type="button" data-race-lightbox data-race-id="${esc(race.id)}" data-index="${i}"><img src="${esc(src)}" alt="${esc(race.name)} — ${race.year}" loading="lazy"></button>`).join('');
    const more = gallery.length > 4 ? `<button class="btn btn-small" type="button" data-race-view-all="${esc(race.id)}">View full gallery (${gallery.length})</button>` : '';
    return `<article class="race-card" data-race-id="${esc(race.id)}">
      <button class="race-summary-btn" type="button" aria-expanded="false">
        <span class="race-year">${race.year}</span>
        <span class="race-name">${esc(race.name)}</span>
        <span class="race-meta">${esc(race.distance)} · ${esc(race.location)}</span>
        <span class="race-result">${esc(race.result)}</span>
        <span class="race-chevron">+</span>
      </button>
      <div class="race-details">
        <div class="race-inner">
          <div class="race-detail-grid">
            <div><strong>Date</strong><span>${esc(race.date)}</span></div>
            <div><strong>Location</strong><span>${esc(race.location)}</span></div>
            <div><strong>Distance</strong><span>${esc(race.distance)}</span></div>
            <div><strong>Time</strong><span>${esc(race.time)}</span></div>
          </div>
          <p class="race-note">${esc(race.note || '')}</p>
          <div class="race-links">${links || '<span class="muted">Recorded in the archive. No public link is attached yet.</span>'}</div>
          ${gallery.length ? `<div class="race-gallery">${images}</div><div class="load-row">${more}</div>` : ''}
        </div>
      </div>
    </article>`;
  };

  const render = () => {
    const data = getFiltered();
    list.innerHTML = data.slice(0,limit).map(renderCard).join('') || '<div class="status-box"><strong>No results found.</strong><span>Change the filters and try again.</span></div>';
    if (count) count.textContent = `${data.length} race${data.length === 1 ? '' : 's'}`;
    if (load) {
      load.hidden = data.length <= limit;
      load.textContent = `Load more races (${Math.max(0,data.length-limit)})`;
    }
  };

  [search,year,discipline,result].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', () => { limit = 12; render(); }));
  load?.addEventListener('click', () => { limit += 12; render(); });

  list.addEventListener('click', e => {
    const summary = e.target.closest('.race-summary-btn');
    if (summary) {
      const card = summary.closest('.race-card');
      card.classList.toggle('open');
      summary.setAttribute('aria-expanded', card.classList.contains('open'));
      return;
    }
    const image = e.target.closest('[data-race-lightbox]');
    if (image) {
      const race = window.RACES.find(x => x.id === image.dataset.raceId);
      if (race) window.openMissionLightbox?.(race.images.map(src => ({src,caption:`${race.name} — ${race.year}`})), Number(image.dataset.index || 0));
      return;
    }
    const all = e.target.closest('[data-race-view-all]');
    if (all) {
      const race = window.RACES.find(x => x.id === all.dataset.raceViewAll);
      if (race) window.openMissionLightbox?.(race.images.map(src => ({src,caption:`${race.name} — ${race.year}`})), 0);
    }
  });
  render();
})();
