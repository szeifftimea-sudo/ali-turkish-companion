# Ali – A török útitárs
## Teljes projekt-audit, fejlődéstörténet és fájlindex

| Mező | Tartalom |
|---|---|
| Projekt | Ali – A török útitárs |
| Dokumentum állapota | Forrásalapú master audit |
| Audit dátuma | 2026. július 20. |
| Vizsgált forrás | A teljes helyi projektmappa, a gyökérdokumentumok, az `assets/` és `outputs/` tartalma, valamint a jelenlegi webalkalmazás forrása |
| Elsődleges cél | Összegyűjteni, mi készült el az ötlettől a működő MVP-ig, és megmutatni, mely fájl mire való |
| Forráskorlát | A riport a jelenlegi workspace állapotát rekonstruálja. Commit-szintű Git-történet nem állt rendelkezésre, ezért a sorrend részben fájldátumokból és dokumentumverziókból következik. |

---

## 1. Vezetői összefoglaló

Az Ali projekt egyetlen landing page ötletéből egy karaktervezérelt, 12 oldalas, reszponzív webes MVP-vé fejlődött. A közös munka nemcsak UI-t hozott létre, hanem teljes termékrendszert:

- karakter- és vendégszeretet-filozófiát;
- vizuális kánont és gyártási pipeline-t;
- tíz kanonikus Ali-jelenetet;
- Mırmır külön karakter- és jelenléti rendszerét;
- tíz forrás-PDF 181 oldalának, összesen 1 574 tartalmi egységének feldolgozását;
- tízállomásos, elágazó isztambuli journey-t;
- kereshető török–magyar tudástérképet;
- személyes mondatgyűjteményt és tanulókártya-rendszert;
- Isztambul 17 helyét hét történetívbe rendező várostérképet;
- Török konyha és hat további Place Story élményoldalt;
- több hullámos product, UX, conversation, content és funkcionális auditot;
- OpenAI Build Week nevezési és demócsomagot.

**Elsődleges célcsoport:** magyar anyanyelvű felnőttek, elsősorban kezdők és újrakezdők, akik utazás, kultúra vagy személyes érdeklődés miatt szeretnének közelebb kerülni Törökországhoz és a török nyelvhez. A felület, a magyarázatok, a magyar dialógusok és a jelenlegi tudástár ehhez a célcsoporthoz készültek.

**Bővíthetőség:** a termékstruktúra nem zárja az élményt kizárólag a magyar piacra. A tartalom-, fordítási és karakterréteg szétválasztása később más forrásnyelvek és célcsoportok bevezetését is lehetővé teszi. Ez azonban jövőbeli lokalizációs irány; a jelenlegi MVP magyar nyelvű termék.

### Mennyiségi pillanatkép

| Tétel | Mennyiség | Megjegyzés |
|---|---:|---|
| Projektfájlok | 295 | A gyökér, `assets/`, `outputs/` és `tools/` felhasználói fájljai; a külső eszközfüggőségek nélkül |
| Működő HTML-oldalak | 12 | Kezdőlap, tanulási oldalak, konyha, várostérkép és hat önálló Place Story |
| JavaScript-fájlok | 18 | Journey-motor, tudásadatok, keresés, mentés, térkép, tanulás és történetlogika |
| CSS-fájlok | 16 | Oldalspecifikus és közös reszponzív vizuális rendszerek |
| HTML/CSS/JS sorok | kb. 22 216 | A generált `helyzetek-data.js` adatréteget is tartalmazza |
| Markdown-dokumentumok | 53 | Product, UX, asset, character, story, audit és submission dokumentáció |
| Word-dokumentumok | 5 | Character Bible, Hospitality Manifesto, journey- és conversation-specifikációk |
| Excel-munkafüzetek | 6 | Összesen 48 munkalapnyi tudás-, journey-, kérdésfa- és QA-rendszer |
| Kanonikus vizuális fájlok | 42 | Master képek és contact sheet az `assets/canon/` alatt |
| Optimalizált webképek | 44 | Core, konyhai és Place Story WebP/PNG derivátumok |
| Török hangfájlok | 22 | Kísérleti `ali-v1` audioanyag; az MVP-ben nem teljes körű hangrendszer |

### A működő journey logikai mérete

Az elágazásoknál három külön számot kell megkülönböztetni. A korábbi minőségi auditban szereplő **100 jelenet** a bővebb, auditált prototípus történeti állapota. A későbbi Golden Path-szerkesztés ezt tudatosan egy rövidebb, oksági élménnyé alakította. A jelenlegi MVP tényleges motorjának számai:

