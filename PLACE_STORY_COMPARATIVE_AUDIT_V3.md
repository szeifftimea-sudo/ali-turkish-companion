# Place Story Comparative Audit v3.0

**Vizsgált élmények:** 7 Place Story, desktop és 390 px-es mobilnézet  
**Dátum:** 2026. július 19.  
**Nézőpont:** Product Manager · UX szakértő · első alkalommal Isztambulba utazó vendég · Ali Hospitality Manifesto

## Vezetői ítélet

A hét történet együtt már felismerhető termék, nem hét különálló tananyag. A legerősebb közös tulajdonságuk, hogy a török mondat mindig egy valódi helyzetben jelenik meg. A vendég nem szólistát kap, hanem belép, kérdez, tájékozódik, engedélyt kér vagy megáll.

A rendszer azonban még nem teljesen egységes. **Sultanahmet tartalmilag Place Story, szerkezetileg viszont a várostérképbe ágyazott hosszú szekció.** Kadıköy ezzel szemben túl sok mikrodöntést kér, az újabb történetek pedig letisztultabbak, de kisebb teret adnak a vendég valódi választásának.

Ezért a következő iteráció feladata nem újabb tartalom. A hét történet közös élményszerződését kell rögzíteni: **hogyan lépek be, mikor kell olvasnom, mikor döntök, mit viszek magammal, és hogyan indulok tovább.**

## Összehasonlító scorecard

Az 5 pont nem vizuális tetszést, hanem kiadásra kész élményt jelent.

| Place Story | Belépés | Logikai ív | Ali | Nyelvi haszon | Vendég aktivitása | Lezárás | Mobil | Összkép |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| A csendes udvar | 3 | 4 | 5 | 4 | 3 | 4 | 4 | **3,9** |
| Át a vízen, le a partra | 4 | 3 | 4 | 3 | 5 | 4 | 4 | **3,9** |
| A bazártól a kikötőig | 5 | 4 | 4 | 5 | 4 | 5 | 4 | **4,4** |
| Régi utcák az Aranyszarvnál | 5 | 5 | 5 | 5 | 4 | 5 | 4 | **4,7** |
| A gépektől a kilátásig | 5 | 5 | 4 | 5 | 3 | 5 | 4 | **4,4** |
| A toronytól a parkig | 5 | 5 | 5 | 5 | 4 | 5 | 4 | **4,7** |
| Egy nap a szigeten | 5 | 5 | 5 | 5 | 3 | 5 | 4 | **4,6** |

## Amit a vendég valóban átél

| Történet | Belső változás | Megszerzett képesség | Kockázat |
|---|---|---|---|
| A csendes udvar | Nézelődőbő figyelmes vendég | Belépés, engedélykérés, tiszteletteljes jelenlét | A térképoldalba olvad; nem egyértelmű, hogy önálló kaland kezdődött |
| Át a vízen, le a partra | Utasból résztvevő | Kérni, választani, továbbhívni Alit | Sok kattintás és hét nyelvi elem verseng a figyelemért |
| A bazártól a kikötőig | Sodródóból magabiztos vásárló | Köszönni, árat és irányt kérni, mennyiséget mondani | A választókártya-forma más kalandokkal ismétlődhet |
| Régi utcák | Látogatóból tapintatos vendég | Engedélyt kérni, útvonalat tisztázni, továbbindulást kezdeményezni | A legerősebb etalon; a többi történetet ne másoljuk rá mechanikusan |
| A gépektől a kilátásig | Megfigyelőből kíváncsi kérdező | Működésről és útvonalról kérdezni | Kevés saját döntés; inkább erős vezetett olvasmány |
| A toronytól a parkig | Tájékozódóból saját ritmust választó vendég | Irányt kérni és pihenést kezdeményezni | Az útvonal könnyen turisztikai itinernek hathat, ha Ali hangja gyengül |
| Egy nap a szigeten | Siető utasból biztonságban lassító vendég | Járatot ellenőrizni, visszautat kérdezni, tempót váltani | A szép, lineáris ívben kevés a vendég által alakított pillanat |

