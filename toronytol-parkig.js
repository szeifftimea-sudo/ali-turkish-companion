(() => {
  const STORY_KEY = 'ali-tower-park-v1';
  const PHRASE_KEY = 'ali-phrase-progress-v2';

  const defaultStory = {
    foundWater: false,
    completedAt: null
  };

  const phrases = [
    { phrase: 'Giriş nerede?', translation: 'Hol van a bejárat?' },
    { phrase: 'Boğaz hangi tarafta?', translation: 'Merre van a Boszporusz?' },
    { phrase: "Kabataş'a nasıl gidebiliriz?", translation: 'Hogyan jutunk el Kabataşba?' },
    { phrase: "Yıldız Parkı'na yürüyerek gidebilir miyiz?", translation: 'Eljuthatunk gyalog a Yıldız Parkba?' },
    { phrase: 'Biraz dinlenelim mi?', translation: 'Pihenjünk egy kicsit?' }
  ];

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* A történet mentés nélkül is végigjárható. */
    }
  }

  function phraseId(phrase = '') {
    return phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  }

  const story = { ...defaultStory, ...readJSON(STORY_KEY, defaultStory) };

  function updateStory(patch) {
    Object.assign(story, patch);
    writeJSON(STORY_KEY, story);
  }

  const waterButton = document.querySelector('[data-find-water]');
  const waterResponse = document.querySelector('[data-water-response]');
  const waterMemory = document.querySelector('[data-water-memory]');

  function showWaterFound() {
    if (waterButton) waterButton.innerHTML = '✓ Megtaláltam. Menjünk le <span aria-hidden="true">→</span>';
    if (waterResponse) waterResponse.innerHTML = '<span>Most már te mutatod az irányt</span><p>Ott van. Ha lent elveszítenénk szem elől, már akkor is tudod, merre keresd.</p>';
    if (waterMemory) waterMemory.innerHTML = 'A Galata-toronyból <strong>te találtad meg a vizet</strong>. Innentől nem csak Ali után mentél: értetted az irányt.';
  }

  if (waterButton) {
    waterButton.addEventListener('click', () => {
      updateStory({ foundWater: true });
      showWaterFound();
    });
  }

  function saveStory() {
    const stored = readJSON(PHRASE_KEY, []);
    const currentItems = Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    const ranks = { new: 0, used: 1, saved: 2, returned: 3, familiar: 4 };
    const now = new Date().toISOString();
    const nextItems = [...currentItems];

    phrases.forEach(({ phrase, translation }) => {
      const id = phraseId(phrase);
      const existing = nextItems.find((item) => item.id === id) || {
        id,
        phrase,
        status: 'new',
        encounters: 0,
        contexts: []
      };
      const updated = {
        ...existing,
        id,
        phrase,
        translation,
        status: ranks[existing.status] > ranks.saved ? existing.status : 'saved',
        contexts: [...new Set([...(existing.contexts || []), 'tower-park'])],
        sources: [...new Set([...(existing.sources || []), 'tower-park'])],
        source: 'tower-park',
        sourceLabel: 'A toronytól a parkig',
        sourceHref: 'toronytol-parkig.html#mondatok',
        encounters: Math.max(1, existing.encounters || 0),
        lastSource: 'tower-park',
        updatedAt: now
      };
      const index = nextItems.findIndex((item) => item.id === id);
      if (index >= 0) nextItems[index] = updated;
      else nextItems.push(updated);
    });

    writeJSON(PHRASE_KEY, nextItems);
    updateStory({ completedAt: now });
  }

  const saveButton = document.querySelector('[data-save-story]');
  const saveFeedback = document.querySelector('[data-save-feedback]');

  function showSavedState() {
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.innerHTML = '✓ Az út Ali zsebében van';
    if (saveFeedback) {
      saveFeedback.innerHTML = 'Az öt mondat veled jön. <a href="zseb.html?from=tower-park#mentett-mondatok">Megnézem Ali zsebében →</a>';
    }
  }

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      saveStory();
      showSavedState();
    });
  }

  function readJournalCount() {
    const journal = readJSON('ali-travel-journal-v2', []);
    return Array.isArray(journal)
      ? new Set(journal.filter((entry) => Number.isInteger(entry?.id)).map((entry) => entry.id)).size
      : 0;
  }

  document.querySelectorAll('[data-pocket-count]').forEach((node) => {
    node.textContent = String(readJournalCount());
  });

  if (story.foundWater) showWaterFound();
  if (story.completedAt) showSavedState();
})();