| Logikai elem | Jelenlegi mennyiség | Mit jelent? |
|---|---:|---|
| Kalandállomások | 10 | A teljes Galata–Karaköy–villamos–komp–Üsküdar–simit–Sultanahmet–bazár–Gülhane–vízpart út |
| Működő oksági jelenetek | 40 | Állomásonként 4, egymásból következő jelenet |
| Állapotot rögzítő interakciók | 24 | A felhasználó válasza vagy cselekvése későbbi szöveget, emléket vagy kimenetet módosít |
| Élményt módosító többválasztásos döntési pontok | 16 | Két-, három- vagy négyelemű választások, amelyek reakciót, emléket vagy későbbi kimenetet módosítanak |
| Cselekvés-/megerősítésalapú interakciók | 7 | Egy mondat kimondása, kérdés feltevése vagy cselekvés végrehajtása |
| Személyes bemutatkozási ág | 1 | Név megadása vagy kihagyása; a név később visszatér Ali megszólításaiban |
| Nemzetiségi adatválasztó | 1 mező / 57 érték | Nem 57 külön flow vagy nyelv: ugyanannak a török bemutatkozási mondatnak 57 választható adatváltozata |
| Állomások közötti oksági kapuk | 9 | Az első kilenc kaland egyértelműen átadja a következőnek a történetet |
| Közvetlen kalandindítási pontok | 10 | A látogató bármelyik állomást külön is megnyithatja |

A 16 valódi élménydöntés a név és a nemzetiségi adatmező nélkül **294 912 lehetséges választási profilt** ad. Ez kombinatorikai szám, nem ennyi kézzel megírt külön történetet jelent: a döntések különböző mondatokat, reakciókat, naplóbejegyzéseket, emlékeket és visszatérő állapotokat állítanak elő.

**A kombináció alapja:** 2 köszönési mód × 2 cukorválasztás × 2 hely a kompon × 2 üsküdari hely × 2 naplemente-emlék × 2 simitmennyiség × 2 reggeli italválasz × 2 mecsetbeli döntés × 3 bazári tárgy × 2 alkuválasz × 2 vásárlási döntés × 2 parki tempó × 2 közérzet × 2 vízválasz × 3 vízparti meghívás × 4 hazavitt mondat.

A **57 nemzetiség** külön nem része ennek az elágazásszámnak. Ez egy strukturált személyes input: a kiválasztott érték a török „… vagyok” mondat megfelelő alakját tölti be, de nem indít önálló történeti ágat. A név szabad szöveges inputként ugyanígy személyre szab, de nem külön journey.

**Történeti tervezési előzmény:** az `Ali_Causal_Journey_Architecture_v1.xlsx` eredetileg 27 jelentős interakciót, 9 döntési kaput és 9 fő útból kivágandó elemet rögzített. A jelenlegi motor 24 állapotot követő interakcióra egyszerűsült; ez a journey tehermentesítésének eredménye, nem elveszett tudás. A kivett anyag a kereshető tudástárba és az aloldalakra került.

### A tudástár mérete és belső szerkezete

| Tudástári mutató | Mennyiség |
|---|---:|
| Forrásdokumentum | 10 PDF |
| Feldolgozott oldal | 181 |
| Feldolgozott tartalmi egység | 1 574 |
| Normalizálás után egyedi szövegegység | 1 556 |
| Forrásban ismétlődő előfordulás | 18 |
| Fő témakör | 10 |
| „Kaland nyelve” réteg | 776 egység |
| „Ali zsebében” réteg | 769 egység |
| Szerkesztői jelölő | 29 egység |
| Excel-alapú tudás- és QA-munkafüzet | 6 |
| Excel-munkalap összesen | 48 |

#### Tartalomtípusok

| Tartalomtípus | Mennyiség | Szerepe |
|---|---:|---|
| Szókincscsoport | 588 | Témához tartozó szavak és fogalmi csoportok |
| Használható mondat | 534 | Valódi helyzetben kimondható mondatok |
| Párbeszéd | 242 | Kérdés–válasz és szituációs nyelv |
| Szó / kifejezés | 181 | Rövid, önállóan tanulható elemek |
| Témacím | 29 | Belső szerkesztői struktúra; nem önálló tananyag |

#### A tíz tudástári témakör

| # | Témakör | Egység |
|---:|---|---:|
| 01 | Bemutatkozás és ismerkedés | 207 |
| 02 | Személyleírás | 132 |
| 03 | Ruha és vásárlás | 105 |
| 04 | Zöldségek, gyümölcsök és piac | 113 |
| 05 | Otthon és lakás | 101 |
| 06 | Egészség | 169 |
| 07 | Konyha és főzés | 168 |
| 08 | Hétköznapi szófordulatok | 102 |
| 09 | Boltok és vásárlási helyzetek | 301 |
| 10 | Pénz, gazdasági helyzet és megtakarítás | 176 |
| **Összesen** |  | **1 574** |