## Nyelvi audit

### Magmondatok

- Sultanahmet: 4 helyzetmondat.
- Kadıköy: 4 helyzetmondat mellett 3 szó/kifejezés is azonos vizuális súllyal jelenik meg.
- A további öt történet: egyenként 5 magmondat.
- Összesen: **33 magmondat**, plusz **3 kadıköyi szó/kifejezés**.

### Találatok

1. A 33 magmondat nagy része természetes, azonnal használható és jó helyen jelenik meg.
2. A Kadıköy-történetben a `peynir`, `zeytin`, `mevsim meyvesi` nem magmondat. Ezek maradjanak a helyzet részei, de vizuálisan ne versenyezzenek a négy cselekvést hordozó mondattal.
3. A `Tadına bakabilir miyim?` kérdőjele az auditban külön sorba törve jelent meg; a forrásban és a mentett objektumban egységes NFC-karakterláncot kell ellenőrizni.
4. A `Son vapur saat kaçta?` érthető és beszélt nyelvben elfogadható, de kezdőnek a teljesebb **`Son vapur saat kaçta kalkıyor?`** világosabb és önállóbban használható.
5. Az `Ayakkabılarımı burada mı çıkarayım?` magyar jelentése pontosabb így: **„Itt vegyem le a cipőmet?”** A jelenlegi fordítás ezt már jól adja vissza.

## Ali-audit

Ali a hét történetben következetesen vendégváró marad. Nem pontoz, nem vizsgáztat és nem javít ki. A legerősebb megszólalások akkor születnek, amikor valamit nem tud biztosan, időt kínál, vagy átadja a kezdeményezést:

- „Nem tudom minden kerékről, mit csinál. De megkérdezhetjük.”
- „Ha megállsz nézelődni, én is megállok.”
- „Pihenjünk. A város most is megvár.”

Két veszély maradt:

- A hosszabb útvonalaknál Ali néha navigációs narrátorrá válhat.
- Az újabb történetekben a vendég gyakran csak továbbgörget; Ali jelen van, de a kapcsolatot kevésbé alakítja a vendég.

## UX- és technikai audit

### Igazoltan rendben

- Mind a hét élményt desktopon és 390 px szélességen ellenőriztük.
- A vizsgált nézetekben nem volt dokumentumszintű vízszintes túlcsordulás.
- A hat önálló történetben van egyetlen H1; Sultanahmet a térképoldal H1-e alatt H2-ként él.
- A legújabb öt történet nyelvi terhelése egységes: 5 magmondat.
- A mentési forrásokat Ali zsebe külön felismeri mind a hét világból.

### Kiadás előtt bizonyítandó

- Minden mentési gomb utáni visszajelzés, forrásnév és visszalink teljes kattintásos regressziós tesztje.
- Billentyűzetes bejárás és látható fókuszállapot.
- `prefers-reduced-motion` melletti teljes bejárhatóság.
- Valódi mobilkészüléken a nagy képek memória- és betöltési viselkedése.
- A lusta képbetöltés ellenőrzése lassú hálózaton. Az automatikus audit korai mérése itt hamis hibákat adott, ezért ezt nem tekintjük igazolt képhibának.

## Prioritásos backlog

### MUST — a következő iteráció

1. **Egységes Place Story-belépés.** Döntsük el, hogy Sultanahmet önálló oldalt kap-e, vagy a térképbe ágyazottság hivatalos, tudatos kivétel. A jelenlegi hibrid állapot gyengíti a hét történet egyenrangúságát.
2. **A nyelvi hierarchia szabályozása.** Egy történetben 3–5 magmondat kaphat elsődleges súlyt. A szavak, kulturális megjegyzések és emlékek más vizuális szintre kerüljenek.
3. **Kadıköy interakciós ritmusának egyszerűsítése.** Ne vegyük ki a vendég döntéseit, de egy képernyőn mindig csak egy legyen elsődleges. A jelenlegi oldal lényegesen több gombot használ, mint az újabb történetek.
4. **Teljes mentési és visszatérési regresszió.** Mind a hét forrásnál: mentés → helyi visszajelzés → Ali zsebe → helyes magyar jelentés → vissza ugyanahhoz a történethez.
5. **Akadálymentes bejárás.** A vizuálisan jó mobilnézet még nem bizonyítja, hogy billentyűzettel, fókusszal és csökkentett mozgással is végigjárható.

