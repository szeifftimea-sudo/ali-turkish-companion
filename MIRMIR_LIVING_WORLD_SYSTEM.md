# Mırmır Living World System v1.0

**Termékréteg:** Ali – A török útitárs  
**Dátum:** 2026. július 19.  
**Állapot:** JÓVÁHAGYOTT TERMÉK- ÉS UX-RENDSZER · RÉSZBEN BEVEZETVE

## 1. Egy mondatban

> **Mırmır bizonyítja, hogy Ali világa akkor is tovább él, amikor éppen senki nem beszél.**

Mırmır nem funkciót ad a termékhez. Ismerősséget, csendet és helyemlékezetet ad a világhoz.

## 2. Miért van szükség külön rendszerre?

A Character Manifesto meghatározza, ki Mırmır. A Relationship Model és a Behavior Rules meghatározza, hogyan viselkedik. A Living World System azt rögzíti, hogyan lehet ezt a karaktert hosszú távon beépíteni az oldalakba, kalandokba és az útinaplóba anélkül, hogy kabala, jutalom vagy dekoratív matrica válna belőle.

Ez a dokumentum három termékkockázatot előz meg:

1. **Elfelejtés:** Mırmır eltűnik a projektből, mert nincs funkcionális gazdája.
2. **Túlhasználat:** minden új képre rákerül, és elveszíti természetességét.
3. **Gamifikáció:** találkozásai számlálóvá, jutalommá vagy gyűjthető tárggyá válnak.

## 3. Mırmır négy termékszerepe

### 3.1 Világfolytonosság

Egy visszatérő, de nem állandó városlakó összeköti a különböző helyeket és napszakokat. A vendég érzi, hogy Isztambul nem jelenetekből áll, hanem ugyanannak a világnak a folytatása.

### 3.2 Helyemlékezet

Mırmır bizonyos helyeket a saját ritmusa szerint újra választ. A vendég először a macskát látja, később már a helyre is emlékszik miatta.

### 3.3 Csendjelző

Mırmır felbukkanása gyakran azt jelzi, hogy a terméknek nem kell újabb magyarázatot adnia. Egy alvó vagy figyelő macska mellett a felület megengedheti a szünetet.

### 3.4 A vendég megérkezésének tükre

Az első alkalommal a vendég csak egy utcai macskát vesz észre. Később ráismer Mırmırra. Ez nem Mırmır „megszelídítését”, hanem a vendég növekvő figyelmét mutatja.

## 4. Amit Mırmır soha nem csinál a termékben

- nem indít vagy zár le flow-t;
- nem aktivál gombot, oldalt, leckét vagy jutalmat;
- nem ad navigációs tippet;
- nem jelzi a helyes választ;
- nem jelenik meg hibaképernyőn vagy betöltésjelzőként;
- nem lesz onboarding-asszisztens;
- nem kap beszédbuborékot, belső monológot vagy emberi reakciófeliratot;
- nem kér kattintást, simogatást vagy etetést;
- nem kap számlálót, ritkaságot, jelvényt, szintet vagy „teljesítve” állapotot;
- nem kerül fizetős vagy exkluzív hozzáférés mögé;
- nem válik Ali tulajdonává vagy „Ali macskájává”.

## 5. Jelenléti ritmus

### Alapérték: nincs jelen

Minden új oldalnál és jelenetnél az alapértelmezett döntés az, hogy Mırmır nincs a képen. Megjelenése külön, macskalogikával indokolt döntés.

### Megengedett sűrűség

- **Kezdőlap:** egy hangsúlyos, önálló találkozás.
- **Tízállomásos kaland:** legfeljebb két halk vizuális cameo; nem egymást követő állomásokon.
- **Hosszú kulturális aloldal:** nulla vagy egy cameo.
- **Rövid kulturális cikk:** általában nincs cameo.
- **Szótár, tudásmap, líraváltó és más segédeszköz:** nincs Mırmır.
- **Útinapló:** csak a ténylegesen látott találkozás emléke; üres vagy lezárt hely nem jelenik meg.

A sűrűség felső határ, nem teljesítendő kvóta.

### Ritmusszabályok