#### Nyelvi és tartalmi QA-státusz

A tudástár **feldolgozott és terméklogikába rendezett**, de nem azonos a véglegesen lektorált nyelvi korpusszal. A belső QA-jelölések:

| QA-státusz | Egység |
|---|---:|
| Török nyelvi QA szükséges | 1 485 |
| Egészségügyi állítás miatt újraírandó | 46 |
| Dinamikus összeg vagy adat frissítendő | 32 |
| Érzékeny nyelv; csak felismerési rétegben használható | 9 |
| Kulturális kontextus és aktualitás ellenőrzendő | 2 |
| **Összesen** | **1 574** |

Ez fontos projektbizonyíték: a teljes forrásanyag le van fedve és kereshető, miközben a rendszer őszintén nyilvántartja, mely elemek igényelnek még anyanyelvi, egészségügyi, kulturális vagy aktualitási ellenőrzést.

### A vizuális világ, a térkép és a minőségbiztosítás mérete

| Rendszerelem | Mennyiség | Megjegyzés |
|---|---:|---|
| Ali változtathatatlan vizuális azonosítói | 8 | Ezek védik a karakter felismerhetőségét minden új rendernél |
| Core Canon Scene | 10 | A fő journey teljes vizuális gerince |
| Kanonikus arckifejezések | 6 | Az Expression Packet alapállapotai |
| Mırmır változtathatatlan azonosítói | 5 | A macska későbbi jeleneteinek karakterkapuja |
| Konyhai kanonikus képek | 6 | Négy Ali-jelenet és két tárgyi/world still life |
| Place Story masterképek | 23 | A hat önálló történetoldal és a kapcsolódó helyszíncsaládok |
| Kanonikus vizuális fájlok összesen | 42 | Masterképek és contact sheet az `assets/canon/` alatt |
| Webre optimalizált vizuális fájlok | 44 | Reszponzív felhasználásra előkészített derivátumok |
| Isztambuli térképpontok | 17 | Kiemelt és kevésbé ismert helyszínek |
| Összefüggő helytörténetek | 7 | Egy beágyazott Sultanahmet-történet és hat önálló Place Story oldal |
| Szakági auditanyagok | 9 | Journey, critical backlog, térkép, Place Story, kérdésfa és quality audit |
| Master projekt-audit | 1 | Ez a dokumentum, amely a szakági eredményeket egyesíti |

---

## 2. A projekt fejlődése az elejétől a jelenlegi MVP-ig

### 2.1 Termékvízió és Ali identitása

**Elkészült:**

- a „Fedezd fel Törökországot Alival” szervezőelv;
- Ali karakterének teljes személyiség-, kommunikációs, vizuális és AI-konzisztencia rendszere;
- a felhasználó „diák” helyett „vendég” szerepe;
- a funkciók helyett az élményhiányt vizsgáló döntési szűrő;
- a vendégváró karakterfilozófia és a „Would a good host do this?” termékteszt;
- az első 30 másodperces élmény, UX-hurok és landing-page hierarchia.

**Kanonikus források:**

- `Ali_Character_Bible_v1.0.docx`
- `Ali_Hospitality_Manifesto_Character_Philosophy_v2.0.docx`
- `UX_BLUEPRINT.md`
- `LANDING_PAGE_BLUEPRINT.md`

**Központi termékállítás:**

> Ali nem azért született, hogy megtanítsa a török nyelvet. Ali azért született, hogy vendégül lásson Isztambulban. A nyelv pedig útközben természetesen rád ragad.

### 2.2 Vizuális világ és Canon Asset Library

**Elkészült:**

- Ali nyolc változtathatatlan vizuális azonosítója;
- 12 pontos asset review-kapu;
- tíz lezárt, azonosított Canon Scene;
- kamera- és képaránymátrix;
- Expression Packet hat alapállapottal;
- prompt- és renderelési rendszer;
- contact sheet és optimalizált webes derivátumok;
- külön képcsaládok a konyhához és a Place Story-khoz.

**A tíz kanonikus jelenet:**

1. Galata Bridge · napfelkelte
2. Karaköy Tea House
3. Bosphorus Ferry
4. Grand Bazaar
5. Gülhane Park
6. Nostalgic Tram
7. Sunset at Üsküdar
8. Simit Bakery
9. Blue Mosque Courtyard
10. Waterfront Promenade

**Kanonikus források:**