### SHOULD — a következő finomítás

1. **Közös lezárási grammatika.** Minden zárás mondja ki: mit tudsz most megtenni, mi kerül Ali zsebébe, és melyik következő hely illik ehhez az érzelmi állapothoz.
2. **Egy valódi vendégdöntés az újabb lineáris történetekben.** Nem kvíz, hanem tempó-, figyelem- vagy továbbindulási döntés.
3. **A szigeti utolsó mondat pontosítása.** `Son vapur saat kaçta kalkıyor?` kezdőbarátabb teljes mondat.
4. **Sultanahmet H1/H2 hierarchiájának rendezése.** Ha marad beágyazva, a térképről való belépésnek egyértelműen jeleznie kell, hogy most kalandmód kezdődik.
5. **Képarány- és ritmusaudit valódi telefonon.** A technikai túlcsordulás rendben van, de a hosszú kép–szöveg ritmus fárasztósága csak eszközön ítélhető meg.

### COULD — csak a magélmény lezárása után

1. Helytörténetek közötti hangulati ajánlás: „Ha most csendre vágysz…”, „Ha inkább sodródnál…”.
2. A mentett mondatokból személyes, nyomtatható kis isztambuli mondatkártya.
3. Mırmır ritka, helylogikához kötött visszatéréseinek naplója — jutalom, számláló és keresési feladat nélkül.
4. A hét történet után egy „Melyik Isztambul maradt veled?” emlékoldal, pontszám nélkül.

## Történetenkénti döntés

| Történet | Megtartani | Javítani | Nem hozzáadni |
|---|---|---|---|
| A csendes udvar | Csend, tisztelet, négy használható mondat | Belépés és oldalszintű hierarchia | Újabb történelmi ismertető |
| Át a vízen | Valódi vendégdöntések | Interakciós és nyelvi súlypontok | További gomb vagy választó |
| Bazártól a kikötőig | Erős zajból-vízhez ív | Választómodul egyedisége | Alkudozó minijáték ebbe a flow-ba |
| Régi utcák | Hospitality-etalon | Csak apró mobilritmus | További morális magyarázat |
| Gépektől a kilátásig | Kíváncsiság és mozgás kapcsolata | Egy vendég által alakított pillanat | Múzeumi tudásteszt |
| Toronytól a parkig | Térbeli tájékozódás és pihenés | Ali hangjának védelme az itinerrel szemben | Menetrend- vagy útvonaltervező-modul |
| Egy nap a szigeten | A legerősebb lassítási ív | Teljesebb utolsó mondat, egy saját döntés | Mırmır vagy extra látványosság csak dekorációként |

## Ajánlott következő iteráció

**Place Story Flow Unification — tartalomhozzáadás nélkül**

1. Sultanahmet szerkezeti döntése.
2. Kadıköy nyelvi és interakciós súlypontjainak egyszerűsítése.
3. A hét mentési-visszatérési hurok teljes regressziós tesztje.
4. Közös lezárási grammatika alkalmazása.
5. Billentyűzetes, reduced-motion és valódi mobil QA.

### Kiadási kapu

A sprint akkor zárható le, ha egy első alkalommal érkező vendég mind a hét történetnél segítség nélkül meg tudja mondani:

1. hol tart;
2. most olvasnia vagy döntenie kell-e;
3. mit tanult meg megtenni;
4. mit tett el Ali zsebébe;
5. hogyan tud továbbindulni vagy visszatérni.

> **A hét történet akkor alkot rendszert, ha nem ugyanúgy néznek ki, hanem ugyanazt a biztonságot adják: Ali mellett mindig tudom, hol vagyok, mit tehetek, és mit viszek magammal.**
