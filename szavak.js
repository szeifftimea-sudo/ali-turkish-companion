(() => {
  const data = window.ALI_A1_VOCABULARY || { sections:[], entryCount:0 };
  const grid = document.querySelector('#vocabulary-grid');
  const filters = document.querySelector('#chapter-filters');
  const search = document.querySelector('#phrase-search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const direction = document.querySelector('#card-direction');
  const alphabetGrid = document.querySelector('#alphabet-grid');
  const resultsTitle = document.querySelector('#results-title');
  const resultsKicker = document.querySelector('#results-kicker');
  const knownSummary = document.querySelector('[data-known-summary]');
  const knownTrack = document.querySelector('[data-known-track]');
  const pocketToast = document.querySelector('#pocket-toast');
  const printPlanner = document.querySelector('[data-print-planner]');
  const printPlannerToggle = document.querySelector('[data-print-planner-toggle]');
  const printLessonChoices = document.querySelector('[data-print-lessons]');
  const printSummary = document.querySelector('[data-print-summary]');
  const printPreview = document.querySelector('[data-print-preview]');
  const printStart = document.querySelector('[data-print-start]');
  const currentPrintCount = document.querySelector('[data-current-print-count]');
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const KNOWN_KEY = 'ali-a1-known-v1';
  const MAX_PRINT_CARDS = 80;
  let activeSection = 'all';
  let printMode = '';
  const selectedPrintSections = new Set();
  const alphabet = ['a','b','c','ç','d','e','f','g','ğ','h','ı','i','j','k','l','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z'];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
  const searchable = (value = '') => String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[’'".?!…]+/g, '').replace(/\s+/g, ' ').trim();
  const canonicalKey = (value) => searchable(value);
  const entryId = (value = '') => String(value).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  const readStored = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
  const writeStored = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* A tanulás mentés nélkül is folytatható. */ } };
  let knownWords = new Set(readStored(KNOWN_KEY, []).filter(Boolean));
  let pocketItems = readStored(PHRASE_KEY, []).filter(item => item && item.id && item.phrase);
  let toastTimer;
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
  const FLIGHT_PACK_TERMS = [
    'Merhaba!','Günaydın!','İyi günler!','İyi akşamlar!','İyi geceler!','Teşekkür ederim./Teşekkürler.','Hoş bulduk!','Hoşça kal!/Güle güle!','Görüşürüz!','Afiyet olsun!','Lütfen!','İyi yolculuklar!','Özür dilerim.','Affedersiniz!','Tamam!','Evet.','Hayır.','Geçmiş olsun.',
    'eczane','hastane','havaalanı','karakol/emniyet','otel','restoran/lokanta','market','banka','klozet/tuvalet','harita','cami','müze','bilet','cüzdan','gar','kimlik','otobüs','pasaport','tren','uçak','valiz/bavul','bir sonraki','inmek','varmak','yola çıkmak','tabii ki',
    'su','çay','kahve','ayran','menü','sipariş','hesap','kahvaltı','öğle yemeği','akşam yemeği','fiyat','kredi kartı','kasiyer','indirim','poşet','adet','yakın','uzak','ucuz','pahalı'
  ];
  const flightPackEntries = FLIGHT_PACK_TERMS.map(term => allUnique.find(entry => canonicalKey(entry.tr) === canonicalKey(term))).filter(Boolean);
  function renderAlphabet() { alphabetGrid.innerHTML = alphabet.map((letter, index) => { const entry = alphabetSection?.entries[index]; return `<article class="alphabet-card"><span lang="tr">${letter}</span><div>${entry ? `<strong lang="tr">${escapeHtml(entry.tr)}</strong><small>${escapeHtml(entry.hu)}</small>` : ''}</div></article>`; }).join(''); }
  const isKnown = (entry) => knownWords.has(entryId(entry.tr));
  const isPocketed = (entry) => pocketItems.some(item => item.id === entryId(entry.tr));
  function knownCount(entries) { return uniqueEntries(entries).filter(isKnown).length; }
  function renderFilters() {
    const allKnown = knownCount(allUnique);
    filters.innerHTML = `<a class="alphabet-shortcut" href="#abc"><span lang="tr">Alfabe</span> <small>29 betű</small></a><button type="button" class="${activeSection === 'all' ? 'active' : ''}" data-section="all"><span>Minden Ali-lecke</span><small>${allKnown}/${allUnique.length} kész</small></button>${lessonSections.map((section, index) => { const learned = knownCount(section.entries); return `<button type="button" class="${activeSection === section.code ? 'active' : ''}" data-section="${escapeHtml(section.code)}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(section.title)}</span><small>${learned ? `${learned}/${section.entries.length} ✓` : `${section.entries.length} szó`}</small></button>`; }).join('')}`;
  }
  function visibleRows() {
    const query = searchable(search.value);
    const source = query ? allUnique : activeSection === 'all' ? allUnique : allRows.filter(entry => entry.section === activeSection);
    return source.filter(entry => !query || searchable(`${entry.tr} ${entry.hu}`).includes(query));
  }
  function wordActions(entry) {
    const key = entryId(entry.tr); const known = isKnown(entry); const saved = isPocketed(entry);
    const pocketAction = saved
      ? '<a class="pocket-action is-active" href="zseb.html#sajat-szavaim"><span aria-hidden="true">✓</span>Megnézem a zsebben</a>'
      : `<button class="pocket-action" type="button" data-pocket-entry="${escapeHtml(key)}" aria-pressed="false"><span aria-hidden="true">+</span>Zsebbe</button>`;
    return `<div class="word-actions"><button class="known-action${known ? ' is-active' : ''}" type="button" data-known-entry="${escapeHtml(key)}" aria-pressed="${known}"><span aria-hidden="true">${known ? '✓' : '○'}</span>${known ? 'Már tudom' : 'Tanulom'}</button>${pocketAction}</div>`;
  }
  function lessonCompanionMarkup(section) {
    if (section.code !== '1A') return '';
    return `<aside class="lesson-companion" aria-labelledby="greeting-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali súg</p><h4 id="greeting-companion-title">Nemcsak azt számít, mit mondasz – az is, mikor és kinek.</h4><small>A török köszönések mögött napszak, szóalkotás és egy kis udvariassági koreográfia bújik meg.</small></div></header>
      <div class="greeting-clock" aria-label="Török köszönések napszakok szerint">
        <article><time>08:00</time><span class="day-scene is-morning" aria-hidden="true"><i></i></span><strong lang="tr">Günaydın</strong><small>Jó reggelt</small></article>
        <article><time>12:00</time><span class="day-scene is-noon" aria-hidden="true"><i></i></span><strong lang="tr">İyi günler</strong><small>Jó napot</small></article>
        <article><time>20:00</time><span class="day-scene is-evening" aria-hidden="true"><i></i></span><strong lang="tr">İyi akşamlar</strong><small>Jó estét</small></article>
        <article><time>22:00</time><span class="day-scene is-night" aria-hidden="true"><i></i></span><strong lang="tr">İyi geceler</strong><small>Jó éjszakát</small></article>
      </div>
      <p class="clock-note"><span aria-hidden="true">☀</span> A <strong lang="tr">Tünaydın</strong> létezik, de a hétköznapokban délután is sokkal természetesebb az <strong lang="tr">İyi günler</strong>.</p>
      <div class="companion-notes">
        <article class="is-word-story"><span>Szóboncoló</span><h5><i lang="tr">gün</i> + <i lang="tr">aydın</i> = <strong lang="tr">Günaydın</strong></h5><p>A <i lang="tr">gün</i> jelentése „nap”, az <i lang="tr">aydın</i> pedig „világos”. Mintha azt mondanád: legyen fényes a napod.</p></article>
        <article class="is-tip"><span>Ki marad, ki indul?</span><h5><strong lang="tr">Hoşça kal</strong> ↔ <strong lang="tr">Güle güle</strong></h5><p>A távozó mondja: <i lang="tr">Hoşça kal</i>. A maradó válasza: <i lang="tr">Güle güle</i>. Így nem kevered össze őket.</p></article>
        <article class="is-native"><span>Beszélj természetesebben</span><h5>Egy apró <strong lang="tr">Hadi</strong> sokat segít.</h5><p><i lang="tr">Hadi görüşürüz.</i><br><i lang="tr">Hadi bay bay.</i><br><i lang="tr">Hadi hoşça kal.</i></p></article>
      </div>
    </aside>`;
  }
  function sectionMarkup(section, entries) {
    const learned = knownCount(entries); const progress = entries.length ? Math.round((learned / entries.length) * 100) : 0;
    return `<article class="vocabulary-card"><header><span>${lessonLabel(section.code)}</span><div><p>Ali ${lessonNumberByCode.get(section.code)}. leckéje</p><h3>${escapeHtml(section.title)}</h3><small>${learned ? `${learned} már megy · ${entries.length - learned} még gyakorolható` : `${entries.length} szó és kifejezés vár rád`}</small><div class="lesson-progress" aria-label="${learned} megtanult szó ${entries.length} közül"><i style="width:${progress}%"></i></div></div></header>${lessonCompanionMarkup(section)}<div class="vocabulary-columns" aria-hidden="true"><span>Törökül</span><span>Magyarul</span><span>Saját jelöléseim</span></div><dl>${entries.map(entry => `<div class="${isKnown(entry) ? 'is-known' : ''}"><dt lang="tr">${escapeHtml(entry.tr)}</dt><dd>${escapeHtml(entry.hu)}</dd>${wordActions(entry)}</div>`).join('')}</dl></article>`;
  }
  function render() {
    const rows = visibleRows(); const query = searchable(search.value);
    if (activeSection === 'all' || query) { const grouped = lessonSections.map(section => ({ section, entries:rows.filter(entry => entry.sections.includes(section.code) && entry.sections[0] === section.code) })).filter(group => group.entries.length); grid.innerHTML = grouped.map(group => sectionMarkup(group.section, group.entries)).join(''); }
    else { const section = lessonSections.find(item => item.code === activeSection); grid.innerHTML = section && rows.length ? sectionMarkup(section, rows) : ''; }
    empty.hidden = rows.length > 0;
    const section = lessonSections.find(item => item.code === activeSection);
    if (query) resultsTitle.textContent = `Találatok erre: „${search.value.trim()}”`;
    else if (activeSection === 'all') resultsTitle.innerHTML = 'Ali <span class="a1-accent">A1</span>-es szókincse';
    else resultsTitle.textContent = `${section?.title || 'Ez a lecke'}: szavak és kifejezések`;
    resultsKicker.textContent = query ? 'Ali mind a 17 leckében körülnézett' : activeSection === 'all' ? 'Szóról szóra, a saját tempódban' : `Ali ${lessonNumberByCode.get(activeSection)}. leckéje`;
    const context = activeSection === 'all' || query ? `${allUnique.length} egyedi szó és kifejezés · 17 Ali-lecke` : `${rows.length} tétel ebben a leckében`;
    count.textContent = rows.length ? (query ? `${rows.length} találat a teljes A1-szókincsben` : context) : 'Nincs találat';
    const learned = knownCount(allUnique); const percentage = allUnique.length ? Math.round((learned / allUnique.length) * 100) : 0;
    knownSummary.textContent = learned ? `${learned} szót már biztosnak jelöltél a ${allUnique.length}-ből.` : 'Még egy szó sincs megjelölve – az első pipa is haladás.';
    knownTrack.style.width = `${percentage}%`;
    renderFilters();
    if (!printPlanner.hidden) renderPrintPlanner();
  }
  function showToast(message) {
    clearTimeout(toastTimer); pocketToast.textContent = message; pocketToast.hidden = false;
    requestAnimationFrame(() => pocketToast.classList.add('is-visible'));
    toastTimer = setTimeout(() => { pocketToast.classList.remove('is-visible'); setTimeout(() => { pocketToast.hidden = true; }, 220); }, 2600);
  }
  function entryById(id) { return allUnique.find(entry => entryId(entry.tr) === id); }
  function sectionForEntry(entry) {
    const code = entry.section || entry.sections?.[0];
    return lessonSections.find(section => section.code === code) || lessonSections[0];
  }
  function saveEntryToPocket(entry) {
    const id = entryId(entry.tr); const section = sectionForEntry(entry); const now = new Date().toISOString();
    const old = pocketItems.find(item => item.id === id) || { id, phrase:entry.tr, encounters:0, contexts:[], sources:[] };
    const saved = { ...old, phrase:entry.tr, translation:entry.hu, status:'saved', learningState:isKnown(entry) ? 'known' : (old.learningState || 'practicing'), contexts:[...new Set([...(old.contexts || []), `a1-${section.code}`])], sources:[...new Set([...(old.sources || []), 'a1-szokincs'])], source:'a1-szokincs', sourceLabel:`A1 szókincs · ${section.title}`, sourceHref:'szavak.html#szotar', encounters:Math.max(1, old.encounters || 0), updatedAt:now };
    const index = pocketItems.findIndex(item => item.id === id); index < 0 ? pocketItems.push(saved) : pocketItems[index] = saved;
    writeStored(PHRASE_KEY, pocketItems); showToast(`„${entry.tr}” már Ali zsebében van.`);
  }
  function toggleKnown(entry) {
    const id = entryId(entry.tr); const nowKnown = !knownWords.has(id);
    nowKnown ? knownWords.add(id) : knownWords.delete(id); writeStored(KNOWN_KEY, [...knownWords]);
    const index = pocketItems.findIndex(item => item.id === id);
    if (index >= 0) { pocketItems[index] = { ...pocketItems[index], learningState:nowKnown ? 'known' : 'practicing', updatedAt:new Date().toISOString() }; writeStored(PHRASE_KEY, pocketItems); }
    showToast(nowKnown ? `Szép munka: „${entry.tr}” már megy.` : `„${entry.tr}” visszakerült a gyakorláshoz.`);
  }
  function printCardSizeClass(text) { return text.length > 82 ? 'is-very-long' : text.length > 46 ? 'is-long' : ''; }
  function printableCardMarkup(card, side) {
    if (!card) return '<div class="print-learning-card is-blank" aria-hidden="true"></div>';
    const trFirst = direction.value === 'tr-hu'; const front = side === 'front'; const showTurkish = front ? trFirst : !trFirst; const text = showTurkish ? card.item.tr : card.item.hu;
    const cardLessons = (card.item.sections || [card.item.section]).filter(Boolean).map(lessonLabel).join('·');
    const footerMark = front
      ? '<img class="print-card-qr" src="assets/ali-site-qr.png" alt="Ali weboldala QR-kód" />'
      : `<b>${escapeHtml(cardLessons)}</b>`;
    return `<article class="print-learning-card ${front ? 'is-front' : 'is-back'} ${printCardSizeClass(text)}"><div class="print-card-ali"><span class="print-card-portrait"><img src="assets/ali.png" alt="Ali" /></span></div><div class="print-card-copy"><small>${showTurkish ? 'TÜRKÇE' : 'MAGYARUL'}</small><strong${showTurkish ? ' lang="tr"' : ''}>${escapeHtml(text)}</strong></div><footer><span class="print-card-brand"><svg viewBox="-4 -4 56 56" aria-hidden="true"><path class="mark-arch" d="M8 41V23C8 12.5 15.2 5 24 5s16 7.5 16 18v18"/><path class="mark-a" d="M14.5 39 24 15.5 33.5 39M18.5 29.5h11"/></svg><span class="print-card-brand-copy"><em>Ali</em><small>A török útitárs</small></span></span>${footerMark}</footer></article>`;
  }
  function buildPrintableDeck(items) {
    document.querySelector('[data-print-card-deck]')?.remove(); const deck = document.createElement('div'); deck.className = 'print-card-deck'; deck.dataset.printCardDeck = ''; const cards = items.map(item => ({ item }));
    for (let offset = 0; offset < cards.length; offset += 4) { const batch = cards.slice(offset, offset + 4); while (batch.length < 4) batch.push(null); const backs = [batch[1], batch[0], batch[3], batch[2]]; deck.insertAdjacentHTML('beforeend', `<section class="print-card-page">${batch.map(card => printableCardMarkup(card, 'front')).join('')}</section><section class="print-card-page">${backs.map(card => printableCardMarkup(card, 'back')).join('')}</section>`); }
    document.body.append(deck); return deck;
  }
  async function waitForPrintAssets(deck) {
    const images = [...deck.querySelectorAll('img')];
    await Promise.all(images.map((image) => {
      if (image.complete) return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once:true });
        image.addEventListener('error', resolve, { once:true });
      });
    }));
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }
  function selectedPrintItems() {
    if (printMode === 'flight') return flightPackEntries;
    if (printMode === 'current') return uniqueEntries(visibleRows());
    if (printMode === 'lessons') return uniqueEntries(allRows.filter(entry => selectedPrintSections.has(entry.section)));
    return [];
  }
  function printPreviewMarkup(entry) {
    if (!entry) return '<div class="print-preview-card is-empty" aria-hidden="true"><span>+</span></div>';
    const showTurkish = direction.value === 'tr-hu';
    const term = showTurkish ? entry.tr : entry.hu;
    const answer = showTurkish ? 'Törökül' : 'Magyarul';
    return `<article class="print-preview-card"><div class="print-preview-ali"><img src="assets/ali.png" alt="" /></div><small>${answer}</small><strong${showTurkish ? ' lang="tr"' : ''}>${escapeHtml(term)}</strong><i aria-hidden="true">✦</i></article>`;
  }
  function renderPrintLessons() {
    printLessonChoices.innerHTML = lessonSections.map((section, index) => {
      const selected = selectedPrintSections.has(section.code);
      return `<button type="button" class="${selected ? 'is-selected' : ''}" data-print-section="${escapeHtml(section.code)}" aria-pressed="${selected}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(section.title)}</span><small>${section.entries.length}</small></button>`;
    }).join('');
  }
  function renderPrintPlanner() {
    const items = selectedPrintItems();
    const sheets = Math.ceil(items.length / 4);
    const overLimit = items.length > MAX_PRINT_CARDS;
    const currentItems = uniqueEntries(visibleRows());
    currentPrintCount.textContent = `${currentItems.length} kártya`;
    document.querySelectorAll('[data-print-preset]').forEach(button => {
      button.classList.toggle('is-selected', button.dataset.printPreset === printMode);
      button.setAttribute('aria-pressed', String(button.dataset.printPreset === printMode));
    });
    renderPrintLessons();
    if (!items.length) {
      printSummary.innerHTML = '<strong>Még üres a csomagod.</strong><p>Válaszd a repülős válogatást, a mostani találatokat vagy legalább egy leckét.</p>';
    } else if (overLimit) {
      printSummary.innerHTML = `<strong>${items.length} kártya már túl nagy egy csomaghoz.</strong><p>Vegyél ki még legalább ${items.length - MAX_PRINT_CARDS} kártyát: egyszerre legfeljebb ${MAX_PRINT_CARDS} fér a biztos nyomtatási előnézetbe.</p>`;
    } else {
      const sourceLabel = printMode === 'flight' ? 'Repülős válogatás' : printMode === 'current' ? 'Mostani találatok' : `${selectedPrintSections.size} kijelölt lecke`;
      printSummary.innerHTML = `<span>${escapeHtml(sourceLabel)}</span><strong>${items.length} kártya · ${sheets} kétoldalas A4-es lap</strong><p>Előlap és hátlap párokban, hosszú él mentén fordítva.</p>`;
    }
    const previewItems = items.slice(0, 4);
    while (previewItems.length < 4) previewItems.push(null);
    printPreview.innerHTML = previewItems.map(printPreviewMarkup).join('');
    printStart.disabled = !items.length || overLimit;
    printStart.textContent = items.length && !overLimit ? `⌁ ${items.length} kártya nyomtatási előnézete` : '⌁ Nyomtatási előnézet';
  }
  function openPrintPlanner() {
    if (!printMode) printMode = 'flight';
    printPlanner.hidden = false;
    printPlanner.closest('.dictionary-tools')?.classList.add('has-open-planner');
    printPlannerToggle.setAttribute('aria-expanded', 'true');
    renderPrintPlanner();
    document.querySelector('#print-planner-title')?.focus({ preventScroll:true });
    printPlanner.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }
  function closePrintPlanner() {
    printPlanner.hidden = true;
    printPlanner.closest('.dictionary-tools')?.classList.remove('has-open-planner');
    printPlannerToggle.setAttribute('aria-expanded', 'false');
    printPlannerToggle.focus();
  }
  async function printSelectedItems(items) {
    document.body.classList.add('printing-pocket');
    const deck = buildPrintableDeck(items);
    const restore = () => { document.body.classList.remove('printing-pocket'); deck.remove(); window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    await waitForPrintAssets(deck);
    window.print();
  }
  filters.addEventListener('click', event => { const button = event.target.closest('[data-section]'); if (!button) return; activeSection = button.dataset.section; search.value = ''; render(); });
  search.addEventListener('input', () => { if (search.value.trim()) activeSection = 'all'; render(); });
  grid.addEventListener('click', event => {
    const knownButton = event.target.closest('[data-known-entry]'); const pocketButton = event.target.closest('[data-pocket-entry]');
    const id = knownButton?.dataset.knownEntry || pocketButton?.dataset.pocketEntry; if (!id) return;
    const entry = entryById(id); if (!entry) return;
    if (knownButton) toggleKnown(entry); else if (pocketButton && !pocketButton.disabled) saveEntryToPocket(entry);
    render();
  });
  printPlannerToggle.addEventListener('click', () => printPlanner.hidden ? openPrintPlanner() : closePrintPlanner());
  document.querySelector('[data-print-planner-close]').addEventListener('click', closePrintPlanner);
  document.querySelectorAll('[data-print-preset]').forEach(button => button.addEventListener('click', () => {
    printMode = button.dataset.printPreset;
    selectedPrintSections.clear();
    renderPrintPlanner();
  }));
  printLessonChoices.addEventListener('click', event => {
    const button = event.target.closest('[data-print-section]');
    if (!button) return;
    printMode = 'lessons';
    const code = button.dataset.printSection;
    selectedPrintSections.has(code) ? selectedPrintSections.delete(code) : selectedPrintSections.add(code);
    renderPrintPlanner();
  });
  document.querySelector('[data-print-clear]').addEventListener('click', () => {
    printMode = '';
    selectedPrintSections.clear();
    renderPrintPlanner();
  });
  direction.addEventListener('change', () => { if (!printPlanner.hidden) renderPrintPlanner(); });
  printStart.addEventListener('click', async () => {
    const items = selectedPrintItems();
    if (!items.length || items.length > MAX_PRINT_CARDS) return;
    await printSelectedItems(items);
  });
  renderAlphabet(); renderFilters(); render();
})();
