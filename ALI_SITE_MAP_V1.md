# Ali – A török útitárs
## Product Sitemap és navigációs architektúra v1.0

**Dátum:** 2026. július 19.  
**Cél:** olyan bővíthető webhelystruktúra létrehozása, amely megőrzi az első utazás érzelmi fókuszát, miközben természetes helyet ad a tanulási, kulturális és utazási tartalmaknak.

---

## 1. Az architektúra alapelve

A webhelynek nem egyenrangú funkciók gyűjteményeként kell működnie. Három különböző réteget kell világosan elválasztania:

1. **Élmény** – az első isztambuli utazás és a későbbi kalandok.
2. **Elmélyülés** – szavak, élethelyzetek, AI-szótár és személyes gyűjtemény.
3. **Felfedezés és segítség** – konyha, kultúra, Isztambul, illetve praktikus úti eszközök.

A kezdőlap elsődleges feladata továbbra is egyetlen dolog:

> **Meghívni a vendéget az első sétára Alival.**

Az összes további oldal ennek az élménynek a folytatása, nem pedig konkurens belépési pont.

---

## 2. Magas szintű oldaltérkép

```text
Kezdőlap
├── Kalandok
│   ├── Az első isztambuli utazás
│   │   └── 10 összekapcsolt állomás
│   └── Későbbi kalandok
│
├── Ali zsebében
│   ├── Az első út szavai
│   ├── Mit szeretnél elmondani?
│   │   └── 10 valódi élethelyzet
│   ├── AI-szótár
│   ├── Saját szavaim
│   └── Úti segítség
│       └── Líraváltó
│
├── Fedezd fel
│   ├── Török konyha
│   │   ├── Ali már megterített
│   │   ├── Törökország ízeinek térképe
│   │   ├── Jellegzetes alapanyagok
│   │   ├── Főzzünk együtt
│   │   └── Mondatok az asztalnál
│   ├── Isztambul helyei
│   ├── Történetek és történelem
│   └── Kultúra és szokások
│
├── Útinaplóm
│   ├── Meglátogatott állomások
│   ├── Megőrzött mondatok
│   └── Személyes emlékek
│
└── Információk
    ├── Ki Ali?
    ├── A projekt filozófiája
    ├── Adatvédelem és AI-átláthatóság
    └── Akadálymentesség
```

---

## 3. Globális főmenü

### Asztali fejléc

1. **Kalandok**
2. **Ali zsebében**
3. **Fedezd fel**
4. **Útinaplóm**
5. Kiemelt CTA: **Sétáljunk egyet**

A líraváltó nem kap önálló főmenüpontot. Hasznos eszköz, de nem a termék fő ígérete; az **Ali zsebében → Úti segítség** csoportból érhető el.

### Mobil fejléc

- Ali-logó
- Útinapló ikon állapotjelzővel
- Menü gomb
- A megnyitott menü alján kiemelt **Sétáljunk egyet** CTA

### Aktív állapot

Az aktuális fő terület mindig látható legyen. Az aloldalakon rövid visszaút jelenjen meg, például:

> Ali zsebében → Az első út szavai

Ez nem technikai morzsanavigációként, hanem halk útjelzőként jelenik meg.

---

## 4. Oldalak és felelősségük

### 4.1 Kezdőlap

**Feladata:** érzelmi belépés és az első utazás elindítása.

**Tartalma:**

- Ali meghívása;
- a tíz állomás előnézete;
- Ali vendégváró karaktere;
- Mırmır és az élő világ;
- rövid ízelítő az „Ali zsebében” és a „Fedezd fel” tartalmakból;
- egyetlen domináns CTA: **Sétáljunk egyet**.

**Nem kerül ide:** teljes szótár, hosszú kulturális cikk, receptlista vagy valutaváltó.

---

### 4.2 Kalandok

**Feladata:** a narratív, interaktív élmények otthona.

#### Az első isztambuli utazás

