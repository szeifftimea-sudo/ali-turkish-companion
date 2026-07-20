(() => {
  const STORY_KEY = 'ali-old-golden-horn-v1';
  const PHRASE_KEY = 'ali-phrase-progress-v2';

  const defaultStory = {
    detailChoice: '',
    completedAt: null
  };

  const phrases = [
    { phrase: 'Ziyaret edebilir miyiz?', translation: 'Megnézhetjük? Bejöhetünk látogatóként?' },
    { phrase: 'Fotoğraf çekebilir miyim?', translation: 'Készíthetek fényképet?' },
    { phrase: "Balat'a nasıl gidebiliriz?", translation: 'Hogyan jutunk el Balatba?' },
    { phrase: 'Bu sokak nereye çıkıyor?', translation: 'Hová vezet ez az utca?' },
    { phrase: 'Biraz daha yürüyelim mi?', translation: 'Sétáljunk még egy kicsit?' }
  ];

  const details = {
    door: {
      response: 'Ali is visszanéz a kopott kilincsre. „Ezt sok kéz ismerte már. Elég, ha mi most csak észrevesszük.”',
      memory: 'Balatból a <strong>régi ajtót és a kopott kilincset</strong> viszed magaddal — nem az egész utcát.'
    },
    geranium: {
      response: 'Ali az ablak felé biccent. „A muskátli nem nekünk került oda. Ettől olyan jó, hogy észrevetted.”',
      memory: 'Balatból az <strong>ablakban álló muskátli</strong> marad veled — egy lakott utca apró jele.'
    },
    light: {
      response: 'A fény lassan odébb csúszik a falon. Ali nem siet. „Várjunk még egy pillanatot. Mindjárt egészen más lesz.”',
      memory: 'Balatból a <strong>délutáni fényt a régi falon</strong> őrzöd meg — egy pillanatot, nem egy látványosságot.'
    }
  };

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

  function showDetail(value) {
    const detail = details[value];
    if (!detail) return;

    document.querySelectorAll('[data-detail]').forEach((button) => {
      const active = button.dataset.detail === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const response = document.querySelector('[data-detail-response]');
    const memory = document.querySelector('[data-detail-memory]');
    if (response) response.innerHTML = `<span>Ali észrevette, mit választottál</span><p>${detail.response}</p>`;
    if (memory) memory.innerHTML = detail.memory;
  }

  document.querySelectorAll('[data-detail]').forEach((button) => {
    button.addEventListener('click', () => {
      updateStory({ detailChoice: button.dataset.detail });
      showDetail(button.dataset.detail);
    });
  });

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
        contexts: [...new Set([...(existing.contexts || []), 'old-golden-horn'])],
        sources: [...new Set([...(existing.sources || []), 'old-golden-horn'])],
        source: 'old-golden-horn',
        sourceLabel: 'Régi utcák az Aranyszarvnál',
        sourceHref: 'regi-utcak.html#mondatok',
        encounters: Math.max(1, existing.encounters || 0),
        lastSource: 'old-golden-horn',
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
    saveButton.innerHTML = '✓ A séta Ali zsebében van';
    if (saveFeedback) {
      saveFeedback.innerHTML = 'Az öt mondat veled jön. <a href="zseb.html?from=golden-horn#mentett-mondatok">Megnézem Ali zsebében →</a>';
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

  if (story.detailChoice) showDetail(story.detailChoice);
  if (story.completedAt) showSavedState();
})();