- `CANON_ASSET_LIST.md`
- `ASSET_GENERATION_PROMPTS.md`
- `EXPRESSION_PACKET.md`
- `assets/canon/scenes/`
- `assets/canon/expressions/`
- `assets/canon/ALI-CANON-SCENE-LIBRARY-v1-contact-sheet.jpg`
- `assets/web/`

### 2.3 Mırmır megszületése

Mırmır nem képgenerálási ötletként, hanem Ali világának önálló lakójaként készült el.

**Elkészült:**

- Character Manifesto;
- Ali–Mırmır–vendég kapcsolati modell;
- megengedett és tiltott viselkedések;
- öt változtathatatlan vizuális azonosító;
- Image Generation Pack, ahol az AI renderelő, nem karaktertervező;
- első kanonikus neutrális portré;
- Living World System a ritka, nem gamifikált jelenléthez;
- jóváhagyott Cihangir-találkozás és két Place Story-cameo;
- working draftok elkülönítése a kanonikus referenciától.

**Kanonikus források:**

- `SPRINT_3_MIRMIR_CHARACTER_DESIGN.md`
- `MIRMIR_CHARACTER_MANIFESTO.md`
- `MIRMIR_RELATIONSHIP_MODEL.md`
- `MIRMIR_BEHAVIOR_RULES.md`
- `MIRMIR_VISUAL_CANON.md`
- `MIRMIR_IMAGE_GENERATION_PACK.md`
- `MIRMIR_LIVING_WORLD_SYSTEM.md`
- `assets/canon/mirmir/MIRMIR-CANON-001-neutral-portrait.png`

**Nem kanonikus munkafájlok:** `assets/mirmir/_working/`.

### 2.4 A tíz PDF teljes tudásfeldolgozása

Az eredeti nyelvi anyag nem közvetlenül került a journey-be. Többrétegű tudásarchitektúra készült belőle.

**Bizonyított feldolgozási adatok:**

- 10 forrásdokumentum;
- 181 oldal;
- 1 574 szó-, kifejezés-, példa- és magyarázategység;
- 10 narratív állomás;
- teljes forrás- és oldal-lefedettségi nyilvántartás;
- spiral learning és visszatérési logika;
- külön `Core`, `Optional`, `Ali zsebében`, `Later` és `Archive` réteg.

**Elkészült munkafüzetek:**

| Fájl | Tartalom | Szerkezet |
|---|---|---:|
| `outputs/content-map/Ali_10_Allomas_Content_Coverage_Map.xlsx` | Forrás-, oldal- és tartalmi lefedettség, station map, spiral learning, adventure frames | 7 lap |
| `outputs/adventure-knowledge-map/Ali_Adventure_Knowledge_Map.xlsx` | A teljes 1 574 egységes belső tudástérkép, tíz állomás és QA | 14 lap |
| `outputs/living-story-map/Ali_Living_Story_Map.xlsx` | A tartalom láthatósági és történeti státuszrendszere | 5 lap |
| `outputs/causal-journey-architecture/Ali_Causal_Journey_Architecture_v1.xlsx` | Ok-okozati journey, 27 jelentős interakció és kivágási döntések | 5 lap |
| `outputs/question-tree/Ali_10_kaland_kerdesfak_szovegaudit.xlsx` | A tíz kaland magyar–török kérdésfáinak szerkesztői auditja | 12 lap |
| `outputs/adventure-quality-audit/Ali_Adventure_Quality_Matrix.xlsx` | Történet-, nyelv-, UX-, adaptivitás- és mobilminőség | 5 lap |

**Termékbe fordított adatrétegek:**

- `helyzetek-data.js` – a jóváhagyott Knowledge Mapből generált, 1 574 egységes könyvtár;
- `helyzetek-normalizer.js` – keresési és normalizálási réteg;
- `helyzetek-pairing.js` – török–magyar párosítás;
- `adventure-content.js` – a tíz első kaland kurált, egyedi core/pocket tartalma.

### 2.5 A journey pedagógiai és dramaturgiai újravágása

**Elkészült:**

- a Knowledge Map és a látható journey szétválasztása;
- állomásonként egyetlen kommunikációs cél;
- „egy helyzet, egy vágy” product contract;
- az első út Golden Path-ja;
- az első kaland részletes forgatókönyve;
- természetes magyar párbeszédszabályok;
- világos H1/H2/H3, Ali-mondat, felhasználói válasz és sikerpillanat hierarchia;
- a túlzó „már tudod” üzenetek haszonközpontú kalibrálása;
- oksági átvezetések a helyszínek között.

**Fő dokumentumok:**