- két cameo között legyen legalább két Mırmır nélküli történeti egység;
- nem jelenhet meg ugyanabban a pillanatban, amikor a vendég fontos döntést hoz;
- nem versenyezhet Ali arcával, a fő CTA-val vagy az első megtanult mondattal;
- a hiánya nem magyarázandó;
- felbukkanása az első verzióban determinisztikus, nem jutalomszerű véletlen „spawn”.

## 6. Megjelenési módok

### 6.1 Környezeti cameo – elsődleges mód

Mırmır a jelenet része, de nem a kompozíció központja: egy pad távolabbi végén, küszöbön, alacsony falon vagy szék alatt pihen.

**Figyelmi súly:** Ali és a történeti cselekvés alatt.  
**Interakció:** nincs.  
**Felirat:** általában nincs.

### 6.2 Áthaladás

Mırmır az elő- vagy háttérben átsétál, majd eltűnik a képből. Mozgása nem mutat irányt a vendégnek.

**Figyelmi súly:** rövid, másodlagos.  
**Interakció:** nincs.  
**Használat:** csak akkor, ha a mozgás nem zavarja az olvasást és tiszteletben tartja a `prefers-reduced-motion` beállítást.

### 6.3 Csendes felismerés

Ali egyszer, röviden észreveheti: „Nézd, Mırmır megint itt van.” Ez nem kötelező szöveg, és nem jár válaszlehetőséggel.

**Figyelmi súly:** emberi ismerősség, nem narráció.  
**Interakció:** a vendég figyelhet vagy továbbmehet.

### 6.4 Emlék az útinaplóban

A találkozás később, halk jegyzetként jelenhet meg az útinaplóban. Nem azonnali toast, jutalom vagy külön bejelentés.

Példa:

> **Cihangir · 16:42**  
> Mırmır ma is ugyanazt a lépcsőt választotta.  
> *Ali jegyzete: Őt nem hívtam. Már itt lakott.*

## 7. Az első élmény jóváhagyott Mırmır-íve

### 7.1 Első találkozás · Cihangir

**Hely:** a kezdőlap jelenlegi Cihangir-blokkja.  
**Állapot:** megvalósítva.  
**Viselkedés:** Mırmır egy meleg kőlépcsőn pihen muskátlik között. Nem néz a kamerába és nem kér figyelmet.  
**Szerep:** bemutatja, hogy Isztambul macskái lakók, nem attrakciók.  
**Megőrzendő szöveg:** „Őt nem hívtam. Már itt lakott.”

Ez a blokk nem kap kattintást, számlálót vagy „Mırmır megismerése” CTA-t.

### 7.2 Felismerés · Gülhane Park

**Hely:** az első utazás 05. állomása.  
**Tervezett asset:** `MIRMIR-CAMEO-001-gulhane-bench`.  
**Viselkedés:** Mırmır a pad távolabbi végén vagy egy közeli napfoltban alszik. Ali és a vendég nem nyúl hozzá.  
**Szerep:** a közös csend vizuális megerősítése.  
**Szöveg:** nem szükséges; ha van, legfeljebb „Mırmır is talált magának egy napfoltot.”

A meglévő `ALI-SCN-005` mesterkép nem módosul. A cameo külön jóváhagyott, fényben és térben integrált származék lehet; nem CSS-matrica vagy utólag ráhelyezett kivágás.

### 7.3 Halk visszhang · Waterfront Promenade

**Hely:** az első utazás 10. állomása.  
**Tervezett asset:** `MIRMIR-CAMEO-002-waterfront-crossing`.  
**Viselkedés:** Mırmır a háttérben, saját útvonalán átsétál a rakpart egy szélvédett szakaszán, majd eltűnik.  
**Szerep:** megmutatja, hogy az utazás lezárul, a város élete nem.  
**Szöveg és CTA:** nincs.

Ez a második cameo elhagyható, ha vizuálisan túl sok lenne. A Gülhane-felismerés fontosabb.

### 7.4 Csendes együttlét · Moda-part

**Hely:** a Kadıköy–Moda teljes helytörténet záróképe.  
**Állapot:** megvalósítva.  
**Asset:** `assets/canon/kadikoy-moda/KDM-SCN-004-moda-waterfront.png`.  
**Viselkedés:** Mırmır a kép távoli jobb szélén, egy napos falszakaszon pihen. Nem néz a kamerába, nem ül Ali mellett és nincs róla szöveg.  
**Szerep:** bizonyítja, hogy a parti világ Ali és a vendég csendjén kívül is tovább él.  
**Mobil:** a keskeny képkivágásból szándékosan eltűnhet.  
**Útinapló-emlék:** ebben a verzióban nincs.

