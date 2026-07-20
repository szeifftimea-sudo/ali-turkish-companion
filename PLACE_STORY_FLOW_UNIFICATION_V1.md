# Place Story Flow Unification v1

**Dátum:** 2026. július 20.

## Sultanahmet

- A négy térképes bejárat külön célpontot és külön CTA-szöveget kapott.
- Kék Mecset → a csendes udvar nyitánya.
- Hagia Szophia → a korszakok találkozásának saját kártyája.
- Topkapı Palota → az egymásba nyíló udvarok saját kártyája.
- Föld alatti Isztambul → a Binbirdirek-szakasz saját kártyája.
- A térképről megnyitott kártya kiemelést és „innen érkeztél” jelzést kap.
- A történet végén a visszalink az eredetileg kiválasztott térképponthoz vezet.

## Kadıköy–Moda

- A négy magmondat változatlanul a történet gerince maradt.
- A `zeytin`, `peynir` és `mevsim meyvesi` külön „Kiegészítő szókincs” szintre került.
- Az érzékelési döntés után jelenik meg a következő CTA.
- A kóstolási döntés után jelenik meg a következő CTA.
- A kávé/séta döntés után jelenik meg a vízpartra vezető CTA.
- Így egy képernyőn egyszerre egy elsődleges feladat marad: előbb választani, utána továbblépni.
- A korábbi döntések megmaradnak helyi mentésben; visszatéréskor a hozzájuk tartozó folytatás is újra látható.

## Ellenőrzés

- Mindkét módosított JavaScript-fájl szintaktikailag érvényes.
- Mind a négy sultanahmeti célhorgony létezik.
- A három kadıköyi folytatási pont HTML- és JavaScript-kapcsolata teljes.
- A négy magmondat mentési rendszere nem változott.

## Nyitott vizuális kapu

A helyi `file://` oldal automatizált böngészős megnyitását a böngésző biztonsági szabálya blokkolta. Ezért a következő kézi frissítéskor két dolgot kell megerősíteni:

1. a sultanahmeti célkártyák kiemelése megfelelően látható mobilon és desktopon;
2. Kadıköyben a választás után megjelenő CTA természetesen folytatja-e az olvasási ritmust.

## 2. fázis · Kalandlezárások

Mind a hét helytörténet lezárása ugyanazt a négy kérdést válaszolja meg, miközben megtartja a saját vizuális hangját:

1. **Mire képes most a vendég?** A címsorok nem az elvégzett leckét, hanem a használható eredményt nevezik meg.
2. **Mit visz magával?** A kiválasztott vagy összegyűjtött mondatok Ali zsebébe menthetők.
3. **Hol talál többet?** Minden lezárás közvetlenül a kapcsolódó élethelyzet további szavaihoz és mondataihoz vezet.
4. **Hogyan tér vissza?** Minden kaland visszavezet a saját térképpontjához.

Az egységes ellenőrzési szerződéshez a lezárások megkapták a `data-story-outcome`, `data-story-save`, `data-story-more` és `data-story-map-return` jelöléseket. Ezek nem változtatják meg a látványt; megbízhatóan tesztelhetővé teszik a teljes hurkot.

### Szövegi finomítások

- Kadıköy–Moda: a lezárás most egy rövid piaci beszélgetés végigvitelét nevezi meg.
- A bazártól a kikötőig: a köszönéstől a vásárlásig tartó valós helyzet lett a fő eredmény.
- Régi utcák: a figyelmes vendégként való érkezés került előtérbe.
- A toronytól a parkig: az önálló tájékozódás és a saját tempó lett a haszon.
- Egy nap a szigeten: az indulás, a visszatalálás és a biztonságos lassítás került a címhierarchia élére.
- A szigeti visszaút mondata pontosabb, teljes török kérdés lett: `Son vapur saat kaçta kalkıyor?`

### Forrásszintű regresszió

- 7/7 kalandban megvan az eredmény, mentés, további tudás és térképes visszatérés.
- 7/7 mentési forrás összekapcsolódik Ali zsebével és a megfelelő visszatérési paraméterrel.
- 8 kapcsolódó JavaScript-fájl szintaktikailag érvényes.
- A térképes visszahorgonyok mind a 17 dinamikus helyazonosítóval összevetve érvényesek.
