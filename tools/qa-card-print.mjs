import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimeModules = 'C:/Users/szeif/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = createRequire(import.meta.url)(`${runtimeModules}/playwright`);
const pdfArg = process.argv.indexOf('--pdf');
const pdfPath = pdfArg >= 0 ? path.resolve(process.argv[pdfArg + 1]) : '';
const failures = [];
const checks = [];
const check = (condition, message, details = '') => {
  checks.push({ ok:Boolean(condition), message, details });
  if (!condition) failures.push(details ? `${message}: ${details}` : message);
};

function loadVocabulary() {
  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'a1-vocabulary.js'), 'utf8'), { window });
  return window.ALI_A1_VOCABULARY;
}

function searchable(value = '') {
  return String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[’'".?!…]+/g, '').replace(/\s+/g, ' ').trim();
}

function uniqueEntries(entries) {
  const result = new Map();
  for (const entry of entries) {
    const key = searchable(entry.tr);
    if (!key) continue;
    if (!result.has(key)) result.set(key, { ...entry, sections:[entry.section] });
    else if (!result.get(key).sections.includes(entry.section)) result.get(key).sections.push(entry.section);
  }
  return [...result.values()];
}

function printableHungarian(entry) {
  const translation = String(entry.hu || '').trim();
  const turkish = String(entry.tr || '').trim();
  if (!translation || !/[.!?…]$/.test(turkish)) return translation;
  const ending = /\?$/.test(turkish) ? '?' : '.';
  return translation.split(/\s*\/\s*/).map((part) => {
    const trimmed = part.trim();
    if (!trimmed) return '';
    const capitalized = `${trimmed.charAt(0).toLocaleUpperCase('hu-HU')}${trimmed.slice(1)}`;
    return /[.!?…]$/.test(capitalized) ? capitalized : `${capitalized}${ending}`;
  }).filter(Boolean).join(' / ');
}

function mimeType(file) {
  const ext = path.extname(file).toLowerCase();
  return ({ '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2' })[ext] || 'application/octet-stream';
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      const requested = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
      if (!requested.startsWith(root) || !fs.existsSync(requested) || fs.statSync(requested).isDirectory()) {
        response.writeHead(404).end('Not found');
        return;
      }
      response.writeHead(200, { 'Content-Type':mimeType(requested), 'Cache-Control':'no-store' });
      fs.createReadStream(requested).pipe(response);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, origin:`http://127.0.0.1:${server.address().port}` }));
  });
}

