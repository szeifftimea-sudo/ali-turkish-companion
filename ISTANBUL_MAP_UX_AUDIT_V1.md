# Isztambul várostérkép – UX döntési audit v1.0

**Dátum:** 2026. július 19.  
**Vizsgált oldal:** `isztambul-helyei.html`  
**Nézőpont:** Product Manager · UX · első isztambuli utazás · Ali vendégváró filozófiája

## Rövid ítélet

A térkép jó belépő a lineáris első út utáni világba. Nem próbál navigációs alkalmazás vagy turistalista lenni, és a három ritmus emberibb döntést kínál, mint a klasszikus „Top 10 látnivaló” felosztás.

Skálázásra azonban még nem kész. A Sultanahmet pilot azt bizonyítja, hogy a modell működik történelmi és szakrális környezetben. Egy második, hétköznapi városi történetnek azt kell bizonyítania, hogy ugyanez a rendszer piacnál, helyi életnél és szabadabb sétánál sem válik útikönyvvé.

## Must – a második történet előtt

### 1. Látszódjon, mi meghívás és mi teljes történet

**Kockázat:** a 17 hely vizuálisan hasonló súllyal jelenik meg, miközben csak Sultanahmet teljes helytörténet.  
**Döntés:** a Kék Mecset kártyája `Teljes helytörténet` jelzést kapott. A többi hely meghívás marad; nem kap hamis „hamarosan” ígéretet.

### 2. Mobilon mindhárom térképréteg legyen azonnal érthető

**Kockázat:** a vízszintesen görgethető tabsáv harmadik eleme részben levágódott, ezért a felhasználó nem feltétlenül tudta, hogy van harmadik ritmus.  
**Döntés:** a három réteg mobilon is egyszerre látható, háromoszlopos, tördelhető választó lett.

### 3. A térképről érkező CTA pontos célhoz vezessen

**Kockázat:** egy nem pilot hely CTA-ja csak a kártyaszekció elejére ugrott; nyolc kártyánál a felhasználónak újra meg kellett keresnie a választását.  
**Döntés:** a CTA most közvetlenül a kiválasztott hely kártyájához vezet.

### 4. A második pilot ne Sultanahmet másolata legyen

**Kockázat:** ha a következő történet is híres épületek és történelmi magyarázatok sora, a termék kulturális útikönyvvé válik.  
**Döntés:** a második pilot Kadıköy–Moda. A szervezőelv a helyi nap ritmusa, a piaci választás és a vízpart, nem a műemléki útvonal.

## Should – a Kadıköy–Moda prototípusban

### 5. Egyetlen világos haszon vezesse a történetet

A vendég a történet végére önállóan tudjon:

- kérni egy kóstolót;
- kiválasztani valamit;
- árat kérdezni;
- meghívni Alit egy vízparti sétára.

Nem kell a teljes piaci vagy konyhai tudásmapot a történetbe tenni.

### 6. A döntések változtassanak a jeleneten

A választás ne dekoratív gomb legyen. Ha a vendég kóstolni szeretne, megjelenik a kóstolás nyelvi pillanata. Ha csak nézelődne, Ali nem erőlteti. A végén mindkét út természetesen érkezik Modába.

### 7. A komp csak küszöb legyen

A tízállomásos út már megtanította a `vapur` és az útirány kérdését. Kadıköyben ezt nem tanítjuk újra. A komp a földrajzi és érzelmi átmenetet adja Európából az ázsiai oldal hétköznapjaiba.

### 8. Mırmır csak a csendes lezárásban jelenhet meg

A piacon nem kér figyelmet, nem ül étel mellett, és nem indít interakciót. Egyetlen engedélyezett cameo a Moda-parti lezárás távoli, természetes része lehet.

## Could – csak bizonyított igény után

- hangulati útvonal mentése Ali zsebébe;
- hivatalos kompmenetrend külön úti segítségként;
- Kadıköy és Moda részletes, önálló alkártyái;
- többféle piaci termékág;
- helyszínhez kötött kávézó- vagy étteremajánlás.

Ezek most nem hiányoznak a magélményből, ezért nem kerülnek az első változatba.

## Következő döntési kapu

A Kadıköy–Moda Story Blueprint és az asset brief elfogadása után lehet képet generálni. A következő build akkor indul, ha mind a négy kérdésre igen a válasz:

1. A történet Sultanahmettől eltérő oldalát mutatja Isztambulnak?
2. A vendég egyértelműen tudja, mit csinál és mit visz magával?
3. Ali végig mellette sétál, nem előadást tart?
4. Ha kivesszük a piaci választást vagy a modai lezárást, valóban hiányzik az élmény?