- 10 állomás;
- folytonos, oksági történet;
- helyzetenként kevés, valóban használható mondat;
- személyes döntések;
- útinaplóba menthető befejezés.

A tíz állomás az első verzióban egyetlen összefüggő élmény marad. Nem készül tíz külön tartalmi aloldal, mert az megtörné az utazást.

#### Későbbi kalandok

Később itt jelenhetnek meg új útvonalak, például:

- Egy este Kadıköyben;
- Reggeli a Boszporusznál;
- Egy nap az ázsiai oldalon;
- Piac, konyha és közös vacsora.

---

### 4.3 Ali zsebében

**Feladata:** a nyelvi elmélyülés központi oldala. Nem tananyaglista, hanem olyan hely, ahol a vendég megtalálja azt, amire éppen szüksége van.

**Állapot:** működő prototípus (`zseb.html`).

Az oldal két fő ajtóval nyit:

#### Amit már együtt megtaláltunk

- **Az első út szavai** – a jelenlegi, 10 állomásra bontott 130 szó és kifejezés.
- **Saját szavaim** – a vendég által megőrzött kifejezések.

#### Amire még szükséged lehet

- **Mit szeretnél elmondani?** – a teljes tudásmap élethelyzetek szerint.
- **AI-szótár** – szabad török-magyar és magyar-török keresés.
- **Líraváltó** – gyors úti segítség.

---

### 4.4 Az első út szavai

**Állapot:** működő prototípus (`szavak.html`).

**Feladata:** az első utazás után visszanézhető, állomásokra rendezett kifejezésgyűjtemény.

**Szervezőelve:** hely és emlék.

**Fő CTA:** **Válassz egy következő élethelyzetet**.

---

### 4.5 Mit szeretnél elmondani?

**Feladata:** a teljes tudásmap felfedezhető, kereshető otthona.

**Szervezőelve:** felhasználói szándék, nem PDF-fejezet és nem nyelvtani kategória.

A tíz fő élethelyzet:

1. Bemutatkoznék valakinek
2. Mesélnék valakiről
3. Ruhát vásárolnék
4. Piacon vásárolnék
5. Az otthonomról beszélnék
6. Segítséget kérnék, ha rosszul vagyok
7. Főznék vagy ételt rendelnék
8. Természetesebben beszélnék
9. Eligazodnék a boltok között
10. Pénzről és tervekről beszélnék

Ezek az első verzióban egyetlen kereshető és szűrhető oldalon jelennek meg. Külön aloldal csak akkor készül egy témából, ha a tartalom mennyisége vagy egy önálló interaktív helyzet indokolja.

---

### 4.6 AI-szótár

**Feladata:** szabad keresés két irányban.

**Irányok:**

- török → magyar;
- magyar → török;
- automatikus nyelvfelismerés.

**Egy találat tartalma:**

- természetes fordítás;
- török alapszó;
- toldalékok értelmezése;
- formális vagy baráti használat;
- egy valós utazási példamondat;
- mentés a „Saját szavaim” közé;
- később megbízható török hang.

Ali itt nem chatbotként beszélget. Rövid, vendégváró megjegyzéssel segíti a használatot, de a szótári eredmény egyértelmű és tárgyszerű marad.

---

### 4.7 Saját szavaim

**Feladata:** személyes, visszatérhető gyűjtemény.

**Forrásai:**

- kaland közben megőrzött mondat;
- útiszótárból mentett kifejezés;
- AI-szótár találata;
- később saját jegyzet.

Nem teljesítményoldal és nem ponttábla. Inkább egy személyes, folyamatosan alakuló úticsomag.

---

### 4.8 Líraváltó

**Feladata:** gyors, megbízható utazási segédlet.

**Minimum tartalom:**

