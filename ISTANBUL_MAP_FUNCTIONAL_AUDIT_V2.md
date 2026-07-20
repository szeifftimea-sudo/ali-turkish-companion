# Isztambul várostérkép – funkcionális audit v2.0

**Dátum:** 2026. július 20.  
**Hatókör:** `isztambul-helyei.html`, desktop és 390 × 844 px mobilnézet

## Ellenőrzött rendszer

- 3 felfedezési réteg;
- 17 megálló;
- 17 térképtű;
- 17 hely-kártya;
- 7 összevont Place Story;
- 13 egyedi történet- vagy történetszakasz-cél;
- helypont-mélylinkek;
- mobilos visszajelzés;
- billentyűzetes rétegváltás.

## Talált hibák

### 1. A helypont-mélylink csak az oldal első betöltésekor működött

Ha a böngésző ugyanazon az oldalon váltott például `#place-blue` címről `#place-kariye` címre, a térkép nem reagált a hash változására. Emiatt a böngésző-vissza, egy új helylink vagy egy azonos fülön megnyitott mélylink rossz rétegen hagyhatta a térképet.

**Javítás:** a térkép most figyeli a `hashchange` eseményt, szükség esetén réteget vált, kijelöli a helyes kártyát és tűt, majd frissíti a részletpanelt.

### 2. Mobilon a kártyaválasztás nem a válaszhoz vitte a vendéget

Egy alsó hely-kártyára koppintva az oldal a teljes térképtábla tetejére ugrott. A frissen frissített részletpanel a térkép alatt maradt, ezért a felhasználó nem látta rögtön, mi történt.

**Javítás:** mobilon a kiválasztás közvetlenül a frissített részletpanelhez görget. A fejléc miatt 88 px-es biztonságos felső térközt kapott.

### 3. A kiválasztott hely nem jelent meg a megosztható címben

A tű vagy kártya kiválasztása után az URL nem tükrözte az aktív helyet.

**Javítás:** a kiválasztás most `#place-{azonosító}` formában frissíti a címet új, felesleges böngészőtörténeti bejegyzés létrehozása nélkül.

## Regressziós eredmény

| Próba | Eredmény |
|---|---:|
| Desktop rétegek | 8 + 5 + 4 = 17 hely |
| Mobil rétegek | 8 + 5 + 4 = 17 hely |
| Tű- és kártyakiválasztások | 34/34 helyes |
| Aktív tű + aktív kártya + részlet egyezése | 34/34 |
| Helypont-mélylinkek | 17/17 |
| Történet-CTA fájlok és horgonyok | 13/13 |
| Mobilon látható részlet kiválasztás után | 17/17 |
| Vízszintes túlcsordulás 390 px-en | 0 px |
| Jobb nyíllal történő rétegváltás | helyes fókusz és kijelölés |
| Egyetlen billentyűzetes tab-stop a rétegfülek között | igen |

## Termék- és UX-megállapítás

A térkép technikailag most következetesen működik. A 17 hely nem 17 különálló tartalomnak látszik: a részletpanel minden pontnál megmutatja, melyik hét történetívhez és annak melyik állomásához tartozik.

A következő térképes munka ezért már ne új funkció legyen. Csak felhasználói megfigyelés döntse el, hogy a három réteg elnevezése első találkozáskor is elég világos-e, illetve hogy a vendég felismeri-e: egyetlen történet több térképpontot is összeköt.

## Kiadási állapot

**Funkcionális ellenőrzés: megfelelt.**

A térkép használható egérrel, érintéssel és a rétegfülek szintjén billentyűzettel. A helyválasztás, a mélylinkelés, a mobilos visszajelzés és a Place Story-kapcsolatok igazoltan működnek.