- `outputs/journey-story-cut/Ali_Journey_Story_Cut_Golden_Path.docx`
- `outputs/adventure-01/Ali_Adventure_01_Megerkeztel_Spec.docx`
- `outputs/conversation-content-system/Ali_Conversation_Content_Design_System_v1.docx`
- `outputs/causal-journey-architecture/Ali_Causal_Journey_Architecture_v1.xlsx`
- `outputs/question-tree/Ali_10_kaland_kerdesfak_szovegaudit.xlsx`

### 2.6 A működő tízállomásos élmény

**Megvalósult a kezdőlapon:**

- tíz külön indítható kaland;
- elágazó válaszok és személyre szabott mondatok;
- állomáson belüli és teljes journey-progress;
- közös vizuális jelenetmotor;
- visszalépés és továbbhaladás;
- útinapló;
- Ali memóriája, visszatérő mondatok és ritmusprofil;
- helyi munkamenet-mentés és folytatás;
- mobil és desktop reszponzivitás;
- opcionális isztambuli hangulatréteg.

**Fő fájlok:**

- `index.html`
- `styles.css`
- `script.js`
- `adventure-content.js`
- `assets/web/ALI-SCN-001...010-*.webp`

### 2.7 Ali zsebében – a journey utáni tanulási rendszer

Az első journey szándékosan nem tartalmazza a teljes Knowledge Mapet. A mélyebb nyelvi anyag külön, felhasználói szándék szerint érhető el.

**Elkészült:**

- az első út állomásokra rendezett szavai;
- keresés magyarul és törökül;
- a teljes tudástérkép élethelyzetek szerint;
- egyéni mondatok Ali zsebébe mentése;
- tanulási állapot: „Még gyakorlom” / „Már megy”;
- szűrés és egyenként lapozható kártyagyakorlás;
- kétoldalas, 63 × 88 mm-es nyomtatható kártyák;
- négy kártya egy A4-es oldalon;
- tükrözött hátoldalsorrend duplex nyomtatáshoz;
- fix Ali-kép és márkajelzés minden kártyán;
- a nyomtatás az aktív szűrés szerinti paklit használja.

**Fő fájlok:**

- `zseb.html`, `zseb.css`, `zseb.js`
- `szavak.html`, `szavak.css`, `szavak.js`
- `helyzetek.html`, `helyzetek.css`, `helyzetek.js`
- `helyzetek-data.js`, `helyzetek-normalizer.js`, `helyzetek-pairing.js`

**Központi tanulási üzenet:**

> Ami Ali zsebéből a te zsebedbe kerül, az a böngésző bezárása után is veled marad.

### 2.8 Török konyha Alival

**Elkészült:**

- külön Experience Blueprint és Decision Record;
- hat képes P0 konyhai kánon;
- reggeli, piac, közös főzés és vendéghely történeti íve;
- éttermi szerkesztési modell;
- magyar–török konyhai kifejezésekhez vezető átadás;
- reszponzív, működő kulturális oldal.

**Fő fájlok:**

- `KITCHEN_EXPERIENCE_BLUEPRINT.md`
- `KITCHEN_DECISION_RECORD_V1.md`
- `KITCHEN_CANON_ASSET_LIST.md`
- `RESTAURANT_EDITORIAL_MODEL.md`
- `torok-konyha.html`, `torok-konyha.css`, `torok-konyha.js`
- `assets/canon/kitchen/`, `assets/web/kitchen/`

### 2.9 Isztambul várostérképe és a hét Place Story

**Elkészült:**

- 17 helyszín három hangulati térképrétegben;
- helyinformációk, török helynevek, Ali-megjegyzések és továbbvezető CTA-k;
- 17 külön pont helyett hét logikus, bejárható történetív;
- közös Place Story System és QA-kapu;
- hét működő történet, saját képcsaláddal és megőrizhető mondatokkal.

**A hét történet:**

1. A csendes udvar – Kék Mecset, Hagia Szophia, Topkapı és a föld alatti Isztambul
2. Át a vízen, le a partra – Boszporusz-komp, Kadıköy és Moda
3. A bazártól a kikötőig – Nagy Bazár, Süleymaniye, Fűszerbazár és Eminönü
4. Régi utcák az Aranyszarvnál – Kariye, Balat és Fener
5. Előbb a gépek, aztán a kilátás – Rahmi M. Koç Múzeum, Eyüp, TF2 és Pierre Loti
6. A toronytól a parkig – Galata-torony, Dolmabahçe és Yıldız Park
7. Egy nap a szigeten – hajóút, Büyükada és visszatérés

**Rendszerdokumentumok:**

- `ISTANBUL_PLACES_BLUEPRINT.md`
- `PLACE_STORY_SYSTEM_V1.md`
- `PLACE_STORY_COLLECTION_ARCHITECTURE_V1.md`
- `PLACE_STORY_QA_CHECKLIST_V1.md`
- `PLACE_STORY_CONTENT_CONTINUITY_V1.md`
- `PLACE_STORY_FLOW_UNIFICATION_V1.md`

