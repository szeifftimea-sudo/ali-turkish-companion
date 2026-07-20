# Mırmır Visual Canon v1.0

## Tervezési szándék

Mırmır első pillantásra valódi isztambuli utcai macskának hasson; második pillantásra legyen felismerhető Mırmırként. A karakterazonosság nem kellékekből és nem emberi arcból, hanem öt stabil jelből épül.

## Öt változtathatatlan azonosító

1. **Testalkat:** felnőtt, közepes méretű, karcsú, de egészséges; hosszú lábak és könnyed, takarékos mozgás.
2. **Alapszín:** meleg kőszürke, rövid szőr, finom sötétebb makréla-cirmos csíkozással.
3. **Arc:** törtfehér áll és keskeny, szabálytalan törtfehér mellfolt; az orrhát szürke marad.
4. **Szem:** tompa borostyánzöld – természetes, nem világító és nem túlméretezett.
5. **Sziluettjel:** a farok utolsó harmada sötétebb, a farokcsúcs enyhén balra kampós nyugalmi tartásban; a jobb fül külső peremén apró, régi V alakú csorbulás.

Ezek közül egyetlen kép sem veszíthet el háromnál többet a kameraállás miatt; ami látható, annak pontosnak kell lennie.

## Anatómia és arány

- Valós felnőtt macskaarányok.
- Fej nem kölyökmacskásan nagy.
- Szem nem rajzfilmesen nagy.
- Mancs keskeny, természetes méretű.
- Bunda rendezett, de nem szalonfényű.
- Test nem soványított drámai módon és nem gömbölyített plüssfigurává.
- Ali mellett körülbelül a lábszárközép alatti magasságot éri el négy lábon állva.

## Arc és mimika

Mırmır felismerhető arca nyugodt, enyhén mandula alakú szemmel és természetes macskaszájjal készül. Nincs emberi mosoly, szemöldökjáték vagy „Pixar-reakció”. Az érzelmi tartományt a szemhéj, fül, fej- és testtartás adja.

## Motion signature

- megfontolt, csendes járás;
- rövid megállás egy hang vagy illat miatt;
- gazdaságos mozdulatok, kevés felesleges kapkodás;
- hosszú, nyugodt ülés vagy fekvés;
- közeledéskor nem egyenes roham, inkább oldalirányú, saját útvonal;
- távozáskor céltudatos eltűnés a képből.

## Kedvenc pózok

1. **Küszöb-pihenő:** mellső mancsok párhuzamosan, félárnyékban.
2. **Napfolt-gombóc:** összegömbölyödve, a kampós farokcsúcs részben látható.
3. **Magas megfigyelő:** alacsony falon vagy széktámlán, nem kamerába nézve.
4. **Félfordulat:** teste továbbindulna, feje egy hang felé fordul.
5. **Ali melletti távolság:** Ali közelében, de nem az ölében; ugyanazon tér két önálló lakója.

## Környezeti integráció

- A fény és színkezelés az Ali Canon Scene Library filmes, meleg, tapintható 3D illusztrációs világához igazodik.
- Mırmır szőrének részletessége nem lehet fotórealisztikusabb, mint Ali és a környezet.
- Természetes érintkezési árnyék szükséges; nem lebeghet és nem tűnhet utólag beragasztottnak.
- Mélységélesség és zajszint egyezzen a jelenettel.
- Háttérszerepben részben takarásban is maradhat.

## Cameo-integráció

- Mırmır nem kerülhet CSS-sel vagy külön kivágott „matricaként” egy kész jelenet fölé.
- A fényt, takarást, perspektívát, érintkezési árnyékot és mélységélességet a jelenettel együtt kell megoldani.
- Az eredeti `ALI-SCN-*` mesterek változatlanok maradnak; Mırmırral külön, származtatott cameo-asset készül.
- A cameo nem foglalhatja el a kompozíció fő fókuszát, és nem nézhet a kamerába.
- Reszponzív vágásban részben vagy teljesen eltűnhet, ha jelenléte csak háttérhangulat. A fő szöveg, CTA és Ali olvashatósága elsőbbséget élvez.
- Külön mobilváltozat csak akkor készül, ha a természetes viselkedés és a vizuális azonosítók kényszer nélkül megőrizhetők.

A jelenléti ritmust és az engedélyezett termékhelyeket a `MIRMIR_LIVING_WORLD_SYSTEM.md` rögzíti.

## Tiltott vizuális eltérések

- kék vagy élénkzöld szem;
- bolyhos hosszú szőr;
- kerek, zömök vagy kölyökmacskás test;
- szimmetrikus nagy fehér maszk;
- nyakörv, kendő, fez vagy bármilyen jelmez;
- emberi mosoly és túlzó érzelem;
- minden képen azonos, kamerába néző ülőpóz;
- tisztán dekoratív, „tökéletes” fajtatiszta megjelenés;
- túlhangsúlyozott sérülés vagy sajnálatkeltő állapot.

## Első vizuális jóváhagyási csomag – későbbi renderfeladat

Végleges jelenetbe illesztés előtt külön, semleges csomag szükséges:

- 5 nézetes turnaround;
- ülő, fekvő, álló, járó és nyújtózó póz;
- 5 testbeszédállapot;
- fej- és bundajelölés-közelkép;
- méretarány Ali mellett;
- három fényteszt: reggeli nap, beltéri teázó, kékórás rakpart.

Ez a lista render-specifikáció. Nem ad felhatalmazást a karakter újratervezésére.
