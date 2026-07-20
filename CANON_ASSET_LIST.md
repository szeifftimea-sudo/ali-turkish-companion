# Ali – Canon Asset List v1.0

## 1. A könyvtár célja

Ez a lista nem egyszerű képlista, hanem Ali vizuális kánonjának gyártási térképe. Minden asset feladata, hogy logó és felirat nélkül is felismerhetően ugyanahhoz a világhoz tartozzon.

> **Belépési feltétel:** ha az első reakció nem az, hogy „Ez Ali”, az asset nem kerülhet a kanonikus könyvtárba.

## 2. Státuszok

- **CANON** – karakter- és világazonosság szempontjából jóváhagyott, termékben használható.
- **PROVISIONAL CANON** – használható prototípusban, de végleges kreatív review szükséges.
- **PLANNED** – specifikált, még nincs legenerálva vagy jóváhagyva.
- **PLACEHOLDER** – kizárólag elrendezési próba; nem képezhet vizuális referenciát.
- **REJECTED** – nem használható és nem adható későbbi generálás referenciájaként.

## 3. Változtathatatlan Ali-azonosítók

1. Meleg borostyánbarna, nagy szemek, erős fényfolttal.
2. Sűrű, sötétbarna, rövid-közepes göndör haj; felismerhető fürttömeg.
3. Puha, lekerekített, kortalanul fiatal arc, finom szeplők és pír.
4. Jellegzetes, kedvesen hangsúlyos orr és nagyobb fülek.
5. Karcsú, stilizált test, enyhén túlméretezett fej.
6. Rétegzett, természetes textúrájú ruházat, kékes mintás sállal és meleg anatóliai színutalásokkal.
7. Prémium, filmszerű 3D-anyagvilág, puha mélységélesség, tapintható textilek.
8. Útitársi testbeszéd: Ali együtt néz, halad vagy figyel; nem prezentál.

## 4. Lezárt Canon Scene Library – 10 jelenet

| ID | Asset | Funkció | Kamera / arckifejezés | Státusz | Fájl |
|---|---|---|---|---|---|
| ALI-SCN-001 | Galata Bridge | Landing hero, első meghívás | Széles kép, háromnegyedes alak, hívogató félmosoly | CANON | `assets/canon/scenes/ALI-SCN-001-galata-sunrise.png` |
| ALI-SCN-002 | Karaköy Tea House | Intim kapcsolati jelenet | Vertikális medium shot, gondolkodó figyelem | CANON | `assets/canon/scenes/ALI-SCN-002-karakoy-teahouse.png` |
| ALI-SCN-003 | Bosphorus Ferry | Utazási történet | Széles, háromnegyedes profil, csendes meglepetés | CANON | `assets/canon/scenes/ALI-SCN-003-bosphorus-ferry.png` |
| ALI-SCN-004 | Grand Bazaar | Identitás és anyagvilág alapja | Teljes alak, frontális, nyitott mosoly | CANON | `assets/canon/scenes/ALI-SCN-004-grand-bazaar.png` |
| ALI-SCN-005 | Gülhane Park | Kapcsolati és lelassuló jelenet | Vertikális medium full, nyugodt bátorítás | CANON | `assets/canon/scenes/ALI-SCN-005-gulhane-park.png` |
| ALI-SCN-006 | Nostalgic Tram | Városi ritmus és mozgás | Széles környezeti kép, ablakon kitekintő Ali | CANON | `assets/canon/scenes/ALI-SCN-006-nostalgic-tram.png` |
| ALI-SCN-007 | Sunset at Üsküdar | Érzelmi fejezetzárás | Ultra-wide profil, csendes meghatottság | CANON | `assets/canon/scenes/ALI-SCN-007-uskudar-sunset.png` |
| ALI-SCN-008 | Simit Bakery | Illat, étel és első rendelés | Vertikális medium full, visszafogott öröm | CANON | `assets/canon/scenes/ALI-SCN-008-simit-bakery.png` |
| ALI-SCN-009 | Blue Mosque Courtyard | Kulturális figyelem és tisztelet | Széles építészeti kép, felfelé figyelő Ali | CANON | `assets/canon/scenes/ALI-SCN-009-blue-mosque-courtyard.png` |
| ALI-SCN-010 | Waterfront Promenade | Mozgás, szabadság és közös felfedezés | Széles háromnegyedes hátulnézet, sétáló Ali | CANON | `assets/canon/scenes/ALI-SCN-010-waterfront-promenade.png` |
| ALI-EXP-001 | Core Expression Packet | AI/UX reakciótervezés | 6 azonos beállítású portré | PROVISIONAL CANON | `assets/canon/expressions/ALI-EXP-001-core-expression-packet.png` |

## 5. A Scene Library lezárási állapota

Az első vizuális mag lezárva. A `scenes` könyvtár pontosan tíz jóváhagyott mestert tartalmaz, folyamatos `ALI-SCN-001`–`ALI-SCN-010` azonosítókkal. A következő termékfázis új alapkép készítése helyett ezekből épít kalandokat, képkivágásokat és származékokat.

