# Előbb a gépek, aztán a kilátás · Place Story Blueprint v1.0

**Dátum:** 2026-07-19  
**Történetív:** Rahmi M. Koç Múzeum → Eyüp → TF2 teleferik → Pierre Loti-domb  
**Típus:** kíváncsiság- és átváltozástörténet  
**Állapot:** megvalósítva és a várostérképpel összekötve

**Prototípus:** `gepektol-kilatasig.html` · `gepektol-kilatasig.css` · `gepektol-kilatasig.js`  
**Integráció:** Rahmi M. Koç Múzeum és Pierre Loti térképpont; öt mondat együttes mentése Ali zsebébe

## North Star

> **A vendég előbb megkérdezi, mitől mozdul meg valami. A végén ugyanazt a mozgást már nem nézi: utazik vele, és egy új helyről látja a várost.**

## Élményígéret

**Előbb belenézünk a gépekbe. Aztán az egyik elvisz minket.**

Ez nem múzeumi tárgylista és nem különálló panorámaprogram. A történet egyetlen kérdést visz végig: **mitől mozdul meg valami, és hová tud elvinni?**

## Mi tartja össze a két helyet?

- A Rahmi M. Koç Múzeum kommunikációs és közlekedési ipari örökséget mutat be; a vendég a működésre kérdez rá.
- Eyüpnél már nem kiállított szerkezetet nézünk: a TF2 teleferik valóban mozgásba hozza a történetet.
- Pierre Lotinál a gép háttérbe lép. A vendég azt látja, amit a mozgás hozzáférhetővé tett: az Aranyszarv egészét.
- A múzeum és Eyüp nem rövid gyalogos átmenet. A prototípus nem rögzít egyetlen örök útvonalat; az aktuális közlekedést indulás előtt ellenőrizni kell.

## Élményív

1. **Hasköy – megérkezni a régi ipari térbe:** Ali nem előadást tart. Egyetlen gép mellett megáll, és együtt próbáljuk megérteni.
2. **A mechanika közelében – kérdezni:** a vendég megtanulja kimondani, hogy valaminek a működése érdekli, és engedélyt kér a közelebbi nézéshez.
3. **Úton Eyüp felé – a tárgyból út lesz:** nem teszünk úgy, mintha a két hely egymás mellett volna. Útbaigazítást kérünk, és az aktuális közlekedéshez igazodunk.
4. **A TF2 teleferik – beülni a működésbe:** a kerék, a kábel és a kabin már nem kiállítási tárgy. Felvisz minket.
5. **Pierre Loti – elengedni a magyarázatot:** fentről az Aranyszarv válik főszereplővé. Ali nem nevez meg minden épületet; hagyja, hogy a vendég először maga nézzen körül.

## Öt magmondat

| Helyzet | Törökül | Magyarul |
|---|---|---|
| Működés megkérdezése | `Bu nasıl çalışıyor?` | Hogyan működik ez? |
| Közelebbi megfigyelés | `Bunu yakından görebilir miyiz?` | Megnézhetjük közelebbről? |
| Továbbjutás | `Eyüp'e nasıl gidebiliriz?` | Hogyan jutunk el Eyüpbe? |
| A teleferik megtalálása | `Teleferik nereden kalkıyor?` | Honnan indul a felvonó? |
| Tájékozódás a magasból | `Haliç'i buradan görebilir miyiz?` | Láthatjuk innen az Aranyszarv-öblöt? |

## Interakciós döntés

**Nincs választókártya és nincs tudásteszt.**

A történet egy függőleges mozgásvonalat használ:

`kerék → út → kábel → kabin → kilátás`

A vonal a görgetéssel halad, és mindig csak az aktuális fejezetet emeli ki. Ez nem kér újabb döntést a vendégtől, hanem láthatóvá teszi, hogy ugyanaz a kérdés alakul át jelenetről jelenetre.

## Információs hierarchia

- **H1:** az élményfordulat, nem a két hely neve.
- **H2:** minden fejezetben az változik, hogy a vendég mit kezd a mozgással.
- **Török mondat:** csak akkor jelenik meg, amikor a helyzetben valóban szükség van rá.
- **Praktikus információ:** külön blokkban, hivatalos forrásra vezetve; nyitvatartást, árat és indulási időt nem égetünk a történetbe.
- **Zárás:** nem azt számolja össze, hány tárgyat vagy helyet látott a vendég, hanem kimondja a megszerzett képességet: már a működésre és az irányra is rá tud kérdezni.

## Ali szerepe

- Ali nem tudja minden gépről előre a választ; kíváncsiságot modellez.
- Nem ér hozzá olyan tárgyhoz, amelyhez a látogató sem nyúlhat.
- Nem nevezi a teleferiket attrakciónak; természetes városi közlekedésként használja.
- A kilátónál elhallgat. Nem tölti meg azonnal adatokkal a panorámát.

## Mırmır-döntés

**NO.** A múzeumban, a teleferikben vagy a panorámánál való megjelenése itt megtervezett cameo-nak hatna. A történet középpontja a kíváncsiság átalakulása, ezért Mırmır hiánya hitelesebb.

## Praktikus és hitelességi kapu

- A múzeum aktuális rendjéhez a hivatalos Rahmi M. Koç Múzeum oldal vezet.
- A teleferik aktuális üzeméhez a hivatalos Metro İstanbul TF2-oldal vezet.
- A történet nem állítja, hogy Hasköyből Eyüpbe mindig ugyanazzal a járattal vagy rövid sétával jutunk el.
- A képek nem találhatnak ki múzeumi érintést, kezelhető kiállítási tárgyat, hamis teleferik-nyomvonalat vagy valótlan panorámát.

## Sikerkritérium

A történet akkor működik, ha a vendég a végén ezt érzi:

> **Nemcsak feljutottam egy kilátóhoz. Értettem, hogyan lett a kíváncsiságomból út.**