async function inspectDeck(page, expected, label) {
  await page.emulateMedia({ media:'print' });
  const result = await page.locator('[data-print-card-deck]').evaluate((deck) => {
    const pages = [...deck.querySelectorAll('.print-card-page')];
    const cardInfo = (card) => {
      const rect = card.getBoundingClientRect();
      const strong = card.querySelector('.print-card-copy strong');
      const strongRect = strong.getBoundingClientRect();
      const qr = card.querySelector('.print-card-qr');
      const qrRect = qr?.getBoundingClientRect();
      const brandRect = card.querySelector('.print-card-brand').getBoundingClientRect();
      const inside = (child) => !child || (child.left >= rect.left - .6 && child.top >= rect.top - .6 && child.right <= rect.right + .6 && child.bottom <= rect.bottom + .6);
      return {
        number:card.dataset.cardNumber,
        side:card.dataset.cardSide,
        text:strong.textContent.trim(),
        card:{ width:rect.width, height:rect.height },
        overflow:!(inside(strongRect) && inside(qrRect) && inside(brandRect)),
        qr:qr ? { width:qrRect.width, height:qrRect.height, loaded:qr.complete && qr.naturalWidth > 0 } : null,
        portraitLoaded:[...card.querySelectorAll('img')].every((image) => image.complete && image.naturalWidth > 0)
      };
    };
    return {
      pageCount:pages.length,
      pages:pages.map((page) => [...page.querySelectorAll('.print-learning-card')].map((card) => card.classList.contains('is-blank') ? null : cardInfo(card))),
      placeholders:deck.textContent.match(/Ezt a mondatot az út során tetted el|A magyar jelentést a történetben találod|lorem ipsum/gi) || []
    };
  });
  const fronts = result.pages.filter((_, index) => index % 2 === 0).flat().filter(Boolean);
  const backs = result.pages.filter((_, index) => index % 2 === 1).flat().filter(Boolean);
  check(fronts.length === expected.length, `${label}: minden előlap elkészült`, `${fronts.length}/${expected.length}`);
  check(backs.length === expected.length, `${label}: minden hátlap elkészült`, `${backs.length}/${expected.length}`);
  check(result.pageCount === Math.ceil(expected.length / 4) * 2, `${label}: helyes PDF-oldalszám`, String(result.pageCount));
  check(result.placeholders.length === 0, `${label}: nincs placeholder`, result.placeholders.join(', '));
  const expectedNumbers = expected.map((_, index) => String(index + 1).padStart(2, '0'));
  check(JSON.stringify(fronts.map(card => card.number)) === JSON.stringify(expectedNumbers), `${label}: az előlap-sorszámok folytonosak és egyediek`);
  check(JSON.stringify([...backs].sort((a, b) => Number(a.number) - Number(b.number)).map(card => card.number)) === JSON.stringify(expectedNumbers), `${label}: a hátlap-sorszámok teljesek és egyediek`);
  const frontByNumber = new Map(fronts.map(card => [card.number, card]));
  const backByNumber = new Map(backs.map(card => [card.number, card]));
  expected.forEach((entry, index) => {
    const number = String(index + 1).padStart(2, '0');
    check(frontByNumber.get(number)?.text === entry.front, `${label}: ${number}. előlap szövege`, `${frontByNumber.get(number)?.text || 'HIÁNYZIK'} ↔ ${entry.front}`);
    check(backByNumber.get(number)?.text === entry.back, `${label}: ${number}. hátlap szövege`, `${backByNumber.get(number)?.text || 'HIÁNYZIK'} ↔ ${entry.back}`);
  });
  for (let pageIndex = 0; pageIndex < result.pages.length; pageIndex += 2) {
    const frontNumbers = result.pages[pageIndex].map(card => card?.number || null);
    const backNumbers = result.pages[pageIndex + 1].map(card => card?.number || null);
    const physicalBacks = [frontNumbers[1], frontNumbers[0], frontNumbers[3], frontNumbers[2]];
    check(JSON.stringify(backNumbers) === JSON.stringify(physicalBacks), `${label}: ${pageIndex / 2 + 1}. lap hosszú él menti hátoldalpárja`, `${frontNumbers.join(',')} → ${backNumbers.join(',')}`);
  }
  const allCards = [...fronts, ...backs];
  check(allCards.every(card => !card.overflow), `${label}: nincs kártyán belüli túlcsordulás`, allCards.filter(card => card.overflow).map(card => `${card.number}/${card.side}`).join(', '));
  check(allCards.every(card => card.portraitLoaded), `${label}: minden Ali-kép betöltődött`);
  check(fronts.every(card => card.qr?.loaded && card.qr.width >= 43 && card.qr.height >= 43), `${label}: minden QR betöltődött és legalább 11,5 mm`);
  return { result, fronts, backs };
}

const data = loadVocabulary();
const lessons = data.sections.filter((section) => section.code !== '0A');
const rows = lessons.flatMap((section) => section.entries.map((entry) => ({ ...entry, section:section.code })));
const allUnique = uniqueEntries(rows);
const forbidden = /Ezt a mondatot az út során tetted el|A magyar jelentést a történetben találod|placeholder|lorem ipsum/i;
check(rows.every((entry) => String(entry.tr).trim() && String(entry.hu).trim()), 'Adatforrás: nincs üres török vagy magyar szöveg');
check(rows.every((entry) => !forbidden.test(`${entry.tr} ${entry.hu}`)), 'Adatforrás: nincs placeholder');
check(rows.every((entry) => entry.tr === entry.tr.normalize('NFC') && entry.hu === entry.hu.normalize('NFC')), 'Adatforrás: minden szöveg NFC Unicode');
check(rows.every((entry) => !/[�]|Ã.|Å.|Ä./.test(`${entry.tr} ${entry.hu}`)), 'Adatforrás: nincs hibás karakterkódolás');
check(new Set(allUnique.map((entry) => searchable(entry.tr))).size === allUnique.length, 'Adatforrás: minden nyomtatható kártyaazonosító egyedi');

const flightTerms = [
  'Merhaba!','Günaydın!','İyi günler!','İyi akşamlar!','İyi geceler!','Teşekkür ederim./Teşekkürler.','Hoş bulduk!','Hoşça kal!/Güle güle!','Görüşürüz!','Afiyet olsun!','Lütfen!','İyi yolculuklar!','Özür dilerim.','Affedersiniz!','Tamam!','Evet.','Hayır.','Geçmiş olsun.',
  'eczane','hastane','havaalanı','karakol/emniyet','otel','restoran/lokanta','market','banka','klozet/tuvalet','harita','cami','müze','bilet','cüzdan','gar','kimlik','otobüs','pasaport','tren','uçak','valiz/bavul','bir sonraki','inmek','varmak','yola çıkmak','tabii ki',
  'su','çay','kahve','ayran','menü','sipariş','hesap','kahvaltı','öğle yemeği','akşam yemeği','fiyat','kredi kartı','kasiyer','indirim','poşet','adet','yakın','uzak','ucuz','pahalı'
];
const flightEntries = flightTerms.map((term) => allUnique.find((entry) => searchable(entry.tr) === searchable(term))).filter(Boolean);
check(flightEntries.length === flightTerms.length, 'Repülős csomag: minden kijelölt szó megtalálható', `${flightEntries.length}/${flightTerms.length}`);

