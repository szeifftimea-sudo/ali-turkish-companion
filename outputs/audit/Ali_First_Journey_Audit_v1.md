# Ali – A török útitárs
## Az első, tízállomásos utazás release-auditja

**Audit dátuma:** 2026. július 18.  
**Vizsgált verzió:** `v75`  
**Nézőpontok:** Product Manager, UX, Conversation Design, Learning Experience, AI-karakterkonzisztencia

## Vezetői összefoglaló

Az első utazás termékkoncepciója most már világos és megkülönböztethető: a felhasználó nem leckesorozatot végez, hanem tíz helyzeten keresztül megszólal Isztambulban. Az új rövidített flow-k tartalmi iránya lényegesen erősebb a korábbi változatnál.

Release-késznek azonban még nem tekinthető. A legnagyobb kockázat nem az új jelenetek szövegében, hanem a körülöttük maradt régi motorban van. A képválasztás, az állomásazonosítás és az útinapló több helyen még a régi scene-arrayeket és régi állapotmezőket használja. Ez azt jelenti, hogy a felhasználó jó új jelenetet élhet át, majd hibás képet, helynevet vagy olyan naplóbejegyzést kaphat, amelyet valójában nem is mondott.

**Összesített állapot: erős, szerethető prototípus; még nem bemutatható hibamentes végponttól végpontig tartó termékként.**

## Gyors értékelés

| Terület | Értékelés | Megjegyzés |
|---|---:|---|
| Termékígéret | 9/10 | Az utazás valóban szervezőelvvé vált. |
| Ali karaktere | 8/10 | Többnyire vendégváró és türelmes, néhány meta-mondat még finomítható. |
| Magyar szöveg | 8/10 | Az új flow-k természetesebbek és jól olvashatók. |
| Felhasználói haszon | 9/10 | Minden állomás végén felismerhető, mit tud már a vendég. |
| Flow és ritmus | 7/10 | Rövid és fókuszált, de az állomások közötti időbeli átmenetek nem mindig világosak. |
| Vizuális konzisztencia a flow-ban | 4/10 | Az 5–10. új állomás azonosítása jelenleg hibás a megjelenítőben. |
| Útinapló és mentett emlékek | 4/10 | Több bejegyzés a régi tudás- és állapotmodellből készül. |
| Funkcionális robusztusság | 6/10 | A fő lánc össze van kötve, de visszalépéskor nem módosítható könnyen a választás. |
| Hang | 2/10 | Tudatosan későbbi integrációra hagyva; jelenleg nem release-funkció. |

# MUST – kiadás előtt javítandó

## M1. Az 5–10. állomás vizuális azonosítása hibás

**Mi történik:** a megjelenítő csak a Karaköy, komp és bazár új `coherent` tömbjeit ismeri fel. A park, villamos, Üsküdar, pékség, mecset és vízpart esetében kizárólag a régi tömbbel hasonlít.

**Következmény:** az új 5–10. flow-k Galata-alapértelmezésre eshetnek vissza. Rossz kép, időpont, képaláírás, bélyegző, fejléc és szekciószín jelenhet meg.

**Döntési kérdés:** az állomás identitása a tömb objektumazonosságából származzon, vagy legyen minden kalandnak stabil azonosítója és metaadata?

**Javaslat:** rövid távon minden `isPark`, `isTram`, `isUskudar`, `isBakery`, `isMosque`, `isWaterfront` feltételbe kerüljön be a megfelelő `coherent` tömb. Tartós megoldásként az állomás metaadatai egyetlen konfigurációs objektumból érkezzenek.

## M2. Az útinapló tartalma nincs szinkronban az új flow-kkal

**Érintett állomások különösen:**

- 5. Gülhane: a napló még fájó testrészekkel számol, miközben ez kikerült az új élményből.
- 7. Üsküdar: továbbra is családról és testvérről ír, miközben az új flow a naplementéről, közös képről és maradásról szól.
- 9. Sultanahmet: a régi `keep` értéket várja, az új flow `look` értéket ment. Emiatt fényképezős mondat kerülhet a naplóba akkor is, ha a vendég kifejezetten nem fényképezett.
- 10. Vízpart: olyan gyümölcsvásárlási mondatot menthet, amely az új lezáró flow-ban már nem szerepel.
- 2. Karaköy: a napló még cukorválasztást és régi jólléti mezőket említhet.

