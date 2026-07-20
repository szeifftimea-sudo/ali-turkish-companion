# Ali – Éttermi szerkesztési modell v1.0

**Kapcsolódó élmény:** Török konyha Alival  
**Dátum:** 2026. július 19.  
**Állapot:** V1 VÁLOGATÁS JÓVÁHAGYVA · PROTOTÍPUSBA RENDEZHETŐ

## 1. Mire való ez a réteg?

A híres éttermek nem külön toplistaként kerülnek a termékbe. Olyan valódi helyek lesznek, amelyeken keresztül Ali megmutathat egy történetet: hogyan él tovább egy régi isztambuli recept, hogyan kap mai nyelvet az anatóliai konyha, vagy hogyan változik az asztal, amikor másik régióba érkezünk.

> **Nem azt mondjuk meg, hol kell enni. Segítünk megérteni, miért érdekes egy asztal.**

Az éttermi réteg csak akkor jó, ha nélküle szegényebb lenne a török konyháról alkotott kép. A puszta név, díj vagy presztízs nem elég.

## 2. Mit nem építünk?

- „Törökország 10 legjobb étterme” rangsort;
- fizetett helyezéseket vagy el nem különített reklámot;
- csillagokra és luxusra épülő presztízskatalógust;
- gyorsan elavuló ár-, nyitvatartás- és foglalási adatbázist;
- ellenőrizetlen „autentikus”, „legjobb” vagy „kihagyhatatlan” állításokat;
- AI-val generált képet, amely valódi étterem enteriőrjének vagy fogásának adja ki magát;
- olyan ajánlót, amely csak Isztambult és csak fine dining helyeket mutat.

## 3. A három szerkesztési ajtó

### 3.1 Régi isztambuli asztalok

Helyek, ahol egy városi hagyomány, épület, piac vagy lokanta-kultúra tovább él. A hangsúly nem a nosztalgián, hanem a folytonosságon van.

**Szerkesztési kérdés:** Mit őriz ez a hely Isztambul emlékezetéből?

### 3.2 Anatólia új nyelve

Kortárs éttermek, amelyek helyi alapanyagokat, technikákat vagy regionális recepteket értelmeznek újra.

**Szerkesztési kérdés:** Mit tudunk meg itt a régi és a mai Törökország kapcsolatáról?

### 3.3 Régiók asztalai

Égei-tengeri, kappadókiai, délkelet-anatóliai és más regionális történetek. Nem azt állítjuk, hogy egyetlen étterem „képviseli” az egész régiót; egy konkrét nézőpontot mutatunk.

**Szerkesztési kérdés:** Miben más ennek a tájnak az íze, ritmusa és vendégszeretete?

## 4. Kiválasztási kritériumok

Egy hely akkor kerülhet be, ha a következő nyolc szempontból legalább hatnak megfelel, és nincs kizáró problémája.

| Szempont | Mit vizsgálunk? |
|---|---|
| Kulturális jelentőség | Kapcsolódik-e egy valós városi, történelmi vagy regionális hagyományhoz? |
| Egyedi történet | Van-e egy mondatban érthető oka annak, hogy éppen ezt mutatjuk meg? |
| Vendégélmény | Segít-e a vendégnek elképzelni egy valódi török étkezési helyzetet? |
| Regionális érték | Tágítja-e a képet Isztambulon és a közhelyeken túl? |
| Mai relevancia | Jelenleg működő, ellenőrizhető hely-e? |
| Forrásolhatóság | Van-e megbízható, friss elsődleges vagy szakmai forrás? |
| Sokszínűség | Javítja-e az árkategóriák, étteremtípusok és régiók egyensúlyát? |
| Ali-kompatibilitás | Meghívható-e a történetbe úgy, hogy Ali házigazda, ne kritikus vagy influencer legyen? |

### Kizáró okok

- a hely aktuális működése nem ellenőrizhető;
- csak marketingállítások támasztják alá a jelentőségét;
- a bemutatás rangsorolás vagy státuszfitogtatás nélkül nem működik;
- az együttműködés vagy fizetett megjelenés nincs egyértelműen jelölve;
- az ajánlás érzékeny egészségügyi, allergén- vagy biztonsági állítást tenne megfelelő forrás nélkül.

## 5. Egy éttermi történet kötelező szerkezete

Minden hely ugyanazt az információs rendet követi, de nem ugyanazzal a sablonmondattal.

1. **A meghívás** – Ali egy emberi mondattal megnyitja a történetet.
2. **Miért éppen ez a hely?** – egyetlen világos szerkesztési állítás.
3. **Mit mesél Törökországról?** – kulturális vagy regionális összefüggés.
4. **Mire figyelj az asztalnál?** – étkezési ritmus, alapanyag vagy gesztus; nem kötelező rendelési utasítás.
5. **Kinek lehet érdekes?** – rövid, őszinte vendégilleszkedés.
6. **Mielőtt elindulsz** – hivatalos oldal és aktuális információk ellenőrzésére szolgáló link.

### Ajánlott kártyaszöveg