- TRY → HUF;
- HUF → TRY;
- árfolyam frissítési ideje;
- gyakori gyorsösszegek;
- figyelmeztetés arra, hogy a banki és készpénzes árfolyam eltérhet;
- az utolsó ismert árfolyam megőrzése kapcsolat nélkül.

**Ali szerepe:** egyetlen rövid mondat, például: „Nézzük meg, mennyi ez forintban.”

---

### 4.9 Fedezd fel

**Feladata:** Törökország kulturális és érzelmi felfedezése. Ez a terület nem enciklopédia; minden tartalomnak Ali világán keresztül kell megszületnie.

Nyitókártyák:

- Török konyha;
- Isztambul helyei;
- Történetek és történelem;
- Kultúra és szokások.

---

### 4.10 Török konyha

**Oldalcím:** **Ali már megterített.**

**Élménycím:** **Van hely az asztalnál.**

**Feladata:** a török konyha bemutatása a vendégül látás élményén keresztül.

**Szervezőelv:** nem ételkategóriákon és recepteken lapozunk végig, hanem négy vendégségpillanatban érkezünk meg egy török asztalhoz.

**Élményív:**

1. Reggel helyet csinálunk az asztalnál.
2. Követjük a friss kenyér illatát.
3. A piacról együtt érkezünk a konyhába.
4. Este minden a közös asztal közepére kerül.

Az élménybe természetesen simul:

- néhány jellegzetes étel és alapanyag;
- 8–12 valóban használható mondat az asztalnál;
- kávé és lelassulás;
- szerkesztett éttermi történetek három ajtón keresztül: régi isztambuli asztalok, Anatólia új nyelve, régiók asztalai;
- továbblépés az „Ali zsebében” részletes nyelvi anyagaihoz.

**Keresztkapcsolat:** minden ételhez tartozhat egy „Mondd az asztalnál” nyelvi blokk, amely az „Ali zsebében” megfelelő kifejezéseire vezet.

**Képi rendszer:** külön `ALI-KIT-*` és `WRLD-KIT-*` tartalmi könyvtár, amely nem módosítja a lezárt tíz állomásos Canon Scene Libraryt.

**Build előtti dokumentumok:**

- `KITCHEN_EXPERIENCE_BLUEPRINT.md`;
- `RESTAURANT_EDITORIAL_MODEL.md`;
- `KITCHEN_CANON_ASSET_LIST.md`.

---

### 4.11 Útinaplóm

**Feladata:** a vendég személyes történetének megőrzése.

Három nézet:

- **Helyek** – mely állomásokon járt;
- **Mondatok** – mit mondott vagy őrzött meg;
- **Emlékek** – személyes választások és Ali rövid jegyzetei.

Az útinapló nem keveredik a teljes tudásmapbe. Amit a vendég még nem fedezett fel, az nem jelenik meg teljesített feladatként.

---

### 4.12 Mırmır Living World layer – nem önálló oldal

**Feladata:** a város folytonosságát, helyemlékezetét és csendes pillanatait erősíti. Mırmır nem menüpont, nem kabala és nem feladat.

Az első kanonikus jelenléti ív:

1. **Cihangir – első találkozás:** a kezdőlapon már működő blokk; Mırmır a lépcsőn pihen, Ali csak annyit jegyez meg: „Őt nem hívtam. Már itt lakott.”
2. **Gülhane – felismerés:** tervezett, integrált cameo az ötödik állomáson; Mırmır a pad távoli végén vagy egy napfolt közelében alszik. Nincs külön CTA vagy feladat.
3. **Rakpart – halk visszhang:** opcionális háttérpillanat a tizedik állomáson; Mırmır átsétál a háttérben, külön magyarázat nélkül.

Az útinapló **Emlékek** nézetében később megjelenhet egy **Ismerős arcok** rész, de nincs számláló, hiányzó hely, jutalom vagy „gyűjtsd össze” üzenet. A szótárban, líraváltóban és más haszonelvű oldalon Mırmır nem jelenik meg.