const { server, origin } = await startServer();
const browser = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const vocabularyPage = await browser.newPage();
  await vocabularyPage.addInitScript(() => { Object.defineProperty(window, 'print', { configurable:true, value:() => { window.__ALI_PRINT_CALLED__ = true; } }); });
  await vocabularyPage.goto(`${origin}/szavak.html`, { waitUntil:'networkidle' });
  await vocabularyPage.locator('[data-print-planner-toggle]').click();
  await vocabularyPage.locator('[data-print-preset="flight"]').click();
  await vocabularyPage.locator('[data-print-start]').click();
  await vocabularyPage.locator('[data-print-card-deck]').waitFor({ state:'attached' });
  await vocabularyPage.waitForFunction(() => window.__ALI_PRINT_CALLED__ === true);
  check(await vocabularyPage.evaluate(() => window.__ALI_PRINT_CALLED__ === true), 'A1-generátor: a nyomtatási folyamat meghívta a böngésző nyomtatását');
  await inspectDeck(vocabularyPage, flightEntries.map((entry) => ({ front:entry.tr, back:printableHungarian(entry) })), 'A1 repülős csomag');
  if (pdfPath) {
    fs.mkdirSync(path.dirname(pdfPath), { recursive:true });
    await vocabularyPage.pdf({ path:pdfPath, format:'A4', printBackground:true, preferCSSPageSize:true });
  }

  const pocketPage = await browser.newPage();
  const pocketSeed = flightEntries.map((entry, index) => ({
    id:`qa-${index + 1}`,
    phrase:entry.tr,
    ...(index % 2 ? { translation:entry.hu } : {}),
    status:'saved',
    source:'a1-szokincs',
    sourceLabel:'QA · A1 szókincs'
  }));
  pocketSeed.push({ id:'qa-name', phrase:'Benim adım Tímea.', status:'saved', sourceLabel:'QA · személyes mondat' });
  await pocketPage.addInitScript((seed) => {
    localStorage.setItem('ali-phrase-progress-v2', JSON.stringify(seed));
    Object.defineProperty(window, 'print', { configurable:true, value:() => { window.__ALI_PRINT_CALLED__ = true; } });
  }, pocketSeed);
  await pocketPage.goto(`${origin}/zseb.html`, { waitUntil:'networkidle' });
  await pocketPage.locator('[data-print-cards]').first().click();
  await pocketPage.locator('[data-print-card-deck]').waitFor({ state:'attached' });
  await pocketPage.waitForFunction(() => window.__ALI_PRINT_CALLED__ === true);
  check(await pocketPage.evaluate(() => window.__ALI_PRINT_CALLED__ === true), 'Ali zsebében: a nyomtatási folyamat meghívta a böngésző nyomtatását');
  const naturalFallbacks = new Map([
    ['Merhaba!', 'Szia.'],
    ['İyi günler!', 'Jó napot.'],
    ['Görüşürüz!', 'Viszlát.']
  ].map(([turkish, hungarian]) => [searchable(turkish), hungarian]));
  const expectedPocket = flightEntries.map((entry, index) => ({
    front:entry.tr,
    back:index % 2 ? printableHungarian(entry) : (naturalFallbacks.get(searchable(entry.tr)) || printableHungarian(entry))
  }));
  expectedPocket.push({ front:'Benim adım Tímea.', back:'A nevem Tímea.' });
  await inspectDeck(pocketPage, expectedPocket, 'Ali zsebében');
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const report = {
  generatedAt:new Date().toISOString(),
  sourceRows:rows.length,
  uniqueCards:allUnique.length,
  flightCards:flightEntries.length,
  checks:checks.length,
  passed:checks.filter((item) => item.ok).length,
  failed:failures.length,
  failures,
  pdf:pdfPath || null
};
fs.mkdirSync(path.join(root, 'outputs', 'qa'), { recursive:true });
fs.writeFileSync(path.join(root, 'outputs', 'qa', 'ali-card-qa-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