- **Cím:** az étterem neve;
- **Hely:** város · régió;
- **Szerkesztési címke:** például „Régi isztambuli asztal”;
- **Történet:** 45–80 szó;
- **Ali mondata:** legfeljebb 16 szó;
- **Tovább:** „Nézzük meg a hely történetét”;
- **Aktualitás:** „Utoljára ellenőrizve: ÉÉÉÉ. HH. NN.”

## 6. Tartalmi adatmodell

```text
id
name
city
region
editorial_door
editorial_angle
why_it_matters
cultural_context
guest_fit
cuisine_context
ali_invitation
official_url
independent_source_url
last_verified
operating_status
reservation_guidance
image_rights_status
paid_relationship
editorial_status
```

### Adatkezelési szabályok

- A `paid_relationship` mező kötelező; alapértéke `false`.
- A `last_verified` publikálás előtt nem lehet 90 napnál régebbi.
- Nyitvatartást, árat és menüt nem másolunk statikus szövegként az oldalra.
- A `reservation_guidance` csak általános jelzés lehet; az aktuális feltételekért mindig a hivatalos oldal felel.
- A `image_rights_status` jóváhagyása nélkül nem jelenhet meg valódi helyhez kötött fotó.
- Bezárt vagy bizonytalan státuszú hely automatikusan lekerül a publikus válogatásból, a története pedig archív szerkesztési anyag marad.

## 7. Első szerkesztett jelöltlista

Ez nem rangsor. A sorrend a történet dramaturgiáját szolgálja, és publikálás előtt minden hely működését, hivatalos linkjét és képhasználati jogát újra ellenőrizni kell.

| Hely | Város / régió | Szerkesztési ajtó | Miért lehet része Ali világának? | Státusz |
|---|---|---|---|---|
| Pandeli | Isztambul | Régi isztambuli asztalok | A Fűszerbazárhoz kötődő városi emlékezet és a történelmi lokanta-kultúra miatt. | **V1 válogatás** |
| Karaköy Lokantası | Isztambul | Régi isztambuli asztalok | A lokanta mindennapi, megosztható és nem kizárólag ünnepi arcát mutathatja. | **V1 válogatás** |
| TURK Fatih Tutak | Isztambul | Anatólia új nyelve | A kortárs török konyha nemzetközileg is látható, erősen személyes értelmezése. | **V1 válogatás** |
| Neolokal | Isztambul | Anatólia új nyelve | A hagyomány, a fenntarthatóság és a mai éttermi nyelv találkozását teszi láthatóvá. | **V1 válogatás** |
| Mikla | Isztambul | Anatólia új nyelve | A „New Anatolian” szemléleten keresztül beszélhetünk tájról, alapanyagról és kortárs városi nézőpontról. | Tartalék jelölt |
| OD Urla | Urla · İzmir | Régiók asztalai | A termőhely, a nyílt tűz és az égei táj kapcsolatát mutathatja meg. | **V1 válogatás** |
| Teruar Urla | Urla · İzmir | Régiók asztalai | A terroir és a helyi alapanyagok miatt az Égei-tenger nem háttér, hanem a történet része. | Tartalék jelölt |
| Orfoz | Bodrum · Muğla | Régiók asztalai | A tenger, a szezon és a tengeri alapanyagok felelős használata köré építhető történet. | **V1 válogatás** |
| Babayan Evi | Ürgüp · Kappadókia | Régiók asztalai | Egy családiasabb, helyhez kötött kappadókiai asztal ellenpontja lehet a nagyvárosi éttermeknek. | **V1 válogatás** |
| İmam Çağdaş | Gaziantep | Régiók asztalai | A gaziantepi konyha és az 1887-ig visszanyúló városi intézmény története miatt fontos. | **V1 válogatás** |

### Egyensúlyszabály

Az első publikus válogatásban:

- legfeljebb a helyek fele lehet isztambuli;
- legalább három különböző régió jelenjen meg;
- legalább két hely mutasson hétköznapibb vagy családiasabb étkezési kultúrát;
- a díj nem lehet önmagában a bekerülés indoka;
- egy oldalon 6–8 hely elég; a többi a későbbi szerkesztési rotáció része.

## 8. Ali hangja az éttermi rétegben

### Ilyen

- „Ha kíváncsi vagy, hogyan él tovább egy régi íz, itt érdemes leülnünk.”
- „Nem kell mindent ismerned. Előbb nézzük meg, mi kerül középre az asztalon.”
- „Ez most nem verseny. Más történetet mesél egy lokanta, és mást egy kortárs konyha.”
- „Indulás előtt nézzünk rá a hely saját oldalára is.”

### Nem ilyen

- „Ez Törökország legjobb étterme.”
- „Ezt mindenképpen meg kell rendelned.”
- „Csak az igazi ínyencek értik.”
- „A Michelin-csillag bizonyítja, hogy ez autentikus.”
- „Foglalj most, különben lemaradsz.”

## 9. Képhasználati és bizalmi szabály

Valódi étteremhez AI-kép nem készülhet olyan formában, amely dokumentarista fotónak, konkrét enteriőrnek, személynek vagy fogásnak látszik. Három elfogadható megoldás van:

