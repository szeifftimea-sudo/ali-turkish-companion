(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHRASE_KEY = 'ali-phrase-progress-v2';

  const phraseId = (phrase = '') => phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();

  const readPhrases = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(PHRASE_KEY) || '[]');
      return Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    } catch {
      return [];
    }
  };

  const writePhrases = (items) => {
    try { localStorage.setItem(PHRASE_KEY, JSON.stringify(items)); } catch { /* A prototípus az aktuális oldalon tovább működik. */ }
  };

  let toastTimer;
  const showToast = (message) => {
    let toast = document.querySelector('.kitchen-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'kitchen-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
  };

  const savedInKitchen = (phrase) => {
    const item = readPhrases().find((entry) => entry.id === phraseId(phrase));
    return Boolean(item && ((item.sources || []).includes('torok-konyha') || item.source === 'torok-konyha'));
  };

  const syncPhraseButton = (button) => {
    const saved = savedInKitchen(button.dataset.phrase);
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? '✓ Ali zsebében' : 'Elteszem Ali zsebébe';
    const pocketLink = button.closest('.phrase-save-actions')?.querySelector('a');
    if (pocketLink) pocketLink.hidden = !saved;
  };

  const saveKitchenPhrase = (button) => {
    const phrase = button.dataset.phrase?.trim();
    if (!phrase) return;
    const translation = button.dataset.translation?.trim() || '';
    const id = phraseId(phrase);
    const items = readPhrases();
    const current = items.find((item) => item.id === id) || { id, phrase, status: 'new', encounters: 0, contexts: [] };
    const ranks = { new: 0, used: 1, saved: 2, returned: 3, familiar: 4 };
    const contexts = [...new Set([...(current.contexts || []), 'torok-konyha'])];
    const sources = [...new Set([...(current.sources || []), 'torok-konyha'])];
    const status = ranks[current.status] > ranks.saved ? current.status : 'saved';
    const updated = {
      ...current,
      id,
      phrase,
      translation,
      status,
      contexts,
      sources,
      source: 'torok-konyha',
      sourceLabel: 'Török konyha',
      sourceHref: 'torok-konyha.html?v=20260719-5#mondatok',
      encounters: Math.max(1, current.encounters || 0),
      lastSource: 'torok-konyha',
      updatedAt: new Date().toISOString()
    };
    writePhrases([...items.filter((item) => item.id !== id), updated]);
    syncPhraseButton(button);
    showToast(`Ali eltette: ${phrase}`);
  };

  const phraseSaveButtons = [...document.querySelectorAll('[data-save-kitchen-phrase]')];
  phraseSaveButtons.forEach((button) => {
    syncPhraseButton(button);
    button.addEventListener('click', () => saveKitchenPhrase(button));
  });

  const readJournalCount = () => {
    try {
      const journal = JSON.parse(localStorage.getItem('ali-travel-journal-v2') || '[]');
      return Array.isArray(journal) ? journal.filter((entry) => entry && Number.isInteger(entry.id)).length : 0;
    } catch {
      return 0;
    }
  };

  document.querySelectorAll('[data-pocket-count]').forEach((node) => {
    node.textContent = String(readJournalCount());
  });

  const revealItems = [...document.querySelectorAll('.reveal:not(.visible)')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const routeLinks = [...document.querySelectorAll('[data-route-link]')];
  const routeSections = [...document.querySelectorAll('[data-route-section]')];
  const setRoute = (id) => {
    routeLinks.forEach((link) => {
      const active = link.dataset.routeLink === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const routeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setRoute(visible.target.dataset.routeSection);
    }, { rootMargin: '-28% 0px -55% 0px', threshold: [0, 0.08, 0.25] });
    routeSections.forEach((section) => routeObserver.observe(section));
  }

  const bindTabs = ({ tabSelector, panelSelector, tabKey, panelKey }) => {
    const tabs = [...document.querySelectorAll(tabSelector)];
    const panels = [...document.querySelectorAll(panelSelector)];
    if (!tabs.length || !panels.length) return;

    const activate = (value, focus = false) => {
      tabs.forEach((tab) => {
        const active = tab.dataset[tabKey] === value;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset[panelKey] !== value;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset[tabKey]));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        activate(tabs[nextIndex].dataset[tabKey], true);
      });
    });
  };

  bindTabs({
    tabSelector: '[data-table-door]',
    panelSelector: '[data-restaurant-panel]',
    tabKey: 'tableDoor',
    panelKey: 'restaurantPanel'
  });

  bindTabs({
    tabSelector: '[data-phrase-tab]',
    panelSelector: '[data-phrase-panel]',
    tabKey: 'phraseTab',
    panelKey: 'phrasePanel'
  });
})();
