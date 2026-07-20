(() => {
  const STORY_KEY = 'ali-kadikoy-moda-v1';
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const story = readJSON(STORY_KEY, {
    noticedSense: '',
    tastingChoice: '',
    marketChoice: '',
    restChoice: '',
    completedAt: null
  });

  const continuation = (name) => document.querySelector(`[data-next-after="${name}"]`);
  const setContinuation = (name, visible) => {
    const link = continuation(name);
    if (link) link.hidden = !visible;
  };
  ['sense', 'tasting', 'rest'].forEach((name) => setContinuation(name, false));

  const phrases = [
    { phrase: 'Tadına bakabilir miyim?', translation: 'Megkóstolhatom?' },
    { phrase: 'Bundan istiyorum.', translation: 'Ebből kérek.' },
    { phrase: 'Bu ne kadar?', translation: 'Mennyibe kerül ez?' },
    { phrase: 'Sahile gidelim mi?', translation: 'Menjünk le a partra?' }
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
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* A séta mentés nélkül is végigvihető. */ }
  }

  function phraseId(phrase = '') {
    return phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  }

  function updateStory(patch) {
    Object.assign(story, patch);
    writeJSON(STORY_KEY, story);
  }

  const senseResponses = {
    smell: 'Akkor menjünk az illat után. Lehet, hogy a friss kenyér előbb talál meg minket, mint mi a pékséget.',
    color: 'Nézd csak, mennyi árnyalat fér el egyetlen pulton. Menjünk közelebb ahhoz, amelyiken megakadt a szemed.',
    sound: 'Én is innen tudom, hogy megérkeztünk. Kövessük a hangot, de ne siessünk vele.'
  };

  const tasteResponses = {
    taste: 'Ali elmosolyodik, és veled együtt várja meg a választ. Most már nem csak nézelődsz: megszólítottad a helyet.',
    look: 'Rendben. Nem kell mindent megkóstolnunk ahhoz, hogy itt legyünk. Nézzünk tovább együtt.'
  };

  const marketNotes = {
    olives: 'A zeytin kerül a zacskóba. Rámutatsz, aztán a két rövid mondat elvégzi a többit.',
    cheese: 'A peynir mellett döntöttél. Nem kell fajtákat felsorolnod: először elég, hogy választani tudsz.',
    fruit: 'Ma a mevsim meyvesi jön velünk. Az idény dönti el, mi lesz az — te pedig azt, hogy kérsz-e belőle.'
  };

  const restResponses = {
    coffee: 'Leülünk egy rövid kávéra. Ali nem töri meg a csendet; csak akkor indulunk tovább, amikor jólesik felállni.',
    walk: 'Sétáljunk. A kis utcák lassan kiszélesednek, és egyszer csak megjelenik előttünk a víz.'
  };

  const setExclusiveChoice = (selector, value, attribute) => {
    document.querySelectorAll(selector).forEach((button) => {
      const active = button.dataset[attribute] === value;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });
  };

  const senseResponse = document.querySelector('[data-sense-response] p');
  document.querySelectorAll('[data-sense]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.sense;
      updateStory({ noticedSense: value });
      setExclusiveChoice('[data-sense]', value, 'sense');
      if (senseResponse) senseResponse.textContent = senseResponses[value];
      setContinuation('sense', true);
    });
  });

  const tastingResponse = document.querySelector('[data-tasting-response]');
  document.querySelectorAll('[data-tasting]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.tasting;
      updateStory({ tastingChoice: value });
      setExclusiveChoice('[data-tasting]', value, 'tasting');
      if (tastingResponse) tastingResponse.textContent = tasteResponses[value];
      setContinuation('tasting', true);
    });
  });

  const marketNote = document.querySelector('[data-market-note]');
  document.querySelectorAll('[data-market-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.marketChoice;
      updateStory({ marketChoice: value });
      setExclusiveChoice('[data-market-choice]', value, 'marketChoice');
      if (marketNote) marketNote.textContent = marketNotes[value];
    });
  });

  const restResponse = document.querySelector('[data-rest-response]');
  document.querySelectorAll('[data-rest]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.rest;
      updateStory({ restChoice: value });
      setExclusiveChoice('[data-rest]', value, 'rest');
      if (restResponse) restResponse.textContent = restResponses[value];
      setContinuation('rest', true);
    });
  });

  function restoreStory() {
    if (story.noticedSense) {
      setExclusiveChoice('[data-sense]', story.noticedSense, 'sense');
      if (senseResponse) senseResponse.textContent = senseResponses[story.noticedSense];
      setContinuation('sense', true);
    }
    if (story.tastingChoice) {
      setExclusiveChoice('[data-tasting]', story.tastingChoice, 'tasting');
      if (tastingResponse) tastingResponse.textContent = tasteResponses[story.tastingChoice];
      setContinuation('tasting', true);
    }
    if (story.marketChoice) {
      setExclusiveChoice('[data-market-choice]', story.marketChoice, 'marketChoice');
      if (marketNote) marketNote.textContent = marketNotes[story.marketChoice];
    }
    if (story.restChoice) {
      setExclusiveChoice('[data-rest]', story.restChoice, 'rest');
      if (restResponse) restResponse.textContent = restResponses[story.restChoice];
      setContinuation('rest', true);
    }
  }

  function saveAfternoon() {
    const stored = readJSON(PHRASE_KEY, []);
    const currentItems = Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    const ranks = { new: 0, used: 1, saved: 2, returned: 3, familiar: 4 };
    const now = new Date().toISOString();
    const nextItems = [...currentItems];

    phrases.forEach(({ phrase, translation }) => {
      const id = phraseId(phrase);
      const existing = nextItems.find((item) => item.id === id) || { id, phrase, status: 'new', encounters: 0, contexts: [] };
      const updated = {
        ...existing,
        id,
        phrase,
        translation,
        status: ranks[existing.status] > ranks.saved ? existing.status : 'saved',
        contexts: [...new Set([...(existing.contexts || []), 'kadikoy-moda'])],
        sources: [...new Set([...(existing.sources || []), 'kadikoy-moda'])],
        source: 'kadikoy-moda',
        sourceLabel: 'Kadıköy–Moda',
        sourceHref: 'kadikoy-moda.html#mondatok',
        encounters: Math.max(1, existing.encounters || 0),
        lastSource: 'kadikoy-moda',
        updatedAt: now
      };
      const index = nextItems.findIndex((item) => item.id === id);
      if (index >= 0) nextItems[index] = updated;
      else nextItems.push(updated);
    });

    writeJSON(PHRASE_KEY, nextItems);
    updateStory({ completedAt: now });
  }

  const saveButton = document.querySelector('[data-save-afternoon]');
  const saveFeedback = document.querySelector('[data-save-feedback]');
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      saveAfternoon();
      saveButton.disabled = true;
      saveButton.innerHTML = '✓ A délután Ali zsebében van';
      if (saveFeedback) saveFeedback.innerHTML = 'A négy mondat veled jön. <a href="zseb.html?from=kadikoy#mentett-mondatok">Megnézem Ali zsebében →</a>';
    });
  }

  const readJournalCount = () => {
    const journal = readJSON('ali-travel-journal-v2', []);
    return Array.isArray(journal) ? new Set(journal.filter((entry) => Number.isInteger(entry?.id)).map((entry) => entry.id)).size : 0;
  };
  document.querySelectorAll('[data-pocket-count]').forEach((node) => { node.textContent = String(readJournalCount()); });

  restoreStory();
})();