**Autoritatív specifikáció:** `MIRMIR_LIVING_WORLD_SYSTEM.md`.

---

## 5. Legfontosabb felhasználói utak

### Első látogatás

```text
Kezdőlap → Sétáljunk egyet → 10 állomás → Erős finálé
→ Az első út szavai VAGY Útinaplóm
```

### Célzott tanulás

```text
Ali zsebében → Mit szeretnél elmondani?
→ Élethelyzet kiválasztása → Szavak és példamondatok
→ Mentés a Saját szavaim közé
```

### Szabad keresés

```text
Ali zsebében → AI-szótár → Keresés
→ Jelentés és természetes használat → Mentés
```

### Kulturális felfedezés

```text
Fedezd fel → Török konyha → Étel vagy történet
→ Mondatok az asztalnál → Ali zsebében
```

### Utazás közbeni gyors segítség

```text
Ali zsebében → Úti segítség → Líraváltó
```

---

## 6. Oldalnevek a statikus prototípusban

| Nyilvános oldalnév | Prototípusfájl | Állapot |
|---|---|---|
| Kezdőlap és első utazás | `index.html` | Működik |
| Ali zsebében | `zseb.html` | Működik |
| Az első út szavai | `szavak.html` | Működik |
| Mit szeretnél elmondani? | `helyzetek.html` | Működő prototípus · 10 helyzet, 1574 tartalmi egység |
| Ali AI-szótára | `szotar.html` | Tervezendő |
| Saját szavaim | `sajat-szavaim.html` | Tervezendő |
| Líraváltó | `liravalto.html` | Tervezendő |
| Fedezd fel | `fedezd-fel.html` | Tervezendő |
| Török konyha | `torok-konyha.html` | Működő, reszponzív prototípus · 6/6 P0 kép kanonikus · éttermi és mondatváltó működik |
| Isztambul helyei | `isztambul-helyei.html` | Működő, reszponzív prototípus · 17 hely, 3 hangulati réteg, 7/7 teljes helytörténet |
| Egy délután Kadıköyben | `kadikoy-moda.html` | Működő, reszponzív történet · 4 kanonikus jelenet · 4 cselekvéshez kötött mondat |
| A bazártól a kikötőig | `bazartol-kikotoig.html` | Működő, reszponzív történet · 4 vizuális fejezet · 5 cselekvéshez kötött mondat · 1 emlékezetes választás |
| Régi utcák az Aranyszarvnál | `regi-utcak.html` | Működő, reszponzív történet · Kariye → Balat → Fener · 5 cselekvéshez kötött mondat · 1 figyelemválasztás |
| Előbb a gépek, aztán a kilátás | `gepektol-kilatasig.html` | Működő, reszponzív történet · Hasköy → Eyüp → TF2 → Pierre Loti · 4 kanonikus jelenet · 5 menthető mondat |
| Egy nap a szigeten | `egy-nap-a-szigeten.html` | Működő, reszponzív történet · hajóút → Büyükada → visszaút · 4 kanonikus jelenet · 5 menthető mondat |
| A toronytól a parkig | `toronytol-parkig.html` | Működő, reszponzív történet · Galata → Dolmabahçe → Yıldız · 5 cselekvéshez kötött mondat · 1 térbeli felismerés |
| Útinaplóm | jelenleg modal a `index.html` oldalon | Később önálló oldal |
| Mırmır Living World layer | nincs külön oldal | V1 jelenléti rendszer jóváhagyva · cameo-assetek tervezendők |

A statikus prototípusban a rövid fájlnevek megőrzik a `file://` alapú tesztelhetőséget. Éles környezetben ezek tiszta, mappás útvonalakká alakíthatók.

---

## 7. Bevezetési sorrend

### IA Sprint 1 – Navigációs alap

- globális fejléc és mobilmenü;
- aktív menüállapotok;
- „Ali zsebében” és „Fedezd fel” menücsoportok;
- működő és készülő oldalak egyértelmű kezelése;
- a fő CTA minden oldalon visszavezet az első utazáshoz.