**Következmény:** sérül a bizalom. A termék azt állítja, hogy emlékszik a vendégre, de olyan dolgokra „emlékezik”, amelyek nem történtek meg.

**Javaslat:** a tíz `journalStory` definíciót az új flow-k állapotmezői és ténylegesen kimondott mondatai alapján teljesen újraírni.

## M3. A képernyőn megélt eredmény és a mentett tudás két külön rendszer

**Mi történik:** az állomásvégi kártyák új, helyes mondatokat mutatnak, a `trackPhrase` viszont a régi útinapló mondatlistájából dolgozik.

**Következmény:** a későbbi szótár vagy fejlődésnézet pontatlan adatot kaphat.

**Javaslat:** minden állomásnak legyen egyetlen `outcome.phrases` forrása. Ugyanebből épüljön a zárókártya, az útinapló és a fejlődés mentése.

## M4. Teljes végponttól végpontig teszt szükséges mind a tíz állomásra

**Kötelező tesztesetek:**

1. A főoldalról induló teljes 1→10 út.
2. Mind a tíz kalandkártyáról külön indítás.
3. Minden elágazás legalább egyszer.
4. Vissza gomb minden jelenetben.
5. Mobil és desktop nézet.
6. Útinapló mentése minden állomás után.
7. A 10. állomás lezárása és újrakezdése.
8. Frissítés vagy bezárás közben megmaradó állapot viselkedése.

# SHOULD – a következő minőségi iterációban

## S1. A vissza gomb nem teszi valóban javíthatóvá a választást

A visszalépés csökkenti a jelenet indexét, de a korábbi választás az állapotban marad. Emiatt a felhasználó sok esetben már csak a „tovább” gombot látja, és nem tud másik választ adni.

**Javaslat:** visszalépéskor az adott jelenethez tartozó döntést lehessen újraválasztani, vagy jelenjen meg egy diszkrét „Másképp válaszolnék” művelet.

## S2. Üsküdar és a pékség között hiányzik az éjszaka

A naplemente után a CTA rögtön reggelit keres. Ez időbeli vágás, de nincs elmesélve.

**Javaslat:** egy rövid, nem interaktív átvezetés: „Másnap reggel a szezámillat talál meg benneteket.” Ez világosabbá teszi, hogy nem ugyanazon az estén mentek reggelizni.

## S3. A fejlécben látható haladás csak az adott állomáson belüli lépéseket mutatja

A felhasználó látja, hogy például az ötödik pillanatnál jár, de kevésbé egyértelmű, hogy a tízállomásos utazás egészében hol tart.

**Javaslat:** maradjon a jelenet-progress, de mellette legyen stabil „07 / 10 · Üsküdar” jelzés. Ne legyen kettős, versengő progress bar.

## S4. Az állomások vége kissé sablonossá válik

A „Már tudsz…” szerkezet hasznos, de tízszer egymás után mechanikus mintává válhat.

**Javaslat:** a haszon maradjon főcím, de 3–4 természetes szerkezet váltakozzon:

- „Már tudsz egyszerű reggelit kérni.”
- „Most már elboldogulsz egy ismeretlen járaton.”
- „Ha holnap ide érkeznél, tudnád, mit kérdezz.”
- „Ezt a pillanatot már törökül is meg tudod osztani.”

## S5. Néhány Ali-mondat még termékszövegként beszél

Példa: „Nem az egész menetrendet tanultad meg. Csak azt a három mondatot…” Ez érthető, de Ali egy pillanatra Learning Designer hangján szólal meg.

**Javaslat:** Ali a konkrét helyzetről beszéljen, a tanulási eredményt pedig a felület mondja ki. Ali például: „Látod? Már az ajtónál vagyunk, és egyszer sem kellett találgatnod.”

## S6. A direkt állomásindításnak világos kontextus kell

A felhasználó bármelyik kártyáról indulhat, ami jó döntés. Viszont egy későbbi kaland közvetlen megnyitásakor hiányozhat a szereplők és az előzmény rövid kerete.

**Javaslat:** egyetlen mondatos belépő az első jelenet leadjében, amely önállóan is érthetővé teszi a helyzetet. Ne legyen kötelező előzmény-összefoglaló.

## S7. A hang funkció helyét most kell véglegesen eldönteni

A hang jelenleg nem megbízható és nem egységes. A flow auditjában ezt nem szabad működő képességként számítani.

