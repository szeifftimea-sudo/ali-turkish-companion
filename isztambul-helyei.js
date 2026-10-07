(() => {
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const layers = {
    first: {
      kicker: 'Amikor először nézel fel',
      title: 'A város nagy sziluettjei.',
      copy: 'Nem azért fontosak, mert egy listán elöl állnak. Hanem mert utánuk másképp nézed Isztambul vonalait.'
    },
    walk: {
      kicker: 'Amikor már nem az útikönyvet nézed',
      title: 'Itt kezdünk együtt sétálni.',
      copy: 'Piac, park, rakpart és régi utcák. Ezeken a helyeken nem egyetlen épületet keresünk, hanem a város hétköznapi ritmusát.'
    },
    afternoon: {
      kicker: 'Ha maradt még egy délutánunk',
      title: 'Térjünk le egy kicsit.',
      copy: 'Nem titkos címek, és nem kötelező kitérők. Olyan helyek, amelyekhez idő vagy egy külön hangulat kell.'
    }
  };

  const journeys = {
    sultanahmet: { order: 1, name: 'A csendes udvar', stops: 4, status: 'complete' },
    acrossWater: { order: 2, name: 'Át a vízen, le a partra', stops: 2, status: 'complete' },
    bazaarHarbor: { order: 3, name: 'A bazártól a kikötőig', stops: 3, status: 'complete' },
    oldGoldenHorn: { order: 4, name: 'Régi utcák az Aranyszarvnál', stops: 2, status: 'complete' },
    machinesView: { order: 5, name: 'Előbb a gépek, aztán a kilátás', stops: 2, status: 'complete' },
    towerPark: { order: 6, name: 'A toronytól a parkig', stops: 3, status: 'complete' },
    islandDay: { order: 7, name: 'Egy nap a szigeten', stops: 1, status: 'complete' }
  };

  const places = [
    {
      id: 'hagia', layer: 'first', journey: 'sultanahmet', journeyStep: 2, x: 54, y: 66, zone: 'Sultanahmet · történelmi félsziget',
      name: 'Hagia Szophia', turkish: 'Ayasofya', storyHref: '#chapter-hagia', storyCta: 'Megállunk a korszakok között',
      invitation: '„Ne döntsük el előre, melyik korszakát nézzük. Hadd meséljen ő.”',
      summary: 'Egy épület, amelyben több birodalom és többféle emlékezet találkozik.'
    },
    {
      id: 'blue', layer: 'first', journey: 'sultanahmet', journeyStep: 1, x: 51, y: 73, zone: 'Sultanahmet · történelmi félsziget',
      name: 'Kék Mecset', turkish: 'Sultanahmet Camii', pilot: true, storyHref: '#sultanahmet', storyCta: 'Megérkezünk a csendes udvarba',
      invitation: '„Előbb maradjunk egy percet az udvaron. A város belül is megvár.”',
      summary: 'Működő imahely, ezért nem látnivalóként, hanem vendégként érkezünk.'
    },
    {
      id: 'topkapi', layer: 'first', journey: 'sultanahmet', journeyStep: 3, x: 58, y: 60, zone: 'Sarayburnu · történelmi félsziget',
      name: 'Topkapı Palota', turkish: 'Topkapı Sarayı', storyHref: '#chapter-topkapi', storyCta: 'Belépünk az egymásba nyíló udvarokba',
      invitation: '„Ne egy palotára gondolj. Inkább egymás után kinyíló udvarokra.”',
      summary: 'A szultáni udvar világa nem egyetlen teremben, hanem rétegről rétegre bontakozik ki.'
    },
    {
      id: 'grand-bazaar', layer: 'first', journey: 'bazaarHarbor', journeyStep: 1, x: 43, y: 69, zone: 'Beyazıt · óváros',
      name: 'Nagy Bazár', turkish: 'Kapalıçarşı', storyHref: 'bazartol-kikotoig.html#bazaar', storyCta: 'Kijutunk a bazárból a vízig',
      invitation: '„Előbb csak figyeld, hogyan köszönnek. Az alku ráér.”',
      summary: 'Fedett utcák, műhelyek és boltok egész városa; itt a hangok is mutatják az irányt.'
    },
    {
      id: 'spice-bazaar', layer: 'first', journey: 'bazaarHarbor', journeyStep: 3, x: 46, y: 58, zone: 'Eminönü · Galata-híd',
      name: 'Fűszerbazár', turkish: 'Mısır Çarşısı', storyHref: 'bazartol-kikotoig.html#fuszerbazar', storyCta: 'Kérünk egy keveset',
      invitation: '„Hunyd be egy pillanatra a szemed. Ezt a helyet az illatáról is felismered.”',
      summary: 'Fűszerek, édességek és szárított gyümölcsök között az első kérdés gyakran magától megszületik.'
    },
    {
      id: 'dolmabahce', layer: 'first', journey: 'towerPark', journeyStep: 2, x: 59, y: 29, zone: 'Beşiktaş · Boszporusz-part',
      name: 'Dolmabahçe Palota', turkish: 'Dolmabahçe Sarayı',
      storyHref: 'toronytol-parkig.html#dolmabahce', storyCta: 'Leérkezünk Dolmabahçéhez',
      invitation: '„Nézd meg, milyen közel ér a palota a vízhez.”',
      summary: 'A Boszporusz partján álló palota egy másik korszak Isztambulját mutatja meg.'
    },
    {
      id: 'galata', layer: 'first', journey: 'towerPark', journeyStep: 1, x: 49, y: 44, zone: 'Galata · Beyoğlu',
      name: 'Galata-torony', turkish: 'Galata Kulesi',
      storyHref: 'toronytol-parkig.html#galata', storyCta: 'Fentről megkeressük a vizet',
      invitation: '„Ha felmegyünk, előbb keresd meg a vizet. Onnan áll össze a város.”',
      summary: 'A torony körüli utcák és a fentről kirajzolódó partvonal együtt adják meg a hely értelmét.'
    },
    {
      id: 'suleymaniye', layer: 'first', journey: 'bazaarHarbor', journeyStep: 2, x: 39, y: 55, zone: 'Süleymaniye · Aranyszarv-öböl',
      name: 'Süleymaniye Mecset', turkish: 'Süleymaniye Camii', storyHref: 'bazartol-kikotoig.html#suleymaniye', storyCta: 'Megállunk a kilátásnál',
      invitation: '„Itt a kilátás és a csend ugyanahhoz a történethez tartozik.”',
      summary: 'Magasabbról néz a városra, de nem akar fölé nőni; udvara és környéke is megállásra hív.'
    },
    {
      id: 'balat-fener', layer: 'walk', journey: 'oldGoldenHorn', journeyStep: 2, x: 32, y: 45, zone: 'Balat és Fener · Aranyszarv-öböl',
      name: 'Balat és Fener', turkish: 'Balat ve Fener', storyHref: 'regi-utcak.html#balat', storyCta: 'Besétálunk a lakott utcák közé',
      invitation: '„A színes házak mögött nézd meg azt is, ki ül a kapu előtt.”',
      summary: 'Meredek utcák, régi közösségek és hétköznapi élet: ez nem díszlet, hanem lakónegyed.'
    },
    {
      id: 'kadikoy-moda', layer: 'walk', journey: 'acrossWater', journeyStep: 2, x: 75, y: 69, zone: 'Ázsiai oldal · Kadıköy',
      name: 'Kadıköy és Moda', turkish: 'Kadıköy ve Moda', storyHref: 'kadikoy-moda.html#erkezes', storyCta: 'Legyen egy saját délutánunk',
      invitation: '„Vegyünk valamit a piacon, aztán vigyük le a partra.”',
      summary: 'Piaci nyüzsgésből tengerparti sétába forduló környék, ahol könnyű együtt maradni a várossal.'
    },
    {
      id: 'pierre-loti', layer: 'walk', journey: 'machinesView', journeyStep: 2, x: 18, y: 32, zone: 'Eyüp · Aranyszarv-öböl',
      name: 'Pierre Loti-domb', turkish: 'Pierre Loti Tepesi',
      storyHref: 'gepektol-kilatasig.html#pierre-loti', storyCta: 'Felmegyünk a kilátásig',
      invitation: '„Most ne menjünk tovább. Nézzük meg, merre kanyarodik az Aranyszarv.”',
      summary: 'Panoráma és pihenő egy sűrű nap közepén; a kilátás segít újra elhelyezni a várost.'
    },
    {
      id: 'yildiz', layer: 'walk', journey: 'towerPark', journeyStep: 3, x: 63, y: 20, zone: 'Beşiktaş · Yıldız',
      name: 'Yıldız Park', turkish: 'Yıldız Parkı',
      storyHref: 'toronytol-parkig.html#yildiz', storyCta: 'Megállunk a fák között',
      invitation: '„Ha elfáradtunk, itt nem kell programot keresni.”',
      summary: 'Zöld és csendesebb szünet a város belsejében, ahol a séta önmagában elég.'
    },
    {
      id: 'ferry', layer: 'walk', journey: 'acrossWater', journeyStep: 1, x: 67, y: 52, zone: 'Európa és Ázsia között',
      name: 'Boszporusz-komp', turkish: 'Boğaz vapuru', storyHref: 'kadikoy-moda.html#erkezes', storyCta: 'Átkelünk Kadıköybe',
      invitation: '„Ez nem kerülő. Isztambul egyik rendes utcája, csak vízből van.”',
      summary: 'A komp nem csupán panoráma: a város hétköznapi közlekedése és az egyik legjobb hely az irányok megértéséhez.'
    },
    {
      id: 'kariye', layer: 'afternoon', journey: 'oldGoldenHorn', journeyStep: 1, x: 27, y: 50, zone: 'Edirnekapı · Fatih',
      name: 'Kariye', turkish: 'Kariye Camii', storyHref: 'regi-utcak.html#kariye', storyCta: 'Belépünk a régi utcák történetébe',
      invitation: '„Ehhez a helyhez közel kell menni. A történet az apró részletekben maradt meg.”',
      summary: 'Bizánci mozaikjairól ismert történelmi épület, amely ma mecsetként működik; látogatás előtt ellenőrizzük a rendjét.'
    },
    {
      id: 'rahmi-koc', layer: 'afternoon', journey: 'machinesView', journeyStep: 1, x: 26, y: 38, zone: 'Hasköy · Aranyszarv-öböl',
      name: 'Rahmi M. Koç Múzeum', turkish: 'Rahmi M. Koç Müzesi',
      storyHref: 'gepektol-kilatasig.html#haskoy', storyCta: 'Megnézzük, mitől mozdul',
      invitation: '„Ha szereted tudni, hogyan mozdul meg valami, itt könnyű elveszni néhány órára.”',
      summary: 'Közlekedés, ipar és hétköznapi tárgyak története egy régi ipari környezetben.'
    },
    {
      id: 'binbirdirek', layer: 'afternoon', journey: 'sultanahmet', journeyStep: 4, x: 47, y: 76, zone: 'Sultanahmet · a felszín alatt',
      name: 'A föld alatti Isztambul', turkish: 'Binbirdirek Sarnıcı', storyHref: '#door-binbirdirek', storyCta: 'Lenézünk a város felszíne alá',
      invitation: '„Ha nyitva találjuk az ajtót, nézzük meg, mit őriz a város odalent.”',
      summary: 'A Binbirdirek-ciszterna és a kisebb föld alatti terek látogathatósága változhat, ezért ezt valódi felfedezésként kezeljük.'
    },
    {
      id: 'buyukada', layer: 'afternoon', journey: 'islandDay', journeyStep: 1, x: 87, y: 87, zone: 'Herceg-szigetek · Márvány-tenger',
      name: 'Büyükada', turkish: 'Büyükada',
      storyHref: 'egy-nap-a-szigeten.html#indulas', storyCta: 'Hagyunk időt az egész útra',
      invitation: '„Ehhez már egy egész fél napot adjunk. A hajóút is a történet része.”',
      summary: 'Szigeti ritmus, régi villák és hosszabb séta; nem két program közé szorított kitérő.'
    }
  ];

  const placeKnowledge = {
    hagia: {
      fact: 'A hatalmas kupola 537-ben készült el. A Hagia Szophia később templom, mecset, múzeum, majd ismét mecset lett — ezért több korszak jelei maradtak egymás mellett.',
      notice: 'Odabent ne csak a kupolát nézd: keresd meg, hol találkozik mozaik, márvány és kalligráfia.',
      word: 'kubbe', meaning: 'kupola'
    },
    blue: {
      fact: 'A „Kék Mecset” nevet nem a homlokzatáról kapta. A belső teret díszítő, főként kék árnyalatú izniki csempék tették ismertté.',
      notice: 'Ez ma is működő mecset. Az imaidő, a ruházat és a helyszíni rend mindig fontosabb a fényképnél.',
      word: 'çini', meaning: 'díszes kerámiacsempe'
    },
    topkapi: {
      fact: 'A Topkapı csaknem négy évszázadon át az oszmán udvar egyik központja volt. Nem egyetlen palotaépület, hanem kapuk, udvarok és pavilonok rendszere.',
      notice: 'Figyeld meg, hogyan lesz minden újabb udvar csendesebb és zártabb: az építészet mutatja, ki meddig juthatott.',
      word: 'avlu', meaning: 'udvar'
    },
    'grand-bazaar': {
      fact: 'A Kapalıçarşı neve szó szerint „fedett bazárt” jelent. Több tucat fedett utcája ma is üzletek és hagyományos mesterségek sűrű hálózata.',
      notice: 'Az utcanevek és a kapuk jó tájékozódási pontok. Alkudozás előtt köszönj, kérdezz, és csak utána beszéljetek az árról.',
      word: 'kapalı çarşı', meaning: 'fedett bazár'
    },
    'spice-bazaar': {
      fact: 'A 17. századi Fűszerbazár az Új Mecset épületegyütteséhez tartozott. Török neve, a Mısır Çarşısı szó szerint „Egyiptomi Bazár”.',
      notice: 'Ne csak a fűszereket keresd: aszalt gyümölcs, sajt, méz, tea és lokum is része az eminönüi ízeknek.',
      word: 'baharat', meaning: 'fűszer'
    },
    dolmabahce: {
      fact: 'A 19. századi Dolmabahçe már nem az udvarokra épülő Topkapı világa: európai palotaformákat fordít a Boszporusz felé. Atatürk 1938-ban itt halt meg.',
      notice: 'Keresd meg, hogyan ér össze a reprezentatív palota és a vízpart — a tengeri kapuk legalább olyan fontosak, mint a szárazföldiek.',
      word: 'saray', meaning: 'palota'
    },
    galata: {
      fact: 'A ma látható tornyot a genovaiak emelték a 14. században. Fentről egyszerre látható a Boszporusz, az Aranyszarv-öböl és a Márvány-tenger.',
      notice: 'Ezért mondja Ali, hogy előbb a vizet keresd: a három vízfelületből érthető meg, hol van a történelmi félsziget, Galata és az ázsiai part.',
      word: 'Haliç', meaning: 'Aranyszarv-öböl'
    },
    suleymaniye: {
      fact: 'Sinan építész a 16. században nemcsak mecsetet, hanem külliyét tervezett ide: iskolák, fürdő, konyha, gyógyító és vendéglátó terek kapcsolódtak hozzá.',
      notice: 'A teraszról nézd meg az Aranyszarv-öblöt, majd gondolj rá úgy, mint egy valaha egész városrészt szolgáló központra.',
      word: 'külliye', meaning: 'közösségi épületegyüttes egy mecset körül'
    },
    'balat-fener': {
      fact: 'Fener és Balat görög ortodox, zsidó és muszlim közösségek emlékeit őrző, ma is lakott városrészek. A színes homlokzat csak az első réteg.',
      notice: 'Nézd a kapukat, a lépcsőket, a boltokat és az iskolákat is — közben maradj tekintettel arra, hogy mások otthonában jársz.',
      word: 'mahalle', meaning: 'városnegyed, szomszédság'
    },
    'kadikoy-moda': {
      fact: 'Kadıköy piaca az ázsiai oldal egyik hétköznapi találkozóhelye; innen néhány utcával később már Moda tengerparti sétányán jársz.',
      notice: 'A çarşıban figyeld, mit vásárolnak a helyiek, a parton pedig hagyj időt arra, hogy ugyanazt a várost a másik oldaláról lásd.',
      word: 'çarşı', meaning: 'piacnegyed, üzletes városközpont'
    },
    'pierre-loti': {
      fact: 'A domb a francia író, Pierre Loti nevét viseli, aki gyakran időzött ezen a környéken. A kilátás az Aranyszarv teljes ívét mutatja.',
      notice: 'Fentről keresd meg Eyüp partját és a víz kanyarulatát: így a panoráma nem háttérkép, hanem térkép lesz.',
      word: 'tepe', meaning: 'domb'
    },
    yildiz: {
      fact: 'A Yıldız Park egykor a közeli szultáni palota külső kertjének része volt. A neve is megjegyezhető: a yıldız törökül csillagot jelent.',
      notice: 'Itt nem kell nevezetességet keresned. Figyeld meg, milyen gyorsan halkul el a város néhány kapuval beljebb.',
      word: 'yıldız', meaning: 'csillag'
    },
    ferry: {
      fact: 'Az isztambuli városi komp nem turistalátványosságnak született: a 19. század óta a mindennapi közlekedés része, és ma is partokat, kerületeket, kontinenseket köt össze.',
      notice: 'A fedélzetről figyeld, melyik oldalon marad Európa és hol közeledik Ázsia. A sirályok helyett most az irányokat tanuljuk meg.',
      word: 'vapur', meaning: 'városi komp'
    },
    kariye: {
      fact: 'A Kariye legemlékezetesebb részletei a 14. századi mozaikok és falképek. Ma mecsetként működő történelmi épület, ezért a látogatás rendje változhat.',
      notice: 'Közelről nézd: az apró arany mozaikkockákból csak néhány lépéssel hátrébb áll össze a teljes jelenet.',
      word: 'mozaik', meaning: 'mozaik'
    },
    'rahmi-koc': {
      fact: 'A közlekedési és ipartörténeti gyűjtemény egy régi horgonyöntödében és a történelmi Hasköy hajógyár területén kapott helyet.',
      notice: 'A tárgyak mellett az épületeket is nézd: itt maga a helyszín is elmeséli, hogyan dolgozott az Aranyszarv ipari partja.',
      word: 'tersane', meaning: 'hajógyár'
    },
    binbirdirek: {
      fact: 'A ciszterna oszloperdője egykor vizet tárolt a bizánci város számára. A török sarnıç szó föld alatti víztározót jelent.',
      notice: 'Odabent figyeld az oszlopok ritmusát és a hűvös levegőt — ezek emlékeztetnek rá, hogy a felszíni város alatt is működött egy infrastruktúra.',
      word: 'sarnıç', meaning: 'ciszterna, víztározó'
    },
    buyukada: {
      fact: 'Büyükada a Herceg-szigetek legnagyobb tagja; a neve is ezt mondja: büyük annyi, mint nagy, ada pedig sziget. A megérkezéshez a hajóút is hozzátartozik.',
      notice: 'A kikötőtől kifelé haladva figyeld a régi villákat és a lassabb közlekedést. Itt a távolságot ne programokban, hanem időben mérd.',
      word: 'ada', meaning: 'sziget'
    }
  };

  places.forEach((place) => Object.assign(place, placeKnowledge[place.id]));

  const pinsRoot = document.querySelector('#map-pins');
  const cardsRoot = document.querySelector('#place-grid');
  const tabs = [...document.querySelectorAll('[data-layer]')];
  const detail = document.querySelector('#map-detail');
  const journeyRoute = document.querySelector('[data-journey-route]');
  const layerDefaults = { first: 'blue', walk: 'ferry', afternoon: 'kariye' };
  let activeLayer = 'first';
  let activePlaceId = 'blue';
  let activeJourneyId = 'sultanahmet';

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  const visiblePlaces = () => places
    .filter((place) => place.layer === activeLayer)
    .sort((a, b) => {
      const journeyOrder = (journeys[a.journey]?.order || 99) - (journeys[b.journey]?.order || 99);
      return journeyOrder || (a.journeyStep || 99) - (b.journeyStep || 99);
    });

  const journeyPlaces = (journeyId) => places
    .filter((place) => place.journey === journeyId)
    .sort((a, b) => (a.journeyStep || 99) - (b.journeyStep || 99));

  const mapPlaces = () => {
    const ids = new Set([...visiblePlaces(), ...journeyPlaces(activeJourneyId)].map((place) => place.id));
    return places.filter((place) => ids.has(place.id));
  };

  const updateJourneyThread = (place) => {
    const journey = journeys[place?.journey];
    if (!journey || !place) return;
    activeJourneyId = place.journey;
    setText('[data-journey-number]', `Történet ${String(journey.order).padStart(2, '0')}`);
    setText('[data-journey-name]', journey.name);
    setText('[data-journey-count]', `${journey.stops} megálló · számok = sorrend`);
    const dots = document.querySelector('[data-journey-dots]');
    if (dots) dots.innerHTML = Array.from({ length: journey.stops }, (_, index) => `<i class="${index + 1 === place.journeyStep ? 'is-current' : ''}"></i>`).join('');
    const stops = journeyPlaces(place.journey);
    if (journeyRoute) journeyRoute.setAttribute('d', stops.length > 1
      ? stops.map((stop, index) => `${index ? 'L' : 'M'} ${stop.x * 10} ${stop.y * 6.2}`).join(' ')
      : '');
  };

  const updateDetail = (place) => {
    if (!place || !detail) return;
    const journey = journeys[place.journey];
    setText('[data-place-zone]', place.zone);
    setText('[data-place-name]', place.name);
    setText('[data-place-turkish]', place.turkish);
    setText('[data-place-journey]', journey
      ? `Történet ${String(journey.order).padStart(2, '0')} · ${journey.name} · ${place.journeyStep}/${journey.stops}. megálló`
      : 'Önálló meghívás');
    setText('[data-place-invitation]', place.invitation);
    setText('[data-place-summary]', place.summary);
    setText('[data-place-fact]', place.fact);
    setText('[data-place-notice]', place.notice);
    setText('[data-place-word]', place.word);
    setText('[data-place-meaning]', place.meaning);
    updateJourneyThread(place);
    const link = detail.querySelector('[data-place-cta]');
    if (link) {
      link.href = place.storyHref || `#place-${place.id}`;
      link.innerHTML = place.storyHref
        ? `${place.storyCta} <span aria-hidden="true">${place.storyHref.startsWith('#') ? '↓' : '→'}</span>`
        : 'Megnézem Ali meghívását <span aria-hidden="true">↓</span>';
    }
    const returnLink = document.querySelector('[data-return-to-selected-place]');
    if (returnLink) returnLink.href = `isztambul-helyei.html?place=${encodeURIComponent(place.id)}#varosterkep`;
  };

  const syncSelection = () => {
    const place = places.find((item) => item.id === activePlaceId) || visiblePlaces()[0];
    if (!place) return;
    activePlaceId = place.id;
    document.querySelectorAll('[data-place-id]').forEach((node) => {
      const selected = node.dataset.placeId === activePlaceId;
      if (node.classList.contains('map-pin')) {
        const nodePlace = places.find((item) => item.id === node.dataset.placeId);
        const sameJourney = nodePlace?.journey === place.journey;
        node.setAttribute('aria-pressed', String(selected));
        node.classList.toggle('is-journey-stop', sameJourney);
        node.classList.toggle('is-other-story', !sameJourney);
      }
      if (node.classList.contains('place-card')) node.setAttribute('aria-current', String(selected));
    });
    updateDetail(place);
  };

  const syncPlaceLocation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('place', activePlaceId);
    url.hash = 'varosterkep';
    window.history.replaceState(null, '', url);
  };

  const selectPlace = (placeId, { focusDetail = false, updateLocation = true } = {}) => {
    const place = places.find((item) => item.id === placeId);
    if (!place) return;
    activePlaceId = placeId;
    activeJourneyId = place.journey;
    renderPins();
    syncSelection();
    if (updateLocation) syncPlaceLocation();
    if (focusDetail && window.matchMedia('(max-width: 760px)').matches) {
      detail?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const renderPins = () => {
    if (!pinsRoot) return;
    pinsRoot.innerHTML = mapPlaces().map((place) => {
      const journey = journeys[place.journey];
      const sameJourney = place.journey === activeJourneyId;
      const marker = sameJourney ? String(place.journeyStep || '') : '';
      return `
      <button class="map-pin ${sameJourney ? 'is-journey-stop' : 'is-other-story'} ${place.layer !== activeLayer ? 'is-other-layer' : ''}" type="button" style="--x:${place.x};--y:${place.y}" data-place-id="${place.id}" aria-label="${place.name} · ${journey?.name || ''}" aria-pressed="false">
        <b aria-hidden="true">${marker}</b>
        <span>${place.name}</span>
      </button>`;
    }).join('');
    pinsRoot.querySelectorAll('.map-pin').forEach((pin) => {
      pin.addEventListener('click', () => {
        const place = places.find((item) => item.id === pin.dataset.placeId);
        if (!place) return;
        if (place.layer !== activeLayer) renderLayer(place.layer, { placeId: place.id });
        else selectPlace(place.id);
      });
    });
  };

  const renderCards = () => {
    if (!cardsRoot) return;
    cardsRoot.innerHTML = visiblePlaces().map((place) => {
      const journey = journeys[place.journey];
      const isStandaloneStory = Boolean(place.pilot || (place.storyHref && !place.storyHref.startsWith('#')));
      const storyStatus = isStandaloneStory ? 'Teljes helytörténet' : 'Megálló a közös történetben';
      return `
        <button class="place-card" id="place-card-${place.id}" type="button" data-place-id="${place.id}" aria-current="false">
          <span>${place.zone}</span>
          <h3>${place.name}</h3>
          <small lang="tr">${place.turkish}</small>
          ${journey ? `<b class="journey-label">Történet ${String(journey.order).padStart(2, '0')} · ${journey.name} · ${place.journeyStep}/${journey.stops}</b>` : ''}
          ${place.storyHref ? `<b class="story-status">${storyStatus}</b>` : ''}
          <p>${place.summary}</p>
          <span class="card-fact"><b>Ali mesél</b>${place.fact}</span>
          <span class="card-word"><b lang="tr">${place.word}</b><i>${place.meaning}</i></span>
          <span class="card-action">${place.storyCta || 'Megnézem Ali meghívását'} <i aria-hidden="true">→</i></span>
        </button>`;
    }).join('');
    cardsRoot.querySelectorAll('.place-card').forEach((card) => {
      card.addEventListener('click', () => {
        const place = places.find((item) => item.id === card.dataset.placeId);
        if (!place) return;
        selectPlace(place.id, { focusDetail: true });
        if (place.storyHref) window.location.href = place.storyHref;
        else document.querySelector('.map-board')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  };

  const renderLayer = (layerId, { placeId } = {}) => {
    activeLayer = layerId;
    activePlaceId = placeId || layerDefaults[layerId] || visiblePlaces()[0]?.id;
    activeJourneyId = places.find((place) => place.id === activePlaceId)?.journey || activeJourneyId;
    tabs.forEach((tab) => {
      const active = tab.dataset.layer === layerId;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    const copy = layers[layerId];
    setText('[data-layer-kicker]', copy.kicker);
    setText('[data-layer-title]', copy.title);
    setText('[data-layer-copy]', copy.copy);
    const relatedStops = mapPlaces().filter((place) => place.layer !== activeLayer).length;
    setText('[data-layer-count]', `${visiblePlaces().length} hely${relatedStops ? ` · +${relatedStops} kapcsolódó` : ''} · ${places.length} összesen`);
    renderPins();
    renderCards();
    syncSelection();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      renderLayer(tab.dataset.layer);
      syncPlaceLocation();
    });
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let target = index;
      if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      tabs[target].focus();
      renderLayer(tabs[target].dataset.layer);
      syncPlaceLocation();
    });
  });

  const requestedParams = new URLSearchParams(window.location.search);
  const requestedPlaceId = requestedParams.get('place') || (window.location.hash.startsWith('#place-') ? window.location.hash.replace('#place-', '') : '');
  const requestedPlace = places.find((place) => place.id === requestedPlaceId);
  renderLayer(requestedPlace?.layer || 'first', { placeId: requestedPlace?.id });
  if (requestedPlace) {
    activePlaceId = requestedPlace.id;
    syncSelection();
    window.setTimeout(() => document.querySelector('.map-board')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 80);
  }

  window.addEventListener('hashchange', () => {
    if (!window.location.hash.startsWith('#place-')) return;
    const placeId = window.location.hash.replace('#place-', '');
    const place = places.find((item) => item.id === placeId);
    if (!place) return;
    if (place.layer !== activeLayer) renderLayer(place.layer, { placeId: place.id });
    selectPlace(place.id, { focusDetail: true, updateLocation: false });
  });

  const phraseId = (phrase = '') => phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  const readPhrases = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(PHRASE_KEY) || '[]');
      return Array.isArray(stored) ? stored.filter((item) => item?.id && item?.phrase) : [];
    } catch { return []; }
  };
  const writePhrases = (items) => {
    try { localStorage.setItem(PHRASE_KEY, JSON.stringify(items)); } catch { /* Az oldal mentés nélkül is használható. */ }
  };
  const savedHere = (phrase) => {
    const item = readPhrases().find((entry) => entry.id === phraseId(phrase));
    return Boolean(item && ((item.sources || []).includes('isztambul-helyei') || item.source === 'isztambul-helyei'));
  };
  const syncSaveButton = (button) => {
    const saved = savedHere(button.dataset.phrase);
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? 'Ali zsebében' : 'Elteszem Ali zsebébe';
  };

  let toastTimer;
  const showToast = (message) => {
    let toast = document.querySelector('.places-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'places-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  };

  document.querySelectorAll('[data-save-place-phrase]').forEach((button) => {
    syncSaveButton(button);
    button.addEventListener('click', () => {
      const phrase = button.dataset.phrase?.trim();
      if (!phrase) return;
      const translation = button.dataset.translation?.trim() || '';
      const id = phraseId(phrase);
      const items = readPhrases();
      const current = items.find((item) => item.id === id) || { id, phrase, status: 'new', encounters: 0, contexts: [] };
      const ranks = { new: 0, used: 1, saved: 2, returned: 3, familiar: 4 };
      const updated = {
        ...current,
        id,
        phrase,
        translation,
        status: ranks[current.status] > ranks.saved ? current.status : 'saved',
        contexts: [...new Set([...(current.contexts || []), 'isztambul-helyei'])],
        sources: [...new Set([...(current.sources || []), 'isztambul-helyei'])],
        source: 'isztambul-helyei',
        sourceLabel: 'Sultanahmet',
        sourceHref: 'isztambul-helyei.html#sultanahmet-mondatok',
        encounters: Math.max(1, current.encounters || 0),
        lastSource: 'isztambul-helyei',
        updatedAt: new Date().toISOString()
      };
      writePhrases([...items.filter((item) => item.id !== id), updated]);
      syncSaveButton(button);
      showToast(`Ali eltette: ${phrase}`);
    });
  });

  const readJournalCount = () => {
    try {
      const journal = JSON.parse(localStorage.getItem('ali-travel-journal-v2') || '[]');
      return Array.isArray(journal) ? new Set(journal.filter((entry) => entry && Number.isInteger(entry.id)).map((entry) => entry.id)).size : 0;
    } catch { return 0; }
  };
  document.querySelectorAll('[data-pocket-count]').forEach((node) => { node.textContent = String(readJournalCount()); });

  const revealItems = [...document.querySelectorAll('.place-invitations > header, .sultanahmet-opening, .four-doors > header, .door-grid, .quiet-route > header, .quiet-route ol, .respect-phrases > header, .respect-grid, .live-info')];
  revealItems.forEach((item) => item.classList.add('reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .06 });
    revealItems.forEach((item) => observer.observe(item));
  }
})();