**Működő oldalak:**

- `isztambul-helyei.html`
- `kadikoy-moda.html`
- `bazartol-kikotoig.html`
- `regi-utcak.html`
- `gepektol-kilatasig.html`
- `toronytol-parkig.html`
- `egy-nap-a-szigeten.html`

### 2.10 Navigáció és oldaltérkép

**Elkészült:**

- teljes termék-oldaltérkép;
- mobil és desktop navigáció;
- Kalandok / Ali zsebében / Fedezd fel / Útinaplóm struktúra;
- aktív oldalállapot;
- egységes fejléc- és footerlogó;
- csak működő MVP-elemeket tartalmazó menü.

**Fő fájlok:**

- `ALI_SITE_MAP_V1.md`
- `navigation.css`
- `navigation.js`

### 2.11 Auditok, javítások és regressziós munka

A termék több, egymásra épülő auditkört kapott.

**Auditált területek:**

- teljes első journey product/UX/conversation audit;
- tíz kérdésfa logikai és nyelvi auditja;
- tartalmi lefedettség és pedagógiai terhelés;
- képek, bélyegzők, CTA-k és állomáskapcsolatok;
- térképpontok, történetajtók és visszatérések;
- Place Story-k összehasonlítása három hullámban;
- mobil és desktop vizuális biztonság;
- keresés, fordításpárok és duplikációk;
- helyi mentés, Útinapló és Ali zsebe;
- kezdőlapi tíz kaland külön indítása;
- MVP-menü és működő linkek.

**Auditdokumentumok:**

- `outputs/audit/Ali_First_Journey_Audit_v1.md`
- `outputs/audit/Ali_Experience_Critical_Backlog_v2.md`
- `outputs/adventure-quality-audit/Ali_Adventure_Quality_Matrix.xlsx`
- `ISTANBUL_MAP_UX_AUDIT_V1.md`
- `ISTANBUL_MAP_FUNCTIONAL_AUDIT_V2.md`
- `PLACE_STORY_COMPARATIVE_AUDIT_V1.md`
- `PLACE_STORY_COMPARATIVE_AUDIT_V2.md`
- `PLACE_STORY_COMPARATIVE_AUDIT_V3.md`
- `outputs/map-functional-audit.json`
- `outputs/place-story-audit-raw.json`

**Fontos értelmezés:** a korábbi auditok pillanatfelvételek. Több bennük jelzett hiba később javult, ezért a régebbi „nyitott” státuszok nem tekinthetők automatikusan a jelenlegi MVP hibáinak. Új kiadási döntéshez mindig friss regresszió szükséges.

### 2.12 Build Week submission

**Elkészült:**

- angol nevezési szöveg a négy judging criterion szerint;
- technológiai implementáció összefoglalása;
- háromperces demó másodpercre bontott terve;
- teljes angol voice-over transcript;
- felvételi checklist;
- tudatos MVP-határ és „do not add” lista.

**Fájl:** `BUILD_WEEK_SUBMISSION_PACKAGE_HU.md`.

---

## 3. A jelenlegi működő webhely fájltérképe

| Oldal | Szerep | Fő technikai fájlok |
|---|---|---|
| Kezdőlap és tíz kaland | Érzelmi belépés, journey, Útinapló | `index.html`, `styles.css`, `script.js` |
| Ali zsebében | Személyes mondatok, gyakorlás, nyomtatás | `zseb.html`, `zseb.css`, `zseb.js` |
| Az első út szavai | 10 állomás kurált szavai | `szavak.html`, `szavak.css`, `szavak.js` |
| Mit szeretnél elmondani? | 1 574 egységes kereshető tudástérkép | `helyzetek.html`, `helyzetek.css`, `helyzetek.js`, adatrétegek |
| Török konyha | Kulturális és vendégségélmény | `torok-konyha.html`, `.css`, `.js` |
| Isztambul helyei | 17 pontos térkép és Sultanahmet-történet | `isztambul-helyei.html`, `.css`, `.js` |
| Kadıköy–Moda | Place Story 02 | `kadikoy-moda.html`, `.css`, `.js` |
| Bazártól a kikötőig | Place Story 03 | `bazartol-kikotoig.html`, `.css`, `.js` |
| Régi utcák | Place Story 04 | `regi-utcak.html`, `.css`, `.js` |
| Gépektől a kilátásig | Place Story 05 | `gepektol-kilatasig.html`, `.css`, `.js` |
| Toronytól a parkig | Place Story 06 | `toronytol-parkig.html`, `.css`, `.js` |
| Egy nap a szigeten | Place Story 07 | `egy-nap-a-szigeten.html`, `.css`, `.js` |