### B. Élő város – környezeti képek

| ID | Jelenet | Ali jelenléte | Szerep | Prioritás |
|---|---|---|---|---|
| WRLD-ENV-001 | Gőzölgő tea az ablakban | Nincs | Átvezető részletkép | P1 |
| WRLD-ENV-002 | Kompkorlát, vízcseppek, város | Csak kéz/részlet opcionális | Ritmus és textúra | P1 |
| WRLD-ENV-003 | Villamosjegy és kapaszkodó | Nincs | Élethelyzeti közelkép | P2 |
| WRLD-ENV-004 | Bazári fények zárás előtt | Távoli sziluett | Napszakváltás | P2 |
| WRLD-ENV-005 | Parkpad és lehullott levelek | Távoli Ali opcionális | Csendes világpillanat | P2 |
| WRLD-ENV-006 | Esős macskakő és piros villamos | Nincs | Időjárási változat | P2 |

### C. Második hullám – Törökország tágítása

- Kadıköy piac és mellékutcák.
- Üsküdar partja alkonyatkor.
- Kappadókia reggeli csendje.
- İzmir tengerparti hétköznapja.
- Bursa udvar és çaykert.
- Antalya óvárosi este.

Ezek csak az isztambuli vizuális nyelv stabilizálása után készülhetnek el.

## 6. Kamera- és képarány-mátrix

Egy felismerhető világ nem jelent egyforma képeket. A könyvtár minden fejezetben legalább az alábbi nézőpontokat használja:

- **Environment wide 16:9:** Ali kicsi a városhoz képest; a hely lélegzik.
- **Narrative medium 4:5:** Ali valakivel vagy valamivel kapcsolatban van.
- **Intimate close-up 1:1 / 4:5:** érzelmi reakció, kevés háttérinformáció.
- **Over-the-shoulder 3:2:** a felhasználó Ali mellett áll, nem vele szemben.
- **Detail insert 3:2:** kéz, tea, jegy, textil, eső, városi nyomok.
- **Chapter closer 21:9:** nagy tér, kevés szövegigény, érzelmi lecsengés.

## 7. Világkonzisztencia

- Kortárs Isztambul, nem történelmi fantáziadíszlet.
- Meleg krém, terrakotta, mély türkiz és visszafogott arany; napszak szerint változó intenzitással.
- Valódi használati nyomok: kopott fa, nedves kő, textil, fém, üveg, pára.
- Háttérszereplők természetesek és nem ismétlődő statiszták.
- Ikonikus elemek csak történeti indokkal jelennek meg.
- Ali nem lehet minden kép közepén, de ha jelen van, identitása nem gyengülhet.

## 8. Asset review – 12 pontos kapu

Minden képet 0 vagy 1 ponttal értékelünk:

1. Ugyanaz az arcforma.
2. Ugyanaz a szemszín és szemkarakter.
3. Ugyanaz a hajtömeg és fürtlogika.
4. Ugyanaz a testarány.
5. A ruházat azonos vizuális családba tartozik.
6. A 3D-anyagvilág egyezik.
7. Az arckifejezés természetes és helyzethez illő.
8. A testbeszéd útitársi, nem oktatói.
9. Isztambul kortárs és kulturálisan hiteles.
10. A kompozíció termékben használható.
11. Nincs sztereotípia, logó, hibás szöveg vagy vizuális anomália.
12. Logó nélkül is Ali világának érződik.

**Jóváhagyási küszöb:** 12/12. Az 1–6. és 12. pont bármely hibája automatikus elutasítás.

## 9. Mırmır karakter- és renderelési protokoll

- Mırmır karakterét az Ali Character Team tervezi meg a Hospitality Manifesto és a Character Philosophy alapján.
- A karaktertervezés forrásai: `MIRMIR_CHARACTER_MANIFESTO.md`, `MIRMIR_RELATIONSHIP_MODEL.md`, `MIRMIR_BEHAVIOR_RULES.md` és `MIRMIR_VISUAL_CANON.md`.
- A termékbeli jelenlét autoritatív forrása: `MIRMIR_LIVING_WORLD_SYSTEM.md`.
- A képgenerálási workflow nem tervező, hanem renderelő: a jóváhagyott karakterleírást és viselkedést jeleníti meg.
- Az első ember által jóváhagyott identitásreferencia: `assets/canon/mirmir/MIRMIR-CANON-001-neutral-portrait.png`.
- A korábbi munkaváltozatok az `assets/mirmir/_working/` mappában maradnak, és nem szolgálhatnak kanonikus generálási referenciaként.
- A későbbi `MIRMIR-CANON` csomag tartalma: turnaround, ülő/fekvő/álló/járó/nyújtózó póz, testbeszédcsomag, méretarány Alihoz és fényintegrációs tesztek.
- Beépítés előtt emberi review ellenőrzi, hogy Mırmır ugyanaz a karakter, nem antropomorf, nem tanít, nem reagál jutalomként, és természetes macskaként marad jelen.
- Minden jelenetkép külön származtatott cameo-asset; az eredeti `ALI-SCN-*` mesterek változatlanok maradnak.

