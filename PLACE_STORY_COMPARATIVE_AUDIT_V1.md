# Place Story Comparative Audit v1.0

**Vizsgált élmények:** Sultanahmet · Kadıköy–Moda  
**Dátum:** 2026. július 19.  
**Nézőpont:** Product Manager · UX szakértő · első isztambuli vendég · Ali Character Philosophy

## 1. Vezető megállapítás

A két helytörténet nem ugyanannak a sablonnak két vizuális változata, és nem is szabad azzá tenni őket.

- **Sultanahmet** kulturális küszöbtörténet: azt tanítja meg, hogyan érkezzen a vendég figyelemmel és tisztelettel.
- **Kadıköy–Moda** élő városi történet: azt mutatja meg, hogyan kapcsolódjon be a vendég egy hétköznapi délután ritmusába.

A közös rendszer feladata ezért nem az azonos képernyőszerkezet, hanem az azonos **vendégélmény-logika**.

## 2. Összehasonlító diagnózis

| Szempont | Sultanahmet | Kadıköy–Moda | Döntés |
|---|---|---|---|
| Belépés | A várostérkép oldalán belül nyílik meg | Saját történetoldalon nyílik meg | Mindkettő elfogadható v1-ben; a harmadik történet előtt dönteni kell az önálló URL-ről |
| Első ígéret | Hogyan érkezzünk tisztelettel | Legyen egy saját délutánod | Mindkettő helyspecifikus és erős |
| Első lépés | Korábban nem volt egyértelmű CTA | „Kilépünk a partra” | Sultanahmet kapott első lépést |
| Felhasználói aktivitás | Olvasás, figyelem, mondatválasztás | Érzékelés, kóstolási döntés, választás, tempódöntés | Tudatosan eltérő történettípus |
| Nyelvi mag | Négy tiszteletteljes mondat | Négy cselekvéshez kötött mondat | Közös felső határ: 3–5 magmondat |
| Ali szerepe | A hely rendjéhez igazítja a vendéget | A vendég tempójához igazítja a sétát | Mindkettő a vendégváró filozófia része |
| Hamis affordance | A „Válaszd” szöveg kattintható kártyát ígért | A döntések valódi gombok | Sultanahmet szövege javítva |
| Mentés | Egyenként, tudatos válogatással | A négy mondat együtt | Mindkettő érvényes, ha a szöveg előre elmondja |
| Mentés utáni viselkedés | A vendég dönt, mikor lép a zsebbe | Korábban automatikusan átirányított | Az automatikus átirányítás megszűnt |
| Érzelmi lezárás | Korábban praktikus látogatási információval ért véget | A vendég hívja tovább Alit | Sultanahmet külön érzelmi zárást kapott |
| Tudásmélyítés | Interaktív 7. kaland és hivatalos források | Piaci tudástérkép | Mindkettőnél elkülönül a történettől |
| Mırmır | Nincs jelen | Egy távoli Moda-parti cameo | Mindkét döntés helyes és dokumentált |

## 3. A javított P0 törések

### 3.1 Sultanahmet · nem volt világos, hogyan kezdődik a történet

A nyitóblokk leírta a hely hangulatát, de nem adott következő lépést. A vendég nem tudhatta, hogy olvasson tovább vagy tegyen valamit.

**Javítás:** egyetlen elsődleges CTA: „Maradjunk egy percet az udvaron”.

### 3.2 Sultanahmet · a szöveg nem létező interakciót ígért

A „Válaszd azt, amelyikhez ma van figyelmed” mondat kattinthatóságot sugallt, miközben a négy ajtó szerkesztett információs kártya.

**Javítás:** „Nézd meg, melyikhez van ma figyelmed.”

### 3.3 Kadıköy · Ali a mentés után elsietett

Az „Elteszem ezt a délutánt” gomb automatikusan átnavigált Ali zsebébe. Ez funkcionálisan működött, de megsértette a termék egyik legerősebb elvét: Ali nem siettet.

**Javítás:** a mentés helyben történik; utána külön, választott link jelenik meg Ali zsebéhez.

### 3.4 Sultanahmet · a praktikus információ felülírta az érzelmi lezárást

A történet utolsó élménye a változó látogatási rend lett. Ez felelős információ, de rossz érzelmi végpont.

**Javítás:** a praktikus blokk után új zárás készült: „Már tudod, hogyan érkezz.”

## 4. Tudatosan megtartott különbségek

### Sultanahmetben kevesebb interakció marad

A csendet nem szabad gombokkal „gamifikálni”. A történet értéke a figyelem és a tiszteletteljes jelenlét, ezért itt a szerkesztett olvasás maga is érvényes cselekvés.

### Kadıköyben a döntések alakítják a ritmust

Az illat–szín–hang, a kóstolás visszautasíthatósága és a kávé–séta választás nem tudásteszt. A vendég saját délutánját alakítja velük.

### A mondatmentés nem kötelezően azonos

Sultanahmetben a vendég egyenként választja ki a számára hasznos mondatokat. Kadıköyben a négy mondat egyetlen megélt cselekvéssor emléke. A rendszer a jelentést egységesíti, nem a gombok számát.

## 5. Nyitott P1 döntések

1. **Önálló Sultanahmet-oldal:** a harmadik teljes helytörténet előtt döntsük el, hogy minden történet külön URL-t kap-e. Skálázhatóság szempontjából ez az ajánlott végállapot.
2. **Közös vizuális komponenskészlet:** a következő három történet előtt érdemes közös CTA-, Ali-jegyzet-, mondatkártya- és emlékkártya-tokeneket létrehozni.
3. **Helytörténet-folytatás:** később Ali zsebe jelezheti, melyik helytörténetben járt már a vendég, de pontszám és teljesítési százalék nélkül.
4. **Mırmır-emlék:** a Moda-cameo csak egy későbbi, halk útinapló-rétegben válhat felismeréssé. A mostani történet nem jelenti be.

## 6. Termékdöntés

> **A Place Story System közös gerincet ad, de nem közös dramaturgiát erőltet.**

Az új helytörténet csak akkor készülhet el, ha előre megnevezzük:

- milyen típusú helyélmény;
- mit tud majd a vendég a végén megtenni;
- hogyan változik meg Ali és a vendég kapcsolata;
- mi marad a történetben, és mi kerül a tudásmapra;
- miért van vagy miért nincs jelen Mırmır.

## 7. Következő validációs kérdések

Egy első felhasználói teszten mindkét történet után ezt az öt kérdést tesszük fel:

1. Mi történt veled ezen a helyen?
2. Mit tudsz most megtenni, amit előtte nem?
3. Mikor érezted azt, hogy Ali melletted sétál?
4. Volt olyan pont, ahol nem tudtad, mit olvass vagy nyomj meg?
5. Ha láttál egy macskát, szerinted mi volt a szerepe?