1. jogtisztán licencelt vagy az étterem által engedélyezett fotó;
2. nem megtévesztő, szerkesztőségi grafika: térkép, tipográfia, motívum, alapanyag;
3. Ali világában játszódó, fiktív vendégségjelenet, egyértelműen nem egy konkrét étterem ábrázolásaként.

A vizuális különbséget a képaláírásnak és a fájl metaadatainak is egyértelművé kell tennie.

## 10. Aktualitási protokoll

### Publikálás előtt

- működési státusz ellenőrzése;
- hivatalos oldal vagy hivatalos foglalási felület ellenőrzése;
- független szakmai forrás ellenőrzése;
- név, város és kategória ellenőrzése;
- képhasználati jog rögzítése;
- fizetett kapcsolat ellenőrzése és jelölése.

### Publikálás után

- negyedéves teljes felülvizsgálat;
- rendkívüli ellenőrzés bezárásról, költözésről vagy koncepcióváltásról szóló hír esetén;
- a `last_verified` dátum látható frissítése;
- bizonytalan adat esetén a kártya ideiglenes elrejtése.

## 11. Kutatási alap és kiadási megjegyzés

A jelöltlista 2026. július 19-én a Michelin Guide aktuális törökországi válogatására és étteremoldalaira, valamint az İmam Çağdaş esetében a Gault&Millau Türkiye és egy aktuális utazási szerkesztőségi oldal adataira támaszkodott. Ezek kutatási források, nem automatikusan publikálandó marketingcímkék.

Publikálás előtt minden jelölthöz elsődleges, hivatalos forrás is szükséges.

### Kutatási forrásregiszter

| Téma / hely | Ellenőrző forrás | Ellenőrizve |
|---|---|---|
| Türkiye 2026 válogatás | [Michelin Guide Türkiye 2026](https://guide.michelin.com/en/article/michelin-guide-ceremony/the-michelin-guide-turkiye-reveals-its-2026-restaurant-selection) | 2026. 07. 19. |
| TURK Fatih Tutak | [Michelin Guide étteremoldal](https://guide.michelin.com/en/istanbul-province/istanbul/restaurant/turk-fatih-tutak) | 2026. 07. 19. |
| Neolokal | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/istanbul-province/istanbul/restaurant/neolokal) | 2026. 07. 19. |
| Mikla | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/istanbul-province/istanbul/restaurant/mikla) | 2026. 07. 19. |
| Pandeli | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/istanbul-province/istanbul/restaurant/pandeli) | 2026. 07. 19. |
| Karaköy Lokantası | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/istanbul-province/istanbul/restaurant/karakoy-lokantas%C4%B1) | 2026. 07. 19. |
| OD Urla | [Michelin Guide étteremoldal](https://guide.michelin.com/en/izmir/izmir_2809416/restaurant/od-urla) | 2026. 07. 19. |
| Teruar Urla | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/izmir/izmir_2809416/restaurant/teruar-urla) | 2026. 07. 19. |
| Orfoz | [Michelin Guide étteremoldal](https://guide.michelin.com/en/mugla/bodrum_2806351/restaurant/orfoz-restaurant) | 2026. 07. 19. |
| Babayan Evi | [Michelin Guide étteremoldal](https://guide.michelin.com/us/en/nevsehir/urgup_2827493/restaurant/babayan-evi-restaurant) | 2026. 07. 19. |
| Hivatalos oldalak · V1 válogatás | [Pandeli](https://pandeli.com.tr/) · [Karaköy Lokantası](https://www.karakoylokantasi.com/) · [TURK Fatih Tutak](https://turkft.com/) · [Neolokal](https://www.neolokal.com/) · [OD Urla](https://odurla.com/) · [Orfoz](https://www.orfoz.net/en) · [Babayan Evi](https://www.babayanevi.com/) · [İmam Çağdaş](https://www.imamcagdas.com/) | 2026. 07. 19. |
| İmam Çağdaş | [Gault&Millau Türkiye 2025](https://www.gault-millau.com.tr/wp-content/uploads/2025/11/GaultMillau-2025.pdf) · [Condé Nast Traveler](https://www.cntraveler.com/restaurants/gaziantep/imam-cagdas) | 2026. 07. 19. |

## 12. Definition of Done

Az éttermi réteg akkor kész a megépítésre, ha:

- [ ] kiválasztottuk a publikus 6–8 helyet;
- [ ] mindegyikhez megvan az egyedi szerkesztési állítás;
- [ ] egyik szöveg sem rangsorol vagy tesz ellenőrizetlen szuperlatív állítást;
- [ ] minden hely működése és hivatalos linkje frissen ellenőrzött;
- [ ] a regionális és étteremtípus-egyensúly teljesül;
- [ ] a képhasználati státusz minden rekordnál ismert;
- [ ] Ali mondata vendégváró, nem kritikusi vagy influencer-hangú;
- [ ] a mobilkártya 15 másodperc alatt érthető;
- [ ] a továbblépés nem zsákutca, és nem szakítja ki a vendéget Ali világából.
