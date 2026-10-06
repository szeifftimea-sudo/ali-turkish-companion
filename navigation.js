(() => {
  const header = document.querySelector('.global-header');
  const navigation = header?.querySelector('.site-navigation');
  const menuToggle = header?.querySelector('.menu-toggle');
  const pocketMenu = header?.querySelector('[data-nav-section="ali-zsebeben"] .nav-popover');
  if (pocketMenu && !pocketMenu.querySelector('a[href^="arfolyam.html"]')) {
    const exchangeLink = document.createElement('a');
    exchangeLink.href = 'arfolyam.html';
    exchangeLink.innerHTML = '<span>Líra–forint kalkulátor</span><small>Gyors átváltás utazáshoz</small>';
    pocketMenu.append(exchangeLink);
  }
  const groups = [...(header?.querySelectorAll('.nav-group') || [])];
  if (!header || !navigation || !menuToggle) return;

  const currentSection = document.body.dataset.section;
  header.querySelectorAll('[data-nav-section]').forEach(item => {
    if (item.dataset.navSection === currentSection) item.classList.add('active');
  });

  function closeGroups(except = null) {
    groups.forEach(group => {
      if (group === except) return;
      group.classList.remove('open');
      group.querySelector('.nav-group-trigger')?.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMenu() {
    header.classList.remove('menu-open');
    document.body.classList.remove('navigation-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    closeGroups();
  }

  menuToggle.addEventListener('click', () => {
    const opening = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', opening);
    document.body.classList.toggle('navigation-open', opening);
    menuToggle.setAttribute('aria-expanded', String(opening));
  });

  groups.forEach(group => {
    const trigger = group.querySelector('.nav-group-trigger');
    trigger?.addEventListener('click', event => {
      event.stopPropagation();
      const opening = !group.classList.contains('open');
      closeGroups(group);
      group.classList.toggle('open', opening);
      trigger.setAttribute('aria-expanded', String(opening));
    });
  });

  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 1050px)').matches) closeMenu();
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeGroups(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (!window.matchMedia('(max-width: 1050px)').matches) closeMenu(); });
})();

(() => {
  const selector = '[lang="tr"]';

  function makePronunciationMarker() {
    const marker = document.createElement('span');
    marker.className = 'pronunciation-coming';
    marker.setAttribute('role', 'img');
    marker.setAttribute('aria-label', 'Kiejtés hamarosan');
    marker.setAttribute('title', 'A török kiejtés hamarosan hallgatható lesz.');
    marker.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9.2c1.1.8 1.7 1.7 1.7 2.8s-.6 2-1.7 2.8"/><path d="M18.5 6.8c1.9 1.5 2.8 3.2 2.8 5.2s-.9 3.7-2.8 5.2"/></svg>';
    return marker;
  }

  function decorateTurkishText(root = document) {
    const nodes = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll(selector));

    nodes.forEach((element) => {
      if (element.dataset.pronunciationPreview === 'true' && element.querySelector(':scope > .pronunciation-coming')) return;
      if (element.closest('[aria-hidden="true"], option, template, button, a')) return;
      element.dataset.pronunciationPreview = 'true';
      element.append(makePronunciationMarker());
    });
  }

  decorateTurkishText();
  const observer = new MutationObserver((changes) => {
    changes.forEach((change) => {
      if (change.target.nodeType === Node.ELEMENT_NODE) decorateTurkishText(change.target);
      change.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) decorateTurkishText(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
