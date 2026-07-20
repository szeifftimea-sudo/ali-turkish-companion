(() => {
  const source = window.ALI_SITUATION_LIBRARY;
  const pairing = window.ALI_TEXT_PAIRING;
  if (!source || !pairing) return;

  const expectedOrder = {
    2: "tr-hu",
    3: "hu-tr",
    4: "hu-tr",
    5: "hu-tr",
    6: "tr-hu",
    7: "tr-hu",
    8: "tr-hu",
    9: "tr-hu",
    10: "tr-hu"
  };

  const manualSections = new Set([
    "AKM-0449",
    "AKM-0460",
    "AKM-0514",
    "AKM-0600",
    "AKM-0672",
    "AKM-0710",
    "AKM-0721",
    "AKM-0727",
    "AKM-0871",
    "AKM-0911",
    "AKM-0922",
    "AKM-0927",
    "AKM-0940",
    "AKM-1140",
    "AKM-1156",
    "AKM-1207",
    "AKM-1290",
    "AKM-1297",
    "AKM-1465"
  ]);

  const manualSectionTitles = new Map([
    ["AKM-0449", "Gyümölcsök · Meyveler"],
    ["AKM-0460", "Zöldségek · Sebzeler"],
    ["AKM-0514", "Darált húsos padlizsán recept · Karnıyarık tarifi"],
    ["AKM-0600", "Kert · Bahçe"],
    ["AKM-0672", "Testrészek · Vücut kısımları"],
    ["AKM-0710", "Belső szerveink · İç organlarımız"],
    ["AKM-0721", "Gyógyszerszedés · İlaç kullanımı"],
    ["AKM-0727", "Gyógyszerszedési útmutató · İlaç kullanım talimatı"],
    ["AKM-0871", "Török reggeli · Türk kahvaltısı"],
    ["AKM-0911", "Fontosabb élelmiszerek · Gıdalar"],
    ["AKM-0922", "Pékáru · Fırın ürünleri"],
    ["AKM-0927", "Tejtermékek · Süt ürünleri"],
    ["AKM-0940", "Vörös lencseleves · Mercimek çorbası"],
    ["AKM-1140", "Pékség · Fırın"],
    ["AKM-1156", "Gyógyszertár · Eczane"],
    ["AKM-1207", "Hentes · Kasap"],
    ["AKM-1290", "Termékek · Ürünler"],
    ["AKM-1297", "Kis háztartási gépek · Küçük ev aletleri"],
    ["AKM-1465", "Szószedet · Kelimeler"]
  ]);

  const manualNotes = new Map([
    ["AKM-0233", "A magasságot nem szükséges méterben is kimondani: a „bir altmış yedi” alak természetesebb."],
    ["AKM-0852", "Ugyanezt hétköznapibban így is mondhatod: „Tök üres a hűtő, el kell mennünk a közértbe.”"],
    ["AKM-0419", "A „yok” szót tagadáskor is használják, nem csak a „nincs” értelmében."]
  ]);

  const manualPairsById = new Map([
    ["AKM-0004", { turkish: "Nereden geldin? / Nerelisin?", hungarian: "Honnan jöttél? / Honnan származol?" }],
    ["AKM-0006", { turkish: "Ne iş yapıyorsun?", hungarian: "Mi a foglalkozásod?" }],
    ["AKM-0021", { turkish: "Şöyle böyle.", hungarian: "Úgy-ahogy. / Megvagyok." }],
    ["AKM-0022", { turkish: "İş güç.", hungarian: "Dolgozom, teszem a dolgom." }],
    ["AKM-0023", { turkish: "İç güveysinden hallice.", hungarian: "Lehetne rosszabb is. / Megvagyok valahogy." }],
    ["AKM-0040", { turkish: "Bye bye!", hungarian: "Szia!" }],
    ["AKM-0041", { turkish: "Güle güle!", hungarian: "Szia! – ezt az mondja, aki marad." }],
    ["AKM-0086", { turkish: "sekreter, rehber, garson", hungarian: "titkárnő, idegenvezető, pincér" }],
    ["AKM-0119", { turkish: "anne, baba, ebeveyn", hungarian: "anya, apa, szülők" }],
    ["AKM-0120", { turkish: "büyükanne, büyükbaba", hungarian: "nagymama, nagypapa (ebből nem derül ki, hogy az apai vagy az anyai nagyszülőről beszélünk)" }],
    ["AKM-0122", { turkish: "dede", hungarian: "nagypapa (az anya apja)" }],
    ["AKM-0123", { turkish: "anneanne", hungarian: "nagymama (az anya anyja)" }],
    ["AKM-0145", { turkish: "tiyatro, sinema, sergi", hungarian: "színház, mozi, kiállítás" }],
    ["AKM-0211", { turkish: "kahverengi, mavi, yeşil, siyah, gri", hungarian: "barna, kék, zöld, fekete, szürke" }],
    ["AKM-0214", { turkish: "Kara gözlü.", hungarian: "Fekete szemű." }],
    ["AKM-0218", { turkish: "Büyük / küçük burunlu.", hungarian: "Nagy / kis orrú." }],
    ["AKM-0219", { turkish: "Kalkık burnu / yamuk burnu var.", hungarian: "Pisze / görbe orra van." }],
    ["AKM-0224", { turkish: "Makyajlı.", hungarian: "Sminkeli magát." }],
    ["AKM-0231", { turkish: "Ben 1,67 boyundayım. (Bir altmış yedi.)", hungarian: "167 cm magas vagyok." }],
    ["AKM-0234", { turkish: "Oğlum 1,90. (Bir doksan.)", hungarian: "A fiam 190 cm magas." }],
    ["AKM-0237", { turkish: "şişman", hungarian: "kövér" }],
    ["AKM-0238", { turkish: "şişko", hungarian: "duci" }],
    ["AKM-0240", { turkish: "balık etli / dolgun", hungarian: "telt / teltkarcsú" }],
    ["AKM-0241", { turkish: "ayı", hungarian: "medve; emberre mondva: nagyon testes" }],
    ["AKM-0254", { turkish: "Kel.", hungarian: "Kopasz." }],
    ["AKM-0276", { turkish: "Akıllı görünüyor.", hungarian: "Okosnak tűnik." }],
    ["AKM-0285", { turkish: "Sakin.", hungarian: "Nyugodt." }],
    ["AKM-0288", { turkish: "Centilmen / beyefendi.", hungarian: "Udvarias férfi." }],
    ["AKM-0289", { turkish: "Dakik.", hungarian: "Pontos." }],
    ["AKM-0345", { turkish: "çorap, kışlık çorap", hungarian: "zokni / harisnya, téli zokni" }],
    ["AKM-0369", { turkish: "tek renk, desenli, desensiz", hungarian: "egyszínű, mintás, minta nélküli" }],
    ["AKM-0380", { turkish: "bol, dar, uzun, kısa", hungarian: "bő, szűk, hosszú, rövid" }],
    ["AKM-0384", { turkish: "manşet", hungarian: "karöltő / mandzsetta" }],
    ["AKM-0418", { turkish: "Müşteri: Yok, sağ olun.", hungarian: "Vevő: Nem kérek, köszönöm.", consumeNext: false }],
    ["AKM-0452", { turkish: "ahududu, çilek, frenk üzümü", hungarian: "málna, eper, ribizli" }],
    ["AKM-0475", { turkish: "Enfeksiyonlarla savaşır.", hungarian: "Harcol a fertőzések ellen." }],
    ["AKM-0488", { turkish: "Kan temizleyici.", hungarian: "Vértisztító." }],
    ["AKM-0498", { turkish: "Çiğ salataların dışında ızgara ve buharda pişirilmiş sebzeler de Türk mutfağının önemli bir parçası.", hungarian: "A nyers saláták mellett a grillezett és párolt zöldségek is fontos részei a török konyhának.", preserveHungarian: true }],
    ["AKM-0554", { turkish: "Kavanozun kapağının temiz olması önemlidir.", hungarian: "Fontos, hogy az üveg fedele tiszta legyen.", preserveHungarian: true }],
    ["AKM-0556", { turkish: "Kavanozu sıkıca kapatın ve ters çevirin.", hungarian: "Zárjátok le szorosan az üveget, majd fordítsátok fejre.", preserveHungarian: true }],
    ["AKM-0562", { turkish: "oturma odası / salon, misafir odası", hungarian: "nappali / szalon, vendégszoba" }],
    ["AKM-0575", { turkish: "sineklik, panjur, klima", hungarian: "szúnyogháló, redőny, klíma" }],
    ["AKM-0574", { turkish: "battaniye, kapı tokmağı", hungarian: "takaró / pléd, ajtókopogtató" }],
    ["AKM-0577", { turkish: "ampul, ışık anahtarı / komütatör", hungarian: "villanykörte, villanykapcsoló" }],
    ["AKM-0586", { turkish: "şifonyer, portmanto", hungarian: "fiókos szekrény / komód, fogas" }],
    ["AKM-0589", { turkish: "çamaşırlık, kumanda", hungarian: "ruhaszárító, távirányító" }],
    ["AKM-0598", { turkish: "temizlik malzemeleri, ütü masası", hungarian: "tisztítószerek, vasalódeszka" }],
    ["AKM-0601", { turkish: "bahçe, ağaç, meyve ağacı, çalı", hungarian: "kert, fa, gyümölcsfa, bokor" }],
    ["AKM-0664", { turkish: "panik hastalığı, panik atak", hungarian: "pánikbetegség, pánikroham" }],
    ["AKM-0665", { turkish: "kabızlık, ishal, diz ağrısı", hungarian: "székrekedés, hasmenés, térdfájás" }],
    ["AKM-0671", { turkish: "beyin kanaması, kalp krizi", hungarian: "agyvérzés, szívroham" }],
    ["AKM-0675", { turkish: "saç, diş, kulak, kulak memesi", hungarian: "haj, fog, fül, fülcimpa" }],
    ["AKM-0686", { turkish: "baş / kafa, omurga, kaburga", hungarian: "fej, gerinc, borda" }],
    ["AKM-0713", { turkish: "nefes borusu, yemek borusu", hungarian: "légcső, nyelőcső" }],
    ["AKM-0714", { turkish: "idrar yolu", hungarian: "húgyút" }],
    ["AKM-0725", { turkish: "sakinleştirici / müsekkin", hungarian: "nyugtató" }],
    ["AKM-0836", { turkish: "ölçü kabı, düdüklü tencere", hungarian: "mérőtál, kukta" }],
    ["AKM-0840", { turkish: "kızartma tavası, karıştırma kabı", hungarian: "serpenyő, keverőtál" }],
    ["AKM-0842", { turkish: "çaydanlık, kahve makinesi, kettle", hungarian: "teafőző, kávéfőző, vízforraló" }],
    ["AKM-0843", { turkish: "şişe açacağı, mutfak havlusu", hungarian: "üvegnyitó, konyharuha" }],
    ["AKM-0846", { turkish: "çöp kovası, ince belli bardak", hungarian: "szemetes, török teáspohár" }],
    ["AKM-0884", { turkish: "peynir, beyaz peynir", hungarian: "sajt, fehér sajt / a fetához hasonló sajt" }],
    ["AKM-0888", { turkish: "tahin pekmezi", hungarian: "szezámpaszta szőlőmelasszal" }],
    ["AKM-0899", { turkish: "Doyurucu.", hungarian: "Laktató." }],
    ["AKM-0900", { turkish: "Besleyici.", hungarian: "Tápláló." }],
    ["AKM-0901", { turkish: "Lezzetli.", hungarian: "Finom, ízletes." }],
    ["AKM-0917", { turkish: "ayçiçek yağı, zeytinyağı", hungarian: "napraforgóolaj, olívaolaj" }],
    ["AKM-0915", { turkish: "kırmızı mercimek, yeşil mercimek", hungarian: "vörös lencse, zöld lencse" }],
    ["AKM-0928", { turkish: "süt, yoğurt, tereyağı, ayran", hungarian: "tej, joghurt, vaj, sós kefirszerű ital" }],
    ["AKM-0929", { turkish: "krem şanti, kaymak", hungarian: "tejszínhab, sűrű török tejszínkrém" }],
    ["AKM-0939", { turkish: "Laktoz ve gluten alerjim var.", hungarian: "Laktóz- és gluténérzékeny vagyok." }],
    ["AKM-0955", { turkish: "kavurmak", hungarian: "pörkölni, pirítani, lesütni, párolni" }],
    ["AKM-0956", { turkish: "işlem", hungarian: "folyamat, eljárás, procedúra" }],
    ["AKM-0960", { turkish: "süzmek", hungarian: "leszűrni, megszűrni" }],
    ["AKM-0965", { turkish: "malzemeler", hungarian: "hozzávalók" }],
    ["AKM-0980", { turkish: "kilo almak, kilo vermek", hungarian: "hízni, fogyni" }],
    ["AKM-0981", { turkish: "diyet yapmak", hungarian: "diétázni" }],
    ["AKM-0988", { turkish: "yiyecek, meze, ana yemek", hungarian: "étel, előétel, főétel" }],
    ["AKM-0974", { turkish: "Ellerine sağlık!", hungarian: "Egészség a kezedre! / Nagyon finom lett, köszönöm." }],
    ["AKM-0992", { turkish: "Kurt gibi açım.", hungarian: "Farkaséhes vagyok." }],
    ["AKM-1000", { turkish: "Aldırma!", hungarian: "Ne vedd komolyan!" }],
    ["AKM-1001", { turkish: "Bakış açısı", hungarian: "nézőpont, szemszög, szempont" }],
    ["AKM-1004", { turkish: "Düşünceli", hungarian: "figyelmes viselkedés" }],
    ["AKM-1006", { turkish: "Garip", hungarian: "furcsa" }],
    ["AKM-1007", { turkish: "Kaba", hungarian: "tiszteletlen, bunkó" }],
    ["AKM-1009", { turkish: "Özlem", hungarian: "hiány, amikor hiányzik valaki" }],
    ["AKM-1053", { turkish: "Kendini yorma.", hungarian: "Ne fáraszd magad." }],
    ["AKM-1047", { turkish: "Çok mahcup oldum.", hungarian: "Nagyon zavarba jöttem." }],
    ["AKM-1063", { turkish: "Dilimi tutamadım.", hungarian: "Nem tudtam befogni a számat." }],
    ["AKM-1077", { turkish: "Bitirmeme izin ver!", hungarian: "Hadd fejezzem be!" }],
    ["AKM-1081", { turkish: "Sözümü kesmeyi bırakır mısın?", hungarian: "Abbahagynád, hogy folyton a szavamba vágsz?" }],
    ["AKM-1104", { turkish: "kuruyemişçi, balıkçı", hungarian: "magvakat áruló bolt, halasbolt" }],
    ["AKM-1108", { turkish: "eczane, kırtasiye", hungarian: "gyógyszertár, papír-írószer bolt" }],
    ["AKM-1110", { turkish: "kitapçı / kitap evi, döviz", hungarian: "könyvesbolt, pénzváltó" }],
    ["AKM-1111", { turkish: "kıyafet / giysi mağazası / butik", hungarian: "ruházati bolt, butik" }],
    ["AKM-1113", { turkish: "kozmetik mağazası, terzi", hungarian: "drogéria, szabóság" }],
    ["AKM-1142", { turkish: "çavdarlı ekmek, çiçek ekmek / papatya", hungarian: "rozskenyér, sziromra formázott kenyér" }],
    ["AKM-1164", { turkish: "burun spreyi, serum", hungarian: "orrspray, szérum" }],
    ["AKM-1160", { turkish: "öksürük şurubu", hungarian: "köhögés elleni szirup" }],
    ["AKM-1208", { turkish: "tavuk, tavuk göğsü, kanat", hungarian: "csirke, csirkemell, szárny" }],
    ["AKM-1212", { turkish: "ördek eti, hindi eti, kaz eti", hungarian: "kacsahús, pulykahús, libahús" }],
    ["AKM-1213", { turkish: "ciğer, kavurma", hungarian: "máj, pirított / tartósított hús" }],
    ["AKM-1292", { turkish: "derin dondurucu", hungarian: "mélyhűtő" }],
    ["AKM-1298", { turkish: "elektrikli süpürge", hungarian: "porszívó" }],
    ["AKM-1304", { turkish: "tıraş makineleri", hungarian: "elektromos borotva" }],
    ["AKM-1305", { turkish: "baskül", hungarian: "szobamérleg" }],
    ["AKM-1365", { turkish: "dil kitapları, roman", hungarian: "nyelvkönyvek, regény" }],
    ["AKM-1367", { turkish: "yemek tarifi kitabı, defter", hungarian: "receptkönyv, füzet" }],
    ["AKM-1370", { turkish: "ders kitabı, çalışma kitabı", hungarian: "tankönyv, munkafüzet" }],
    ["AKM-1371", { turkish: "ajanda, takvim, gazete", hungarian: "határidőnapló, naptár, újság" }],
    ["AKM-1408", { turkish: "şirket, şahsi şirket, vakıf", hungarian: "cég, egyéni vállalkozás, alapítvány" }],
    ["AKM-1413", { turkish: "bütçe, kalite, stopaj vergisi", hungarian: "költségvetés, minőség, kamatadó" }],
    ["AKM-1474", { turkish: "fiş", hungarian: "dugvilla / csatlakozó" }]
  ]);

  const headingPatterns = [
    /^bemutatkozás/i,
    /^alap társalgás$/i,
    /^egyéb köszönési/i,
    /^így mutatkozz be/i,
    /^származási hely$/i,
    /^néhány nemzetiség/i,
    /^mi a foglalkozásod/i,
    /^gyakoribb munkahelyek/i,
    /^család\b/i,
    /^fontosabb rokoni/i,
    /^szabadidő$/i,
    /^néhány tevékenység/i,
    /^rövid ismerkedő/i,
    /^a párbeszéd magyarul/i,
    /^az arc\b/i,
    /^testalkat/i,
    /^haj\b/i,
    /^öltözék/i,
    /^kiegészítők/i,
    /^jellemvonások/i,
    /^ruhaneműk/i,
    /^meyveler$/i,
    /^gyümölcsök$/i,
    /^sebzeler$/i,
    /^zöldségek$/i,
    /^a ház részei$/i,
    /^bútorok\b/i,
    /^kert$/i,
    /^néhány betegség/i,
    /^testrészek/i,
    /^konyhai eszközök/i,
    /^konyhai berendezések/i,
    /^türk kahvaltısı$/i,
    /^fontosabb igék$/i,
    /^néhány érdekes bolt/i,
    /^milyoncu$/i,
    /^tuhafiye$/i,
    /^nalbur$/i,
    /^bizim evimiz$/i,
    /^limonun etkileri$/i,
    /^zöldségek a török konyhában$/i,
    /^szószedet$/i,
    /^banki ügyintézés$/i,
    /^cuki verzió/i,
    /^kövér\s*[–—-]\s*vékony\s*[–—-]\s*molett$/i,
    /^gazdaság\b/i,
    /^megtakarítás\b/i
  ];

  const notePatterns = [
    /^ebben a leckében/i,
    /^válaszként/i,
    /^[„“\"]?(általában|napnyugta után)/i,
    /^ezt akkor/i,
    /^a török (kultúrában|nyelvben)/i,
    /^amikor\b/i,
    /^azért\b/i,
    /^figyelem/i,
    /^megjegyzés/i,
    /^ha azt szeretnénk/i,
    /^ezt a következőképpen/i,
    /^a kép/i,
    /^megoldás/i,
    /^írd (át|le)/i,
    /^túlságosan/i,
    /^egy helyzetet/i,
    /^számunkra/i,
    /^pl\./i
  ];

  function manualKey(text) {
    return String(text || "")
      .toLocaleLowerCase("tr-TR")
      .replace(/[’'\".?!…]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  const manualPairs = new Map([
    ["amca kızı / amca oğlu’.", ["amca kızı / amca oğlu", "az apai nagybácsi lánya / fia"]],
    ["Oğlumun boyu 1.90 (bir doksan)", ["Oğlumun boyu 1.90 (bir doksan).", "A fiam 190 centiméter magas."]],
    ["tombilik, tombik, tontiş, tombul, domdom, dombili, pofuduk", ["tombilik, tombik, tontiş, tombul, domdom, dombili, pofuduk", "becéző szavak ducira, pufira"]],
    ["Neşeli, sevinçli, şakacı kişiliği var.", ["Neşeli, sevinçli, şakacı kişiliği var.", "Vidám, jókedvű, tréfás természete van."]],
    ["1 adet kuru soğan 1 db vöröshagyma", ["1 adet kuru soğan", "1 darab vöröshagyma"]],
    ["Evinin büyüklüğü ne kadar?", ["Evinin büyüklüğü ne kadar?", "Mekkora az otthonod?"]],
    ["Kahvaltıda besleyici yiyecekler yememiz önemlidir bence.", ["Kahvaltıda besleyici yiyecekler yememiz önemlidir bence.", "Szerintem fontos tápláló ételeket ennünk reggelire."]],
    ["Aynı egyforma", ["Aynı", "egyforma"]],
    ["bir şeyler atıştırmak gyorsan bekapni valamit", ["bir şeyler atıştırmak", "bekapni valamit, nassolni"]],
    ["Buna bayıldım. – nagyon klassz, nagyon tetszik", ["Buna bayıldım.", "Nagyon klassz, nagyon tetszik."]],
    ["Bakalım bu dükkanlardan neler satın alabiliriz", ["Bakalım bu dükkanlardan neler satın alabiliriz.", "Nézzük, mit vásárolhatunk ezekben az üzletekben."]],
    ["şiir kitabı, masal kitabı verses kötet, mesekönyv", ["şiir kitabı, masal kitabı", "verseskötet, mesekönyv"]],
    ["Müşteri bankaya giriyor. Bankanın içindeki numaratöre ilk önce kimlik numarasını giriyor ve sonra yapmak istediği işlemi seçiyor. Numaratör sıra sayısı veriyor ve müşteri bekliyor. Sıra ona geldiği zaman bankacının yanına gidiyor ve ne yapmak istediğini söylüyor.", ["Müşteri bankaya giriyor. Bankanın içindeki numaratöre ilk önce kimlik numarasını giriyor ve sonra yapmak istediği işlemi seçiyor. Numaratör sıra sayısı veriyor ve müşteri bekliyor. Sıra ona geldiği zaman bankacının yanına gidiyor ve ne yapmak istediğini söylüyor.", "Az ügyfél belép a bankba. A sorszámkiadó automatán először megadja a személyi azonosítóját, majd kiválasztja az ügyintézés típusát. Sorszámot kap, várakozik, végül a banki ügyintézőnél elmondja, mit szeretne intézni."]]
  ].map(([key, pair]) => [manualKey(key), { turkish: pair[0], hungarian: pair[1] }]));

  [
    ["Benim adım Ali, benim soyadım Tekin.", "A nevem Ali, a vezetéknevem Tekin."],
    ["futbol oynamak, spor yapmak", "focizni, sportolni"],
    ["yabancı dil öğrenmek", "idegen nyelvet tanulni"],
    ["giymek", "hordani, viselni valamit"],
    ["Gözlüklü.", "Szemüveges."],
    ["Stresli görünüyor.", "Stresszesnek tűnik."],
    ["Proteinler doyurucu.", "A fehérjék laktatóak."],
    ["galeta unu", "zsemlemorzsa"],
    ["sürdürmek", "folytatni, fenntartani"],
    ["abur cubur yemek", "nassolni"],
    ["antibiyotik, hap", "antibiotikum, tabletta"]
  ].forEach(([turkish, hungarian]) => {
    const sourceTexts = [
      turkish,
      `${turkish} ${hungarian}`,
      `${turkish} - ${hungarian}`,
      `${hungarian} ${turkish}`
    ];
    sourceTexts.forEach((sourceText) => manualPairs.set(manualKey(sourceText), { turkish, hungarian }));
  });

  [
    ["futbol oynamak, spor yapmak - focizni, sportolni", "futbol oynamak, spor yapmak", "focizni, sportolni"],
    ["yabancı dil öğrenmek - nyelvet tanulni", "yabancı dil öğrenmek", "idegen nyelvet tanulni"],
    ["giymek - hord/visel valamit", "giymek", "hordani, viselni valamit"],
    ["zsemlemorzsa galeta unu", "galeta unu", "zsemlemorzsa"],
    ["sürdürmek folytatni, fenntartani", "sürdürmek", "folytatni, fenntartani"],
    ["abur cubur yemek nassolni", "abur cubur yemek", "nassolni"],
    ["antibiyotik, hap antibiotikum, tabletta", "antibiyotik, hap", "antibiotikum, tabletta"],
    ["enişte - sógor (lánytestvér férje)", "enişte", "sógor (a lánytestvér férje)"],
    ["Dilimlenmiş mi olsun? Szeletelt legyen?", "Dilimlenmiş mi olsun?", "Szeletelt legyen?"],
    ["öğle yemeği yemek ebédelni", "öğle yemeği yemek", "ebédelni"],
    ["akşam yemeği yemek vacsorázni", "akşam yemeği yemek", "vacsorázni"],
    ["Zahmet etme. Ne fáradj.", "Zahmet etme.", "Ne fáradj."],
    ["Endişe etme. Ne aggódj.", "Endişe etme.", "Ne aggódj."],
    ["Beni dert etme. Miattam ne fáradj / ne csinálj magadnak gondot.", "Beni dert etme.", "Miattam ne fáradj, ne csinálj magadnak gondot."],
    ["ayakkabı dükkanı / ayakkabıcı cipőbolt", "ayakkabı dükkanı / ayakkabıcı", "cipőbolt"]
    , ["gallér, gallér nélküli yaka, yakasız", "yaka, yakasız", "gallér, gallér nélküli"]
    , ["leander, krizantém, orchidea zakkum, krizantem, orkide", "zakkum, krizantem, orkide", "leander, krizantém, orchidea"]
    , ["vitamin, ağrı kesici, krem vitamin, fájdalomcsillapító, krém", "vitamin, ağrı kesici, krem", "vitamin, fájdalomcsillapító, krém"]
    , ["Buzdolabı bomboş, markete çıkmamız lazım.", "Buzdolabı bomboş, markete çıkmamız lazım.", "A hűtő teljesen üres, el kell mennünk a boltba."]
    , ["Düşünemedim. Nem tudtam átgondolni.", "Düşünemedim.", "Nem tudtam átgondolni."]
    , ["Bir saat sonra görüşmek üzere.", "Bir saat sonra görüşmek üzere.", "Találkozunk egy óra múlva."]
    , ["Türkler çok çeşitli sebze yerler.", "Türkler çok çeşitli sebze yerler.", "A törökök nagyon sokféle zöldséget esznek."]
    , ["Patlıcanla mezeler, soğuk ve sıcak ana yemekler de yapıyorlar.", "Patlıcanla mezeler, soğuk ve sıcak ana yemekler de yapıyorlar.", "Padlizsánból mezéket, hideg és meleg főételeket is készítenek."]
    , ["Patlıcanları alacalı soyup biraz yağlayın ve fırına verin. 180 derecede yumuşayana kadar pişirin.", "Patlıcanları alacalı soyup biraz yağlayın ve fırına verin. 180 derecede yumuşayana kadar pişirin.", "A padlizsánokat csíkosan hámozzuk meg, olajozzuk be, és 180 fokon süssük puhára."]
    , ["Fırından çıkan patlıcanların karnını yarıp içine kıymayı pay edin.", "Fırından çıkan patlıcanların karnını yarıp içine kıymayı pay edin.", "A megsült padlizsánokat nyissuk szét, és osszuk el bennük a darált húst."]
    , ["Afiyet olsun!", "Afiyet olsun!", "Jó étvágyat!"]
    , ["Kavanoza bir parmak eksik doldurun, ağzına kadar değil.", "Kavanoza bir parmak eksik doldurun, ağzına kadar değil.", "Egy ujjnyi helyet kihagyva töltsük meg az üveget."]
    , ["Bütün gün kafam zonkluyor.", "Bütün gün kafam zonkluyor.", "Majd szétmegy a fejem egész nap."]
    , ["Babam kalp krizinden öldü.", "Babam kalp krizinden öldü.", "Az apám szívinfarktusban halt meg."]
    , ["İlacınızı doktorunuzun önerdiği şekilde almayı unutmayın.", "İlacınızı doktorunuzun önerdiği şekilde almayı unutmayın.", "Ne felejtse el az orvosa javaslata szerint bevenni a gyógyszerét."]
    , ["Her yemekte bir çeşit salata bulunur.", "Her yemekte bir çeşit salata bulunur.", "Minden étkezéshez tartozik valamilyen saláta."]
    , ["Bizim en sevdiğimiz patlıcan yemekleri hünkar beğendi ve karnıyarık.", "Bizim en sevdiğimiz patlıcan yemekleri hünkar beğendi ve karnıyarık.", "A kedvenc padlizsános ételeink a hünkar beğendi és a karnıyarık."]
    , ["Kıymayı tencerede kavurun. Suyunu çekince soğanı, yağı ve salçayı ekleyip kavurun.", "Kıymayı tencerede kavurun. Suyunu çekince soğanı, yağı ve salçayı ekleyip kavurun.", "Pároljuk meg a darált húst, majd adjuk hozzá a hagymát, az olajat és a paradicsompürét."]
    , ["Domates ve biberi üstüne koyalım, suyu ve salçayı karıştırıp eritin.", "Domates ve biberi üstüne koyalım, suyu ve salçayı karıştırıp eritin.", "Tegyük rá a paradicsomot és a paprikát, majd keverjük el a paradicsompürét a vízzel."]
    , ["Kavanozun kapağının temiz olması önemlidir.", "Kavanozun kapağının temiz olması önemlidir.", "Fontos, hogy az üveg fedele tiszta legyen."]
    , ["Çiğ salataların dışında ızgara ve buharda pişirilmiş sebzeler de Türk mutfağının önemli bir parçası.", "Çiğ salataların dışında ızgara ve buharda pişirilmiş sebzeler de Türk mutfağının önemli bir parçası.", "A nyers saláták mellett a grillezett és párolt zöldségek is fontos részei a török konyhának."]
    , ["Çoğu yemeğe domates salçası da eklenir.", "Çoğu yemeğe domates salçası da eklenir.", "A legtöbb ételbe sűrített paradicsomot is tesznek."]
    , ["Biraz su ekleyerek kısık ateşte pişmeye bırakın.", "Biraz su ekleyerek kısık ateşte pişmeye bırakın.", "Adjunk hozzá kevés vizet, és hagyjuk alacsony lángon főni."]
    , ["180 derecede 20 dakika pişirin.", "180 derecede 20 dakika pişirin.", "Süssük 180 fokon 20 percig."]
    , ["Kavanozu sıkıca kapatın ve ters çevirin.", "Kavanozu sıkıca kapatın ve ters çevirin.", "Zárjuk le szorosan az üveget, majd fordítsuk fejre."]
    , ["Yaz aylarında biber ve patlıcanlar mevsimi geldiğinde kesilerek kışlık sebze söğütleri yapılır.", "Yaz aylarında biber ve patlıcanlar mevsimi geldiğinde kesilerek kışlık sebze söğütleri yapılır.", "Nyáron a paprikát és a padlizsánt a szezonjukban feldarabolják, és télire szárítják."]
    , ["merhem, krem, fitil kenőcs, krém, kúp", "merhem, krem, fitil", "kenőcs, krém, kúp"]
    , ["ilave etmek kiegészíteni, pótolni, toldani", "ilave etmek", "kiegészíteni, pótolni, toldani"]
    , ["Yeter artık, kes şunu! Elég legyen, fejezd már be!", "Yeter artık, kes şunu!", "Elég legyen, fejezd már be!"]
    , ["Patlıcan birçok farklı şekilde hazırlanır.", "Patlıcan birçok farklı şekilde hazırlanır.", "A padlizsánt sokféleképpen készítik el."]
    , ["Unut gitsin! Ne is foglalkozz vele!", "Unut gitsin!", "Ne is foglalkozz vele!"]
    , ["Olağandışı bir şey fark ettin mi? Észrevettél valami szokatlant?", "Olağandışı bir şey fark ettin mi?", "Észrevettél valami szokatlant?"]
    , ["İlginç bir şey dikkatini çekti mi? Felfigyeltél valami érdekesre?", "İlginç bir şey dikkatini çekti mi?", "Felfigyeltél valami érdekesre?"]
    , ["Afiyet olsun! Jó étvágyat!", "Afiyet olsun!", "Jó étvágyat!"]
    , ["Beni sinir ediyorsun. Ezzel csak felidegesítesz.", "Beni sinir ediyorsun.", "Ezzel csak felidegesítesz."]
    , ["Beni deli ediyor. Már teljesen megőrjít.", "Beni deli ediyor.", "Már teljesen megőrjít."]
    , ["Büyük küçük ağzı var. Nagy/kicsi szája van.", "Büyük küçük ağzı var.", "Nagy/kicsi szája van."]
    , ["Kalın dudaklı ince dudaklı vastag szájú, vékony szájú", "Kalın dudaklı / ince dudaklı", "vastag szájú / vékony szájú"]
    , ["Büyük - küçük ağzı var. Nagy/kicsi szája van.", "Büyük / küçük ağzı var.", "Nagy / kicsi szája van."]
    , ["Kalın dudaklı - ince dudaklı vastag szájú, vékony szájú", "Kalın dudaklı / ince dudaklı", "vastag szájú / vékony szájú"]
    , ["Kan yapar. Vérképző", "Kan yapar.", "Vérképző."]
    , ["Kalın etli domatesleri tercih edin. Vastag húsú paradicsomot válasszatok", "Kalın etli domatesleri tercih edin.", "Vastag húsú paradicsomot válasszatok."]
    , ["Seni çok özlüyorum. Nagyon hiányzol.", "Seni çok özlüyorum.", "Nagyon hiányzol."]
  ].forEach(([sourceText, turkish, hungarian]) => {
    manualPairs.set(manualKey(sourceText), { turkish, hungarian });
  });

  function manualPairFor(text) {
    return manualPairs.get(manualKey(text)) || null;
  }

  function manualPairForEntry(entry) {
    return manualPairsById.get(entry.id) || manualPairsById.get(String(entry.id).split("+")[0]) || manualPairFor(entry.text);
  }

  function isSpeakerLine(entry) {
    return /^(?:Ali|Beyza|Ömer|İmre|Satıcı|Müşteri|Eczacı|Kasap|Fırıncı|Bankacı|Eladó|Vevő|Ügyintéző|Gyógyszerész|Hentes|Vásárló)\s*(?::|[–—-])\s*/u.test(String(entry && entry.text || ""));
  }

  function wordCount(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }

  function isHeading(entry, topic) {
    const text = entry.text.trim();
    if (manualSections.has(entry.id)) return true;
    if (manualPairsById.has(entry.id) || isSpeakerLine(entry)) return false;
    if (entry.kind === "section") return true;
    if (headingPatterns.some((pattern) => pattern.test(text))) return true;
    if (/[?]/.test(text)) return false;
    if (/[:：]\s*$/.test(text) && wordCount(text) <= 8) return true;
    if (entry.page === 1 && wordCount(text) <= 7 && /^[A-ZÁÉÍÓÖŐÚÜŰİŞĞÇ]/.test(text) && !/[?.]/.test(text)) return true;
    return false;
  }

  function isNote(entry) {
    const text = entry.text.trim();
    if (manualNotes.has(entry.id)) return true;
    if (isSpeakerLine(entry)) return false;
    const language = pairing.detectLanguage(text);
    if (notePatterns.some((pattern) => pattern.test(text))) return true;
    if (language === "hu" && text.length > 145) return true;
    if (language === "hu" && /^[„“\"]/.test(text)) return true;
    return false;
  }

  function family(kind) {
    if (["sentence", "dialogue"].includes(kind)) return "sentence";
    if (["phrase", "vocabulary"].includes(kind)) return "word";
    return kind;
  }

  function rawUnits(entry) {
    return Number(entry._rawCount || 1);
  }

  function mergeWrappedRows(entries, topic) {
    const merged = [];
    let index = 0;
    while (index < entries.length) {
      let current = { ...entries[index], _rawCount: rawUnits(entries[index]) };
      while (entries[index + 1]) {
        const next = entries[index + 1];
        const currentLanguage = pairing.detectLanguage(current.text);
        const nextLanguage = pairing.detectLanguage(next.text);
        const currentOpen = /-$/.test(current.text.trim()) || !/[.!?…:;”’)]$/.test(current.text.trim());
        const nextLooksLikeContinuation = /^[a-záéíóöőúüűıişğç]/.test(next.text.trim()) || wordCount(next.text) <= 4;
        const sameLanguage = currentLanguage && (currentLanguage === nextLanguage || !nextLanguage);
        const wrappedTextRow = current.kind === "vocabulary" && next.kind === "sentence" && current.text.length >= 30;
        const longEnough = current.text.length >= 62 || /-$/.test(current.text.trim()) || wrappedTextRow;
        const safeKinds = current.kind !== "section" && next.kind !== "section";
        const safeStructure = !isHeading(current, topic) && !isHeading(next, topic) && !pairing.splitBilingual(current.text, topic.sourceDoc, current.kind) && !pairing.splitBilingual(next.text, topic.sourceDoc, next.kind);
        if (current.page !== next.page || !currentOpen || !nextLooksLikeContinuation || !sameLanguage || !longEnough || !safeKinds || !safeStructure) break;

        const joinsWithoutSpace = /-$/.test(current.text.trim());
        current = {
          ...current,
          id: `${current.id}+${next.id}`,
          kind: current.kind === "dialogue" ? "dialogue" : (current.kind === "sentence" || next.kind === "sentence" ? "sentence" : current.kind),
          text: `${current.text.replace(/-\s*$/, "")}${joinsWithoutSpace ? "" : " "}${next.text}`,
          _rawCount: rawUnits(current) + rawUnits(next)
        };
        index += 1;
      }
      merged.push(current);
      index += 1;
    }
    return merged;
  }

  function canCluster(entry, topic) {
    if (!entry || isHeading(entry, topic) || isNote(entry)) return false;
    if (manualPairForEntry(entry)) return false;
    if (pairing.splitBilingual(entry.text, topic.sourceDoc, entry.kind)) return false;
    return Boolean(pairing.detectLanguage(entry.text));
  }

  function groupLines(lines, language) {
    return lines.map((entry) => entry.text.trim()).filter(Boolean).join("\n");
  }

  function makePair(leftGroup, rightGroup, leftLanguage) {
    const all = [...leftGroup, ...rightGroup];
    const leftText = groupLines(leftGroup, leftLanguage);
    const rightText = groupLines(rightGroup, leftLanguage === "tr" ? "hu" : "tr");
    return {
      id: all.map((entry) => entry.id).join("+"),
      kind: "pair",
      family: all.some((entry) => family(entry.kind) === "sentence") ? "sentence" : "word",
      page: all[0].page,
      rawCount: all.reduce((sum, entry) => sum + rawUnits(entry), 0),
      pair: leftLanguage === "tr" ? { turkish: leftText, hungarian: rightText } : { turkish: rightText, hungarian: leftText },
      text: all.map((entry) => entry.text).join(" ")
    };
  }

  function sourceNumbers(card) {
    return (String(card && card.id || "").match(/AKM-(\d+)/g) || [])
      .map((value) => Number(value.slice(4)))
      .filter(Number.isFinite);
  }

  function touchesRange(card, range) {
    if (!range) return false;
    return sourceNumbers(card).some((number) => number >= range[0] && number <= range[1]);
  }

  function sideText(card, language) {
    if (card.pair) return language === "tr" ? card.pair.turkish : card.pair.hungarian;
    const detected = card.language || pairing.detectLanguage(card.text);
    if (detected !== language) return "";
    if (Array.isArray(card.lines)) return card.lines.join("\n");
    return card.text || "";
  }

  function joinSide(cards, language) {
    return cards
      .map((card) => sideText(card, language))
      .map((text) => String(text || "").trim())
      .filter(Boolean)
      .join("\n");
  }

  const translatedRanges = [
    { tr: [154, 180], hu: [182, 207], consume: [[181, 181]] },
    { tr: [388, 420], hu: [422, 444], consume: [[421, 421]] },
    { tr: [634, 646], hu: [647, 658] },
    { tr: [765, 781], hu: [791, 809], consume: [[790, 790]] },
    { tr: [810, 818], hu: [820, 827], consume: [[819, 819]] },
    { tr: [890, 897], hu: [903, 910] },
    { tr: [1167, 1186], hu: [1187, 1206] },
    { tr: [1218, 1237], hu: [1238, 1256] },
    { tr: [1264, 1277], hu: [1278, 1288], hungarianPrefix: "Te melyikeket szoktad megmosni ezek közül?" },
    { tr: [1307, 1335], hu: [1336, 1362] },
    { tr: [1373, 1384], hu: [1385, 1396] },
    { tr: [1431, 1437], hu: [1438, 1445] },
    { tr: [1446, 1454], hu: [1455, 1464] },
    { tr: [1477, 1494], hu: [1495, 1512] },
    { tr: [1513, 1543], hu: [1544, 1574] }
  ];

  const manuallyTranslatedRanges = [
    {
      source: [301, 304],
      hungarian: "Ez a nő vékony, nem kövér. Egyszínű ruhát visel. Hosszú, barna haja van. Nem visel ékszert."
    },
    {
      source: [306, 308],
      hungarian: "Lapos sarkú cipőt visel. Nem visel övet. Egyenes a haja."
    },
    {
      source: [318, 324],
      hungarian: "A férfi narancssárga pulóvert visel. Rövid, fekete haja van, órát hord, szakálla és bajusza nincs. Szerintem közepes termetű, talán 176 centiméter magas. Stresszesnek, pontosnak és okosnak tűnik; komoly a megjelenése."
    },
    {
      source: [755, 763],
      hungarian: "Ali: Hogy van a nővéred?\nBeyza: Hála istennek, ma már jobban.\nAli: Mit mondott az orvos a vizsgálat után?\nBeyza: Minden rendben van, nincs ok az aggodalomra. A műtét sikeres volt, de a felépüléshez természetesen kell még egy kis idő – mondta.\nAli: Ez nagyszerű hír, örülök neki.\nBeyza: Igen, minden jól alakul.\nAli: Add át neki az üdvözletemet, és jobbulást kívánok! Vigyázzon magára!"
    },
    {
      source: [872, 877],
      turkish: "Kahvaltı Türk insanının hayatında önemli bir öğündür. Kahvaltı aynı zamanda sosyal bir aktivite olduğu için Türkiye genelinde çok kahvaltı mekanı var. Bakalım Türkler kahvaltıda ne yiyor?",
      hungarian: "A török emberek életében fontos étkezés a reggeli. Mivel egyben társasági program is, Törökország-szerte sok reggelizőhely van. Nézzük, mit esznek a törökök reggelire!"
    },
    {
      source: [943, 951],
      hungarian: "Tegyél két evőkanál olajat egy mély lábasba. Add hozzá a durvára vágott hagymát, és pirítsd meg. Szórj rá egy evőkanál lisztet, majd pirítsd tovább, amíg illatos és enyhén színes lesz. Add hozzá a burgonyát és a sárgarépát, és keverd össze alaposan. Mosd meg bő vízben a lencsét, csepegtesd le, majd ezt is add a lábashoz. Keverd át még egyszer, fedd le, és közepes lángon főzd addig, amíg a zöldségek megpuhulnak. Végül botmixerrel turmixold simára."
    },
    {
      source: [1148, 1155],
      hungarian: "Vásárló: Jó napot! Kérek két simitet, egy korpás kenyeret és egy sajtos poğaçát.\nPék: Természetesen. Felszeleteljem a kenyereket?\nVásárló: Nem, köszönöm.\nPék: Kér zacskót?\nVásárló: Nem kérek. Mennyivel tartozom?\nPék: Ötven lírával.\nVásárló: Tessék. Jó munkát!\nPék: Szép napot!"
    }
  ];

  function mergeTranslatedCard(cards, config) {
    const trCards = config.tr ? cards.filter((card) => touchesRange(card, config.tr)) : cards.filter((card) => touchesRange(card, config.source));
    const huCards = config.hu ? cards.filter((card) => touchesRange(card, config.hu)) : [];
    const extraCards = (config.consume || []).flatMap((range) => cards.filter((card) => touchesRange(card, range)));
    const consumed = [...new Set([...trCards, ...huCards, ...extraCards])];
    if (!consumed.length) return cards;

    const turkish = String(config.turkish || joinSide(trCards, "tr")).trim();
    let hungarian = String(config.hungarian || joinSide(huCards, "hu")).trim();
    if (config.hungarianPrefix) hungarian = `${config.hungarianPrefix}\n${hungarian}`;
    hungarian = hungarian
      .replace(/szükségetelen/gi, "szükségtelen")
      .replace(/sorszám autómatába/gi, "sorszámkiadó automatába")
      .replace(/személyiigazolvány/gi, "személyi igazolvány")
      .replace(/netbank-ja/gi, "netbankja")
      .replace(/mintjár/gi, "mindjárt")
      .replace(/Viszont látásra/gi, "Viszontlátásra")
      .replace(/Fog mosás/gi, "Fogmosás")
      .replace(/leellenőrizni/gi, "ellenőrizni")
      .replace(/minden hó hanyadikán/gi, "a hónap melyik napján")
      .replace(/(\d)\.(\d{3})\s+Líra/g, "$1 $2 líra")
      .replace(/\bLírát\b/g, "lírát")
      .replace(/\bLíra\b/g, "líra");
    if (!turkish || !hungarian) return cards;

    const insertionIndex = Math.min(...consumed.map((card) => cards.indexOf(card)));
    const mergedCard = {
      id: consumed.map((card) => card.id).join("+"),
      kind: "example",
      family: "sentence",
      page: consumed[0].page,
      rawCount: consumed.reduce((sum, card) => sum + Number(card.rawCount || rawUnits(card)), 0),
      pair: { turkish, hungarian },
      text: `${turkish} ${hungarian}`
    };
    const remaining = cards.filter((card) => !consumed.includes(card));
    remaining.splice(insertionIndex, 0, mergedCard);
    return remaining;
  }

  function finalizeCards(cards) {
    let finalized = cards;
    translatedRanges.forEach((config) => {
      finalized = mergeTranslatedCard(finalized, config);
    });
    manuallyTranslatedRanges.forEach((config) => {
      finalized = mergeTranslatedCard(finalized, config);
    });
    return finalized;
  }

  function normalizeTopic(topic) {
    const rows = mergeWrappedRows(topic.entries, topic);
    const cards = [];
    let index = 0;

    function takeThrough(endId) {
      const taken = [];
      while (rows[index] && rows[index].page === rows[taken.length ? index - 1 : index].page) {
        const row = rows[index];
        taken.push(row);
        index += 1;
        if (row.id.split("+").includes(endId)) break;
      }
      return taken;
    }

    function pushTextBlock(kind, endId, replacementText) {
      const block = takeThrough(endId);
      const text = replacementText || block.map((item) => item.text).join(" ");
      cards.push({
        id: block.map((item) => item.id).join("+"),
        kind,
        family: kind === "note" ? "note" : "sentence",
        language: kind === "example" ? pairing.detectLanguage(text) : undefined,
        page: block[0].page,
        rawCount: block.reduce((sum, item) => sum + rawUnits(item), 0),
        ...(kind === "example" ? { lines: [text] } : {}),
        text
      });
    }

    while (index < rows.length) {
      const entry = rows[index];

      if (entry.id === "AKM-0014") {
        const block = takeThrough("AKM-0016");
        cards.push({
          id: "AKM-0014",
          kind: "pair",
          family: "sentence",
          page: entry.page,
          rawCount: rawUnits(block[0]),
          pair: {
            turkish: "Merhaba! Nasılsın? / Nasılsınız? / Ne haber? / Ne var ne yok?",
            hungarian: "Szia! Hogy vagy? / Mi újság?"
          },
          text: block[0].text
        });
        cards.push({
          id: block.slice(1).map((item) => item.id).join("+"),
          kind: "pair",
          family: "sentence",
          page: entry.page,
          rawCount: block.slice(1).reduce((sum, item) => sum + rawUnits(item), 0),
          pair: {
            turkish: "Nasıl gidiyor?",
            hungarian: "Hogy mennek a dolgok? / Hogy vagy?"
          },
          text: block.slice(1).map((item) => item.text).join(" ")
        });
        continue;
      }

      if (entry.id === "AKM-0182") {
        pushTextBlock("example", "AKM-0193");
        continue;
      }

      if (entry.id === "AKM-0194") {
        pushTextBlock("example", "AKM-0207");
        continue;
      }

      if (entry.id === "AKM-0327") {
        const block = takeThrough("AKM-0339");
        cards.push({
          id: block.map((item) => item.id).join("+"),
          kind: "pair",
          family: "sentence",
          page: entry.page,
          rawCount: block.reduce((sum, item) => sum + rawUnits(item), 0),
          pair: {
            turkish: "Bu kadın uzun kahverengi saçlı. / Kumral uzun saçlı bir bayan. Kırmızı elbise giyiyor. İnce vücudu var. Siyah topuklu ayakkabılar giyiyor. Elinde bir dosya, diğer elinde bir çanta var. Bence sempatik ve neşeli bir kişiliği var.",
            hungarian: "Hosszú, barna hajú nő. Piros ruhát és fekete magas sarkú cipőt visel. Vékony testalkatú. Táska és dosszié van nála. Szerintem szimpatikus, vidám természetű."
          },
          text: block.map((item) => item.text).join(" ")
        });
        continue;
      }

      if (entry.id.split("+")[0] === "AKM-0430") {
        pushTextBlock("example", "AKM-0444");
        continue;
      }

      if (entry.id === "AKM-0445") {
        const block = takeThrough("AKM-0448");
        cards.push({
          id: block.map((item) => item.id).join("+"),
          kind: "section",
          family: "section",
          page: entry.page,
          rawCount: block.reduce((sum, item) => sum + rawUnits(item), 0),
          text: "Gyümölcsök és zöldségek · Meyveler ve sebzeler"
        });
        continue;
      }

      if (entry.id === "AKM-0647") {
        pushTextBlock("example", "AKM-0658", "A mi házunk. Egy kétszintes, kertes házban lakunk, nem messze a városközponttól. A házunk 150 négyzetméteres; három szoba és két hálószoba van benne. Az előszoba mellett található az étkező és a konyha. A konyhánk nagy, mert nagyon szeretek főzni, és sok időt töltök ott. Az étkezőasztal kerek, a székek pedig kényelmesek. A fürdőszobában kád és zuhanykabin is van. A hálószobánk a gyerekszoba mellett van. A nappali tágas, ülőgarnitúra és két fotel is van benne. A televízió a falon van, mellette képek és egy falóra. Szeretjük a növényeket, ezért sok virág van a szobákban. Az emeleten egy vendégszoba és egy fürdőszoba található. Szép nagy teraszunk van, ahonnan belátni az egész kertet. A kertben gyümölcsfák és sok rózsa nő. Két kutyánk és egy macskánk is van, akiket nagyon szeretünk.");
        continue;
      }

      if (entry.id.split("+")[0] === "AKM-1278") {
        pushTextBlock("example", "AKM-1288", "Csirkehús és vörös hús: a nyers csirke és a vörös hús sok baktériumot és kórokozót tartalmazhat. Mosásukkor ezek a konyha olyan részeire is eljuthatnak, ahol nem számítanánk rájuk. Gomba: szivacsos szerkezete miatt mosáskor vizet és szennyeződéseket szívhat magába. Tisztítsuk hámozással, majd alapos törléssel. Tojás: a héján szalmonella lehet, ezért csak közvetlenül felhasználás előtt mossuk meg.");
        continue;
      }

      if (entry.id === "AKM-0103") {
        pushTextBlock("note", "AKM-0109");
        continue;
      }

      if (entry.id === "AKM-0115") {
        pushTextBlock("note", "AKM-0117");
        continue;
      }

      if (entry.id === "AKM-0134") {
        const block = takeThrough("AKM-0136");
        cards.push({
          id: block.map((item) => item.id).join("+"),
          kind: "pair",
          family: "word",
          page: entry.page,
          rawCount: block.reduce((sum, item) => sum + rawUnits(item), 0),
          pair: {
            turkish: "yenge",
            hungarian: "Elsődlegesen a nagybácsi felesége, de nem feltétlenül kell hozzá rokoni kapcsolat: egy férfi ismerősei is szólíthatják így a feleségét."
          },
          text: block.map((item) => item.text).join(" ")
        });
        continue;
      }

      if (entry.id === "AKM-0755") {
        pushTextBlock("example", "AKM-0763");
        continue;
      }

      if (entry.id === "AKM-0918") {
        pushTextBlock("note", "AKM-0919", "Amikor a rizsről vagy a bulgurról már elkészült ételként, nem pedig alapanyagként beszélünk, ezeket az alakokat használjuk:");
        continue;
      }

      if (entry.id === "AKM-1554") {
        pushTextBlock("example", "AKM-1565", "Ügyintéző: A mi bankunkban ekkora összeg lekötése esetén a havi kamat 23 000 líra. Ebből minden hónapban 2 000 líra kamatadót vonnak le, így havonta 21 000 líra kamat érkezik. Ez megfelel önnek? Ügyfél: Igen, köszönöm, megfelelő, kössük le. Devizára is ilyen magas a kamat? Ügyintéző: Nem, ez csak a lírára érvényes. Ügyfél: Értem. Ügyintéző: Úgy látom, hogy önnek van nálunk számlája, csak szeretném ellenőrizni az adatokat. A személyi igazolvány száma: 123456789, anyja neve Ayşe, apja neve Murat. Születési helye és ideje: Ankara, 1988. október 25. Telefonszáma: 0532 487 96 77.");
        continue;
      }

      if (entry.id === "AKM-1020" && rows[index + 1] && rows[index + 1].id === "AKM-1021") {
        cards.push({
          id: `${entry.id}+${rows[index + 1].id}`,
          kind: "pair",
          family: "sentence",
          page: entry.page,
          rawCount: rawUnits(entry) + rawUnits(rows[index + 1]),
          pair: {
            turkish: "Saçmaladım.",
            hungarian: "Hülyeségeket, zagyvaságokat beszéltem. Mindenféle baromságot összehordtam."
          },
          text: `${entry.text} ${rows[index + 1].text}`
        });
        index += 2;
        continue;
      }

      if (isHeading(entry, topic)) {
        let title = manualSectionTitles.get(entry.id) || entry.text;
        let mergedNextHeading = false;
        const next = rows[index + 1];
        const currentLanguage = pairing.detectLanguage(entry.text);
        const nextLanguage = next && pairing.detectLanguage(next.text);
        if (next && isHeading(next, topic) && entry.page === next.page && currentLanguage && nextLanguage && currentLanguage !== nextLanguage) {
          title = currentLanguage === "hu" ? `${entry.text} · ${next.text}` : `${next.text} · ${entry.text}`;
          mergedNextHeading = true;
          index += 1;
        }
        cards.push({ id: entry.id, kind: "section", family: "section", page: entry.page, rawCount: rawUnits(entry) + (mergedNextHeading ? rawUnits(next) : 0), text: title });
        index += 1;
        continue;
      }

      const manualPair = manualPairForEntry(entry);
      if (manualPair) {
        let pairId = entry.id;
        let pairText = `${manualPair.turkish} ${manualPair.hungarian}`;
        let pairRawCount = rawUnits(entry);
        let resolvedPair = manualPair;
        const translation = rows[index + 1];
        const translationHasOwnPair = translation && (manualPairForEntry(translation) || pairing.splitBilingual(translation.text, topic.sourceDoc, translation.kind));
        if (manualPair.consumeNext !== false && translation && translation.page === entry.page && pairing.detectLanguage(translation.text) === "hu" && !isHeading(translation, topic) && !isNote(translation) && !translationHasOwnPair) {
          resolvedPair = manualPair.preserveHungarian ? manualPair : { ...manualPair, hungarian: translation.text };
          pairId = `${entry.id}+${translation.id}`;
          pairText = `${entry.text} ${translation.text}`;
          pairRawCount += rawUnits(translation);
          index += 1;
        }
        cards.push({ id: pairId, kind: "pair", family: family(entry.kind), page: entry.page, rawCount: pairRawCount, pair: { turkish: resolvedPair.turkish, hungarian: resolvedPair.hungarian }, text: pairText });
        index += 1;
        continue;
      }

      let inlinePair = isNote(entry) || isSpeakerLine(entry) ? null : pairing.splitBilingual(entry.text, topic.sourceDoc, entry.kind);
      if (inlinePair) {
        let pairId = entry.id;
        let pairText = entry.text;
        let pairRawCount = rawUnits(entry);
        const openingParentheses = (entry.text.match(/\(/g) || []).length;
        const closingParentheses = (entry.text.match(/\)/g) || []).length;
        const continuation = rows[index + 1];
        if (openingParentheses > closingParentheses && continuation && continuation.page === entry.page && pairing.detectLanguage(continuation.text) === "hu") {
          inlinePair = { ...inlinePair, hungarian: `${inlinePair.hungarian} ${continuation.text}` };
          pairId = `${entry.id}+${continuation.id}`;
          pairText = `${entry.text} ${continuation.text}`;
          pairRawCount += rawUnits(continuation);
          index += 1;
        }
        cards.push({ id: pairId, kind: "pair", family: family(entry.kind), page: entry.page, rawCount: pairRawCount, pair: inlinePair, text: pairText });
        index += 1;
        continue;
      }

      if (isNote(entry)) {
        const noteLines = [entry];
        while (rows[index + 1] && rows[index + 1].page === entry.page && isNote(rows[index + 1]) && noteLines.length < 4) {
          noteLines.push(rows[index + 1]);
          index += 1;
        }
        const noteText = noteLines.length === 1 && manualNotes.has(entry.id)
          ? manualNotes.get(entry.id)
          : noteLines.map((item) => item.text).join(" ");
        cards.push({ id: noteLines.map((item) => item.id).join("+"), kind: "note", family: "note", page: entry.page, rawCount: noteLines.reduce((sum, item) => sum + rawUnits(item), 0), text: noteText });
        index += 1;
        continue;
      }

      const language = pairing.detectLanguage(entry.text);
      if (language && canCluster(entry, topic)) {
        const firstGroup = [entry];
        let cursor = index + 1;
        while (cursor < rows.length && rows[cursor].page === entry.page && canCluster(rows[cursor], topic) && pairing.detectLanguage(rows[cursor].text) === language && firstGroup.length < 12) {
          firstGroup.push(rows[cursor]);
          cursor += 1;
        }

        const opposite = language === "tr" ? "hu" : "tr";
        const secondGroup = [];
        while (cursor < rows.length && rows[cursor].page === entry.page && canCluster(rows[cursor], topic) && pairing.detectLanguage(rows[cursor].text) === opposite && secondGroup.length < 5) {
          secondGroup.push(rows[cursor]);
          cursor += 1;
        }

        const order = `${language}-${opposite}`;
        const compatibleOrder = !expectedOrder[topic.sourceDoc] || expectedOrder[topic.sourceDoc] === order;
        const compatibleFamily = secondGroup.length && (family(firstGroup[0].kind) === family(secondGroup[0].kind) || firstGroup.length > 1 || topic.sourceDoc === 1);
        if (compatibleOrder && compatibleFamily) {
          cards.push(makePair(firstGroup, secondGroup, language));
          index = cursor;
          continue;
        }

        if (firstGroup.length > 1) {
          cards.push({ id: firstGroup.map((item) => item.id).join("+"), kind: "example", family: firstGroup.some((item) => family(item.kind) === "sentence") ? "sentence" : "word", language, page: entry.page, rawCount: firstGroup.reduce((sum, item) => sum + rawUnits(item), 0), lines: firstGroup.map((item) => item.text), text: firstGroup.map((item) => item.text).join(" ") });
          index += firstGroup.length;
          continue;
        }

        if (entry.kind === "dialogue") {
          cards.push({ id: firstGroup.map((item) => item.id).join("+"), kind: "dialogue", family: "sentence", language, page: entry.page, rawCount: firstGroup.reduce((sum, item) => sum + rawUnits(item), 0), lines: firstGroup.map((item) => item.text), text: firstGroup.map((item) => item.text).join(" ") });
          index += firstGroup.length;
          continue;
        }
      }

      cards.push({ id: entry.id, kind: language === "hu" ? "explanation" : (language === "tr" ? "turkish" : "term"), family: family(entry.kind), language, page: entry.page, rawCount: rawUnits(entry), text: entry.text });
      index += 1;
    }

    const finalizedCards = finalizeCards(cards);
    return { ...topic, rawCount: topic.count, count: finalizedCards.length, cards: finalizedCards };
  }

  const topics = source.topics.map(normalizeTopic);
  window.ALI_NORMALIZED_LIBRARY = {
    version: 3,
    rawTotal: source.total,
    total: topics.reduce((sum, topic) => sum + topic.cards.length, 0),
    topics
  };
})();
