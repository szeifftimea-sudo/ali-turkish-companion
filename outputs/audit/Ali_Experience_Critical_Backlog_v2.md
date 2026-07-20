# Ali – A török útitárs
## Kritikus élményaudit és priorizált backlog

**Vizsgált verzió:** v80  
**Nézőpont:** Product Manager, UX szakértő, első alkalommal Isztambulba utazó felhasználó  
**Audit elve:** nem azt keresi, mi működik, hanem hol bizonytalan, törékeny vagy érzelmileg üres az élmény.

## Rövid diagnózis

A termék legerősebb ígérete az, hogy Ali vendégül lát Isztambulban, és a török nyelv útközben ragad a felhasználóra. A jelenlegi élmény ezt az ígéretet az első néhány percben felépíti, de három ponton rendszeresen elveszíti:

1. **A hosszú út nem folytatható biztonságosan.** A rendszer ugyan munkamenet közben ír állapotot, de minden új megnyitáskor újrakezdi a kalandot.
2. **A felület gyakran nagyobb tudást állít, mint amit a felhasználó bizonyított.** Többnyire választott egy kész mondatot, mégis azt olvassa: „már tudod”.
3. **Ali jelenléte funkcionálissá válik.** Gyakran jó mondatokat mond, de ritkán emlékszik vissza, reagál vizuálisan vagy teremt valódi folytonosságot két állomás között.

Az élmény jelenleg erős demó, de még nem megbízható első termékélmény.

# MUST

## M1. Valódi folytatás és megszakításbiztos állapot

**Probléma:** az út közel ötven képernyőből áll. A jelenlegi motor minden megnyitáskor alapállapotból indul, miközben a folyamat közben mentett session-adatot nem tölti vissza.

**Felhasználói élmény:** bezárom, mert csörög a telefonom vagy elfáradtam; visszatérve Galatán találom magam. A termék azt mondta, Ali emlékszik rám, de még arra sem emlékszik, hol hagytuk abba.

**Backlog:**

- „Folytassuk onnan, ahol megálltunk” belépési lehetőség.
- Az aktuális állomás és jelenet mentése, nem csak a válaszoké.
- Bezáráskor rövid jelzés: „Ali megjegyzi, hol álltatok meg.”
- Külön „Újrakezdem” művelet; ne ez legyen az alapértelmezett.

**Miért Must:** a Hospitality Manifesto szerint Ali figyel és nem siettet. Az emlékezet elvesztése közvetlen karaktertörés.

## M2. A teljes út hossza és helye legyen előre érthető

**Probléma:** a jelenet-progress csak az adott állomás 4–5 pillanatát mutatja. A felhasználó nem látja megbízhatóan, hogy a teljes tízes utazásban hol jár, és mennyi van hátra.

**Backlog:**

- Stabil „Kaland 06 / 10” jelzés minden képernyőn.
- Az adott állomáson belüli haladás maradhat másodlagos.
- Indulás előtt őszinte időbecslés: például „10 rövid kaland · bármikor megállhatsz”.
- Állomás végén választás: tovább Alival vagy most eltenni az emléket.

**Miért Must:** ismeretlen hosszúságú, modális flow-ban a felhasználó könnyen csapdában érzi magát.

## M3. A tanulási ígéretet össze kell hangolni a tényleges felhasználói teljesítménnyel

**Probléma:** a legtöbb helyzetben a felhasználó kész török válaszok közül választ. Ez felismerés, nem önálló felidézés vagy beszéd. Ennek ellenére az állomás gyakran azt mondja: „Már tudsz…”.

**Backlog – döntési pont:**

- Ha az első út kizárólag élmény: a záróállítás legyen szerényebb, például „Már van egy mondatod erre a helyzetre.”
- Ha valódi készséget akarunk állítani: kerüljön be egyetlen könnyű felidézési pillanat, ahol a magyar jelentés alapján a felhasználó kiválasztja vagy összerakja a török mondatot.

**Miért Must:** a túlzó sikerüzenet rövid távon jólesik, hosszú távon rombolja a tanulási bizalmat.

## M4. A török tartalom kapjon anyanyelvi szakmai ellenőrzést

**Probléma:** a termék nyelvtudást és kulturális biztonságot ígér. A mondatok egy része nyelvtanilag lehetséges lehet, de a valódi helyzetben természetesség, udvariassági szint és regionális használat is számít.

**Backlog:**