**Közös rendszerek:** `navigation.css`, `navigation.js`, `story-caption-safe.css`, `story-learning-layer.css`.

---

## 4. Dokumentumtípusok és autoritás

### 4.1 Elsődleges kanonikus dokumentumok

Ezek határozzák meg, mi Ali és hogyan működik a termék:

1. Hospitality Manifesto
2. Character Bible
3. UX Blueprint
4. Canon Asset List
5. Conversation & Content Design System
6. Journey Story Cut
7. Place Story System
8. Mırmır Living World System

### 4.2 Gyártási dokumentumok

- Canon Asset Briefek;
- Image Generation Recordok;
- Story Blueprintek;
- Excel Knowledge Mapek;
- kérdésfa- és content coverage munkafüzetek.

Ezek nem duplikációk: a Blueprint megmondja, milyen élményt építünk; az Asset Brief megmondja, milyen kép kell hozzá; a Generation Record rögzíti, mi készült el és melyik fájl lett jóváhagyva.

### 4.3 Audit- és QA-dokumentumok

Az auditok történeti pillanatfelvételek. Verziószámuk miatt megtartandók, de új döntés előtt a legfrissebb verzió az irányadó.

### 4.4 Támogató és scratch fájlok

- `*.inspect.ndjson`, preview PNG-k és QA error fájlok: vizsgálati bizonyítékok;
- `audit_structure.txt`: korábbi nyers szerkezeti kivonat;
- `assets/mirmir/_working/`: elutasított vagy előzetes karakterpróbák;
- `outputs/*/preview*.png`: munkafüzet-renderelések;
- builder `.mjs` és `tools/*.js|py`: reprodukálható generálási segédeszközök.

Ezeket nem kell bemutatni a zsűrinek, de az implementáció mélységét és auditálhatóságát bizonyítják.

---

## 5. Bizonyított technológiai megvalósítás

**Confirmed:**

- Vanilla HTML/CSS/JavaScript statikus alkalmazás, külső backend nélkül.
- 10 állomásos elágazó journey-motor.
- 1 574 egységes generált tudáskönyvtár.
- LocalStorage-alapú journey session, Útinapló, emlékezet, ritmus és mondatprogress.
- Keresés és normalizálás magyar és török szövegre.
- Mondatok mentése több oldalról közös Ali-zseb sémába.
- Szűrhető tanulási állapot és fordítható kártyanézet.
- Duplex-nyomtatási lapgenerátor tükrözött hátoldalakkal.
- Interaktív térképrétegek és történetajtók.
- Reszponzív desktop/mobil designrendszer.
- Asset master → web derivátum pipeline.
- QA-workbookok, képi preview-k és automatizált ellenőrzési kimenetek.

**Fontos határ:** a jelenlegi MVP-t a README kifejezetten valódi runtime AI-hívás nélküli prototípusként dokumentálja. A Codex a terméktervezés, tartalomarchitektúra, implementáció és QA fejlesztőeszköze volt; a jelenlegi webapp nem állíthatja, hogy élő AI-modell fut benne.

---

## 6. Nyitott, bizonytalan vagy emberi review-t igénylő pontok

| Téma | Állapot | Miért fontos? |
|---|---|---|
| Török anyanyelvi lektorálás | **Needs review** | Nem találtam bizonyítékot arra, hogy az összes aktív török mondat anyanyelvi szakértői jóváhagyást kapott. |
| Kiejtés és audio | **Részleges** | 22 hangfájl létezik, de a végleges, minden oldalon konzisztens hangintegráció tudatosan későbbre maradt. |
| Török–magyar / magyar–török AI-szótár | **Tervezett, post-MVP** | A személyes tanulást és a tudástár felfedezését bővíti majd; a jelenlegi működő MVP-menüből őszintén kimaradt. |
| Líraváltó | **Tervezett, post-MVP** | Utazás közben használható praktikus eszköz lesz; jelenleg nem része a demonstrált terméknek. |
| Török történelem és kultúra Alival | **Tervezett, post-MVP** | Önálló, Ali képeire és történetmesélésére épülő felfedezőrétegként bővíti majd a jelenlegi konyha- és Place Story-oldalakat. |
| Publikus deployment | **Missing** | A workspace helyi statikus futtatást dokumentál; éles URL vagy deployment-bizonyíték nincs a projektmappában. |
| Felhasználói teszt és hatásmérés | **Missing** | Nincs dokumentált külső usability teszt, retention vagy tanulási eredménymetrika. |
| Forrás-PDF-ek a workspace-ben | **Korlátozott** | A munkafüzetek igazolják a 10 PDF és 181 oldal feldolgozását, de az eredeti PDF-ek nem ebben a projektmappában vannak. |
| Régebbi auditok státusza | **Needs review** | Több régi Must/Should ügy később javult; csak új regresszió alapján zárhatók formálisan. |

