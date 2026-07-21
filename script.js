const experience = document.querySelector('.experience');
const closeButton = document.querySelector('.close-button');
const backButton = document.querySelector('.adventure-back');
const stage = document.querySelector('#adventure-stage');
const title = document.querySelector('#experience-title');
const eyebrow = document.querySelector('#scene-eyebrow');
const lead = document.querySelector('#scene-lead');
const aliLine = document.querySelector('#ali-line');
const whisper = document.querySelector('#adventure-whisper');
const progress = document.querySelector('.progress');
const sceneImage = document.querySelector('.adventure-scene img');
const sceneTime = document.querySelector('#scene-time');
const sceneCaption = document.querySelector('#scene-caption');
const scenePostmarkTitle = document.querySelector('.adventure-postmark strong');
const scenePostmarkMeta = document.querySelector('.adventure-postmark small');
const adventureLabel = document.querySelector('.adventure-label');
const sceneFrame = document.querySelector('.adventure-scene');
const toast = document.querySelector('.toast');
const soundToggle = document.querySelector('.sound-toggle');
const journal = document.querySelector('.travel-journal');
const journalToggle = document.querySelector('.journal-toggle');
const journalClose = document.querySelector('.journal-close');
const journalEntries = document.querySelector('.journal-entries');
const familiarityList = document.querySelector('.familiarity-list');
const journalCount = document.querySelector('[data-journal-count]');
const journeyTicketCount = document.querySelector('.journey-ticket b');
const memoryList = document.querySelector('.memory-list');
const forgetAllButton = document.querySelector('.forget-all');
let lastFocused = null;
let journalLastFocused = null;
let journalOpenedExperience = false;
let audioContext = null;
let ambienceTimer = null;

const initialState = () => ({ index: 0, name: '', city: 'Budapest', nationality: 'hungarian', discoveredPocket: [], adaptiveReturns: {}, adaptiveHints: {}, adaptiveRouteSelections: {}, rhythmCaptured: {}, arrival: '', greeting: '', heardGreeting: false, question: '', savedCulture: false, seat: '', tea: '', heardTea: false, sugar: '', wellbeing: '', savedTeaCulture: false, ferryRoute: '', ferryPlace: '', observed: '', aliFeature: '', company: '', personality: '', savedFerryCulture: false, bazaarItem: '', bazaarColor: '', bazaarSize: '', tryOn: '', priceReaction: '', bargain: '', purchase: '', savedBazaarCulture: false, parkPace: '', parkFeeling: '', bodyPart: '', needsWater: '', parkPlan: '', savedParkCulture: false, tramChoice: '', ticketChoice: '', tramSeat: '', tramApology: '', tramNotice: '', tramStop: '', savedTramCulture: false, uskudarSpot: '', sunsetView: '', sunsetCompany: '', sunsetSibling: '', sunsetFamilyWord: '', sunsetMemory: '', sunsetStay: '', savedSunsetCulture: false, bakerySmell: '', bakeryOrder: '', bakeryDrink: '', simitTaste: '', kitchenAction: '', breakfastCompany: '', savedSimitCulture: false, mosquePace: '', mosqueDirection: '', mosqueShoes: '', mosquePermission: '', mosqueDetail: '', mosqueQuiet: '', mosqueThanks: '', savedMosqueCulture: false, waterfrontWeather: '', waterfrontFruit: '', fruitAmount: '', waterfrontPrice: '', waterfrontPlan: '', favoritePhrase: '', cityFeeling: '', aliFarewell: '', savedWaterfrontCulture: false });
let adventure = initialState();
const adventureKnowledge = window.ALI_ADVENTURE_KNOWLEDGE || {};

const nationalityOptions = {
  hungarian: { tr: 'Macarım.', hu: 'Magyar vagyok.' },
  turkish: { tr: 'Türküm.', hu: 'Török vagyok.' },
  german: { tr: 'Almanım.', hu: 'Német vagyok.' },
  austrian: { tr: 'Avusturyalıyım.', hu: 'Osztrák vagyok.' },
  romanian: { tr: 'Rumenim.', hu: 'Román vagyok.' },
  slovak: { tr: 'Slovakım.', hu: 'Szlovák vagyok.' },
  croatian: { tr: 'Hırvatım.', hu: 'Horvát vagyok.' },
  slovenian: { tr: 'Slovenim.', hu: 'Szlovén vagyok.' },
  serbian: { tr: 'Sırbım.', hu: 'Szerb vagyok.' },
  ukrainian: { tr: 'Ukraynalıyım.', hu: 'Ukrán vagyok.' },
  polish: { tr: 'Polonyalıyım.', hu: 'Lengyel vagyok.' },
  czech: { tr: 'Çekim.', hu: 'Cseh vagyok.' },
  bulgarian: { tr: 'Bulgarım.', hu: 'Bolgár vagyok.' },
  greek: { tr: 'Yunanım.', hu: 'Görög vagyok.' },
  italian: { tr: 'İtalyanım.', hu: 'Olasz vagyok.' },
  french: { tr: 'Fransızım.', hu: 'Francia vagyok.' },
  spanish: { tr: 'İspanyolum.', hu: 'Spanyol vagyok.' },
  portuguese: { tr: 'Portekizliyim.', hu: 'Portugál vagyok.' },
  dutch: { tr: 'Hollandalıyım.', hu: 'Holland vagyok.' },
  belgian: { tr: 'Belçikalıyım.', hu: 'Belga vagyok.' },
  swiss: { tr: 'İsviçreliyim.', hu: 'Svájci vagyok.' },
  british: { tr: 'İngilizim.', hu: 'Brit vagyok.' },
  irish: { tr: 'İrlandalıyım.', hu: 'Ír vagyok.' },
  swedish: { tr: 'İsveçliyim.', hu: 'Svéd vagyok.' },
  norwegian: { tr: 'Norveçliyim.', hu: 'Norvég vagyok.' },
  danish: { tr: 'Danimarkalıyım.', hu: 'Dán vagyok.' },
  finnish: { tr: 'Finlandiyalıyım.', hu: 'Finn vagyok.' },
  icelandic: { tr: 'İzlandalıyım.', hu: 'Izlandi vagyok.' },
  lithuanian: { tr: 'Litvanyalıyım.', hu: 'Litván vagyok.' },
  latvian: { tr: 'Letonyalıyım.', hu: 'Lett vagyok.' },
  estonian: { tr: 'Estonyalıyım.', hu: 'Észt vagyok.' },
  russian: { tr: 'Rusum.', hu: 'Orosz vagyok.' },
  bosnian: { tr: 'Bosnalıyım.', hu: 'Bosnyák vagyok.' },
  albanian: { tr: 'Arnavutum.', hu: 'Albán vagyok.' },
  macedonian: { tr: 'Kuzey Makedonyalıyım.', hu: 'Észak-macedón vagyok.' },
  american: { tr: 'Amerikalıyım.', hu: 'Amerikai vagyok.' },
  canadian: { tr: 'Kanadalıyım.', hu: 'Kanadai vagyok.' },
  mexican: { tr: 'Meksikalıyım.', hu: 'Mexikói vagyok.' },
  brazilian: { tr: 'Brezilyalıyım.', hu: 'Brazil vagyok.' },
  argentinian: { tr: 'Arjantinliyim.', hu: 'Argentin vagyok.' },
  australian: { tr: 'Avustralyalıyım.', hu: 'Ausztrál vagyok.' },
  new_zealander: { tr: 'Yeni Zelandalıyım.', hu: 'Új-zélandi vagyok.' },
  chinese: { tr: 'Çinliyim.', hu: 'Kínai vagyok.' },
  japanese: { tr: 'Japonum.', hu: 'Japán vagyok.' },
  korean: { tr: 'Güney Koreliyim.', hu: 'Dél-koreai vagyok.' },
  indian: { tr: 'Hintliyim.', hu: 'Indiai vagyok.' },
  pakistani: { tr: 'Pakistanlıyım.', hu: 'Pakisztáni vagyok.' },
  iranian: { tr: 'İranlıyım.', hu: 'Iráni vagyok.' },
  iraqi: { tr: 'Iraklıyım.', hu: 'Iraki vagyok.' },
  syrian: { tr: 'Suriyeliyim.', hu: 'Szíriai vagyok.' },
  israeli: { tr: 'İsrailliyim.', hu: 'Izraeli vagyok.' },
  egyptian: { tr: 'Mısırlıyım.', hu: 'Egyiptomi vagyok.' },
  moroccan: { tr: 'Faslıyım.', hu: 'Marokkói vagyok.' },
  tunisian: { tr: 'Tunusluyum.', hu: 'Tunéziai vagyok.' },
  georgian: { tr: 'Gürcüyüm.', hu: 'Grúz vagyok.' },
  armenian: { tr: 'Ermeniyim.', hu: 'Örmény vagyok.' },
  azerbaijani: { tr: 'Azerbaycanlıyım.', hu: 'Azerbajdzsáni vagyok.' }
};
const nationalityCopy = () => nationalityOptions[adventure.nationality] || nationalityOptions.hungarian;
const nationalitySelectOptions = () => Object.entries(nationalityOptions)
  .sort(([keyA, copyA], [keyB, copyB]) => keyA === 'hungarian' ? -1 : keyB === 'hungarian' ? 1 : copyA.hu.localeCompare(copyB.hu, 'hu'))
  .map(([value, copy]) => `<option value="${value}" ${adventure.nationality === value ? 'selected' : ''}>${copy.hu.replace(' vagyok.', '')}</option>`)
  .join('');

const galataScenes = [
  {
    eyebrow: 'Galata híd · Első pillanat', title: 'Odaállhatok melléd?',
    lead: 'A város még csak ébredezik. A víz felől sirályok hallatszanak.',
    ali: () => adventure.arrival === 'look' ? 'Persze. Megvárlak. A város nem megy sehová.' : 'Merhaba. Itt jó a kilátás. Gyere, elférünk.',
    whisper: () => adventure.arrival === 'look' ? 'Ali is a víz felé fordul. Egy pillanatig egyikőtök sem beszél.' : 'Nem kell sietnünk.',
    body: () => adventure.arrival === 'look'
      ? `<div class="adventure-actions"><button class="primary-button" data-arrival="join">Most odaállhatsz <span>→</span></button></div>`
      : `<div class="adventure-actions"><button class="primary-button" data-arrival="join">Gyere <span>→</span></button><button class="quiet-choice" data-arrival="look">Előbb csak körülnézek</button></div>`
  },
  {
    eyebrow: 'Egy szó a hídon', title: 'Az első szó már megérkezett.',
    lead: 'A merhaba lehet köszönés, találkozás és egy apró nyitott ajtó.',
    ali: () => adventure.heardGreeting ? 'Pont így. Hallgasd meg akár még egyszer — itt megvárjuk egymást.' : 'Nem kell szépen mondanod. Csak úgy, ahogy most esik jól.',
    whisper: () => adventure.heardGreeting ? 'Ha készen állsz, válaszolhatsz szóval vagy egy mozdulattal.' : 'A csendes integetés is válasz.',
    body: () => `<div class="phrase-card"><span class="phrase-label">Hallgasd meg</span><strong>Merhaba.</strong><span class="pronunciation">mer-há-bá</span><button class="listen-button" data-speak="Merhaba" type="button">▶ Meghallgatom</button></div><div class="choice-row"><button data-greeting="word">Merhaba</button><button data-greeting="wave">Integetek</button><button data-greeting="listen">${adventure.heardGreeting ? 'Még egyszer meghallgatom' : 'Előbb csak meghallgatom'}</button></div>`
  },
  {
    eyebrow: 'Ketten a Boszporusz mellett', title: 'Én Ali vagyok.',
    lead: 'Ali nem bemutatkozik, csak odateszi a nevét a közös pillanat mellé.',
    ali: () => ({ word: 'Szép volt. Merhaba! Én pedig Ali vagyok.', wave: 'Ali visszainteget. Egy mosoly néha minden nyelven ugyanaz. Én Ali vagyok.', listen: 'Van időnk. Amikor készen állsz, a szó is megérkezik. Én Ali vagyok.' })[adventure.greeting] || 'Ben Ali. Benim adım Ali. De az Ali bőven elég.',
    whisper: () => adventure.greeting === 'wave' ? 'Az első találkozásotok egy integetéssel kezdődött.' : 'Egy névvel már kevésbé idegen a város.',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali így mondja</span><strong>Ben Ali.</strong><span>Én Ali vagyok.</span><button class="listen-button" data-speak="Ben Ali. Benim adım Ali." type="button">▶ Ali hangja</button></div><button class="primary-button full" data-next>Örülök, Ali <span>→</span></button>`
  },
  {
    eyebrow: 'Most te jössz — ha szeretnéd', title: 'Hogy szólíthatlak?',
    lead: 'A neved nem feladat. Csak jó tudni, kivel sétálok.',
    ali: 'Sana nasıl hitap edeyim?', whisper: 'Ezt később bármikor megváltoztathatod.',
    body: () => `<form class="guest-form" data-name-form><label for="guest-name">A neved</label><input id="guest-name" name="name" maxlength="32" autocomplete="given-name" placeholder="Írd ide, ha szeretnéd" value="${escapeHtml(adventure.name)}"><button class="primary-button" type="submit">Így hívnak <span>→</span></button><button class="text-button" data-skip-name type="button">Most még maradok vendég</button></form>`
  },
  {
    eyebrow: 'Egy kicsit közelebb', title: `${adventure.name ? adventure.name + ', m' : 'M'}elyik országból érkeztél?`,
    lead: 'Ali nem találja ki helyetted. A választásodból rögtön egy használható török mondat lesz.',
    ali: 'Én isztambuli vagyok. Te hogyan mutatkoznál be?', whisper: 'Csak azt kérdezzük meg, amit rögtön használni is fogsz.',
    body: () => `<form class="guest-form" data-origin-form><label for="guest-nationality">A nemzetiséged</label><select id="guest-nationality" name="nationality">${nationalitySelectOptions()}</select><div class="phrase-card compact"><span class="phrase-label">A te mondatod</span><strong>${nationalityCopy().tr}</strong><span>${nationalityCopy().hu}</span></div><button class="primary-button full" type="submit">Ezt viszem magammal <span>→</span></button></form>`
  },
  {
    eyebrow: 'A halászok mellett', title: 'Kolay gelsin.',
    lead: 'Ezt annak mondják, aki dolgozik: menjen könnyen a munka. Nem tankönyvi mondat — figyelmesség.',
    ali: 'Apám szerint ettől még a nehéz háló is egy kicsit könnyebb.', whisper: adventure.savedCulture ? 'Eltettem az útinaplódba.' : 'Nem kell megtanulnod. Elég, ha felismered.',
    body: () => `<div class="culture-card"><span class="culture-mark">✦</span><div><strong>Kolay gelsin.</strong><p>Könnyű munkát — menjen könnyen.</p></div><button class="listen-button" data-speak="Kolay gelsin" type="button">▶</button></div><div class="adventure-actions"><button class="primary-button" data-next>Sétáljunk tovább</button><button class="quiet-choice" data-save>${adventure.savedCulture ? '✓ Az útinaplóban' : 'Elteszem későbbre'}</button></div>`
  },
  {
    eyebrow: 'Most te kérdezhetsz', title: 'Mit szeretnél tudni rólam?',
    lead: 'A beszélgetés nem vizsga. Egyetlen kíváncsi mondat is elég.',
    ali: adventure.question ? answerFor(adventure.question) : 'Kérdezz nyugodtan. A sirályokról is lehet, bár ők szeretnek túlozni.', whisper: adventure.question ? 'Ali elmosolyodik. Most már valóban beszélgettek.' : 'A nézelődés is teljes értékű választás.',
    body: () => `<div class="question-list"><div class="question-choice"><button data-question="name"><strong>Senin adın ne?</strong><small>Mi a neved?</small></button><button class="phrase-audio" data-speak="Senin adın ne?" type="button" aria-label="Senin adın ne meghallgatása">▶</button></div><div class="question-choice"><button data-question="well"><strong>Nasılsın?</strong><small>Hogy vagy?</small></button><button class="phrase-audio" data-speak="Nasılsın?" type="button" aria-label="Nasılsın meghallgatása">▶</button></div><div class="question-choice"><button data-question="from"><strong>Nerelisin?</strong><small>Honnan származol?</small></button><button class="phrase-audio" data-speak="Nerelisin?" type="button" aria-label="Nerelisin meghallgatása">▶</button></div><div class="question-choice"><button data-question="quiet"><strong>Most inkább nézelődnék.</strong><small>Ali is a víz felé fordul.</small></button></div></div>${adventure.question ? '<button class="primary-button full" data-next>Menjünk tovább <span>→</span></button>' : ''}`
  },
  {
    eyebrow: 'Az első bemutatkozásod', title: 'Ennyi már elég egy találkozáshoz.',
    lead: 'Nem kell kívülről tudnod. Ez most csak a te kis isztambuli névjegyed.',
    ali: `${adventure.name || 'Vendégem'}, ezt már bárhol örömmel fogadják.`, whisper: 'Nem a tökéletesség számít. Hanem hogy megszólaltál.',
    body: () => `<div class="intro-card"><span>Az én mondataim</span><button class="phrase-audio intro-audio" data-speak="Merhaba. ${adventure.name ? `Benim adım ${escapeHtml(adventure.name)}.` : ''} ${nationalityCopy().tr}" type="button" aria-label="A bemutatkozás meghallgatása">▶</button><strong>Merhaba. ${adventure.name ? `Benim adım ${escapeHtml(adventure.name)}.` : ''}</strong><strong>${nationalityCopy().tr}</strong><small>${nationalityCopy().hu}</small></div><div class="adventure-actions intro-actions"><button class="primary-button" data-next>Ezt már én mondom <span>→</span></button></div>`
  },
  {
    eyebrow: 'Útinapló · 01', title: 'Megérkeztél.',
    lead: 'Nem teljesítettél egy leckét. Volt egy reggeled a Galata hídon.',
    ali: 'Karaköyben ismerek egy helyet. A teát nem ígérem, hogy én fizetem — de helyet találok.', whisper: 'A város mostantól egy kicsit ismerős.',
    body: () => `<div class="journal-card"><span>Galata · 07:12</span><strong>${escapeHtml(adventure.name || 'Egy kíváncsi vendég')} első isztambuli reggele</strong><p>Merhaba. ${adventure.name ? `Benim adım ${escapeHtml(adventure.name)}.` : ''}<br>${nationalityCopy().tr}</p><button class="phrase-audio journal-audio" data-speak="Merhaba. ${adventure.name ? `Benim adım ${escapeHtml(adventure.name)}.` : ''} ${nationalityCopy().tr}" type="button" aria-label="A teljes bemutatkozás meghallgatása">▶ Hallgasd meg</button><small>${adventure.savedCulture ? 'Útközben eltettem: Kolay gelsin.' : 'Útközben megtaláltam az első török mondataimat.'}</small></div><button class="primary-button full" data-next>Tedd el az útinaplóba <span>→</span></button><button class="text-button" data-restart>Újra átélem ezt a reggelt</button>`
  },
  {
    eyebrow: 'Galata → Karaköy', title: 'Most, hogy már ismerjük egymást…',
    lead: 'A híd túloldalán már ébredezik Karaköy. Poharak csörrennek, és valaki éppen friss teát visz az asztalokhoz.',
    ali: 'Kérsz egy teát? Ismerek egy helyet. Nem sietnek velünk.', whisper: 'A következő kaland ott kezdődik, ahol egy hely felszabadul mellettetek.',
    image: 'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time: '08:20', caption: 'Karaköyben már forró a tea.', postmark: 'Karaköy', postmarkMeta: '08:20 · Bir çay?',
    body: () => `<div class="handoff-card"><span>Következő állomás · 02</span><strong>Reggel Karaköyben</strong><p>Rendelés, udvariasság és az első rövid beszélgetés egy pohár tea mellett.</p><em>Bir çay, lütfen.</em></div><button class="primary-button full" data-finish>Kezdjük egy teával <span>→</span></button>`
  }
];

const karakoyScenes = [
  {
    eyebrow: 'Karaköy · 08:20', title: 'Hová üljünk?',
    lead: 'A teázó még csendes. Az ablaknál fény van, a pultnál pedig hallani, hogyan készül a tea.',
    ali: () => adventure.seat === 'window' ? 'Jó választás. Innen a város is velünk reggelizik.' : adventure.seat === 'counter' ? 'Innen mindent látunk. Még azt is, hány cukrot tesznek mások a teába.' : 'Válassz te. A jó vendéglátó nem a saját kedvenc helyét erőlteti.',
    whisper: 'Most már nem csak követed Alit: együtt alakítjátok a reggelt.',
    body: () => adventure.seat ? `<button class="primary-button full" data-next>Üljünk le <span>→</span></button>` : `<div class="choice-row"><button data-seat="window">Az ablakhoz</button><button data-seat="counter">A pulthoz közel</button></div>`
  },
  {
    eyebrow: 'Egy pohár tea', title: 'Ez itt egyszerűen: çay.',
    lead: 'A keskeny derekú pohárban a tea színe is része a pillanatnak.',
    ali: 'Nem kell még kérned. Előbb nézd meg, hogyan érkezik az asztalhoz.', whisper: 'çay · tea',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Çay.</strong><span class="pronunciation">csáj · tea</span><button class="listen-button" data-speak="Çay" type="button">▶ Meghallgatom</button></div><button class="primary-button full" data-next>Most már kérnék egyet <span>→</span></button>`
  },
  {
    eyebrow: 'A rendelés', title: 'Egy tea. Semmi több.',
    lead: 'Egyetlen mondat elég ahhoz, hogy a reggel valóban elkezdődjön.',
    ali: () => adventure.tea === 'say' ? 'Hallottad? Már készítik is.' : adventure.tea === 'gesture' ? 'A pincér megértette. A mondatot majd akkor mondod, amikor szeretnéd.' : adventure.heardTea ? 'Most már ismerősen hangzik. Választhatsz: kimondod, vagy csak mutatsz a pohárra.' : 'Hallgasd meg. Utána te döntöd el, hogyan kérsz.',
    whisper: 'Bir çay, lütfen. · Egy teát, kérek.',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Bir çay, lütfen.</strong><span class="pronunciation">bir csáj, lütfen · Egy teát, kérek.</span><button class="listen-button" data-speak="Bir çay, lütfen" type="button">▶ Meghallgatom</button></div>${adventure.tea ? '<button class="primary-button full" data-next>A tea úton van <span>→</span></button>' : `<div class="choice-row"><button data-tea="say">Kimondom</button><button data-tea="gesture">Mutatok a pohárra</button><button data-hear-tea>${adventure.heardTea ? 'Még egyszer meghallgatom' : 'Előbb meghallgatom'}</button></div>`}`
  },
  {
    eyebrow: 'Egy apró kérdés', title: 'Şekerli mi?',
    lead: 'A pincér azt kérdezi: cukorral kéred?',
    ali: () => adventure.sugar === 'yes' ? 'Şekerli. Cukorral. Már tudják is.' : adventure.sugar === 'no' ? 'Şekersiz. Cukor nélkül — ahogy szereted.' : 'Az „evet” igen, a „hayır” nem. De egy mosoly is segít.',
    whisper: 'A válaszod most tényleg megváltoztatja, mi kerül az asztalra.',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali kis szótára</span><strong>Şekerli mi?</strong><span class="pronunciation">sekerli mi · Cukorral kéred?</span><button class="listen-button" data-speak="Şekerli mi?" type="button">▶ Meghallgatom</button></div>${adventure.sugar ? `<div class="selected-answer"><strong>${adventure.sugar === 'yes' ? 'Evet, şekerli.' : 'Hayır, şekersiz.'}</strong><span>${adventure.sugar === 'yes' ? 'Igen, cukorral.' : 'Nem, cukor nélkül.'}</span><button class="phrase-audio" data-speak="${adventure.sugar === 'yes' ? 'Evet, şekerli.' : 'Hayır, şekersiz.'}" type="button" aria-label="A válasz meghallgatása">▶</button></div><button class="primary-button full" data-next>Jöhet a tea <span>→</span></button>` : `<div class="choice-row"><button data-sugar="yes"><strong>Evet, şekerli.</strong><small>Igen, cukorral.</small></button><button data-sugar="no"><strong>Hayır, şekersiz.</strong><small>Nem, cukor nélkül.</small></button></div>`}`
  },
  {
    eyebrow: 'Tea mellett könnyebb', title: 'Nasılsın?',
    lead: 'Ali nem tesztel. Tényleg arra kíváncsi, hogyan vagy ezen a reggelen.',
    ali: () => ({ good: 'Örülök. İyiyim — én is jól vagyok.', okay: 'Fena değil. Néha ennyi a legőszintébb válasz.', quiet: 'Rendben. Igyunk előbb egy kortyot.' })[adventure.wellbeing] || 'Válaszolhatsz röviden. Vagy csak emeld fel a poharad.',
    whisper: 'A török „hogy vagy?” a köszönés természetes része.',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali kis szótára</span><strong>Nasılsın?</strong><span class="pronunciation">naszilszin · Hogy vagy?</span><button class="listen-button" data-speak="Nasılsın?" type="button">▶ Meghallgatom</button></div>${adventure.wellbeing ? `<div class="selected-answer"><strong>${adventure.wellbeing === 'good' ? 'İyiyim.' : adventure.wellbeing === 'okay' ? 'Fena değilim.' : 'Most csak kortyolok.'}</strong><span>${adventure.wellbeing === 'good' ? 'Jól vagyok.' : adventure.wellbeing === 'okay' ? 'Megvagyok.' : 'A csend is válasz.'}</span>${adventure.wellbeing !== 'quiet' ? `<button class="phrase-audio" data-speak="${adventure.wellbeing === 'good' ? 'İyiyim.' : 'Fena değilim.'}" type="button" aria-label="A válasz meghallgatása">▶</button>` : ''}</div><button class="primary-button full" data-next>Kortyoljunk egyet <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-wellbeing="good"><strong>İyiyim.</strong><small>Jól vagyok.</small></button></div><div class="question-choice"><button data-wellbeing="okay"><strong>Fena değilim.</strong><small>Megvagyok.</small></button></div><div class="question-choice"><button data-wellbeing="quiet"><strong>Most csak kortyolok.</strong><small>Ali megérti.</small></button></div></div>`}`
  },
  {
    eyebrow: 'Amikor megérkezik', title: 'Teşekkür ederim.',
    lead: 'A köszönet nem külön feladat. Akkor jelenik meg, amikor valaki leteszi eléd a teát.',
    ali: 'Ezt már sokszor fogod hallani. És hamarabb rád ragad, mint gondolnád.', whisper: 'Teşekkür ederim. · Köszönöm.',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali kis szótára</span><strong>Teşekkür ederim.</strong><span class="pronunciation">te-sek-kür e-de-rim · Köszönöm.</span><button class="listen-button" data-speak="Teşekkür ederim" type="button">▶ Meghallgatom</button></div><button class="primary-button full" data-next>Megköszönöm <span>→</span></button>`
  },
  {
    eyebrow: 'Ali mutat valamit', title: 'Miért ilyen a pohár?',
    lead: 'Az ince belli pohár keskeny közepe segít kézben tartani, látni a tea színét — és lassabban inni.',
    ali: 'Szerintem azért ilyen, hogy legyen időnk beszélgetni. De ezt ne idézd egy történésznek.',
    whisper: () => adventure.savedTeaCulture ? 'Az ince belli pohár bekerült az útinaplódba.' : 'Nem kvízkérdés. Egy apró részlet, amit később felismersz.',
    body: () => `<div class="culture-card"><span class="culture-mark">◒</span><div><span class="phrase-label">Ali kis szótára</span><strong>ince belli çay bardağı</strong><p>Keskeny derekú török teáspohár.</p></div><button class="phrase-audio" data-speak="İnce belli çay bardağı" type="button" aria-label="A kifejezés meghallgatása">▶</button></div><div class="adventure-actions"><button class="primary-button" data-next>Igyunk tovább</button><button class="quiet-choice" data-save-tea>${adventure.savedTeaCulture ? '✓ Az útinaplóban' : 'Ezt elteszem'}</button></div>`
  },
  {
    eyebrow: 'Az első rövid beszélgetés', title: 'Már összeáll egy pillanat.',
    lead: 'Nem bemagolt párbeszéd. Csak azok a mondatok, amelyekre valóban szükséged volt.',
    ali: 'Én kérdezek, te pedig úgy válaszolsz, ahogy most jól esik.', whisper: () => adventure.wellbeing === 'quiet' ? 'Bir çay, lütfen → egy csendes korty → Teşekkür ederim' : `Bir çay, lütfen → ${adventure.wellbeing === 'okay' ? 'Fena değilim' : 'İyiyim'} → Teşekkür ederim`,
    body: () => `<div class="intro-card"><span>A reggeled mondatai</span><button class="phrase-audio intro-audio" data-speak="Bir çay, lütfen. ${adventure.wellbeing === 'okay' ? 'Fena değilim.' : adventure.wellbeing === 'good' ? 'İyiyim.' : ''} Teşekkür ederim." type="button" aria-label="A mondatok meghallgatása">▶</button><strong>Bir çay, lütfen.</strong><small>Egy teát, kérek.</small>${adventure.wellbeing === 'quiet' ? '<strong>Most csak kortyolok.</strong><small>A csend is válasz volt.</small>' : `<strong>${adventure.wellbeing === 'okay' ? 'Fena değilim.' : 'İyiyim.'}</strong><small>${adventure.wellbeing === 'okay' ? 'Megvagyok.' : 'Jól vagyok.'}</small>`}<strong>Teşekkür ederim.</strong><small>Köszönöm.</small></div><button class="primary-button full" data-next>Próbáljuk meg együtt <span>→</span></button>`
  },
  {
    eyebrow: 'Te következel', title: 'Kérj egy teát Alitól.',
    lead: 'A hangot bármikor meghallgathatod. Amikor készen állsz, a mondat a tiéd.',
    ali: 'Én most kivételesen pincér leszek. Elég rossz pincér — de figyelmes.', whisper: 'Nem a kiejtést mérjük. A megszólalás pillanatát őrizzük meg.',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Bir çay, lütfen.</strong><span class="pronunciation">Egy teát, kérek.</span><button class="listen-button" data-speak="Bir çay, lütfen" type="button">▶ Meghallgatom</button></div><button class="primary-button full" data-next>Ezt már én kérem <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 02', title: 'Volt egy reggeled Karaköyben.',
    lead: 'Kértél egy teát, válaszoltál Alinak, és megköszönted, amikor megérkezett.',
    ali: 'A komp hamarosan indul. De a teát azért idd meg — Isztambul megvár.', whisper: 'Következő állomás: Bosphorus Ferry · 11:05',
    body: () => `<div class="journal-card"><span>Karaköy · 08:20</span><strong>${escapeHtml(adventure.name || 'A vendég')} teája</strong><p>Bir çay, lütfen.${adventure.wellbeing === 'quiet' ? '' : `<br>${adventure.wellbeing === 'okay' ? 'Fena değilim.' : 'İyiyim.'}`}<br>Teşekkür ederim.</p><button class="phrase-audio journal-audio" data-speak="Bir çay, lütfen. ${adventure.wellbeing === 'okay' ? 'Fena değilim.' : adventure.wellbeing === 'good' ? 'İyiyim.' : ''} Teşekkür ederim." type="button" aria-label="A karaköyi mondatok meghallgatása">▶ Hallgasd meg</button><small>${adventure.savedTeaCulture ? 'Emlék: ince belli çay bardağı' : adventure.wellbeing === 'quiet' ? 'Emlék: egy csendes korty tea' : 'Emlék: egy reggeli tea Alival'}</small></div><button class="primary-button full" data-start-ferry>Elérjük a kompot? <span>→</span></button>`
  }
];

