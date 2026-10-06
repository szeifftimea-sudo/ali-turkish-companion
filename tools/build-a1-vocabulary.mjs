import fs from 'node:fs';

const [sourcePath, dictionaryPath, machineTranslationPath, outputPath] = process.argv.slice(2);
if (!sourcePath || !dictionaryPath || !machineTranslationPath || !outputPath) {
  throw new Error('Használat: node tools/build-a1-vocabulary.mjs EXTRACTED.json DICTIONARY.txt TRANSLATIONS.json OUTPUT.js');
}

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const machineTranslations = JSON.parse(fs.readFileSync(machineTranslationPath, 'utf8'));
const dictionaryLines = fs.readFileSync(dictionaryPath, 'utf8').split(/\r?\n/);
const dictionary = new Map();

function key(value = '') {
  return String(value).toLocaleLowerCase('en-US').replace(/[.!?]/g, '').replace(/\s+/g, ' ').trim();
}

for (const line of dictionaryLines) {
  const separator = line.indexOf(' - ');
  if (separator < 1) continue;
  const english = key(line.slice(0, separator));
  const hungarian = line.slice(separator + 3).trim();
  if (english && hungarian && !dictionary.has(english)) dictionary.set(english, hungarian);
}

const overrides = new Map(Object.entries({
  'weather, air':'időjárás, levegő', 'hello':'szia', 'hi':'szia', 'good morning':'jó reggelt',
  'friend':'barát', 'house':'ház', 'table':'asztal', 'picture':'kép', 'bottle':'palack',
  'ms':'hölgy / asszony', 'mr':'úr', 'window':'ablak', 'tape':'szalag', 'map':'térkép',
  'hospital':'kórház', 'book':'könyv', 'store':'üzlet', 'restaurant':'étterem', 'classroom':'tanterem',
  'bread':'kenyér', 'fig':'füge', 'bowl':'tál', 'floor':'emelet', 'supermarket':'szupermarket',
  'package':'csomag', 'vinegar':'ecet', 'milk':'tej', 'ticket':'jegy', 'lemonade':'limonádé',
  'view':'kilátás', 'fork':'villa', 'magazine':'folyóirat', 'lesson':'lecke', 'husband':'férj',
  'cousin':'unokatestvér', 'director':'igazgató', 'follower':'követő', 'grandchild':'unoka',
  'suitcase':'bőrönd', 'gift':'ajándék', 'letter':'levél', 'candle':'gyertya', 'anniversary':'évforduló',
  'month':'hónap', 'day':'nap', 'week':'hét', 'winter':'tél', 'year':'év', 'purpose':'cél',
  'life':'élet', 'region':'régió', 'square':'tér', 'county':'járás / megye', 'neighbourhood':'környék',
  'neighborhood':'környék', 'street':'utca', 'location':'elhelyezkedés', 'bench':'pad', 'market':'piac',
  'vicinity':'környék', 'criteria':'szempontok', 'notebook':'füzet', 'tea':'tea', 'bug':'rovar',
  'show':'előadás / bemutató', 'bank':'bank', 'to wake up':'felébredni', 'to help':'segíteni',
  'human':'ember', 'warm':'langyos', 'money':'pénz', 'plate':'tányér', 'plane':'repülőgép',
  'towel':'törölköző', 'door':'ajtó', 'ruler':'vonalzó', 'honey':'méz', 'glass':'pohár',
  'pepper':'paprika', 'tooth':'fog', 'orange':'narancs', 'aisle':'árusor', 'pinch':'csipet',
  'close':'közel', 'married':'házas', 'english':'angol', 'to try':'megpróbálni', 'flag':'zászló',
  'allowance':'zsebpénz', 'second':'másodperc', 'identity':'személyi igazolvány', 'castle':'vár',
  'tour':'túra', 'on':'fölött / rajta', 'back':'hátsó rész', 'middle':'közép', 'simple':'egyszerű',
  'good afternoon/have a good day':'jó napot / legyen szép napod', 'good evening':'jó estét', 'good night':'jó éjszakát',
  'thank you/thanks':'köszönöm', 'welcome':'üdvözöllek', "thanks, i'm glad to be here":'köszönöm a fogadtatást',
  'goodbye':'viszlát', 'see you':'viszlát', 'take care of yourself':'vigyázz magadra', 'enjoy your meal':'jó étvágyat',
  'please':'kérem / kérlek', 'congratulations':'gratulálok', 'have fun':'jó szórakozást',
  'enjoy your trip/have a nice trip':'jó utat', 'good luck':'sok szerencsét', 'happy birthday':'boldog születésnapot',
  'bless you':'egészségedre', 'thank you, all together':'köszönöm, mindannyiunknak', "i'm sorry/i apologize":'sajnálom / elnézést kérek',
  'cheers':'egészségedre', 'get well soon':'jobbulást', 'excuse me':'elnézést', 'may your work be easy':'könnyű munkát',
  'i love you':'szeretlek', 'shower cabin':'zuhanykabin', 'bedside cabinet':'éjjeliszekrény', 'pastry shop':'cukrászda',
  'ayran':'ayran', 'linden tea':'hársfatea', 'zucchini':'cukkini', 'market check out':'pénztár', 'cahsier':'pénztáros',
  'kilo':'kiló', 'kilogram':'kilogramm', 'liter':'liter', 'lentils':'lencse', 'fruit juice':'gyümölcslé',
  'tomato paste':'paradicsompüré', 'olive oil':'olívaolaj', 'the two of us':'mi ketten', 'hardworking':'szorgalmas',
  'wavy-haired':'hullámos hajú', 'straight-haired':'egyenes hajú', 'organized':'rendszerezett', 'curly-haired':'göndör hajú',
  'to have a bath/to take a shower':'fürdeni / zuhanyozni', 'to prepare a meal':'ételt készíteni', 'to put on makeup':'sminkelni',
  'to do homework':'házi feladatot írni', 'superhero':'szuperhős', 'to play basketball/football/':'kosárlabdázni / futballozni / röplabdázni',
  'to prepare nutrition':'ételt készíteni', 'to play an instrument':'hangszeren játszani', 'to do makeup':'sminkelni',
  'to listen to music':'zenét hallgatni', 'to withdraw money':'pénzt felvenni', 'to make a call':'telefonálni',
  'baklava':'baklava', 'tzatziki':'cacık, török joghurtos-uborkás étel', 'wedding anniversary':'házassági évforduló',
  'kebab':'kebab', 'kunefe':'künefe', 'lahmacun':'lahmacun', 'sea bass':'tengeri sügér', 'pasta':'tészta',
  'elder brother':'báty', "uncle (dad's brother)":'apai nagybácsi', 'paternal grandmother':'apai nagymama',
  "uncle (mom's brother)":'anyai nagybácsi', 'uncle in law':'nagybácsi házasság révén', "aunt (dad's sister)":'apai nagynéni',
  'sibling/younger sister or brother':'testvér / fiatalabb testvér', "aunt (mom's sister)":'anyai nagynéni',
  'nephew/niece':'unokaöcs / unokahúg', 'aunt in law':'nagynéni házasság révén', 'mid-week':'hétköznap',
  'put in':'eltölteni / beletenni', 'take the road':'útnak indulni', 'face to face':'szemtől szemben',
  'for days':'napok óta', 'for hours':'órák óta', 'for years':'évek óta', 'main street':'főutca',
  'ancient city':'ókori város', 'in front of':'előtt', 'aunt in-law':'nagynéni házasság révén',
  'real estate':'ingatlan', 'for rent':'kiadó', 'for sale':'eladó', 'a lot of':'sok', 'both... and...':'mind… mind…',
  'wet wipe':'nedves törlőkendő', 'all of them':'mindegyikük', 'himself/herself/itself':'saját maga',
  'the most':'a leginkább / leg-', 'to call/search':'hívni / keresni', 'to play/steal':'játszani / lopni',
  'to make a wish':'kívánni', 'to kiss the hand':'kezet csókolni', 'to stroll/tour':'sétálni / bejárni',
  'holidays/religious holidays/national holidays':'ünnepek / vallási ünnepek / nemzeti ünnepek',
  'weekend':'hétvége', 'autumn/autumn':'ősz', 'surfing':'szörfözni', 'a lot':'sok', 'dreaming':'álmodozni',
  'take a decision':'döntést hozni', 'stay at the hotel':'szállodában megszállni', 'save money':'pénzt megtakarítani',
  'spend money':'pénzt költeni', 'make plans':'tervezni', 'eating healthy':'egészségesen táplálkozni',
  'do yoga':'jógázni', "do a master's/doctoral degree":'mesterképzést / doktori képzést végezni', 'take time':'időt szánni',
  'main street/avenue':'főutca / sugárút', 'apartment/flat':'lakás', 'shopkeeper':'kereskedő / boltos',
  'street animals':'utcai állatok', 'next to':'mellett', 'ski resort':'síközpont', 'master craftsman':'mesterember',
  'to rent/for rent':'bérelni / kiadó', 'criteria':'kritériumok', 'frankly, clearly, obviously':'őszintén szólva / világosan / nyilvánvalóan',
  'hindi':'hindi', 'greek/greek':'görög / görög nyelv'
}).map(([english, hungarian]) => [key(english), hungarian]));