### IA Sprint 2 – A teljes tudásmap

- `helyzetek.html`;
- a teljes anyag elosztása a tíz élethelyzet között;
- keresés és szűrés;
- keresztkapcsolat az első út szavaival.

### IA Sprint 3 – Személyes nyelvi réteg

- AI-szótár UX-prototípus;
- Saját szavaim;
- mentési modell egységesítése.

### IA Sprint 4 – Kulturális világ

- Török konyha Experience Blueprint;
- éttermi szerkesztési modell és frissítési protokoll;
- külön Canon Kitchen Asset List;
- a hat P0 képi brief jóváhagyása;
- első konyhai képcsomag;
- Török konyha aloldal.

### Living World rendszer – keresztmetszeti réteg

- a cihangiri első találkozás megőrzése;
- Gülhane-cameo külön briefje és integrált assetje;
- opcionális rakparti háttérpillanat csak vizuális indokkal;
- az útinapló „Ismerős arcok” emlékrésze gamifikáció nélkül;
- minden kulturális oldal külön Mırmır-döntést kap: jelen van vagy tudatosan hiányzik.

### IA Sprint 5 – Úti segítség

- líraváltó adatforrás és frissítési logika;
- hibakezelés és utolsó ismert árfolyam;
- később török hangintegráció.

---

## 8. Döntési szűrők

Minden új oldal vagy menüpont előtt négy kérdés:

1. **Hiányozna-e az élményből, ha kivennénk?**
2. **Világos-e, hogy a vendég miért nyitná meg?**
3. **Ali vendégváró világának része, vagy csak egy általános funkció?**
4. **A megfelelő rétegben van: élmény, elmélyülés vagy segítség?**

Ha egy funkció hasznos, de nem hordozza Ali világát - például a líraváltó -, maradhat, de vizuálisan és navigációsan másodlagos helyet kap.

---

## 9. Következő konkrét lépés

A globális navigáció, az első út, a tudástérkép, Ali zsebe, a Török konyha és az `Isztambul helyei` háromrétegű várostérképe működik. Öt eltérő helyélmény igazolja a szerkesztési modellt, köztük a Galatától a Yıldız Parkig vezető tájékozódási és ritmusváltó történet. A következő döntési feladat:

> **A hét elkészült Place Story közös összehasonlító QA-ja: ritmus, mentés, mobilhierarchia és térképi visszatérés egységesítése.**

### Place Story System v1.0 · 2026. július 19.

A Sultanahmet és Kadıköy–Moda összehasonlító audit elkészült. A közös rendszer nem azonos sablont, hanem azonos vendégélmény-logikát ír elő. A következő teljes helytörténet előtt kötelező a `PLACE_STORY_SYSTEM_V1.md` és a `PLACE_STORY_QA_CHECKLIST_V1.md` használata. Mırmır alapértéke továbbra is a hiány; a megvalósított Moda-cameo a rendszer első teljes Place Story-ba integrált példája.

### Place Story Collection Architecture v1.0 · 2026. július 19.

A 17 térképpont hét elsődleges történetívbe rendeződik. Hat történetív működik, egy tervezett. Elkészült az **Előbb a gépek, aztán a kilátás**: Hasköy → Eyüp → TF2 → Pierre Loti, négy kanonikus jelenettel és öt használható mondattal. A következő fejlesztési jelölt **Egy nap a szigeten**. A kötelező csoportosítás és terhelési szabályok a `PLACE_STORY_COLLECTION_ARCHITECTURE_V1.md` dokumentumban találhatók.

Mırmır Living World rendszere továbbra sem külön funkció. Ritka, természetes jelenléte a jóváhagyott helytörténeteknél külön döntési kaput kap. Az AI-szótár, a „Saját szavaim” és a líraváltó külön termékág marad.
