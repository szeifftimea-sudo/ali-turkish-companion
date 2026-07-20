# A toronytól a parkig · Place Story Blueprint v1.0

**Dátum:** 2026-07-19  
**Történetív:** Galata-torony → Kabataş → Dolmabahçe → Yıldız Park  
**Típus:** tájékozódási és ritmusváltó városi történet  
**Állapot:** MEGVALÓSÍTVA · `toronytol-parkig.html`

## North Star

> **A vendég fentről megtalálja Isztambul vizét, majd lent már nem Ali után megy: tudja, merre induljon, és mikor szeretne megállni.**

## Élményígéret

**Fentről megtalálod a vizet. Lent már nem kell sietned.**

A történet nem Galata, Dolmabahçe és Yıldız látnivalólistája. Egyetlen térbeli és érzelmi ív tartja össze: tájékozódni, leérni a vízhez, majd saját döntésből megpihenni.

## Élményív

1. **Galata utcája – megtalálni a bejáratot:** a torony látszik, de a vendég nem feltételezi, hogy azonnal tudja, merre kell menni.
2. **A magasból – megtalálni a vizet:** a panorámában nem épületneveket kell felismerni; a Boszporusz ad irányt.
3. **Le Kabataş felé – útbaigazítást kérni:** a történet nem tesz úgy, mintha a három hely egy rövid sétára volna egymástól.
4. **Dolmabahçe mellett – emberi léptékbe visszaérni:** a palotát nem magyarázzuk túl; a víz és a hosszú homlokzat mellett a következő irányt kérdezzük meg.
5. **Yıldız Park – megállni:** a vendég kezdeményezi a pihenést. Ali nem ajánl újabb programot.

## Öt magmondat

| Helyzet | Törökül | Magyarul |
|---|---|---|
| Bejárat keresése | `Giriş nerede?` | Hol van a bejárat? |
| Tájékozódás fentről | `Boğaz hangi tarafta?` | Merre van a Boszporusz? |
| Továbbjutás a vízhez | `Kabataş'a nasıl gidebiliriz?` | Hogyan jutunk el Kabataşba? |
| Gyalogos útvonal megkérdezése | `Yıldız Parkı'na yürüyerek gidebilir miyiz?` | Eljuthatunk gyalog a Yıldız Parkba? |
| Pihenés kezdeményezése | `Biraz dinlenelim mi?` | Pihenjünk egy kicsit? |

## Egyetlen interakció

A Galata-panorámánál a vendég először csak néz. A jelenet egyetlen CTA-ja:

**Megtaláltam a vizet. Menjünk le.**

A kattintás:

- megőrzi a `foundWater` történetállapotot;
- megváltoztatja Ali rövid visszajelzését;
- megőrzi ezt a felismerést a záró emlékkártyán;
- ugyanazzal a mozdulattal a Kabataş felé vezető átmenethez visz.

Nincs helyes válasz, pont, térképes teszt vagy tartalomzár.

## Megvalósítási állapot · 2026-07-19

- A teljes reszponzív Place Story elkészült a `toronytol-parkig.html`, `toronytol-parkig.css` és `toronytol-parkig.js` fájlokban.
- A `foundWater` állapot megmarad a böngészőben, és átírja Ali panorámánál adott reakcióját, valamint a záró emléket.
- Az öt mondat együtt menthető Ali zsebébe `tower-park` forrásazonosítóval.
- Galata, Dolmabahçe és Yıldız térképpontja ugyanennek a történetnek a megfelelő fejezetébe vezet.
- Mırmır szándékosan nincs jelen: ennél az ívnél a park önmagában nem ad elég erős történeti okot egy cameo-hoz.

## Ali szerepe

- Galatánál nem szégyeníti meg a vendéget azért, mert a bejáratot keresi;
- fentről nem sorolja a látnivalókat, hanem egyetlen biztos irányt ad;
- a váltásnál nem tesz úgy, mintha minden közel lenne;
- Dolmabahçét nem reklámozza és nem tart róla előadást;
- Yıldızban elfogadja a vendég pihenésre szóló meghívását.

## Mırmır decision

**NO.**

- A park önmagában nem elég narratív ok a megjelenésére.
- A történet központja a térbeli tájékozódás és a tempóváltás.
- Mırmır hiánya nem kap magyarázatot a felületen.

## Praktikus réteg

- A Galata-torony és Dolmabahçe látogatási rendje, jegyei és esetleges korlátozásai változhatnak.
- A történet nem rögzít nyitvatartást vagy árat.
- Galatánál a `muze.gov.tr`, Dolmabahçénál a `millisaraylar.gov.tr` hivatalos oldalára mutat.
- A Kabataş felé vezető út nem kap beégetett közlekedési receptet; a vendég valódi helyzetben friss útvonalat kér vagy ellenőriz.

## Kivezetések

- további útbaigazítási és városi mondatok: `helyzetek.html?topic=fordulatok#kifejezesek`;
- mentett mondatok: `zseb.html?from=tower-park#mentett-mondatok`;
- várostérkép: `isztambul-helyei.html#place-galata`.

## Kész definíció

- Galata, Dolmabahçe és Yıldız mind ugyanabba a történetbe vezet;
- a vendég 10 másodpercen belül érti a tájékozódás → pihenés ívét;
- az öt mondat valódi helyzetben, magyar jelentéssel jelenik meg;
- csak egy narratív interakció van;
- Mırmır tudatosan nincs jelen;
- Ali zsebe megőrzi az öt mondatot és a visszautat;
- mobilon a panoráma és a CTA is egyértelmű marad.
