(() => {
  const JOURNAL_KEY = 'ali-travel-journal-v2';
  const MEMORY_KEY = 'ali-companion-memory-v2';
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const SESSION_KEY = 'ali-adventure-02';
  const route = ['Galata', 'Karaköy', 'a piros villamos', 'a Boszporusz', 'Üsküdar', 'a simitpékség', 'Sultanahmet', 'a Nagy Bazár', 'Gülhane', 'a vízpart'];

  function readStored(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  }

  function setJourneyLink(href) {
    document.querySelectorAll('[data-journey-link], [data-journey-card], [data-journey-nav]').forEach((link) => { link.href = href; });
  }

  function phraseKey(value = '') {
    return String(value).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  }

  const phraseTranslations = new Map([
    ['Merhaba.', 'Szia.'], ['Bir çay, lütfen.', 'Egy teát kérek.'], ['Teşekkür ederim.', 'Köszönöm.'],
    ['Şekerli.', 'Cukorral.'], ['Şekersiz.', 'Cukor nélkül.'], ['Şekerli, lütfen.', 'Cukorral kérem.'], ['Şekersiz, lütfen.', 'Cukor nélkül kérem.'],
    ['Vapur.', 'Komp.'], ['Bu Ali.', 'Ő Ali.'], ['Kahverengi gözlü.', 'Barna szemű.'], ['Güler yüzlü.', 'Mosolygós.'], ['Kıvırcık saçlı.', 'Göndör hajú.'],
    ['Sakin.', 'Nyugodt.'], ['Neşeli.', 'Vidám.'], ['Meraklı.', 'Kíváncsi.'],
    ['İstanbulkart geçerli mi?', 'Érvényes az İstanbulkart?'], ['Affedersiniz.', 'Elnézést.'], ['Nerede ineceğiz?', 'Hol szállunk le?'],
    ["Bu vapur Üsküdar'a gidiyor mu?", 'Ez a komp Üsküdarba megy?'], ['Dışarıda oturalım.', 'Üljünk le kint.'], ['İçeride oturalım.', 'Üljünk le bent.'],
    ['Burada oturalım.', 'Üljünk le itt.'], ['Bir çay içelim.', 'Igyunk egy teát.'], ['Manzara çok güzel.', 'Nagyon szép a kilátás.'],
    ['Bir fotoğraf çekelim mi?', 'Készítsünk egy fényképet?'], ['Biraz daha bakalım.', 'Nézzük még egy kicsit.'],
    ['Bir simit, lütfen.', 'Egy simitet kérek.'], ['İki simit, lütfen.', 'Két simitet kérek.'], ['Bir çay da lütfen.', 'Egy teát is kérek.'],
    ['Bu kadar, teşekkürler.', 'Ennyi lesz, köszönöm.'], ['Çok lezzetli.', 'Nagyon finom.'],
    ['Giriş nerede?', 'Hol van a bejárat?'], ['Fotoğraf çekebilir miyim?', 'Fényképezhetek?'], ['Sadece bakacağım.', 'Csak körülnézek.'],
    ['Bu ne kadar?', 'Mennyibe kerül ez?'], ['Biraz indirim olur mu?', 'Lehetne egy kis kedvezmény?'], ['Bunu alıyorum.', 'Ezt kérem.'],
    ['Alıyorum.', 'Megveszem.'], ['Almıyorum.', 'Nem veszem meg.'], ['Hayır, teşekkürler.', 'Nem, köszönöm.'], ['Teşekkürler.', 'Köszönöm.'],
    ['Biraz dinlenelim.', 'Pihenjünk egy kicsit.'], ['Yavaş yürüyelim.', 'Sétáljunk lassabban.'], ['Yorgunum.', 'Fáradt vagyok.'],
    ['İyiyim.', 'Jól vagyok.'], ['İyi hissediyorum.', 'Jól érzem magam.'], ['Biraz dinlenmek istiyorum.', 'Szeretnék egy kicsit pihenni.'],
    ['Başım ağrıyor.', 'Fáj a fejem.'], ['Belim ağrıyor.', 'Fáj a derekam.'], ['Ayaklarım ağrıyor.', 'Fáj a lábam.'],
    ['Evet, lütfen.', 'Igen, kérek.'], ['İyi akşamlar.', 'Jó estét.'], ['İyi günler.', 'Jó napot.'],
    ['Ailem.', 'A családom.'], ['Bir arkadaşım.', 'Egy barátom.'], ['Evet, kardeşim var.', 'Igen, van testvérem.'], ['Kardeşim yok.', 'Nincs testvérem.'],
    ['Kahve istiyorum.', 'Kávét kérek.'], ['Su istiyorum.', 'Vizet kérek.'], ['Çay istiyorum.', 'Teát kérek.'],
    ['Sıcak.', 'Meleg.'], ['Çıtır.', 'Ropogós.'], ['Bir kilo, lütfen.', 'Egy kilót kérek.'], ['İstanbul çok güzel.', 'Isztambul nagyon szép.'],
    ['Yakında görüşürüz.', 'Hamarosan találkozunk.'], ['Görüşürüz.', 'Viszlát.'],
    ['Macarım.', 'Magyar vagyok.'], ['Türküm.', 'Török vagyok.'], ['Almanım.', 'Német vagyok.'], ['Avusturyalıyım.', 'Osztrák vagyok.'],
    ['Rumenim.', 'Román vagyok.'], ['Slovakım.', 'Szlovák vagyok.'], ['Hırvatım.', 'Horvát vagyok.'], ['Slovenim.', 'Szlovén vagyok.'],
    ['Sırbım.', 'Szerb vagyok.'], ['Ukraynalıyım.', 'Ukrán vagyok.'], ['Polonyalıyım.', 'Lengyel vagyok.'], ['Çekim.', 'Cseh vagyok.'],
    ['Bulgarım.', 'Bolgár vagyok.'], ['Yunanım.', 'Görög vagyok.'], ['İtalyanım.', 'Olasz vagyok.'], ['Fransızım.', 'Francia vagyok.'],
    ['İspanyolum.', 'Spanyol vagyok.'], ['Portekizliyim.', 'Portugál vagyok.'], ['Hollandalıyım.', 'Holland vagyok.'], ['İngilizim.', 'Brit vagyok.']
  ].map(([turkish, hungarian]) => [phraseKey(turkish), hungarian]));

  function translatedPhrase(item) {
    if (item.translation) return item.translation;
    const phrase = String(item.phrase || '');
    const named = phrase.match(/^Benim adım\s+(.+)\.$/i);
    if (named) return `A nevem ${named[1]}.`;
    return phraseTranslations.get(phraseKey(phrase)) || 'Ezt a mondatot az út során tetted el.';
  }

  function phraseSource(item) {
    if (item.sourceLabel) return item.sourceLabel;
    const adventureNumber = Number(item.lastAdventure || (item.contexts || []).find((value) => Number.isInteger(value)));
    return adventureNumber >= 1 && adventureNumber <= route.length ? `${String(adventureNumber).padStart(2, '0')} · ${route[adventureNumber - 1]}` : 'Ali útinaplója';
  }

  const journal = readStored(JOURNAL_KEY, []).filter((entry) => entry && Number.isInteger(entry.id));
  const phrases = readStored(PHRASE_KEY, []).filter((entry) => entry && entry.id && entry.phrase);
  const memories = readStored(MEMORY_KEY, []).filter(Boolean);
  const session = readStored(SESSION_KEY, null);
  const pageParams = new URLSearchParams(window.location.search);
  const fromJourney = pageParams.get('from') === 'journey';
  const fromKitchen = pageParams.get('from') === 'konyha';
  const fromPlaces = pageParams.get('from') === 'helyek';
  const fromKadikoy = pageParams.get('from') === 'kadikoy';
  const fromBazaar = pageParams.get('from') === 'bazaar';
  const fromGoldenHorn = pageParams.get('from') === 'golden-horn';
  const fromTowerPark = pageParams.get('from') === 'tower-park';
  const fromMachinesView = pageParams.get('from') === 'machines-view';
  const fromIslandDay = pageParams.get('from') === 'island-day';
  const visitedIds = new Set(journal.map((entry) => entry.id));
  const visitedCount = visitedIds.size;
  const currentIndex = session && Number.isInteger(session.stationIndex) && session.stationIndex >= 0 && session.stationIndex < route.length
    ? session.stationIndex
    : null;

  setText('[data-pocket-count]', visitedCount);
  setText('[data-journal-count]', visitedCount);
  setText('[data-phrase-count]', new Set(phrases.map((entry) => entry.id)).size);

  const dots = document.querySelector('[data-route-dots]');
  if (dots) {
    dots.innerHTML = route.map((_, index) => {
      const classes = [visitedIds.has(index + 1) ? 'visited' : '', currentIndex === index ? 'current' : ''].filter(Boolean).join(' ');
      return `<span class="${classes}" aria-hidden="true"></span>`;
    }).join('');
    dots.setAttribute('aria-label', visitedCount
      ? `${visitedCount} ismerős hely a tízből${currentIndex !== null ? `, folytatás a ${currentIndex + 1}. állomástól` : ''}.`
      : 'Még nincs bejárt állomás.');
  }

  const lastEntry = [...journal].sort((a, b) => b.id - a.id)[0];
  if (visitedCount === 10) {
    setText('[data-keepsake-title]', 'Tíz hely már visszavár.');
    setText('[data-keepsake-copy]', 'Az első közös utatok bekerült az útinaplóba. Most már te döntöd el, hová tértek vissza.');
  } else if (visitedCount > 0) {
    setText('[data-keepsake-title]', `${visitedCount} hely már ismerős.`);
    setText('[data-keepsake-copy]', lastEntry?.place ? `Legutóbb itt jártatok: ${lastEntry.place}. Ali megjegyezte.` : 'Ali megjegyezte, merre jártatok.');
  }

  const favoriteMemory = memories.find((memory) => memory.key === 'favorite_phrase');
  const favoritePhrase = favoriteMemory?.valueLabel || lastEntry?.phrases?.[0] || phrases.at(-1)?.phrase || 'Merhaba.';
  setText('[data-favorite-phrase]', favoritePhrase);

  const savedPhraseSection = document.querySelector('[data-saved-phrases-section]');
  const savedPhraseList = document.querySelector('[data-saved-phrases-list]');
  const worldSources = new Set(['torok-konyha', 'isztambul-helyei', 'kadikoy-moda', 'bazaar-harbor', 'old-golden-horn', 'tower-park', 'machines-view', 'island-day']);
  const worldPhrases = phrases
    .filter((item) => [...(item.sources || []), item.source].some((source) => worldSources.has(source)))
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
  const visibleWorldPhrases = fromIslandDay
    ? worldPhrases.filter((item) => (item.sources || []).includes('island-day') || item.source === 'island-day')
    : fromMachinesView
    ? worldPhrases.filter((item) => (item.sources || []).includes('machines-view') || item.source === 'machines-view')
    : fromTowerPark
    ? worldPhrases.filter((item) => (item.sources || []).includes('tower-park') || item.source === 'tower-park')
    : fromGoldenHorn
    ? worldPhrases.filter((item) => (item.sources || []).includes('old-golden-horn') || item.source === 'old-golden-horn')
    : fromBazaar
    ? worldPhrases.filter((item) => (item.sources || []).includes('bazaar-harbor') || item.source === 'bazaar-harbor')
    : fromKadikoy
    ? worldPhrases.filter((item) => (item.sources || []).includes('kadikoy-moda') || item.source === 'kadikoy-moda')
    : worldPhrases;
  const hasKitchenPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('torok-konyha') || item.source === 'torok-konyha');
  const hasPlacePhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('isztambul-helyei') || item.source === 'isztambul-helyei');
  const hasKadikoyPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('kadikoy-moda') || item.source === 'kadikoy-moda');
  const hasBazaarPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('bazaar-harbor') || item.source === 'bazaar-harbor');
  const hasGoldenHornPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('old-golden-horn') || item.source === 'old-golden-horn');
  const hasTowerParkPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('tower-park') || item.source === 'tower-park');
  const hasMachinesViewPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('machines-view') || item.source === 'machines-view');
  const hasIslandDayPhrases = visibleWorldPhrases.some((item) => (item.sources || []).includes('island-day') || item.source === 'island-day');
  const returnCopy = document.querySelector('[data-saved-return-copy]');
  const returnLink = document.querySelector('[data-saved-return-link]');

  if (savedPhraseSection && savedPhraseList && (fromKitchen || fromPlaces || fromKadikoy || fromBazaar || fromGoldenHorn || fromTowerPark || fromMachinesView || fromIslandDay)) {
    savedPhraseSection.hidden = false;
    if (visibleWorldPhrases.length) {
      if ([hasKitchenPhrases, hasPlacePhrases, hasKadikoyPhrases, hasBazaarPhrases, hasGoldenHornPhrases, hasTowerParkPhrases, hasMachinesViewPhrases, hasIslandDayPhrases].filter(Boolean).length > 1) {
        setText('[data-saved-phrases-title]', 'Ezeket hoztad magaddal Isztambulból.');
      } else if (hasIslandDayPhrases) {
        setText('[data-saved-phrases-title]', 'Ezeket hoztad magaddal Büyükadáról.');
      } else if (hasMachinesViewPhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad a gépektől a kilátásig.' : 'Ezeket hoztad a gépektől a kilátásig.');
      } else if (hasTowerParkPhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad a toronytól a parkig.' : 'Ezeket hoztad a toronytól a parkig.');
      } else if (hasGoldenHornPhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad a régi utcákról.' : 'Ezeket hoztad a régi utcákról.');
      } else if (hasBazaarPhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad a bazártól a kikötőig.' : 'Ezeket hoztad a bazártól a kikötőig.');
      } else if (hasKadikoyPhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad Kadıköyből.' : 'Ezeket hoztad Kadıköyből.');
      } else if (hasPlacePhrases) {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad Sultanahmetből.' : 'Ezeket hoztad Sultanahmetből.');
      } else {
        setText('[data-saved-phrases-title]', visibleWorldPhrases.length === 1 ? 'Ezt hoztad az asztaltól.' : 'Ezeket hoztad az asztaltól.');
      }
      setText('[data-saved-phrases-copy]', hasIslandDayPhrases
        ? 'Az öt mondat biztos pontokat ad az induláshoz, a sétához és a visszaúthoz. Közöttük már hagyhatsz időt a napnak.'
        : hasMachinesViewPhrases
        ? 'A kíváncsiságtól a kilátásig minden mondat egy valódi következő lépést ad. Akkor vedd elő, amikor érteni vagy továbbindulni szeretnél.'
        : hasTowerParkPhrases
        ? 'A bejárattól a pihenőig minden mondatnak megvan a helye. Akkor vedd elő, amikor irányt keresel vagy megállnál.'
        : 'A török mondat marad elöl, a jelentése ott van mellette. Akkor vedd elő, amikor szükséged lesz rá.');
      savedPhraseList.innerHTML = visibleWorldPhrases.map((item) => `<article class="saved-world-card"><span>${escapeHTML(item.sourceLabel || 'Ali városa')}</span><strong lang="tr">${escapeHTML(item.phrase)}</strong><small>${escapeHTML(item.translation || 'A magyar jelentést a történetben találod.')}</small></article>`).join('');
    } else {
      setText('[data-saved-phrases-title]', 'Még semmit sem kell eltenned.');
      setText('[data-saved-phrases-copy]', fromMachinesView
        ? 'Menj vissza a gépektől a kilátásig vezető útra; ott együtt tesszük el az öt mondatot, amely a kíváncsiságtól az új nézőpontig vitt.'
        : fromTowerPark
        ? 'Menj vissza a toronytól a parkig vezető útra; ott együtt tesszük el az öt mondatot, amellyel megtaláltad az irányt és a saját tempódat.'
        : fromGoldenHorn
        ? 'Menj vissza a régi utcákhoz; ott együtt tesszük el az öt mondatot, amellyel figyelmes vendégként jártad végig az utat.'
        : fromBazaar
        ? 'Menj vissza a bazártól a kikötőig vezető sétához; ott együtt tesszük el az öt mondatot, amely végigvitt az úton.'
        : fromKadikoy
          ? 'Menj vissza a Kadıköy–Moda délutánhoz; ott csak azokat a mondatokat tesszük el, amelyeket valóban használnál.'
        : fromPlaces
          ? 'Menj vissza Sultanahmetbe, és csak azt a mondatot válaszd, amelyiket valóban használnád.'
          : 'Menj vissza az asztalhoz, és csak azt a mondatot válaszd, amelyiket valóban használnád.');
      savedPhraseList.innerHTML = fromMachinesView || fromTowerPark || fromGoldenHorn
        ? '<p class="saved-world-empty">Ali nem tömi tele a zsebedet. A séta végén együtt tehetitek el azt az öt mondatot, amelyet valóban használtál.</p>'
        : '<p class="saved-world-empty">Ali nem tömi tele a zsebedet. A mondatok mellett találsz egy „Elteszem” gombot, ha valamelyik veled maradna.</p>';
    }

    const latest = visibleWorldPhrases[0];
    const explicitReturnSource = fromIslandDay ? 'island-day'
      : fromMachinesView ? 'machines-view'
      : fromTowerPark ? 'tower-park'
      : fromGoldenHorn ? 'old-golden-horn'
      : fromBazaar ? 'bazaar-harbor'
      : fromKadikoy ? 'kadikoy-moda'
      : fromPlaces ? 'isztambul-helyei'
      : fromKitchen ? 'torok-konyha'
      : null;
    const returnSource = explicitReturnSource || latest?.source || 'torok-konyha';
    const returnToIslandDay = returnSource === 'island-day';
    const returnToMachinesView = returnSource === 'machines-view';
    const returnToTowerPark = returnSource === 'tower-park';
    const returnToGoldenHorn = returnSource === 'old-golden-horn';
    const returnToBazaar = returnSource === 'bazaar-harbor';
    const returnToKadikoy = returnSource === 'kadikoy-moda';
    const returnToPlaces = returnSource === 'isztambul-helyei';
    if (returnCopy) returnCopy.textContent = returnToIslandDay
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a büyükadai napra.'
      : returnToMachinesView
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a Hasköytől Pierre Lotiig vezető útra.'
      : returnToTowerPark
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a Galatától a Yıldız Parkig vezető útra.'
      : returnToGoldenHorn
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a Kariye-től az Aranyszarvig vezető sétára.'
      : returnToBazaar
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a bazártól a kikötőig vezető sétára.'
      : returnToKadikoy
      ? 'Ha szeretnéd, innen visszaléphetünk ugyanarra a Kadıköy–Moda délutánra.'
      : returnToPlaces
        ? 'Ha szeretnéd, innen visszaléphetünk ugyanabba a sultanahmeti udvarba.'
        : 'Ha szeretnéd, innen visszaléphetünk ugyanahhoz az asztalhoz.';
    if (returnLink) {
      returnLink.href = returnToIslandDay ? 'egy-nap-a-szigeten.html#mondatok' : returnToMachinesView ? 'gepektol-kilatasig.html#mondatok' : returnToTowerPark ? 'toronytol-parkig.html#mondatok' : returnToGoldenHorn ? 'regi-utcak.html#mondatok' : returnToBazaar ? 'bazartol-kikotoig.html#mondatok' : returnToKadikoy ? 'kadikoy-moda.html#mondatok' : returnToPlaces ? 'isztambul-helyei.html#sultanahmet-mondatok' : 'torok-konyha.html?v=20260719-5#mondatok';
      returnLink.innerHTML = `${returnToIslandDay ? 'Vissza a szigeti naphoz' : returnToMachinesView ? 'Vissza a gépektől a kilátásig vezető útra' : returnToTowerPark ? 'Vissza a toronytól a parkig vezető útra' : returnToGoldenHorn ? 'Vissza a régi utcákhoz' : returnToBazaar ? 'Vissza a bazárhoz' : returnToKadikoy ? 'Vissza Kadıköybe' : returnToPlaces ? 'Vissza Sultanahmetbe' : 'Vissza a konyhai történethez'} <span aria-hidden="true">→</span>`;
    }
  }

  if (currentIndex !== null) {
    const place = route[currentIndex];
    const step = Math.min(10, currentIndex + 1);
    setText('[data-journey-kicker]', `A ${step}. állomásnál álltunk meg`);
    setText('[data-journey-title]', `Folytassuk innen: ${place}`);
    setText('[data-journey-copy]', 'Ali megjegyezte, hol álltatok meg.');
    setText('[data-card-journey-kicker]', 'Ali megvárt');
    setText('[data-card-journey-title]', 'Folytatnám az utazást.');
    setText('[data-card-journey-copy]', `A következő pillanat itt vár: ${place}.`);
    setText('[data-card-journey-cta]', 'Folytassuk →');
    setJourneyLink('index.html?start=1');
  } else if (visitedCount === 10) {
    setText('[data-journey-kicker]', 'Az első közös utatok már az útinaplóban van');
    setText('[data-journey-title]', 'Visszasétálok egy ismerős helyre');
    setText('[data-journey-copy]', 'Mind a tíz állomás nyitva áll előtted.');
    setText('[data-card-journey-kicker]', 'A város már ismerős');
    setText('[data-card-journey-title]', 'Visszatérnék egy helyre.');
    setText('[data-card-journey-copy]', 'Lapozz végig a tíz állomáson, és válaszd azt, amelyik most visszahív.');
    setText('[data-card-journey-cta]', 'Mutasd az állomásokat →');
    setJourneyLink('index.html#journey');
  } else if (visitedCount > 0) {
    setText('[data-journey-kicker]', 'Az első út még folytatódhat');
    setText('[data-journey-title]', 'Nézzük meg az állomásokat');
    setText('[data-journey-copy]', 'Válaszd ki, honnan induljatok tovább.');
    setText('[data-card-journey-title]', 'Visszamennék a városba.');
    setText('[data-card-journey-copy]', `${visitedCount} hely már ismerős. A következőt te választod.`);
    setText('[data-card-journey-cta]', 'Mutasd az állomásokat →');
    setJourneyLink('index.html#journey');
  }

  if (fromJourney && visitedCount) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Az utad biztonságban van';
  } else if (fromKitchen) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Az asztaltól érkeztél';
  } else if (fromPlaces) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Sultanahmetből érkeztél';
  } else if (fromKadikoy) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Kadıköyből érkeztél';
  } else if (fromBazaar) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'A kikötőtől érkeztél';
  } else if (fromGoldenHorn) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Az Aranyszarvtól érkeztél';
  } else if (fromTowerPark) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'A Yıldız Parkból érkeztél';
  } else if (fromMachinesView) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Pierre Lotiból érkeztél';
  } else if (fromIslandDay) {
    const eyebrow = document.querySelector('.pocket-copy > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Büyükadáról érkeztél';
  }

  const learningList = document.querySelector('[data-learning-list]');
  const learningEmpty = document.querySelector('[data-learning-empty]');
  const learningToolbar = document.querySelector('[data-learning-toolbar]');
  const learningToolbarNote = document.querySelector('[data-learning-toolbar-note]');
  const learningBottomActions = document.querySelector('[data-learning-bottom-actions]');
  const studyDeck = document.querySelector('[data-study-deck]');
  let learningItems = phrases.map((item) => ({
    ...item,
    translation: translatedPhrase(item),
    learningState: item.learningState || (item.status === 'familiar' ? 'known' : 'practicing')
  }));
  let activeLearningFilter = 'all';
  let studyItems = [];
  let studyIndex = 0;

  function writeLearningItems() {
    try { localStorage.setItem(PHRASE_KEY, JSON.stringify(learningItems)); } catch { /* A felület az aktuális látogatásban így is működik. */ }
  }

  function visibleLearningItems() {
    return activeLearningFilter === 'all' ? learningItems : learningItems.filter((item) => item.learningState === activeLearningFilter);
  }

  function studyDeckSizeClass(items) {
    const longestSide = items.reduce((longest, item) => Math.max(
      longest,
      String(item.phrase || '').length,
      String(item.translation || '').length
    ), 0);
    if (longestSide > 54) return 'is-very-long';
    if (longestSide > 28) return 'is-long';
    return '';
  }

  function renderLearningCollection() {
    if (!learningList || !learningEmpty || !learningToolbar) return;
    const practicing = learningItems.filter((item) => item.learningState !== 'known').length;
    const known = learningItems.filter((item) => item.learningState === 'known').length;
    setText('[data-learning-total]', learningItems.length);
    setText('[data-learning-practicing]', practicing);
    setText('[data-learning-known]', known);
    setText('[data-learning-summary-copy]', learningItems.length
      ? known === learningItems.length ? 'Ezek a mondatok már jókor jutnak eszedbe.' : `${practicing} mondat vár még egy nyugodt ismétlésre.`
      : 'Az első mondatod majd magától megérkezik.');
    learningEmpty.hidden = learningItems.length > 0;
    learningToolbar.hidden = learningItems.length === 0;
    if (learningToolbarNote) learningToolbarNote.hidden = learningItems.length === 0;
    const visible = visibleLearningItems();
    if (learningBottomActions) learningBottomActions.hidden = visible.length === 0;
    setText('[data-print-visible-count]', visible.length);
    document.querySelectorAll('[data-print-cards]').forEach((button) => {
      button.disabled = visible.length === 0;
      button.setAttribute('aria-disabled', String(visible.length === 0));
    });
    learningList.innerHTML = visible.length ? visible.map((item, index) => {
      const knownItem = item.learningState === 'known';
      return `<article class="learning-item ${knownItem ? 'is-known' : ''}" data-learning-id="${escapeHTML(item.id)}">
        <header class="learning-card-header"><span class="learning-source">${escapeHTML(phraseSource(item))}</span><b class="learning-card-number" aria-label="Kártya ${index + 1}">${String(index + 1).padStart(2, '0')}</b></header>
        <strong lang="tr">${escapeHTML(item.phrase)}</strong>
        <p>${escapeHTML(item.translation)}</p>
        <span class="learning-card-signature" aria-hidden="true">Ali · A török útitárs</span>
        <div class="learning-state" role="group" aria-label="Tanulási állapot: ${escapeHTML(item.phrase)}">
          <button type="button" data-set-learning="practicing" aria-pressed="${knownItem ? 'false' : 'true'}">Még gyakorlom</button>
          <button type="button" data-set-learning="known" aria-pressed="${knownItem ? 'true' : 'false'}">✓ Már megy</button>
        </div>
      </article>`;
    }).join('') : '<p class="learning-filter-empty">Ebben a csoportban most nincs mondat. Ali nem siettet; válassz egy másik nézetet.</p>';
  }

  function renderStudyCard() {
    if (!studyDeck || !studyItems.length) return;
    const item = studyItems[studyIndex];
    setText('[data-study-source]', phraseSource(item));
    setText('[data-study-phrase]', item.phrase);
    setText('[data-study-translation]', item.translation);
    setText('[data-study-index]', studyIndex + 1);
    setText('[data-study-total]', studyItems.length);
    const card = document.querySelector('[data-study-card]');
    const phrase = document.querySelector('[data-study-phrase]');
    const translation = document.querySelector('[data-study-translation]');
    const side = document.querySelector('[data-study-side]');
    const flip = document.querySelector('[data-flip-card]');
    if (card) {
      card.classList.remove('is-back', 'is-long', 'is-very-long');
      const deckSizeClass = studyDeckSizeClass(studyItems);
      if (deckSizeClass) card.classList.add(deckSizeClass);
    }
    if (phrase) phrase.hidden = false;
    if (translation) translation.hidden = true;
    if (side) side.textContent = 'Türkçe';
    if (flip) { flip.textContent = 'Fordítsd meg →'; flip.setAttribute('aria-expanded', 'false'); }
  }

  function printCardSizeClass(text) {
    if (text.length > 82) return 'is-very-long';
    if (text.length > 46) return 'is-long';
    return '';
  }

  function printableCardMarkup(card, side) {
    if (!card) return '<div class="print-learning-card is-blank" aria-hidden="true"></div>';
    const front = side === 'front';
    const text = front ? card.item.phrase : card.item.translation;
    const footerMark = front
      ? '<img class="print-card-qr" src="assets/ali-site-qr.png" alt="Ali weboldala QR-kód" />'
      : `<b>${String(card.number).padStart(2, '0')}</b>`;
    return `<article class="print-learning-card ${front ? 'is-front' : 'is-back'} ${printCardSizeClass(text)}">
      <div class="print-card-ali"><span class="print-card-portrait"><img src="assets/ali.png" alt="Ali" /></span></div>
      <div class="print-card-copy">
        <small>${front ? 'TÜRKÇE' : 'MAGYARUL'}</small>
        <strong${front ? ' lang="tr"' : ''}>${escapeHTML(text)}</strong>
      </div>
      <footer><span class="print-card-brand"><svg viewBox="-4 -4 56 56" aria-hidden="true"><path class="mark-arch" d="M8 41V23C8 12.5 15.2 5 24 5s16 7.5 16 18v18"/><path class="mark-a" d="M14.5 39 24 15.5 33.5 39M18.5 29.5h11"/></svg><span class="print-card-brand-copy"><em>Ali</em><small>A török útitárs</small></span></span>${footerMark}</footer>
    </article>`;
  }

  function buildPrintableDeck(items = visibleLearningItems()) {
    document.querySelector('[data-print-card-deck]')?.remove();
    const deck = document.createElement('div');
    deck.className = 'print-card-deck';
    deck.dataset.printCardDeck = '';
    const cards = items.map((item, index) => ({ item, number: index + 1 }));
    for (let offset = 0; offset < cards.length; offset += 4) {
      const batch = [...cards.slice(offset, offset + 4)];
      while (batch.length < 4) batch.push(null);
      const mirroredBacks = [batch[1], batch[0], batch[3], batch[2]];
      deck.insertAdjacentHTML('beforeend', `<section class="print-card-page print-card-fronts" aria-label="Kártyaelőlapok">${batch.map((card) => printableCardMarkup(card, 'front')).join('')}</section>`);
      deck.insertAdjacentHTML('beforeend', `<section class="print-card-page print-card-backs" aria-label="Kártyahátlapok">${mirroredBacks.map((card) => printableCardMarkup(card, 'back')).join('')}</section>`);
    }
    document.body.append(deck);
    return deck;
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

  document.querySelectorAll('[data-learning-filter]').forEach((button) => button.addEventListener('click', () => {
    activeLearningFilter = button.dataset.learningFilter;
    document.querySelectorAll('[data-learning-filter]').forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    renderLearningCollection();
  }));

  learningList?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-set-learning]');
    const card = button?.closest('[data-learning-id]');
    if (!button || !card) return;
    learningItems = learningItems.map((item) => item.id === card.dataset.learningId ? { ...item, learningState: button.dataset.setLearning, updatedAt: new Date().toISOString() } : item);
    writeLearningItems();
    renderLearningCollection();
  });

  document.querySelector('[data-open-study]')?.addEventListener('click', () => {
    studyItems = visibleLearningItems().length ? visibleLearningItems() : learningItems;
    if (!studyItems.length || !studyDeck) return;
    studyIndex = 0;
    studyDeck.hidden = false;
    renderStudyCard();
    studyDeck.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  document.querySelector('[data-close-study]')?.addEventListener('click', () => { if (studyDeck) studyDeck.hidden = true; });
  document.querySelector('[data-flip-card]')?.addEventListener('click', (event) => {
    const card = document.querySelector('[data-study-card]');
    const phrase = document.querySelector('[data-study-phrase]');
    const translation = document.querySelector('[data-study-translation]');
    const side = document.querySelector('[data-study-side]');
    if (!card || !phrase || !translation) return;
    const showingBack = card.classList.toggle('is-back');
    phrase.hidden = showingBack;
    translation.hidden = !showingBack;
    if (side) side.textContent = showingBack ? 'Magyarul' : 'Türkçe';
    event.currentTarget.textContent = showingBack ? 'Fordítsd vissza ←' : 'Fordítsd meg →';
    event.currentTarget.setAttribute('aria-expanded', String(showingBack));
  });
  document.querySelector('[data-study-prev]')?.addEventListener('click', () => { studyIndex = (studyIndex - 1 + studyItems.length) % studyItems.length; renderStudyCard(); });
  document.querySelector('[data-study-next]')?.addEventListener('click', () => { studyIndex = (studyIndex + 1) % studyItems.length; renderStudyCard(); });
  document.querySelectorAll('[data-print-cards]').forEach((button) => button.addEventListener('click', async () => {
      document.body.classList.add('printing-pocket');
      const printDeck = buildPrintableDeck();
      const restore = () => {
        document.body.classList.remove('printing-pocket');
        printDeck.remove();
        window.removeEventListener('afterprint', restore);
      };
      window.addEventListener('afterprint', restore);
      await waitForPrintAssets(printDeck);
      window.print();
    }));

  renderLearningCollection();
  if (window.location.hash === '#sajat-szavaim') {
    requestAnimationFrame(() => document.querySelector('#sajat-szavaim')?.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
})();