const turkishOverrides = new Map(Object.entries({
  'sıkılmak':'unatkozni', 'komşu':'szomszéd', 'mevsim':'évszak', 'doğa':'természet', 'en':'leg-',
  'kendisi':'saját maga', 'hepsi':'mindegyik / az összes', 'hem… hem de…':'mind… mind…',
  'aramak':'hívni / keresni', 'çalmak':'játszani / lopni', 'dilek tutmak/dilek dilemek':'kívánni',
  'el öpmek':'kezet csókolni', 'gezmek':'sétálni / bejárni', 'bayram/dini bayramlar/milli bayramlar':'ünnepek / vallási ünnepek / nemzeti ünnepek',
  'Rumca/Yunanca':'görög / görög nyelv', 'kiralamak/kiralık':'bérelni / kiadó'
  , 'basketbol/futbol/voleybol':'kosárlabda / labdarúgás / röplabda', 'oynamak':'játszani',
  'kantin':'büfé', 'sıra':'iskolapad', 'market':'élelmiszerbolt', 'portakal':'narancs',
  'tutam':'csipet', 'dondurulmuş':'fagyasztott', 'yakın':'közel', 'denemek':'megpróbálni',
  'iptal etmek':'lemondani / törölni', 'karşılamak':'fogadni / üdvözölni',
  'merak etmek':'kíváncsinak lenni / érdekelni', 'uğurlamak':'kikísérni / elbúcsúztatni',
  'harçlık':'zsebpénz', 'saniye':'másodperc', 'kimlik':'személyi igazolvány', 'kale':'vár',
  'tur':'túra', 'üstünde':'fölött / rajta', 'arka':'hátsó rész / hátul', 'orta':'közép',
  'aydınlatmak':'megvilágítani', 'kriter':'szempont', 'basit':'egyszerű', 'açıkçası':'őszintén szólva'
}));

