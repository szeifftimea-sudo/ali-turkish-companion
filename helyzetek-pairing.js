(() => {
  const hungarianWords = new Set([
    "a", "az", "egy", "es", "vagy", "vagyok", "van", "nincs", "nem", "igen", "hogy", "hol", "honnan", "hova", "milyen", "mennyi", "mit", "mi", "ki", "kivel", "nekem", "szeretnek", "kerek", "koszonom", "magyar", "magyarul", "szia", "jo", "reggelt", "napot", "estet", "ejszakat", "minden", "rendben", "megvagyok", "lehetne", "rosszabb", "szo", "felig", "meddig", "munka", "ezerrel", "docog", "szeker", "foglalkozz", "vele", "rosszul", "gondolom", "meggondolatlanul", "viselkedtem", "szem", "orr", "szaj", "ajak", "haj", "barna", "kek", "zold", "fekete", "feher", "piros", "sarga", "nagy", "kis", "hosszu", "rovid", "magas", "alacsony", "kover", "vekony", "telt", "bajuszos", "napszemuveget", "tobbnyire", "komoly", "dagi", "ruha", "cipo", "csizma", "papucs", "szandal", "nadrag", "szoknya", "kabat", "haloring", "kontos", "atleta", "melltarto", "mintas", "pamut", "selyem", "meret", "fazon", "arengedmeny", "alma", "korte", "cseresznye", "meggy", "szilva", "fuge", "eper", "szolo", "narancs", "ananász", "datolya", "citrom", "paradicsom", "hagyma", "fokhagyma", "uborka", "cukkini", "szoba", "konyha", "furdo", "ablak", "ajto", "asztal", "szek", "folyoso", "terasz", "pince", "medence", "emelet", "padlo", "mennyezet", "kert", "bokor", "levendula", "szegfu", "fej", "has", "faj", "vernyomas", "megfazas", "influenza", "konyok", "ujj", "orca", "homlok", "szempilla", "szemoldok", "bor", "ver", "test", "szerv", "gyogyszertar", "kes", "kanal", "villa", "keverni", "osszekeverni", "befottesuveg", "kancso", "csesze", "fedo", "fogpiszkalo", "szivoszal", "bolt", "pekseg", "hentes", "zoldseges", "kisbolt", "bufe", "etterem", "kavezo", "konyvtar", "kotszer", "sebtapasz", "receptkonyv", "fuzet", "bank", "penz", "kamat", "koltseg", "bevetel", "fizetes", "gazdasag", "megtakaritas", "energia", "inflacio", "tozsde", "hitel", "kedvezmeny", "akcio", "piac", "utalas", "arany", "ezust", "fold", "kamatlab", "atutalni", "fizetni", "aremelkedes", "feleslegesen", "konnektor"
  ]);
  [
    "budapesten", "lakom", "osszehordtam", "gyerek", "unoka", "anya", "apa",
    "szulok", "nagymama", "nagypapa", "foglalkozasod", "dolgozol", "nappali",
    "kerlek", "vedd", "komolyan", "mondtam", "hulyesegeket", "zagyvasagokat",
    "beszeltem", "mindenfele", "baromsagot", "reggelizni", "had", "fejezzem", "be",
    "ne", "csak", "ez", "akaratlanul", "kellemetlenul"
  ].forEach((word) => hungarianWords.add(word));
  const turkishWords = new Set([
    "ben", "benim", "sen", "senin", "siz", "sizin", "bu", "bir", "ve", "ile", "icin", "var", "yok", "degil", "evet", "hayir", "her", "sey", "yolunda", "fena", "hallice", "ne", "nasil", "nerede", "nereden", "nerelisin", "kim", "kiminle", "merhaba", "selam", "lutfen", "tesekkur", "ederim", "istiyorum", "geldim", "gidiyorum", "yasiyorum", "seviyorum", "misin", "musun", "mi", "mı", "adi", "adim", "isim", "memnun", "oldum", "goz", "burun", "agiz", "dudak", "sac", "kahverengi", "mavi", "yesil", "siyah", "beyaz", "kirmizi", "sari", "buyuk", "kucuk", "uzun", "kisa", "sisman", "ince", "elbise", "ayakkabi", "cizme", "terlik", "sandalet", "pantolon", "etek", "mont", "pijama", "gecelik", "bornoz", "atlet", "sutyen", "papyon", "pamuk", "ipek", "keten", "beden", "model", "indirim", "elma", "armut", "kiraz", "visne", "erik", "incir", "cilek", "uzum", "portakal", "ananas", "hurma", "limon", "domates", "sogan", "sarimsak", "salatalik", "kabak", "oda", "mutfak", "banyo", "pencere", "kapi", "masa", "sandalye", "koridor", "teras", "balkon", "bodrum", "havuz", "kat", "zemin", "tavan", "bahce", "agac", "cali", "lavanta", "karanfil", "bas", "karin", "agriyor", "tansiyon", "kanser", "nezle", "grip", "dirsek", "parmak", "yanak", "alin", "kirpik", "kas", "deri", "kan", "vucut", "organ", "eczane", "bicak", "kasik", "catal", "kavanoz", "surahi", "fincan", "cezve", "kapak", "kurdan", "pipet", "firin", "kasap", "manav", "dukkan", "bakkal", "bufe", "restoran", "lokanta", "kafe", "kutuphane", "banka", "para", "faiz", "masraf", "gelir", "maas", "nakit", "fiyat", "ekonomi", "sanayi", "tarim", "enerji", "enflasyon", "borsa", "kredi", "pazar", "havale", "altin", "gumus", "toprak", "arazi"
  ]);
  [
    "kuru", "dut", "tuz", "karabiber", "yer", "alan", "duvar", "avize", "lamba",
    "abajur", "mum", "komodin", "sehpa", "televizyon", "radyo", "mumluk", "zakkum",
    "krizantem", "orkide", "safra", "kesesi", "mide", "bobrek", "pankreas", "mesane",
    "damar", "muayene", "ameliyat", "tahin", "pekmezi", "maya", "puruz", "tekel",
    "urunler", "sut", "urunleri", "politika", "faizi", "vergi", "odemek", "fiyatlara",
    "zam", "gelmek", "hindistan", "cevizi", "roka", "enginar", "cimen", "bitki", "zambak",
    "buro", "ofis", "okul", "fabrika", "tok", "tutar", "yaban", "mersini", "radyator",
    "petek", "kalorifer", "vantilator", "sindirim", "sistemi", "dalak", "yumurta", "sahanda",
    "ekmek", "taze", "eklemek", "iri", "uzerinde", "harika", "duruyor", "dilim", "tutuldu",
    "dusunemedim", "bitirmeme", "izin", "ver", "merhem", "krem", "fitil", "tavuk", "pirzola",
    "but", "kofte", "kurutma", "makinesi", "ankastre", "seti", "tost", "dunya", "klasikleri",
    "edebiyat", "yaka", "yakasiz", "teyze", "dayi", "amca", "hala", "eniste", "elti",
    "bacanak", "kayin", "yenge", "soyad", "ki", "vefat", "etti", "miyim", "ettin",
    "gordun", "cekti", "oldu", "mu", "dikkate", "alma"
  ].forEach((word) => turkishWords.add(word));

  function fold(value) {
    return String(value || "")
      .toLocaleLowerCase("hu-HU")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function evidence(value) {
    const original = String(value || "");
    const words = fold(original).split(/\s+/).filter(Boolean);
    let hu = 0;
    let tr = 0;

    if (/[áéíóőúű]/i.test(original)) hu += 3;
    if (/[ıİşŞğĞçÇ]/.test(original)) tr += 3;

    words.forEach((word) => {
      if (hungarianWords.has(word)) hu += 1.8;
      if (turkishWords.has(word)) tr += 1.8;
      if (/(ban|ben|nak|nek|val|vel|bol|rol|tol|hoz|hez|nal|nel|kent|sag|seg|unk|unk|atok|etek)$/.test(word)) hu += .65;
      if (/(lar|ler|dir|dur|dan|den|tan|ten|yor|mak|mek|lik|luk|li|lu|ci|cu|miz|sin)$/.test(word)) tr += .65;
    });
    return { hu, tr, words: words.length };
  }

  function detectLanguage(value) {
    const found = evidence(value);
    if (found.hu - found.tr >= 1.5) return "hu";
    if (found.tr - found.hu >= 1.5) return "tr";
    return null;
  }

  function splitBilingual(value, sourceDoc, entryKind) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text || text.length < 7) return null;

    const expectedOrder = [3, 4, 5].includes(Number(sourceDoc)) ? "hu-tr" : ([2, 6, 7, 8, 9, 10].includes(Number(sourceDoc)) ? "tr-hu" : null);
    const whole = evidence(text);
    const hasHardDivider = /(?:\s+[–—-]\s+|[–—])/.test(text);
    if (!hasHardDivider && (whole.hu < 1.1 || whole.tr < (expectedOrder ? .45 : 1.1))) return null;

    const boundaries = new Map();
    for (const match of text.matchAll(/(?:\s+[–—-]\s+|[–—])/g)) {
      boundaries.set(match.index, { leftEnd: match.index, rightStart: match.index + match[0].length, hard: true });
    }
    for (const match of text.matchAll(/\s+/g)) {
      if (!boundaries.has(match.index)) {
        boundaries.set(match.index, { leftEnd: match.index, rightStart: match.index + match[0].length, hard: false });
      }
    }

    let best = null;
    boundaries.forEach((boundary) => {
      if (best && best.hard && !boundary.hard) return;
      const left = text.slice(0, boundary.leftEnd).replace(/[–—-]+$/g, "").trim();
      const right = text.slice(boundary.rightStart).replace(/^[–—-]+/g, "").trim();
      if (!left || !right) return;

      const l = evidence(left);
      const r = evidence(right);
      const trHu = (l.tr - l.hu) + (r.hu - r.tr);
      const huTr = (l.hu - l.tr) + (r.tr - r.hu);
      const leftLanguage = detectLanguage(left);
      const rightLanguage = detectLanguage(right);
      let orientation = trHu >= huTr ? "tr-hu" : "hu-tr";
      if (boundary.hard) {
        if (leftLanguage === "hu" && rightLanguage !== "hu") orientation = "hu-tr";
        else if (rightLanguage === "hu" && leftLanguage !== "hu") orientation = "tr-hu";
        else if (leftLanguage === "tr" && rightLanguage !== "tr") orientation = "tr-hu";
        else if (rightLanguage === "tr" && leftLanguage !== "tr") orientation = "hu-tr";
        else if (expectedOrder) orientation = expectedOrder;
      }
      const expectedBonus = expectedOrder === orientation ? 1.5 : 0;
      const confidence = Math.max(trHu, huTr) + expectedBonus + (boundary.hard ? 2.6 : 0) - Math.abs(l.words - r.words) * .025;
      const sideEvidence = orientation === "tr-hu" ? Math.min(l.tr, r.hu) : Math.min(l.hu, r.tr);

      const hungarianEvidence = orientation === "tr-hu" ? r.hu : l.hu;
      if (boundary.hard) {
        if (hungarianEvidence < .4 || (leftLanguage === "hu" && rightLanguage === "hu") || (leftLanguage === "tr" && rightLanguage === "tr")) return;
      } else if (sideEvidence < (expectedOrder ? .4 : 1.05) || confidence < (expectedOrder ? 1.7 : 2.2)) return;
      if (!best || confidence > best.confidence) best = { left, right, orientation, confidence, hard: boundary.hard };
    });

    if (!best) return null;
    const result = best.orientation === "tr-hu"
      ? { turkish: best.left, hungarian: best.right }
      : { turkish: best.right, hungarian: best.left };
    const turkishLanguage = detectLanguage(result.turkish);
    const hungarianLanguage = detectLanguage(result.hungarian);
    const turkishSideEvidence = evidence(result.turkish);
    const turkishSideWords = fold(result.turkish).split(/\s+/).filter(Boolean);
    const distinctiveTurkishWords = turkishSideWords.filter((word) => turkishWords.has(word) && !hungarianWords.has(word));
    const hasTurkishSpecificCharacter = /[ıİşŞğĞçÇ]/.test(result.turkish);
    const hungarianSideWords = fold(result.hungarian).split(/\s+/).filter(Boolean);
    const distinctiveHungarianWords = hungarianSideWords.filter((word) => hungarianWords.has(word) && !turkishWords.has(word));
    const hasHungarianSpecificCharacter = /[áéíóőúűÁÉÍÓŐÚŰ]/.test(result.hungarian);
    const lexicalEntry = entryKind === "phrase" || entryKind === "vocabulary";
    const weakExpectedLexicalPair = lexicalEntry && Boolean(expectedOrder) && best.orientation === expectedOrder && hungarianLanguage === "hu" && turkishSideEvidence.tr >= .4 && (hasTurkishSpecificCharacter || distinctiveTurkishWords.length > 0);
    const turkishWordsCount = fold(result.turkish).split(/\s+/).filter(Boolean).length;
    const hungarianWordsCount = fold(result.hungarian).split(/\s+/).filter(Boolean).length;
    if (turkishLanguage === "hu" || hungarianLanguage === "tr") return null;
    if (best.hard && !expectedOrder && turkishSideEvidence.tr < .4 && !hasTurkishSpecificCharacter && distinctiveTurkishWords.length === 0) return null;
    if (!best.hard && (turkishLanguage !== "tr" || hungarianLanguage !== "hu") && !weakExpectedLexicalPair) return null;
    if (!best.hard && !lexicalEntry && !hasHungarianSpecificCharacter && distinctiveHungarianWords.length === 0) return null;
    if (!best.hard && !lexicalEntry && Math.min(turkishWordsCount, hungarianWordsCount) <= 1 && Math.max(turkishWordsCount, hungarianWordsCount) >= 3) return null;
    return result;
  }

  window.ALI_TEXT_PAIRING = { splitBilingual, detectLanguage, evidence };
})();
