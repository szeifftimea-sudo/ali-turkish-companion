(() => {
  const data = window.ALI_A1_VOCABULARY || { sections:[], entryCount:0 };
  const grid = document.querySelector('#vocabulary-grid');
  const filters = document.querySelector('#chapter-filters');
  const search = document.querySelector('#phrase-search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const direction = document.querySelector('#card-direction');
  const alphabetGrid = document.querySelector('#alphabet-grid');
  const resultsTitle = document.querySelector('#results-title');
  const resultsKicker = document.querySelector('#results-kicker');
  const knownSummary = document.querySelector('[data-known-summary]');
  const knownTrack = document.querySelector('[data-known-track]');
  const pocketToast = document.querySelector('#pocket-toast');
  const printPlanner = document.querySelector('[data-print-planner]');
  const printPlannerToggle = document.querySelector('[data-print-planner-toggle]');
  const printLessonChoices = document.querySelector('[data-print-lessons]');
  const printSummary = document.querySelector('[data-print-summary]');
  const printPreview = document.querySelector('[data-print-preview]');
  const printStart = document.querySelector('[data-print-start]');
  const currentPrintCount = document.querySelector('[data-current-print-count]');
  const PHRASE_KEY = 'ali-phrase-progress-v2';
  const KNOWN_KEY = 'ali-a1-known-v1';
  const MAX_PRINT_CARDS = 80;
  let activeSection = new URLSearchParams(window.location.search).get('lesson') || 'all';
  let printMode = '';
  const selectedPrintSections = new Set();
  const alphabet = ['a','b','c','ç','d','e','f','g','ğ','h','ı','i','j','k','l','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z'];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
  const searchable = (value = '') => String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[’'".?!…]+/g, '').replace(/\s+/g, ' ').trim();
  const canonicalKey = (value) => searchable(value);
  const entryId = (value = '') => String(value).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?…]/g, '').trim();
  const readStored = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
  const writeStored = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* A tanulás mentés nélkül is folytatható. */ } };
  let knownWords = new Set(readStored(KNOWN_KEY, []).filter(Boolean));
  let pocketItems = readStored(PHRASE_KEY, []).filter(item => item && item.id && item.phrase);
  let toastTimer;
  function uniqueEntries(entries) {
    const byTurkish = new Map();
    entries.forEach(entry => { const key = canonicalKey(entry.tr); if (!key) return; if (!byTurkish.has(key)) byTurkish.set(key, { ...entry, sections:[entry.section] }); else if (!byTurkish.get(key).sections.includes(entry.section)) byTurkish.get(key).sections.push(entry.section); });
    return [...byTurkish.values()];
  }
  const alphabetSection = data.sections.find(section => section.code === '0A');
  const lessonSections = data.sections.filter(section => section.code !== '0A');
  if (activeSection !== 'all' && !lessonSections.some(section => section.code === activeSection)) activeSection = 'all';
  const lessonNumberByCode = new Map(lessonSections.map((section, index) => [section.code, index + 1]));
  const lessonLabel = (code) => String(lessonNumberByCode.get(code) || '').padStart(2, '0');
  const allRows = lessonSections.flatMap(section => section.entries.map(entry => ({ ...entry, section:section.code, title:section.title })));
  const allUnique = uniqueEntries(allRows);
  const FLIGHT_PACK_TERMS = [
    'Merhaba!','Günaydın!','İyi günler!','İyi akşamlar!','İyi geceler!','Teşekkür ederim./Teşekkürler.','Hoş bulduk!','Hoşça kal!/Güle güle!','Görüşürüz!','Afiyet olsun!','Lütfen!','İyi yolculuklar!','Özür dilerim.','Affedersiniz!','Tamam!','Evet.','Hayır.','Geçmiş olsun.',
    'eczane','hastane','havaalanı','karakol/emniyet','otel','restoran/lokanta','market','banka','klozet/tuvalet','harita','cami','müze','bilet','cüzdan','gar','kimlik','otobüs','pasaport','tren','uçak','valiz/bavul','bir sonraki','inmek','varmak','yola çıkmak','tabii ki',
    'su','çay','kahve','ayran','menü','sipariş','hesap','kahvaltı','öğle yemeği','akşam yemeği','fiyat','kredi kartı','kasiyer','indirim','poşet','adet','yakın','uzak','ucuz','pahalı'
  ];
  const flightPackEntries = FLIGHT_PACK_TERMS.map(term => allUnique.find(entry => canonicalKey(entry.tr) === canonicalKey(term))).filter(Boolean);
  function renderAlphabet() { alphabetGrid.innerHTML = alphabet.map((letter, index) => { const entry = alphabetSection?.entries[index]; return `<article class="alphabet-card"><span lang="tr">${letter}</span><div>${entry ? `<strong lang="tr">${escapeHtml(entry.tr)}</strong><small>${escapeHtml(entry.hu)}</small>` : ''}</div></article>`; }).join(''); }
  const isKnown = (entry) => knownWords.has(entryId(entry.tr));
  const isPocketed = (entry) => pocketItems.some(item => item.id === entryId(entry.tr));
  function knownCount(entries) { return uniqueEntries(entries).filter(isKnown).length; }
  function renderFilters() {
    const allKnown = knownCount(allUnique);
    filters.innerHTML = `<a class="alphabet-shortcut" href="#abc"><span lang="tr">Alfabe</span> <small>29 betű</small></a><button type="button" class="${activeSection === 'all' ? 'active' : ''}" data-section="all"><span>Minden Ali-lecke</span><small>${allKnown}/${allUnique.length} kész</small></button>${lessonSections.map((section, index) => { const learned = knownCount(section.entries); return `<button type="button" class="${activeSection === section.code ? 'active' : ''}" data-section="${escapeHtml(section.code)}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(section.title)}</span><small>${learned ? `${learned}/${section.entries.length} ✓` : `${section.entries.length} szó`}</small></button>`; }).join('')}`;
  }
  function visibleRows() {
    const query = searchable(search.value);
    const source = query ? allUnique : activeSection === 'all' ? allUnique : allRows.filter(entry => entry.section === activeSection);
    return source.filter(entry => !query || searchable(`${entry.tr} ${entry.hu}`).includes(query));
  }
  function wordActions(entry) {
    const key = entryId(entry.tr); const known = isKnown(entry); const saved = isPocketed(entry);
    const pocketAction = saved
      ? '<a class="pocket-action is-active" href="zseb.html#sajat-szavaim"><span aria-hidden="true">✓</span>Megnézem a zsebben</a>'
      : `<button class="pocket-action" type="button" data-pocket-entry="${escapeHtml(key)}" aria-pressed="false"><span aria-hidden="true">+</span>Zsebbe</button>`;
    return `<div class="word-actions"><button class="known-action${known ? ' is-active' : ''}" type="button" data-known-entry="${escapeHtml(key)}" aria-pressed="${known}"><span aria-hidden="true">${known ? '✓' : '○'}</span>${known ? 'Már tudom' : 'Tanulom'}</button>${pocketAction}</div>`;
  }
  function lessonCompanionMarkup(section) {
    if (section.code === '5B') return `<aside class="lesson-companion travel-companion" aria-labelledby="travel-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali veled indul Isztambulba</p><h4 id="travel-companion-title">Yolculuk planı – Mi történik előtte és utána?</h4><small>Az utazás egymást követő apró lépésekből áll. A törökben az ige vége mutatja meg, hogy valami egy másik esemény előtt vagy után történik.</small></div></header>
      <div class="travel-route" aria-label="Négy állomás Budapesttől Isztambulig">
        <article><span class="travel-scene is-passport" aria-hidden="true"><i></i></span><strong lang="tr">Yola çıkmadan önce pasaportumu kontrol ediyorum.</strong><small>Indulás előtt ellenőrzöm az útlevelemet.</small><b>1 · hazırlan</b></article>
        <article><span class="travel-scene is-suitcase" aria-hidden="true"><i></i></span><strong lang="tr">Havaalanına vardıktan sonra valizimi veriyorum.</strong><small>A reptérre érkezés után feladom a bőröndömet.</small><b>2 · havaalanı</b></article>
        <article><span class="travel-scene is-plane" aria-hidden="true"><i></i></span><strong lang="tr">Uçağa binmeden önce biletimi gösteriyorum.</strong><small>Beszállás előtt megmutatom a jegyemet.</small><b>3 · uçağa bin</b></article>
        <article><span class="travel-scene is-istanbul" aria-hidden="true"><i></i></span><strong lang="tr">Uçaktan indikten sonra İstanbul gezisi başlıyor.</strong><small>Leszállás után kezdődik az isztambuli kaland.</small><b>4 · İstanbul</b></article>
      </div>
      <p class="travel-note"><span aria-hidden="true">✈</span><strong>Ali mini útiterve:</strong> <i lang="tr">Önce valizimi hazırlıyorum.</i> – Először összekészítem a bőröndömet. <b lang="tr">Sonra yola çıkıyorum.</b> – Aztán útnak indulok. <i lang="tr">Uçağa bindikten sonra günlük yazıyorum.</i> – Beszállás után naplót írok.</p>
      <div class="companion-notes travel-notes">
        <article class="is-word-story"><span>Mielőtt valamit teszel</span><h5><strong lang="tr">ige + -madan / -meden önce</strong></h5><p><i lang="tr">çıkmadan önce</i> – indulás előtt<br><i lang="tr">binmeden önce</i> – beszállás előtt<br>A magánhangzó-harmónia választ a két alak közül.</p></article>
        <article class="is-tip"><span>Miután megtörtént</span><h5><strong lang="tr">ige + -dıktan / -dikten / -duktan / -dükten sonra</strong></h5><p><i lang="tr">vardıktan sonra</i> – megérkezés után<br><i lang="tr">indikten sonra</i> – leszállás után<br>Zöngétlen hang után <b>d → t</b>: <i lang="tr">çıktıktan sonra</i>.</p></article>
        <article class="is-native"><span>Főnévvel rövidebb</span><h5><strong lang="tr">főnév + -dan / -den önce · sonra</strong></h5><p><i lang="tr">kahvaltıdan sonra</i> – reggeli után<br><i lang="tr">tiyatrodan önce</i> – színház előtt<br><i lang="tr">tatilden sonra</i> – a nyaralás után</p></article>
      </div>
    </aside>`;
    if (section.code === '5A') return `<aside class="lesson-companion time-companion" aria-labelledby="time-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali isztambuli órája</p><h4 id="time-companion-title">Saat kaç? – Mennyi az idő?</h4><small>A török óra logikája képen egyszerűbb: egészkor csak kimondod az órát, félkor hozzáteszed a <i lang="tr">buçuk</i> szót, negyedkor pedig az óramutató iránya dönti el, hogy „múlt” vagy „lesz”.</small></div></header>
      <div class="clock-grid" aria-label="Négy óra törökül">
        <article><span class="clock-face is-eight" aria-hidden="true"><i></i></span><strong lang="tr">Saat sekiz.</strong><small>08:00 · Nyolc óra.</small></article>
        <article><span class="clock-face is-eight-thirty" aria-hidden="true"><i></i></span><strong lang="tr">Saat sekiz buçuk.</strong><small>08:30 · Fél kilenc.</small></article>
        <article><span class="clock-face is-nine-fifteen" aria-hidden="true"><i></i></span><strong lang="tr">Saat dokuzu çeyrek geçiyor.</strong><small>09:15 · Negyed tíz.</small></article>
        <article><span class="clock-face is-nine-fortyfive" aria-hidden="true"><i></i></span><strong lang="tr">Saat ona çeyrek var.</strong><small>09:45 · Háromnegyed tíz.</small></article>
      </div>
      <p class="schedule-note"><span aria-hidden="true">✦</span><strong>Ali napja:</strong> <i lang="tr">Kahvaltı saat sekizde.</i> – A reggeli nyolckor van. <b lang="tr">Vapur dokuzu çeyrek geçe kalkıyor.</b> – A komp negyed tízkor indul. <i lang="tr">Dokuzdan beşe kadar geziyorum.</i> – Kilenctől ötig sétálok.</p>
      <div class="companion-notes time-notes">
        <article class="is-word-story"><span>Egész és fél</span><h5><strong lang="tr">saat sekiz · saat sekiz buçuk</strong></h5><p>Egész óránál csak az óraszám kell.<br>A <i lang="tr">buçuk</i> jelentése „fél”, és mindig az előző órához kapcsolódik.</p></article>
        <article class="is-tip"><span>Múlt vagy lesz?</span><h5><strong lang="tr">geçiyor · var</strong></h5><p><i lang="tr">dokuzu çeyrek geçiyor</i> – negyed tíz<br><i lang="tr">ona çeyrek var</i> – háromnegyed tíz<br>„Múlt”: tárgyrag. „Lesz”: részes rag.</p></article>
        <article class="is-native"><span>Mikor és meddig?</span><h5><strong lang="tr">-de/-da · geçe/kala · -dan…-a kadar</strong></h5><p><i lang="tr">sekizde</i> – nyolckor<br><i lang="tr">ona çeyrek kala</i> – háromnegyed tízkor<br><i lang="tr">pazartesiden cumaya kadar</i> – hétfőtől péntekig</p></article>
      </div>
    </aside>`;
    if (section.code === '4C') return `<aside class="lesson-companion action-companion" aria-labelledby="action-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali cselekvés közben</p><h4 id="action-companion-title">Neyi yapıyorsun? – Mit csinálsz vele?</h4><small>Ha egy konkrét, már ismert dolgot olvasol, nyitsz ki vagy keresel, a török megjelöli a tárgyat. A cselekvés ugyanaz, de a szó vége elárulja: pontosan arról a dologról beszélünk.</small></div></header>
      <div class="action-grid" aria-label="Négy cselekvés határozott tárggyal">
        <article><span class="verb-scene is-book" aria-hidden="true"><i></i></span><strong lang="tr">Kitap okuyorum. → Kitabı okuyorum.</strong><small>Könyvet olvasok. → A könyvet olvasom.</small></article>
        <article><span class="verb-scene is-gift" aria-hidden="true"><i></i></span><strong lang="tr">Hediye açıyorum. → Hediyeyi açıyorum.</strong><small>Ajándékot bontok. → Az ajándékot bontom.</small></article>
        <article><span class="verb-scene is-phone" aria-hidden="true"><i></i></span><strong lang="tr">Annemi arıyorum.</strong><small>Az anyukámat hívom.</small></article>
        <article><span class="verb-scene is-candle" aria-hidden="true"><i></i></span><strong lang="tr">Mumu yakıyorum.</strong><small>Meggyújtom a gyertyát.</small></article>
      </div>
      <p class="action-note"><span aria-hidden="true">✦</span><strong>Ali születésnapi sorrendje:</strong> <i lang="tr">Önce mumu yak.</i> – Először gyújtsd meg a gyertyát. <b lang="tr">Bir dilek tut.</b> – Kívánj valamit. <i lang="tr">Sonra hediyeyi aç.</i> – Aztán bontsd ki az ajándékot.</p>
      <div class="companion-notes action-notes">
        <article class="is-word-story"><span>Egy vagy az a bizonyos?</span><h5><strong lang="tr">tárgy + -(y)ı / -i / -u / -ü</strong></h5><p><i lang="tr">Telefon istiyorum.</i> – Szeretnék egy telefont.<br><i lang="tr">Telefonu istiyorum.</i> – Azt a telefont szeretném.<br>Az ismert, konkrét tárgy kap ragot.</p></article>
        <article class="is-tip"><span>A szó is változhat</span><h5><strong lang="tr">kitap → kitabı · hediye → hediyeyi</strong></h5><p>A <b>p</b> magánhangzó előtt <b>b</b>-vé lágyulhat.<br>Magánhangzóra végződő szó után kapcsoló <b>y</b> érkezik.</p></article>
        <article class="is-native"><span>Kit? Mit? Melyik helyet?</span><h5><strong lang="tr">kimi? · neyi? · nereyi?</strong></h5><p><i lang="tr">Beni, seni, onu, bizi, sizi, onları</i><br><i lang="tr">Bunu istiyorum.</i> – Ezt kérem.<br><i lang="tr">Orayı görmek istiyorum.</i> – Azt a helyet szeretném látni.</p></article>
      </div>
    </aside>`;
    if (section.code === '4B') return `<aside class="lesson-companion passport-companion" aria-labelledby="passport-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali útlevele</p><h4 id="passport-companion-title">Nerelisin? Hangi dili konuşuyorsun?</h4><small>Honnan jöttél, milyen nemzetiségű vagy, és milyen nyelven beszélsz? Négy útvonalon látod ugyanazt a mintát, aztán már csak az országneveket kell cserélned.</small></div></header>
      <div class="passport-grid" aria-label="Négy ország, nemzetiség és nyelv">
        <article><span class="passport-stamp is-turkiye" aria-hidden="true"><i>TR</i></span><strong lang="tr">Türkiye → Türk → Türkçe</strong><small>Törökország → török → törökül</small></article>
        <article><span class="passport-stamp is-hungary" aria-hidden="true"><i>HU</i></span><strong lang="tr">Macaristan → Macar → Macarca</strong><small>Magyarország → magyar → magyarul</small></article>
        <article><span class="passport-stamp is-germany" aria-hidden="true"><i>DE</i></span><strong lang="tr">Almanya → Alman → Almanca</strong><small>Németország → német → németül</small></article>
        <article><span class="passport-stamp is-japan" aria-hidden="true"><i>JP</i></span><strong lang="tr">Japonya → Japon → Japonca</strong><small>Japán → japán → japánul</small></article>
      </div>
      <p class="passport-note"><span aria-hidden="true">✦</span><strong>Mondd el magadról:</strong> <i lang="tr">Ben Macaristanlıyım.</i> – Magyarországról jöttem. <b lang="tr">Macarım.</b> – Magyar vagyok. <i lang="tr">Macarca konuşuyorum, Türkçe öğreniyorum.</i> – Magyarul beszélek, törökül tanulok.</p>
      <div class="companion-notes passport-notes">
        <article class="is-word-story"><span>Honnan való?</span><h5><strong lang="tr">-lı · -li · -lu · -lü</strong></h5><p><i lang="tr">İsviçreli</i> – svájci<br><i lang="tr">Türkiyeli</i> – törökországi<br><i lang="tr">Macaristanlı</i> – magyarországi<br>A négyalakú magánhangzó-harmónia választ.</p></article>
        <article class="is-tip"><span>Milyen nyelven?</span><h5><strong lang="tr">-ca · -ce · -ça · -çe</strong></h5><p><i lang="tr">İtalyanca</i> – olaszul<br><i lang="tr">İngilizce</i> – angolul<br><i lang="tr">Türkçe</i> – törökül<br>A zöngétlen mássalhangzó után <b>ç</b> érkezik.</p></article>
        <article class="is-native"><span>Magam és mind</span><h5><strong lang="tr">kendi · hep</strong></h5><p><i lang="tr">Kendim Türkçe öğreniyorum.</i><br>Magam tanulok törökül.<br><i lang="tr">Hepimiz Türkçe öğreniyoruz.</i><br>Mindannyian törökül tanulunk.</p></article>
      </div>
    </aside>`;
    if (section.code === '4A') return `<aside class="lesson-companion family-companion" aria-labelledby="family-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali családi albuma</p><h4 id="family-companion-title">Kim kimin nesi? – Ki kicsoda a családban?</h4><small>A török rokonságnevek azt is elárulják, hogy valaki az anya vagy az apa családjához tartozik. Nézd végig a két ágat, aztán mondd el, neked kik vannak a családodban.</small></div></header>
      <div class="family-tree" aria-label="Az anyai és az apai családi ág török elnevezései">
        <article><span class="family-branch is-maternal" aria-hidden="true"><i></i></span><strong lang="tr">anneannem</strong><small>anyai nagymamám</small><b>anne → anneanne</b></article>
        <article><span class="family-branch is-paternal" aria-hidden="true"><i></i></span><strong lang="tr">babaannem</strong><small>apai nagymamám</small><b>baba → babaanne</b></article>
        <article><span class="family-branch is-maternal-siblings" aria-hidden="true"><i></i></span><strong><span lang="tr">dayım</span> · <span lang="tr">teyzem</span></strong><small>anyai nagybácsim · nagynéném</small><b>anne tarafı</b></article>
        <article><span class="family-branch is-paternal-siblings" aria-hidden="true"><i></i></span><strong><span lang="tr">amcam</span> · <span lang="tr">halam</span></strong><small>apai nagybácsim · nagynéném</small><b>baba tarafı</b></article>
      </div>
      <p class="family-note"><span aria-hidden="true">✦</span><strong>Ali mutatja a képeket:</strong> <i lang="tr">Bu benim annem.</i> – Ő az anyukám. <b lang="tr">Şu amcamın kızı.</b> – Ő az apai nagybátyám lánya. <i lang="tr">O benim kuzenim.</i> – Ő az unokatestvérem.</p>
      <div class="companion-notes family-notes">
        <article class="is-word-story"><span>Kié?</span><h5><strong lang="tr">birtokos + -(n)ın · birtok + -(s)ı</strong></h5><p><i lang="tr">Ayşe'nin evi</i> – Ayşe háza<br><i lang="tr">Can'ın telefonu</i> – Can telefonja<br>Mindkét szó megmutatja az összetartozást.</p></article>
        <article class="is-tip"><span>Az én családom</span><h5><strong lang="tr">benim annem · bizim ailemiz</strong></h5><p><i lang="tr">senin baban</i> – a te apukád<br><i lang="tr">onun kardeşi</i> – az ő testvére<br>Ha egyértelmű, a <b lang="tr">benim, senin, onun</b> el is maradhat.</p></article>
        <article class="is-native"><span>Van vagy nincs?</span><h5><strong lang="tr">var · yok</strong></h5><p><i lang="tr">Benim bir dayım var.</i><br>Van egy anyai nagybátyám.<br><i lang="tr">Benim halam yok.</i><br>Nincs apai nagynéném.</p></article>
      </div>
    </aside>`;
    if (section.code === '3C') return `<aside class="lesson-companion restaurant-companion" aria-labelledby="restaurant-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali asztalánál</p><h4 id="restaurant-companion-title">Ne yemek istiyorsun? – Mit szeretnél enni?</h4><small>Egy török éttermi rendelés négy kis jelenetben: mondd el, mit szeretnél, mit nem kérsz, majd kérj engedélyt vagy segítséget udvariasan.</small></div></header>
      <div class="restaurant-table" aria-label="Négy török fogás és négy hasznos mondat">
        <article><span class="food-scene is-lahmacun" aria-hidden="true"><i></i></span><strong lang="tr">Lahmacun yemek istiyorum.</strong><small>Lahmacunt szeretnék enni.</small></article>
        <article><span class="food-scene is-manti" aria-hidden="true"><i></i></span><strong lang="tr">Mantı yemek istemiyorum.</strong><small>Nem szeretnék mantıt enni.</small></article>
        <article><span class="food-scene is-ayran" aria-hidden="true"><i></i></span><strong lang="tr">Ayran alabilir miyim?</strong><small>Kaphatok ayrant?</small></article>
        <article><span class="food-scene is-baklava" aria-hidden="true"><i></i></span><strong lang="tr">Baklava getirebilir misiniz?</strong><small>Hozna baklavát?</small></article>
      </div>
      <p class="restaurant-note"><span aria-hidden="true">☾</span><strong>Ali rendelése:</strong> <i lang="tr">Bakabilir misiniz?</i> – Elnézést! <b lang="tr">Sipariş verebilir miyiz?</b> – Rendelhetünk? <i lang="tr">Acısız, lütfen.</i> – Csípős nélkül, kérem.</p>
      <div class="companion-notes restaurant-notes">
        <article class="is-word-story"><span>Mit szeretnél?</span><h5><strong lang="tr">ige + -mak/-mek + istemek</strong></h5><p><i lang="tr">Balık yemek istiyorum.</i><br>Halat szeretnék enni.<br><i lang="tr">Kahve içmek istemiyorum.</i><br>Nem szeretnék kávét inni.</p></article>
        <article class="is-tip"><span>Kérj engedélyt</span><h5><strong lang="tr">-(y)abilir miyim?</strong></h5><p><i lang="tr">Bir şişe su alabilir miyim?</i><br>Kaphatok egy üveg vizet?<br>A magánhangzóra végződő ige után a <b>y</b> kapcsol: <i lang="tr">öde + y + ebilir miyim? → ödeyebilir miyim?</i></p></article>
        <article class="is-native"><span>Kérj udvariasan</span><h5><strong lang="tr">-(y)abilir misiniz?</strong></h5><p><i lang="tr">Ekstra peynir koyabilir misiniz?</i><br>Tenne rá extra sajtot?<br><i lang="tr">Hesabı getirebilir misiniz, lütfen?</i><br>Kihozná a számlát, kérem?</p></article>
      </div>
    </aside>`;
    if (section.code === '3B') return `<aside class="lesson-companion hobby-companion" aria-labelledby="hobby-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali mozgó térképe</p><h4 id="hobby-companion-title">Nereden nereye? – Honnan, hová?</h4><small>A törökben az irány nem külön szó: a hely nevének végére költözik. Ali egyik programból a másikba visz, hogy lásd a két irányt működés közben.</small></div></header>
      <div class="hobby-route" aria-label="Négy program két irányraggal">
        <article><span class="hobby-scene is-theater" aria-hidden="true"><i></i></span><strong lang="tr">Tiyatroya gidiyorum.</strong><small>Színházba megyek.</small><b>hová? → -ya</b></article>
        <article><span class="hobby-scene is-course" aria-hidden="true"><i></i></span><strong lang="tr">Kurstan geliyorum.</strong><small>Tanfolyamról jövök.</small><b>honnan? → -tan</b></article>
        <article><span class="hobby-scene is-sea" aria-hidden="true"><i></i></span><strong lang="tr">Denize giriyorum.</strong><small>Bemegyek a tengerbe.</small><b>hová? → -e</b></article>
        <article><span class="hobby-scene is-ferry-off" aria-hidden="true"><i></i></span><strong lang="tr">Vapurdan iniyorum.</strong><small>Leszállok a kompról.</small><b>honnan? → -dan</b></article>
      </div>
      <p class="hobby-note"><span aria-hidden="true">↔</span><strong>Ali iránytűje:</strong> <i lang="tr">Nereye?</i> a célt kérdezi, <i lang="tr">Nereden?</i> a kiindulást. <b>İstanbul'a gidiyorum.</b> ↔ <b>İstanbul'dan geliyorum.</b></p>
      <div class="companion-notes hobby-notes">
        <article class="is-word-story"><span>A cél felé</span><h5><strong lang="tr">-(y)a / -(y)e</strong></h5><p><i lang="tr">parka</i> – a parkba<br><i lang="tr">müzeye</i> – a múzeumba<br>Magánhangzó után a <b>y</b> hidat épít: <i lang="tr">araba + ya</i>.</p></article>
        <article class="is-tip"><span>A forrástól</span><h5><strong lang="tr">-dan / -den / -tan / -ten</strong></h5><p><i lang="tr">evden</i> – otthonról<br><i lang="tr">manavdan</i> – a zöldségestől<br>Az <b>f, s, t, k, ç, ş, h, p</b> után a <b>d</b> hang <b>t</b>-vé válik: <i lang="tr">otobüsten</i>.</p></article>
        <article class="is-native"><span>Tanuld párban</span><h5>Az ige megválasztja a ragot.</h5><p><i lang="tr">birine bakmak</i> – nézni valakire<br><i lang="tr">birine yardım etmek</i> – segíteni valakinek<br><i lang="tr">bir şeyden hoşlanmak</i> – kedvelni valamit<br><i lang="tr">bir şeyden korkmak</i> – félni valamitől</p></article>
      </div>
    </aside>`;
    if (section.code === '3A') return `<aside class="lesson-companion routine-companion" aria-labelledby="routine-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali egy napja Isztambulban</p><h4 id="routine-companion-title">Bugün ne yapıyorsun? – Mit csinálsz ma?</h4><small>A török jelen idő egyszerre mesél arról, ami most történik, ami rendszeresen ismétlődik, és arról is, amit a közeljövőre már elterveztél.</small></div></header>
      <div class="routine-tour" aria-label="Ali napjának négy állomása">
        <article><span class="routine-scene is-waking" aria-hidden="true"><i></i></span><strong lang="tr">Uyanıyorum.</strong><small>Felébredek.</small></article>
        <article><span class="routine-scene is-breakfast" aria-hidden="true"><i></i></span><strong lang="tr">Kahvaltı yapıyorum.</strong><small>Reggelizek.</small></article>
        <article><span class="routine-scene is-ferry" aria-hidden="true"><i></i></span><strong lang="tr">Vapura biniyorum.</strong><small>Felszállok a kompra.</small></article>
        <article><span class="routine-scene is-evening" aria-hidden="true"><i></i></span><strong lang="tr">Kitap okuyorum.</strong><small>Könyvet olvasok.</small></article>
      </div>
      <p class="routine-note"><span aria-hidden="true">İ</span><strong>Ali ritmusa:</strong> keresd meg az ige utolsó magánhangzóját, és abból válaszd ki a <b>-ıyor / -iyor / -uyor / -üyor</b> alakot: <i lang="tr">yazıyor, geliyor, oturuyor, gülüyor</i>.</p>
      <div class="companion-notes routine-notes">
        <article class="is-word-story"><span>Most, szokás, terv</span><h5>Egyetlen alak, három időérzet.</h5><p><i lang="tr">Şimdi Türkçe çalışıyorum.</i><br>Most törökül tanulok.<br><i lang="tr">Her gün yürüyorum.</i><br>Mindennap sétálok.<br><i lang="tr">Yarın buluşuyoruz.</i><br>Holnap találkozunk.</p></article>
        <article class="is-tip"><span>Ali figyelmeztet</span><h5>A szó vége néha átalakul.</h5><p>Magánhangzó után csak <b>-yor</b>: <i lang="tr">uyu-yor</i>.<br><b>a/e</b> eltűnhet: <i lang="tr">bekle-yor → bekliyor</i>.<br><b>t</b> néha <b>d</b> lesz: <i lang="tr">git-iyor → gidiyor</i>.</p></article>
        <article class="is-native"><span>m vagy mu?</span><h5>A helye elárulja.</h5><p><i lang="tr">İçmiyorum.</i> – Nem iszom.<br>A tagadó <b>-m</b> az igéhez tapad.<br><i lang="tr">İçiyor musun?</i> – Iszol?<br>A kérdő <b>mu</b> külön szó.</p></article>
      </div>
    </aside>`;
    if (section.code === '2C') return `<aside class="lesson-companion people-companion" aria-labelledby="people-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali bemutatja a társaságot</p><h4 id="people-companion-title">Biz böyleyiz – ilyenek vagyunk.</h4><small>Nézd meg, ki milyen, aztán cseréld a személyt: a török szó végén rögtön megmutatkozik, kiről beszélsz.</small></div></header>
      <div class="people-tour" aria-label="Négy ember és négy személyrag">
        <article><span class="person-scene is-happy" aria-hidden="true"><i></i></span><strong lang="tr">Ben mutluyum.</strong><small>Én boldog vagyok.</small></article>
        <article><span class="person-scene is-energetic" aria-hidden="true"><i></i></span><strong lang="tr">Sen enerjiksin.</strong><small>Te energikus vagy.</small></article>
        <article><span class="person-scene is-calm" aria-hidden="true"><i></i></span><strong lang="tr">O sakin.</strong><small>Ő nyugodt.</small></article>
        <article><span class="person-scene is-hardworking" aria-hidden="true"><i></i></span><strong lang="tr">Biz çalışkanız.</strong><small>Mi szorgalmasak vagyunk.</small></article>
      </div>
      <p class="people-note"><span aria-hidden="true">K</span><strong>Ali ketçapja:</strong> ha a szó <b>k, t, ç, p</b> hangra végződik, a magánhangzóval kezdődő rag előtt gyakran <b>ğ, d, c, b</b> lesz belőle: <i lang="tr">genç + im → gencim</i>, <i lang="tr">komik + im → komiğim</i>.</p>
      <div class="companion-notes people-notes">
        <article class="is-word-story"><span>Ki vagyok?</span><h5>A személy a szó végére költözik.</h5><p><i lang="tr">Ben yorgunum.</i> – Fáradt vagyok.<br><i lang="tr">Sen yorgunsun.</i> – Fáradt vagy.<br><i lang="tr">O yorgun.</i> – Fáradt.</p></article>
        <article class="is-tip"><span>Nem ilyen vagyok</span><h5><strong lang="tr">değil</strong> + személyrag</h5><p><i lang="tr">Tembel değilim.</i><br>Nem vagyok lusta.<br><i lang="tr">Biz üzgün değiliz.</i><br>Nem vagyunk szomorúak.</p></article>
        <article class="is-native"><span>Kérdezd meg</span><h5><strong lang="tr">mı / mi / mu / mü</strong> külön szó.</h5><p><i lang="tr">Mutlu musun?</i> – Boldog vagy?<br><i lang="tr">Yorgun musunuz?</i> – Fáradtak?<br><i lang="tr">Sakin değil mi?</i> – Nem nyugodt?</p></article>
      </div>
    </aside>`;
    if (section.code === '2B') return `<aside class="lesson-companion shopping-companion" aria-labelledby="shopping-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali bevásárol</p><h4 id="shopping-companion-title">Ali'yle pazarda – számolj úgy, ahogy a kosár telik.</h4><small>Négy hétköznapi mennyiség segít összekötni a számokat azzal, amit Isztambulban valóban kérni fogsz.</small></div></header>
      <div class="shopping-tour" aria-label="Négy bevásárlási mennyiség Ali kosarából">
        <article><span class="shopping-scene is-potato" aria-hidden="true"><i></i></span><strong lang="tr">üç kilo patates</strong><small>három kiló burgonya</small></article>
        <article><span class="shopping-scene is-milk" aria-hidden="true"><i></i></span><strong lang="tr">dört şişe süt</strong><small>négy üveg tej</small></article>
        <article><span class="shopping-scene is-soap" aria-hidden="true"><i></i></span><strong lang="tr">on iki tane sabun</strong><small>tizenkét darab szappan</small></article>
        <article><span class="shopping-scene is-price" aria-hidden="true"><i></i></span><strong lang="tr">iki yüz lira</strong><small>kétszáz líra</small></article>
      </div>
      <p class="shopping-note"><span aria-hidden="true">₺</span><strong>Ali számol:</strong> száznál és ezernél nem mondunk külön <i lang="tr">bir</i>-t: <i lang="tr">yüz</i> és <i lang="tr">bin</i> a helyes, nem <s lang="tr">bir yüz</s> vagy <s lang="tr">bir bin</s>.</p>
      <div class="companion-notes shopping-notes">
        <article class="is-word-story"><span>Mini nyelvtan · mennyi?</span><h5><strong lang="tr">Kaç?</strong> vagy <strong lang="tr">Ne kadar?</strong></h5><p><i lang="tr">Kaç şişe süt?</i> – Hány üveg tej?<br><i lang="tr">Bir kilo domates ne kadar?</i><br>Mennyibe kerül egy kiló paradicsom?</p></article>
        <article class="is-tip"><span>Számépítő</span><h5>A nagyobb szám is kis darabokból áll.</h5><p><i lang="tr">yirmi yedi</i> = 20 + 7<br><i lang="tr">üç yüz kırk</i> = 300 + 40<br><i lang="tr">bin elli iki</i> = 1000 + 50 + 2</p></article>
        <article class="is-native"><span>Hányadik?</span><h5><strong lang="tr">-ıncı/-inci/-uncu/-üncü</strong></h5><p><i lang="tr">birinci</i> – első<br><i lang="tr">ikinci ürün</i> – második termék<br><i lang="tr">Yedinci sokakta.</i> – A hetedik utcában.</p></article>
      </div>
    </aside>`;
    if (section.code === '2A') return `<aside class="lesson-companion city-companion" aria-labelledby="city-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali megmutatja a környéket</p><h4 id="city-companion-title">Ali'yle şehirde – négy megálló, egy új nyelvi térkép.</h4><small>Ismerd fel a helyet, mondd meg, hol van, aztán kérdezd meg, mi található ott.</small></div></header>
      <div class="city-tour" aria-label="Négy városi hely Ali környékén">
        <article><span class="city-scene is-pharmacy" aria-hidden="true"><i></i></span><strong lang="tr">eczane</strong><small>gyógyszertár</small></article>
        <article><span class="city-scene is-mosque" aria-hidden="true"><i></i></span><strong lang="tr">cami</strong><small>mecset</small></article>
        <article><span class="city-scene is-pastry" aria-hidden="true"><i></i></span><strong lang="tr">pastane</strong><small>cukrászda</small></article>
        <article><span class="city-scene is-school" aria-hidden="true"><i></i></span><strong lang="tr">okul</strong><small>iskola</small></article>
      </div>
      <p class="city-note"><span aria-hidden="true">⌖</span><strong>Ali fülel:</strong> a szabályos <i lang="tr">Nerede?</i> a gyors hétköznapi beszédben gyakran <i lang="tr">Nerde?</i>-ként hangzik.</p>
      <div class="companion-notes city-notes">
        <article class="is-word-story"><span>Mini nyelvtan · hol?</span><h5><strong lang="tr">-da/-de</strong> vagy <strong lang="tr">-ta/-te</strong></h5><p><i lang="tr">müzede</i> – a múzeumban<br><i lang="tr">parkta</i> – a parkban<br>Az <strong>f, s, t, k, ç, ş, h, p</strong> után a <i lang="tr">d</i> hang <i lang="tr">t</i>-vé válik.</p></article>
        <article class="is-tip"><span>Mi van ott?</span><h5>hely + dolog + <strong lang="tr">var / yok</strong></h5><p><i lang="tr">Okulda kantin var.</i><br>Az iskolában van büfé.<br><i lang="tr">Sokakta banka yok.</i><br>Az utcán nincs bank.</p></article>
        <article class="is-native"><span>Mondd ki Isztambulban</span><h5>Két kérdés, amely utat nyit.</h5><p><i lang="tr">Eczane nerede?</i><br>Hol van a gyógyszertár?<br><i lang="tr">Yakında banka var mı?</i><br>Van bank a közelben?</p></article>
      </div>
    </aside>`;
    if (section.code === '1B') return `<aside class="lesson-companion home-companion" aria-labelledby="home-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali körbevezet</p><h4 id="home-companion-title">Ali'nin evi – lépj be, és nevezd nevén.</h4><small>Egy isztambuli otthon négy kis állomása: előbb felismered a helyet, aztán már mondatba is teszed.</small></div></header>
      <div class="home-tour" aria-label="Ali otthonának helyiségei">
        <article><span class="room-scene is-kitchen" aria-hidden="true"><i></i></span><strong lang="tr">mutfak</strong><small>konyha</small></article>
        <article><span class="room-scene is-living" aria-hidden="true"><i></i></span><strong lang="tr">oturma odası</strong><small>nappali</small></article>
        <article><span class="room-scene is-bedroom" aria-hidden="true"><i></i></span><strong lang="tr">yatak odası</strong><small>hálószoba</small></article>
        <article><span class="room-scene is-garden" aria-hidden="true"><i></i></span><strong lang="tr">bahçe</strong><small>kert</small></article>
      </div>
      <p class="home-note"><span aria-hidden="true">⌂</span><strong>Ali súg:</strong> török otthonokban a bejáratnál gyakran lekerül a cipő, és előkerül a <i lang="tr">terlik</i>, vagyis a házipapucs.</p>
      <div class="companion-notes home-notes">
        <article class="is-word-story"><span>Szóboncoló</span><h5><i lang="tr">buz</i> + <i lang="tr">dolap</i> → <strong lang="tr">buzdolabı</strong></h5><p>A <i lang="tr">buz</i> „jég”, a <i lang="tr">dolap</i> „szekrény”. Együtt hűtőszekrény; a szó végén a <i lang="tr">p</i> hang <i lang="tr">b</i>-vé lágyul.</p></article>
        <article class="is-tip"><span>Mini nyelvtan · hol?</span><h5><strong lang="tr">-de/-da</strong>, néha <strong lang="tr">-te/-ta</strong></h5><p><i lang="tr">Evdeyim.</i> – Otthon vagyok.<br><i lang="tr">Mutfakta.</i> – A konyhában.<br>A toldalék szépen hozzásimul a szó hangjaihoz.</p></article>
        <article class="is-native"><span>Mondd ki rögtön</span><h5>Két mondat, ami már él.</h5><p><i lang="tr">Mutfak nerede?</i><br>Hol van a konyha?<br><i lang="tr">Ev çok güzel.</i><br>Nagyon szép a ház.</p></article>
      </div>
    </aside>`;
    if (section.code !== '1A') return '';
    return `<aside class="lesson-companion" aria-labelledby="greeting-companion-title">
      <header><span class="companion-ali"><img src="assets/ali.png" alt="" /></span><div><p>Ali súg</p><h4 id="greeting-companion-title">Nemcsak azt számít, mit mondasz – az is, mikor és kinek.</h4><small>A török köszönések mögött napszak, szóalkotás és egy kis udvariassági koreográfia bújik meg.</small></div></header>
      <div class="greeting-clock" aria-label="Török köszönések napszakok szerint">
        <article><time>08:00</time><span class="day-scene is-morning" aria-hidden="true"><i class="celestial"></i><i class="landmark"></i><i class="detail"></i></span><strong lang="tr">Günaydın</strong><small>Boszporuszi reggel</small></article>
        <article><time>12:00</time><span class="day-scene is-noon" aria-hidden="true"><i class="celestial"></i><i class="landmark"></i><i class="detail"></i></span><strong lang="tr">İyi günler</strong><small>Isztambul délben</small></article>
        <article><time>20:00</time><span class="day-scene is-evening" aria-hidden="true"><i class="celestial"></i><i class="landmark"></i><i class="detail"></i></span><strong lang="tr">İyi akşamlar</strong><small>Esti ezan idején</small></article>
        <article><time>22:00</time><span class="day-scene is-night" aria-hidden="true"><i class="celestial"></i><i class="landmark"></i><i class="detail"></i></span><strong lang="tr">İyi geceler</strong><small>Kız Kulesi éjjel</small></article>
      </div>
      <p class="clock-note"><span aria-hidden="true">☀</span> A <strong lang="tr">Tünaydın</strong> létezik, de a hétköznapokban délután is sokkal természetesebb az <strong lang="tr">İyi günler</strong>.</p>
      <div class="companion-notes">
        <article class="is-word-story"><span>Szóboncoló</span><h5><i lang="tr">gün</i> + <i lang="tr">aydın</i> = <strong lang="tr">Günaydın</strong></h5><p>A <i lang="tr">gün</i> jelentése „nap”, az <i lang="tr">aydın</i> pedig „világos”. Mintha azt mondanád: legyen fényes a napod.</p></article>
        <article class="is-tip"><span>Ki marad, ki indul?</span><h5><strong lang="tr">Hoşça kal</strong> ↔ <strong lang="tr">Güle güle</strong></h5><p>A távozó mondja: <i lang="tr">Hoşça kal</i>. A maradó válasza: <i lang="tr">Güle güle</i>. Így nem kevered össze őket.</p></article>
        <article class="is-native"><span>Beszélj természetesebben</span><h5>Egy apró <strong lang="tr">Hadi</strong> sokat segít.</h5><p><i lang="tr">Hadi görüşürüz.</i><br><i lang="tr">Hadi bay bay.</i><br><i lang="tr">Hadi hoşça kal.</i></p></article>
      </div>
    </aside>`;
  }
  function sectionMarkup(section, entries) {
    const learned = knownCount(entries); const progress = entries.length ? Math.round((learned / entries.length) * 100) : 0;
    return `<article class="vocabulary-card"><header><span>${lessonLabel(section.code)}</span><div><p>Ali ${lessonNumberByCode.get(section.code)}. leckéje</p><h3>${escapeHtml(section.title)}</h3><small>${learned ? `${learned} már megy · ${entries.length - learned} még gyakorolható` : `${entries.length} szó és kifejezés vár rád`}</small><div class="lesson-progress" aria-label="${learned} megtanult szó ${entries.length} közül"><i style="width:${progress}%"></i></div></div></header>${lessonCompanionMarkup(section)}<div class="vocabulary-columns" aria-hidden="true"><span>Törökül</span><span>Magyarul</span><span>Saját jelöléseim</span></div><dl>${entries.map(entry => `<div class="${isKnown(entry) ? 'is-known' : ''}"><dt lang="tr">${escapeHtml(entry.tr)}</dt><dd>${escapeHtml(entry.hu)}</dd>${wordActions(entry)}</div>`).join('')}</dl></article>`;
  }
  function render() {
    const rows = visibleRows(); const query = searchable(search.value);
    if (activeSection === 'all' || query) { const grouped = lessonSections.map(section => ({ section, entries:rows.filter(entry => entry.sections.includes(section.code) && entry.sections[0] === section.code) })).filter(group => group.entries.length); grid.innerHTML = grouped.map(group => sectionMarkup(group.section, group.entries)).join(''); }
    else { const section = lessonSections.find(item => item.code === activeSection); grid.innerHTML = section && rows.length ? sectionMarkup(section, rows) : ''; }
    empty.hidden = rows.length > 0;
    const section = lessonSections.find(item => item.code === activeSection);
    if (query) resultsTitle.textContent = `Találatok erre: „${search.value.trim()}”`;
    else if (activeSection === 'all') resultsTitle.innerHTML = 'Ali <span class="a1-accent">A1</span>-es szókincse';
    else resultsTitle.textContent = `${section?.title || 'Ez a lecke'}: szavak és kifejezések`;
    resultsKicker.textContent = query ? 'Ali mind a 17 leckében körülnézett' : activeSection === 'all' ? 'Szóról szóra, a saját tempódban' : `Ali ${lessonNumberByCode.get(activeSection)}. leckéje`;
    const context = activeSection === 'all' || query ? `${allUnique.length} egyedi szó és kifejezés · 17 Ali-lecke` : `${rows.length} tétel ebben a leckében`;
    count.textContent = rows.length ? (query ? `${rows.length} találat a teljes A1-szókincsben` : context) : 'Nincs találat';
    const learned = knownCount(allUnique); const percentage = allUnique.length ? Math.round((learned / allUnique.length) * 100) : 0;
    knownSummary.textContent = learned ? `${learned} szót már biztosnak jelöltél a ${allUnique.length}-ből.` : 'Még egy szó sincs megjelölve – az első pipa is haladás.';
    knownTrack.style.width = `${percentage}%`;
    renderFilters();
    if (!printPlanner.hidden) renderPrintPlanner();
  }
  function showToast(message) {
    clearTimeout(toastTimer); pocketToast.textContent = message; pocketToast.hidden = false;
    requestAnimationFrame(() => pocketToast.classList.add('is-visible'));
    toastTimer = setTimeout(() => { pocketToast.classList.remove('is-visible'); setTimeout(() => { pocketToast.hidden = true; }, 220); }, 2600);
  }
  function entryById(id) { return allUnique.find(entry => entryId(entry.tr) === id); }
  function sectionForEntry(entry) {
    const code = entry.section || entry.sections?.[0];
    return lessonSections.find(section => section.code === code) || lessonSections[0];
  }
  function saveEntryToPocket(entry) {
    const id = entryId(entry.tr); const section = sectionForEntry(entry); const now = new Date().toISOString();
    const old = pocketItems.find(item => item.id === id) || { id, phrase:entry.tr, encounters:0, contexts:[], sources:[] };
    const saved = { ...old, phrase:entry.tr, translation:entry.hu, status:'saved', learningState:isKnown(entry) ? 'known' : (old.learningState || 'practicing'), contexts:[...new Set([...(old.contexts || []), `a1-${section.code}`])], sources:[...new Set([...(old.sources || []), 'a1-szokincs'])], source:'a1-szokincs', sourceLabel:`A1 szókincs · ${section.title}`, sourceHref:'szavak.html#szotar', encounters:Math.max(1, old.encounters || 0), updatedAt:now };
    const index = pocketItems.findIndex(item => item.id === id); index < 0 ? pocketItems.push(saved) : pocketItems[index] = saved;
    writeStored(PHRASE_KEY, pocketItems); showToast(`„${entry.tr}” már Ali zsebében van.`);
  }
  function toggleKnown(entry) {
    const id = entryId(entry.tr); const nowKnown = !knownWords.has(id);
    nowKnown ? knownWords.add(id) : knownWords.delete(id); writeStored(KNOWN_KEY, [...knownWords]);
    const index = pocketItems.findIndex(item => item.id === id);
    if (index >= 0) { pocketItems[index] = { ...pocketItems[index], learningState:nowKnown ? 'known' : 'practicing', updatedAt:new Date().toISOString() }; writeStored(PHRASE_KEY, pocketItems); }
    showToast(nowKnown ? `Szép munka: „${entry.tr}” már megy.` : `„${entry.tr}” visszakerült a gyakorláshoz.`);
  }
  function printCardSizeClass(text) { return text.length > 82 ? 'is-very-long' : text.length > 46 ? 'is-long' : ''; }
  function printableCardMarkup(card, side) {
    if (!card) return '<div class="print-learning-card is-blank" aria-hidden="true"></div>';
    const trFirst = direction.value === 'tr-hu'; const front = side === 'front'; const showTurkish = front ? trFirst : !trFirst; const text = showTurkish ? card.item.tr : card.item.hu;
    const cardLessons = (card.item.sections || [card.item.section]).filter(Boolean).map(lessonLabel).join('·');
    const footerMark = front
      ? '<img class="print-card-qr" src="assets/ali-site-qr.png" alt="Ali weboldala QR-kód" />'
      : `<b>${escapeHtml(cardLessons)}</b>`;
    return `<article class="print-learning-card ${front ? 'is-front' : 'is-back'} ${printCardSizeClass(text)}"><div class="print-card-ali"><span class="print-card-portrait"><img src="assets/ali.png" alt="Ali" /></span></div><div class="print-card-copy"><small>${showTurkish ? 'TÜRKÇE' : 'MAGYARUL'}</small><strong${showTurkish ? ' lang="tr"' : ''}>${escapeHtml(text)}</strong></div><footer><span class="print-card-brand"><svg viewBox="-4 -4 56 56" aria-hidden="true"><path class="mark-arch" d="M8 41V23C8 12.5 15.2 5 24 5s16 7.5 16 18v18"/><path class="mark-a" d="M14.5 39 24 15.5 33.5 39M18.5 29.5h11"/></svg><span class="print-card-brand-copy"><em>Ali</em><small>A török útitárs</small></span></span>${footerMark}</footer></article>`;
  }
  function buildPrintableDeck(items) {
    document.querySelector('[data-print-card-deck]')?.remove(); const deck = document.createElement('div'); deck.className = 'print-card-deck'; deck.dataset.printCardDeck = ''; const cards = items.map(item => ({ item }));
    for (let offset = 0; offset < cards.length; offset += 4) { const batch = cards.slice(offset, offset + 4); while (batch.length < 4) batch.push(null); const backs = [batch[1], batch[0], batch[3], batch[2]]; deck.insertAdjacentHTML('beforeend', `<section class="print-card-page">${batch.map(card => printableCardMarkup(card, 'front')).join('')}</section><section class="print-card-page">${backs.map(card => printableCardMarkup(card, 'back')).join('')}</section>`); }
    document.body.append(deck); return deck;
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
  function selectedPrintItems() {
    if (printMode === 'flight') return flightPackEntries;
    if (printMode === 'current') return uniqueEntries(visibleRows());
    if (printMode === 'lessons') return uniqueEntries(allRows.filter(entry => selectedPrintSections.has(entry.section)));
    return [];
  }
  function printPreviewMarkup(entry) {
    if (!entry) return '<div class="print-preview-card is-empty" aria-hidden="true"><span>+</span></div>';
    const showTurkish = direction.value === 'tr-hu';
    const term = showTurkish ? entry.tr : entry.hu;
    const answer = showTurkish ? 'Törökül' : 'Magyarul';
    return `<article class="print-preview-card"><div class="print-preview-ali"><img src="assets/ali.png" alt="" /></div><small>${answer}</small><strong${showTurkish ? ' lang="tr"' : ''}>${escapeHtml(term)}</strong><i aria-hidden="true">✦</i></article>`;
  }
  function renderPrintLessons() {
    printLessonChoices.innerHTML = lessonSections.map((section, index) => {
      const selected = selectedPrintSections.has(section.code);
      return `<button type="button" class="${selected ? 'is-selected' : ''}" data-print-section="${escapeHtml(section.code)}" aria-pressed="${selected}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(section.title)}</span><small>${section.entries.length}</small></button>`;
    }).join('');
  }
  function renderPrintPlanner() {
    const items = selectedPrintItems();
    const sheets = Math.ceil(items.length / 4);
    const overLimit = items.length > MAX_PRINT_CARDS;
    const currentItems = uniqueEntries(visibleRows());
    currentPrintCount.textContent = `${currentItems.length} kártya`;
    document.querySelectorAll('[data-print-preset]').forEach(button => {
      button.classList.toggle('is-selected', button.dataset.printPreset === printMode);
      button.setAttribute('aria-pressed', String(button.dataset.printPreset === printMode));
    });
    renderPrintLessons();
    if (!items.length) {
      printSummary.innerHTML = '<strong>Még üres a csomagod.</strong><p>Válaszd a repülős válogatást, a mostani találatokat vagy legalább egy leckét.</p>';
    } else if (overLimit) {
      printSummary.innerHTML = `<strong>${items.length} kártya már túl nagy egy csomaghoz.</strong><p>Vegyél ki még legalább ${items.length - MAX_PRINT_CARDS} kártyát: egyszerre legfeljebb ${MAX_PRINT_CARDS} fér a biztos nyomtatási előnézetbe.</p>`;
    } else {
      const sourceLabel = printMode === 'flight' ? 'Repülős válogatás' : printMode === 'current' ? 'Mostani találatok' : `${selectedPrintSections.size} kijelölt lecke`;
      printSummary.innerHTML = `<span>${escapeHtml(sourceLabel)}</span><strong>${items.length} kártya · ${sheets} kétoldalas A4-es lap</strong><p>Előlap és hátlap párokban, hosszú él mentén fordítva.</p>`;
    }
    const previewItems = items.slice(0, 4);
    while (previewItems.length < 4) previewItems.push(null);
    printPreview.innerHTML = previewItems.map(printPreviewMarkup).join('');
    printStart.disabled = !items.length || overLimit;
    printStart.textContent = items.length && !overLimit ? `⌁ ${items.length} kártya nyomtatási előnézete` : '⌁ Nyomtatási előnézet';
  }
  function openPrintPlanner() {
    if (!printMode) printMode = 'flight';
    printPlanner.hidden = false;
    printPlanner.closest('.dictionary-tools')?.classList.add('has-open-planner');
    printPlannerToggle.setAttribute('aria-expanded', 'true');
    renderPrintPlanner();
    document.querySelector('#print-planner-title')?.focus({ preventScroll:true });
    printPlanner.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }
  function closePrintPlanner() {
    printPlanner.hidden = true;
    printPlanner.closest('.dictionary-tools')?.classList.remove('has-open-planner');
    printPlannerToggle.setAttribute('aria-expanded', 'false');
    printPlannerToggle.focus();
  }
  async function printSelectedItems(items) {
    document.body.classList.add('printing-pocket');
    const deck = buildPrintableDeck(items);
    const restore = () => { document.body.classList.remove('printing-pocket'); deck.remove(); window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    await waitForPrintAssets(deck);
    window.print();
  }
  filters.addEventListener('click', event => { const button = event.target.closest('[data-section]'); if (!button) return; activeSection = button.dataset.section; search.value = ''; render(); });
  search.addEventListener('input', () => { if (search.value.trim()) activeSection = 'all'; render(); });
  grid.addEventListener('click', event => {
    const knownButton = event.target.closest('[data-known-entry]'); const pocketButton = event.target.closest('[data-pocket-entry]');
    const id = knownButton?.dataset.knownEntry || pocketButton?.dataset.pocketEntry; if (!id) return;
    const entry = entryById(id); if (!entry) return;
    if (knownButton) toggleKnown(entry); else if (pocketButton && !pocketButton.disabled) saveEntryToPocket(entry);
    render();
  });
  printPlannerToggle.addEventListener('click', () => printPlanner.hidden ? openPrintPlanner() : closePrintPlanner());
  document.querySelector('[data-print-planner-close]').addEventListener('click', closePrintPlanner);
  document.querySelectorAll('[data-print-preset]').forEach(button => button.addEventListener('click', () => {
    printMode = button.dataset.printPreset;
    selectedPrintSections.clear();
    renderPrintPlanner();
  }));
  printLessonChoices.addEventListener('click', event => {
    const button = event.target.closest('[data-print-section]');
    if (!button) return;
    printMode = 'lessons';
    const code = button.dataset.printSection;
    selectedPrintSections.has(code) ? selectedPrintSections.delete(code) : selectedPrintSections.add(code);
    renderPrintPlanner();
  });
  document.querySelector('[data-print-clear]').addEventListener('click', () => {
    printMode = '';
    selectedPrintSections.clear();
    renderPrintPlanner();
  });
  direction.addEventListener('change', () => { if (!printPlanner.hidden) renderPrintPlanner(); });
  printStart.addEventListener('click', async () => {
    const items = selectedPrintItems();
    if (!items.length || items.length > MAX_PRINT_CARDS) return;
    await printSelectedItems(items);
  });
  renderAlphabet(); renderFilters(); render();
})();
