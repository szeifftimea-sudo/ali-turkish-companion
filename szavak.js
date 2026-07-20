const knowledge = window.ALI_ADVENTURE_KNOWLEDGE || {};

const route = [
  { source:1, number:'01', title:'Megérkezés Galatán', place:'Galata híd', image:'assets/web/ALI-SCN-001-galata-sunrise.webp' },
  { source:2, number:'02', title:'Egy tea mellett', place:'Karaköy', image:'assets/web/ALI-SCN-002-karakoy-teahouse.webp' },
  { source:6, number:'03', title:'A piros villamos', place:'Tünel és İstiklal', image:'assets/web/ALI-SCN-006-nostalgic-tram.webp' },
  { source:3, number:'04', title:'Átkelés a Boszporuszon', place:'Kabataş és a komp', image:'assets/web/ALI-SCN-003-bosphorus-ferry.webp' },
  { source:7, number:'05', title:'Fények a túlparton', place:'Üsküdar', image:'assets/web/ALI-SCN-007-uskudar-sunset.webp' },
  { source:8, number:'06', title:'A reggel íze', place:'Simitçi', image:'assets/web/ALI-SCN-008-simit-bakery.webp' },
  { source:9, number:'07', title:'A csendes udvar', place:'Sultanahmet', image:'assets/web/ALI-SCN-009-blue-mosque-courtyard.webp' },
  { source:4, number:'08', title:'Te döntesz a bazárban', place:'Kapalıçarşı', image:'assets/web/ALI-SCN-004-grand-bazaar.webp' },
  { source:5, number:'09', title:'Egy kis pihenő', place:'Gülhane Park', image:'assets/web/ALI-SCN-005-gulhane-park.webp' },
  { source:10, number:'10', title:'Most te hívsz', place:'Vízparti sétány', image:'assets/web/ALI-SCN-010-waterfront-promenade.webp' }
];

const grid = document.querySelector('#station-grid');
const filters = document.querySelector('#route-filters');
const search = document.querySelector('#phrase-search');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
let activeStation = 'all';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
}

function searchable(value = '') {
  return String(value)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[’'".?!…]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function phrasePair(value) {
  return Array.isArray(value) ? [String(value[0] || ''), String(value[1] || '')] : [String(value || ''), ''];
}

function canonicalKey(turkish) {
  return searchable(turkish);
}

function renderFilters() {
  filters.innerHTML = `<button type="button" class="active" data-station="all">Mind a tíz</button>${route.map(stop => `<button type="button" data-station="${stop.number}"><span>${stop.number}</span>${escapeHtml(stop.place)}</button>`).join('')}`;
}

function stationEntries(stop) {
  const source = knowledge[stop.source];
  if (!source) return { stop, core: [], pocket: [] };
  return {
    stop,
    core: (source.core || []).map(phrasePair),
    pocket: (source.pocket || []).map(phrasePair)
  };
}

function uniqueStationData(stops, query) {
  const seen = new Set();
  return stops.map(stationEntries).map(station => {
    const keepUnique = pairs => pairs.filter(([turkish, hungarian]) => {
      if (query && !searchable(`${turkish} ${hungarian}`).includes(query)) return false;
      const key = canonicalKey(turkish);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { ...station, core: keepUnique(station.core), pocket: keepUnique(station.pocket) };
  }).filter(station => station.core.length || station.pocket.length);
}

function phraseRows(pairs) {
  return pairs.map(([turkish, hungarian]) => `<div><dt lang="tr">${escapeHtml(turkish)}</dt><dd>${escapeHtml(hungarian)}</dd></div>`).join('');
}

function stationMarkup({ stop, core, pocket }) {
  return `<article class="station-card" id="allomas-${stop.number}">
    <header class="station-visual"><img src="${stop.image}" alt="" loading="lazy" /><span class="station-number">${stop.number}</span><div><small>${escapeHtml(stop.place)}</small><h3>${escapeHtml(stop.title)}</h3></div></header>
    <div class="station-content">
      ${core.length ? `<section class="core-phrases" aria-label="Az állomás kulcsmondatai"><h4>Az állomás kulcsmondatai</h4><dl>${phraseRows(core)}</dl></section>` : ''}
      ${pocket.length ? `<section class="pocket-phrases" aria-label="További szavak és kifejezések"><h4>Ha tovább maradnál</h4><dl>${phraseRows(pocket)}</dl></section>` : ''}
    </div>
  </article>`;
}

function render() {
  const query = searchable(search.value.trim());
  const selected = activeStation === 'all' ? route : route.filter(stop => stop.number === activeStation);
  const stations = uniqueStationData(selected, query);
  grid.innerHTML = stations.map(stationMarkup).join('');
  empty.hidden = stations.length > 0;
  const visiblePhrases = stations.reduce((sum, station) => sum + station.core.length + station.pocket.length, 0);
  count.textContent = stations.length ? `${stations.length} állomás · ${visiblePhrases} egyedi szó és kifejezés` : 'Nincs találat';
}

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-station]');
  if (!button) return;
  activeStation = button.dataset.station;
  filters.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
  render();
  document.querySelector('#szotar').scrollIntoView({ behavior:'smooth', block:'start' });
});

search.addEventListener('input', render);
renderFilters();
render();