**Döntés:** vagy minden aktív török mondat konzisztens, jó minőségű török hangot kap, vagy a hangikonok ideiglenesen teljesen eltűnnek. A részleges jelenlét rosszabb, mint a tudatos hiány.

# COULD – későbbi finomítás

## C1. Állomásonként egy visszatérő vizuális mikrogesztus

Például a komp sirálya, a villamos csilingelése vagy a simit papírzacskója finoman reagálhat a döntésre. Csak akkor kerüljön be, ha eltávolítva valóban hiányozna az élményből.

## C2. Ali emlékezzen egy korábbi döntésre a lezárásban

Ne általános személyre szabás legyen. Egyetlen konkrét visszahívás elég: a cukor nélküli tea, a parkban választott lassabb tempó vagy az üsküdari fénykép.

## C3. Az útinaplóban lehessen egy mondatot „hazavinni”

A tíz állomás végén a vendég kiválaszthatná azt az egy török mondatot, amelyet elsőként szeretne valódi utazásán használni. Ez természetes átvezetés lenne a későbbi szótárhoz.

## C4. Külön visszatérési CTA a lezárás után

A teljesítés után a főoldalra visszakerülő felhasználó kapjon két tiszta irányt:

- „Lapozd fel az útinaplódat”
- „Tanulj még ehhez a kalandhoz”

Az első az érzelmi emléket, a második a későbbi mélyebb tudásréteget nyitja meg.

# Állomásonkénti rövid audit

| # | Állomás | Erősség | Fő kockázat |
|---:|---|---|---|
| 1 | Galata | Személyes, alacsony belépési küszöb | A név és nemzetiség után a város mező jogosan hiányzik; ne kerüljön vissza funkció nélkül. |
| 2 | Karaköy | Azonnal használható rendelési siker | Az útinapló még régi cukor/jóllét adatokra támaszkodhat. |
| 3 | Boszporusz | Megfigyelésből születik mondat | Ügyelni kell, hogy ne tárgyiasítsa a megfigyelt embereket; Ali leírása jó biztonságos fókusz. |
| 4 | Nagy Bazár | Tárgyfüggő méretlogika végre hiteles | A kendő árnyalatválasztása és a napló színadata nincs teljesen összehangolva. |
| 5 | Gülhane | Jó lassítás, erős hospitality-pillanat | A mentett napló még egészségügyi tartalmat írhat. |
| 6 | Villamos | Világos utazási minihelyzet | Ali egyik mondata még tanulási metakommentár. |
| 7 | Üsküdar | A naplemente végre önmagáért létezik | A régi család/testvér naplólogika súlyosan eltér az új élménytől. |
| 8 | Simit pékség | Konkrét, teljes rendelési siker | Az időbeli átvezetés hiányzik az előző estéből. |
| 9 | Kék mecset | Tiszteletteljes, nem kioktató | A `look`/`keep` állapoteltérés hibás naplóbejegyzést okoz. |
| 10 | Vízpart | Érzelmileg helyes, visszatérést ígér | A régi gyümölcsvásárlás még bekerülhet a mentett tudásba. |

# Javasolt következő iteráció

## Iteráció neve: Journey Integrity Pass

**Egyetlen cél:** amit a vendég lát, választ, kimond és eltesz, az minden rétegben ugyanaz legyen.

### Sorrend

1. Állomásazonosítás és képi metaadatok javítása.
2. A tíz útinapló-bejegyzés újraírása az új flow-k alapján.
3. Egyetlen mondatforrás kialakítása a zárókártyához, naplóhoz és fejlődésmentéshez.
4. Visszalépés és választásmódosítás rendezése.
5. Üsküdar → másnap reggel átvezetés.
6. Teljes manuális 1→10 teszt desktopon és mobilon.
7. Csak ezután vizuális és animációs finomítás.

## Release-kritérium

Az első utazás akkor tekinthető késznek, ha egyetlen végigjátszás során:

- minden állomás a saját képét, bélyegzőjét és hangulatát mutatja;
- egyetlen mentett mondat sem származik kihagyott vagy régi jelenetből;
- a vendég mindig érti, mit olvasson, mit válasszon és mi történik utána;
- Ali minden megszólalása vendégváró karakterből fakad;
- a végén a felhasználó nem azt érzi, hogy tíz leckét teljesített, hanem hogy már van saját emléke Isztambulból.