Ez az első megvalósított, teljes Place Story-ba integrált cameo. Nem váltja ki és nem teszi kötelezővé a későbbi Gülhane-jelenetet.

## 8. Konyhai és kulturális oldalak

### Török konyha Alival

Mırmır szándékosan nincs jelen:

- a hero reggelinél;
- a piaci választásnál;
- a közös főzésnél;
- az üres vendégszék fő gesztusánál.

Ezekben a pillanatokban az emberi vendégség a történet központja. Mırmır jelenléte elvinné a figyelmet.

**Egyetlen megengedett P1 cameo:** a kávés lezárás után, egy külön környezeti képen Mırmır egy meleg ajtónyílás közelében alszik. Nem kér ételt, nincs az asztalon és nem kapcsolódik CTA-hoz.

**Tervezett asset:** `MIRMIR-KIT-001-warm-doorstep`.  
**Státusz:** csak brief; a Török konyha P0 könyvtárát nem blokkolja.

### Más kulturális oldalak

- **Isztambul helyei:** egy hosszú útvonalon legfeljebb egy cameo.
- **Kultúra és szokások:** csak kortárs, természetes környezetben.
- **Történelem:** történelmi rekonstrukcióba nem helyezzük át időtlen karakterként.
- **Török konyha:** csak a fenti P1 lezáró cameo.
- **Segédeszközök:** nincs cameo.

## 9. Útinapló · Ismerős arcok

Az útinapló **Emlékek** részében megjelenhet egy „Ismerős arcok” alcím. Ez nem külön gyűjtemény és nem kap számlálót.

### Megjelenési szabályok

- csak megtörtént találkozás jelenik meg;
- nincs üres sziluett, lakat vagy „még 2 macska vár” üzenet;
- nincs külön mentés gomb;
- nincs azonnali toast;
- nincs sorrend vagy ritkaság;
- ugyanaz a találkozás csak egyszer kerül be;
- a vendég törölheti az útinapló teljes helyi adatát, de Mırmır „kapcsolati szintje” nem létezik.

### Bejegyzés szerkezete

```text
encounterId
catId
placeId
placeLabel
timeLabel
behavior
assetId
aliNote
altText
seenAt
```

Szándékosan nincs:

```text
score
rarity
level
affinity
reward
completed
```

### Helyi prototípus-adat

Javasolt kulcs: `ali_mirmir_encounters_v1`.

A találkozás akkor jegyezhető fel, amikor a cameo-jelenet ténylegesen megjelent a vendégnek. Az első prototípusban ez állomáseléréshez kötött, determinisztikus esemény. Nem kattintáshoz és nem helyes válaszhoz kapcsolódik.

## 10. Vizuális implementációs szabályok

- Mırmır csak a kanonikus karakterreferenciából renderelhető.
- A cameo fényét, érintkezési árnyékát, mélységélességét és zajszintjét a jelenettel együtt kell létrehozni.
- Nem használható lebegő PNG vagy DOM-réteg, ha az utólag beragasztott matricának hat.
- Mobilvágásban a karakter eltűnhet; nem kell minden viewporton erőltetetten látszania.
- Ha látható, legalább három Visual Canon-azonosítónak olvashatónak kell maradnia.
- Nem lehet élesebb, részletesebb vagy kontrasztosabb, mint Ali.
- Nem kerülhet közvetlenül gomb, cím, bélyeg vagy fontos tanulási mondat mellé.
- A cameo külön asset ID-t és review-státuszt kap.

## 11. Interakció, mozgás és hozzáférhetőség

- Mırmır alapértelmezetten nem interaktív.
- Nem kap `cursor: pointer` állapotot és kattintható területet.
- Dekoratív háttérszerepben `alt=""` használható.
- Ha a találkozás történetileg jelentős, rövid, megfigyelhető alt szöveget kap, emberi érzelemkivetítés nélkül.
- Mozgó cameo legfeljebb egyszer halad át, nem loopol.
- `prefers-reduced-motion: reduce` esetén statikus képkockává válik.
- Képernyőolvasón nincs váratlan live-region bejelentés.
- A jelenet Mırmır nélkül is teljesen érthető és végigjárható.