### Jóváhagyott bővítési irányok az MVP után

1. **Török történelem és kultúra Alival:** nem tankönyvi kronológia, hanem helyekhez, tárgyakhoz és Ali vendégváró történeteihez kapcsolt kulturális felfedezés.
2. **Török–magyar / magyar–török AI-szótár:** kontextusérzékeny keresés, példamondatok és később megbízható török hang.
3. **Líraváltó:** egyszerű, utazási döntéseket segítő eszköz, amely a vásárlási és piaci helyzetekből természetesen érhető el.
4. **Új forrásnyelvi lokalizációk:** a magyar MVP bizonyítása után a tartalom- és felületi réteg más nyelvekre adaptálható, Ali karakterének és vendégszeretet-filozófiájának változtatása nélkül.

Ezek nem félkész, elrejtett MVP-funkciók, hanem dokumentált termék-roadmap elemek. A jelenlegi demó kizárólag azt ígéri, ami ténylegesen működik.

---

## 7. Ajánlott dokumentumrendezés – mozgatás nélkül

A submission előtt nem javasolt a fájlokat fizikailag áthelyezni. Egy későbbi cleanup során az alábbi logikai struktúra lenne tiszta:

```text
docs/
├── 00-product
├── 01-character-and-hospitality
├── 02-visual-canon
├── 03-learning-and-knowledge
├── 04-first-journey
├── 05-kitchen
├── 06-istanbul-and-place-stories
├── 07-audits
└── 08-submission
archive/
├── working-assets
├── previews
└── superseded-audits
```

Ez a master index addig is virtuális navigációként szolgál, így a beadás előtt nem kockáztatjuk a relatív fájlhivatkozások törését.

---

## 8. Mit bizonyít mindez a Build Week zsűrinek?

### Technological Implementation

Nem landing page mockup készült, hanem elágazó állapotgép, generált tudásréteg, keresés, helyi személyes memória, térkép, közös mentési séma, tanulási rendszer és nyomtatómotor.

### Design

A Character Bible, Hospitality Manifesto, Canon Asset Library és oldalakon átívelő vizuális rendszer egy koherens termékélménnyé áll össze.

### Potential Impact

A termék valós, szűk célcsoportnak ad konkrét ígéretet: magyar, törökországi utazásra készülő kezdők használható mondatokat és kulturális magabiztosságot visznek magukkal.

### Quality of the Idea

Ali nem tanár vagy chatbot, hanem vendégváró. A journey és a fizikai tanulókártyák összekötik az érzelmi utazást az aktív felidézéssel; Mırmır pedig gamifikáció nélkül teszi élővé a világot.

---

## 9. Rövid, beadásban használható Codex-munkatörténet

Codex a projekt teljes életciklusában közreműködött: segített a kezdeti nyelvtanulási ötletet vendégszeretet-alapú termékstratégiává alakítani; létrehozta és rendszerezte Ali és Mırmır karakterdokumentációját; tíz tananyagot 1 574 egységes tudástérképpé szervezett; megtervezte a journey, a természetes párbeszéd és a vizuális asset pipeline rendszerét; implementálta a reszponzív webalkalmazást, a keresést, a mentést, a térképet és a kétoldalas tanulókártyákat; végül több szerepből, ismételt böngészőtesztekkel auditálta és javította a teljes élményt.

Ez a munka nem egyetlen prompt eredménye, hanem dokumentált termékdöntések, iterációk, hibajavítások és minőségi kapuk lánca.

---

## 10. Emberi ellenőrzőlista külső megosztás előtt

- [ ] A projekt tulajdonosa jóváhagyja, hogy a „Codex közreműködött” megfogalmazás pontosan tükrözi az ember–AI munkamegosztást.
- [ ] A 10 PDF / 181 oldal / 1 574 egység számokat a végleges nevezési szövegben ugyanígy használjuk.
- [ ] A török mondatok szakmai lektorálási státuszát nem állítjuk késznek bizonyíték nélkül.
- [ ] A runtime AI-funkciót nem állítjuk működőnek a jelenlegi MVP-ben.
- [ ] A bemutatott útvonal csak működő, menüben is elérhető funkciókat tartalmaz.
- [ ] A régi auditok nyitott hibáit nem idézzük jelenlegi hibaként friss regresszió nélkül.
- [ ] A zsűrinek szánt fájllistából kihagyjuk a working asseteket, preview-kat és nyers QA-kimeneteket.
