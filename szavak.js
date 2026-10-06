(() => {
  const data = window.ALI_A1_VOCABULARY || { sections:[], entryCount:0 };
  const grid = document.querySelector('#vocabulary-grid');
  const filters = document.querySelector('#chapter-filters');
  const search = document.querySelector('#phrase-search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const direction = document.querySelector('#card-direction');
  const alphabetGrid = document.querySelector('#alphabet-grid');
  let activeSection = 'all';
  const alphabet = ['a','b','c','ç','d','e','f','g','ğ','h','ı','i','j','k','l','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z'];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
  const searchable = (value = '') => String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[’'".?!…]+/g, '').replace(/\s+/g, ' ').trim();
  const canonicalKey = (value) => searchable(value);
  function uniqueEntries(entries) {
    const byTurkish = new Map();
    entries.forEach(entry => { const key = canonicalKey(entry.tr); if (!key) return; if (!byTurkish.has(key)) byTurkish.set(key, { ...entry, sections:[entry.section] }); else if (!byTurkish.get(key).sections.includes(entry.section)) byTurkish.get(key).sections.push(entry.section); });
    return [...byTurkish.values()];
  }
  const alphabetSection = data.sections.find(section => section.code === '0A');
  const lessonSections = data.sections.filter(section => section.code !== '0A');
  const lessonNumberByCode = new Map(lessonSections.map((section, index) => [section.code, index + 1]));
  const lessonLabel = (code) => String(lessonNumberByCode.get(code) || '').padStart(2, '0');
  const allRows = lessonSections.flatMap(section => section.entries.map(entry => ({ ...entry, section:section.code, title:section.title })));
  const allUnique = uniqueEntries(allRows);
  function renderAlphabet() { alphabetGrid.innerHTML = alphabet.map((letter, index) => { const entry = alphabetSection?.entries[index]; return `<article class="alphabet-card"><span lang="tr">${letter}</span><div>${entry ? `<strong lang="tr">${escapeHtml(entry.tr)}</strong><small>${escapeHtml(entry.hu)}</small>` : ''}</div></article>`; }).join(''); }
  function renderFilters() { filters.innerHTML = `<a class="alphabet-shortcut" href="#abc"><span lang="tr">Alfabe</span> <small>29 betű</small></a><button type="button" class="active" data-section="all">Minden Ali-lecke <small>${allUnique.length}</small></button>${lessonSections.map((section, index) => `<button type="button" data-section="${escapeHtml(section.code)}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(section.title)}</span><small>${section.entries.length}</small></button>`).join('')}`; }
  function visibleRows() { const query = searchable(search.value); const source = activeSection === 'all' ? allUnique : allRows.filter(entry => entry.section === activeSection); return source.filter(entry => !query || searchable(`${entry.tr} ${entry.hu}`).includes(query)); }
  function sectionMarkup(section, entries) { return `<article class="vocabulary-card"><header><span>${lessonLabel(section.code)}</span><div><p>Ali-lecke ${lessonNumberByCode.get(section.code)}</p><h3>${escapeHtml(section.title)}</h3><small>${entries.length} szó és kifejezés</small></div></header><div class="vocabulary-columns" aria-hidden="true"><span>Törökül</span><span>Magyarul</span></div><dl>${entries.map(entry => `<div><dt lang="tr">${escapeHtml(entry.tr)}</dt><dd>${escapeHtml(entry.hu)}</dd>${activeSection === 'all' && entry.sections.length > 1 ? `<small class="lesson-tags">${entry.sections.map(code => `${lessonLabel(code)}. lecke`).join(' · ')}</small>` : ''}</div>`).join('')}</dl></article>`; }
  function render() {
    const rows = visibleRows(); const query = searchable(search.value);
    if (activeSection === 'all') { const grouped = lessonSections.map(section => ({ section, entries:rows.filter(entry => entry.sections.includes(section.code) && entry.sections[0] === section.code) })).filter(group => group.entries.length); grid.innerHTML = grouped.map(group => sectionMarkup(group.section, group.entries)).join(''); }
    else { const section = lessonSections.find(item => item.code === activeSection); grid.innerHTML = section && rows.length ? sectionMarkup(section, rows) : ''; }
    empty.hidden = rows.length > 0;
    const context = activeSection === 'all' ? `${allUnique.length} egyedi szó és kifejezés · 17 Ali-lecke` : `${lessonNumberByCode.get(activeSection)}. Ali-lecke · ${rows.length} tétel`;
    count.textContent = rows.length ? (query ? `${rows.length} találat · ${context}` : context) : 'Nincs találat';
  }
  function printCardSizeClass(text) { return text.length > 82 ? 'is-very-long' : text.length > 46 ? 'is-long' : ''; }
  function printableCardMarkup(card, side) {
    if (!card) return '<div class="print-learning-card is-blank" aria-hidden="true"></div>';
    const trFirst = direction.value === 'tr-hu'; const front = side === 'front'; const showTurkish = front ? trFirst : !trFirst; const text = showTurkish ? card.item.tr : card.item.hu;
    const cardLessons = (card.item.sections || [card.item.section]).filter(Boolean).map(lessonLabel).join('·');
    return `<article class="print-learning-card ${front ? 'is-front' : 'is-back'} ${printCardSizeClass(text)}"><div class="print-card-ali"><img src="assets/ali.png" alt="Ali" /></div><div class="print-card-copy"><small>${showTurkish ? 'TÜRKÇE' : 'MAGYARUL'}</small><strong${showTurkish ? ' lang="tr"' : ''}>${escapeHtml(text)}</strong></div><footer><span class="print-card-brand"><svg viewBox="0 0 48 48" aria-hidden="true"><path class="mark-arch" d="M8 41V23C8 12.5 15.2 5 24 5s16 7.5 16 18v18"/><path class="mark-a" d="M14.5 39 24 15.5 33.5 39M18.5 29.5h11"/></svg><em>Ali</em></span><b>${escapeHtml(cardLessons)}</b></footer></article>`;
  }
  function buildPrintableDeck(items) {
    document.querySelector('[data-print-card-deck]')?.remove(); const deck = document.createElement('div'); deck.className = 'print-card-deck'; deck.dataset.printCardDeck = ''; const cards = items.map(item => ({ item }));
    for (let offset = 0; offset < cards.length; offset += 4) { const batch = cards.slice(offset, offset + 4); while (batch.length < 4) batch.push(null); const backs = [batch[1], batch[0], batch[3], batch[2]]; deck.insertAdjacentHTML('beforeend', `<section class="print-card-page">${batch.map(card => printableCardMarkup(card, 'front')).join('')}</section><section class="print-card-page">${backs.map(card => printableCardMarkup(card, 'back')).join('')}</section>`); }
    document.body.append(deck); return deck;
  }
  filters.addEventListener('click', event => { const button = event.target.closest('[data-section]'); if (!button) return; activeSection = button.dataset.section; filters.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button)); render(); });
  search.addEventListener('input', render);
  document.querySelector('[data-print-cards]').addEventListener('click', () => { const items = uniqueEntries(visibleRows()); if (!items.length) return; document.body.classList.add('printing-pocket'); const deck = buildPrintableDeck(items); const restore = () => { document.body.classList.remove('printing-pocket'); deck.remove(); window.removeEventListener('afterprint', restore); }; window.addEventListener('afterprint', restore); window.print(); });
  renderAlphabet(); renderFilters(); render();
})();