const ferryScenes = [
  {
    eyebrow: 'Bosphorus Ferry · 11:05', title: 'Fent vagy bent?',
    lead: 'A komp kürtje megszólal. Fent erősebb a szél, bent az ablak mellett csendesebb.',
    ali: () => adventure.ferryPlace === 'deck' ? 'Akkor kapaszkodj. A hajad hamarabb ér Üsküdarba, mint mi.' : adventure.ferryPlace === 'inside' ? 'Jó. Innen az egész város elúszik előttünk, de a tea nem borul ki.' : 'Most te választasz helyet. Én mindkettőhöz tudok történetet.',
    whisper: 'A helyválasztás a későbbi jelenetet is megváltoztatja.',
    body: () => adventure.ferryPlace ? `<button class="primary-button full" data-next>Indulhatunk <span>→</span></button>` : `<div class="choice-row"><button data-ferry-place="deck">Menjünk a fedélzetre</button><button data-ferry-place="inside">Üljünk az ablakhoz</button></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Vapur.',
    lead: 'Isztambulban a városi komp nem látványosság. Ugyanolyan természetes közlekedés, mint máshol a busz.',
    ali: 'Vapur. Komp. Nekem inkább egy mozgó erkély két kontinens között.', whisper: 'vapur · városi komp',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Vapur.</strong><span class="pronunciation">vápur · komp</span></div><button class="primary-button full" data-next>Nézzünk körül <span>→</span></button>`
  },
  {
    eyebrow: 'Arcok a kompon', title: 'Kit vettél észre?',
    lead: 'Nem kell mindent megnevezni. Elég egy részlet, amelyen megakad a szemed.',
    ali: () => ({ man: 'Én is láttam. A bajusza előbb ért ide, mint ő.', woman: 'A piros kendő a szélben messziről is látszik.', child: 'A gyerek már harmadszor számolja meg a sirályokat.' })[adventure.observed] || 'Nézz körül. Minden utasnak van egy története, még ha nem is ismerjük.',
    whisper: 'A megfigyelés nem találgatás: csak azt mondjuk, amit valóban látunk.',
    body: () => adventure.observed ? `<button class="primary-button full" data-next>És te hogy nézel ki, Ali? <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-observed="man"><strong>A bajuszos férfit</strong><small>bıyıklı adam</small></button></div><div class="question-choice"><button data-observed="woman"><strong>A piros kendős nőt</strong><small>kırmızı şallı kadın</small></button></div><div class="question-choice"><button data-observed="child"><strong>A kíváncsi gyereket</strong><small>meraklı çocuk</small></button></div></div>`
  },
  {
    eyebrow: 'Ali a tükörben', title: 'Mit mondanál rólam?',
    lead: 'Ali türelmesen vár. Láthatóan kíváncsi, melyik részletet választod.',
    ali: () => ({ hair: 'Kıvırcık saçlıyım. Göndör hajú vagyok. A szél szerint túlságosan is.', eyes: 'Kahverengi gözlerim var. Barna szemem van.', smile: 'Gülümsüyorum. Mosolygok — ezt nehéz nem észrevenni.' })[adventure.aliFeature] || 'Csak egyet válassz. Nem kell az egész Alit egy mondatba tenni.',
    whisper: 'A -lı/-li végződés gyakran azt jelenti: valamivel rendelkező.',
    body: () => adventure.aliFeature ? `<div class="selected-answer"><strong>${adventure.aliFeature === 'hair' ? 'Kıvırcık saçlı.' : adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : 'Güler yüzlü.'}</strong><span>${adventure.aliFeature === 'hair' ? 'Göndör hajú.' : adventure.aliFeature === 'eyes' ? 'Barna szemű.' : 'Mosolygós.'}</span></div><button class="primary-button full" data-next>Talált <span>→</span></button>` : `<div class="choice-row"><button data-ali-feature="hair"><strong>Kıvırcık saçlı</strong><small>Göndör hajú</small></button><button data-ali-feature="eyes"><strong>Kahverengi gözlü</strong><small>Barna szemű</small></button><button data-ali-feature="smile"><strong>Güler yüzlü</strong><small>Mosolygós</small></button></div>`
  },
  {
    eyebrow: 'Egy egyszerű minta', title: '… gözleri var.',
    lead: 'Ezzel azt mondod el, milyen szeme van valakinek.',
    ali: 'Kahverengi gözleri var. Barna szeme van. Ezt most rólam biztosan tudjuk.', whisper: 'kahverengi · barna | göz · szem | var · van',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Kahverengi gözleri var.</strong><span class="pronunciation">Barna szeme van.</span></div><div class="word-chips"><span>kahverengi<small>barna</small></span><span>göz<small>szem</small></span><span>var<small>van</small></span></div><button class="primary-button full" data-next>Ezt már felismerem <span>→</span></button>`
  },
  {
    eyebrow: 'Ali most téged kérdez', title: 'Kiminle geldin?',
    lead: 'Kivel jöttél? A valós válaszod itt is fontosabb, mint egy előre megírt mondat.',
    ali: () => ({ ali: 'Benimle geldin. Velem jöttél. Ezt jó hallani.', alone: 'Tek geldin — egyedül érkeztél. De most már együtt utazunk.', friend: 'Arkadaşımla. Egy baráttal. Remélem, ő is szereti a sirályokat.' })[adventure.company] || 'Válaszd azt, ami a legközelebb áll hozzád.',
    whisper: 'Kiminle? · Kivel?',
    body: () => adventure.company ? `<button class="primary-button full" data-next>Most már ketten nézzük a vizet <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-company="ali"><strong>Seninle.</strong><small>Veled.</small></button></div><div class="question-choice"><button data-company="alone"><strong>Tek geldim.</strong><small>Egyedül jöttem.</small></button></div><div class="question-choice"><button data-company="friend"><strong>Arkadaşımla.</strong><small>Egy barátommal.</small></button></div></div>`
  },
  {
    eyebrow: 'Nem csak külső', title: 'Nasıl biriyim?',
    lead: 'Milyen ember vagyok? Most már nem Ali hajáról vagy szeméről beszélünk.',
    ali: () => ({ curious: 'Meraklı. Kíváncsi. Ebben hasonlítunk.', cheerful: 'Neşeli. Vidám. Különösen, ha kompra szállhatok.', calm: 'Sakin. Nyugodt. Legalábbis amíg egy sirály el nem viszi a simitemet.' })[adventure.personality] || 'A személyiséghez is elég egyetlen őszinte szó.',
    whisper: 'Nasıl biri? · Milyen ember?',
    body: () => adventure.personality ? `<button class="primary-button full" data-next>Ez is te vagy, Ali <span>→</span></button>` : `<div class="choice-row"><button data-personality="curious"><strong>Meraklı</strong><small>Kíváncsi</small></button><button data-personality="cheerful"><strong>Neşeli</strong><small>Vidám</small></button><button data-personality="calm"><strong>Sakin</strong><small>Nyugodt</small></button></div>`
  },
  {
    eyebrow: 'A sirályok szabálya', title: 'A simit nem marad őrizetlenül.',
    lead: 'A kompon a sirályok olyan közel repülnek, mintha ők is jegyet váltottak volna.',
    ali: 'Ha egy sirály elveszi a simitedet, az nem lopás. Szerintük ez helyi adó.',
    whisper: () => adventure.savedFerryCulture ? 'A komp sirályai bekerültek az útinaplódba.' : 'Egy városi részlet, amelyet nem kell megtanulni — csak felismerni.',
    body: () => `<div class="culture-card"><span class="culture-mark">≈</span><div><strong>martı</strong><p>sirály</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Nézzük tovább a partot</button><button class="quiet-choice" data-save-ferry>${adventure.savedFerryCulture ? '✓ Az útinaplóban' : 'Ezt elteszem'}</button></div>`
  },
  {
    eyebrow: 'Valaki, akit már ismersz', title: 'Mutasd be Alit.',
    lead: 'Nem kell tökéletes mondat. Három biztos részlet már valódi bemutatás.',
    ali: 'Kíváncsi vagyok, milyen Ali lettem a te mondataidban.', whisper: 'Bu Ali. · Ő Ali.',
    body: () => `<div class="intro-card"><span>A te leírásod</span><strong>Bu Ali.</strong><small>Ő Ali.</small><strong>${adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü.' : 'Kıvırcık saçlı.'}</strong><small>${adventure.aliFeature === 'eyes' ? 'Barna szemű.' : adventure.aliFeature === 'smile' ? 'Mosolygós.' : 'Göndör hajú.'}</small><strong>${adventure.personality === 'calm' ? 'Sakin.' : adventure.personality === 'cheerful' ? 'Neşeli.' : 'Meraklı.'}</strong><small>${adventure.personality === 'calm' ? 'Nyugodt.' : adventure.personality === 'cheerful' ? 'Vidám.' : 'Kíváncsi.'}</small></div><button class="primary-button full" data-next>Így mutatlak be <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 03', title: 'Átkeltetek a Boszporuszon.',
    lead: 'Megfigyeltél valakit, leírtad Alit, és már külső és belső tulajdonságról is tudsz beszélni.',
    ali: 'Üsküdar még várhat egy kicsit. Előbb megmutatok egy helyet, ahol minden színnek ára van.', whisper: 'Következő állomás: Grand Bazaar · 15:40',
    body: () => `<div class="journal-card"><span>Boğaziçi · 11:05</span><strong>${escapeHtml(adventure.name || 'A vendég')} átkelése</strong><p>Bu Ali.<br>${adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü.' : 'Kıvırcık saçlı.'}<br>${adventure.personality === 'calm' ? 'Sakin.' : adventure.personality === 'cheerful' ? 'Neşeli.' : 'Meraklı.'}</p><small>${adventure.savedFerryCulture ? 'Emlék: martı - a komp sirálya' : 'Emlék: a Boszporusz két partja'}</small></div><button class="primary-button full" data-start-bazaar>Megnézzük a bazárt? <span>→</span></button>`
  }
];

const bazaarScenes = [
  {
    eyebrow: 'Grand Bazaar · 15:40', title: 'Mi állított meg?',
    lead: 'A bazárban egyszerre túl sok minden kér figyelmet. Ali azt javasolja, válassz egyetlen tárgyat.',
    ali: () => ({ scarf: 'Jó szem. A kendő színe már messziről hívott.', jacket: 'Egy dzseki? Akkor ma komoly vásárlók leszünk.', shoes: 'Cipő. Bölcs döntés — Isztambulban sokat sétálunk.' })[adventure.bazaarItem] || 'Nem kell vásárolnod. Elég, ha valami miatt megállsz.',
    whisper: 'A választott tárgy végigkíséri a teljes bazári történetet.',
    body: () => adventure.bazaarItem ? `<button class="primary-button full" data-next>Nézzük meg közelebbről <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-bazaar-item="scarf"><strong>şal</strong><small>kendő</small></button></div><div class="question-choice"><button data-bazaar-item="jacket"><strong>ceket</strong><small>dzseki</small></button></div><div class="question-choice"><button data-bazaar-item="shoes"><strong>ayakkabı</strong><small>cipő</small></button></div></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Milyen színű?',
    lead: 'A szín az első részlet, amelyet az eladó is megért.',
    ali: () => ({ red: 'Kırmızı. Piros. Ezt nehéz elveszíteni a bazárban.', blue: 'Mavi. Kék. A Boszporusz után érthető választás.', green: 'Yeşil. Zöld. Gülhane már előre üdvözöl.' })[adventure.bazaarColor] || 'Mutass rá arra a színre, amelyikhez újra visszanéznél.',
    whisper: 'kırmızı · piros | mavi · kék | yeşil · zöld',
    body: () => adventure.bazaarColor ? `<div class="selected-answer"><strong>${adventure.bazaarColor === 'red' ? 'Kırmızı.' : adventure.bazaarColor === 'blue' ? 'Mavi.' : 'Yeşil.'}</strong><span>${adventure.bazaarColor === 'red' ? 'Piros.' : adventure.bazaarColor === 'blue' ? 'Kék.' : 'Zöld.'}</span></div><button class="primary-button full" data-next>Ezt a színt keresem <span>→</span></button>` : `<div class="color-choices"><button class="color-choice red" data-bazaar-color="red"><i></i><strong>Kırmızı</strong><small>Piros</small></button><button class="color-choice blue" data-bazaar-color="blue"><i></i><strong>Mavi</strong><small>Kék</small></button><button class="color-choice green" data-bazaar-color="green"><i></i><strong>Yeşil</strong><small>Zöld</small></button></div>`
  },
  {
    eyebrow: 'A megfelelő változat',
    title: () => adventure.bazaarItem === 'shoes' ? 'Bu numara var mı?' : adventure.bazaarItem === 'scarf' ? 'Başka rengi var mı?' : 'Başka beden var mı?',
    lead: () => adventure.bazaarItem === 'shoes' ? 'Van ebből ebben a cipőméretben? A cipőnél számozást kérünk, nem S–M–L méretet.' : adventure.bazaarItem === 'scarf' ? 'Van másik színben? A kendőnél árnyalatot választunk, nem ruhaméretet.' : 'Van másik méret? A dzsekinél a címkén látható betűméretet keresed.',
    ali: () => {
      if (!adventure.bazaarSize) return adventure.bazaarItem === 'scarf' ? 'Világosabbat, sötétebbet — vagy maradjon ez. A kendő nem kér ruhaméretet.' : 'Mutathatsz is arra a méretre, amelyet keresel.';
      if (adventure.bazaarItem === 'scarf') return adventure.bazaarSize === 'light' ? 'Daha açık. Világosabb. Az eladó már mutatja is.' : adventure.bazaarSize === 'dark' ? 'Daha koyu. Sötétebb. Ez egészen más hangulat.' : 'Bu renk güzel. Ez a szín jó — marad az első választás.';
      if (adventure.bazaarItem === 'shoes') return `${adventure.bazaarSize} numara. ${adventure.bazaarSize}-es cipőméret. Az eladó már keresi is.`;
      return `${adventure.bazaarSize.toUpperCase()} beden. ${adventure.bazaarSize.toUpperCase()}-es méret. Az eladó már keresi is.`;
    },
    whisper: () => adventure.bazaarItem === 'shoes' ? 'numara · cipőméret | var mı? · van?' : adventure.bazaarItem === 'scarf' ? 'başka renk · másik szín | daha açık · világosabb | daha koyu · sötétebb' : 'başka · másik | beden · ruhaméret | var mı? · van?',
    body: () => {
      const phrase = adventure.bazaarItem === 'shoes' ? '<strong>Bu numara var mı?</strong><span class="pronunciation">Van ebből ebben a méretben?</span>' : adventure.bazaarItem === 'scarf' ? '<strong>Başka rengi var mı?</strong><span class="pronunciation">Van másik színben?</span>' : '<strong>Başka beden var mı?</strong><span class="pronunciation">Van másik méret?</span>';
      const choices = adventure.bazaarItem === 'shoes' ? '<div class="size-choices"><button data-size="38">38</button><button data-size="39">39</button><button data-size="40">40</button><button data-size="41">41</button><button data-size="42">42</button></div>' : adventure.bazaarItem === 'scarf' ? '<div class="choice-row"><button data-size="light"><strong>Daha açık</strong><small>Világosabb</small></button><button data-size="dark"><strong>Daha koyu</strong><small>Sötétebb</small></button><button data-size="same"><strong>Bu iyi</strong><small>Ez jó</small></button></div>' : '<div class="size-choices"><button data-size="s">S</button><button data-size="m">M</button><button data-size="l">L</button><button data-size="xl">XL</button></div>';
      return `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span>${phrase}</div>${adventure.bazaarSize ? '<button class="primary-button full" data-next>Próbáljuk fel <span>→</span></button>' : choices}`;
    }
  },
  {
    eyebrow: 'A függöny mögött', title: 'Deneyebilir miyim?',
    lead: () => adventure.bazaarItem === 'jacket' ? 'Felpróbálhatom? A dzsekinél valóban a próbafülke felé indulunk.' : adventure.bazaarItem === 'shoes' ? 'Felpróbálhatom? A cipőhöz elég egy ülőhely és egy cipőkanál.' : 'Felpróbálhatom? A kendőt a tükör előtt rögtön megnézheted.',
    ali: () => adventure.tryOn === 'ask' ? 'Az eladó bólintott. Már mutatja is, hol próbálhatod fel.' : adventure.tryOn === 'gesture' ? 'Megértette a mozdulatot. A mondatot ettől még magaddal viheted.' : 'Mondd, vagy mutass a darabra és magadra. Mindkettő valódi kommunikáció.', whisper: 'denemek · próbálni | deneyebilir miyim? · felpróbálhatom?',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Deneyebilir miyim?</strong><span class="pronunciation">Felpróbálhatom?</span></div>${adventure.tryOn ? `<button class="primary-button full" data-next>${adventure.bazaarItem === 'shoes' ? 'Próbáljuk fel' : 'Jöhet a tükör'} <span>→</span></button>` : `<div class="choice-row"><button data-try-on="ask">Megkérdezem</button><button data-try-on="gesture">${adventure.bazaarItem === 'jacket' ? 'Mutatok a próbafülkére' : 'Mutatok a darabra és magamra'}</button></div>`}`
  },
  {
    eyebrow: 'A tükör előtt', title: 'Yakıştı mı?',
    lead: 'Jól áll? Ali egy pillanatig komolyan vizsgálja a választott darabot.',
    ali: () => adventure.priceReaction === 'love' ? 'Çok yakıştı. Nagyon jól áll. Ezt most teljesen komolyan mondom.' : adventure.priceReaction === 'unsure' ? 'Fena değil. Nem rossz. De nézzük meg az árát, mielőtt beleszeretsz.' : 'Szerintem a tükör már döntött. De te viseled, nem ő.',
    whisper: 'yakışmak · jól állni',
    body: () => adventure.priceReaction ? `<button class="primary-button full" data-next>Kérdezzük meg az árát <span>→</span></button>` : `<div class="choice-row"><button data-fit="love"><strong>Çok yakıştı.</strong><small>Nagyon jól áll.</small></button><button data-fit="unsure"><strong>Fena değil.</strong><small>Nem rossz.</small></button></div>`
  },
  {
    eyebrow: 'Az árcédula nincs kint', title: 'Bu ne kadar?',
    lead: 'Mennyibe kerül ez? A bazár egyik leghasznosabb mondata.',
    ali: 'Kérdezd nyugodtan. Az ár itt gyakran egy beszélgetés kezdete, nem a vége.', whisper: 'bu · ez | ne kadar? · mennyi?',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Bu ne kadar?</strong><span class="pronunciation">Mennyibe kerül ez?</span></div><button class="primary-button full" data-next>Megkérdezem az árát <span>→</span></button>`
  },
  {
    eyebrow: 'Ali felvonja a szemöldökét', title: 'Çok pahalı.',
    lead: 'Nagyon drága. Nem sértés — egyszerű reakció arra, amit hallottál.',
    ali: () => adventure.bargain === 'ask' ? 'Most jön a kérdés. Kedvesen, nem csataként.' : adventure.bargain === 'leave' ? 'Elsétálni is döntés. Néha ez a legerősebb alku.' : 'Nem kell alkudnod. Csak akkor, ha játékos beszélgetésnek érzed.',
    whisper: 'çok · nagyon | pahalı · drága',
    body: () => adventure.bargain ? `<button class="primary-button full" data-next>${adventure.bargain === 'ask' ? 'Kérjünk kedvezményt' : 'Az eladó utánunk szól'} <span>→</span></button>` : `<div class="choice-row"><button data-bargain="ask"><strong>Çok pahalı.</strong><small>Megpróbálok alkudni.</small></button><button data-bargain="leave"><strong>Teşekkürler.</strong><small>Megköszönöm és indulok.</small></button></div>`
  },
  {
    eyebrow: () => adventure.bargain === 'leave' ? 'Udvariasan tovább' : 'A bazár mondata',
    title: () => adventure.bargain === 'leave' ? 'Teşekkürler.' : 'Biraz indirim olur mu?',
    lead: () => adventure.bargain === 'leave' ? 'Köszönöm. Nem kell minden beszélgetésnek vásárlással vagy alkudozással végződnie.' : 'Lehetne egy kis kedvezmény? A hangnem többet számít, mint a tökéletes kiejtés.',
    ali: () => adventure.bargain === 'leave' ? 'Megköszönted, és indulunk tovább. Ez teljes értékű döntés.' : 'Mosolyog. Ez jó jel. Vagy csak felismerte benned a kitartó vendéget.',
    whisper: () => adventure.bargain === 'leave' ? 'teşekkürler · köszönöm' : 'biraz · egy kicsi | indirim · kedvezmény | olur mu? · lehetséges?',
    body: () => adventure.bargain === 'leave' ? `<div class="phrase-card"><span class="phrase-label">Udvarias lezárás</span><strong>Teşekkürler.</strong><span class="pronunciation">Köszönöm.</span></div><div class="adventure-actions"><button class="primary-button" data-next>Továbbmegyek <span>→</span></button><button class="quiet-choice" data-save-bazaar>${adventure.savedBazaarCulture ? '✓ Az útinaplóban' : 'Ezt az udvarias nemet elteszem'}</button></div>` : `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Biraz indirim olur mu?</strong><span class="pronunciation">Lehetne egy kis kedvezmény?</span></div><div class="adventure-actions"><button class="primary-button" data-next>Hallgassuk meg a választ <span>→</span></button><button class="quiet-choice" data-save-bazaar>${adventure.savedBazaarCulture ? '✓ Az útinaplóban' : 'Ezt a mondatot elteszem'}</button></div>`
  },
  {
    eyebrow: 'A döntés a tiéd', title: () => adventure.bargain === 'leave' ? 'Továbbmész?' : 'Alıyor musun?',
    lead: () => adventure.bargain === 'leave' ? 'Már elköszöntél. Ha biztos vagy benne, továbbmentek; ha mégis meggondoltad magad, visszafordulhatsz.' : 'Megveszed? Ali nem próbál rábeszélni. A jó útitárs a nemet is tiszteletben tartja.',
    ali: () => adventure.purchase === 'buy' ? 'Hayırlı olsun! Használd örömmel. És igen, szerintem jól választottál.' : adventure.purchase === 'leave' ? 'Güle güle kullansın valaki más. Mi pedig visszük magunkkal a mondatokat.' : 'Az emlékhez nem mindig kell szatyor.',
    whisper: 'almak · venni | alıyor musun? · megveszed?',
    body: () => adventure.purchase ? `<button class="primary-button full" data-next>Kerüljön az útinaplóba <span>→</span></button>` : `<div class="choice-row"><button data-purchase="buy"><strong>Alıyorum.</strong><small>Megveszem.</small></button><button data-purchase="leave"><strong>Almıyorum.</strong><small>Nem veszem meg.</small></button></div>`
  },
  {
    eyebrow: 'Útinapló · 04', title: 'Volt egy délutánod a bazárban.',
    lead: () => `Színt és ${adventure.bazaarItem === 'scarf' ? 'árnyalatot' : adventure.bazaarItem === 'shoes' ? 'cipőméretet' : 'ruhaméretet'} választottál, árat kérdeztél, majd a saját döntéseddel zártad le a vásárlási helyzetet.`,
    ali: 'Akár megvetted, akár nem: már nem vagy néma nézelődő a bazárban.', whisper: 'Következő állomás: Gülhane Park',
    body: () => `<div class="journal-card"><span>Kapalıçarşı · 15:40</span><strong>${escapeHtml(adventure.name || 'A vendég')} választása</strong><p>${adventure.bazaarColor === 'red' ? 'Kırmızı' : adventure.bazaarColor === 'blue' ? 'Mavi' : 'Yeşil'} ${adventure.bazaarItem === 'jacket' ? 'ceket' : adventure.bazaarItem === 'shoes' ? 'ayakkabı' : 'şal'}<br>Bu ne kadar?<br>${adventure.purchase === 'buy' ? 'Alıyorum.' : 'Almıyorum.'}</p><small>${adventure.savedBazaarCulture ? adventure.bargain === 'leave' ? 'Emlék: udvariasan nemet mondani' : 'Emlék: az alku mint beszélgetés' : 'Emlék: a bazár színei'}</small></div><button class="primary-button full" data-start-park>Pihenünk egyet? <span>→</span></button>`
  }
];

const parkScenes = [
  {
    eyebrow: 'Gülhane Park · 17:10', title: 'Megálljunk egy kicsit?',
    lead: 'A bazár után a park hirtelen nagyon csendesnek tűnik. Ali nem feltételezi, hogy tovább akarsz rohanni.',
    ali: () => adventure.parkPace === 'sit' ? 'Üljünk le. Van időnk, és ez a pad láthatóan már várt ránk.' : adventure.parkPace === 'walk' ? 'Sétáljunk lassan. Ha meg akarsz állni, csak szólj.' : 'Te mondod meg a tempót. Én melletted sétálok.',
    whisper: 'Ali nem vezet. Mellette sétálsz — vagy vele együtt megállsz.',
    body: () => adventure.parkPace ? `<button class="primary-button full" data-next>Maradjunk itt egy pillanatra <span>→</span></button>` : `<div class="choice-row"><button data-park-pace="sit">Üljünk le a padra</button><button data-park-pace="walk">Sétáljunk lassan</button></div>`
  },
  {
    eyebrow: 'Ali valóban kérdez', title: 'Nasıl hissediyorsun?',
    lead: 'Hogy érzed magad? Ez most nem köszönési forma, hanem figyelmes érdeklődés.',
    ali: () => ({ tired: 'Yorgunsun. Fáradt vagy. Akkor tényleg jól választottuk ezt a parkot.', good: 'İyi hissediyorsun. Jól érzed magad. Ennek örülök.', quiet: 'Rendben. Nem kell minden érzést rögtön mondattá tenni.' })[adventure.parkFeeling] || 'Válaszolhatsz egy szóval. A csend is maradhat.',
    whisper: 'hissetmek · érezni | nasıl? · hogyan?',
    body: () => adventure.parkFeeling ? `<button class="primary-button full" data-next>Ali észrevesz valamit <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-park-feeling="tired"><strong>Yorgunum.</strong><small>Fáradt vagyok.</small></button></div><div class="question-choice"><button data-park-feeling="good"><strong>İyi hissediyorum.</strong><small>Jól érzem magam.</small></button></div><div class="question-choice"><button data-park-feeling="quiet"><strong>Most csak pihennék.</strong><small>Ali megérti.</small></button></div></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Hol érzed?',
    lead: 'Egy hosszú városi nap után néha elég egyetlen testrészt megnevezni.',
    ali: () => ({ head: 'Baş. Fej. Remélem, csak túl sok volt egyszerre a bazár.', feet: 'Ayaklar. Lábfejek. Isztambul valóban nem kíméli őket.', back: 'Bel. Derék vagy hát alsó része. Akkor üljünk kényelmesebben.', none: 'Semmid sem fáj. Ennek örülök — pihenni azért fájdalom nélkül is lehet.' })[adventure.bodyPart] || 'Nem diagnózist keresünk. Ha semmid sem fáj, az is valódi válasz.',
    whisper: 'baş · fej | ayak · lábfej | bel · derék | hiçbir yerim · sehol sem',
    body: () => adventure.bodyPart ? `<button class="primary-button full" data-next>Mondd el egy mondatban <span>→</span></button>` : `<div class="word-chips body-choices"><button data-body-part="head"><strong>baş</strong><small>fej</small></button><button data-body-part="feet"><strong>ayaklar</strong><small>lábfejek</small></button><button data-body-part="back"><strong>bel</strong><small>derék</small></button><button data-body-part="none"><strong>hiçbiri</strong><small>egyik sem</small></button></div>`
  },
  {
    eyebrow: 'Egy használható mondat', title: '… ağrıyor.',
    lead: 'Fáj. A testrész kerül a mondat elejére, az ağrıyor pedig elmondja, mi történik.',
    ali: 'Nem kell többet mondanod. Ezt már megértik egy gyógyszertárban vagy rendelőben is.', whisper: 'ağrımak · fájni | ağrıyor · fáj',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>${adventure.bodyPart === 'none' ? 'Hiçbir yerim ağrımıyor.' : adventure.bodyPart === 'head' ? 'Başım ağrıyor.' : adventure.bodyPart === 'back' ? 'Belim ağrıyor.' : 'Ayaklarım ağrıyor.'}</strong><span class="pronunciation">${adventure.bodyPart === 'none' ? 'Nem fáj semmim.' : adventure.bodyPart === 'head' ? 'Fáj a fejem.' : adventure.bodyPart === 'back' ? 'Fáj a derekam.' : 'Fáj a lábam.'}</span></div><button class="primary-button full" data-next>Ennyi most elég <span>→</span></button>`
  },
  {
    eyebrow: 'Egy török jókívánság', title: 'Geçmiş olsun.',
    lead: 'Ezt mondják annak, aki beteg, fáj valamije, vagy valami kellemetlenen van túl.',
    ali: 'Geçmiş olsun. Múljon el, legyen mögötted. Szeretem, hogy maga a mondat is előrefelé néz.', whisper: 'geçmiş olsun · jobbulást, mielőbbi javulást',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali kis szótára</span><strong>Geçmiş olsun.</strong><span class="pronunciation">Jobbulást.</span></div><button class="primary-button full" data-next>Köszönöm, Ali <span>→</span></button>`
  },
  {
    eyebrow: 'Ali kínál valamit', title: 'Su ister misin?',
    lead: 'Kérsz vizet? Ali most sem dönt helyetted.',
    ali: () => adventure.needsWater === 'yes' ? 'Hemen. Már hozom is. A pad addig vigyáz rád.' : adventure.needsWater === 'no' ? 'Rendben. Akkor csak maradok itt melletted.' : 'Evet vagy hayır. De egy bólintás is elég.',
    whisper: 'su · víz | ister misin? · kérsz?',
    body: () => adventure.needsWater ? `<button class="primary-button full" data-next>Van még időnk <span>→</span></button>` : `<div class="choice-row"><button data-water="yes"><strong>Evet, lütfen.</strong><small>Igen, kérek.</small></button><button data-water="no"><strong>Hayır, teşekkürler.</strong><small>Nem, köszönöm.</small></button></div>`
  },
  {
    eyebrow: 'A tempó mondata', title: 'Biraz dinlenelim.',
    lead: 'Pihenjünk egy kicsit. Nem kérdés és nem feladat — közös javaslat.',
    ali: () => adventure.parkPlan === 'rest' ? 'Akkor most nem történik semmi. Ez is része az utazásnak.' : adventure.parkPlan === 'continue' ? 'Még egy lassú kör, aztán visszajövünk ehhez a padhoz.' : 'Te választasz: maradunk vagy lassan továbbindulunk.',
    whisper: 'biraz · egy kicsit | dinlenmek · pihenni | -elim · csináljuk együtt',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Biraz dinlenelim.</strong><span class="pronunciation">Pihenjünk egy kicsit.</span></div>${adventure.parkPlan ? '<button class="primary-button full" data-next>Figyeljük a parkot <span>→</span></button>' : '<div class="choice-row"><button data-park-plan="rest">Maradjunk a padon</button><button data-park-plan="continue">Sétáljunk még lassan</button></div>'}`
  },
  {
    eyebrow: 'A park csendje', title: 'Nem minden pillanat kér mondatot.',
    lead: 'A város zaja mögött madarak, kanalak és távoli lépések hallatszanak.',
    ali: 'Ha most nem beszélünk, attól még együtt vagyunk. Ezt a török nyelv is kibírja.',
    whisper: () => adventure.savedParkCulture ? 'A közös csend bekerült az útinaplódba.' : 'A csend nem üres hely, hanem a vendéglátás része.',
    body: () => `<div class="culture-card"><span class="culture-mark">◌</span><div><strong>sessizlik</strong><p>csend</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Maradjunk még egy percet</button><button class="quiet-choice" data-save-park>${adventure.savedParkCulture ? '✓ Az útinaplóban' : 'Ezt a csendet elteszem'}</button></div>`
  },
  {
    eyebrow: 'A te parkbeli mondatod', title: 'Mondd el egyszerűen.',
    lead: 'A testedről, a közérzetedről és arról beszélsz, mire van most szükséged.',
    ali: 'Ez nem orvosi beszámoló. Csak annyi, amit egy figyelmes barátnak elmondanál.', whisper: 'Yorgunum. · Fáradt vagyok.',
    body: () => `<div class="intro-card"><span>A te mondataid</span><strong>${adventure.parkFeeling === 'good' ? 'İyi hissediyorum.' : adventure.parkFeeling === 'quiet' ? 'Biraz dinlenmek istiyorum.' : 'Yorgunum.'}</strong><small>${adventure.parkFeeling === 'good' ? 'Jól érzem magam.' : adventure.parkFeeling === 'quiet' ? 'Szeretnék egy kicsit pihenni.' : 'Fáradt vagyok.'}</small><strong>${adventure.bodyPart === 'none' ? 'Hiçbir yerim ağrımıyor.' : adventure.bodyPart === 'head' ? 'Başım ağrıyor.' : adventure.bodyPart === 'back' ? 'Belim ağrıyor.' : 'Ayaklarım ağrıyor.'}</strong><small>${adventure.bodyPart === 'none' ? 'Nem fáj semmim.' : adventure.bodyPart === 'head' ? 'Fáj a fejem.' : adventure.bodyPart === 'back' ? 'Fáj a derekam.' : 'Fáj a lábam.'}</small><strong>Biraz dinlenelim.</strong><small>Pihenjünk egy kicsit.</small></div><button class="primary-button full" data-next>Ezt el tudom mondani <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 05', title: 'Megálltatok Gülhanéban.',
    lead: 'Elmondtad, hogyan érzed magad, megneveztél egy egyszerű panaszt, és közösen lassítottatok.',
    ali: 'A villamos csilingelése már idáig hallatszik. Akkor szállunk fel, amikor készen állsz.', whisper: 'Következő állomás: Nostalgic Tram',
    body: () => `<div class="journal-card"><span>Gülhane · 17:10</span><strong>${escapeHtml(adventure.name || 'A vendég')} pihenője</strong><p>${adventure.parkFeeling === 'good' ? 'İyi hissediyorum.' : adventure.parkFeeling === 'quiet' ? 'Biraz dinlenmek istiyorum.' : 'Yorgunum.'}<br>${adventure.bodyPart === 'none' ? 'Hiçbir yerim ağrımıyor.' : adventure.bodyPart === 'head' ? 'Başım ağrıyor.' : adventure.bodyPart === 'back' ? 'Belim ağrıyor.' : 'Ayaklarım ağrıyor.'}<br>Biraz dinlenelim.</p><small>${adventure.savedParkCulture ? 'Emlék: sessizlik - a közös csend' : 'Emlék: egy pad Gülhanéban'}</small></div><button class="primary-button full" data-start-tram>Hallod a csilingelést? <span>→</span></button>`
  }
];

const tramScenes = [
  {
    eyebrow: 'Nostalgic Tram · 18:05', title: 'Fussunk vagy megvárjuk a következőt?',
    lead: 'A piros villamos már közeledik. Ali rád néz, de nem indul el nélküled.',
    ali: () => adventure.tramChoice === 'run' ? 'Akkor gyere! De csak olyan gyorsan, hogy közben még nevethessünk.' : adventure.tramChoice === 'wait' ? 'Megvárjuk a következőt. Isztambulban mindig jön még egy csilingelés.' : 'Nem a villamos dönt a tempónkról.',
    whisper: 'A választás megmarad: siethettek vagy várhattok.',
    body: () => adventure.tramChoice ? `<button class="primary-button full" data-next>Megérkezett <span>→</span></button>` : `<div class="choice-row"><button data-tram-choice="run">Érjük el ezt</button><button data-tram-choice="wait">Várjuk meg a következőt</button></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Tramvay.',
    lead: 'A szó ismerős lehet, a hangulat viszont nagyon is isztambuli.',
    ali: 'Tramvay. Villamos. Ez a piros példány jobban szeret szerepelni a fényképeken, mint közlekedni.', whisper: 'tramvay · villamos',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Tramvay.</strong><span class="pronunciation">villamos</span></div><button class="primary-button full" data-next>Szálljunk fel <span>→</span></button>`
  },
  {
    eyebrow: 'Felszállás előtt', title: 'İstanbulkart geçerli mi?',
    lead: 'Érvényes az İstanbulkart? A villamoson nem a vezetőtől kérsz papírjegyet: a városi közlekedési kártyádat használod.',
    ali: () => adventure.ticketChoice === 'say' ? 'İstanbulkart geçerli mi? Igen — most már nyugodtan érintheted az olvasóhoz.' : adventure.ticketChoice === 'card' ? 'A kártya pittyent. Ennél rövidebb párbeszéd kevés van a városban.' : 'Ha bizonytalan vagy, kérdezz. Ha már tudod, csak érintsd oda a kártyát.',
    whisper: 'İstanbulkart · közlekedési kártya | geçerli mi? · érvényes?',
    body: () => `<div class="phrase-card"><span class="phrase-label">A valódi helyzet mondata</span><strong>İstanbulkart geçerli mi?</strong><span class="pronunciation">Érvényes az İstanbulkart?</span></div>${adventure.ticketChoice ? '<button class="primary-button full" data-next>Felszállhatunk <span>→</span></button>' : '<div class="choice-row"><button data-ticket="say">Megkérdezem</button><button data-ticket="card">Odaérintem a kártyát</button></div>'}`
  },
  {
    eyebrow: 'Egy üresnek látszó hely', title: 'Müsait mi?',
    lead: 'Szabad? Ezzel finoman megkérdezheted, leülhetsz-e vagy elférsz-e valahol.',
    ali: () => adventure.tramSeat === 'ask' ? 'Bólintottak. A hely szabad, és most már biztosan tudjuk.' : adventure.tramSeat === 'stand' ? 'Állunk. Innen jobban látni, mikor kell leszállni.' : 'Ne feltételezd, hogy üres. Egy rövid kérdés elég.',
    whisper: 'müsait · szabad, megfelelő | mi? · kérdőszócska',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Müsait mi?</strong><span class="pronunciation">Szabad?</span></div>${adventure.tramSeat ? '<button class="primary-button full" data-next>A villamos megindul <span>→</span></button>' : '<div class="choice-row"><button data-tram-seat="ask">Megkérdezem</button><button data-tram-seat="stand">Inkább állok</button></div>'}`
  },
  {
    eyebrow: 'Valaki útban áll', title: 'Affedersiniz.',
    lead: 'Elnézést. Nem hibabeismerés, hanem udvarias kopogás a másik ember figyelmén.',
    ali: () => adventure.tramApology === 'say' ? 'Már félre is lépett. Egyetlen szó helyet csinált neked.' : adventure.tramApology === 'gesture' ? 'A mosoly és a mozdulat működött. Az Affedersiniz majd legközelebb jön.' : 'Nem kell hangosnak lenned. Csak annyira, hogy meghalljanak.',
    whisper: 'affedersiniz · elnézést, bocsánat',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Ali kis szótára</span><strong>Affedersiniz.</strong><span class="pronunciation">Elnézést.</span></div>${adventure.tramApology ? '<button class="primary-button full" data-next>Most már látjuk az ajtót <span>→</span></button>' : '<div class="choice-row"><button data-tram-apology="say">Kimondom</button><button data-tram-apology="gesture">Jelzek és mosolygok</button></div>'}`
  },
  {
    eyebrow: 'Ali mutat valamit', title: 'Fark etmedim.',
    lead: 'Nem vettem észre. Hasznos mondat, amikor valami elkerülte a figyelmedet.',
    ali: () => adventure.tramNotice === 'sign' ? 'A megálló neve végig ott volt. Semmi baj — most már látod.' : adventure.tramNotice === 'bell' ? 'A csengő már szólt egyszer. Ezért van kettőnknek összesen négy füle.' : 'Isztambul sok mindent mutat egyszerre. Valami mindig kimarad.',
    whisper: 'fark etmek · észrevenni | etmedim · nem tettem',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Fark etmedim.</strong><span class="pronunciation">Nem vettem észre.</span></div>${adventure.tramNotice ? '<button class="primary-button full" data-next>Most már figyelek <span>→</span></button>' : '<div class="question-list"><div class="question-choice"><button data-tram-notice="sign"><strong>A megálló nevét</strong><small>durak adı</small></button></div><div class="question-choice"><button data-tram-notice="bell"><strong>A csengőt</strong><small>zil</small></button></div></div>'}`
  },
  {
    eyebrow: 'Közeledik a megálló', title: 'Nerede ineceğiz?',
    lead: 'Hol szállunk le? Most már nem csak utazol, hanem a következő lépésre is rákérdezel.',
    ali: () => adventure.tramStop === 'next' ? 'Bir sonraki durakta. A következő megállónál.' : adventure.tramStop === 'later' ? 'Még maradunk egy kicsit. A villamos sem siet.' : 'Az ineceğiz azt jelenti: le fogunk szállni — együtt.',
    whisper: 'nerede · hol | inmek · leszállni | -eceğiz · fogunk',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali kis szótára</span><strong>Nerede ineceğiz?</strong><span class="pronunciation">Hol fogunk leszállni?</span></div>${adventure.tramStop ? '<button class="primary-button full" data-next>Figyeljük az utcát <span>→</span></button>' : '<div class="choice-row"><button data-tram-stop="next">A következőnél?</button><button data-tram-stop="later">Maradjunk még</button></div>'}`
  },
  {
    eyebrow: 'A piros villamos', title: 'A csilingelés a város hangja.',
    lead: 'A nosztalgikus villamos ma már rövid útvonalon jár, mégis Taksim egyik legismerősebb lakója.',
    ali: 'Szerintem tudja, hogy fényképezik. Ezért csilingel ilyen drámaian.',
    whisper: () => adventure.savedTramCulture ? 'A villamos csilingelése bekerült az útinaplódba.' : 'Nem közlekedési adatot gyűjtesz, hanem egy ismerős városi hangot.',
    body: () => `<div class="culture-card"><span class="culture-mark">♪</span><div><strong>zil</strong><p>csengő, csilingelés</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Utazzunk tovább</button><button class="quiet-choice" data-save-tram>${adventure.savedTramCulture ? '✓ Az útinaplóban' : 'Ezt a hangot elteszem'}</button></div>`
  },
  {
    eyebrow: 'Három mondat, egy utazás', title: 'Most már helyet kérsz magadnak.',
    lead: 'Ellenőrzöd a közlekedési kártyát, udvariasan megszólítasz valakit, és rákérdezel a leszállásra.',
    ali: 'Nem nagy beszéd. Pont ezért működik egy zsúfolt villamoson.', whisper: 'İstanbulkart geçerli mi? → Affedersiniz. → Nerede ineceğiz?',
    body: () => `<div class="intro-card"><span>A villamos mondatai</span><strong>İstanbulkart geçerli mi?</strong><small>Érvényes az İstanbulkart?</small><strong>Affedersiniz.</strong><small>Elnézést.</small><strong>Nerede ineceğiz?</strong><small>Hol fogunk leszállni?</small></div><button class="primary-button full" data-next>Ezekkel már boldogulok <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 06', title: 'Felszálltatok a piros villamosra.',
    lead: 'Közlekedési kártyát használtál, helyet kértél, udvariasan utat nyitottál, majd megkérdezted, hol szálltok le.',
    ali: 'Innen már a naplemente felé visz az utunk. Üsküdarban a város másik arca vár.', whisper: 'Következő állomás: Sunset at Üsküdar',
    body: () => `<div class="journal-card"><span>Tramvay · 18:05</span><strong>${escapeHtml(adventure.name || 'A vendég')} villamosútja</strong><p>İstanbulkart geçerli mi?<br>Affedersiniz.<br>Nerede ineceğiz?</p><small>${adventure.savedTramCulture ? 'Emlék: zil - a piros villamos csilingelése' : 'Emlék: egy ablak a városra'}</small></div><button class="primary-button full" data-start-uskudar>Megnézzük a naplementét? <span>→</span></button>`
  }
];

const uskudarScenes = [
  {
    eyebrow: 'Üsküdar · 19:18', title: 'Honnan nézzük?',
    lead: 'A nap már alacsonyan jár. A lépcsőknél közelebb a víz, a teázónál kényelmesebb leülni.',
    ali: () => adventure.uskudarSpot === 'steps' ? 'A lépcsőkről. Jó — innen a hullámok is beleszólnak a beszélgetésbe.' : adventure.uskudarSpot === 'tea' ? 'A teázó mellől. Ma már ez lesz a második teánk, de ki számolja?' : 'Te választasz kilátást. A naplemente mindkettőhöz ugyanaz.',
    whisper: 'Ha megállsz nézelődni, Ali is megáll.',
    body: () => adventure.uskudarSpot ? `<button class="primary-button full" data-next>Üljünk le <span>→</span></button>` : `<div class="choice-row"><button data-uskudar-spot="steps">A vízparti lépcsőkhöz</button><button data-uskudar-spot="tea">A teázó mellé</button></div>`
  },
  {
    eyebrow: 'Fények a túlparton', title: 'Eszedbe jutott valaki?',
    lead: 'A túlparton egymás után gyulladnak ki az ablakok. Néha egy fényhez rögtön társul egy arc.',
    ali: () => ({ family: 'Ailem. A családom. Ezt a szót én is gyakran viszem magammal.', friend: 'Arkadaşım. Egy barátom. Van, akit nem a rokonság, hanem a közös történetek tesznek családdá.', quiet: 'Rendben. Nem minden emléket kell hangosan kimondani.' })[adventure.sunsetCompany] || 'Nem azt kérdezem, ki hiányzik. Csak azt, kinek mutatnád meg ezt a fényt.',
    whisper: 'aile · család | arkadaş · barát',
    body: () => adventure.sunsetCompany ? `<button class="primary-button full" data-next>Maradjunk még egy kicsit <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-sunset-company="family"><strong>Ailem.</strong><small>A családom.</small></button></div><div class="question-choice"><button data-sunset-company="friend"><strong>Bir arkadaşım.</strong><small>Egy barátom.</small></button></div><div class="question-choice"><button data-sunset-company="quiet"><strong>Most csak nézném.</strong><small>Ezt nem kell megosztanom.</small></button></div></div>`
  },
  {
    eyebrow: 'Egy kérdés, ha belefér', title: 'Kardeşin var mı?',
    lead: 'Van testvéred? Ali csak akkor kérdez tovább, ha szívesen válaszolsz.',
    ali: () => ({ yes: 'Ne güzel. Szép. A törökben külön szó van a nővérre, bátyra, húgra és öcsre.', no: 'Kardeşim yok. Nincs testvérem. Ez önmagában teljes válasz.', skip: 'Akkor hagyjuk a kérdést a vízen elúszni.' })[adventure.sunsetSibling] || 'Röviden is válaszolhatsz. Vagy egyáltalán nem.',
    whisper: 'kardeş · testvér',
    body: () => adventure.sunsetSibling ? `<button class="primary-button full" data-next>Mutass egy szót <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-sunset-sibling="yes"><strong>Evet, var.</strong><small>Igen, van.</small></button></div><div class="question-choice"><button data-sunset-sibling="no"><strong>Kardeşim yok.</strong><small>Nincs testvérem.</small></button></div><div class="question-choice"><button data-sunset-sibling="skip"><strong>Most nem mesélnék róla.</strong><small>Ali nem kérdez tovább.</small></button></div></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'A török pontosabban emlékszik.',
    lead: 'A testvér nem csak kardeş lehet. Egyetlen szó azt is elmondhatja, idősebb-e vagy fiatalabb nálad.',
    ali: () => ({ abla: 'Abla. Nővér — és néha szeretetteljes megszólítás egy idősebb nőnek is.', abi: 'Abi. Báty — de Isztambulban olyannak is mondhatod, akit tisztelsz és közel érzel.', younger: 'Kız kardeş vagy erkek kardeş. Húg vagy öcs. Itt a szó azt is megmutatja, kiről beszélsz.', listen: 'Elég, ha most felismered őket. Nem kell mindet egyszerre hazavinned.' })[adventure.sunsetFamilyWord] || 'Válassz egyet, amelyik ma este veled marad.',
    whisper: 'abla · nővér | abi · báty | kız kardeş · húg | erkek kardeş · öcs',
    body: () => adventure.sunsetFamilyWord ? `<button class="primary-button full" data-next>Most már van neve <span>→</span></button>` : `<div class="word-chips body-choices"><button data-sunset-word="abla"><strong>abla</strong><small>nővér</small></button><button data-sunset-word="abi"><strong>abi</strong><small>báty</small></button><button data-sunset-word="younger"><strong>kız / erkek kardeş</strong><small>húg / öcs</small></button><button data-sunset-word="listen"><strong>Most csak figyelek</strong><small>Elég felismerni.</small></button></div>`
  },
  {
    eyebrow: 'Egy mondat rólad', title: 'Biz üç kardeşiz.',
    lead: 'Hárman vagyunk testvérek. A biz azt jelenti: mi. A mondatban senki sincs egyedül.',
    ali: 'Egy család létszáma lehet egy szó, de a története sosem fér el egy számban.',
    whisper: 'Biz üç kardeşiz. · Hárman vagyunk testvérek.',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ali zsebében</span><strong>Biz üç kardeşiz.</strong><span class="pronunciation">Hárman vagyunk testvérek.</span></div><button class="primary-button full" data-next>Nézzük tovább a fényeket <span>→</span></button>`
  },
  {
    eyebrow: 'A fény, amit hazaküldenél', title: 'Mit tennél el ebből az estéből?',
    lead: 'Nem kell lefényképezni mindent. Egy szín, egy hang vagy egy mondat is elég lehet.',
    ali: () => ({ light: 'A fényt. Holnap máshonnan érkezik majd, de ezt az estét már felismered.', sound: 'A komp hangját. Ha egyszer újra meghallod, tudni fogod, merre van a víz.', sentence: 'Egy mondatot. A szavak könnyű poggyászok.', quiet: 'A csendet. Ezt nem kell lefordítani.' })[adventure.sunsetMemory] || 'Én azt a pillanatot teszem el, amikor mindenki egyszerre halkul el.',
    whisper: 'hatıra · emlék',
    body: () => adventure.sunsetMemory ? `<button class="primary-button full" data-next>Vigyünk belőle magunkkal <span>→</span></button>` : `<div class="choice-row"><button data-sunset-memory="light">A fényt</button><button data-sunset-memory="sound">A komp hangját</button><button data-sunset-memory="sentence">Egy mondatot</button><button data-sunset-memory="quiet">A csendet</button></div>`
  },
  {
    eyebrow: 'Már majdnem este van', title: 'İyi akşamlar.',
    lead: 'Jó estét. Ezt napnyugta után hallod majd az utcán, a teázóban és a pékség ajtajában.',
    ali: () => adventure.sunsetStay === 'stay' ? 'Van időnk. A város fényei nem egyszerre gyulladnak ki.' : adventure.sunsetStay === 'walk' ? 'Sétáljunk. A part mentén még velünk marad az ég színe.' : 'Maradjunk még, vagy vigyük tovább az estét?',
    whisper: 'İyi akşamlar. · Jó estét.',
    body: () => adventure.sunsetStay ? `<button class="primary-button full" data-next>İyi akşamlar, Üsküdar <span>→</span></button>` : `<div class="choice-row"><button data-sunset-stay="stay">Maradjunk még</button><button data-sunset-stay="walk">Sétáljunk tovább</button></div>`
  },
  {
    eyebrow: 'Üsküdar naplementéje', title: 'Itt mindenki ugyanabba az irányba néz.',
    lead: 'A vízparti lépcsőkön idegenek ülnek egymás mellett, mégis közös a csendjük és a kilátásuk.',
    ali: 'Senki nem kérdezi, kié a legjobb hely. A nap úgyis mindenkinek ugyanakkor megy le.',
    whisper: () => adventure.savedSunsetCulture ? 'Az üsküdari naplemente bekerült az útinaplódba.' : 'Egy városi rítus, amelyhez nem kell meghívó.',
    body: () => `<div class="culture-card"><span class="culture-mark">☼</span><div><strong>gün batımı</strong><p>naplemente</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Maradjunk, amíg lemegy</button><button class="quiet-choice" data-save-sunset>${adventure.savedSunsetCulture ? '✓ Az útinaplóban' : 'Ezt a fényt elteszem'}</button></div>`
  },
  {
    eyebrow: 'Három szó maradt veled', title: 'Ennyi elég volt mára.',
    lead: 'Nem családfát töltöttél ki. Csak közelebb engedtél egy emléket, miközben lement a nap.',
    ali: 'Nem kell mindent elmondanod ahhoz, hogy értsem: van, akire jó gondolni.', whisper: 'aile · kardeş · iyi akşamlar',
    body: () => `<div class="intro-card"><span>Az esti zsebszótáram</span><strong>Aile</strong><small>család</small><strong>Kardeşin var mı?</strong><small>Van testvéred?</small><strong>İyi akşamlar.</strong><small>Jó estét.</small></div><button class="primary-button full" data-next>Tegyük el ezt az estét <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 07', title: 'Valaki eszedbe jutott a túlpart fényeiről.',
    lead: 'Megtanultál néhány családi szót, de Ali nem kérte, hogy többet mondj annál, mint amennyi jólesett.',
    ali: 'Holnap reggel friss simit illata vár. Most még maradjunk itt egy utolsó percre.', whisper: 'Következő állomás: Simit Bakery',
    body: () => `<div class="journal-card"><span>Üsküdar · 19:18</span><strong>${escapeHtml(adventure.name || 'A vendég')} naplementéje</strong><p>${adventure.sunsetCompany === 'family' ? 'Ailem.' : adventure.sunsetCompany === 'friend' ? 'Bir arkadaşım.' : 'İyi akşamlar.'}<br>${adventure.sunsetSibling === 'yes' ? 'Evet, kardeşim var.' : adventure.sunsetSibling === 'no' ? 'Kardeşim yok.' : 'İyi akşamlar.'}</p><small>${adventure.savedSunsetCulture ? 'Emlék: gün batımı · az üsküdari naplemente' : 'Emlék: a túlpart első esti fénye'}</small></div><button class="primary-button full" data-start-bakery>Reggelizzünk együtt? <span>→</span></button>`
  }
];

const bakeryScenes = [
  {
    eyebrow: 'Simitçi · 08:35', title: 'Az illat talál meg először.',
    lead: 'A pékség ajtaja nyitva áll. Szezám, friss tészta és tea illata keveredik az utcával.',
    ali: () => ({ sesame: 'Susam. Szezám. Akkor jó helyen járunk.', bread: 'Taze ekmek. Friss kenyér. Ez az illat minden nyelven érthető.', tea: 'Çay. Tea. Te már messziről felismered.' })[adventure.bakerySmell] || 'Ne a táblát olvasd. Először csak szippants bele a reggelbe.',
    whisper: 'Mi érkezett meg hozzád először?',
    body: () => adventure.bakerySmell ? `<button class="primary-button full" data-next>Menjünk beljebb <span>→</span></button>` : `<div class="choice-row"><button data-bakery-smell="sesame">Szezám</button><button data-bakery-smell="bread">Friss kenyér</button><button data-bakery-smell="tea">Tea</button></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Simit.',
    lead: 'Kívül pirult és szezámos, belül puhább. Nem perec, és nem is egyszerű kenyérkarika.',
    ali: 'Simit. Isztambul egyik legegyszerűbb reggelije. Az utcán is elkísér.',
    whisper: 'simit · szezámos kenyérkarika',
    body: () => `<div class="phrase-card"><span class="phrase-label">Egy új ismerős</span><strong>Simit.</strong><span class="pronunciation">szezámos kenyérkarika</span></div><button class="primary-button full" data-next>Kérek egyet <span>→</span></button>`
  },
  {
    eyebrow: 'A pultnál', title: 'Bir simit, lütfen.',
    lead: 'Egy simitet, kérek. A teánál már megtanult mondatváz újra működik.',
    ali: () => adventure.bakeryOrder === 'one' ? 'Pontosan. Bir simit, lütfen. Már nem új mondatot tanulsz, csak mást teszel a közepébe.' : adventure.bakeryOrder === 'two' ? 'İki simit, lütfen. Kettőt kérsz — akkor az egyik talán az enyém.' : 'Bir çay, bir simit. Ugyanaz az udvarias kérés, más kerül az asztalra.',
    whisper: 'bir · egy | iki · kettő | lütfen · kérem',
    body: () => adventure.bakeryOrder ? `<button class="primary-button full" data-next>És mit igyunk hozzá? <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-bakery-order="one"><strong>Bir simit, lütfen.</strong><small>Egy simitet, kérek.</small></button></div><div class="question-choice"><button data-bakery-order="two"><strong>İki simit, lütfen.</strong><small>Két simitet, kérek.</small></button></div></div>`
  },
  {
    eyebrow: 'A reggeli mellé', title: 'Ne içmek istersin?',
    lead: 'Mit szeretnél inni? A pékségben a tea természetes társ, de a választás a vendégé.',
    ali: () => ({ tea: 'Çay istiyorum. Teát kérek. A simit már várta.', coffee: 'Kahve istiyorum. Kávét kérek. Erősebb kezdés.', water: 'Su istiyorum. Vizet kérek. Egyszerű és jó.' })[adventure.bakeryDrink] || 'Én teát kérek, de nem rendelek helyetted.',
    whisper: 'içmek · inni | istemek · kérni, szeretni | Ne içmek istersin? · Mit szeretnél inni?',
    body: () => adventure.bakeryDrink ? `<button class="primary-button full" data-next>Kóstoljuk meg <span>→</span></button>` : `<div class="word-chips body-choices"><button data-bakery-drink="tea"><strong>çay</strong><small>tea</small></button><button data-bakery-drink="coffee"><strong>kahve</strong><small>kávé</small></button><button data-bakery-drink="water"><strong>su</strong><small>víz</small></button></div>`
  },
  {
    eyebrow: 'Az első falat', title: 'Nasıl?',
    lead: 'Milyen? Ízről, hőmérsékletről vagy állagról is válaszolhatsz egyetlen jelzővel.',
    ali: () => ({ tasty: 'Çok lezzetli. Nagyon finom. Ezt a pék arckifejezés nélkül is hallotta.', warm: 'Sıcak. Meleg. Most jött ki a sütőből.', crunchy: 'Çıtır. Ropogós. A morzsák is egyetértenek.' })[adventure.simitTaste] || 'Kóstold meg nyugodtan. A jó reggeli nem kér gyors választ.',
    whisper: 'tat · íz | lezzetli · finom | sıcak · meleg | çıtır · ropogós',
    body: () => adventure.simitTaste ? `<button class="primary-button full" data-next>Mi kell hozzá a konyhában? <span>→</span></button>` : `<div class="choice-row"><button data-simit-taste="tasty"><strong>Lezzetli.</strong><small>Finom.</small></button><button data-simit-taste="warm"><strong>Sıcak.</strong><small>Meleg.</small></button><button data-simit-taste="crunchy"><strong>Çıtır.</strong><small>Ropogós.</small></button></div>`
  },
  {
    eyebrow: 'A pék asztalán', title: 'Un, su, tuz, susam.',
    lead: 'Liszt, víz, só és szezám. Néhány hétköznapi szó mögött egy egész pékség dolgozik.',
    ali: 'Un, su, tuz, susam. Négy rövid szó. A sütő hozzáteszi az illatot.',
    whisper: 'un · liszt | su · víz | tuz · só | susam · szezám',
    body: () => `<div class="word-chips"><span><strong>un</strong><small>liszt</small></span><span><strong>su</strong><small>víz</small></span><span><strong>tuz</strong><small>só</small></span><span><strong>susam</strong><small>szezám</small></span></div><button class="primary-button full" data-next>Nézzük, mit csinál a pék <span>→</span></button>`
  },
  {
    eyebrow: 'A konyha mozdulatai', title: 'Mit csinál éppen?',
    lead: 'A pék gyúr, formáz vagy süt. A cselekvésekből lesz reggeli.',
    ali: () => ({ knead: 'Hamur yoğuruyor. Tésztát gyúr. Itt kezdődik minden.', shape: 'Simit yapıyor. Simitet formáz. A karika most kap alakot.', bake: 'Simit pişiriyor. Simitet süt. Innen jön az illat.' })[adventure.kitchenAction] || 'Figyeld a kezét. A szó utána könnyebben megmarad.',
    whisper: 'yoğurmak · gyúrni | yapmak · készíteni | pişirmek · sütni, főzni',
    body: () => adventure.kitchenAction ? `<button class="primary-button full" data-next>Üljünk le reggelizni <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-kitchen-action="knead"><strong>Hamur yoğuruyor.</strong><small>Tésztát gyúr.</small></button></div><div class="question-choice"><button data-kitchen-action="shape"><strong>Simit yapıyor.</strong><small>Simitet készít.</small></button></div><div class="question-choice"><button data-kitchen-action="bake"><strong>Simit pişiriyor.</strong><small>Simitet süt.</small></button></div></div>`
  },
  {
    eyebrow: 'Isztambuli reggeli', title: 'A simit ritkán marad egyedül.',
    lead: 'Tea, sajt, paradicsom vagy olajbogyó kerülhet mellé. Nem szabály, inkább egy nyitott meghívás.',
    ali: 'Az asztalon mindig lehet még egy kis hely. Ez a reggeli legfontosabb hozzávalója.',
    whisper: () => adventure.savedSimitCulture ? 'A közös reggeli bekerült az útinaplódba.' : 'A simit utcai étel és közös reggeli egyszerre.',
    body: () => `<div class="culture-card"><span class="culture-mark">◌</span><div><strong>kahvaltı</strong><p>reggeli</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Tegyünk még az asztalra</button><button class="quiet-choice" data-save-simit>${adventure.savedSimitCulture ? '✓ Az útinaplóban' : 'Ezt a reggelt elteszem'}</button></div>`
  },
  {
    eyebrow: 'Van még egy hely', title: 'Kivel osztod meg?',
    lead: 'A simitet ketté lehet törni. Ali most nem a helyes választ keresi, hanem helyet kínál valakinek.',
    ali: () => ({ ali: 'Benimle. Velem. Akkor felezzünk — de a nagyobbik felet természetesen neked adom.', friend: 'Arkadaşımla. A barátommal. Egy reggeli máris meghívás lett.', family: 'Ailemle. A családommal. Akkor több tea is kell az asztalra.' })[adventure.breakfastCompany] || 'Egy jó vendégváró előbb tesz még egy poharat az asztalra, és csak utána kérdez.',
    whisper: 'Kiminle? · Kivel?',
    body: () => adventure.breakfastCompany ? `<button class="primary-button full" data-next>Ez már közös reggeli <span>→</span></button>` : `<div class="choice-row"><button data-breakfast-company="ali">Alival</button><button data-breakfast-company="friend">Egy baráttal</button><button data-breakfast-company="family">A családdal</button></div>`
  },
  {
    eyebrow: 'Útinapló · 08', title: 'A reggelnek már van íze.',
    lead: 'Rendeltél, italt választottál, ízt neveztél meg, és belestél a pékség mindennapi mozdulataiba.',
    ali: 'A morzsákat itt hagyhatjuk. A mondatokat visszük tovább. A következő udvarban egy kicsit halkabban beszélünk majd.',
    whisper: 'Következő állomás: Blue Mosque Courtyard',
    body: () => `<div class="journal-card"><span>Simitçi · 08:35</span><strong>${escapeHtml(adventure.name || 'A vendég')} reggelije</strong><p>${adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.'}<br>${adventure.bakeryDrink === 'coffee' ? 'Kahve istiyorum.' : adventure.bakeryDrink === 'water' ? 'Su istiyorum.' : 'Çay istiyorum.'}<br>${adventure.simitTaste === 'warm' ? 'Sıcak.' : adventure.simitTaste === 'crunchy' ? 'Çıtır.' : 'Çok lezzetli.'}</p><small>${adventure.savedSimitCulture ? 'Emlék: kahvaltı — a közös reggeli' : 'Emlék: friss simit illata'}</small></div><button class="primary-button full" data-start-mosque>Tovább a csendes udvar felé <span>→</span></button>`
  }
];

const mosqueScenes = [
  {
    eyebrow: 'Sultanahmet · 10:10', title: 'Az udvarban más a tempó.',
    lead: 'A város hangja az árkádok alatt halkabb lesz. Ali nem sürget: előbb hagyja, hogy körülnézz.',
    ali: () => adventure.mosquePace === 'stop' ? 'Álljunk meg. Van időnk. Egy hely néha akkor mutatkozik be, amikor nem beszélünk.' : adventure.mosquePace === 'walk' ? 'Sétáljunk lassan. Nem kell mindent egyszerre látni.' : 'Te mondod meg, mikor induljunk tovább.',
    whisper: 'A tisztelet első jele itt is az, hogy figyelünk.',
    body: () => adventure.mosquePace ? `<button class="primary-button full" data-next>Nézzük meg közelebbről <span>→</span></button>` : `<div class="choice-row"><button data-mosque-pace="stop">Álljunk meg egy percre</button><button data-mosque-pace="walk">Sétáljunk lassan</button></div>`
  },
  {
    eyebrow: 'Tájékozódás', title: 'Giriş nerede?',
    lead: 'Hol van a bejárat? Egy egyszerű kérdés, amely nem feltételezi, hogy már mindent tudsz.',
    ali: () => adventure.mosqueDirection === 'ask' ? 'Giriş nerede? Tökéletes. A mutatott irányt már a szemeddel is követheted.' : adventure.mosqueDirection === 'follow' ? 'Kövessük a jelzést. Néha a város válaszol kérdés nélkül.' : 'Ha bizonytalan vagy, kérdezni mindig tiszteletteljesebb, mint találgatni.',
    whisper: 'giriş · bejárat | nerede? · hol?',
    body: () => adventure.mosqueDirection ? `<button class="primary-button full" data-next>Megvan a bejárat <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-mosque-direction="ask"><strong>Giriş nerede?</strong><small>Hol van a bejárat?</small></button></div><div class="question-choice"><button data-mosque-direction="follow"><strong>İşareti takip edelim.</strong><small>Kövessük a jelzést.</small></button></div></div>`
  },
  {
    eyebrow: 'A küszöbnél', title: 'Ayakkabılarımı çıkarıyorum.',
    lead: 'Leveszem a cipőmet. A látogatói szabályokat mindig a helyszíni jelzések és az ott dolgozók útmutatása szerint követjük.',
    ali: () => adventure.mosqueShoes === 'ready' ? 'Köszönöm. Tedd oda, ahová mutatják — így a következő vendég is tudni fogja, mi a rend.' : adventure.mosqueShoes === 'ask' ? 'Ayakkabılarımı nereye koyabilirim? Jó kérdés: hová tehetem a cipőmet?' : 'Nem kell előre mindent ismerned. Elég, ha figyelsz és kérdezel.',
    whisper: 'ayakkabı · cipő | çıkarmak · levenni',
    body: () => adventure.mosqueShoes ? `<button class="primary-button full" data-next>Beléphetünk <span>→</span></button>` : `<div class="choice-row"><button data-mosque-shoes="ready"><strong>Ayakkabılarımı çıkarıyorum.</strong><small>Leveszem a cipőmet.</small></button><button data-mosque-shoes="ask"><strong>Nereye koyabilirim?</strong><small>Hová tehetem?</small></button></div>`
  },
  {
    eyebrow: 'Mielőtt fényképeznél', title: 'Fotoğraf çekebilir miyim?',
    lead: 'Fényképezhetek? A kérdés fontosabb, mint maga a kép: embereket és vallási pillanatokat nem kezelünk díszletként.',
    ali: () => adventure.mosquePermission === 'ask' ? 'Kérdeztél. Most már a válaszhoz igazodunk — az igenhez és a nemhez is.' : adventure.mosquePermission === 'keep' ? 'Most nem készítesz képet. Van, amit jobb emlékként hazavinni.' : 'A kamera előtt mindig nézz körül: kit és mit zavarna meg?',
    whisper: 'çekebilir miyim? · készíthetek? | fotoğraf · fénykép',
    body: () => adventure.mosquePermission ? `<button class="primary-button full" data-next>Most inkább nézzünk <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-mosque-permission="ask"><strong>Fotoğraf çekebilir miyim?</strong><small>Fényképezhetek?</small></button></div><div class="question-choice"><button data-mosque-permission="keep"><strong>Sadece bakacağım.</strong><small>Csak nézni fogok.</small></button></div></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Mit vettél észre először?',
    lead: 'A kupolát, az íveket vagy a kék csempéket? A részletek segítenek nevet adni annak, amit látsz.',
    ali: () => ({ dome: 'Kubbe. Kupola. Mintha az ég egy darabja beljebb költözött volna.', arch: 'Kemer. Boltív. Egyik nyílás hívja a következőt.', tile: 'Çini. Díszcsempe. Innen érthető meg igazán a Kék mecset neve.' })[adventure.mosqueDetail] || 'Ne azt keresd, amit kötelező látni. Azt mondd, ami magától megállított.',
    whisper: 'kubbe · kupola | kemer · boltív | çini · díszcsempe',
    body: () => adventure.mosqueDetail ? `<button class="primary-button full" data-next>Nézzünk még egy kicsit <span>→</span></button>` : `<div class="word-chips body-choices"><button data-mosque-detail="dome"><strong>kubbe</strong><small>kupola</small></button><button data-mosque-detail="arch"><strong>kemer</strong><small>boltív</small></button><button data-mosque-detail="tile"><strong>çini</strong><small>díszcsempe</small></button></div>`
  },
  {
    eyebrow: 'Egy halk mondat', title: 'Çok güzel.',
    lead: 'Nagyon szép. Néha ennyi elég; nem minden benyomást kell hosszú magyarázattá alakítani.',
    ali: 'Çok güzel. Mondd halkan. Nem azért, mert titok — hanem mert illik ehhez a pillanathoz.',
    whisper: 'çok · nagyon | güzel · szép',
    body: () => `<div class="phrase-card"><span class="phrase-label">Amit most érzel</span><strong>Çok güzel.</strong><span class="pronunciation">Nagyon szép.</span></div><button class="primary-button full" data-next>Maradjunk csendben <span>→</span></button>`
  },
  {
    eyebrow: 'A közös csend', title: 'Sessiz olalım mı?',
    lead: 'Maradjunk csendben? Ali nem tölti ki beszéddel azt a helyet, amelynek saját hangja van.',
    ali: () => adventure.mosqueQuiet === 'quiet' ? 'Rendben. Most csak itt vagyunk.' : adventure.mosqueQuiet === 'outside' ? 'Menjünk ki az udvarra. Ott újra beszélhetünk.' : 'A csend nem feladat. Csak egy lehetőség.',
    whisper: 'sessiz · csendes | olalım mı? · legyünk?',
    body: () => adventure.mosqueQuiet ? `<button class="primary-button full" data-next>Indulhatunk tovább <span>→</span></button>` : `<div class="choice-row"><button data-mosque-quiet="quiet">Maradjunk csendben</button><button data-mosque-quiet="outside">Menjünk vissza az udvarra</button></div>`
  },
  {
    eyebrow: 'Vendégként egy élő helyen', title: 'Nem látványosságba érkeztél.',
    lead: 'A mecset egyszerre kulturális örökség és működő vallási tér. A látogatás alkalmazkodik az imaidőhöz, a helyszíni rendhez és az ott lévő emberekhez.',
    ali: 'A jó vendég nem azt kérdezi először, mit vihet haza. Hanem azt, hogyan lehet itt úgy jelen, hogy helyet hagyjon másoknak.',
    whisper: () => adventure.savedMosqueCulture ? 'A tiszteletteljes érkezés bekerült az útinaplódba.' : 'A figyelem itt fontosabb minden ellenőrzőlistánál.',
    body: () => `<div class="culture-card"><span class="culture-mark">◇</span><div><strong>saygı</strong><p>tisztelet</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Vissza az udvarra</button><button class="quiet-choice" data-save-mosque>${adventure.savedMosqueCulture ? '✓ Az útinaplóban' : 'Ezt megőrzöm'}</button></div>`
  },
  {
    eyebrow: 'Távozáskor', title: 'Teşekkür ederim.',
    lead: 'Köszönöm. Ugyanaz a mondat, amelyet a teázóban használtál, itt másfajta figyelmet zár le.',
    ali: () => adventure.mosqueThanks === 'thanks' ? 'Teşekkür ederim. A hála sok ajtón ugyanúgy fér át.' : adventure.mosqueThanks === 'goodday' ? 'İyi günler. Szép napot. Egy kedves elköszönés mindig elfér.' : 'Távozáskor sem kell nagy mondat. Csak olyan, amelynek helye van.',
    whisper: 'teşekkür ederim · köszönöm | iyi günler · szép napot',
    body: () => adventure.mosqueThanks ? `<button class="primary-button full" data-next>Menjünk ki a fénybe <span>→</span></button>` : `<div class="choice-row"><button data-mosque-thanks="thanks"><strong>Teşekkür ederim.</strong><small>Köszönöm.</small></button><button data-mosque-thanks="goodday"><strong>İyi günler.</strong><small>Szép napot.</small></button></div>`
  },
  {
    eyebrow: 'Útinapló · 09', title: 'Úgy távoztál, hogy közben helyet hagytál.',
    lead: 'Bejáratot kérdeztél, alkalmazkodtál a hely rendjéhez, engedélyt kértél, és szavakat adtál néhány építészeti részletnek.',
    ali: 'Most menjünk vissza a vízhez. Ott a város megint hangosabb lesz — de a csendből valami velünk jön.',
    whisper: 'Következő állomás: Waterfront Promenade',
    body: () => `<div class="journal-card"><span>Sultanahmet · 10:10</span><strong>${escapeHtml(adventure.name || 'A vendég')} csendes látogatása</strong><p>Giriş nerede?<br>${adventure.mosquePermission === 'keep' ? 'Sadece bakacağım.' : 'Fotoğraf çekebilir miyim?'}<br>Çok güzel.<br>${adventure.mosqueThanks === 'goodday' ? 'İyi günler.' : 'Teşekkür ederim.'}</p><small>${adventure.savedMosqueCulture ? 'Emlék: saygı — tisztelettel érkezni' : 'Emlék: fény az udvar kövén'}</small></div><button class="primary-button full" data-start-waterfront>Menjünk vissza a vízhez <span>→</span></button>`
  }
];

const waterfrontScenes = [
  {
    eyebrow: 'Vízpart · 16:25', title: 'Az eső éppen elállt.',
    lead: 'A kövek tükrözik a lámpákat, a kompok tovább járnak, és a levegő sósabbnak tűnik.',
    ali: () => ({ cool: 'Hava serin. Hűvös az idő. Jólesik egy kicsit gyorsabban sétálni.', rainy: 'Hava yağmurlu. Esős az idő. Isztambul ilyenkor kétszer látszik: egyszer a városban, egyszer a köveken.', fresh: 'Hava ferah. Friss a levegő. Vegyünk egy nagy levegőt.' })[adventure.waterfrontWeather] || 'Most már te mondd meg, milyen a város levegője.',
    whisper: 'hava · idő, levegő | serin · hűvös | yağmurlu · esős | ferah · friss, üdítő',
    body: () => adventure.waterfrontWeather ? `<button class="primary-button full" data-next>Sétáljunk tovább <span>→</span></button>` : `<div class="choice-row"><button data-waterfront-weather="cool"><strong>Hava serin.</strong><small>Hűvös az idő.</small></button><button data-waterfront-weather="rainy"><strong>Hava yağmurlu.</strong><small>Esős az idő.</small></button><button data-waterfront-weather="fresh"><strong>Hava ferah.</strong><small>Friss a levegő.</small></button></div>`
  },
  {
    eyebrow: 'Egy utcai gyümölcsösnél', title: 'Mit vinnél magaddal?',
    lead: 'Mandarin, alma és gránátalma színesíti a kis standot. Ali most nem választ helyetted.',
    ali: () => ({ mandarin: 'Mandalina. Mandarin. Könnyű meghámozni séta közben.', apple: 'Elma. Alma. Egyszerű, ismerős választás.', pomegranate: 'Nar. Gránátalma. Egy gyümölcs, amely belül egész mozaikot rejt.' })[adventure.waterfrontFruit] || 'Válassz olyat, amit valóban szívesen ennél.',
    whisper: 'mandalina · mandarin | elma · alma | nar · gránátalma',
    body: () => adventure.waterfrontFruit ? `<button class="primary-button full" data-next>Kérjünk belőle <span>→</span></button>` : `<div class="word-chips body-choices"><button data-waterfront-fruit="mandarin"><strong>mandalina</strong><small>mandarin</small></button><button data-waterfront-fruit="apple"><strong>elma</strong><small>alma</small></button><button data-waterfront-fruit="pomegranate"><strong>nar</strong><small>gránátalma</small></button></div>`
  },
  {
    eyebrow: 'Mennyit kérsz?', title: 'Bir kilo, lütfen.',
    lead: 'Egy kilót, kérek. Ha ez sok lenne a sétához, fél kilót is kérhetsz.',
    ali: () => adventure.fruitAmount === 'half' ? 'Yarım kilo, lütfen. Fél kilót, kérek. Pont elég két sétálónak.' : adventure.fruitAmount === 'one' ? 'Bir kilo, lütfen. Egy kilót, kérek. Lesz mit megosztani.' : 'A lütfen ismét visszatért. Már régi ismerős.',
    whisper: 'yarım · fél | kilo · kilogramm',
    body: () => adventure.fruitAmount ? `<button class="primary-button full" data-next>Kérdezzük meg az árát <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-fruit-amount="half"><strong>Yarım kilo, lütfen.</strong><small>Fél kilót, kérek.</small></button></div><div class="question-choice"><button data-fruit-amount="one"><strong>Bir kilo, lütfen.</strong><small>Egy kilót, kérek.</small></button></div></div>`
  },
  {
    eyebrow: 'Egy ismerős kérdés', title: 'Bir kilosu ne kadar?',
    lead: 'Mennyibe kerül egy kiló? A bazári kérdés most pontosabb formában tér vissza a gyümölcsösnél.',
    ali: () => adventure.waterfrontPrice === 'short' ? 'Ne kadar? Röviden is megértik, különösen, ha a gyümölcsre mutatsz.' : adventure.waterfrontPrice === 'kilo' ? 'Bir kilosu ne kadar? Pontosan azt kérdezted, amire kíváncsi vagy.' : 'Ugyanazt kétféle részletességgel is megkérdezheted.',
    whisper: 'ne kadar? · mennyibe kerül? | bir kilosu · egy kilója',
    body: () => adventure.waterfrontPrice ? `<button class="primary-button full" data-next>Megvan, köszönjük <span>→</span></button>` : `<div class="choice-row"><button data-waterfront-price="short"><strong>Ne kadar?</strong><small>Mennyibe kerül?</small></button><button data-waterfront-price="kilo"><strong>Bir kilosu ne kadar?</strong><small>Mennyibe kerül egy kiló?</small></button></div>`
  },
  {
    eyebrow: 'A séta folytatása', title: 'Sonra ne yapalım?',
    lead: 'Mit csináljunk utána? Most már nem programot teljesítesz: közös tervet készítesz.',
    ali: () => ({ ferry: 'Vapura binelim. Szálljunk kompra. A vízről már ismerős lesz a város.', tea: 'Çay içelim. Igyunk teát. Erre számítottam.', walk: 'Biraz daha yürüyelim. Sétáljunk még egy kicsit. Van időnk.' })[adventure.waterfrontPlan] || 'Én mindháromnak örülnék. De ez most a te Isztambulod is.',
    whisper: 'sonra · utána | ne yapalım? · mit csináljunk?',
    body: () => adventure.waterfrontPlan ? `<button class="primary-button full" data-next>Jó terv <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-waterfront-plan="ferry"><strong>Vapura binelim.</strong><small>Szálljunk kompra.</small></button></div><div class="question-choice"><button data-waterfront-plan="tea"><strong>Çay içelim.</strong><small>Igyunk teát.</small></button></div><div class="question-choice"><button data-waterfront-plan="walk"><strong>Biraz daha yürüyelim.</strong><small>Sétáljunk még egy kicsit.</small></button></div></div>`
  },
  {
    eyebrow: 'Ali most téged kérdez', title: 'İstanbul nasıl?',
    lead: 'Milyen Isztambul? Az első napon talán képeslapot mondtál volna. Most már saját emlékeidből válaszolsz.',
    ali: () => ({ familiar: 'Tanıdık. Ismerős. Pont ezt reméltem — nem azt, hogy mindent tudj róla.', lively: 'Canlı. Élénk. Még a csendes udvar után is igaz.', warm: 'Samimi. Barátságos, közvetlen. Akkor jól fogadott bennünket.' })[adventure.cityFeeling] || 'Nem a várost vizsgáztatjuk. Csak megkérdezzük, milyen érzés most benne lenni.',
    whisper: 'tanıdık · ismerős | canlı · élénk | samimi · közvetlen, barátságos',
    body: () => adventure.cityFeeling ? `<button class="primary-button full" data-next>Most már értem <span>→</span></button>` : `<div class="choice-row"><button data-city-feeling="familiar"><strong>Tanıdık.</strong><small>Ismerős.</small></button><button data-city-feeling="lively"><strong>Canlı.</strong><small>Élénk.</small></button><button data-city-feeling="warm"><strong>Samimi.</strong><small>Barátságos.</small></button></div>`
  },
  {
    eyebrow: 'A mondatok, amelyek veled jöttek', title: 'Már nem különálló szavak.',
    lead: 'Köszöntél, rendeltél, kérdeztél, választottál, segítséget kértél és megköszöntél valamit.',
    ali: 'Nem leckéket vittél végig. Egy napot éltél végig — a török nyelv pedig közben rád ragadt.',
    whisper: 'Merhaba. · Lütfen. · Ne kadar? · Nerede? · Teşekkür ederim.',
    body: () => `<div class="intro-card"><span>A te kis útiszótárad</span><strong>Merhaba.</strong><small>Szia.</small><strong>Bir çay, lütfen.</strong><small>Egy teát, kérek.</small><strong>Ne kadar?</strong><small>Mennyibe kerül?</small><strong>Teşekkür ederim.</strong><small>Köszönöm.</small></div><button class="primary-button full" data-next>Ezek már velem jönnek <span>→</span></button>`
  },
  {
    eyebrow: 'A vízpart hétköznapja', title: 'A város nem áll meg a történet végén.',
    lead: 'Horgászok maradnak a korlátnál, kompok indulnak, teát visznek az asztalokhoz. Isztambul nélkületek is tovább él.',
    ali: 'Ezért tudsz majd visszajönni. Nem díszletet hagysz itt, hanem egy várost, amely holnap is felébred.',
    whisper: () => adventure.savedWaterfrontCulture ? 'A vízpart hétköznapi ritmusa bekerült az útinaplódba.' : 'Nem kell minden pillanatnak különlegesnek lennie ahhoz, hogy emlékezetes maradjon.',
    body: () => `<div class="culture-card"><span class="culture-mark">≈</span><div><strong>gündelik hayat</strong><p>hétköznapi élet</p></div></div><div class="adventure-actions"><button class="primary-button" data-next>Sétáljunk még</button><button class="quiet-choice" data-save-waterfront>${adventure.savedWaterfrontCulture ? '✓ Az útinaplóban' : 'Ezt a ritmust elteszem'}</button></div>`
  },
  {
    eyebrow: 'Nem búcsú, csak egy mondat', title: 'Görüşürüz.',
    lead: 'Viszlát. Szó szerint: még látjuk egymást. Ali nem zárja le végleg az utat.',
    ali: () => adventure.aliFarewell === 'again' ? 'Görüşürüz. Még látjuk egymást. Én itt leszek.' : adventure.aliFarewell === 'soon' ? 'Yakında görüşürüz. Hamarosan találkozunk. Addig a város őrzi a helyed.' : 'Nem kell most elbúcsúzni. Csak mondd úgy, hogy legyen benne visszatérés.',
    whisper: 'görüşürüz · viszlát, még látjuk egymást | yakında · hamarosan',
    body: () => adventure.aliFarewell ? `<button class="primary-button full" data-next>Még egy pillanat <span>→</span></button>` : `<div class="question-list"><div class="question-choice"><button data-ali-farewell="again"><strong>Görüşürüz.</strong><small>Még látjuk egymást.</small></button></div><div class="question-choice"><button data-ali-farewell="soon"><strong>Yakında görüşürüz.</strong><small>Hamarosan találkozunk.</small></button></div></div>`
  },
  {
    eyebrow: 'Útinapló · 10', title: 'Isztambul már ismerős.',
    lead: 'Tíz állomás, száz pillanat. Nem tantermet hagysz el, hanem egy várost, amelyben már tudod, hogyan kérj, figyelj, válassz és kapcsolódj.',
    ali: 'Vendégként érkeztél. Most már tudod, hol ülnél le teázni, melyik kompot választanád, és hogyan mondanád: még találkozunk.',
    whisper: 'Isztambul már vár. Most már egy kicsit ismer is.',
    body: () => `<div class="journal-card"><span>İstanbul · az első utad</span><strong>${escapeHtml(adventure.name || 'A vendég')} már nem idegen</strong><p>Merhaba.<br>Bir çay, lütfen.<br>İstanbul çok güzel.<br>${adventure.aliFarewell === 'soon' ? 'Yakında görüşürüz.' : 'Görüşürüz.'}</p><small>${adventure.savedWaterfrontCulture ? 'Emlék: gündelik hayat — a város hétköznapi ritmusa' : 'Emlék: fények az eső utáni vízparton'}</small></div><div class="adventure-actions"><button class="primary-button" data-complete-journey>Tedd el az utat</button><button class="quiet-choice" data-restart>Egyszer még végigsétálom</button></div>`
  }
];

// Day 1 Golden Path: a rövidebb, szerkesztett első út. A régi, mélyebb
// jelenetek megmaradnak a tudásréteghez, de nem terhelik az első élményt.
const goldenGalataScenes = [
  {
    eyebrow: 'Galata híd · Első pillanat', title: 'Odaállhatok melléd?',
    lead: 'A város még csak ébredezik. A víz felől sirályok hallatszanak.',
    ali: () => adventure.arrival === 'look' ? 'Persze. Megvárlak. A város nem megy sehová.' : 'Merhaba. Én Ali vagyok. Nem kell sietnünk.',
    whisper: () => adventure.arrival === 'look' ? 'Ali is a víz felé fordul. Egy pillanatig egyikőtök sem beszél.' : 'Előbb megérkezünk. A többi ráér.',
    body: () => adventure.arrival === 'look'
      ? `<button class="primary-button full" data-arrival="join">Most odaállok melléd <span>→</span></button>`
      : `<div class="choice-row"><button data-arrival="join">Odamegyek Alihoz</button><button data-arrival="look">Előbb csak körülnézek</button></div>`
  },
  {
    eyebrow: 'Az első köszönés', title: 'Egy szó elég az induláshoz.',
    lead: 'Nem a tökéletes kiejtés számít. Az, hogy válaszolsz a fogadtatásra.',
    ali: () => adventure.greeting === 'wave' ? 'Ali visszainteget. Egy mosoly néha minden nyelven ugyanaz.' : adventure.greeting === 'word' ? 'Merhaba! Most már valóban találkoztunk.' : 'Mondhatod, meghallgathatod, vagy csak inthetsz. Mindegyik válasz.',
    whisper: 'Merhaba · szia, üdvözöllek',
    body: () => adventure.greeting
      ? `<div class="phrase-card compact"><span class="phrase-label">Az első ismerős szavad</span><strong>Merhaba.</strong><span>Szia.</span></div><button class="primary-button full" data-next>Menjünk tovább <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Ha szeretnéd</span><strong>Merhaba.</strong><span class="pronunciation">mer-há-bá</span></div><div class="choice-row"><button data-greeting="word">Merhaba</button><button data-greeting="wave">Visszaintek</button></div>`
  },
  {
    eyebrow: 'Most te jössz — ha szeretnéd', title: 'Hogy szólíthatlak?',
    lead: 'A neved nem feladat. Csak jó tudni, kivel sétálok.',
    ali: 'Ha most nem szeretnéd megadni, vendégemnek hívlak. Az is szép szó.',
    whisper: 'Ezt később bármikor megváltoztathatod.',
    body: () => `<form class="guest-form" data-name-form><label for="guest-name">A neved</label><input id="guest-name" name="name" maxlength="32" autocomplete="given-name" placeholder="Írd ide, ha szeretnéd" value="${escapeHtml(adventure.name)}"><button class="primary-button" type="submit">Így hívnak <span>→</span></button><button class="text-button" data-skip-name type="button">Most még maradok vendég</button></form>`
  },
  {
    eyebrow: 'Az első közös döntés', title: 'Merre induljunk?',
    lead: 'Ali nem útvonalat oszt ki. Megkérdezi, mihez van kedved.',
    ali: () => adventure.question === 'view' ? 'Akkor még egy pillanat a hídon. Utána teázunk.' : adventure.question === 'tea' ? 'Jó. Karaköyben már csörrennek a poharak.' : `${adventure.name || 'Vendégem'}, a hidat nézzük meg előbb, vagy menjünk teázni?`,
    whisper: () => adventure.question === 'view' ? 'Ali megjegyzi: szeretsz előbb körülnézni.' : adventure.question === 'tea' ? 'Ali elmosolyodik. Pont erre várt.' : 'A választásod a következő pillanat hangulatát változtatja meg.',
    body: () => adventure.question
      ? `<button class="primary-button full" data-next>Indulhatunk <span>→</span></button>`
      : `<div class="choice-row"><button data-question="view">Még nézzük a vizet</button><button data-question="tea">Menjünk teázni</button></div>`
  },
  {
    eyebrow: 'Útinapló · 01', title: 'Megérkeztél.',
    lead: 'Nem teljesítettél egy leckét. Volt egy első reggeled a Galata hídon.',
    ali: `${adventure.name || 'Vendégem'}, az első török szavad nem feladat volt. Köszönés volt.`,
    whisper: 'A város mostantól egy kicsit ismerős.',
    body: () => `<div class="journal-card"><span>Galata · 07:12</span><strong>${escapeHtml(adventure.name || 'Egy kíváncsi vendég')} első isztambuli reggele</strong><p>Merhaba.</p><small>${adventure.question === 'view' ? 'Emlék: még egy csendes perc a víznél' : 'Emlék: Karaköy felől poharak csörrenése'}</small></div><button class="primary-button full" data-next>Tedd el ezt a reggelt <span>→</span></button>`
  },
  {
    eyebrow: 'Galata → Karaköy', title: 'Gyere. Ismerek egy helyet.',
    lead: 'A híd túloldalán már forró a tea. Ali nem vezet előtted — melletted indul el.',
    ali: adventure.question === 'view' ? 'Köszönöm, hogy megálltunk. Most már jöhet a tea.' : 'Jól időzítettünk. Talán még az ablaknál is lesz hely.',
    whisper: 'Következő állomás: Karaköy · 08:20',
    image: 'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time: '08:20', caption: 'Karaköyben már forró a tea.', postmark: 'Karaköy', postmarkMeta: '08:20 · Bir çay?',
    body: () => `<div class="handoff-card"><span>Következő állomás · 02</span><strong>Az első tea</strong><p>Most már nem Ali rendel helyetted.</p><em>Bir çay, lütfen.</em></div><button class="primary-button full" data-finish>Kezdjük egy teával <span>→</span></button>`
  }
];

const goldenKarakoyScenes = [
  {
    eyebrow: 'Karaköy · 08:20', title: 'Hová üljünk?',
    lead: 'Bent csendesebb. Kint jobban látni, ahogy felébred az utca.',
    ali: () => adventure.seat === 'window' ? 'Kint maradunk. Innen a város is velünk reggelizik.' : adventure.seat === 'counter' ? 'Bent ülünk le. Innen hallani, hogyan készül a tea.' : 'Te választasz. Én mindkét helyen tudok várni.',
    whisper: 'A helyed a jelenet hangulatát is megváltoztatja.',
    body: () => adventure.seat ? `<button class="primary-button full" data-next>Üljünk le <span>→</span></button>` : `<div class="choice-row"><button data-seat="window">Kint, az utcánál</button><button data-seat="counter">Bent, a pult közelében</button></div>`
  },
  {
    eyebrow: 'Ali kínál', title: 'Kérsz egy teát?',
    lead: 'A vendégszeretet nem azt jelenti, hogy Ali dönt helyetted.',
    ali: () => adventure.tea === 'gesture' ? 'Rendben. Most csak leülünk. A tea nem belépőjegy.' : adventure.tea === 'say' ? 'Akkor most te kéred. Én itt maradok melletted.' : 'Çay? Tea? Kérsz?',
    whisper: 'A nemet is ugyanolyan természetesen fogadja.',
    body: () => adventure.tea ? `<button class="primary-button full" data-next>${adventure.tea === 'say' ? 'Megpróbálom kérni' : 'Maradjunk egy kicsit'} <span>→</span></button>` : `<div class="choice-row"><button data-tea="say">Kérek egy teát</button><button data-tea="gesture">Most csak leülnék</button></div>`
  },
  {
    eyebrow: 'A rendelés', title: () => adventure.tea === 'gesture' ? 'A mondat megvár.' : 'Egy tea. Semmi több.',
    lead: () => adventure.tea === 'gesture' ? 'Ali nem sürget. A mondatot elég most felismerned.' : 'Egyetlen mondat elég ahhoz, hogy a reggel valóban elkezdődjön.',
    ali: () => adventure.tea === 'gesture' ? 'Hallgasd meg. Talán legközelebb már te mondod.' : adventure.heardTea ? 'Most már ismerősen hangzik. Ha készen állsz, kérd úgy, ahogy sikerül.' : 'Nem a kiejtésedet figyelem. Azt, hogy mersz-e kérni.',
    whisper: 'Bir çay, lütfen. · Egy teát, kérek.',
    body: () => adventure.tea === 'gesture'
      ? `<div class="phrase-card compact"><span class="phrase-label">Ma elég felismerni</span><strong>Bir çay, lütfen.</strong><span>Egy teát, kérek.</span></div><button class="primary-button full" data-next>Most csak figyelek <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">A te mondatod</span><strong>Bir çay, lütfen.</strong><span class="pronunciation">bir csáj, lütfen</span></div>${adventure.heardTea ? '<button class="primary-button full" data-next>A tea úton van <span>→</span></button>' : '<div class="choice-row"><button data-hear-tea>Előbb meghallgatom</button><button data-next>Kimondom</button></div>'}`
  },
  {
    eyebrow: 'Egy apró részlet', title: 'Şekerli mi?',
    lead: 'A pincér azt kérdezi: cukorral kéred? Elég választani; ezt most nem kell megtanulnod.',
    ali: () => adventure.sugar === 'yes' ? 'Cukorral. Megjegyzem.' : adventure.sugar === 'no' ? 'Cukor nélkül. Megjegyzem.' : 'A csészédet te ismered a legjobban.',
    whisper: 'Felismerés, nem új feladat.',
    body: () => adventure.sugar ? `<button class="primary-button full" data-next>Jöhet a tea <span>→</span></button>` : `<div class="choice-row"><button data-sugar="yes">Cukorral</button><button data-sugar="no">Cukor nélkül</button></div>`
  },
  {
    eyebrow: 'Amikor megérkezik', title: 'Teşekkür ederim.',
    lead: 'A köszönet akkor jelenik meg, amikor valaki leteszi eléd a teát — vagy helyet csinál az asztalnál.',
    ali: 'Ezt nem kell külön gyakorolni. Mondd nekem, én pedig elhiszem, hogy én hoztam a teát.',
    whisper: 'Teşekkür ederim. · Köszönöm.',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">A második mondatod</span><strong>Teşekkür ederim.</strong><span>Köszönöm.</span></div><button class="primary-button full" data-next>Megköszönöm <span>→</span></button>`
  },
  {
    eyebrow: 'Útinapló · 02', title: 'Volt egy reggeled Karaköyben.',
    lead: 'Helyet választottál, és a tea is úgy érkezett, ahogy szereted.',
    ali: () => adventure.question === 'view' ? 'Tudtam, hogy jó volt előbb megállni a hídon. Most sem kell sietnünk.' : 'A komp hamarosan indul. A teát azért idd meg — Isztambul megvár.',
    whisper: 'Következő állomás: Boszporusz-komp · 11:05',
    body: () => `<div class="journal-card"><span>Karaköy · 08:20</span><strong>${escapeHtml(adventure.name || 'A vendég')} helye az asztalnál</strong><p>${adventure.tea === 'gesture' ? 'Ma elég volt felismerni: Bir çay, lütfen.' : 'Bir çay, lütfen.'}<br>Teşekkür ederim.</p><small>${adventure.sugar === 'yes' ? 'Emlék: a cukros tea' : 'Emlék: a tea cukor nélkül'}</small></div><button class="primary-button full" data-start-ferry>Menjünk a komphoz <span>→</span></button>`
  }
];

const goldenFerryScenes = [
  {
    eyebrow: 'Boszporusz-komp · 11:05', title: 'Fent vagy bent?',
    lead: 'Kint szelesebb. Bent melegebb. Mindkettőből ugyanaz a város látszik, csak másképp.',
    ali: () => adventure.ferryPlace === 'deck' ? 'A fedélzet. Akkor kapaszkodj — a hajad hamarabb ér Üsküdarba, mint mi.' : adventure.ferryPlace === 'inside' ? 'Az ablak mellől nézzük. Innen a tea sem borul ki.' : 'Most te választasz helyet. Én mindkettőhöz tudok egy jó csendet.',
    whisper: 'A választott nézőpont később visszatér.',
    body: () => adventure.ferryPlace ? `<button class="primary-button full" data-next>Indulhatunk <span>→</span></button>` : `<div class="choice-row"><button data-ferry-place="deck">Fel a fedélzetre</button><button data-ferry-place="inside">Az ablak mellé</button></div>`
  },
  {
    eyebrow: 'Ali kis szótára', title: 'Vapur.',
    lead: 'Isztambulban a komp nem látványosság. Ugyanolyan hétköznapi, mint máshol a busz.',
    ali: 'Vapur. Nekem inkább egy mozgó erkély két part között.',
    whisper: 'vapur · városi komp',
    body: () => `<div class="phrase-card"><span class="phrase-label">Egy képhez kötött szó</span><strong>Vapur.</strong><span class="pronunciation">vá-pur · komp</span></div><button class="primary-button full" data-next>Nézzünk körül <span>→</span></button>`
  },
  {
    eyebrow: 'Nézd csak', title: 'Mi akadt meg a szemeden?',
    lead: 'Ali nem mondja meg, mit kell észrevenned.',
    ali: () => adventure.observed === 'man' ? 'A bajuszos férfi. Szerintem minden nap ugyanezen a helyen ül.' : adventure.observed === 'woman' ? 'A piros kendő. A szél is észrevette.' : adventure.observed === 'child' ? 'A gyerek és a sirályok. Már nem tudom, ki követ kit.' : 'Egy utas, egy sirály vagy a part. Elég egy részlet.',
    whisper: 'Csak azt mondjuk, amit valóban látunk.',
    body: () => adventure.observed ? `<button class="primary-button full" data-next>Most téged nézlek, Ali <span>→</span></button>` : `<div class="choice-row"><button data-observed="man">Egy utast</button><button data-observed="woman">Egy színes részletet</button><button data-observed="child">A sirályokat</button></div>`
  },
  {
    eyebrow: 'Ali egy részlete', title: 'Mit vettél észre rajtam?',
    lead: 'Nem kell az egész Alit egy mondatba tenni.',
    ali: () => adventure.aliFeature === 'hair' ? 'Kıvırcık saçlı. Göndör hajú. A szél szerint túlságosan is.' : adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü. Barna szemű. Jól megfigyeltél.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü. Mosolygós. Ezt nehéz volt elrejtenem.' : 'Válassz egyetlen részletet.',
    whisper: 'Egy leírás elég. Nincs nyelvtani kitérő.',
    body: () => adventure.aliFeature ? `<div class="selected-answer"><strong>${adventure.aliFeature === 'hair' ? 'Kıvırcık saçlı.' : adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : 'Güler yüzlü.'}</strong><span>${adventure.aliFeature === 'hair' ? 'Göndör hajú.' : adventure.aliFeature === 'eyes' ? 'Barna szemű.' : 'Mosolygós.'}</span></div><button class="primary-button full" data-next>Talált <span>→</span></button>` : `<div class="choice-row"><button data-ali-feature="hair">Göndör haj</button><button data-ali-feature="eyes">Barna szem</button><button data-ali-feature="smile">Mosoly</button></div>`
  },
  {
    eyebrow: 'Két part között', title: 'Most csak nézzük.',
    lead: 'A motor zúg, a sirályok közelebb jönnek. Ali most nem tölt ki minden csendet.',
    ali: () => adventure.ferryPlace === 'deck' ? 'Jó volt kijönni. Ezt a szelet este is fel fogod ismerni.' : 'Az ablakban egyszerre látszik a város és a tükröződésünk.',
    whisper: 'A tovább gomb akkor vár, amikor te készen állsz.',
    body: () => `<button class="primary-button full" data-next>Mehetünk a másik partra <span>→</span></button>`
  },
  {
    eyebrow: 'Komp → Üsküdar', title: 'A másik parton lassabban megy le a nap.',
    lead: 'A komp közeledik Üsküdarhoz. Ali visszanéz arra, amit te vettél észre.',
    ali: () => adventure.observed === 'child' ? 'A sirályok velünk jöttek. Talán ők is tudják, hová tartunk.' : adventure.observed === 'woman' ? 'A piros részlet már alig látszik mögöttünk. Az este színei most jönnek.' : 'A komp utasai szétszélednek. Mi még maradunk együtt.',
    whisper: 'A választásod nyomot hagyott az átkelésen.',
    image: 'assets/web/ALI-SCN-007-uskudar-sunset.webp', time: '19:18', caption: 'A túlparton lassul az este.', postmark: 'Üsküdar', postmarkMeta: '19:18 · İyi akşamlar',
    body: () => `<div class="handoff-card"><span>Az első nap utolsó állomása</span><strong>Naplemente Üsküdarban</strong><p>Nincs új lecke. Csak egy hely, ahol megpihenhettek.</p><em>Biraz dinlenelim.</em></div><button class="primary-button full" data-start-uskudar>Nézzük meg a naplementét <span>→</span></button>`
  }
];

const goldenUskudarScenes = [
  {
    eyebrow: 'Üsküdar · 19:18', title: 'Honnan nézzük?',
    lead: 'A vízparti lépcsőn közelebb a hullám. A teázó mellett melegebb a fény.',
    ali: () => adventure.uskudarSpot === 'steps' ? 'A lépcsőkről. Jó — innen a hullámok is beleszólnak.' : adventure.uskudarSpot === 'tea' ? 'A teázó mellől. Ma már ismerős a poharak hangja.' : 'Te választasz kilátást. A naplemente mindkettőhöz ugyanaz.',
    whisper: 'Ali a választott helyen melletted ül le, nem eléd áll.',
    body: () => adventure.uskudarSpot ? `<button class="primary-button full" data-next>Üljünk le <span>→</span></button>` : `<div class="choice-row"><button data-uskudar-spot="steps">A vízparti lépcsőhöz</button><button data-uskudar-spot="tea">A teázó mellé</button></div>`
  },
  {
    eyebrow: 'Az este köszönése', title: 'İyi akşamlar.',
    lead: 'Valaki helyet keres mellettetek, és jó estét kíván. Nem gyakorlókártya érkezett — egy ember.',
    ali: () => adventure.eveningGreeting === 'say' ? 'İyi akşamlar. Most már az este is köszönt neked.' : adventure.eveningGreeting === 'nod' ? 'A bólintást is értette. A mondat majd veled marad.' : 'Válaszolhatsz szóval vagy csak egy mosollyal.',
    whisper: 'İyi akşamlar. · Jó estét.',
    body: () => adventure.eveningGreeting ? `<button class="primary-button full" data-next>Maradjunk még <span>→</span></button>` : `<div class="choice-row"><button data-evening="say">İyi akşamlar</button><button data-evening="nod">Mosolygok és bólintok</button></div>`
  },
  {
    eyebrow: 'Egy mondat visszatér', title: 'Van időnk megállni.',
    lead: 'A pihenés nem megszakítja az utat. Ez is az út része.',
    ali: () => adventure.restChoice === 'rest' ? 'Biraz dinlenelim. Pihenjünk egy kicsit.' : adventure.restChoice === 'walk' ? 'Sétáljunk még pár lépést. Aztán megállunk.' : 'Maradjunk itt, vagy sétáljunk a part mentén?',
    whisper: 'Biraz dinlenelim. · Pihenjünk egy kicsit.',
    body: () => adventure.restChoice ? `<button class="primary-button full" data-next>A nap már lejjebb jár <span>→</span></button>` : `<div class="choice-row"><button data-rest="rest">Biraz dinlenelim</button><button data-rest="walk">Sétáljunk még egy kicsit</button></div>`
  },
  {
    eyebrow: 'A nap csendje', title: 'Nem kell mindent elmesélni.',
    lead: 'A túlpart fényei sorban kigyulladnak. Ali nem kérdez a családodról, a lakásodról vagy arról, mit tanultál.',
    ali: 'Én most a vizet nézem. Ha szeretnél, te is csak nézd.',
    whisper: 'Ez a pillanat nem vár választ.',
    body: () => `<button class="primary-button full" data-next>Ha készen állok, továbblépek <span>→</span></button>`
  },
  {
    eyebrow: 'Az első nap emléke', title: 'Mi maradjon meg?',
    lead: 'Nem pontot kapsz. Egyetlen részletet teszel el a mai napból.',
    ali: () => ({ light:'A fényt. Holnap máshonnan érkezik, de ezt az estét már felismered.', sound:'A komp hangját. Ha újra meghallod, tudni fogod, merre van a víz.', sentence:'Egy mondatot. A szavak könnyű poggyászok.', quiet:'A csendet. Ezt nem kell lefordítani.' })[adventure.sunsetMemory] || 'Én azt a pillanatot teszem el, amikor mindenki egyszerre halkul el.',
    whisper: 'A választásod holnap reggel visszatér.',
    body: () => adventure.sunsetMemory ? `<button class="primary-button full" data-next>Tegyük el <span>→</span></button>` : `<div class="choice-row"><button data-sunset-memory="light">A fényt</button><button data-sunset-memory="sound">A komp hangját</button><button data-sunset-memory="sentence">Egy mondatot</button><button data-sunset-memory="quiet">A csendet</button></div>`
  },
  {
    eyebrow: 'Az első nap vége', title: 'Holnap reggel hozok valami meleget.',
    lead: 'Nem nyílik új menü. Ali egyetlen helyre hív vissza: reggelizni.',
    ali: () => `${adventure.name || 'Vendégem'}, te csak gyere. A friss simit illatát úgysem lehet eltéveszteni.`,
    whisper: 'Görüşürüz. · Még látjuk egymást.',
    body: () => `<div class="journal-card"><span>Üsküdar · 19:18</span><strong>${escapeHtml(adventure.name || 'A vendég')} első isztambuli napja</strong><p>${adventure.eveningGreeting === 'say' ? 'İyi akşamlar.' : 'Egy csendes köszönés.'}<br>${adventure.restChoice === 'rest' ? 'Biraz dinlenelim.' : 'Még sétáltunk egy kicsit.'}</p><small>${adventure.sunsetMemory === 'light' ? 'Emlék: a túlpart fénye' : adventure.sunsetMemory === 'sound' ? 'Emlék: a komp hangja' : adventure.sunsetMemory === 'sentence' ? 'Emlék: egy mondat' : 'Emlék: a közös csend'}</small></div><button class="primary-button full" data-start-bakery>Holnap reggel találkozunk <span>→</span></button>`
  }
];

const refinedGalataScenes = [
  {
    eyebrow: 'Galata · 07:12', title: 'Merhaba.', lead: '',
    ali: () => adventure.arrival === 'look'
      ? 'Nézz csak körül. Én itt maradok melletted.'
      : 'Jó reggelt. Én Ali vagyok. Gyere, innen szép a város.',
    whisper: '',
    body: () => adventure.arrival === 'look'
      ? `<button class="primary-button full" data-arrival="join">Most már odamegyek Alihoz <span>→</span></button>`
      : `<div class="choice-row"><button data-arrival="join">Odamegyek hozzá</button><button data-arrival="look">Előbb körülnézek</button></div>`
  },
  {
    eyebrow: 'Az első köszönés', title: 'Te hogyan válaszolsz?', lead: '',
    ali: () => adventure.greeting === 'word'
      ? 'Merhaba! Most már valóban találkoztunk.'
      : adventure.greeting === 'wave'
        ? 'Ali visszainteget. Egy mosoly néha minden nyelven ugyanaz.'
        : 'Mondhatod törökül, vagy csak visszainthatsz.',
    whisper: '',
    body: () => adventure.greeting
      ? `<button class="primary-button full" data-next>Menjünk tovább <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Ha szeretnéd</span><strong>Merhaba.</strong><span>Szia.</span></div><div class="choice-row"><button data-greeting="word">Merhaba</button><button data-greeting="wave">Visszaintek</button></div>`
  },
  {
    eyebrow: 'Ha szeretnéd', title: 'Hogy szólíthatlak?', lead: '',
    ali: 'A neved nem feladat. Csak jó tudni, kivel sétálok.', whisper: '',
    body: () => `<form class="guest-form" data-name-form><label for="guest-name">A neved</label><input id="guest-name" name="name" maxlength="32" autocomplete="given-name" placeholder="Írd ide, ha szeretnéd" value="${escapeHtml(adventure.name)}"><button class="primary-button" type="submit">Így hívnak <span>→</span></button><button class="text-button" data-skip-name type="button">Most még maradok vendég</button></form>`
  },
  {
    eyebrow: 'A te első mondatod', title: `${adventure.name ? adventure.name + ', m' : 'M'}elyik országból érkeztél?`, lead: '',
    ali: 'Csak azt kérdezem meg, amit rögtön használni is fogsz.', whisper: '',
    body: () => `<form class="guest-form" data-origin-form><label for="guest-nationality">A nemzetiséged</label><select id="guest-nationality" name="nationality">${nationalitySelectOptions()}</select><div class="phrase-card compact"><span class="phrase-label">Így mondod törökül</span><strong>${nationalityCopy().tr}</strong><span>${nationalityCopy().hu}</span></div><button class="primary-button full" type="submit">Ezt már tudom mondani <span>→</span></button></form>`
  },
  {
    eyebrow: 'Galata → Karaköy', title: 'Ennyi már elég egy találkozáshoz.', lead: '',
    ali: `${adventure.name || 'Vendégem'}, most már ismerjük egymást. Karaköyben meghívlak egy teára.`,
    whisper: '',
    image: 'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time: '08:20', caption: 'Karaköyben már forró a tea.', postmark: 'Karaköy', postmarkMeta: '08:20 · Bir çay?',
    body: () => `<div class="intro-card"><span>A te kis isztambuli névjegyed</span><strong>Merhaba.${adventure.name ? ` Benim adım ${escapeHtml(adventure.name)}.` : ''}</strong><strong>${nationalityCopy().tr}</strong></div><button class="primary-button full" data-finish>Kezdjük egy teával <span>→</span></button>`
  }
];

const coherentGalataScenes = [
  {
    eyebrow: 'Galata híd · Az első találkozás',
    title: 'Ali már vár rád.',
    lead: 'Isztambul épp csak ébredezik. Ali a korlátnál áll, aztán rád mosolyog.',
    ali: () => adventure.greeting === 'word'
      ? 'Merhaba! Örülök, hogy itt vagy.'
      : adventure.greeting === 'wave'
        ? 'Ali visszainteget. „A mosoly is jó köszönés.”'
        : 'Merhaba. Ali vagyok. Gyere, nézd csak a várost.',
    whisper: '',
    body: () => adventure.greeting
      ? `<button class="primary-button full" data-next>Odaállok mellé <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Ali így köszönt</span><strong>Merhaba.</strong><span>Szia.</span></div><div class="choice-row"><button data-greeting="word">Merhaba, Ali</button><button data-greeting="wave">Mosolygok és visszaintek</button></div>`
  },
  {
    eyebrow: 'Most rajtad a sor',
    title: 'Hogy hívnak?',
    lead: 'Ali bemutatkozott. Ha van kedved, mondd meg neki a neved.',
    ali: 'Hogy szólíthatlak?', whisper: '',
    body: () => `<form class="guest-form" data-name-form><label for="guest-name">A neved</label><input id="guest-name" name="name" maxlength="32" autocomplete="given-name" placeholder="Írd ide a neved" value="${escapeHtml(adventure.name)}"><button class="primary-button" type="submit">Bemutatkozom <span>→</span></button><button class="text-button" data-skip-name type="button">Most még nem mondom meg</button></form>`
  },
  {
    eyebrow: 'Ismerkedtek tovább',
    title: `${adventure.name ? adventure.name + ', honnan' : 'Honnan'} érkeztél?`,
    lead: 'Válaszd ki a nemzetiséged, és máris látod, hogyan mondhatod el törökül.',
    ali: 'Én isztambuli vagyok. És te?', whisper: '',
    body: () => `<form class="guest-form" data-origin-form><label for="guest-nationality">A nemzetiséged</label><select id="guest-nationality" name="nationality">${nationalitySelectOptions()}</select><div class="phrase-card compact"><span class="phrase-label">Törökül így hangzik</span><strong>${nationalityCopy().tr}</strong><span>${nationalityCopy().hu}</span></div><button class="primary-button full" type="submit">Elmondom Alinak <span>→</span></button></form>`
  },
  {
    eyebrow: 'Ideje továbbindulni',
    title: 'Most már ismeritek egymást.',
    lead: 'Köszöntél, bemutatkoztál, és már az első török mondatod is megvan.',
    ali: `${adventure.name || 'Vendégem'}, ismerek Karaköyben egy jó teázót. Van kedved velem tartani?`,
    whisper: '',
    image: 'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time: '08:20', caption: 'Karaköyben már forró a tea.', postmark: 'Karaköy', postmarkMeta: '08:20 · Bir çay?',
    body: () => `<div class="intro-card"><span>Az első bemutatkozásod</span><strong>Merhaba.${adventure.name ? ` Benim adım ${escapeHtml(adventure.name)}.` : ''}</strong><strong>${nationalityCopy().tr}</strong></div><button class="primary-button full" data-finish>Menjünk teázni <span>→</span></button>`
  }
];

const coherentKarakoyScenes = [
  {
    eyebrow: 'Karaköy · Az első tea',
    title: 'Hová üljünk?',
    lead: 'A teázóban még van néhány szabad hely. Az ablaknál világosabb, a pult mellől pedig látni, hogyan készül a tea.',
    ali: () => adventure.seat === 'window'
      ? 'Üljünk az ablakhoz. Innen az utca is velünk ébred.'
      : adventure.seat === 'counter'
        ? 'Jó lesz a pult mellett. Innen biztosan nem maradunk tea nélkül.'
        : 'Te választasz. Az ablakhoz üljünk, vagy inkább a pult mellé?',
    whisper: '',
    body: () => adventure.seat
      ? `<button class="primary-button full" data-next>Leülünk <span>→</span></button>`
      : `<div class="choice-row"><button data-seat="window">Az ablakhoz</button><button data-seat="counter">A pult mellé</button></div>`
  },
  {
    eyebrow: 'Karaköy · Rendelj magadnak',
    title: 'Kérsz egy teát?',
    lead: 'Ali int a pincérnek, aztán rád néz. Most te döntöd el, mit mondasz.',
    ali: () => adventure.tea === 'say'
      ? 'Hallottad? Már készítik is.'
      : adventure.tea === 'gesture'
        ? 'Megértette. A mondatot ráérsz akkor kimondani, amikor szeretnéd.'
        : 'Ha kérsz, ennyi elég: Bir çay, lütfen.',
    whisper: '',
    body: () => adventure.tea
      ? `<button class="primary-button full" data-next>A tea már készül <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Egy teát kérek</span><strong>Bir çay, lütfen.</strong><span>bir csáj, lütfen</span></div><div class="choice-row"><button data-tea="say">Bir çay, lütfen</button><button data-tea="gesture">Most inkább rámutatok</button></div>`
  },
  {
    eyebrow: 'Karaköy · Ahogy szereted',
    title: 'Cukorral kéred?',
    lead: 'A pincér felemeli a cukortartót. Ehhez most nem kell új mondatot megtanulnod, elég választanod.',
    ali: () => adventure.sugar === 'yes'
      ? 'Cukorral. Ezt megjegyzem.'
      : adventure.sugar === 'no'
        ? 'Cukor nélkül. Legközelebb már tudni fogom.'
        : 'Şekerli mi? Azt kérdezi: cukorral kéred?',
    whisper: '',
    body: () => adventure.sugar
      ? `<button class="primary-button full" data-next>Jöhet a tea <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Ezt kérdezték</span><strong>Şekerli mi?</strong><span>Cukorral kéred?</span></div><div class="choice-row"><button data-sugar="yes">Cukorral kérem</button><button data-sugar="no">Cukor nélkül kérem</button></div>`
  },
  {
    eyebrow: 'Karaköy · Amikor megérkezik',
    title: 'A tea már az asztalon van.',
    lead: 'A pincér leteszi eléd a forró poharat. Most pont jó helye van egy köszönömnek.',
    ali: 'Teşekkür ederim. Ezt Isztambulban sokszor fogod használni.',
    whisper: '',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Köszönöm</span><strong>Teşekkür ederim.</strong><span>te-sek-kür e-de-rim</span></div><button class="primary-button full" data-next>Megköszönöm <span>→</span></button>`
  },
  {
    eyebrow: 'Az első sikerélményed Karaköyben',
    title: 'Már tudsz teát kérni törökül.',
    lead: 'Kértél egy teát, elmondtad, hogyan szereted, és megköszönted, amikor megérkezett.',
    ali: `${adventure.name || 'Vendégem'}, a komp hamarosan indul. De előbb idd meg a teádat — Isztambul megvár.`,
    whisper: '',
    body: () => `<div class="intro-card"><span>A karaköyi mondataid</span><strong>Bir çay, lütfen.</strong><strong>Teşekkür ederim.</strong></div><button class="primary-button full" data-start-ferry>Menjünk a komphoz <span>→</span></button>`
  }
];

const coherentFerryScenes = [
  {
    eyebrow: 'Boszporusz · Átkelés a komppal',
    title: 'Kint maradjunk, vagy menjünk be?',
    lead: 'A komp lassan elindul. A fedélzeten erősebb a szél, bent viszont az ablak mellől nézhetitek a várost.',
    ali: () => adventure.ferryPlace === 'deck'
      ? 'Maradjunk kint. Kapaszkodj — a szél ma különösen kíváncsi.'
      : adventure.ferryPlace === 'inside'
        ? 'Üljünk az ablakhoz. Innen egész Isztambul elúszik előttünk.'
        : 'Te hol utaznál szívesebben?',
    whisper: '',
    body: () => adventure.ferryPlace
      ? `<button class="primary-button full" data-next>Indulhatunk <span>→</span></button>`
      : `<div class="choice-row"><button data-ferry-place="deck">Kint, a fedélzeten</button><button data-ferry-place="inside">Bent, az ablak mellett</button></div>`
  },
  {
    eyebrow: 'Boszporusz · Egy isztambuli szó',
    title: 'Erre a hajóra azt mondják: vapur.',
    lead: 'Isztambulban a komp a mindennapok része. Reggel munkába, délután haza viszi az embereket a két part között.',
    ali: 'Vapur. Nekem olyan, mint egy mozgó erkély a Boszporuszon.',
    whisper: '',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Városi komp</span><strong>Vapur.</strong><span>vá-pur</span></div><button class="primary-button full" data-next>Körülnézek <span>→</span></button>`
  },
  {
    eyebrow: 'Boszporusz · Nézz körül',
    title: 'Mi tűnt fel először?',
    lead: 'Mindenki mást vesz észre. Egy utast, egy színt, vagy a sirályokat, amelyek végig a komp mellett repülnek.',
    ali: () => adventure.observed === 'man'
      ? 'A bajuszos férfi? Szerintem minden nap ugyanitt ül.'
      : adventure.observed === 'woman'
        ? 'A piros kendő? A szél is rögtön észrevette.'
        : adventure.observed === 'child'
          ? 'A sirályok. Már nem tudom, mi követjük őket, vagy ők minket.'
          : 'Nézz körül. Mi az, amin először megakad a szemed?',
    whisper: '',
    body: () => adventure.observed
      ? `<button class="primary-button full" data-next>Alit is megnézem <span>→</span></button>`
      : `<div class="choice-row"><button data-observed="man">Egy utas</button><button data-observed="woman">Egy piros kendő</button><button data-observed="child">A sirályok</button></div>`
  },
  {
    eyebrow: 'Boszporusz · Most nézd meg Alit',
    title: 'Mit vettél észre rajta?',
    lead: 'Nem kell mindent elmondanod róla. Válassz egyetlen részletet, amely rögtön feltűnt.',
    ali: () => adventure.aliFeature === 'hair'
      ? 'Kıvırcık saçlı. Göndör hajú. Ezt a szél is megerősíti.'
      : adventure.aliFeature === 'eyes'
        ? 'Kahverengi gözlü. Barna szemű. Jól megfigyeltél.'
        : adventure.aliFeature === 'smile'
          ? 'Güler yüzlü. Mosolygós. Ezt nehéz lett volna elrejteni.'
          : 'Kíváncsi vagyok, mit mondanál rólam.',
    whisper: '',
    body: () => adventure.aliFeature
      ? `<div class="selected-answer"><strong>${adventure.aliFeature === 'hair' ? 'Kıvırcık saçlı.' : adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : 'Güler yüzlü.'}</strong><span>${adventure.aliFeature === 'hair' ? 'Göndör hajú.' : adventure.aliFeature === 'eyes' ? 'Barna szemű.' : 'Mosolygós.'}</span></div><button class="primary-button full" data-next>Jól megfigyeltem <span>→</span></button>`
      : `<div class="choice-row"><button data-ali-feature="hair">A göndör haját</button><button data-ali-feature="eyes">A barna szemét</button><button data-ali-feature="smile">A mosolyát</button></div>`
  },
  {
    eyebrow: 'Az első sikerélményed a kompon',
    title: 'Már el tudsz mondani valakiről egy látható részletet.',
    lead: 'Megfigyelted Alit, kiválasztottál egy jellemzőt, és már törökül is ki tudod mondani.',
    ali: `${adventure.name || 'Vendégem'}, most már tudom, milyennek látsz. A sirályok véleményét inkább ne kérdezzük meg.`,
    whisper: '',
    body: () => `<div class="intro-card"><span>A mondatod Aliról</span><strong>Bu Ali.</strong><strong>${adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü.' : 'Kıvırcık saçlı.'}</strong></div><button class="primary-button full" data-start-bazaar>Menjünk a bazárba <span>→</span></button>`
  }
];

const coherentBazaarScenes = [
  {
    eyebrow: 'Nagy Bazár · Valami megállít',
    title: 'Mi tetszett meg?',
    lead: 'Ali lassít az egyik kirakat előtt. Kendők, kabátok és cipők sorakoznak egymás mellett.',
    ali: () => adventure.bazaarItem === 'scarf'
      ? 'A kendő? Jó szemed van. Nézzük meg közelebbről.'
      : adventure.bazaarItem === 'jacket'
        ? 'A kabát? Próbáljuk megkeresni a méretedet.'
        : adventure.bazaarItem === 'shoes'
          ? 'A cipő? Szép, de előbb derítsük ki, van-e a méretedben.'
          : 'Megakadt valamin a szemed?',
    whisper: '',
    body: () => adventure.bazaarItem
      ? `<button class="primary-button full" data-next>Megnézem közelebbről <span>→</span></button>`
      : `<div class="choice-row"><button data-bazaar-item="scarf">Egy kendő</button><button data-bazaar-item="jacket">Egy kabát</button><button data-bazaar-item="shoes">Egy pár cipő</button></div>`
  },
  {
    eyebrow: 'Nagy Bazár · Keresd meg a megfelelőt',
    title: () => adventure.bazaarItem === 'scarf' ? 'Melyik árnyalat tetszik?' : adventure.bazaarItem === 'jacket' ? 'Melyik méretet próbálnád fel?' : 'Mekkora cipőt kérsz?',
    lead: () => adventure.bazaarItem === 'scarf'
      ? 'Ugyanabból a mintából világosabb és sötétebb változat is van.'
      : adventure.bazaarItem === 'jacket'
        ? 'A kabátoknál a megszokott ruhaméretek közül választhatsz.'
        : 'A cipőknél számozott méretet kérünk, nem S, M vagy L jelölést.',
    ali: () => adventure.bazaarSize ? 'Ezt kéred? Jó, megmutatom az eladónak.' : 'Válassz egyet, és kérjük el.',
    whisper: '',
    body: () => adventure.bazaarSize
      ? `<button class="primary-button full" data-next>Ezt szeretném megnézni <span>→</span></button>`
      : adventure.bazaarItem === 'scarf'
        ? `<div class="choice-row"><button data-size="light">A világosabbat</button><button data-size="dark">A sötétebbet</button></div>`
        : adventure.bazaarItem === 'jacket'
          ? `<div class="choice-row"><button data-size="s">S</button><button data-size="m">M</button><button data-size="l">L</button></div>`
          : `<div class="choice-row"><button data-size="38">38</button><button data-size="39">39</button><button data-size="40">40</button></div>`
  },
  {
    eyebrow: 'Nagy Bazár · Kérdezd meg az árát',
    title: 'Mennyibe kerül?',
    lead: 'Az eladó a kezedbe adja a kiválasztott darabot. Már csak az árát kell megkérdezned.',
    ali: 'Mondd nyugodtan: Bu ne kadar?',
    whisper: '',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Mennyibe kerül?</span><strong>Bu ne kadar?</strong><span>bu ne ká-dár</span></div><button class="primary-button full" data-next>Megkérdezem az árát <span>→</span></button>`
  },
  {
    eyebrow: 'Nagy Bazár · Az ár után',
    title: 'Megpróbálsz alkudni?',
    lead: 'Az ár egy kicsit magasabb, mint remélted. Kérhetsz kedvezményt, de nyugodtan dönthetsz úgy is, hogy nem alkudozol.',
    ali: () => adventure.bargain === 'ask'
      ? 'Biraz indirim olur mu? Szépen kérted. Most várjuk meg, mit mond.'
      : adventure.bargain === 'pay'
        ? 'Rendben. Nem minden vásárlásból kell alkut csinálni.'
        : 'Ha szeretnéd, megkérdezheted: lehet egy kis kedvezmény?',
    whisper: '',
    body: () => adventure.bargain
      ? `<button class="primary-button full" data-next>Meghallgatom a választ <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Lehet egy kis kedvezmény?</span><strong>Biraz indirim olur mu?</strong><span>bi-ráz in-di-rim o-lur mu</span></div><div class="choice-row"><button data-bargain="ask">Megpróbálok alkudni</button><button data-bargain="pay">Most nem alkuszom</button></div>`
  },
  {
    eyebrow: 'Nagy Bazár · Te döntesz',
    title: () => adventure.purchase ? 'Már tudsz árat kérdezni a bazárban.' : 'Magaddal viszed?',
    lead: () => adventure.purchase
      ? 'Megkérdezted az árát, és azt is te döntötted el, hogyan folytatódjon a vásárlás.'
      : 'Az eladó kimondja az utolsó árat. Megveheted, de mosolyogva tovább is mehetsz.',
    ali: () => adventure.purchase === 'buy'
      ? 'Jó választás. De még jobban tetszett, hogy te intézted.'
      : adventure.purchase === 'leave'
        ? 'A mondatokat így is visszük. Azokhoz nem kell szatyor.'
        : 'Tetszik annyira, hogy megvedd?',
    whisper: '',
    body: () => adventure.purchase
      ? `<div class="intro-card"><span>A bazári mondataid</span><strong>Bu ne kadar?</strong>${adventure.bargain === 'ask' ? '<strong>Biraz indirim olur mu?</strong>' : ''}</div><button class="primary-button full" data-start-park>Menjünk ki a parkba <span>→</span></button>`
      : `<div class="choice-row"><button data-purchase="buy">Megveszem</button><button data-purchase="leave">Most nem viszem el</button></div>`
  }
];

const coherentParkScenes = [
  {
    eyebrow: 'Gülhane Park · Egy kis pihenő',
    title: 'Megálljunk egy kicsit?',
    lead: 'A bazár zaja lassan elmarad mögöttetek. A fák alatt végre nem kell kerülgetni senkit.',
    ali: () => adventure.parkPace === 'sit'
      ? 'Üljünk le. Ez a pad mintha éppen ránk várt volna.'
      : adventure.parkPace === 'walk'
        ? 'Sétáljunk lassan. Ha elfáradsz, megállunk.'
        : 'Te mondod meg a tempót. Van időnk.',
    whisper: '',
    body: () => adventure.parkPace
      ? `<button class="primary-button full" data-next>Jólesik a csend <span>→</span></button>`
      : `<div class="choice-row"><button data-park-pace="sit">Üljünk le</button><button data-park-pace="walk">Sétáljunk tovább lassan</button></div>`
  },
  {
    eyebrow: 'Gülhane Park · Ali rád néz',
    title: 'Hogy érzed magad?',
    lead: 'Ali nem udvariasságból kérdezi. Tényleg szeretné tudni, folytatnád-e az utat, vagy inkább pihennél.',
    ali: () => adventure.parkFeeling === 'tired'
      ? 'Yorgunum. Fáradt vagy. Akkor jó helyen álltunk meg.'
      : adventure.parkFeeling === 'good'
        ? 'İyiyim. Ennek örülök. Azért még maradhatunk egy kicsit.'
        : adventure.parkFeeling === 'quiet'
          ? 'Rendben. Nem kell minden pillanatot telebeszélni.'
          : 'Egy szó is elég. De a csendet is értem.',
    whisper: '',
    body: () => adventure.parkFeeling
      ? `<button class="primary-button full" data-next>Maradjunk még egy percre <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-park-feeling="tired"><strong>Yorgunum.</strong><small>Fáradt vagyok.</small></button></div><div class="question-choice"><button data-park-feeling="good"><strong>İyiyim.</strong><small>Jól vagyok.</small></button></div><div class="question-choice"><button data-park-feeling="quiet"><strong>Most csak pihennék.</strong><small>Ali ezt is megérti.</small></button></div></div>`
  },
  {
    eyebrow: 'Gülhane Park · Ali kínál valamit',
    title: 'Kérsz vizet?',
    lead: 'A török kérdés rövid, és pontosan azt jelenti, amit Ali most szeretne tudni.',
    ali: () => adventure.needsWater === 'yes'
      ? 'Persze. Már hozom is.'
      : adventure.needsWater === 'no'
        ? 'Rendben. Akkor csak ülök még itt veled.'
        : 'Su ister misin?',
    whisper: '',
    body: () => adventure.needsWater
      ? `<button class="primary-button full" data-next>Válaszoltam Alinak <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Kérsz vizet?</span><strong>Su ister misin?</strong></div><div class="choice-row"><button data-water="yes"><strong>Evet, lütfen.</strong><small>Igen, kérek.</small></button><button data-water="no"><strong>Hayır, teşekkürler.</strong><small>Nem, köszönöm.</small></button></div>`
  },
  {
    eyebrow: 'Gülhane Park · Egy közös javaslat',
    title: 'Pihenjünk egy kicsit.',
    lead: 'Ezt a mondatot akkor használhatod, amikor nem egyedül állnál meg, hanem a másikat is hívod magaddal.',
    ali: 'Biraz dinlenelim. Most nem kell sehova odaérnünk.',
    whisper: '',
    body: () => `<div class="phrase-card"><span class="phrase-label">Pihenjünk egy kicsit.</span><strong>Biraz dinlenelim.</strong><span>biráz dinlenelim</span></div><button class="primary-button full" data-next>Maradjunk még <span>→</span></button>`
  },
  {
    eyebrow: 'Gülhane Park · Amit magaddal viszel',
    title: 'Már el tudod mondani, mire van szükséged.',
    lead: 'Elmondtad, hogyan érzed magad, válaszoltál egy kínálásra, és közös pihenőt javasoltál.',
    ali: 'Látod? Néha az is haladás, ha tudod, hogyan kérj egy kis időt.',
    whisper: '',
    body: () => `<div class="intro-card"><span>A parkban használt mondataid</span><strong>${adventure.parkFeeling === 'good' ? 'İyiyim.' : adventure.parkFeeling === 'quiet' ? 'Biraz dinlenmek istiyorum.' : 'Yorgunum.'}</strong><strong>${adventure.needsWater === 'yes' ? 'Evet, lütfen.' : 'Hayır, teşekkürler.'}</strong><strong>Biraz dinlenelim.</strong></div><button class="primary-button full" data-start-tram>Hallod a villamost? <span>→</span></button>`
  }
];

const coherentTramScenes = [
  {
    eyebrow: 'İstiklal · Megérkezik a piros villamos',
    title: 'Ezt még elérjük?',
    lead: 'A csilingelés egyre közelebbről hallatszik. Ali nem kezd futni, csak rád néz.',
    ali: () => adventure.tramChoice === 'run'
      ? 'Akkor gyere! De csak olyan gyorsan, hogy közben még nevethessünk.'
      : adventure.tramChoice === 'wait'
        ? 'Megvárjuk a következőt. A város nem megy el nélkülünk.'
        : 'Elérhetjük ezt, vagy megvárhatjuk a következőt. Te döntesz.',
    whisper: '',
    body: () => adventure.tramChoice
      ? `<button class="primary-button full" data-next>Menjünk a megállóhoz <span>→</span></button>`
      : `<div class="choice-row"><button data-tram-choice="run">Érjük el ezt</button><button data-tram-choice="wait">Várjuk meg a következőt</button></div>`
  },
  {
    eyebrow: 'A megállóban · Egy gyors kérdés',
    title: 'Használhatom az İstanbulkartot?',
    lead: 'A kártya már a kezedben van, de nem vagy biztos benne, hogy ezen a villamoson is érvényes.',
    ali: () => adventure.ticketChoice
      ? 'Igen, használhatod. Most már nyugodtan odaérintheted.'
      : 'Kérdezd meg így: İstanbulkart geçerli mi?',
    whisper: '',
    body: () => adventure.ticketChoice
      ? `<button class="primary-button full" data-next>Felszállok <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Érvényes az İstanbulkart?</span><strong>İstanbulkart geçerli mi?</strong></div><button class="primary-button full" data-ticket="say">Megkérdezem <span>→</span></button>`
  },
  {
    eyebrow: 'A villamoson · Közeledik a megálló',
    title: 'Hogyan jutsz el az ajtóig?',
    lead: 'A kocsi megtelt, előtted pedig többen állnak. Egy udvarias szó elég, hogy helyet kérj magadnak.',
    ali: () => adventure.tramApology
      ? 'Affedersiniz. Már félre is álltak. Nem kellett hangosabbnak lenned.'
      : 'Mondd nyugodtan: Affedersiniz.',
    whisper: '',
    body: () => adventure.tramApology
      ? `<button class="primary-button full" data-next>Most már látom az ajtót <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Elnézést.</span><strong>Affedersiniz.</strong></div><button class="primary-button full" data-tram-apology="say">Utat kérek <span>→</span></button>`
  },
  {
    eyebrow: 'A villamoson · Biztosra mész',
    title: 'Hol szállunk le?',
    lead: 'Már az ajtónál álltok, de két megálló neve is elhangzott. Inkább megkérdezed Alit.',
    ali: () => adventure.tramStop
      ? 'A következőnél. Jó, hogy megkérdezted.'
      : 'Nerede ineceğiz?',
    whisper: '',
    body: () => adventure.tramStop
      ? `<button class="primary-button full" data-next>Figyelem a következő megállót <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Hol szállunk le?</span><strong>Nerede ineceğiz?</strong></div><button class="primary-button full" data-tram-stop="next">Megkérdezem Alit <span>→</span></button>`
  },
  {
    eyebrow: 'İstiklal · Amit magaddal viszel',
    title: 'Már elboldogulsz egy ismeretlen járaton.',
    lead: 'Ellenőrizted a kártyádat, udvariasan utat kértél, és megtudtad, hol kell leszállnod.',
    ali: 'Nem az egész menetrendet tanultad meg. Csak azt a három mondatot, amelyik most továbbvitt.',
    whisper: '',
    body: () => `<div class="intro-card"><span>A villamoson használt mondataid</span><strong>İstanbulkart geçerli mi?</strong><strong>Affedersiniz.</strong><strong>Nerede ineceğiz?</strong></div><button class="primary-button full" data-start-uskudar>Nézzük meg a naplementét <span>→</span></button>`
  }
];

const coherentUskudarScenes = [
  {
    eyebrow: 'Üsküdar · A nap utolsó fényei',
    title: 'Honnan nézzük?',
    lead: 'A túlpart körvonalai lassan elsötétednek. A vízparti lépcsőről közelebb érzed a Boszporuszt, a teázó mellől kényelmesebb a kilátás.',
    ali: () => adventure.uskudarSpot === 'steps'
      ? 'Menjünk a lépcsőkhöz. Innen még a hullámokat is hallani.'
      : adventure.uskudarSpot === 'tea'
        ? 'Üljünk a teázó mellé. A kilátás ugyanaz, csak pohárral a kezünkben.'
        : 'Te választasz helyet. A naplemente megvár.',
    whisper: '',
    body: () => adventure.uskudarSpot
      ? `<button class="primary-button full" data-next>Nézzük együtt <span>→</span></button>`
      : `<div class="choice-row"><button data-uskudar-spot="steps">A vízparti lépcsőkhöz</button><button data-uskudar-spot="tea">A teázó mellé</button></div>`
  },
  {
    eyebrow: 'Üsküdar · Amikor elég egy mondat',
    title: 'Gyönyörű a kilátás.',
    lead: 'Nem kell pontosan megnevezned minden minaretet és hajót. Elég elmondanod, mit érzel, amikor körülnézel.',
    ali: 'Manzara çok güzel. Én is ezt mondanám.',
    whisper: '',
    body: () => `<div class="phrase-card"><span class="phrase-label">Gyönyörű a kilátás.</span><strong>Manzara çok güzel.</strong><span>manzara csok güzel</span></div><button class="primary-button full" data-next>Ezt most tényleg így érzem <span>→</span></button>`
  },
  {
    eyebrow: 'Üsküdar · Egy közös emlék',
    title: 'Készítsünk egy képet?',
    lead: 'Ali előveszi a telefonját, de nem tartja rögtön eléd. Előbb megkérdezi, szeretnéd-e megőrizni ezt a pillanatot.',
    ali: () => adventure.sunsetMemory === 'photo'
      ? 'Rendben. Egyet készítünk, aztán visszanézünk a vízre.'
      : adventure.sunsetMemory === 'watch'
        ? 'Jó. Van, amit jobb nem egy kijelzőn keresztül nézni.'
        : 'Bir fotoğraf çekelim mi?',
    whisper: '',
    body: () => adventure.sunsetMemory
      ? `<button class="primary-button full" data-next>A nap már a vízhez ér <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Készítsünk egy képet?</span><strong>Bir fotoğraf çekelim mi?</strong></div><div class="choice-row"><button data-sunset-memory="photo">Evet, çekelim.</button><button data-sunset-memory="watch">Most inkább csak nézzük</button></div>`
  },
  {
    eyebrow: 'Üsküdar · Még van időnk',
    title: 'Maradjunk még egy kicsit?',
    lead: 'A nap eltűnt, de a város fényei még csak most kezdenek kigyulladni.',
    ali: () => adventure.sunsetStay === 'stay'
      ? 'Maradjunk. Nem kell minden szép pillanat után rögtön továbbindulni.'
      : adventure.sunsetStay === 'walk'
        ? 'Sétáljunk tovább. A part mentén még velünk marad az ég színe.'
        : 'Biraz daha kalalım mı?',
    whisper: '',
    body: () => adventure.sunsetStay
      ? `<button class="primary-button full" data-next>İyi akşamlar, Üsküdar <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Maradjunk még egy kicsit?</span><strong>Biraz daha kalalım mı?</strong></div><div class="choice-row"><button data-sunset-stay="stay">Maradjunk még</button><button data-sunset-stay="walk">Sétáljunk tovább</button></div>`
  },
  {
    eyebrow: 'Üsküdar · Amit magaddal viszel',
    title: 'Már meg tudsz osztani egy szép pillanatot.',
    lead: 'Elmondtad, hogy tetszik a kilátás, közös képet javasoltál, és arról is döntöttél, maradjatok-e még.',
    ali: 'Ezek a mondatok nem a naplementét írják le. Hanem azt mondják: jó, hogy együtt látjuk.',
    whisper: '',
    body: () => `<div class="intro-card"><span>Az esti mondataid</span><strong>Manzara çok güzel.</strong><strong>Bir fotoğraf çekelim mi?</strong><strong>Biraz daha kalalım mı?</strong></div><button class="primary-button full" data-start-bakery>Találkozzunk holnap reggel <span>→</span></button>`
  }
];

const coherentBakeryScenes = [
  {
    eyebrow: 'Másnap reggel · Simitçi',
    title: 'Kérjünk simitet?',
    lead: 'Másnap reggel a szezámillat talál meg benneteket. A pékség tálcáján még melegek a simitek.',
    ali: () => adventure.bakeryOrder === 'one'
      ? 'Egyet kérsz. Szerintem ezt még séta közben is el tudjuk tüntetni.'
      : adventure.bakeryOrder === 'two'
        ? 'Kettőt kérsz. Ez már majdnem közös reggeli.'
        : 'Hányat kérjünk?',
    whisper: '',
    body: () => adventure.bakeryOrder
      ? `<button class="primary-button full" data-next>Megrendelem <span>→</span></button>`
      : `<div class="choice-row"><button data-bakery-order="one">Egyet kérek</button><button data-bakery-order="two">Kettőt kérek</button></div>`
  },
  {
    eyebrow: 'Simitçi · A rendelésed',
    title: () => adventure.bakeryOrder === 'two' ? 'Két simitet kérek.' : 'Egy simitet kérek.',
    lead: 'A szám kerül előre, utána jön a simit. A lütfen teszi kedvessé a kérést.',
    ali: 'Mondd nyugodtan az eladónak. Már rád figyel.',
    whisper: '',
    body: () => `<div class="phrase-card"><span class="phrase-label">A rendelésed</span><strong>${adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.'}</strong><span>${adventure.bakeryOrder === 'two' ? 'Két simitet kérek.' : 'Egy simitet kérek.'}</span></div><button class="primary-button full" data-next>Kimondom a rendelést <span>→</span></button>`
  },
  {
    eyebrow: 'Simitçi · Kérsz mellé valamit?',
    title: 'Mit innál?',
    lead: 'Az eladó a poharak felé mutat. Választhatsz teát, kávét vagy vizet.',
    ali: () => adventure.bakeryDrink === 'tea'
      ? 'Çay, lütfen. A simit jó barátja.'
      : adventure.bakeryDrink === 'coffee'
        ? 'Kahve, lütfen. Ma reggel erősebben indulunk.'
        : adventure.bakeryDrink === 'water'
          ? 'Su, lütfen. Egyszerű és világos.'
          : 'Mit kérsz mellé?',
    whisper: '',
    body: () => adventure.bakeryDrink
      ? `<button class="primary-button full" data-next>Ez lesz a reggelim <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-bakery-drink="tea"><strong>Çay, lütfen.</strong><small>Teát kérek.</small></button></div><div class="question-choice"><button data-bakery-drink="coffee"><strong>Kahve, lütfen.</strong><small>Kávét kérek.</small></button></div><div class="question-choice"><button data-bakery-drink="water"><strong>Su, lütfen.</strong><small>Vizet kérek.</small></button></div></div>`
  },
  {
    eyebrow: 'Simitçi · Az első falat',
    title: 'Milyen?',
    lead: 'Ali megvárja, amíg megkóstolod. Most egyetlen török szóval is válaszolhatsz.',
    ali: () => adventure.simitTaste === 'warm'
      ? 'Sıcak. Meleg — ahogy reméltük.'
      : adventure.simitTaste === 'crunchy'
        ? 'Çıtır. Hallottam is, milyen ropogós.'
        : adventure.simitTaste === 'delicious'
          ? 'Çok lezzetli. Akkor jó helyre hoztalak.'
          : 'Na, milyen?',
    whisper: '',
    body: () => adventure.simitTaste
      ? `<button class="primary-button full" data-next>Indulhatunk tovább <span>→</span></button>`
      : `<div class="choice-row"><button data-simit-taste="warm"><strong>Sıcak.</strong><small>Meleg.</small></button><button data-simit-taste="crunchy"><strong>Çıtır.</strong><small>Ropogós.</small></button><button data-simit-taste="delicious"><strong>Çok lezzetli.</strong><small>Nagyon finom.</small></button></div>`
  },
  {
    eyebrow: 'Simitçi · Amit magaddal viszel',
    title: 'Már tudsz egyszerű reggelit kérni.',
    lead: 'Kiválasztottad a mennyiséget, italt kértél mellé, és azt is elmondtad, hogyan ízlik.',
    ali: 'Most már nem csak simit van a kezedben. A teljes rendelést te intézted.',
    whisper: '',
    body: () => `<div class="intro-card"><span>A reggeli mondataid</span><strong>${adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.'}</strong><strong>${adventure.bakeryDrink === 'coffee' ? 'Kahve, lütfen.' : adventure.bakeryDrink === 'water' ? 'Su, lütfen.' : 'Çay, lütfen.'}</strong><strong>${adventure.simitTaste === 'warm' ? 'Sıcak.' : adventure.simitTaste === 'crunchy' ? 'Çıtır.' : 'Çok lezzetli.'}</strong></div><button class="primary-button full" data-start-mosque>Menjünk tovább Sultanahmet felé <span>→</span></button>`
  }
];

const coherentMosqueScenes = [
  {
    eyebrow: 'Sultanahmet · A csendes udvar',
    title: 'Merre van a bejárat?',
    lead: 'Az udvaron több kapu és külön sor látszik. Ali nem találgat: megmutatja, hogyan kérdezhetsz rá egyszerűen.',
    ali: () => adventure.mosqueDirection
      ? 'Arra mutattak. Most már tudjuk, merre induljunk.'
      : 'Giriş nerede? Ennyi elég ahhoz, hogy útba igazítsanak.',
    whisper: '',
    body: () => adventure.mosqueDirection
      ? `<button class="primary-button full" data-next>Menjünk a bejárathoz <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Merre van a bejárat?</span><strong>Giriş nerede?</strong></div><button class="primary-button full" data-mosque-direction="ask">Megkérdezem <span>→</span></button>`
  },
  {
    eyebrow: 'Sultanahmet · Mielőtt beléptek',
    title: 'Itt vegyem le a cipőmet?',
    lead: 'Mások már a cipőjükért nyúlnak, de nem teljesen világos, pontosan hol kell levenni. Nyugodtan rákérdezhetsz.',
    ali: () => adventure.mosqueShoes
      ? 'Igen, itt. Jó érzés úgy belépni, hogy nem kell azon gondolkodnod, jól csinálod-e.'
      : 'Ayakkabılarımı burada mı çıkarayım?',
    whisper: '',
    body: () => adventure.mosqueShoes
      ? `<button class="primary-button full" data-next>Most már beléphetünk <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Itt vegyem le a cipőmet?</span><strong>Ayakkabılarımı burada mı çıkarayım?</strong></div><button class="primary-button full" data-mosque-shoes="ask">Rákérdezek <span>→</span></button>`
  },
  {
    eyebrow: 'Sultanahmet · Egy szép részlet',
    title: 'Készítesz fényképet?',
    lead: 'A fény végigfut a csempéken. Ha fényképet szeretnél, előbb meggyőződhetsz róla, hogy szabad-e.',
    ali: () => adventure.mosquePermission === 'photo'
      ? 'Megengedték. Készíts egyet, aztán tegyük el a telefont.'
      : adventure.mosquePermission === 'look'
        ? 'Most csak nézzük. Nem kell minden emléket hazavinni egy képen.'
        : 'Dönthetsz úgy is, hogy megkérdezed, vagy úgy, hogy most csak körülnézel.',
    whisper: '',
    body: () => adventure.mosquePermission
      ? `<button class="primary-button full" data-next>Maradjunk még csendben <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Készíthetek fényképet?</span><strong>Fotoğraf çekebilir miyim?</strong></div><div class="choice-row"><button data-mosque-permission="photo">Megkérdezem</button><button data-mosque-permission="look">Most csak körülnézek</button></div>`
  },
  {
    eyebrow: 'Sultanahmet · Nem kell sietni',
    title: 'Nagyon szép.',
    lead: 'A hely csendjében nincs szükség hosszú magyarázatra. Egy halk mondattal megoszthatod Alival, amit érzel.',
    ali: 'Çok güzel. Igen. Most én sem mondanék többet.',
    whisper: '',
    body: () => `<div class="phrase-card"><span class="phrase-label">Nagyon szép.</span><strong>Çok güzel.</strong><span>csok güzel</span></div><button class="primary-button full" data-next>Indulhatunk, Ali <span>→</span></button>`
  },
  {
    eyebrow: 'Sultanahmet · Amit magaddal viszel',
    title: 'Már tudod, hogyan érkezz tisztelettel.',
    lead: 'Útbaigazítást kértél, rákérdeztél egy helyi szokásra, és engedélyt kértél, mielőtt fényképeztél volna.',
    ali: 'Nem kellett mindent előre tudnod. Figyeltél, kérdeztél, és hagytad, hogy a hely mutassa a tempót.',
    whisper: '',
    body: () => `<div class="intro-card"><span>A látogatás mondatai</span><strong>Giriş nerede?</strong><strong>Ayakkabılarımı burada mı çıkarayım?</strong>${adventure.mosquePermission === 'photo' ? '<strong>Fotoğraf çekebilir miyim?</strong>' : ''}<strong>Çok güzel.</strong></div><button class="primary-button full" data-start-waterfront>Menjünk vissza a vízhez <span>→</span></button>`
  }
];

const coherentWaterfrontScenes = [
  {
    eyebrow: 'Vízpart · Eső után',
    title: 'Milyen most az idő?',
    lead: 'A kövek még csillognak, a levegő hűvösebb lett, a kompok pedig ugyanúgy járnak tovább.',
    ali: () => adventure.waterfrontWeather === 'cool'
      ? 'Hava serin. Igen, egy kicsit hűvös lett.'
      : adventure.waterfrontWeather === 'rainy'
        ? 'Hava yağmurlu. Az eső még ott maradt a köveken.'
        : adventure.waterfrontWeather === 'fresh'
          ? 'Hava ferah. Jólesik nagy levegőt venni.'
          : 'Most már te mondd meg, milyen a levegő.',
    whisper: '',
    body: () => adventure.waterfrontWeather
      ? `<button class="primary-button full" data-next>Sétáljunk tovább <span>→</span></button>`
      : `<div class="choice-row"><button data-waterfront-weather="cool"><strong>Hava serin.</strong><small>Hűvös az idő.</small></button><button data-waterfront-weather="rainy"><strong>Hava yağmurlu.</strong><small>Esős az idő.</small></button><button data-waterfront-weather="fresh"><strong>Hava ferah.</strong><small>Friss a levegő.</small></button></div>`
  },
  {
    eyebrow: 'Vízpart · Most te javasolsz',
    title: 'Mit csináljunk ezután?',
    lead: 'Ali ezúttal nem mutatja a következő állomást. A város már elég ismerős ahhoz, hogy te válassz közös programot.',
    ali: () => adventure.waterfrontPlan === 'ferry'
      ? 'Vapura binelim. Jó, menjünk vissza a vízre.'
      : adventure.waterfrontPlan === 'tea'
        ? 'Çay içelim. Sejtettem, hogy a végén megint a teánál kötünk ki.'
        : adventure.waterfrontPlan === 'walk'
          ? 'Biraz daha yürüyelim. Van még időnk.'
          : 'Sonra ne yapalım?',
    whisper: '',
    body: () => adventure.waterfrontPlan
      ? `<button class="primary-button full" data-next>Ez most már az én tervem is <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-waterfront-plan="ferry"><strong>Vapura binelim.</strong><small>Szálljunk kompra.</small></button></div><div class="question-choice"><button data-waterfront-plan="tea"><strong>Çay içelim.</strong><small>Igyunk teát.</small></button></div><div class="question-choice"><button data-waterfront-plan="walk"><strong>Biraz daha yürüyelim.</strong><small>Sétáljunk még egy kicsit.</small></button></div></div>`
  },
  {
    eyebrow: 'Vízpart · Ali utolsó kérdése',
    title: 'Milyen most neked Isztambul?',
    lead: 'Nem a várost kell jellemezned. Csak azt az érzést választod ki, amelyik tíz közös állomás után veled maradt.',
    ali: () => adventure.cityFeeling === 'familiar'
      ? 'Tanıdık. Ismerős. Pont ezt reméltem.'
      : adventure.cityFeeling === 'lively'
        ? 'Canlı. Élénk. Még a csendes pillanataiban is.'
        : adventure.cityFeeling === 'warm'
          ? 'Samimi. Barátságos. Akkor jól fogadott bennünket.'
          : 'İstanbul nasıl?',
    whisper: '',
    body: () => adventure.cityFeeling
      ? `<button class="primary-button full" data-next>Van már saját válaszom <span>→</span></button>`
      : `<div class="choice-row"><button data-city-feeling="familiar"><strong>Tanıdık.</strong><small>Ismerős.</small></button><button data-city-feeling="lively"><strong>Canlı.</strong><small>Élénk.</small></button><button data-city-feeling="warm"><strong>Samimi.</strong><small>Barátságos.</small></button></div>`
  },
  {
    eyebrow: 'Vízpart · Nem végleges búcsú',
    title: 'Még látjuk egymást.',
    lead: 'A török elköszönésben benne van a következő találkozás ígérete. Ezért Ali sem úgy mondja, mintha itt érne véget minden.',
    ali: () => adventure.aliFarewell === 'soon'
      ? 'Yakında görüşürüz. Hamarosan találkozunk. Én itt leszek.'
      : adventure.aliFarewell === 'again'
        ? 'Görüşürüz. Még látjuk egymást.'
        : 'Hogyan köszönsz el?',
    whisper: '',
    body: () => adventure.aliFarewell
      ? `<button class="primary-button full" data-next>Még egy pillanat, Ali <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-ali-farewell="again"><strong>Görüşürüz.</strong><small>Még látjuk egymást.</small></button></div><div class="question-choice"><button data-ali-farewell="soon"><strong>Yakında görüşürüz.</strong><small>Hamarosan találkozunk.</small></button></div></div>`
  },
  {
    eyebrow: 'Az első isztambuli utad',
    title: 'Már nem csak nézted a várost. Megszólaltál benne.',
    lead: 'Köszöntél, bemutatkoztál, rendeltél, kérdeztél, választottál, udvariasan segítséget kértél és közös tervet javasoltál.',
    ali: 'Nem kellett megtanulnod Isztambult. Elég volt végigsétálnod rajta velem. A török pedig közben elkezdett veled jönni.',
    whisper: '',
    body: () => `<div class="journal-card"><span>İstanbul · az első közös utatok</span><strong>${escapeHtml(adventure.name || 'A vendég')} már megszólalt a városban</strong><p>Merhaba.<br>Bir çay, lütfen.<br>Manzara çok güzel.<br>${adventure.aliFarewell === 'soon' ? 'Yakında görüşürüz.' : 'Görüşürüz.'}</p><small>Tíz állomás. Egy ismerőssé vált város.</small></div><div class="adventure-actions"><button class="primary-button" data-complete-journey>Tedd el az útinaplódba</button><button class="quiet-choice" data-restart>Egyszer még végigsétálom</button></div>`
  }
];

function selectedPlanPhrase() {
  return adventure.waterfrontPlan === 'ferry' ? 'Vapura binelim.' : adventure.waterfrontPlan === 'tea' ? 'Çay içelim.' : 'Biraz daha yürüyelim.';
}

function selectedFavoritePhrase() {
  const phrases = {
    plan: selectedPlanPhrase(),
    tea: 'Bir çay, lütfen.',
    direction: 'Giriş nerede?',
    thanks: 'Teşekkür ederim.'
  };
  return phrases[adventure.favoritePhrase] || selectedPlanPhrase();
}

const causalGalataScenes = [
  {
    eyebrow: 'Galata híd · Az első találkozás',
    title: 'Ali már vár rád.',
    lead: 'Isztambul épp csak ébredezik. Ali nem int, hogy siess — egyszerűen helyet hagy maga mellett.',
    ali: () => adventure.greeting === 'word'
      ? 'Merhaba! Most már valóban találkoztunk.'
      : adventure.greeting === 'wave'
        ? 'Ali visszainteget. „A mosoly is jó kezdet.”'
        : 'Merhaba. Ali vagyok. Gyere, nézd csak a várost.',
    whisper: 'Egyetlen szó is elég ahhoz, hogy kinyíljon a város.',
    body: () => adventure.greeting
      ? `<button class="primary-button full" data-next>Odaállok mellé <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Ali így köszönt</span><strong>Merhaba.</strong><span>Szia.</span></div><div class="choice-row"><button data-greeting="word">Merhaba, Ali</button><button data-greeting="wave">Mosolygok és visszaintek</button></div>`
  },
  {
    eyebrow: 'Most rajtad a sor',
    title: 'Hogy szólíthatlak?',
    lead: 'Ali bemutatkozott. A nevedből nem feladat lesz, hanem az első személyes isztambuli mondatod.',
    ali: 'Mondd meg, ha szeretnéd. Van időnk.', whisper: '',
    body: () => `<form class="guest-form" data-name-form><label for="guest-name">A neved</label><input id="guest-name" name="name" maxlength="32" autocomplete="given-name" placeholder="Írd ide a neved" value="${escapeHtml(adventure.name)}"><button class="primary-button" type="submit">Bemutatkozom <span>→</span></button><button class="text-button" data-skip-name type="button">Most még maradok vendég</button></form>`
  },
  {
    eyebrow: 'Ismerkedtek tovább',
    title: `${adventure.name ? adventure.name + ', honnan' : 'Honnan'} érkeztél?`,
    lead: 'Válaszd ki a nemzetiséged, és Ali megmutatja, hogyan mondhatod el törökül.',
    ali: 'Én isztambuli vagyok. És te?', whisper: '',
    body: () => `<form class="guest-form" data-origin-form><label for="guest-nationality">A nemzetiséged</label><select id="guest-nationality" name="nationality">${nationalitySelectOptions()}</select><div class="phrase-card compact"><span class="phrase-label">Törökül így hangzik</span><strong>${nationalityCopy().tr}</strong><span>${nationalityCopy().hu}</span></div><button class="primary-button full" type="submit">Elmondom Alinak <span>→</span></button></form>`
  },
  {
    eyebrow: 'Galata → Karaköy',
    title: 'Most már ismeritek egymást.',
    lead: 'Köszöntél, bemutatkoztál, és a városban már van valaki, aki a neveden szólít.',
    ali: `${adventure.name || 'Vendégem'}, Karaköyben ismerek egy jó teázót. Gyere, meghívlak.` ,
    whisper: 'Karaköyben már gőzölög a tea.',
    image: 'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time: '08:20', caption: 'Karaköyben már forró a tea.', postmark: 'Karaköy', postmarkMeta: '08:20 · Bir çay?',
    body: () => `<div class="intro-card"><span>Az első bemutatkozásod</span><strong>Merhaba.${adventure.name ? ` Benim adım ${escapeHtml(adventure.name)}.` : ''}</strong><strong>${nationalityCopy().tr}</strong></div><button class="primary-button full" data-causal-next="1">Menjünk teázni <span>→</span></button>`
  }
];

const causalKarakoyScenes = [
  {
    eyebrow: 'Karaköy · Egy hely az asztalnál',
    title: 'A pincér már rád figyel.',
    lead: 'Ali helyet talál az ablaknál. A pincér megáll mellettetek — most pontosan tudod, miért van szükséged az első mondatra.',
    ali: () => adventure.tea ? 'Hallottad? Már készítik is.' : 'Ha kérsz, ennyi elég: Bir çay, lütfen.',
    whisper: 'Mire leültök, már hallani a kanalak halk csörrenését.',
    body: () => adventure.tea
      ? `<button class="primary-button full" data-next>A tea már készül <span>→</span></button>`
      : `<div class="phrase-card compact"><span class="phrase-label">Egy teát kérek</span><strong>Bir çay, lütfen.</strong><span>bir csáj, lütfen</span></div><button class="primary-button full" data-tea="say">Kérek egy teát <span>→</span></button>`
  },
  {
    eyebrow: 'Karaköy · Ahogy szereted',
    title: 'Cukorral vagy cukor nélkül?',
    lead: 'A pincér felemeli a cukortartót. Most nem emlékezetteszt következik: egyszerűen úgy kéred, ahogy valóban innád.',
    ali: () => adventure.sugar === 'yes' ? 'Şekerli, lütfen. Rendben — cukorral.' : adventure.sugar === 'no' ? 'Şekersiz, lütfen. Rendben — cukor nélkül.' : 'Te hogyan szereted?',
    whisper: '',
    body: () => adventure.sugar
      ? `<button class="primary-button full" data-next>Jöhet a tea <span>→</span></button>`
      : `<div class="choice-row"><button data-sugar="yes"><strong>Şekerli, lütfen.</strong><small>Cukorral kérem.</small></button><button data-sugar="no"><strong>Şekersiz, lütfen.</strong><small>Cukor nélkül kérem.</small></button></div>`
  },
  {
    eyebrow: 'Karaköy · Megérkezik a tea',
    title: 'Pont úgy hozták, ahogy kérted.',
    lead: `A forró pohár ${adventure.sugar === 'yes' ? 'cukorral' : 'cukor nélkül'} kerül eléd. A pincér még egy pillanatig az asztalnál marad.`,
    ali: 'Most jó helye van egy köszönömnek.', whisper: '',
    body: () => `<div class="phrase-card compact"><span class="phrase-label">Köszönöm</span><strong>Teşekkür ederim.</strong><span>te-sek-kür e-de-rim</span></div><button class="primary-button full" data-next>Teşekkür ederim <span>→</span></button>`
  },
  {
    eyebrow: 'Karaköy → Tünel',
    title: 'A csilingelés mutatja az utat.',
    lead: 'A tea elfogy, az utcáról pedig meghalljátok a piros villamost. Felálltok az asztaltól, és elindultok a hang után.',
    ali: 'A Tünel felől érkezik. Gyere, ezt szeretni fogod.', whisper: '',
    image: 'assets/web/ALI-SCN-006-nostalgic-tram.webp', time: '10:15', caption: 'Az İstiklalon már hallani a csilingelést.', postmark: 'Taksim', postmarkMeta: '10:15 · Tramvay',
    body: () => `<div class="intro-card"><span>A karaköyi mondataid</span><strong>Bir çay, lütfen.</strong><strong>${adventure.sugar === 'yes' ? 'Şekerli, lütfen.' : 'Şekersiz, lütfen.'}</strong><strong>Teşekkür ederim.</strong></div><button class="primary-button full" data-causal-next="2">Nézzük meg a villamost <span>→</span></button>`
  }
];

const causalTramScenes = [
  {
    eyebrow: 'Tünel → İstiklal',
    title: 'A piros villamos már közeledik.',
    lead: 'Karaköyből a Tünelen át értek az İstiklalra. A csilingelés egyre hangosabb, Ali pedig nem kezd el futni.',
    ali: 'Hallod? Már jön is. Ha ezt nem érjük el, jön a következő.', whisper: 'Karaköytől a vízig a város is veletek mozdul.',
    body: () => `<button class="primary-button full" data-next>Menjünk a megállóhoz <span>→</span></button>`
  },
  {
    eyebrow: 'A megállóban · Egy valódi kérdés',
    title: 'Használhatom az İstanbulkartot?',
    lead: 'A kártya a kezedben van, de nem akarsz találgatni. A kérdés most tényleg kinyitja előtted az utat.',
    ali: () => adventure.ticketChoice ? 'Az ellenőr bólint, a leolvasó zöldre vált. Most már felszállhatunk.' : 'Kérdezd meg nyugodtan.',
    whisper: 'A leolvasó zölden felvillan.',
    body: () => adventure.ticketChoice
      ? `<button class="primary-button full" data-next>Felszállunk <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Érvényes az İstanbulkart?</span><strong>İstanbulkart geçerli mi?</strong></div><button class="primary-button full" data-ticket="say">Megkérdezem <span>→</span></button>`
  },
  {
    eyebrow: 'A villamoson · Közeledik a megálló',
    title: 'Az ajtóhoz kell jutnod.',
    lead: 'A kocsi megtelt. Nem kell hangosabbnak lenned mindenkinél — egy udvarias szó elég.',
    ali: () => adventure.tramApology ? 'Az előtted állók félreállnak. Már látod az ajtót.' : 'Mondd nyugodtan: Affedersiniz.',
    whisper: 'Egyetlen szó, és megnyílik előtted az út.',
    body: () => adventure.tramApology
      ? `<button class="primary-button full" data-next>Leszállunk <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Elnézést</span><strong>Affedersiniz.</strong></div><button class="primary-button full" data-tram-apology="say">Utat kérek <span>→</span></button>`
  },
  {
    eyebrow: 'Taksim → Kabataş',
    title: 'Most a víz felé ereszkedünk.',
    lead: 'Taksimnál leszálltok, majd a siklóval leereszkedtek Kabataşba. A kikötőben több hajó vár — de csak az egyik visz Üsküdarba.',
    ali: 'Kabataşnál vár ránk a víz. A következő irányt már te kérdezed meg.', whisper: '',
    image: 'assets/web/ALI-SCN-003-bosphorus-ferry.webp', time: '16:40', caption: 'Kabataşnál megérkezik a komp.', postmark: 'Boğaziçi', postmarkMeta: '16:40 · Vapur',
    body: () => `<div class="intro-card"><span>A villamoson használt mondataid</span><strong>İstanbulkart geçerli mi?</strong><strong>Affedersiniz.</strong></div><button class="primary-button full" data-causal-next="3">Menjünk a kikötőbe <span>→</span></button>`
  }
];

const causalFerryScenes = [
  {
    eyebrow: 'Kabataş · A kikötőben',
    title: 'Ez a komp Üsküdarba megy?',
    lead: 'Több hajó áll a partnál, a kijelzők pedig gyorsan váltanak. Inkább biztosra mentek.',
    ali: () => adventure.ferryRoute ? 'A személyzet bólint. Igen — ez lesz a mi kompunk.' : 'Kérdezd meg. Enélkül én is csak találgatnék.',
    whisper: 'A hajókorlát mögött már Üsküdar fényei várnak.',
    body: () => adventure.ferryRoute
      ? `<button class="primary-button full" data-next>Felszállunk <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Ez a komp Üsküdarba megy?</span><strong>Bu vapur Üsküdar'a gidiyor mu?</strong></div><button class="primary-button full" data-ferry-route="ask">Megkérdezem <span>→</span></button>`
  },
  {
    eyebrow: 'A kompon · Te választasz helyet',
    title: 'Kint üljünk vagy bent?',
    lead: 'A fedélzeten erősebb a szél, bent nyugodtabb az út. Melyikhez van kedved?',
    ali: () => adventure.ferryPlace === 'deck' ? 'Dışarıda oturalım. Jó — akkor kapaszkodj.' : adventure.ferryPlace === 'inside' ? 'İçeride oturalım. Innen az ablak keretezi a várost.' : 'Te hol éreznéd jól magad?',
    whisper: 'Kint a szél, bent az ablak mesél.',
    body: () => adventure.ferryPlace
      ? `<button class="primary-button full" data-next>Innen nézzük a várost <span>→</span></button>`
      : `<div class="choice-row"><button data-ferry-place="deck"><strong>Dışarıda oturalım.</strong><small>Üljünk kint.</small></button><button data-ferry-place="inside"><strong>İçeride oturalım.</strong><small>Üljünk bent.</small></button></div>`
  },
  {
    eyebrow: 'Két part között',
    title: () => adventure.ferryPlace === 'deck' ? 'A szélnek is van útvonala.' : 'Az ablakban együtt úszik a város.',
    lead: () => adventure.ferryPlace === 'deck'
      ? 'Sirályok kísérik a hajót. Egy piros kendő meg-meglebben a korlátnál — de egyikből sem lesz feladat.'
      : 'A sirályok néha eltűnnek az ablak keretéből, majd újra visszatérnek. Most nem kell semmit kiválasztanod.',
    ali: 'Nézzük egy kicsit. Nem kell minden pillanatot telebeszélni.',
    whisper: 'Most csak utaztok.',
    body: () => `<button class="primary-button full" data-next>Már látom Üsküdart <span>→</span></button>`
  },
  {
    eyebrow: 'Komp → Üsküdar',
    title: 'A nap már a túlpart felé tart.',
    lead: 'A komp kiköt. A kérdésed elhozott Üsküdarba; most már azt kell eldöntened, honnan nézzétek az estét.',
    ali: 'Megérkeztünk. Innen szép lesz a naplemente.', whisper: '',
    image: 'assets/web/ALI-SCN-007-uskudar-sunset.webp', time: '19:18', caption: 'A túlparton lassul az este.', postmark: 'Üsküdar', postmarkMeta: '19:18 · Gün batımı',
    body: () => `<div class="intro-card"><span>A mondatok, amelyek átvittek</span><strong>Bu vapur Üsküdar'a gidiyor mu?</strong><strong>${adventure.ferryPlace === 'deck' ? 'Dışarıda oturalım.' : 'İçeride oturalım.'}</strong></div><button class="primary-button full" data-causal-next="4">Nézzük meg a naplementét <span>→</span></button>`
  }
];

const causalUskudarScenes = [
  {
    eyebrow: 'Üsküdar · A nap utolsó fényei',
    title: 'Honnan nézzük?',
    lead: 'A vízparti lépcső közelebb van a hullámokhoz. A teázó mellett egy pohár is kerülhet a kezetekbe.',
    ali: () => adventure.uskudarSpot === 'steps' ? 'Burada oturalım. Jó — innen hallani a vizet.' : adventure.uskudarSpot === 'tea' ? 'Bir çay içelim. A kilátás pohárral a kezünkben is ugyanilyen szép.' : 'Te választasz. A naplemente mindkét helyről megvár.',
    whisper: '',
    body: () => adventure.uskudarSpot
      ? `<button class="primary-button full" data-next>Nézzük együtt <span>→</span></button>`
      : `<div class="choice-row"><button data-uskudar-spot="steps"><strong>Burada oturalım.</strong><small>Üljünk le itt.</small></button><button data-uskudar-spot="tea"><strong>Bir çay içelim.</strong><small>Igyunk egy teát.</small></button></div>`
  },
  {
    eyebrow: 'Üsküdar · Amikor elég egy mondat',
    title: 'A túlpart most aranyszínű.',
    lead: 'Nem kell minden minaretet és hajót megnevezned. Elég elmondani, amit most valóban érzel.',
    ali: () => adventure.sunsetView ? 'Evet. Çok güzel. Ali is ugyanabba az irányba néz, és nem magyaráz tovább.' : 'Mondd csak: Manzara çok güzel.',
    whisper: 'Ali ugyanabba az irányba néz.',
    body: () => adventure.sunsetView
      ? `<button class="primary-button full" data-next>Maradjunk ebben a pillanatban <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Nagyon szép a kilátás</span><strong>Manzara çok güzel.</strong></div><button class="primary-button full" data-sunset-view="say">Ezt most tényleg így érzem <span>→</span></button>`
  },
  {
    eyebrow: 'Üsküdar · Emlék vagy jelenlét',
    title: 'Készítsünk egy képet?',
    lead: 'Ali csak akkor veszi elő a telefonját, ha szeretnéd. Ha inkább néznéd a vizet, a telefon marad a zsebében.',
    ali: () => adventure.sunsetMemory === 'photo' ? 'Rendben. Egy kép készül, aztán elteszem a telefont.' : adventure.sunsetMemory === 'watch' ? 'Biraz daha bakalım. Jó — nézzük még egy kicsit.' : 'Ahogy szeretnéd.',
    whisper: '',
    body: () => adventure.sunsetMemory
      ? `<button class="primary-button full" data-next>Kigyúlnak a város fényei <span>→</span></button>`
      : `<div class="choice-row"><button data-sunset-memory="photo"><strong>Bir fotoğraf çekelim mi?</strong><small>Készítsünk egy képet?</small></button><button data-sunset-memory="watch"><strong>Biraz daha bakalım.</strong><small>Nézzük még egy kicsit.</small></button></div>`
  },
  {
    eyebrow: 'Az első nap vége',
    title: 'Holnap reggel szezámillatnál találkozunk.',
    lead: `Az este ${adventure.sunsetMemory === 'photo' ? 'egy közös képpel' : 'egy telefon nélküli csenddel'} kerül az útinaplóba. A következő jelenet már másnap reggel kezdődik.`,
    ali: `${adventure.name || 'Vendégem'}, holnap csak kövesd az illatot. A friss simitet nem lehet eltéveszteni.`,
    whisper: 'Az első nap itt csendesen véget ér.',
    body: () => `<div class="intro-card"><span>Az esti mondataid</span><strong>Manzara çok güzel.</strong><strong>${adventure.sunsetMemory === 'photo' ? 'Bir fotoğraf çekelim mi?' : 'Biraz daha bakalım.'}</strong></div><button class="primary-button full" data-causal-next="5">Találkozzunk holnap reggel <span>→</span></button>`
  }
];

const causalBakeryScenes = [
  {
    eyebrow: 'Másnap reggel · Üsküdar',
    title: 'Hány simitet kérjünk?',
    lead: 'A pékség tálcáján még meleg a simit. Amit választasz, az kerül a papírzacskóba.',
    ali: () => adventure.bakeryOrder === 'two' ? 'İki simit, lütfen. Kettőt kérsz — ez már közös reggeli.' : adventure.bakeryOrder === 'one' ? 'Bir simit, lütfen. Egyet kérsz.' : 'Hányat kérjünk?',
    whisper: 'A papírzacskó még meleg.',
    body: () => adventure.bakeryOrder
      ? `<button class="primary-button full" data-next>Megrendelem <span>→</span></button>`
      : `<div class="choice-row"><button data-bakery-order="one"><strong>Bir simit, lütfen.</strong><small>Egy simitet kérek.</small></button><button data-bakery-order="two"><strong>İki simit, lütfen.</strong><small>Két simitet kérek.</small></button></div>`
  },
  {
    eyebrow: 'Simitçi · Kérsz mellé valamit?',
    title: 'Tea is kerüljön a tálcára?',
    lead: 'Az eladó a teára mutat. Hozzáteheted a rendeléshez, vagy jelezheted, hogy ennyi elég.',
    ali: () => adventure.bakeryDrink === 'tea' ? 'Bir çay da lütfen. Már teszi is mellé.' : adventure.bakeryDrink === 'none' ? 'Bu kadar, teşekkürler. Rendben — csak a simit.' : 'Te döntöd el, mi legyen a teljes reggelid.',
    whisper: '',
    body: () => adventure.bakeryDrink
      ? `<button class="primary-button full" data-next>Ez lesz a reggelim <span>→</span></button>`
      : `<div class="choice-row"><button data-bakery-drink="tea"><strong>Bir çay da lütfen.</strong><small>Egy teát is kérek.</small></button><button data-bakery-drink="none"><strong>Bu kadar, teşekkürler.</strong><small>Ennyi lesz, köszönöm.</small></button></div>`
  },
  {
    eyebrow: 'Simitçi · Az első falat',
    title: 'Friss, meleg és egyszerű.',
    lead: 'Ali megvárja, amíg megkóstolod. Az első falat után szinte magától jön a mondat.',
    ali: () => adventure.simitTaste ? 'Tudtam, hogy ezt meg kell mutatnom.' : 'Na, milyen?',
    whisper: 'A szezám illata még sokáig elkísér.',
    body: () => adventure.simitTaste
      ? `<button class="primary-button full" data-next>Indulhatunk tovább <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Nagyon finom</span><strong>Çok lezzetli.</strong></div><button class="primary-button full" data-simit-taste="delicious">Çok lezzetli <span>→</span></button>`
  },
  {
    eyebrow: 'Üsküdar → Eminönü → Sultanahmet',
    title: 'A reggeli után visszatérünk az európai oldalra.',
    lead: 'Az átkelés most nem új kaland, csak az út része. Eminönüből felsétáltok Sultanahmetbe, ahol a város hangja lassan elcsendesedik.',
    ali: 'Most mutatok egy helyet, ahol a csendnek is van helye.', whisper: '',
    image: 'assets/web/ALI-SCN-009-blue-mosque-courtyard.webp', time: '10:10', caption: 'A város itt halkabban fogad.', postmark: 'Sultanahmet', postmarkMeta: '10:10 · Sessizce',
    body: () => `<div class="intro-card"><span>A reggeli rendelésed</span><strong>${adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.'}</strong><strong>${adventure.bakeryDrink === 'tea' ? 'Bir çay da lütfen.' : 'Bu kadar, teşekkürler.'}</strong><strong>Çok lezzetli.</strong></div><button class="primary-button full" data-causal-next="6">Menjünk az udvarba <span>→</span></button>`
  }
];

const causalMosqueScenes = [
  {
    eyebrow: 'Sultanahmet · A csendes udvar',
    title: 'Merre van a bejárat?',
    lead: 'Több kapu és külön sor látszik. Nem kell előre mindent tudnod — egy rövid kérdés megmutatja az irányt.',
    ali: () => adventure.mosqueDirection ? 'Egy helyi a jobb oldali kapu felé mutat. Most már tudjuk, merre induljunk.' : 'Kérdezd meg nyugodtan: Giriş nerede?',
    whisper: 'A jobb oldali kapu kinyílik előttetek.',
    body: () => adventure.mosqueDirection
      ? `<button class="primary-button full" data-next>Menjünk a bejárathoz <span>→</span></button>`
      : `<div class="phrase-card"><span class="phrase-label">Hol van a bejárat?</span><strong>Giriş nerede?</strong></div><button class="primary-button full" data-mosque-direction="ask">Megkérdezem <span>→</span></button>`
  },
  {
    eyebrow: 'Mielőtt beléptek',
    title: 'Ali nem kérdez vissza. Megmutatja.',
    lead: 'Mások a cipőjükért nyúlnak. Ali is leveszi a sajátját, és csendesen jelzi, hol teheted le a tiédet.',
    ali: 'Itt levesszük. Gyere, mutatom.',
    whisper: 'Ali mozdulatából érted meg a hely ritmusát.',
    body: () => `<button class="primary-button full" data-next>Belépünk <span>→</span></button>`
  },
  {
    eyebrow: 'Sultanahmet · Fény a csempéken',
    title: 'Készítesz fényképet?',
    lead: 'Ha képet szeretnél, előbb engedélyt kérsz. Ha most csak néznél, a telefon a zsebedben marad.',
    ali: () => adventure.mosquePermission === 'photo' ? 'Megengedték. Készíts egyet, aztán tegyük el a telefont.' : adventure.mosquePermission === 'look' ? 'Sadece bakacağım. Jó — most csak körülnézünk.' : 'Mindkettő tiszteletteljes választás.',
    whisper: '',
    body: () => adventure.mosquePermission
      ? `<button class="primary-button full" data-next>Maradjunk még egy percet <span>→</span></button>`
      : `<div class="choice-row"><button data-mosque-permission="photo"><strong>Fotoğraf çekebilir miyim?</strong><small>Fényképezhetek?</small></button><button data-mosque-permission="look"><strong>Sadece bakacağım.</strong><small>Csak nézelődöm.</small></button></div>`
  },
  {
    eyebrow: 'Sultanahmet → Nagy Bazár',
    title: 'Kiléptek a térre, és visszatér a város hangja.',
    lead: 'A látogatás után Ali a bazár felé mutat. Innen már hallani az árusokat és a réztálak csengését.',
    ali: 'Gyere. Innen már a bazár hív tovább.', whisper: '',
    image: 'assets/web/ALI-SCN-004-grand-bazaar.webp', time: '12:30', caption: 'A csend után újra megtelik hanggal a város.', postmark: 'Kapalıçarşı', postmarkMeta: '12:30 · Hoş geldin',
    body: () => `<div class="intro-card"><span>A mondatok, amelyekkel tisztelettel érkeztél</span><strong>Giriş nerede?</strong><strong>${adventure.mosquePermission === 'photo' ? 'Fotoğraf çekebilir miyim?' : 'Sadece bakacağım.'}</strong></div><button class="primary-button full" data-causal-next="7">Menjünk a bazárba <span>→</span></button>`
  }
];

const causalBazaarScenes = [
  {
    eyebrow: 'Nagy Bazár · Valami megállít',
    title: 'Mi tetszett meg?',
    lead: 'A színek és anyagok között három dolgon időzik el a tekinteted. Melyiket vennéd kézbe?',
    ali: () => adventure.bazaarItem === 'scarf' ? 'A kendő? Nézzük meg közelebbről.' : adventure.bazaarItem === 'jacket' ? 'A kabát? Jó, kérjük el.' : adventure.bazaarItem === 'shoes' ? 'A cipő? Szép választás.' : 'Megakadt valamin a szemed?',
    whisper: 'A bazárban néha egyetlen szín állít meg.',
    body: () => adventure.bazaarItem
      ? `<button class="primary-button full" data-next>Megnézem közelebbről <span>→</span></button>`
      : `<div class="choice-row"><button data-bazaar-item="scarf">Egy kendő</button><button data-bazaar-item="jacket">Egy kabát</button><button data-bazaar-item="shoes">Egy pár cipő</button></div>`
  },
  {
    eyebrow: 'Nagy Bazár · Az eladó rád néz',
    title: 'Mennyibe kerül?',
    lead: 'Az eladó a kezedbe adja a kiválasztott darabot. A kérdés minden tárgynál ugyanúgy használható.',
    ali: 'Most te intézed. Én itt állok melletted.', whisper: '',
    body: () => `<div class="phrase-card"><span class="phrase-label">Ez mennyibe kerül?</span><strong>Bu ne kadar?</strong></div><button class="primary-button full" data-next>Megkérdezem az árát <span>→</span></button>`
  },
  {
    eyebrow: 'Nagy Bazár · Az ár után',
    title: 'Kérsz egy kis kedvezményt?',
    lead: 'Az ár magasabb, mint remélted. Alkudhatsz, de udvariasan tovább is léphetsz. Ali nem szól közbe.',
    ali: () => adventure.bargain === 'ask' ? 'Az eladó elmosolyodik, számol egyet, és lejjebb írja az árat.' : adventure.bargain === 'pay' ? 'Az eladó bólint. Nem minden találkozásból kell alkut csinálni.' : 'Te döntesz, hogyan folytatódjon.',
    whisper: 'Az alku itt beszélgetés is lehet.',
    body: () => adventure.bargain
      ? `<button class="primary-button full" data-next>Meghallgatom a végső árat <span>→</span></button>`
      : `<div class="choice-row"><button data-bargain="ask"><strong>Biraz indirim olur mu?</strong><small>Lehet egy kis kedvezmény?</small></button><button data-bargain="pay"><strong>Teşekkür ederim.</strong><small>Köszönöm.</small></button></div>`
  },
  {
    eyebrow: 'Nagy Bazár · Te döntesz',
    title: () => adventure.purchase ? 'A vásárlás lezárult.' : 'Magaddal viszed?',
    lead: () => adventure.purchase === 'buy' ? 'A kiválasztott tárgy bekerül a szatyorba és az útinaplódba.' : adventure.purchase === 'leave' ? 'A tárgy marad, de a mondataid veled jönnek.' : 'Az eladó kimondja az utolsó árat. A végső döntés a tiéd.',
    ali: () => adventure.purchase === 'buy' ? 'Jó választás. De még jobb, hogy te intézted.' : adventure.purchase === 'leave' ? 'Az emlékhez nem kellett szatyor.' : 'Tetszik annyira, hogy elvidd?',
    whisper: '',
    body: () => adventure.purchase
      ? `<div class="intro-card"><span>A bazári mondataid</span><strong>Bu ne kadar?</strong><strong>${adventure.bargain === 'ask' ? 'Biraz indirim olur mu?' : 'Teşekkür ederim.'}</strong><strong>${adventure.purchase === 'buy' ? 'Bunu alıyorum.' : 'Hayır, teşekkürler.'}</strong></div><button class="primary-button full" data-causal-next="8">Menjünk ki a parkba <span>→</span></button>`
      : `<div class="choice-row"><button data-purchase="buy"><strong>Bunu alıyorum.</strong><small>Ezt kérem.</small></button><button data-purchase="leave"><strong>Hayır, teşekkürler.</strong><small>Nem, köszönöm.</small></button></div>`
  }
];

const causalParkScenes = [
  {
    eyebrow: 'Gülhane · A bazár után',
    title: 'Most milyen tempó esne jól?',
    lead: 'A bazár zaja elmarad mögöttetek. A pad és a lassú ösvény két külön ritmust ad a következő pillanatnak.',
    ali: () => adventure.parkPace === 'sit' ? 'Biraz dinlenelim. Jó — ez a pad mintha ránk várt volna.' : adventure.parkPace === 'walk' ? 'Yavaş yürüyelim. Rendben, sétáljunk lassan.' : 'Te mondod meg a tempót. Van időnk.',
    whisper: 'Ali a te lépéseidhez igazodik.',
    body: () => adventure.parkPace
      ? `<button class="primary-button full" data-next>Jólesik ez a tempó <span>→</span></button>`
      : `<div class="choice-row"><button data-park-pace="sit"><strong>Biraz dinlenelim.</strong><small>Pihenjünk egy kicsit.</small></button><button data-park-pace="walk"><strong>Yavaş yürüyelim.</strong><small>Sétáljunk lassan.</small></button></div>`
  },
  {
    eyebrow: 'Gülhane · Ali rád néz',
    title: 'Hogy érzed magad?',
    lead: 'Ali nem udvariasságból kérdezi. A válaszod után tényleg a te tempódhoz igazodik.',
    ali: () => adventure.parkFeeling === 'tired' ? 'Yorgunum. Akkor megállunk, és nem kell tovább sietni.' : adventure.parkFeeling === 'good' ? 'İyiyim. Örülök neki — azért még maradhatunk.' : 'Egy szó elég.',
    whisper: '',
    body: () => adventure.parkFeeling
      ? `<button class="primary-button full" data-next>Maradjunk még egy percre <span>→</span></button>`
      : `<div class="choice-row"><button data-park-feeling="good"><strong>İyiyim.</strong><small>Jól vagyok.</small></button><button data-park-feeling="tired"><strong>Yorgunum.</strong><small>Fáradt vagyok.</small></button></div>`
  },
  {
    eyebrow: 'Gülhane · Ali kínál valamit',
    title: 'Kérsz vizet?',
    lead: 'Ali elővesz egy palackot. Most a válaszod szerint adja oda, vagy egyszerűen visszateszi a táskájába.',
    ali: () => adventure.needsWater === 'yes' ? 'Persze. Már adom is.' : adventure.needsWater === 'no' ? 'Rendben. Akkor csak maradok itt veled.' : 'Su ister misin?',
    whisper: '',
    body: () => adventure.needsWater
      ? `<button class="primary-button full" data-next>Most már indulhatunk <span>→</span></button>`
      : `<div class="choice-row"><button data-water="yes"><strong>Evet, lütfen.</strong><small>Igen, kérek.</small></button><button data-water="no"><strong>Hayır, teşekkürler.</strong><small>Nem, köszönöm.</small></button></div>`
  },
  {
    eyebrow: 'Gülhane → vízpart',
    title: 'A pihenés után már te mondod meg, merre tovább.',
    lead: 'A park hangjai lassan vízparti hangokra váltanak. Ali a kapunál megáll, és ezúttal nem mutat újabb úticélt.',
    ali: 'Most már te hívd meg azt, akivel egész nap sétáltál.', whisper: '',
    image: 'assets/web/ALI-SCN-010-waterfront-promenade.webp', time: '17:10', caption: 'A vízparton most már te választasz irányt.', postmark: 'Sahil', postmarkMeta: '17:10 · Birlikte',
    body: () => `<div class="intro-card"><span>A mondatok, amelyekkel Ali hozzád igazodott</span><strong>${adventure.parkPace === 'sit' ? 'Biraz dinlenelim.' : 'Yavaş yürüyelim.'}</strong><strong>${adventure.parkFeeling === 'tired' ? 'Yorgunum.' : 'İyiyim.'}</strong><strong>${adventure.needsWater === 'yes' ? 'Evet, lütfen.' : 'Hayır, teşekkürler.'}</strong></div><button class="primary-button full" data-causal-next="9">Menjünk vissza a vízhez <span>→</span></button>`
  }
];

const causalWaterfrontScenes = [
  {
    eyebrow: 'Vízpart · Ali megáll',
    title: 'Most nem ő mutatja az utat.',
    lead: 'A víznél Ali melléd áll, és vár. Tíz állomás után először nem ő hív tovább valahová.',
    ali: 'Most mit szeretnél?', whisper: 'Ali most a te meghívásodra vár.',
    body: () => `<button class="primary-button full" data-next>Most én választok <span>→</span></button>`
  },
  {
    eyebrow: 'A vendég meghívása',
    title: 'Hová hívnád most Alit?',
    lead: 'Nem egy helyes választ keresel. A közös programot már te javaslod törökül.',
    ali: () => adventure.waterfrontPlan === 'tea' ? 'Çay içelim. Sejtettem, hogy a végén visszatérünk a teához.' : adventure.waterfrontPlan === 'ferry' ? 'Vapura binelim. Jó — most te viszel engem a vízre.' : adventure.waterfrontPlan === 'walk' ? 'Biraz daha yürüyelim. Van még időnk.' : 'Most te hívsz meg engem.',
    whisper: '',
    body: () => adventure.waterfrontPlan
      ? `<button class="primary-button full" data-next>Most már ez a mi tervünk <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-waterfront-plan="tea"><strong>Çay içelim.</strong><small>Igyunk teát.</small></button></div><div class="question-choice"><button data-waterfront-plan="ferry"><strong>Vapura binelim.</strong><small>Szálljunk kompra.</small></button></div><div class="question-choice"><button data-waterfront-plan="walk"><strong>Biraz daha yürüyelim.</strong><small>Sétáljunk még egy kicsit.</small></button></div></div>`
  },
  {
    eyebrow: 'Ali zsebében',
    title: 'Melyik mondatot vinnéd haza?',
    lead: 'Tíz állomás után sok mondat kísér. Válassz egyet, amelyet egy valódi utazáson is használnál.',
    ali: () => adventure.favoritePhrase ? `Ezt tedd el: ${selectedFavoritePhrase()} A többit majd együtt megtaláljuk.` : 'Egy mondat is elég ahhoz, hogy legyen mihez visszatérni.',
    whisper: 'A többi mondat megvár benneteket.',
    body: () => adventure.favoritePhrase
      ? `<div class="phrase-card"><span class="phrase-label">Ezt viszed magaddal</span><strong>${selectedFavoritePhrase()}</strong></div><button class="primary-button full" data-next>Még egy pillanat, Ali <span>→</span></button>`
      : `<div class="question-list"><div class="question-choice"><button data-favorite-phrase="plan"><strong>${selectedPlanPhrase()}</strong><small>A saját meghívásom.</small></button></div><div class="question-choice"><button data-favorite-phrase="tea"><strong>Bir çay, lütfen.</strong><small>Egy teát kérek.</small></button></div><div class="question-choice"><button data-favorite-phrase="direction"><strong>Giriş nerede?</strong><small>Hol van a bejárat?</small></button></div><div class="question-choice"><button data-favorite-phrase="thanks"><strong>Teşekkür ederim.</strong><small>Köszönöm.</small></button></div></div>`
  },
  {
    eyebrow: 'Az első isztambuli utad',
    title: 'Isztambul már nem teljesen idegen.',
    lead: 'Köszöntél, bemutatkoztál, rendeltél, kérdeztél, választottál és segítséget kértél. Tíz állomással ezelőtt Ali mutatta az utat. Most már te hívod őt tovább.',
    ali: 'Görüşürüz. Most már tudod, hogyan találsz vissza.', whisper: 'A búcsúban benne marad a következő találkozás.',
    body: () => `<div class="journey-completion"><div class="completion-intro"><span>Ami már veled jön</span><strong>${escapeHtml(adventure.name || 'Vendégem')}, ennyi mindent vittél véghez törökül.</strong></div><div class="completion-grid"><article><span>01</span><h3>Megérkezem</h3><p>Merhaba.${adventure.name ? ` Benim adım ${escapeHtml(adventure.name)}.` : ''}<br>${nationalityCopy().tr}</p></article><article><span>02</span><h3>Eligazodom</h3><p>İstanbulkart geçerli mi?<br>Bu vapur Üsküdar'a gidiyor mu?<br>Giriş nerede?</p></article><article><span>03</span><h3>Kapcsolódom</h3><p>Bir çay, lütfen.<br>Teşekkür ederim.<br>Manzara çok güzel.</p></article><article><span>04</span><h3>Döntök</h3><p>Bu ne kadar?<br>${adventure.purchase === 'buy' ? 'Bunu alıyorum.' : 'Hayır, teşekkürler.'}<br>${selectedPlanPhrase()}</p></article></div><div class="completion-keepsake"><span>Ali zsebében</span><strong>${selectedFavoritePhrase()}</strong><small>Ezt az egy mondatot választottad személyes útravalónak. A többi sem veszett el.</small></div></div><div class="adventure-actions completion-actions"><button class="primary-button" data-complete-journey>Tedd el az első utamat</button><a class="knowledge-link" href="zseb.html?from=journey" data-open-knowledge>Megnézem, mi jön velem <span>→</span></a><button class="quiet-choice" data-restart>Egyszer még végigsétálom</button></div>`
  }
];

const causalJourneyMeta = [
  { label:'Kaland 01 / 10 · Megérkeztél', image:'assets/web/ALI-SCN-001-galata-sunrise.webp', time:'07:12', caption:'A város még csak ébredezik.', postmark:'Galata', postmarkMeta:'07:12 · Hoş geldin' },
  { label:'Kaland 02 / 10 · Egy tea mellett', image:'assets/web/ALI-SCN-002-karakoy-teahouse.webp', time:'08:20', caption:'A tea mellett van időnk.', postmark:'Karaköy', postmarkMeta:'08:20 · Bir çay?' },
  { label:'Kaland 03 / 10 · A piros villamos', image:'assets/web/ALI-SCN-006-nostalgic-tram.webp', time:'10:15', caption:'A város csilingelve halad tovább.', postmark:'Taksim', postmarkMeta:'10:15 · Tramvay' },
  { label:'Kaland 04 / 10 · Átkelés', image:'assets/web/ALI-SCN-003-bosphorus-ferry.webp', time:'16:40', caption:'Most már tudod, melyik hajóra szállsz.', postmark:'Boğaziçi', postmarkMeta:'16:40 · Vapur' },
  { label:'Kaland 05 / 10 · Fények a túlparton', image:'assets/web/ALI-SCN-007-uskudar-sunset.webp', time:'19:18', caption:'Két part ugyanabban a fényben.', postmark:'Üsküdar', postmarkMeta:'19:18 · Gün batımı' },
  { label:'Kaland 06 / 10 · A reggel íze', image:'assets/web/ALI-SCN-008-simit-bakery.webp', time:'08:35', caption:'A reggelnek friss simit illata van.', postmark:'Simitçi', postmarkMeta:'08:35 · Taze simit' },
  { label:'Kaland 07 / 10 · A csendes udvar', image:'assets/web/ALI-SCN-009-blue-mosque-courtyard.webp', time:'10:10', caption:'A város itt halkabban fogad.', postmark:'Sultanahmet', postmarkMeta:'10:10 · Sessizce' },
  { label:'Kaland 08 / 10 · A bazárban', image:'assets/web/ALI-SCN-004-grand-bazaar.webp', time:'12:30', caption:'Minden szín egy új történet.', postmark:'Kapalıçarşı', postmarkMeta:'12:30 · Hoş geldin' },
  { label:'Kaland 09 / 10 · Egy kis pihenő', image:'assets/web/ALI-SCN-005-gulhane-park.webp', time:'15:30', caption:'A város itt egy kicsit lelassul.', postmark:'Gülhane', postmarkMeta:'15:30 · Biraz dinlenelim' },
  { label:'Kaland 10 / 10 · Most te hívsz', image:'assets/web/ALI-SCN-010-waterfront-promenade.webp', time:'17:10', caption:'A vízparton már te választasz irányt.', postmark:'Sahil', postmarkMeta:'17:10 · Görüşürüz' }
];

const adventureLibrary = [causalGalataScenes, causalKarakoyScenes, causalTramScenes, causalFerryScenes, causalUskudarScenes, causalBakeryScenes, causalMosqueScenes, causalBazaarScenes, causalParkScenes, causalWaterfrontScenes];
const causalSceneSets = new Set(adventureLibrary);
let scenes = causalGalataScenes;

function escapeHtml(value = '') { return value.replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }
const JOURNAL_KEY = 'ali-travel-journal-v2';
const MEMORY_KEY = 'ali-companion-memory-v2';
const PHRASE_KEY = 'ali-phrase-progress-v2';
const RHYTHM_KEY = 'ali-companion-rhythm-v2';
let journalFallback = [];
let memoryFallback = [];
let phraseFallback = [];
let rhythmFallback = { slow:0, brisk:0, support:0, confidence:0, signals:0 };
const memoryLabels = {
  pace: 'A tempód', tea: 'A teád', conversation: 'A határaid', bazaar_find: 'A bazári választásod',
  breakfast_drink: 'A reggeli italod', favorite_phrase: 'Újra kimondanád', last_adventure: 'Legutóbbi állomás'
};

function phraseId(phrase = '') {
  return phrase.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
}

function readRhythm() {
  try {
    const stored = JSON.parse(localStorage.getItem(RHYTHM_KEY) || 'null');
    return stored && typeof stored === 'object' ? { ...rhythmFallback, ...stored } : { ...rhythmFallback };
  } catch { return { ...rhythmFallback }; }
}

function writeRhythm(profile) {
  rhythmFallback = profile;
  try { localStorage.setItem(RHYTHM_KEY, JSON.stringify(profile)); } catch { /* A munkamenetben így is megmarad. */ }
  renderFamiliarity();
}

function recordRhythm(signal) {
  if (!['slow','brisk','support','confidence'].includes(signal)) return;
  const profile = readRhythm();
  profile[signal] = (profile[signal] || 0) + 1;
  profile.signals = (profile.signals || 0) + 1;
  profile.updatedAt = new Date().toISOString();
  writeRhythm(profile);
}

function rhythmMode() {
  const profile = readRhythm();
  const pace = profile.slow >= profile.brisk + 2 ? 'slow' : profile.brisk >= profile.slow + 2 ? 'brisk' : 'balanced';
  const support = profile.support > profile.confidence + 1 ? 'supportive' : profile.confidence > profile.support + 1 ? 'confident' : 'balanced';
  return { ...profile, pace, support };
}

function clearRhythm() {
  rhythmFallback = { slow:0, brisk:0, support:0, confidence:0, signals:0 };
  try { localStorage.removeItem(RHYTHM_KEY); } catch { /* Nincs további teendő. */ }
  renderFamiliarity();
}

function readPhraseProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(PHRASE_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(item => item?.id && item?.phrase) : [];
  } catch { return phraseFallback; }
}

function writePhraseProgress(items) {
  phraseFallback = items;
  try { localStorage.setItem(PHRASE_KEY, JSON.stringify(items)); } catch { /* Az aktuális látogatásban így is megmarad. */ }
  renderFamiliarity();
}

function isPracticeSafe(adventureNumber, phrase) {
  if (adventureNumber === 7) return [phraseId('İyi akşamlar.'), phraseId('Biraz dinlenelim.')].includes(phraseId(phrase));
  if (adventureNumber === 5) return phraseId(phrase) === phraseId('Biraz dinlenelim.');
  return true;
}

function trackPhrase(phrase, status, adventureNumber) {
  if (!phrase || !isPracticeSafe(adventureNumber, phrase)) return;
  const id = phraseId(phrase);
  const items = readPhraseProgress();
  const current = items.find(item => item.id === id) || { id, phrase, status:'new', encounters:0, contexts:[] };
  const contexts = [...new Set([...(current.contexts || []), adventureNumber])];
  const ranks = { new:0, used:1, saved:2, returned:3, familiar:4 };
  let nextStatus = ranks[status] > ranks[current.status] ? status : current.status;
  if (contexts.length >= 3) nextStatus = 'familiar';
  const updated = {
    ...current, phrase, status:nextStatus, contexts,
    encounters:(current.encounters || 0) + 1,
    lastAdventure:adventureNumber, updatedAt:new Date().toISOString(),
    ...(status === 'returned' ? { lastReturnedAdventure:adventureNumber, returnCount:(current.returnCount || 0) + 1 } : { returnCount:current.returnCount || 0 })
  };
  writePhraseProgress([...items.filter(item => item.id !== id), updated]);
}

function migrateJournalPhrases() {
  if (readPhraseProgress().length) return;
  const migrated = [];
  readJournal().forEach(entry => (entry.phrases || []).forEach(phrase => {
    if (!isPracticeSafe(entry.id, phrase)) return;
    const id = phraseId(phrase);
    const current = migrated.find(item => item.id === id);
    if (current) current.contexts = [...new Set([...current.contexts, entry.id])];
    else migrated.push({ id, phrase, status:'used', encounters:1, contexts:[entry.id], lastAdventure:entry.id, updatedAt:new Date().toISOString() });
  }));
  if (migrated.length) writePhraseProgress(migrated);
}

function readMemories() {
  try {
    const stored = JSON.parse(localStorage.getItem(MEMORY_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(item => item && memoryLabels[item.key]) : [];
  } catch { return memoryFallback; }
}

function writeMemories(memories) {
  memoryFallback = memories;
  try { localStorage.setItem(MEMORY_KEY, JSON.stringify(memories)); } catch { /* Helyi munkamenetben tovább él. */ }
  renderMemoryShelf();
}

function remember(key, value, valueLabel, source, sensitivity = 'low') {
  if (!memoryLabels[key] || !value) return;
  const memories = readMemories();
  const memory = { key, value, valueLabel, label:memoryLabels[key], source, sensitivity, recallable:true, updatedAt:new Date().toISOString() };
  writeMemories([...memories.filter(item => item.key !== key), memory]);
}

function forgetMemory(key) { writeMemories(readMemories().filter(item => item.key !== key)); }

function captureMemories(number) {
  if (number === 2) {
    remember('tea', 'karakoy', 'Teát kértél Karaköyben', 2);
  }
  if (number === 8 && adventure.bazaarItem) {
    const labels = { scarf:'A kendő állított meg', jacket:'A dzsekit választottad', shoes:'A cipőt választottad' };
    remember('bazaar_find', adventure.bazaarItem, labels[adventure.bazaarItem], 8);
  }
  if (number === 9 && adventure.parkPace === 'sit') remember('pace', 'slow', 'Jólesik, ha nem sietünk', 9);
  if (number === 6 && adventure.bakeryDrink) {
    const labels = { tea:'Teát választottál a simit mellé', none:'Most csak simitet kértél' };
    remember('breakfast_drink', adventure.bakeryDrink, labels[adventure.bakeryDrink], 6);
  }
  if (number === 10 && adventure.favoritePhrase) remember('favorite_phrase', selectedFavoritePhrase(), selectedFavoritePhrase(), 10);
  remember('last_adventure', String(number), journalPlaces[number - 1]?.[0] || `Kaland ${number}`, number);
}
const journalPlaces = [
  ['Galata', '07:12', 'assets/web/ALI-SCN-001-galata-sunrise.webp'],
  ['Karaköy', '08:20', 'assets/web/ALI-SCN-002-karakoy-teahouse.webp'],
  ['Tramvay', '10:15', 'assets/web/ALI-SCN-006-nostalgic-tram.webp'],
  ['Boğaziçi', '16:40', 'assets/web/ALI-SCN-003-bosphorus-ferry.webp'],
  ['Üsküdar', '19:18', 'assets/web/ALI-SCN-007-uskudar-sunset.webp'],
  ['Simitçi', '08:35', 'assets/web/ALI-SCN-008-simit-bakery.webp'],
  ['Sultanahmet', '10:10', 'assets/web/ALI-SCN-009-blue-mosque-courtyard.webp'],
  ['Kapalıçarşı', '12:30', 'assets/web/ALI-SCN-004-grand-bazaar.webp'],
  ['Gülhane', '15:30', 'assets/web/ALI-SCN-005-gulhane-park.webp'],
  ['Sahil', '17:10', 'assets/web/ALI-SCN-010-waterfront-promenade.webp']
];

function readJournal() {
  try {
    const stored = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(entry => entry && Number.isInteger(entry.id)) : [];
  } catch { return journalFallback; }
}

function writeJournal(entries) {
  journalFallback = entries;
  try { localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries)); } catch { /* A napló az aktuális látogatásban akkor is működik. */ }
  updateJournalCount(entries);
}

function updateJournalCount(entries = readJournal()) {
  journalCount.textContent = entries.length;
  journalToggle.classList.toggle('has-memories', entries.length > 0);
  if (journeyTicketCount) journeyTicketCount.textContent = `${String(entries.length).padStart(2,'0')} / 10`;
  document.querySelectorAll('[data-adventure]').forEach(button => button.closest('.journey-card')?.classList.toggle('remembered', entries.some(entry => entry.id === Number(button.dataset.adventure) + 1)));
}

function goldenDayOneStory(number) {
  const guest = adventure.name || 'A vendég';
  const stories = {
    1: {
      title: `${guest} első isztambuli reggele`,
      summary: `A Galata hídon Ali helyet csinált melletted. ${adventure.greeting === 'wave' ? 'Először csak visszaintegettél.' : 'Azt mondtad: Merhaba.'}`,
      phrases: ['Merhaba.', ...(adventure.name ? [`Benim adım ${adventure.name}.`] : [])],
      memory: adventure.question === 'view' ? 'Még egy csendes perc a víznél' : 'Poharak csörrenése Karaköy felől',
      note: adventure.name ? `${adventure.name}, nem a kiejtésedre emlékszem. Arra, hogy válaszoltál.` : 'Nem kellett bemutatkoznod ahhoz, hogy vendégül lássalak.'
    },
    2: {
      title: `${guest} helye az asztalnál`,
      summary: `${adventure.seat === 'window' ? 'Kint, az utcánál' : 'Bent, a pult közelében'} ültetek le. ${adventure.tea === 'gesture' ? 'A teát ma elég volt felismerned.' : 'Te kérted ki az első teádat.'}`,
      phrases: [...(adventure.tea === 'gesture' ? [] : ['Bir çay, lütfen.']), 'Teşekkür ederim.'],
      memory: adventure.sugar === 'yes' ? 'A tea cukorral' : 'A tea cukor nélkül',
      note: adventure.tea === 'gesture' ? 'A mondat megvárt. A vendégszeretet nem kér belépőjegyet.' : 'Már tudom, hogyan szereted a teádat.'
    },
    3: {
      title: `${guest} átkelése`,
      summary: `${adventure.ferryPlace === 'deck' ? 'A fedélzetről' : 'Az ablak mellől'} néztétek a várost, és egyetlen részletet választottál ki belőle.`,
      phrases: ['Vapur.', adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü.' : 'Kıvırcık saçlı.'],
      memory: adventure.observed === 'child' ? 'A sirályok a komp mellett' : adventure.observed === 'woman' ? 'Egy piros részlet a szélben' : 'Egy ismerős utas a kompon',
      note: 'Kíváncsi voltam, milyennek látsz. Egyetlen részlet bőven elég volt.'
    },
    7: {
      title: `${guest} első isztambuli estéje`,
      summary: `${adventure.uskudarSpot === 'steps' ? 'A vízparti lépcsőn' : 'A teázó melletti fényben'} néztétek, ahogy kigyullad a túlpart.`,
      phrases: [...(adventure.eveningGreeting === 'say' ? ['İyi akşamlar.'] : []), ...(adventure.restChoice === 'rest' ? ['Biraz dinlenelim.'] : [])],
      memory: adventure.sunsetMemory === 'light' ? 'A túlpart fénye' : adventure.sunsetMemory === 'sound' ? 'A komp hangja' : adventure.sunsetMemory === 'sentence' ? 'Egy mondat' : 'A közös csend',
      note: 'Nem kérdeztem tovább. Az este attól lett közös, hogy volt időnk benne maradni.'
    }
  };
  return stories[number] || null;
}

function journalStory(number) {
  const goldenStory = [coherentGalataScenes, coherentKarakoyScenes, coherentFerryScenes, refinedGalataScenes, goldenGalataScenes, goldenKarakoyScenes, goldenFerryScenes, goldenUskudarScenes].includes(scenes) ? goldenDayOneStory(number) : null;
  if (goldenStory) return goldenStory;
  const guest = adventure.name || 'A vendég';
  const stories = {
    1: {
      title: `${guest} első isztambuli reggele`,
      summary: `A Galata hídon először köszöntél Alinak, majd törökül is elmondtad: ${nationalityCopy().hu.toLowerCase()}`,
      phrases: ['Merhaba.', adventure.name ? `Benim adım ${adventure.name}.` : nationalityCopy().tr, nationalityCopy().tr],
      memory: adventure.savedCulture ? 'Kolay gelsin · figyelmesség munka közben' : 'A város első ismerős mondata',
      note: adventure.greeting === 'wave' ? 'Először csak intettél. Attól még rögtön tudtam, hogy megérkeztél.' : 'Nem a kiejtésedre emlékszem. Arra, hogy megszólítottál.'
    },
    2: {
      title: `${guest} helye az asztalnál`,
      summary: `Teát kértél, döntöttél a cukorról, és Karaköyben már nem csak nézelődő voltál.`,
      phrases: ['Bir çay, lütfen.', adventure.sugar === 'yes' ? 'Şekerli.' : 'Şekersiz.', 'Teşekkür ederim.'],
      memory: adventure.savedTeaCulture ? 'ince belli çay bardağı · a keskeny derekú pohár' : 'Egy meleg pohár tea',
      note: adventure.wellbeing === 'quiet' ? 'Nem kérdeztem tovább. Néha egy csendes korty a legpontosabb válasz.' : 'Már tudom, hogyan kéred a teádat. Legközelebb talán meg sem kell kérdeznem.'
    },
    3: {
      title: `${guest} átkelése`,
      summary: `A kompon arcokat figyeltetek, majd törökül mutattad be Alit.`,
      phrases: ['Bu Ali.', adventure.aliFeature === 'eyes' ? 'Kahverengi gözlü.' : adventure.aliFeature === 'smile' ? 'Güler yüzlü.' : 'Kıvırcık saçlı.', adventure.personality === 'calm' ? 'Sakin.' : adventure.personality === 'cheerful' ? 'Neşeli.' : 'Meraklı.'],
      memory: adventure.savedFerryCulture ? 'martı · a komp sirálya' : 'A két part közötti szél',
      note: 'Kíváncsi voltam, milyennek látsz. A sirályok leírása biztosan kevésbé hízelgő lett volna.'
    },
    4: {
      title: `${guest} bazári választása`,
      summary: `${adventure.purchase === 'buy' ? 'Vásároltál' : 'Udvariasan továbbmentél'}, de előtte színt, megfelelő változatot és árat kértél.`,
      phrases: ['Bu ne kadar?', adventure.bargain === 'ask' ? 'Biraz indirim olur mu?' : 'Teşekkürler.', adventure.purchase === 'buy' ? 'Alıyorum.' : 'Almıyorum.'],
      memory: adventure.bazaarItem === 'shoes' ? `${adventure.bazaarSize || ''} numara · cipőméret` : adventure.bazaarItem === 'jacket' ? `${(adventure.bazaarSize || '').toUpperCase()} beden · ruhaméret` : 'şal · a kendő, amelyik megállított',
      note: adventure.purchase === 'buy' ? 'Szerintem jól választottál. De még jobban tetszett, hogy te döntöttél.' : 'Az emlékhez nem kellett szatyor. A mondatok így is velünk jöttek.'
    },
    5: {
      title: `${guest} gülhanei pihenője`,
      summary: `Megálltatok, és egyszerűen elmondtad, hogyan érzed magad.`,
      phrases: [adventure.parkFeeling === 'good' ? 'İyi hissediyorum.' : adventure.parkFeeling === 'quiet' ? 'Biraz dinlenmek istiyorum.' : 'Yorgunum.', adventure.bodyPart === 'head' ? 'Başım ağrıyor.' : adventure.bodyPart === 'back' ? 'Belim ağrıyor.' : adventure.bodyPart === 'feet' ? 'Ayaklarım ağrıyor.' : 'İyiyim.', 'Biraz dinlenelim.'],
      memory: adventure.savedParkCulture ? 'sessizlik · a közös csend' : 'Egy pad Gülhanéban',
      note: 'Amikor megálltál, nem maradtál le semmiről. A város leült mellénk.'
    },
    6: {
      title: `${guest} villamosútja`,
      summary: `Jegyet, helyet és megállót kérdeztél a csilingelő piros villamoson.`,
      phrases: ['İstanbulkart geçerli mi?', 'Affedersiniz.', 'Nerede ineceğiz?'],
      memory: adventure.savedTramCulture ? 'zil · a piros villamos csilingelése' : 'Egy ablak a városra',
      note: 'Most már akkor is tudsz kérdezni, amikor a város mozgásban van.'
    },
    7: {
      title: `${guest} üsküdari naplementéje`,
      summary: `A túlpart első fényeiről ${adventure.sunsetCompany === 'family' ? 'a családod' : adventure.sunsetCompany === 'friend' ? 'egy barátod' : 'egy csendben maradt emlék'} jutott eszedbe.`,
      phrases: [adventure.sunsetCompany === 'family' ? 'Ailem.' : adventure.sunsetCompany === 'friend' ? 'Bir arkadaşım.' : 'İyi akşamlar.', adventure.sunsetSibling === 'yes' ? 'Evet, kardeşim var.' : adventure.sunsetSibling === 'no' ? 'Kardeşim yok.' : 'İyi akşamlar.', 'İyi akşamlar.'],
      memory: adventure.savedSunsetCulture ? 'gün batımı · az üsküdari naplemente' : 'A túlpart első esti fénye',
      note: 'Nem kérdeztem, pontosan kire gondoltál. Elég volt, hogy maradtunk még egy kicsit.'
    },
    8: {
      title: `${guest} simites reggele`,
      summary: `Az illat eltérített az útvonaltól, aztán együtt reggeliztetek.`,
      phrases: [adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.', adventure.bakeryDrink === 'coffee' ? 'Kahve istiyorum.' : adventure.bakeryDrink === 'water' ? 'Su istiyorum.' : 'Çay istiyorum.', adventure.simitTaste === 'warm' ? 'Sıcak.' : adventure.simitTaste === 'crunchy' ? 'Çıtır.' : 'Çok lezzetli.'],
      memory: adventure.savedSimitCulture ? 'kahvaltı · a közös reggeli' : 'Friss simit illata',
      note: 'Az eredeti útvonalunk másfelé vitt volna. Szerencsére az illatok nem olvasnak térképet.'
    },
    9: {
      title: `${guest} csendes látogatása`,
      summary: `Úgy érkeztél az udvarba, hogy közben figyeltél a hely ritmusára.`,
      phrases: ['Giriş nerede?', adventure.mosquePermission === 'keep' ? 'Sadece bakacağım.' : 'Fotoğraf çekebilir miyim?', adventure.mosqueThanks === 'goodday' ? 'İyi günler.' : 'Teşekkür ederim.'],
      memory: adventure.savedMosqueCulture ? 'saygı · tisztelettel érkezni' : 'Fény az udvar kövén',
      note: 'Nem kellett mindent elmagyaráznunk. A figyelmed így is látható volt.'
    },
    10: {
      title: `${guest} már nem idegen`,
      summary: `A vízpartra visszaérve már tudtad, mit kérnél, merre mennél tovább, és hogyan búcsúznál.`,
      phrases: ['Bir kilo, lütfen.', 'İstanbul çok güzel.', adventure.aliFarewell === 'soon' ? 'Yakında görüşürüz.' : 'Görüşürüz.'],
      memory: adventure.savedWaterfrontCulture ? 'gündelik hayat · a város hétköznapi ritmusa' : 'Fények az eső utáni vízparton',
      note: 'Vendégként érkeztél. Most már vannak helyek, amelyek visszavárnak.'
    }
  };
  return stories[number];
}

// A rövid, kanonikus első utazás naplója. Ugyanazokat a döntéseket és
// mondatokat őrzi meg, amelyeket a vendég az aktív flow-ban valóban átélt.
function coherentJournalStory(number) {
  const guest = escapeHtml(adventure.name || 'A vendég');
  const stories = {
    1: {
      title: `${guest} első isztambuli bemutatkozása`,
      summary: `A Galata hídon köszöntél Alinak, bemutatkoztál, és a városban már volt valaki, aki a neveden szólított.`,
      phrases: ['Merhaba.', adventure.name ? `Benim adım ${adventure.name}.` : '', nationalityCopy().tr],
      memory: 'A város első ismerős mondata',
      note: 'Nem a kiejtésedre emlékszem. Arra, hogy megszólítottál.'
    },
    2: {
      title: `${guest} első karaköyi rendelése`,
      summary: `Te kértél teát, eldöntötted, hogyan szereted, és megköszönted, amikor pontosan úgy érkezett meg.`,
      phrases: ['Bir çay, lütfen.', adventure.sugar === 'yes' ? 'Şekerli, lütfen.' : 'Şekersiz, lütfen.', 'Teşekkür ederim.'],
      memory: adventure.sugar === 'yes' ? 'Egy cukros tea Karaköyben' : 'Egy tea cukor nélkül Karaköyben',
      note: 'Most már tudom, hogyan kéred a teádat.'
    },
    3: {
      title: `${guest} útja a piros villamoson`,
      summary: `Ellenőrizted a kártyádat, majd egyetlen udvarias szóval utat kértél az ajtóhoz.`,
      phrases: ['İstanbulkart geçerli mi?', 'Affedersiniz.'],
      memory: 'A piros villamos csilingelése',
      note: 'A város mozgott körülöttünk, de neked egyszer sem kellett találgatnod.'
    },
    4: {
      title: `${guest} átkelése Üsküdarba`,
      summary: `Megkérdezted, jó kompra szálltok-e, majd ${adventure.ferryPlace === 'deck' ? 'a fedélzetet' : 'a csendesebb belső helyet'} választottad.`,
      phrases: ["Bu vapur Üsküdar'a gidiyor mu?", adventure.ferryPlace === 'deck' ? 'Dışarıda oturalım.' : 'İçeride oturalım.'],
      memory: adventure.ferryPlace === 'deck' ? 'A szél és a sirályok a fedélzeten' : 'A város az ablak keretében',
      note: 'A sirályok nem kérdeztek semmit. Egyszerűen velünk jöttek.'
    },
    5: {
      title: `${guest} üsküdari naplementéje`,
      summary: `${adventure.uskudarSpot === 'steps' ? 'A vízparti lépcsőn' : 'A teázó mellől'} néztétek a túlpartot, és ${adventure.sunsetMemory === 'photo' ? 'egy közös képet is készítettetek' : 'a telefont a zsebetekben hagytátok'}.`,
      phrases: [adventure.uskudarSpot === 'steps' ? 'Burada oturalım.' : 'Bir çay içelim.', 'Manzara çok güzel.', adventure.sunsetMemory === 'photo' ? 'Bir fotoğraf çekelim mi?' : 'Biraz daha bakalım.'],
      memory: adventure.sunsetMemory === 'photo' ? 'Egy közös kép Üsküdarban' : 'A telefon nélküli naplemente',
      note: 'Nem kellett elmagyaráznod a kilátást. Elég volt együtt néznünk.'
    },
    6: {
      title: `${guest} simites reggele`,
      summary: `Te rendelted a simitet, eldöntötted, kérsz-e mellé teát, és az első falat után törökül is reagáltál.`,
      phrases: [adventure.bakeryOrder === 'two' ? 'İki simit, lütfen.' : 'Bir simit, lütfen.', adventure.bakeryDrink === 'tea' ? 'Bir çay da lütfen.' : 'Bu kadar, teşekkürler.', 'Çok lezzetli.'],
      memory: 'Friss simit illata Üsküdarban',
      note: 'Az illatok néha jobb útvonalat ismernek, mint a térképek.'
    },
    7: {
      title: `${guest} csendes sultanahmeti látogatása`,
      summary: `Útbaigazítást kértél, Ali pedig megmutatta a helyi szokást anélkül, hogy vizsgáztatott volna.`,
      phrases: ['Giriş nerede?', adventure.mosquePermission === 'photo' ? 'Fotoğraf çekebilir miyim?' : 'Sadece bakacağım.'],
      memory: adventure.mosquePermission === 'photo' ? 'Egy engedéllyel készített kép' : 'Fény az udvar kövén',
      note: 'Nem kellett mindent előre tudnod. Figyeltél, és hagytad, hogy a hely mutassa a tempót.'
    },
    8: {
      title: `${guest} bazári választása`,
      summary: `${adventure.purchase === 'buy' ? 'Magaddal vittél valamit' : 'Udvariasan továbbmentél'}, de előtte te kérdezted meg az árat${adventure.bargain === 'ask' ? ' és kedvezményt is kértél' : ''}.`,
      phrases: ['Bu ne kadar?', adventure.bargain === 'ask' ? 'Biraz indirim olur mu?' : 'Teşekkür ederim.', adventure.purchase === 'buy' ? 'Bunu alıyorum.' : 'Hayır, teşekkürler.'],
      memory: adventure.bazaarItem === 'shoes' ? 'A cipő, amelyik megállított' : adventure.bazaarItem === 'jacket' ? 'A kabát, amelyik megállított' : 'A kendő, amelyik megállított',
      note: adventure.purchase === 'buy' ? 'Jó választás volt. De még jobb, hogy te intézted.' : 'Az emlékhez nem kellett szatyor.'
    },
    9: {
      title: `${guest} pihenője Gülhanéban`,
      summary: `A bazár után te választottad meg a tempót, őszintén jelezted, hogyan vagy, és válaszoltál Ali kínálására.`,
      phrases: [adventure.parkPace === 'sit' ? 'Biraz dinlenelim.' : 'Yavaş yürüyelim.', adventure.parkFeeling === 'tired' ? 'Yorgunum.' : 'İyiyim.', adventure.needsWater === 'yes' ? 'Evet, lütfen.' : 'Hayır, teşekkürler.'],
      memory: 'Egy pad és egy csendes perc Gülhanéban',
      note: 'Amikor lassítottál, nem maradtál le semmiről.'
    },
    10: {
      title: `${guest} már nem csak követte Alit`,
      summary: `A vízparton már te hívtad tovább Alit: ${selectedPlanPhrase()} Ez lett az első journey valódi lezárása.`,
      phrases: [selectedPlanPhrase(), selectedFavoritePhrase(), 'Görüşürüz.'],
      memory: `Ezt a mondatot viszed haza: ${selectedFavoritePhrase()}`,
      note: 'Vendégként érkeztél. A végén már te hívtál meg engem.'
    }
  };
  return stories[number];
}

function saveJournalEntry(number) {
  const story = coherentJournalStory(number) || journalStory(number);
  if (!story) return;
  captureMemories(number);
  const [place, time, image] = journalPlaces[number - 1];
  const knowledge = adventureKnowledge[number];
  const found = adventure.discoveredPocket
    .filter(key => key.startsWith(`${number}-`))
    .map(key => knowledge?.pocket?.[Number(key.split('-')[1])]?.[0])
    .filter(Boolean);
  const entries = readJournal();
  const previous = entries.find(entry => entry.id === number);
  const entry = { id:number, place, time, image, ...story, phrases:[...new Set(story.phrases.filter(Boolean))], pocket:found, favorite:previous?.favorite || '', updatedAt:new Date().toISOString() };
  const updated = [...entries.filter(item => item.id !== number), entry].sort((a,b) => a.id - b.id);
  writeJournal(updated);
  entry.phrases.forEach(phrase => trackPhrase(phrase, 'used', number));
  if (!adventure.rhythmCaptured[number]) {
    if (number === 1 && adventure.arrival) recordRhythm(adventure.arrival === 'look' ? 'slow' : 'brisk');
    if (number === 5 && adventure.sunsetMemory) recordRhythm(adventure.sunsetMemory === 'watch' ? 'slow' : 'brisk');
    if (number === 9 && adventure.parkPace) recordRhythm(adventure.parkPace === 'sit' ? 'slow' : 'brisk');
    adventure.rhythmCaptured[number] = true;
  }
}

function renderMemoryShelf() {
  if (!memoryList) return;
  const memories = readMemories();
  forgetAllButton.hidden = memories.length === 0;
  memoryList.innerHTML = memories.length ? memories.map(memory => `<div class="memory-token"><span>${escapeHtml(memory.label)}: <strong>${escapeHtml(memory.valueLabel)}</strong></span><button type="button" data-forget-memory="${escapeHtml(memory.key)}" aria-label="${escapeHtml(memory.label)} elfelejtése">×</button></div>`).join('') : `<span class="memory-list-empty">Ali még nem tett el személyes apróságot. Ez is teljesen rendben van.</span>`;
}

function renderFamiliarity() {
  if (!familiarityList) return;
  const items = readPhraseProgress().sort((a,b) => (b.contexts?.length || 0) - (a.contexts?.length || 0) || (b.encounters || 0) - (a.encounters || 0));
  const rhythm = rhythmMode();
  const rhythmNote = rhythm.signals < 2 ? '' : rhythm.pace === 'slow' ? 'Ali most több időt hagy a nézelődésre.' : rhythm.pace === 'brisk' ? 'Ali most könnyebben továbbindul veled.' : 'Ali a megállások és a továbbindulások között tartja a ritmust.';
  if (!items.length) {
    familiarityList.innerHTML = `<p>Az első mondatok útközben érkeznek majd.</p>${rhythmNote ? `<p>${escapeHtml(rhythmNote)}</p><button class="rhythm-reset" type="button" data-reset-rhythm>A közös ritmus újrakezdése</button>` : ''}`;
    return;
  }
  const returned = items.filter(item => item.status === 'returned' || item.status === 'familiar').length;
  const familiar = items.filter(item => (item.contexts?.length || 0) >= 3).length;
  const favorite = items.find(item => item.status === 'saved');
  const notes = [
    returned ? `${returned} mondat már egy másik helyen is visszaköszönt.` : 'Ali még nem siet előre: előbb hagyja, hogy a mondataid leülepedjenek.',
    familiar ? `${familiar} mondat már igazán ismerősen hangzik.` : '',
    favorite ? `Ezt tetted külön félre: ${favorite.phrase}` : ''
  ].filter(Boolean);
  if (rhythmNote) notes.push(rhythmNote);
  familiarityList.innerHTML = `${notes.map(note => `<p>${escapeHtml(note)}</p>`).join('')}${rhythm.signals >= 2 ? '<button class="rhythm-reset" type="button" data-reset-rhythm>A közös ritmus újrakezdése</button>' : ''}`;
}

const adaptiveRoutes = [
  { id:'hello-ferry', target:3, source:1, scene:1, phrase:'Merhaba.', minReturns:0, priority:2, prompt:'A hídon már megszólítottad Alit. A kompon most valaki másnak köszönhetsz ugyanígy.' },
  { id:'thanks-tram', target:6, source:2, scene:4, phrase:'Teşekkür ederim.', minReturns:0, priority:3, prompt:'Karaköyben már megköszöntél valamit. A villamoson is jól jöhet ugyanaz a mondat.' },
  { id:'rest-uskudar', target:7, source:5, scene:5, phrase:'Biraz dinlenelim.', minReturns:0, priority:3, prompt:'Gülhanéban már tudtad, hogyan kérj egy kis pihenőt. A naplementénél is működhet.' },
  { id:'tea-bakery', target:8, source:2, scene:3, phrase:'Bir çay, lütfen.', minReturns:0, priority:4, prompt:'Egy karaköyi asztalnál ezt már egyszer kimondtad. A pékségben sem kell új mondatot keresned.' },
  { id:'hello-bakery', target:8, source:1, scene:1, phrase:'Merhaba.', minReturns:1, priority:2, prompt:'Ezt a köszönést már nem először használod. Most a pékség ajtajában érkezik vissza.' },
  { id:'sorry-mosque', target:9, source:6, scene:2, phrase:'Affedersiniz.', minReturns:0, priority:3, prompt:'A villamoson ezzel szólítottál meg valakit. A csendes udvarban még finomabban hangzik.' },
  { id:'thanks-mosque', target:9, source:2, scene:7, phrase:'Teşekkür ederim.', minReturns:1, priority:5, prompt:'Ezt már két különböző helyen használtad. Most Ali nem mondja előre — csak hagy egy pillanatot.' },
  { id:'price-waterfront', target:10, source:4, scene:3, phrase:'Bu ne kadar?', minReturns:0, priority:5, prompt:'A bazárban már rákérdeztél az árra. A vízparti árusnál ugyanaz a mondat vár.' }
];

function selectedAdaptiveRoute(number) {
  const selectedId = adventure.adaptiveRouteSelections?.[number];
  if (selectedId) return adaptiveRoutes.find(route => route.id === selectedId) || null;
  const progressItems = readPhraseProgress();
  const eligible = adaptiveRoutes.filter(route => {
    if (route.target !== number) return false;
    if (rhythmMode().pace === 'brisk' && route.priority < 4) return false;
    const progress = progressItems.find(item => item.id === phraseId(route.phrase));
    if (!progress || !(progress.contexts || []).includes(route.source)) return false;
    const returns = progress.returnCount || 0;
    if (returns < route.minReturns) return false;
    if (route.minReturns === 0 && returns > 0) return false;
    if (returns > 0 && number - (progress.lastReturnedAdventure || 0) < 2) return false;
    return progress.lastReturnedAdventure !== number;
  }).sort((a,b) => b.priority - a.priority);
  const selected = eligible[0] || null;
  if (selected) adventure.adaptiveRouteSelections[number] = selected.id;
  return selected;
}

function adaptiveRouteFor(number) {
  const route = selectedAdaptiveRoute(number);
  return route?.scene === adventure.index ? route : null;
}

function renderAdaptiveReturn() {
  if (causalSceneSets.has(scenes)) return;
  const number = adventureLibrary.indexOf(scenes) + 1;
  const route = adaptiveRouteFor(number);
  if (!route) return;
  const progress = readPhraseProgress().find(item => item.id === phraseId(route.phrase));
  const returnCount = progress?.returnCount || 0;
  const response = adventure.adaptiveReturns?.[number];
  if (response) {
    const message = response === 'skip' ? 'Rendben. A mondat nem megy sehová.' : response === 'try' ? 'Igen, ez az. Most már egy másik helyen is működik.' : 'Itt is ugyanazt jelenti. Ha akarod, csak olvasd el.';
    stage.insertAdjacentHTML('beforeend', `<aside class="adaptive-return resolved"><span>Egy ismerős mondat</span>${response === 'skip' ? '' : `<strong>${escapeHtml(route.phrase)}</strong>`}<p>${escapeHtml(message)}</p></aside>`);
    return;
  }
  const hinted = adventure.adaptiveHints?.[number];
  const rhythm = rhythmMode();
  const firstWord = route.phrase.split(/\s+/)[0];
  const label = returnCount ? 'Már ismerősen hangzik' : 'Ezt már egyszer megtaláltad';
  const controls = returnCount >= 1 || rhythm.support === 'confident'
    ? '<button type="button" data-adaptive-action="try">Kimondtam</button><button type="button" data-adaptive-action="show">Mutasd</button><button type="button" data-adaptive-action="skip">Most tovább</button>'
    : `<button type="button" data-adaptive-action="try">${hinted ? 'Most már megvan' : 'Eszembe jutott'}</button><button type="button" data-adaptive-action="${hinted ? 'show' : 'hint'}">${hinted ? 'Mutasd teljesen' : 'Egy kis segítség'}</button><button type="button" data-adaptive-action="skip">Most tovább</button>`;
  stage.insertAdjacentHTML('beforeend', `<aside class="adaptive-return"><span>${label}</span><p>${escapeHtml(route.prompt)}</p>${hinted ? `<p class="adaptive-hint">Így kezdődik: <strong>${escapeHtml(firstWord)}…</strong></p>` : ''}<div>${controls}</div></aside>`);
}

function memoryRecallFor(number) {
  const memories = Object.fromEntries(readMemories().filter(memory => memory.recallable).map(memory => [memory.key, memory]));
  const item = key => memories[key]?.value;
  if (number === 1 && item('last_adventure')) return `A múltkor ${memories.last_adventure.valueLabel} környékén váltunk el. Ma is van időnk.`;
  if (number === 2 && item('pace') === 'slow') return 'A hídon is előbb körülnéztél. Az asztallal sem kell sietnünk.';
  if (number === 3 && item('conversation') === 'gentle') return 'Most sem kell mindenkiről történetet mondanod. Nézelődhetünk csendben is.';
  if (number === 5 && item('bazaar_find')) return item('bazaar_find') === 'shoes' ? 'A bazári cipő után egy pad talán még jobban fog esni.' : 'A bazári nézelődés után itt egy kicsit lelassulhatunk.';
  if (number === 6 && item('pace') === 'slow') return 'Nem futunk a villamos után. Ha elmegy, jön egy másik.';
  if (number === 7 && item('conversation') === 'gentle') return 'Ezt most sem kell elmondanod. A naplemente kérdés nélkül is marad.';
  if (number === 8 && item('tea')) return item('tea') === 'yes' ? 'A teád cukorral, ugye? Erre emlékszem.' : 'Şekersiz, ugye? A teádat cukor nélkül kéred.';
  if (number === 9 && item('conversation') === 'gentle') return 'Itt sem kell mindent megfogalmaznod. Elég, ha figyelsz.';
  if (number === 10 && item('breakfast_drink')) return item('breakfast_drink') === 'coffee' ? 'A pékségnél kávét választottál. Most sétáljunk egy kicsit utána.' : 'A reggeli választásodra emlékszem. Most a part kínál valami mást.';
  return '';
}

function renderMemoryRecall() {
  if (causalSceneSets.has(scenes)) return;
  if (adventure.index !== 0) return;
  const number = adventureLibrary.indexOf(scenes) + 1;
  const recall = memoryRecallFor(number);
  if (recall) stage.insertAdjacentHTML('afterbegin', `<aside class="memory-recall"><span>Ali emlékszik</span><p>${escapeHtml(recall)}</p></aside>`);
}

function renderRhythmAdaptation() {
  if (causalSceneSets.has(scenes)) return;
  if (adventure.index !== 0 || stage.querySelector('.memory-recall')) return;
  const rhythm = rhythmMode();
  if (rhythm.signals < 2 || rhythm.pace === 'balanced') return;
  const message = rhythm.pace === 'slow'
    ? 'Előbb nézzünk körül. A következő mondat megvár minket.'
    : 'Menjünk. Amit érdemes eltenni, azt útközben is észrevesszük.';
  stage.insertAdjacentHTML('afterbegin', `<aside class="rhythm-adaptation"><span>Ali igazodik</span><p>${escapeHtml(message)}</p></aside>`);
}

function renderJournal() {
  const entries = readJournal();
  updateJournalCount(entries);
  renderMemoryShelf();
  renderFamiliarity();
  if (!entries.length) {
    journalEntries.innerHTML = `<div class="journal-empty"><strong>Az első oldal még üres.</strong><p>Nem kell kitöltened. Az első közös kaland után magától megérkezik bele egy emlék.</p></div>`;
    return;
  }
  journalEntries.innerHTML = entries.map((entry,index) => `<article class="memory-page" style="--tilt:${index % 2 ? '.35deg' : '-.35deg'}"><div class="memory-photo"><img src="${escapeHtml(entry.image)}" alt="" loading="lazy"><span>${escapeHtml(entry.place)} · ${escapeHtml(entry.time)}</span></div><div class="memory-copy"><span>Útinapló · ${String(entry.id).padStart(2,'0')}</span><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.summary)}</p><div class="memory-phrases" aria-label="Mondataim">${entry.phrases.map(phrase => `<button class="memory-phrase ${entry.favorite === phrase ? 'chosen' : ''}" type="button" data-journal-entry="${entry.id}" data-journal-phrase="${escapeHtml(phrase)}" aria-pressed="${entry.favorite === phrase}">${escapeHtml(phrase)}</button>`).join('')}</div>${entry.pocket?.length ? `<p class="memory-pocket"><strong>Ali zsebéből:</strong> ${entry.pocket.map(escapeHtml).join(' · ')}</p>` : ''}<div class="memory-note"><span>Ali jegyzete</span><p>${escapeHtml(entry.note)}</p></div></div></article>`).join('');
}

function openJournal() {
  journalLastFocused = document.activeElement;
  renderJournal();
  journalOpenedExperience = experience.hidden;
  if (journalOpenedExperience) experience.hidden = false;
  journal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => document.querySelector('#journal-title').focus({ preventScroll:true }));
}

function closeJournal() {
  journal.hidden = true;
  if (journalOpenedExperience) experience.hidden = true;
  journalOpenedExperience = false;
  if (experience.hidden) document.body.classList.remove('modal-open');
  journalLastFocused?.focus();
}
function answerFor(key) { return ({ name: 'Ali. De ezt már tudtad — csak szeretted volna törökül megkérdezni.', well: 'İyiyim. Jól vagyok. A Boszporusz ma különösen jó társaság.', from: 'İstanbulluyum. Isztambuli vagyok — a sirályok szerint az ő városukból.', quiet: 'Rendben. Nézzük egy kicsit együtt a vizet.' })[key]; }
function findTurkishVoice() {
  return window.speechSynthesis.getVoices()
    .filter(voice => voice.lang.toLowerCase().startsWith('tr'))
    .sort((a, b) => Number(b.lang.toLowerCase() === 'tr-tr') - Number(a.lang.toLowerCase() === 'tr-tr'))[0];
}

const aliVoiceLibrary = {
  'merhaba': 'merhaba.mp3',
  'ben ali benim adım ali': 'ben-ali-full.mp3',
  'benim adım timi': 'benim-adim-timi.mp3',
  'kolay gelsin': 'kolay-gelsin.mp3',
  'macarım': 'macarim.mp3',
  "macaristan'dan geldim": 'macaristandan-geldim.mp3',
  'senin adın ne': 'senin-adin-ne.mp3',
  'nasılsın': 'nasilsin.mp3',
  'nerelisin': 'nerelisin.mp3',
  'çay': 'cay.mp3',
  'bir çay lütfen': 'bir-cay-lutfen.mp3',
  'teşekkür ederim': 'tesekkur-ederim.mp3',
  'iyiyim': 'iyiyim.mp3',
  'fena değilim': 'fena-degilim.mp3',
  'şekerli mi': 'sekerli-mi.mp3',
  'evet şekerli': 'evet-sekerli.mp3',
  'hayır şekersiz': 'hayir-sekersiz.mp3',
  'ince belli çay bardağı': 'ince-belli-cay-bardagi.mp3'
  ,'bir çay lütfen iyiyim teşekkür ederim': 'karakoy-intro-good.mp3'
  ,'bir çay lütfen fena değilim teşekkür ederim': 'karakoy-intro-okay.mp3'
};
let activeAliAudio = null;

function canonicalVoiceClips(text) {
  const normalized = text.toLocaleLowerCase('tr-TR').replace(/[.!?]/g, '').replace(/\s+/g, ' ').trim();
  if (aliVoiceLibrary[normalized]) return [aliVoiceLibrary[normalized]];
  const clips = [];
  for (const phrase of ['merhaba', 'benim adım timi', 'bir çay lütfen', 'şekerli mi', 'evet şekerli', 'hayır şekersiz', 'nasılsın', 'fena değilim', 'iyiyim', 'teşekkür ederim', 'ince belli çay bardağı', "macaristan'dan geldim", 'macarım']) {
    if (normalized.includes(phrase)) clips.push(aliVoiceLibrary[phrase]);
  }
  return clips;
}

async function playAliClips(clips) {
  activeAliAudio?.pause();
  for (const clip of clips) {
    const audio = new Audio(`assets/audio/ali-v1/${clip}`);
    activeAliAudio = audio;
    const finished = new Promise(resolve => {
      audio.addEventListener('ended', resolve, { once: true });
      audio.addEventListener('error', resolve, { once: true });
    });
    await audio.play();
    await finished;
  }
}

function speak(text) {
  const clips = canonicalVoiceClips(text);
  if (clips.length) {
    playAliClips(clips).catch(() => showToast('Ali hangja most nem tudott megszólalni.'));
    return;
  }
  if (!('speechSynthesis' in window)) return showToast('A hang ezen az eszközön most pihen.');
  const voice = findTurkishVoice();
  if (!voice) return showToast('Ezen az eszközön nincs telepített török beszédhang.');
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = .9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }

const deferredAudioIcon = () => `<span class="audio-placeholder" role="img" aria-label="Kiejtés hamarosan" title="Kiejtés hamarosan"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4Z"></path><path d="M16 9.5c.8.7 1.2 1.5 1.2 2.5s-.4 1.8-1.2 2.5"></path><path d="M18.5 7c1.5 1.4 2.3 3 2.3 5s-.8 3.6-2.3 5"></path></svg><span class="audio-placeholder-dot"></span></span>`;

function decorateDeferredAudio(root) {
  if (!root) return;
  const addIcon = (element, variant = '') => {
    if (!element || element.querySelector(':scope > .audio-placeholder, :scope > .phrase-audio, :scope > .listen-button')) return;
    element.classList.add('has-audio-placeholder');
    element.insertAdjacentHTML('beforeend', deferredAudioIcon());
    if (variant) element.querySelector(':scope > .audio-placeholder')?.classList.add(variant);
  };

  root.querySelectorAll('.phrase-card').forEach(card => {
    if (card.querySelector('strong')) addIcon(card, 'audio-placeholder-card');
  });
  root.querySelectorAll('.intro-card').forEach(card => {
    if (card.querySelector('strong')) addIcon(card, 'audio-placeholder-card');
  });
  root.querySelectorAll('.selected-answer').forEach(answer => {
    if (answer.querySelector('strong')) addIcon(answer, 'audio-placeholder-card');
  });
  root.querySelectorAll('.choice-row button, .question-choice > button:first-child').forEach(button => {
    if (button.querySelector('strong') && button.querySelector('small')) addIcon(button, 'audio-placeholder-choice');
  });
  root.querySelectorAll('.completion-keepsake').forEach(card => {
    if (card.querySelector('strong')) addIcon(card, 'audio-placeholder-card');
  });
}

function renderPocketDiscovery() {
  if (causalSceneSets.has(scenes)) return;
  if ([coherentGalataScenes, coherentKarakoyScenes, coherentFerryScenes, coherentBazaarScenes, coherentParkScenes, coherentTramScenes, coherentUskudarScenes, coherentBakeryScenes, coherentMosqueScenes, coherentWaterfrontScenes, refinedGalataScenes, goldenGalataScenes, goldenKarakoyScenes, goldenFerryScenes, goldenUskudarScenes].includes(scenes)) return;
  const adventureNumber = adventureLibrary.indexOf(scenes) + 1;
  const knowledge = adventureKnowledge[adventureNumber];
  if (!knowledge?.pocket?.length) return;
  if (adventure.index > 0 && adventure.index < 9) {
    const pocketIndex = (adventure.index - 1) % knowledge.pocket.length;
    const [turkish, hungarian] = knowledge.pocket[pocketIndex];
    const key = `${adventureNumber}-${pocketIndex}`;
    if (!adventure.discoveredPocket.includes(key)) {
      adventure.discoveredPocket.push(key);
      if (adventureNumber !== 5 && adventureNumber !== 7) trackPhrase(turkish, 'new', adventureNumber);
    }
    stage.insertAdjacentHTML('beforeend', `<aside class="pocket-discovery" aria-label="Ali zsebében"><span>Ali zsebében</span><strong>${escapeHtml(turkish)}</strong><small>${escapeHtml(hungarian)}</small></aside>`);
  }
  if (adventure.index === 9) {
    const found = adventure.discoveredPocket
      .filter(key => key.startsWith(`${adventureNumber}-`))
      .map(key => knowledge.pocket[Number(key.split('-')[1])]?.[0])
      .filter(Boolean);
    if (found.length) stage.insertAdjacentHTML('beforeend', `<aside class="pocket-summary"><span>Útközben veled maradt</span><p>${found.map(escapeHtml).join(' · ')}</p></aside>`);
  }
}

function renderScene({ focus = true } = {}) {
  const scene = scenes[adventure.index];
  const currentStationIndex = Math.max(0, adventureLibrary.indexOf(scenes));
  const causalMeta = causalSceneSets.has(scenes) ? causalJourneyMeta[currentStationIndex] : null;
  const isKarakoy = scenes === karakoyScenes || scenes === coherentKarakoyScenes || scenes === causalKarakoyScenes;
  const isFerry = scenes === ferryScenes || scenes === coherentFerryScenes || scenes === causalFerryScenes;
  const isBazaar = scenes === bazaarScenes || scenes === coherentBazaarScenes || scenes === causalBazaarScenes;
  const isPark = scenes === parkScenes || scenes === coherentParkScenes || scenes === causalParkScenes;
  const isTram = scenes === tramScenes || scenes === coherentTramScenes || scenes === causalTramScenes;
  const isUskudar = scenes === uskudarScenes || scenes === coherentUskudarScenes || scenes === causalUskudarScenes;
  const isBakery = scenes === bakeryScenes || scenes === coherentBakeryScenes || scenes === causalBakeryScenes;
  const isMosque = scenes === mosqueScenes || scenes === coherentMosqueScenes || scenes === causalMosqueScenes;
  const isWaterfront = scenes === waterfrontScenes || scenes === coherentWaterfrontScenes || scenes === causalWaterfrontScenes;
  sceneFrame.classList.toggle('ferry-scene', isFerry);
  sceneFrame.classList.toggle('bazaar-scene', isBazaar);
  sceneFrame.classList.toggle('park-scene', isPark);
  sceneFrame.classList.toggle('tram-scene', isTram);
  sceneFrame.classList.toggle('uskudar-scene', isUskudar);
  sceneFrame.classList.toggle('bakery-scene', isBakery);
  sceneFrame.classList.toggle('mosque-scene', isMosque);
  sceneFrame.classList.toggle('waterfront-scene', isWaterfront);
  document.querySelector('.adventure-content').classList.toggle('handoff-mode', (scenes === coherentGalataScenes || scenes === causalGalataScenes) && adventure.index === scenes.length - 1);
  adventureLabel.textContent = causalMeta?.label || (isWaterfront ? 'Kaland 10 / 10 · Már ismerős' : isMosque ? 'Kaland 09 / 10 · A csendes udvar' : isBakery ? 'Kaland 08 / 10 · A reggel íze' : isUskudar ? 'Kaland 07 / 10 · Fények a túlparton' : isTram ? 'Kaland 06 / 10 · Felszállunk' : isPark ? 'Kaland 05 / 10 · Egy kis pihenő' : isBazaar ? 'Kaland 04 / 10 · Ami jól áll' : isFerry ? 'Kaland 03 / 10 · Arcok a kompon' : isKarakoy ? 'Kaland 02 / 10 · Egy tea mellett' : 'Kaland 01 / 10 · Megérkeztél');
  eyebrow.textContent = typeof scene.eyebrow === 'function' ? scene.eyebrow() : scene.eyebrow;
  title.textContent = typeof scene.title === 'function' ? scene.title() : scene.title;
  lead.textContent = typeof scene.lead === 'function' ? scene.lead() : scene.lead;
  aliLine.textContent = typeof scene.ali === 'function' ? scene.ali() : scene.ali;
  whisper.textContent = typeof scene.whisper === 'function' ? scene.whisper() : scene.whisper;
  sceneImage.src = scene.image || causalMeta?.image || (isWaterfront ? 'assets/web/ALI-SCN-010-waterfront-promenade.webp' : isMosque ? 'assets/web/ALI-SCN-009-blue-mosque-courtyard.webp' : isBakery ? 'assets/web/ALI-SCN-008-simit-bakery.webp' : isUskudar ? 'assets/web/ALI-SCN-007-uskudar-sunset.webp' : isTram ? 'assets/web/ALI-SCN-006-nostalgic-tram.webp' : isPark ? 'assets/web/ALI-SCN-005-gulhane-park.webp' : isBazaar ? 'assets/web/ALI-SCN-004-grand-bazaar.webp' : isFerry ? 'assets/web/ALI-SCN-003-bosphorus-ferry.webp' : isKarakoy ? 'assets/web/ALI-SCN-002-karakoy-teahouse.webp' : 'assets/web/ALI-SCN-001-galata-sunrise.webp');
  sceneTime.textContent = scene.time || causalMeta?.time || (isWaterfront ? '16:25' : isMosque ? '10:10' : isBakery ? '08:35' : isUskudar ? '19:18' : isTram ? '18:05' : isPark ? '17:10' : isBazaar ? '15:40' : isFerry ? '11:05' : isKarakoy ? '08:20' : '07:12');
  sceneCaption.textContent = scene.caption || causalMeta?.caption || (isWaterfront ? 'A város tovább él körülöttetek.' : isMosque ? 'A város itt halkabban fogad.' : isBakery ? 'A reggelnek friss simit illata van.' : isUskudar ? 'Két part ugyanabban a fényben.' : isTram ? 'A város csilingelve halad tovább.' : isPark ? 'A város itt egy kicsit lelassul.' : isBazaar ? 'Minden szín egy új történet.' : isFerry ? 'Két part között utaztok.' : isKarakoy ? 'A tea mellett van időnk.' : 'A város még csak ébredezik.');
  scenePostmarkTitle.textContent = scene.postmark || causalMeta?.postmark || (isWaterfront ? 'Sahil' : isMosque ? 'Sultanahmet' : isBakery ? 'Simitçi' : isUskudar ? 'Üsküdar' : isTram ? 'Taksim' : isPark ? 'Gülhane' : isBazaar ? 'Kapalıçarşı' : isFerry ? 'Boğaziçi' : isKarakoy ? 'Karaköy' : 'Galata');
  scenePostmarkMeta.textContent = scene.postmarkMeta || causalMeta?.postmarkMeta || (isWaterfront ? '16:25 · Görüşürüz' : isMosque ? '10:10 · Sessizce' : isBakery ? '08:35 · Taze simit' : isUskudar ? '19:18 · Gün batımı' : isTram ? '18:05 · Tramvay' : isPark ? '17:10 · Biraz dinlenelim' : isBazaar ? '15:40 · Hoş geldin' : isFerry ? '11:05 · Vapur' : isKarakoy ? '08:20 · Bir çay?' : '07:12 · Hoş geldin');
  stage.innerHTML = scene.body();
  const decisionKey = currentDecisionKey();
  if (decisionKey && adventure[decisionKey]) {
    stage.insertAdjacentHTML('beforeend', '<button class="text-button change-answer" type="button" data-change-answer>Másképp válaszolnék</button>');
  }
  const isGoldenDayOne = causalSceneSets.has(scenes) || [coherentGalataScenes, coherentKarakoyScenes, coherentFerryScenes, coherentBazaarScenes, coherentParkScenes, coherentTramScenes, coherentUskudarScenes, coherentBakeryScenes, coherentMosqueScenes, coherentWaterfrontScenes, refinedGalataScenes, goldenGalataScenes, goldenKarakoyScenes, goldenFerryScenes, goldenUskudarScenes].includes(scenes);
  if (!isGoldenDayOne) {
    renderMemoryRecall();
    renderRhythmAdaptation();
    renderAdaptiveReturn();
    renderPocketDiscovery();
  }
  decorateDeferredAudio(stage);
  document.querySelector('.adventure-content').scrollTop = 0;
  progress.innerHTML = scenes.map((_, index) => `<span class="${index < adventure.index ? 'done' : ''} ${index === adventure.index ? 'current' : ''}"></span>`).join('');
  progress.setAttribute('aria-label', `${adventure.index + 1}. pillanat a ${scenes.length}-ből`);
  progress.style.setProperty('--steps', scenes.length);
  backButton.disabled = adventure.index === 0;
  localStorage.setItem('ali-adventure-02', JSON.stringify({
    adventure,
    stationIndex: Math.max(0, adventureLibrary.indexOf(scenes)),
    savedAt: new Date().toISOString()
  }));
  if (focus) requestAnimationFrame(() => title.focus({ preventScroll: true }));
}

function decisionKeysForCurrentJourney() {
  if (scenes === causalGalataScenes) return ['greeting', null, 'nationality', null];
  if (scenes === causalKarakoyScenes) return ['tea', 'sugar', null, null];
  if (scenes === causalTramScenes) return [null, 'ticketChoice', 'tramApology', null];
  if (scenes === causalFerryScenes) return ['ferryRoute', 'ferryPlace', null, null];
  if (scenes === causalUskudarScenes) return ['uskudarSpot', 'sunsetView', 'sunsetMemory', null];
  if (scenes === causalBakeryScenes) return ['bakeryOrder', 'bakeryDrink', 'simitTaste', null];
  if (scenes === causalMosqueScenes) return ['mosqueDirection', null, 'mosquePermission', null];
  if (scenes === causalBazaarScenes) return ['bazaarItem', null, 'bargain', 'purchase'];
  if (scenes === causalParkScenes) return ['parkPace', 'parkFeeling', 'needsWater', null];
  if (scenes === causalWaterfrontScenes) return [null, 'waterfrontPlan', 'favoritePhrase', null];
  if (scenes === coherentKarakoyScenes) return ['seat', 'tea', 'sugar', null, null];
  if (scenes === coherentFerryScenes) return ['ferryPlace', null, 'observed', 'aliFeature', null];
  if (scenes === coherentBazaarScenes) return ['bazaarItem', 'bazaarSize', null, 'bargain', 'purchase'];
  if (scenes === coherentParkScenes) return ['parkPace', 'parkFeeling', 'needsWater', null, null];
  if (scenes === coherentTramScenes) return ['tramChoice', 'ticketChoice', 'tramApology', 'tramStop', null];
  if (scenes === coherentUskudarScenes) return ['uskudarSpot', null, 'sunsetMemory', 'sunsetStay', null];
  if (scenes === coherentBakeryScenes) return ['bakeryOrder', null, 'bakeryDrink', 'simitTaste', null];
  if (scenes === coherentMosqueScenes) return ['mosqueDirection', 'mosqueShoes', 'mosquePermission', null, null];
  if (scenes === coherentWaterfrontScenes) return ['waterfrontWeather', 'waterfrontPlan', 'cityFeeling', 'aliFarewell', null];
  return [];
}

function currentDecisionKey() {
  return decisionKeysForCurrentJourney()[adventure.index] || null;
}

function clearCurrentAndLaterDecisions() {
  const keys = decisionKeysForCurrentJourney();
  keys.slice(adventure.index).filter(Boolean).forEach(key => { adventure[key] = ''; });
}

function next() { if (adventure.index < scenes.length - 1) { adventure.index += 1; renderScene(); } }
function readJourneySession() {
  try {
    const saved = JSON.parse(localStorage.getItem('ali-adventure-02') || 'null');
    if (!saved?.adventure || !Number.isInteger(saved.stationIndex)) return null;
    if (saved.stationIndex < 0 || saved.stationIndex >= adventureLibrary.length) return null;
    return saved;
  } catch { return null; }
}

function clearJourneySession() {
  try { localStorage.removeItem('ali-adventure-02'); } catch { /* Nincs mentett út. */ }
}

function openExperience() {
  lastFocused = document.activeElement;
  experience.hidden = false;
  document.body.classList.add('modal-open');
  const saved = readJourneySession();
  if (saved) {
    adventure = { ...initialState(), ...saved.adventure };
    scenes = adventureLibrary[saved.stationIndex] || causalGalataScenes;
    adventure.index = Math.min(Math.max(0, Number(adventure.index) || 0), scenes.length - 1);
    renderScene();
    showToast('Ali megjegyezte, hol álltatok meg.');
    return;
  }
  adventure = initialState();
  scenes = causalGalataScenes;
  renderScene();
}
function openSelectedAdventure(index) { lastFocused = document.activeElement; experience.hidden = false; document.body.classList.add('modal-open'); adventure = initialState(); scenes = adventureLibrary[index] || causalGalataScenes; renderScene(); }
function closeExperience() { experience.hidden = true; document.body.classList.remove('modal-open'); window.speechSynthesis?.cancel(); activeAliAudio?.pause(); lastFocused?.focus(); }

document.querySelectorAll('[data-start], [data-open-experience]').forEach(button => button.addEventListener('click', openExperience));
document.querySelectorAll('[data-adventure]').forEach(button => button.addEventListener('click', () => openSelectedAdventure(Number(button.dataset.adventure))));
journalToggle.addEventListener('click', openJournal);
journalClose.addEventListener('click', closeJournal);
document.querySelector('.journal-backdrop').addEventListener('click', closeJournal);
journalEntries.addEventListener('click', event => {
  const button = event.target.closest('[data-journal-phrase]');
  if (!button) return;
  const id = Number(button.dataset.journalEntry);
  const phrase = button.dataset.journalPhrase;
  const entries = readJournal();
  const entry = entries.find(item => item.id === id);
  if (!entry) return;
  const removing = entry.favorite === phrase;
  entries.forEach(item => { item.favorite = ''; });
  entry.favorite = removing ? '' : phrase;
  if (removing) forgetMemory('favorite_phrase');
  else if (isPracticeSafe(id, phrase)) {
    remember('favorite_phrase', phrase, phrase, id);
    trackPhrase(phrase, 'saved', id);
  } else forgetMemory('favorite_phrase');
  writeJournal(entries);
  renderJournal();
  showToast(entry.favorite ? 'Ezt a mondatot újra szeretnéd majd kimondani.' : 'A mondat továbbra is az emléklapon marad.');
});
memoryList.addEventListener('click', event => {
  const button = event.target.closest('[data-forget-memory]');
  if (!button) return;
  const key = button.dataset.forgetMemory;
  forgetMemory(key);
  if (key === 'favorite_phrase') {
    const entries = readJournal(); entries.forEach(entry => { entry.favorite = ''; }); writeJournal(entries); renderJournal();
  }
  showToast('Ali elfelejtette ezt az apróságot.');
});
forgetAllButton.addEventListener('click', () => {
  writeMemories([]);
  clearRhythm();
  const entries = readJournal(); entries.forEach(entry => { entry.favorite = ''; }); writeJournal(entries); renderJournal();
  showToast('Ali emlékezete kiürült. Az útinaplód megmaradt.');
});
familiarityList?.addEventListener('click', event => {
  if (!event.target.closest('[data-reset-rhythm]')) return;
  clearRhythm();
  showToast('Újrakezdjük a közös ritmust. Nincs semmi elveszve.');
});
closeButton.addEventListener('click', closeExperience);
document.querySelector('.experience-backdrop').addEventListener('click', closeExperience);
backButton.addEventListener('click', () => { if (adventure.index > 0) { adventure.index -= 1; renderScene(); } });

stage.addEventListener('click', event => {
  const knowledgeLink = event.target.closest('[data-open-knowledge]');
  if (knowledgeLink) {
    event.preventDefault();
    saveJournalEntry(10);
    clearJourneySession();
    window.location.href = knowledgeLink.getAttribute('href');
    return;
  }
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-change-answer')) { clearCurrentAndLaterDecisions(); renderScene({ focus: false }); return; }
  if (button.dataset.adaptiveAction) {
    const number = adventureLibrary.indexOf(scenes) + 1;
    const route = adaptiveRouteFor(number);
    if (!route) return;
    const action = button.dataset.adaptiveAction;
    if (action === 'hint') {
      recordRhythm('support');
      adventure.adaptiveHints[number] = true;
      renderScene({ focus:false });
      return;
    }
    if (action === 'show') recordRhythm('support');
    if (action === 'try') recordRhythm('confidence');
    if (action === 'skip') recordRhythm('brisk');
    adventure.adaptiveReturns[number] = action;
    if (action === 'try' || action === 'show') trackPhrase(route.phrase, 'returned', number);
    renderScene({ focus:false });
    return;
  }
  if (button.hasAttribute('data-causal-next')) {
    const currentNumber = adventureLibrary.indexOf(scenes) + 1;
    const nextIndex = Number(button.dataset.causalNext);
    if (currentNumber > 0) saveJournalEntry(currentNumber);
    scenes = adventureLibrary[nextIndex] || causalGalataScenes;
    adventure.index = 0;
    renderScene();
    showToast(causalJourneyMeta[nextIndex]?.postmark ? `Megérkeztetek: ${causalJourneyMeta[nextIndex].postmark}.` : 'Sétálunk tovább.');
    return;
  }
  if (button.hasAttribute('data-finish')) {
    saveJournalEntry(1);
    scenes = coherentKarakoyScenes; adventure.index = 0; renderScene(); return;
  }
  if (button.hasAttribute('data-start-ferry')) {
    saveJournalEntry(2);
    scenes = coherentFerryScenes; adventure.index = 0; renderScene(); return;
  }
  if (button.hasAttribute('data-start-bazaar')) {
    saveJournalEntry(3);
    scenes = coherentBazaarScenes; adventure.index = 0; renderScene(); return;
  }
  if (button.hasAttribute('data-start-park')) {
    saveJournalEntry(4);
    scenes = coherentParkScenes; adventure.index = 0; renderScene(); showToast('Megérkeztetek Gülhanéba.'); return;
  }
  if (button.hasAttribute('data-start-tram')) {
    saveJournalEntry(5);
    scenes = coherentTramScenes; adventure.index = 0; renderScene(); showToast('Megérkezett a piros villamos.'); return;
  }
  if (button.hasAttribute('data-start-uskudar')) {
    saveJournalEntry(6);
    scenes = coherentUskudarScenes; adventure.index = 0; renderScene(); showToast('Megérkeztetek Üsküdarba.'); return;
  }
  if (button.hasAttribute('data-start-bakery')) {
    saveJournalEntry(7);
    scenes = coherentBakeryScenes; adventure.index = 0; renderScene(); showToast('Friss simit illata érkezik az utcáról.'); return;
  }
  if (button.hasAttribute('data-start-mosque')) {
    saveJournalEntry(8);
    scenes = coherentMosqueScenes; adventure.index = 0; renderScene(); showToast('Megérkeztetek a sultanahmeti udvarba.'); return;
  }
  if (button.hasAttribute('data-start-waterfront')) {
    saveJournalEntry(9);
    scenes = coherentWaterfrontScenes; adventure.index = 0; renderScene(); showToast('Visszaértetek a vízhez.'); return;
  }
  if (button.dataset.speak) speak(button.dataset.speak);
  if (button.hasAttribute('data-next')) next();
  if (button.dataset.arrival === 'look') { adventure.arrival = 'look'; renderScene({ focus: false }); }
  if (button.dataset.arrival === 'join') { adventure.arrival = 'join'; next(); }
  if (button.dataset.greeting === 'listen') { adventure.heardGreeting = true; adventure.greeting = 'listen'; speak('Merhaba'); renderScene({ focus: false }); }
  if (button.dataset.greeting && button.dataset.greeting !== 'listen') {
    adventure.greeting = button.dataset.greeting;
    if (scenes === causalGalataScenes || scenes === coherentGalataScenes || scenes === refinedGalataScenes) renderScene({ focus: false });
    else next();
  }
  if (button.dataset.question) { adventure.question = button.dataset.question; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save')) { adventure.savedCulture = true; renderScene({ focus: false }); showToast('Ali eltette az útinaplódba.'); }
  if (button.dataset.seat) { adventure.seat = button.dataset.seat; renderScene({ focus: false }); }
  if (button.dataset.tea) { adventure.tea = button.dataset.tea; if (button.dataset.tea === 'listen') speak('Bir çay, lütfen'); renderScene({ focus: false }); }
  if (button.hasAttribute('data-hear-tea')) { adventure.heardTea = true; speak('Bir çay, lütfen'); renderScene({ focus: false }); }
  if (button.dataset.sugar) { adventure.sugar = button.dataset.sugar; renderScene({ focus: false }); }
  if (button.dataset.wellbeing) { adventure.wellbeing = button.dataset.wellbeing; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-tea')) { adventure.savedTeaCulture = true; renderScene({ focus: false }); showToast('A teáspohár bekerült az útinaplódba.'); }
  if (button.dataset.ferryPlace) { adventure.ferryPlace = button.dataset.ferryPlace; renderScene({ focus: false }); }
  if (button.dataset.ferryRoute) { adventure.ferryRoute = button.dataset.ferryRoute; renderScene({ focus: false }); }
  if (button.dataset.observed) { adventure.observed = button.dataset.observed; renderScene({ focus: false }); }
  if (button.dataset.aliFeature) { adventure.aliFeature = button.dataset.aliFeature; renderScene({ focus: false }); }
  if (button.dataset.company) { adventure.company = button.dataset.company; renderScene({ focus: false }); }
  if (button.dataset.personality) { adventure.personality = button.dataset.personality; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-ferry')) { adventure.savedFerryCulture = true; renderScene({ focus: false }); showToast('A komp sirálya bekerült az útinaplódba.'); }
  if (button.dataset.bazaarItem) { adventure.bazaarItem = button.dataset.bazaarItem; renderScene({ focus: false }); }
  if (button.dataset.bazaarColor) { adventure.bazaarColor = button.dataset.bazaarColor; renderScene({ focus: false }); }
  if (button.dataset.size) { adventure.bazaarSize = button.dataset.size; renderScene({ focus: false }); }
  if (button.dataset.tryOn) { adventure.tryOn = button.dataset.tryOn; renderScene({ focus: false }); }
  if (button.dataset.fit) { adventure.priceReaction = button.dataset.fit; renderScene({ focus: false }); }
  if (button.dataset.bargain) { adventure.bargain = button.dataset.bargain; renderScene({ focus: false }); }
  if (button.dataset.purchase) { adventure.purchase = button.dataset.purchase; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-bazaar')) { adventure.savedBazaarCulture = true; renderScene({ focus: false }); showToast('Az alkudozós mondat bekerült az útinaplódba.'); }
  if (button.dataset.parkPace) { adventure.parkPace = button.dataset.parkPace; renderScene({ focus: false }); }
  if (button.dataset.parkFeeling) { adventure.parkFeeling = button.dataset.parkFeeling; renderScene({ focus: false }); }
  if (button.dataset.bodyPart) { adventure.bodyPart = button.dataset.bodyPart; renderScene({ focus: false }); }
  if (button.dataset.water) { adventure.needsWater = button.dataset.water; renderScene({ focus: false }); }
  if (button.dataset.parkPlan) { adventure.parkPlan = button.dataset.parkPlan; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-park')) { adventure.savedParkCulture = true; renderScene({ focus: false }); showToast('A közös csend bekerült az útinaplódba.'); }
  if (button.dataset.tramChoice) { adventure.tramChoice = button.dataset.tramChoice; renderScene({ focus: false }); }
  if (button.dataset.ticket) { adventure.ticketChoice = button.dataset.ticket; renderScene({ focus: false }); }
  if (button.dataset.tramSeat) { adventure.tramSeat = button.dataset.tramSeat; renderScene({ focus: false }); }
  if (button.dataset.tramApology) { adventure.tramApology = button.dataset.tramApology; renderScene({ focus: false }); }
  if (button.dataset.tramNotice) { adventure.tramNotice = button.dataset.tramNotice; renderScene({ focus: false }); }
  if (button.dataset.tramStop) { adventure.tramStop = button.dataset.tramStop; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-tram')) { adventure.savedTramCulture = true; renderScene({ focus: false }); showToast('A villamos csilingelése bekerült az útinaplódba.'); }
  if (button.dataset.uskudarSpot) { adventure.uskudarSpot = button.dataset.uskudarSpot; renderScene({ focus: false }); }
  if (button.dataset.evening) { adventure.eveningGreeting = button.dataset.evening; renderScene({ focus: false }); }
  if (button.dataset.rest) { adventure.restChoice = button.dataset.rest; renderScene({ focus: false }); }
  if (button.dataset.sunsetCompany) { adventure.sunsetCompany = button.dataset.sunsetCompany; renderScene({ focus: false }); }
  if (button.dataset.sunsetSibling) { adventure.sunsetSibling = button.dataset.sunsetSibling; renderScene({ focus: false }); }
  if (button.dataset.sunsetWord) { adventure.sunsetFamilyWord = button.dataset.sunsetWord; renderScene({ focus: false }); }
  if (button.dataset.sunsetMemory) { adventure.sunsetMemory = button.dataset.sunsetMemory; renderScene({ focus: false }); }
  if (button.dataset.sunsetView) { adventure.sunsetView = button.dataset.sunsetView; renderScene({ focus: false }); }
  if (button.dataset.sunsetStay) { adventure.sunsetStay = button.dataset.sunsetStay; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-sunset')) { adventure.savedSunsetCulture = true; renderScene({ focus: false }); showToast('Az üsküdari naplemente bekerült az útinaplódba.'); }
  if (button.dataset.bakerySmell) { adventure.bakerySmell = button.dataset.bakerySmell; renderScene({ focus: false }); }
  if (button.dataset.bakeryOrder) { adventure.bakeryOrder = button.dataset.bakeryOrder; renderScene({ focus: false }); }
  if (button.dataset.bakeryDrink) { adventure.bakeryDrink = button.dataset.bakeryDrink; renderScene({ focus: false }); }
  if (button.dataset.simitTaste) { adventure.simitTaste = button.dataset.simitTaste; renderScene({ focus: false }); }
  if (button.dataset.kitchenAction) { adventure.kitchenAction = button.dataset.kitchenAction; renderScene({ focus: false }); }
  if (button.dataset.breakfastCompany) { adventure.breakfastCompany = button.dataset.breakfastCompany; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-simit')) { adventure.savedSimitCulture = true; renderScene({ focus: false }); showToast('A közös reggeli bekerült az útinaplódba.'); }
  if (button.dataset.mosquePace) { adventure.mosquePace = button.dataset.mosquePace; renderScene({ focus: false }); }
  if (button.dataset.mosqueDirection) { adventure.mosqueDirection = button.dataset.mosqueDirection; renderScene({ focus: false }); }
  if (button.dataset.mosqueShoes) { adventure.mosqueShoes = button.dataset.mosqueShoes; renderScene({ focus: false }); }
  if (button.dataset.mosquePermission) { adventure.mosquePermission = button.dataset.mosquePermission; renderScene({ focus: false }); }
  if (button.dataset.mosqueDetail) { adventure.mosqueDetail = button.dataset.mosqueDetail; renderScene({ focus: false }); }
  if (button.dataset.mosqueQuiet) { adventure.mosqueQuiet = button.dataset.mosqueQuiet; renderScene({ focus: false }); }
  if (button.dataset.mosqueThanks) { adventure.mosqueThanks = button.dataset.mosqueThanks; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-mosque')) { adventure.savedMosqueCulture = true; renderScene({ focus: false }); showToast('A tiszteletteljes érkezés bekerült az útinaplódba.'); }
  if (button.dataset.waterfrontWeather) { adventure.waterfrontWeather = button.dataset.waterfrontWeather; renderScene({ focus: false }); }
  if (button.dataset.waterfrontFruit) { adventure.waterfrontFruit = button.dataset.waterfrontFruit; renderScene({ focus: false }); }
  if (button.dataset.fruitAmount) { adventure.fruitAmount = button.dataset.fruitAmount; renderScene({ focus: false }); }
  if (button.dataset.waterfrontPrice) { adventure.waterfrontPrice = button.dataset.waterfrontPrice; renderScene({ focus: false }); }
  if (button.dataset.waterfrontPlan) { adventure.waterfrontPlan = button.dataset.waterfrontPlan; renderScene({ focus: false }); }
  if (button.dataset.favoritePhrase) { adventure.favoritePhrase = button.dataset.favoritePhrase; renderScene({ focus: false }); }
  if (button.dataset.cityFeeling) { adventure.cityFeeling = button.dataset.cityFeeling; renderScene({ focus: false }); }
  if (button.dataset.aliFarewell) { adventure.aliFarewell = button.dataset.aliFarewell; renderScene({ focus: false }); }
  if (button.hasAttribute('data-save-waterfront')) { adventure.savedWaterfrontCulture = true; renderScene({ focus: false }); showToast('A vízpart ritmusa bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-skip-name')) { adventure.name = ''; next(); }
  if (button.hasAttribute('data-complete-tram')) { saveJournalEntry(6); closeExperience(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); showToast('A villamosút bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-complete-uskudar')) { saveJournalEntry(7); closeExperience(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); showToast('Az üsküdari este bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-complete-bakery')) { saveJournalEntry(8); closeExperience(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); showToast('A pékség reggele bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-complete-mosque')) { saveJournalEntry(9); closeExperience(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); showToast('A sultanahmeti látogatás bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-complete-journey')) { saveJournalEntry(10); clearJourneySession(); closeExperience(); updateJournalCount(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); showToast('Az első isztambuli utad bekerült az útinaplódba.'); }
  if (button.hasAttribute('data-restart')) { clearJourneySession(); adventure = initialState(); scenes = causalGalataScenes; renderScene(); showToast('Galata fölött újra felkel a nap.'); }
});

stage.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target);
  if (event.target.hasAttribute('data-name-form')) adventure.name = String(form.get('name') || '').trim();
  if (event.target.hasAttribute('data-origin-form')) adventure.nationality = String(form.get('nationality') || 'hungarian');
  next();
});

stage.addEventListener('change', event => {
  if (event.target.id !== 'guest-nationality') return;
  adventure.nationality = event.target.value || 'hungarian';
  const copy = nationalityCopy();
  const phraseCard = event.target.closest('form')?.querySelector('.phrase-card.compact');
  if (!phraseCard) return;
  const turkish = phraseCard.querySelector('strong');
  const hungarian = phraseCard.querySelector('span:not(.phrase-label)');
  if (turkish) turkish.textContent = copy.tr;
  if (hungarian) hungarian.textContent = copy.hu;
});

document.addEventListener('keydown', event => {
  if (!journal.hidden) {
    if (event.key === 'Escape') closeJournal();
    if (event.key === 'Tab') {
      const focusable = [...journal.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return;
  }
  if (experience.hidden) return;
  if (event.key === 'Escape') closeExperience();
  if (event.key === 'Tab') {
    const focusable = [...experience.querySelectorAll('button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

updateJournalCount();

const launchParams = new URLSearchParams(window.location.search);
const requestedAdventure = Number(launchParams.get('adventure'));
if (launchParams.has('adventure') && Number.isInteger(requestedAdventure) && requestedAdventure >= 0 && requestedAdventure < adventureLibrary.length) {
  openSelectedAdventure(requestedAdventure);
} else if (launchParams.get('start') === '1') openExperience();
else if (launchParams.get('panel') === 'journal') openJournal();

function startAmbience() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  const playTone = () => { const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.frequency.value = 180 + Math.random() * 70; oscillator.type = 'sine'; gain.gain.setValueAtTime(0, audioContext.currentTime); gain.gain.linearRampToValueAtTime(.018, audioContext.currentTime + .6); gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + 2.8); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 3); };
  playTone(); ambienceTimer = setInterval(playTone, 4800); soundToggle.setAttribute('aria-pressed', 'true'); soundToggle.querySelector('span:last-child').textContent = 'Hangulat hangja: be';
}
function stopAmbience() { clearInterval(ambienceTimer); ambienceTimer = null; soundToggle.setAttribute('aria-pressed', 'false'); soundToggle.querySelector('span:last-child').textContent = 'Hangulat hangja'; }
soundToggle?.addEventListener('click', () => ambienceTimer ? stopAmbience() : startAmbience());

const journeyLine = document.querySelector('.journey-line');
const journeyCards = [...document.querySelectorAll('.journey-card')];
const journeyPrev = document.querySelector('.journey-prev');
const journeyNext = document.querySelector('.journey-next');
const journeyPosition = document.querySelector('.journey-swipe strong');
const journeyTicketPosition = document.querySelector('.journey-ticket b');
const journeyTicketName = document.querySelector('.journey-ticket span:first-child strong');
const journeyTicketRoute = document.querySelector('.journey-ticket span:nth-of-type(2) strong');
let journeyCursor = 0;

function journeyVisibleCards() { return window.matchMedia('(max-width: 900px)').matches ? 1 : 3; }
function updateJourneyControls() {
  const visibleCards = journeyVisibleCards();
  const maxCursor = Math.max(0, journeyCards.length - visibleCards);
  journeyCursor = Math.min(Math.max(journeyCursor, 0), maxCursor);
  journeyPrev.disabled = journeyCursor === 0;
  journeyNext.disabled = journeyCursor === maxCursor;
  const firstPosition = String(journeyCursor + 1).padStart(2, '0');
  const lastPosition = String(Math.min(journeyCursor + visibleCards, journeyCards.length)).padStart(2, '0');
  const visibleRange = visibleCards > 1 ? `${firstPosition}–${lastPosition}` : firstPosition;
  journeyPosition.textContent = visibleRange;
  journeyTicketPosition.textContent = `${visibleRange} / 10`;
  journeyTicketName.textContent = `İstanbul · ${visibleRange}`;
  journeyTicketRoute.textContent = journeyCards[journeyCursor].querySelector('h3').textContent;
  journeyCards.forEach((card, index) => card.classList.toggle('active', index === journeyCursor));
}
function moveJourney(direction) {
  journeyCursor += direction;
  updateJourneyControls();
  const target = journeyCards[journeyCursor];
  journeyLine.scrollTo({ left: target.offsetLeft - journeyLine.offsetLeft, behavior: 'smooth' });
}
journeyPrev?.addEventListener('click', () => moveJourney(-1));
journeyNext?.addEventListener('click', () => moveJourney(1));
window.addEventListener('resize', updateJourneyControls);
updateJourneyControls();
migrateJournalPhrases();
const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting)), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