## 12. Új oldal Mırmır Review mezője

Minden új élmény- vagy kulturális oldal briefjében kötelező egy Mırmır-döntés. Az alapérték: **nem jelenik meg**.

```text
Mırmır decision: NO / YES
Physical cat logic:
Narrative purpose:
Behavior:
Attention risk:
Visual integration method:
Journal memory: NO / YES
```

### Jóváhagyási kérdések

1. Akkor is ott lenne, ha Ali és a vendég nem lenne jelen?
2. Van meleg, árnyék, ételillat, menedék vagy megszokott útvonal, ami indokolja?
3. Elveszi a figyelmet a pillanat emberi vagy tanulási lényegéről?
4. A jelenet nélküle is működik?
5. A megjelenése jutalomnak vagy navigációs jelnek tűnhet?
6. Technikailag valóban a térben él, vagy matricának hat?

Ha az 1–2. kérdésre nem, vagy az 5–6. kérdésre igen a válasz, Mırmır nem kerül a jelenetbe.

## 13. Sikerdefiníció

A rendszer akkor működik, ha egy első felhasználói teszten:

- a vendég a második megjelenésnél segítség nélkül ráismer Mırmırra;
- városlakóként írja le, nem Ali háziállataként vagy kabalaként;
- nem kezd jutalmat, pontot vagy feladatot keresni körülötte;
- örül a felbukkanásának, de nem érzi hibának a hiányát;
- az Alihoz fűződő érzelmi kapcsolat nem gyengül;
- a találkozás után legalább egy helyre vagy csendes pillanatra is emlékszik.

Nem használunk elsődleges siker-KPI-ként Mırmır-kattintást, megtekintési időt vagy „begyűjtési arányt”, mert ezek rossz viselkedést ösztönöznének.

## 14. Első implementációs backlog

### Must

1. A jelenlegi Cihangir-blokk megőrzése változatlan, nem interaktív első találkozásként.
2. A megvalósított Moda-cameo megőrzése nem interaktív, felirat nélküli környezeti jelenlétként.
3. Minden új Place Story briefjében Mırmır Review mező.
4. A cameo mobilon elhagyható maradjon; ne készüljön erőltetett külön mobilkompozíció.

### Should

1. `MIRMIR-CAMEO-001-gulhane-bench` képi brief és integrált jelenetderivátum.
2. Az útinapló `Ismerős arcok` nem számlált emléktípusa.
3. A Mırmır-találkozás külön, idempotens helyi adatmodellje.
4. Gülhane-találkozás halk útinaplóbejegyzése, toast nélkül.
5. Mobil crop- és accessibility-QA.
6. `MIRMIR-KIT-001-warm-doorstep` brief a konyhai oldal P1 rétegéhez.

### Could

1. `MIRMIR-CAMEO-002-waterfront-crossing` a tízállomásos út lezárásához.
2. Későbbi isztambuli útvonalakon új, helyhez kötött visszatérések.
3. További városi macskák külön Character Manifestóval és Visual Canonnal.

## 15. Definition of Done

A Living World System akkor tekinthető bevezetettnek, ha:

- [x] a Cihangir-találkozás a rendszer első kanonikus pontjaként dokumentált;
- [x] a Moda-parti cameo felirat és interakció nélkül beépült egy teljes Place Story-ba;
- [ ] a Gülhane-cameo saját briefet és jóváhagyott integrált assetet kapott;
- [ ] az útinaplóban nincs számláló, lezárt hely vagy jutalom;
- [ ] a találkozás nem függ nyelvi teljesítménytől;
- [ ] mobilon, billentyűzettel és képernyőolvasóval nem hoz létre akadályt;
- [x] Mırmır hiánya mellett minden flow változatlanul teljes;
- [ ] a felhasználói tesztben Mırmır lakóként, nem kabalaként olvasható;
- [ ] a konyhai és további kulturális briefek külön Mırmır-döntést tartalmaznak.

## 16. North Star

> **Mırmırt nem azért őrizzük meg, hogy mindig lássuk. Azért őrizzük meg, hogy amikor újra feltűnik, Isztambul egy kicsit ismerősebb legyen.**