- Török anyanyelvű lektor minden aktív mondatra.
- Külön ellenőrzés: bazári alku, mecsetlátogatás, közlekedési kérdések, nemzetiségek.
- A lektor által jóváhagyott mondat legyen kanonikus az UI-ban, útinaplóban, szótárban és későbbi hanganyagban.

**Miért Must:** egy hibás turisztikai mondat nem egyszerű tartalmi hiba; a felhasználó valós helyzetben használhatja.

## M5. A nemzetiségválasztó legyen teljes vagy őszintén részleges

**Probléma:** a mező „A nemzetiséged” feliratot használ, de jelenleg 57 lehetőséget tartalmaz. Aki nincs a listában, nem tud igazat válaszolni, és már nincs „Más” lehetősége sem. A hosszú natív legördülő mobilon nehezen kereshető.

**Backlog:**

- Kereshető ország-/nemzetiségválasztó.
- Teljes, ellenőrzött lista vagy szabadon megadható ország biztonságos török mintával.
- A címke egyértelműsítése: „Melyik országból érkeztél?” vagy „Mi a nemzetiséged?” — a kettőt ne keverjük.
- A török mondat mindig az adott kérdésre válaszoljon.

**Miért Must:** az első személyes adatbekérésnél létrejövő kizárás azonnal megszakítja a vendégélményt.

## M6. A hangot vagy minden aktív mondathoz megbízhatóan biztosítani kell, vagy teljesen ki kell venni az ígéretből

**Probléma:** a hangvezérlés látható a főoldalon, miközben a kalandban a hanggombok el vannak rejtve, és a rendszer helyi török beszédhangtól függhet.

**Felhasználói élmény:** nem értem, mit kapcsolok be. A „Hangulat” és a török kiejtés összemosódik.

**Backlog:**

- Külön „Isztambul hangjai” és „Kiejtés meghallgatása” fogalom.
- Kanonikus török hangfájlok, eszközfüggetlen lejátszás.
- Addig a kiejtési funkció ne jelenjen meg félkészen.

**Miért Must:** kezdő felhasználónál a hang nem extra, hanem a helyes nyelvi minta alapja.

## M7. A visszalépés tegye javíthatóvá a választást

**Probléma:** visszalépéskor a korábbi állapot megmarad, ezért sok jelenet már csak a tovább gombot mutatja. A felhasználó látja a döntését, de nem tudja megváltoztatni.

**Backlog:**

- „Másképp válaszolnék” művelet a kiválasztott állapotban.
- Vagy a vissza gomb törölje kizárólag az előző jelenet döntését, előzetesen definiált állapotkulcs alapján.
- A későbbi személyre szabott mondatok frissüljenek az új választással.

**Miért Must:** a jelenlegi vissza gomb hamis kontrollt ad.

# SHOULD

## S1. A két nap időbeli dramaturgiája legyen kimondva

Üsküdarban naplemente van, a következő kaland pedig pékségi reggel. A felhasználó nem kap világos jelzést, hogy közben eltelt az éjszaka.

**Backlog:** egy rövid átvezető lap vagy filmszerű mondat: „Másnap reggel a szezámillat talál meg benneteket.” A tíz kaland kapjon „Első nap / Második nap” ritmust.

## S2. Ali reagáljon vissza legalább három korábbi döntésre

Ali jelenleg többnyire az adott képernyőre reagál. A kapcsolat akkor válna valódivá, ha később természetesen visszautalna valamire:

- „Tudom, tegnap a vízparti lépcsőt választottad.”
- „Most is cukor nélkül kéred?” — csak ha ez valóban része volt az aktív flow-nak.
- „A parkban sem siettünk. Most sem kell.”

**Indok:** az emlékezés nem adatfunkció, hanem Ali szerethetőségének bizonyítéka.

## S3. A kalandok közötti átmenetek legyenek történeti jelenetek, ne navigációs CTA-k

Több állomásváltás jelenleg egyszerű „Menjünk…” gomb. Ez működik, de epizodikus menüélményt ad.

**Backlog:** minden váltásnál egy konkrét érzéki híd: csilingelés, pohárcsörrenés, komp kürtje, szezámillat, esti fény. Egy mondat elég.

## S4. A zárás ne dobja vissza egyszerűen a kártyasávhoz

Az út végén az érzelmi csúcspont után a modal bezárul és a felhasználó visszakerül a főoldal egy funkcionális részére.

**Backlog:** külön befejező állapot Ali képével és két tiszta iránnyal:

- „Lapozd fel az útinaplódat”
- „Tanulj tovább abból, amit ma átéltél”

## S5. A közvetlen állomásindítás kapjon önálló kontextust

A tíz kártya szabadon kattintható, ami jó. Egy későbbi állomás azonban úgy indulhat, mintha a felhasználó már az előző jelenetből érkezett volna.

**Backlog:** minden állomás első képernyője önállóan is értelmezhető legyen, és Ali egy mondatban fogadja a vendéget azon a helyen.

## S6. Egy képernyőn egyetlen világos olvasási sorrend legyen

A jelenetekben egyszerre versenyezhet az eyebrow, H1, lead, Ali-buborék, mondatkártya, fordítás és CTA.

**Backlog:** következetes hierarchia:

1. mi történik;
2. mit mond Ali;
3. mit tehetek vagy mondhatok én;
4. mi történik a választás után.

Az eyebrow maradjon hely- és időjelzés, ne újabb magyarázat.

## S7. Ali vizuális érzelmei kövessék a jelenetet

A Canon Expression Packet célja nem látszik a flow-ban. Ugyanaz az állomáskép marad akkor is, amikor Ali kérdez, meglepődik, vár vagy csendben marad.

**Backlog:** állomásonként legfeljebb 2–3 kanonikus képkivágás vagy arckifejezés. Nem minden kattintásra animáció, hanem érzelmileg fontos fordulópontokra.

## S8. A személyes adatok és emlékek működését érthetően jelezni kell

A név, preferenciák, útinapló és kedvenc mondatok helyben mentődnek, de ezt a vendég nem feltétlenül érti.

**Backlog:** rövid, emberi magyarázat az első mentésnél: „Ezen az eszközön őrzöm meg, hogy legközelebb is emlékezzek rád.” Legyen könnyen elérhető törlés.

## S9. A főoldali kártyacímek legyenek szinkronban az új történetekkel

Legalább egy hozzáférhetőségi címke még régi koncepciót jelez: az üsküdari kártya „Otthon és messze”, miközben az új flow a közös naplementéről szól.

**Backlog:** cím, aria-label, naplócím, bélyegző és kalandfejléc egyetlen metaadatforrásból készüljön.

# COULD

## C1. Mırmır egyszer jelenjen meg az első utazásban

Ne jutalomként és ne keresendő tárgyként. Egyetlen természetes találkozás elég lenne, amely később visszaköszön az útinaplóban.

## C2. A vendég választhasson egy „hazavitt mondatot”

A lezáráskor egyetlen kedvenc mondat kiválasztása természetes hidat képezne a szótár és a további tanulás felé.

## C3. A városi hangulat reagáljon az állomásra

Finom, opcionális hangréteg: komp, villamos, pohárcsörrenés, vízpart. Nem folyamatos zene, és soha ne fedje el a kiejtést.

## C4. Későbbi visszatéréskor Ali ne ugyanazzal a nyitással fogadjon

Az első alkalom „Merhaba”, a visszatérés lehet „Hoş geldin, újra itt vagy.” Ez valódi kapcsolatérzetet adna.

## C5. A tíz kaland után nyíljon meg a mélyebb tudásréteg

Az első út maradjon könnyű. Utána állomásonként elérhető:

- további szavak és kifejezések;
- kulturális háttér;
- török konyha és történelem;
- szótár;
- gyakorlás.

Ne a flow-ba kerüljenek vissza, hanem az átélt emlékből legyenek elérhetők.

# Ajánlott végrehajtási sorrend

1. Folytatás és megszakításbiztos állapot.
2. Teljes út + állomáson belüli progress egyértelműsítése.
3. Tanulási sikerüzenetek kalibrálása.
4. Visszalépés és válaszmódosítás.
5. Török anyanyelvi lektorálás.
6. Kereshető, teljes nemzetiség-/országválasztó.
7. Hangstratégia véglegesítése.
8. Két nap dramaturgiája és állomásátmenetek.
9. Ali emlékező és vizuálisan reagáló rétege.
10. Befejezés és továbbtanulási kapu.

# Release-kérdés

Az első utazás csak akkor kész, ha a következő kérdésre egyértelmű igen a válasz:

> Ha a felhasználó félúton bezárja, másnap visszatér, máshonnan indul, meggondolja magát, nem találja a nemzetiségét vagy nem tud hangot lejátszani, Ali akkor is jó vendégváró marad?

Jelenleg a válasz: **nem minden esetben**.
