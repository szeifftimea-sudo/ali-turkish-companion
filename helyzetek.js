(() => {
  const library = window.ALI_NORMALIZED_LIBRARY || window.ALI_SITUATION_LIBRARY;
  if (!library || !Array.isArray(library.topics)) return;
  const PHRASE_KEY = 'ali-phrase-progress-v2';

  const topicGrid = document.querySelector("#topic-grid");
  const searchForm = document.querySelector("#map-search-form");
  const searchInput = document.querySelector("#map-search");
  const searchFeedback = document.querySelector("#search-feedback");
  const entryGrid = document.querySelector("#entry-grid");
  const emptyState = document.querySelector("#empty-state");
  const loadMore = document.querySelector("#load-more");
  const clearSearch = document.querySelector("#clear-search");
  const starterPocket = document.querySelector("#starter-pocket");
  const starterPhrases = document.querySelector("#starter-phrases");
  const numberElement = document.querySelector("#library-number");
  const kickerElement = document.querySelector("#library-kicker");
  const titleElement = document.querySelector("#library-title");
  const descriptionElement = document.querySelector("#library-description");
  const countElement = document.querySelector("#library-count");
  const kindFilters = document.querySelector("#kind-filters");
  const contextReturn = document.querySelector("#context-return");
  const renderedPocketEntries = new Map();

  function readPocket() {
    try {
      const stored = JSON.parse(localStorage.getItem(PHRASE_KEY) || '[]');
      return Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    } catch {
      return [];
    }
  }

  function phraseId(phrase = '') {
    return String(phrase).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  }

  let savedPhraseIds = new Set(readPocket().map((item) => item.id));

  function savePocketEntry({ phrase, translation, topic }) {
    const items = readPocket();
    const id = phraseId(phrase);
    const existing = items.find((item) => item.id === id) || { id, phrase, status: 'new', encounters: 0, contexts: [] };
    const source = `helyzetek-${topic.id}`;
    const updated = {
      ...existing,
      id,
      phrase,
      translation,
      status: ['returned', 'familiar'].includes(existing.status) ? existing.status : 'saved',
      learningState: existing.learningState || 'practicing',
      contexts: [...new Set([...(existing.contexts || []), source])],
      sources: [...new Set([...(existing.sources || []), source])],
      source,
      sourceLabel: `Mit szeretnél elmondani? · ${topic.title}`,
      sourceHref: `helyzetek.html?topic=${encodeURIComponent(topic.id)}#kifejezesek`,
      encounters: Math.max(1, existing.encounters || 0),
      lastSource: source,
      updatedAt: new Date().toISOString()
    };
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) items[index] = updated;
    else items.push(updated);
    try { localStorage.setItem(PHRASE_KEY, JSON.stringify(items)); } catch { /* A böngészés mentés nélkül is folytatható. */ }
    savedPhraseIds.add(id);
  }

  const params = new URLSearchParams(window.location.search);
  const requestedTopic = params.get("topic");
  const requestedSource = params.get("from");
  const initialTopic = library.topics.find((topic) => topic.id === requestedTopic) || library.topics[0];

  if (contextReturn && requestedSource === "konyha" && initialTopic.id === "konyha") contextReturn.hidden = false;

  const state = {
    activeTopicId: initialTopic.id,
    query: "",
    kind: "all",
    limit: 32
  };

  const kindLabels = {
    section: "Témakör",
    dialogue: "Párbeszéd",
    pair: "Törökül · magyarul",
    example: "Példák",
    note: "Háttér",
    explanation: "Magyarázat",
    turkish: "Török példa",
    term: "Kifejezés"
  };

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase("hu-HU")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ç/g, "c");
  }

  function motifSVG(name) {
    const common = 'viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
    const icons = {
      lale: '<path d="M32 55V31M32 37c-9-4-16-1-21 8 10 2 17 0 21-8Zm0 0c9-4 16-1 21 8-10 2-17 0-21-8Z"/><path d="M18 11c1 13 5 20 14 23 9-3 13-10 14-23l-9 8-5-11-5 11-9-8Z"/>',
      cintemani: '<circle cx="23" cy="20" r="8"/><circle cx="41" cy="20" r="8"/><circle cx="32" cy="36" r="8"/><path d="M9 50c7-8 13 8 21 0s14 8 25 0M10 56c7-8 13 8 21 0s14 8 24 0"/>',
      "eli-belinde": '<path d="M32 9v46M20 18l12 10 12-10M20 46l12-10 12 10M13 24l12 8-12 8M51 24l-12 8 12 8"/><path d="m20 18-7-6M44 18l7-6M20 46l-7 6M44 46l7 6"/>',
      nar: '<path d="M25 15h14l-2-8-5 5-5-5-2 8Z"/><path d="M32 15c-12 0-19 8-19 19s8 20 19 20 19-9 19-20-7-19-19-19Z"/><circle cx="24" cy="34" r="2"/><circle cx="33" cy="29" r="2"/><circle cx="40" cy="38" r="2"/><circle cx="29" cy="43" r="2"/>',
      "seljuk-star": '<path d="m32 7 7 14 15-3-7 14 7 14-15-3-7 14-7-14-15 3 7-14-7-14 15 3 7-14Z"/><path d="m32 21 11 11-11 11-11-11 11-11Z"/>',
      nazar: '<path d="M6 32s10-17 26-17 26 17 26 17-10 17-26 17S6 32 6 32Z"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="32" r="4"/>',
      karanfil: '<path d="M32 55V30M32 39c-8-3-14-1-18 7 9 1 15-1 18-7Zm0 0c8-3 14-1 18 7-9 1-15-1-18-7Z"/><path d="M20 15c0-5 5-8 12-5 7-3 12 0 12 5 6 2 6 8 1 11-3 6-9 7-13 5-4 2-10 1-13-5-5-3-5-9 1-11Z"/><path d="m21 15 5 5 6-8 6 8 5-5"/>',
      bulut: '<path d="M9 35c4-12 13-15 22-8 5-11 20-9 22 2 8 0 9 12 1 14H18c-11 0-13-13-4-16"/><path d="M20 42c5-6 10-6 15 0M37 29c4-4 8-4 12 0"/>',
      kocboynuzu: '<path d="M31 54V33M33 54V33M32 33c-13 0-21-6-21-15 0-7 8-10 13-5 5 5 1 12-5 10M32 33c13 0 21-6 21-15 0-7-8-10-13-5-5 5-1 12 5 10"/><path d="M24 40 13 52M40 40l11 12"/>',
      saz: '<path d="M12 52C19 27 34 11 54 7 50 29 35 48 12 52Z"/><path d="M15 49 49 12M25 39l-7-9M34 30l-6-10M41 22l-4-8M31 35l10 2M39 26l9 1"/>'
    };
    return `<svg ${common}>${icons[name] || icons.lale}</svg>`;
  }

  function renderTopics() {
    topicGrid.innerHTML = library.topics.map((topic) => {
      const active = !state.query && topic.id === state.activeTopicId;
      return `
        <button class="topic-card${active ? " active" : ""}" type="button" data-topic="${escapeHTML(topic.id)}" aria-pressed="${active}">
          <span class="topic-top"><span class="topic-number">${escapeHTML(topic.number)}</span><span class="topic-motif"><span class="topic-icon">${motifSVG(topic.motif)}</span><small>${escapeHTML(topic.motifLabel)}</small></span></span>
          <h3>${escapeHTML(topic.title)}</h3>
          <p>${escapeHTML(topic.description)}</p>
          <footer><em lang="tr">${escapeHTML(topic.turkish)}</em><small>${topic.rawCount || topic.count} részlet</small></footer>
        </button>`;
    }).join("");
  }

  function matchesKind(entry) {
    if (state.kind === "all") return true;
    if (state.kind === "sentences") return entry.family === "sentence";
    return entry.family === "word";
  }

  function listParts(value) {
    return String(value || "").split(/\n|[,;]+/).map((part) => part.trim()).filter(Boolean);
  }

  function focusWordResult(entry, query, seenWords) {
    if (!entry.pair || entry.family !== "word") return entry;
    const turkishParts = listParts(entry.pair.turkish);
    const hungarianParts = listParts(entry.pair.hungarian);
    if (!turkishParts.length || turkishParts.length !== hungarianParts.length) return entry;

    const matches = turkishParts.map((turkish, index) => ({
      turkish,
      hungarian: hungarianParts[index],
      key: normalize(turkish)
    })).filter((unit) => normalize(`${unit.turkish} ${unit.hungarian}`).includes(query));
    if (!matches.length) return entry;

    const unique = matches.filter((unit) => {
      if (!unit.key || seenWords.has(unit.key)) return false;
      seenWords.add(unit.key);
      return true;
    });
    if (!unique.length) return null;
    return {
      ...entry,
      pair: {
        turkish: unique.map((unit) => unit.turkish).join(", "),
        hungarian: unique.map((unit) => unit.hungarian).join(", ")
      }
    };
  }

  function getResults() {
    const query = normalize(state.query);
    const topics = query ? library.topics : library.topics.filter((topic) => topic.id === state.activeTopicId);
    const results = topics.flatMap((topic) => (topic.cards || topic.entries)
      .filter(matchesKind)
      .filter((entry) => !query || entry.kind !== "section")
      .filter((entry) => {
        if (!query) return true;
        const pairText = entry.pair ? `${entry.pair.turkish} ${entry.pair.hungarian}` : "";
        const lineText = Array.isArray(entry.lines) ? entry.lines.join(" ") : "";
        return normalize(`${entry.text} ${pairText} ${lineText}`).includes(query);
      })
      .map((entry) => ({ ...entry, topic })));
    if (!query) return results;
    const seenWords = new Set();
    return results.map((entry) => focusWordResult(entry, query, seenWords)).filter(Boolean);
  }

  function entryLabel(entry) {
    if (entry.pair) {
      if (entry.kind === "example" || entry.kind === "dialogue") return "Történet · fordítás";
      return entry.family === "word" ? "Szó · jelentés" : "Mondat · jelentés";
    }
    return kindLabels[entry.kind] || "Kifejezés";
  }

  function updateHeading(results) {
    if (state.query) {
      numberElement.textContent = "⌕";
      kickerElement.textContent = "A teljes térkép találatai";
      titleElement.textContent = `„${state.query}” nyomában`;
      descriptionElement.textContent = "Ali mind a tíz élethelyzetben körülnézett. A találatoknál azt is látod, melyik fiókból kerültek elő.";
      starterPocket.hidden = true;
      clearSearch.hidden = false;
      countElement.textContent = `${results.length} találat`;
      return;
    }

    const topic = library.topics.find((item) => item.id === state.activeTopicId) || library.topics[0];
    numberElement.textContent = topic.number;
    kickerElement.textContent = topic.kicker;
    titleElement.textContent = topic.title;
    descriptionElement.textContent = topic.description;
    starterPhrases.innerHTML = topic.starter.map((phrase) => {
      const turkish = typeof phrase === "string" ? phrase : phrase.tr;
      const hungarian = typeof phrase === "string" ? "" : phrase.hu;
      return `<span class="starter-phrase"><strong lang="tr">${escapeHTML(turkish)}</strong>${hungarian ? `<small>${escapeHTML(hungarian)}</small>` : ""}</span>`;
    }).join("");
    starterPocket.hidden = false;
    clearSearch.hidden = true;
    countElement.textContent = `${results.length} rendezett kártya · ${topic.rawCount || topic.count} részlet`;
  }

  function renderEntries() {
    const results = getResults();
    updateHeading(results);
    searchFeedback.innerHTML = state.query
      ? `<strong>${results.length} találat.</strong> Nyomd meg a Mutasd gombot, hogy odalépjünk.`
      : "Törökül és magyarul is kereshetsz.";
    const visible = results.slice(0, state.limit);
    renderedPocketEntries.clear();

    entryGrid.innerHTML = visible.map(({ topic, ...entry }) => {
      if (entry.kind === "section") {
        return `<h3 class="entry-divider"><span>${escapeHTML(entry.text)}</span></h3>`;
      }
      const topicLabel = state.query ? `<small class="entry-topic">${escapeHTML(topic.title)}</small>` : "";
      const paired = entry.pair;
      const canPocket = paired && paired.turkish.length <= 180 && paired.hungarian.length <= 180;
      const pocketId = canPocket ? phraseId(paired.turkish) : '';
      if (canPocket) renderedPocketEntries.set(pocketId, { phrase: paired.turkish, translation: paired.hungarian, topic });
      const saved = canPocket && savedPhraseIds.has(pocketId);
      let entryContent = `<p class="entry-text">${escapeHTML(entry.text)}</p>`;
      if (paired) {
        entryContent = `<div class="entry-pair"><div class="pair-side pair-turkish"><small>Törökül</small><p lang="tr">${escapeHTML(paired.turkish)}</p></div><span class="pair-divider" aria-hidden="true">↔</span><div class="pair-side pair-hungarian"><small>Magyarul</small><p>${escapeHTML(paired.hungarian)}</p></div></div>`;
      } else if (entry.kind === "dialogue" || entry.kind === "example") {
        const dialogueLanguage = entry.kind === "dialogue"
          ? (entry.language === "tr" ? "Török párbeszéd" : "Magyar változat")
          : (entry.language === "tr" ? "Török példák" : "Magyar változat");
        entryContent = `<div class="dialogue-block ${entry.language === "tr" ? "dialogue-turkish" : "dialogue-hungarian"}"><small>${dialogueLanguage}</small>${entry.lines.map((line) => `<p${entry.language === "tr" ? ' lang="tr"' : ""}>${escapeHTML(line)}</p>`).join("")}</div>`;
      } else if (entry.kind === "note" || entry.kind === "explanation") {
        entryContent = `<div class="entry-note"><small>${entry.kind === "note" ? "Jó tudni" : "Magyar magyarázat"}</small><p>${escapeHTML(entry.text)}</p></div>`;
      } else if (entry.kind === "turkish") {
        entryContent = `<div class="single-language pair-side pair-turkish"><small>Törökül</small><p lang="tr">${escapeHTML(entry.text)}</p></div>`;
      }
      return `
        <article class="entry-card${canPocket ? ' has-pocket-action' : ''}" data-kind="${escapeHTML(entry.kind)}">
          <span class="entry-kind">${escapeHTML(entryLabel(entry))}</span>
          <div class="entry-content">${topicLabel}${entryContent}</div>
          ${canPocket ? `<button class="entry-pocket-action${saved ? ' is-saved' : ''}" type="button" data-pocket-entry="${escapeHTML(pocketId)}" ${saved ? 'disabled' : ''}><span aria-hidden="true">${saved ? '✓' : '+'}</span>${saved ? 'Ali zsebében' : 'Tedd Ali zsebébe'}</button>` : ''}
        </article>`;
    }).join("");

    emptyState.hidden = results.length > 0;
    loadMore.hidden = results.length <= state.limit;
    if (!loadMore.hidden) loadMore.textContent = `Mutass még · ${results.length - state.limit} maradt ↓`;
  }

  function setTopic(topicId, shouldScroll = true) {
    const topic = library.topics.find((item) => item.id === topicId);
    if (!topic) return;
    state.activeTopicId = topic.id;
    state.query = "";
    state.limit = 32;
    searchInput.value = "";
    renderTopics();
    renderEntries();
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("topic", topic.id);
      window.history.replaceState({}, "", url);
    } catch (_) {
      // A file:// prototípus egyes böngészőkben nem engedi az URL csendes frissítését.
    }
    if (shouldScroll) document.querySelector("#kifejezesek").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  topicGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-topic]");
    if (button) setTopic(button.dataset.topic);
  });

  entryGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-pocket-entry]');
    if (!button || button.disabled) return;
    const entry = renderedPocketEntries.get(button.dataset.pocketEntry);
    if (!entry) return;
    savePocketEntry(entry);
    button.disabled = true;
    button.classList.add('is-saved');
    button.innerHTML = '<span aria-hidden="true">✓</span>Ali zsebében';
  });

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim();
    state.limit = 32;
    renderTopics();
    renderEntries();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = searchInput.value.trim();
    state.limit = 32;
    renderTopics();
    renderEntries();
    if (state.query) document.querySelector("#kifejezesek").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  clearSearch.addEventListener("click", () => {
    state.query = "";
    state.limit = 32;
    searchInput.value = "";
    renderTopics();
    renderEntries();
    searchInput.focus();
  });

  kindFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-kind]");
    if (!button) return;
    state.kind = button.dataset.kind;
    state.limit = 32;
    kindFilters.querySelectorAll("[data-kind]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderEntries();
  });

  loadMore.addEventListener("click", () => {
    state.limit += 32;
    renderEntries();
  });

  renderTopics();
  renderEntries();
})();
