(() => {
  const STORY_KEY = 'ali-machines-view-v1';
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const phrases = [
    { phrase: 'Bu nasıl çalışıyor?', translation: 'Hogyan működik ez?' },
    { phrase: 'Bunu yakından görebilir miyiz?', translation: 'Megnézhetjük közelebbről?' },
    { phrase: "Eyüp'e nasıl gidebiliriz?", translation: 'Hogyan jutunk el Eyüpbe?' },
    { phrase: 'Teleferik nereden kalkıyor?', translation: 'Honnan indul a felvonó?' },
    { phrase: "Haliç'i buradan görebilir miyiz?", translation: 'Láthatjuk innen az Aranyszarv-öblöt?' }
  ];
  const readJSON = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
  const writeJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Az út mentés nélkül is járható. */ } };
  const phraseId = (phrase = '') => phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();

  const steps = [...document.querySelectorAll('[data-motion-step]')];
  const setActiveStep = (name) => steps.forEach((step) => {
    const active = step.dataset.motionStep === name;
    step.classList.toggle('active', active);
    if (active) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
  });
  const sections = [...document.querySelectorAll('[data-motion-section]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStep(visible.target.dataset.motionSection);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
  } else setActiveStep('kerek');

  function saveStory() {
    const stored = readJSON(PHRASE_KEY, []);
    const nextItems = Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    const ranks = { new: 0, used: 1, saved: 2, returned: 3, familiar: 4 };
    const now = new Date().toISOString();
    phrases.forEach(({ phrase, translation }) => {
      const id = phraseId(phrase);
      const existing = nextItems.find((item) => item.id === id) || { id, phrase, status: 'new', encounters: 0, contexts: [] };
      const updated = { ...existing, id, phrase, translation, status: ranks[existing.status] > ranks.saved ? existing.status : 'saved', contexts: [...new Set([...(existing.contexts || []), 'machines-view'])], sources: [...new Set([...(existing.sources || []), 'machines-view'])], source: 'machines-view', sourceLabel: 'Előbb a gépek, aztán a kilátás', sourceHref: 'gepektol-kilatasig.html#mondatok', encounters: Math.max(1, existing.encounters || 0), lastSource: 'machines-view', updatedAt: now };
      const index = nextItems.findIndex((item) => item.id === id);
      if (index >= 0) nextItems[index] = updated; else nextItems.push(updated);
    });
    writeJSON(PHRASE_KEY, nextItems);
    writeJSON(STORY_KEY, { completedAt: now });
  }
  const saveButton = document.querySelector('[data-save-story]');
  const saveFeedback = document.querySelector('[data-save-feedback]');
  const showSaved = () => {
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.innerHTML = '✓ Az út Ali zsebében van';
    if (saveFeedback) saveFeedback.innerHTML = 'Az öt mondat veled jön. <a href="zseb.html?from=machines-view#mentett-mondatok">Megnézem Ali zsebében →</a>';
  };
  saveButton?.addEventListener('click', () => { saveStory(); showSaved(); });
  if (readJSON(STORY_KEY, {}).completedAt) showSaved();
  const journal = readJSON('ali-travel-journal-v2', []);
  const count = Array.isArray(journal) ? new Set(journal.filter((entry) => Number.isInteger(entry?.id)).map((entry) => entry.id)).size : 0;
  document.querySelectorAll('[data-pocket-count]').forEach((node) => { node.textContent = String(count); });
})();