## 10. Következő vizuális munka – csak új brief alapján

### ISL · Egy nap a szigeten

| Asset ID | Jelenet | Állapot | Fájl |
|---|---|---|---|
| ISL-SCN-001 | A város elmarad | CANON | `assets/canon/island-day/ISL-SCN-001-city-recedes.png` |
| ISL-SCN-002 | Büyükada · érkezés | CANON | `assets/canon/island-day/ISL-SCN-002-buyukada-arrival.png` |
| ISL-SCN-003 | Lassú szigeti utca | CANON | `assets/canon/island-day/ISL-SCN-003-slow-street.png` |
| ISL-SCN-004 | Visszaút · hajófar | CANON | `assets/canon/island-day/ISL-SCN-004-return-wake.png` |

Mırmır-döntés: **nem jelenik meg**. Mırmır nem utazó kabala; büyükadai felbukkanása mesterséges követésnek hatna.

### MVW · Előbb a gépek, aztán a kilátás

| Asset ID | Jelenet | Állapot | Fájl |
|---|---|---|---|
| MVW-SCN-001 | Hasköy · ipari küszöb | CANON | `assets/canon/machines-view/MVW-SCN-001-haskoy-threshold.png` |
| MVW-SCN-002 | Múzeumi szerkezet | CANON | `assets/canon/machines-view/MVW-SCN-002-how-it-works.png` |
| MVW-SCN-003 | TF2 · emelkedés | CANON | `assets/canon/machines-view/MVW-SCN-003-tf2-ascent.png` |
| MVW-SCN-004 | Pierre Loti · kilátás | CANON | `assets/canon/machines-view/MVW-SCN-004-pierre-loti-view.png` |

Mırmır-döntés: **nem jelenik meg**. A történet központja Ali és a vendég közös kíváncsisága; egy macskacameo itt szerkesztett jelzésnek hatna.

1. Minden új Place Story külön Mırmır-döntést kap; cameo csak a kanonikus portré és a `MIRMIR_LIVING_WORLD_SYSTEM.md` alapján készülhet.
2. Környezeti insert-sorozat a tíz jelenetből levezetve.
3. Másodlagos emberi karakterek csak külön karakterbibliával.
4. Új Ali-jelenet csak akkor, ha a tíz alapjelenetből nem állítható elő a szükséges kalandélmény.

### 10.1 Külön tartalmi képcsaládok

A kulturális aloldalak képei nem számozhatók tovább automatikusan `ALI-SCN-011` formában. Saját, elkülönített prefixet és review-folyamatot kapnak, miközben minden Ali-identitási szabályt örökölnek.

Az első megvalósított külön család a Török konyha Alival képkánonja:

- specifikáció: `KITCHEN_CANON_ASSET_LIST.md`;
- karakteres prefix: `ALI-KIT-*`;
- Ali nélküli világképek prefixe: `WRLD-KIT-*`;
- tervezett mappa: `assets/canon/kitchen/`;
- állapot: 6/6 P0 jelenet renderelve, jóváhagyva és beépítve.

A Place Story rendszer további, elkülönített családjai:

- `KDM-SCN-*` · Kadıköy–Moda · `assets/canon/kadikoy-moda/` · 4/4 kész;
- `BHK-SCN-*` · A bazártól a kikötőig · `assets/canon/bazaar-harbor/` · 4/4 kész, ebből a nyitókép meglévő `ALI-SCN-004` jelenetből származik;
- `OGH-SCN-*` · Régi utcák az Aranyszarvnál · `assets/canon/old-golden-horn/` · 4/4 kész, egyetlen távoli Mırmır-cameóval a balat-i jelenetben;
- `TPK-SCN-*` · A toronytól a parkig · `assets/canon/tower-park/` · 4/4 kész, Mırmır tudatosan nincs jelen;
- a bazár–kikötő család specifikációja: `BAZAAR_HARBOR_CANON_ASSET_BRIEF.md`;
- a renderpromptok és végleges fájlok nyilvántartása: `BAZAAR_HARBOR_IMAGE_GENERATION_RECORD.md`.
- az Aranyszarv–régi utcák család specifikációja: `OLD_GOLDEN_HORN_CANON_ASSET_BRIEF.md`;
- a négy renderprompt és végleges fájl nyilvántartása: `OLD_GOLDEN_HORN_IMAGE_GENERATION_RECORD.md`.
- a Galata–Dolmabahçe–Yıldız család specifikációja: `TOWER_PARK_CANON_ASSET_BRIEF.md`;
- a négy jóváhagyott renderprompt és végleges fájl nyilvántartása: `TOWER_PARK_IMAGE_GENERATION_RECORD.md`.

Ez a család nem módosítja a lezárt, tíz darabos Canon Scene Libraryt.
