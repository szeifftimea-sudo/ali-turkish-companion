(() => {
  const STORY_KEY = 'ali-bazaar-harbor-v1';
  const PHRASE_KEY = 'ali-phrase-progress-v2';

  const defaultStory = {
    spiceChoice: '',
    completedAt: null
  };

  const phrases = [
    { phrase: 'Kolay gelsin.', translation: 'Jó munkát!' },
    { phrase: 'Bakabilir miyim?', translation: 'Megnézhetem?' },
    { phrase: 'Bu ne kadar?', translation: 'Mennyibe kerül ez?' },
    { phrase: 'Mısır Çarşısı nerede?', translation: 'Hol van a Fűszerbazár?' },
    { phrase: 'Bundan biraz alabilir miyim?', translation: 'Kaphatok ebből egy keveset?' }
  ];

  const spices = {
    pepper: {
      tr: 'Pul biber',
      hu: 'csilipelyhek',
      note: 'A pul biber kerül a kis zacskóba. Meleg, paprikás illata estig veled marad.'
    },
    cumin: {
      tr: 'Kimyon',
      hu: 'kömény',
      note: 'A kimyont választottad. Ali szerint már az illatáról felismernéd a következő sarkon is.'
    },
    cinnamon: {
      tr: 'Tarçın',
      hu: 'fahéj',
      note: 'A tarçın kerül a zacskóba. Édes, fás illata most már ehhez a sétához tartozik.'
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

  function showSpice(value) {
    const spice = spices[value];
    if (!spice) return;

    document.querySelectorAll('[data-spice]').forEach((button) => {
      const active = button.dataset.spice === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const note = document.querySelector('[data-spice-note]');
    const memory = document.querySelector('[data-spice-memory]');
    if (note) note.textContent = spice.note;
    if (memory) memory.innerHTML = `A sétádról a <strong lang="tr">${spice.tr}</strong> — ${spice.hu} — illatát is magaddal viszed.`;
  }

  document.querySelectorAll('[data-spice]').forEach((button) => {
    button.addEventListener('click', () => {
      updateStory({ spiceChoice: button.dataset.spice });
      showSpice(button.dataset.spice);
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
        contexts: [...new Set([...(existing.contexts || []), 'bazaar-harbor'])],
        sources: [...new Set([...(existing.sources || []), 'bazaar-harbor'])],
        source: 'bazaar-harbor',
        sourceLabel: 'A bazártól a kikötőig',
        sourceHref: 'bazartol-kikotoig.html#mondatok',
        encounters: Math.max(1, existing.encounters || 0),
        lastSource: 'bazaar-harbor',
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
      saveFeedback.innerHTML = 'Az öt mondat veled jön. <a href="zseb.html?from=bazaar#mentett-mondatok">Megnézem Ali zsebében →</a>';
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

  if (story.spiceChoice) showSpice(story.spiceChoice);
  if (story.completedAt) showSavedState();
})();