const regionAliases = new Map(Object.entries({
  'united states of america':'US', 'east timor':'TL', 'south korea':'KR', 'north korea':'KP',
  'russia':'RU', 'czech republic':'CZ', 'ivory coast':'CI', 'bolivia':'BO', 'brunei':'BN',
  'iran':'IR', 'laos':'LA', 'moldova':'MD', 'syria':'SY', 'tanzania':'TZ', 'venezuela':'VE',
  'vietnam':'VN', 'cape verde':'CV', 'swaziland':'SZ', 'macedonia':'MK', 'palestine':'PS',
  'antigua and barbuda':'AG', 'bosnia and herzegovina':'BA', 'republic of the congo':'CG',
  'democratic republic of the congo':'CD', 'federated states of micronesia':'FM', 'myanmar':'MM',
  'saint kitts and nevis':'KN', 'saint lucia':'LC', 'saint vincent and the grenadines':'VC',
  'são tomé and príncipe':'ST', 'trinidad and tobago':'TT'
}));
const englishRegions = new Intl.DisplayNames(['en'], { type:'region' });
const hungarianRegions = new Intl.DisplayNames(['hu'], { type:'region' });
const regionCodes = [];
for (let first = 65; first <= 90; first += 1) {
  for (let second = 65; second <= 90; second += 1) {
    const code = String.fromCharCode(first, second);
    const english = englishRegions.of(code);
    if (english && english !== code) regionCodes.push(code);
  }
}
const regionsByEnglish = new Map(regionCodes.map(code => [key(englishRegions.of(code)), code]));

function firstSense(value) {
  const withoutNotes = String(value).replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  return withoutNotes.split(/[,;]/, 1)[0].trim();
}

function translateEnglish(english) {
  const normalized = key(english);
  if (overrides.has(normalized)) return overrides.get(normalized);
  const regionCode = regionAliases.get(normalized) || regionsByEnglish.get(normalized);
  if (regionCode) return hungarianRegions.of(regionCode);
  if (machineTranslations[english]) return machineTranslations[english];
  const candidates = [normalized, normalized.replace(/^to\s+/, '')];
  for (const candidate of candidates) {
    if (dictionary.has(candidate)) return firstSense(dictionary.get(candidate));
  }
  return '';
}

const unresolved = [];
const sections = source.sections.map(section => ({
  code: section.code,
  title: section.title,
  entries: section.entries.map(entry => {
    const turkish = section.code === '0A' ? entry.tr.replace(/^[A-ZÇĞİÖŞÜ]\s+/, '') : entry.tr;
    const hungarian = turkishOverrides.get(turkish) || translateEnglish(entry.en);
    if (!hungarian) unresolved.push({ code:section.code, tr:turkish, en:entry.en });
    return { tr:turkish, hu:hungarian || entry.en, en:entry.en };
  })
}));

const output = `window.ALI_A1_VOCABULARY = ${JSON.stringify({
  sectionCount: sections.length,
  entryCount: sections.reduce((sum, section) => sum + section.entries.length, 0),
  sections
}, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');
console.log(JSON.stringify({ sections:sections.length, entries:source.entryCount, unresolved:unresolved.length }, null, 2));
if (unresolved.length) console.log(JSON.stringify(unresolved, null, 2));
