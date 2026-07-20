const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "tmp", "pdfs", "adventure_map_data.json");
const outputPath = path.join(root, "helyzetek-data.js");

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const topicMeta = [
  {
    id: "ismerkedes",
    sourceDoc: 1,
    number: "01",
    kicker: "Az első mondatok",
    title: "Bemutatkoznék valakinek",
    description: "Köszönés, ismerkedés, család, munka és azok a mondatok, amelyekkel egy beszélgetés elkezdődik.",
    turkish: "Tanışalım",
    starter: [
      { tr: "Merhaba!", hu: "Szia!" },
      { tr: "Benim adım…", hu: "A nevem…" },
      { tr: "Memnun oldum.", hu: "Örülök, hogy megismertelek." }
    ],
    motif: "lale",
    motifLabel: "Lale"
  },
  {
    id: "szemelyleiras",
    sourceDoc: 2,
    number: "02",
    kicker: "Arcok és történetek",
    title: "Mesélnék valakiről",
    description: "Külső és belső tulajdonságok, ruházat és természetes mondatok emberek leírásához.",
    turkish: "Nasıl biri?",
    starter: [
      { tr: "Kıvırcık saçlı.", hu: "Göndör hajú." },
      { tr: "Güler yüzlü.", hu: "Mosolygós." },
      { tr: "Nazik biri.", hu: "Kedves, udvarias ember." }
    ],
    motif: "cintemani",
    motifLabel: "Çintemani"
  },
  {
    id: "ruha",
    sourceDoc: 3,
    number: "03",
    kicker: "A próbafülkénél",
    title: "Ruhát vásárolnék",
    description: "Ruhadarabok, színek, szabás, valódi méretek, próbálás, csere és fizetés.",
    turkish: "Deneyebilir miyim?",
    starter: [
      { tr: "Bunu deneyebilir miyim?", hu: "Felpróbálhatom ezt?" },
      { tr: "Başka rengi var mı?", hu: "Van más színben?" },
      { tr: "Ne kadar?", hu: "Mennyibe kerül?" }
    ],
    motif: "eli-belinde",
    motifLabel: "Eli belinde"
  },
  {
    id: "piac",
    sourceDoc: 4,
    number: "04",
    kicker: "A standok között",
    title: "Piacon vásárolnék",
    description: "Gyümölcsök, zöldségek, mennyiségek és rövid mondatok egy isztambuli piaci körhöz.",
    turkish: "Taze mi?",
    starter: [
      { tr: "Bundan bir kilo lütfen.", hu: "Ebből egy kilót kérek." },
      { tr: "Taze mi?", hu: "Friss?" },
      { tr: "Başka var mı?", hu: "Van másik?" }
    ],
    motif: "nar",
    motifLabel: "Nar"
  },
  {
    id: "otthon",
    sourceDoc: 5,
    number: "05",
    kicker: "Egy nyitott ajtó",
    title: "Az otthonomról beszélnék",
    description: "Szobák, bútorok, környék és mondatok arról, hol és hogyan élsz.",
    turkish: "Evin nasıl?",
    starter: [
      { tr: "Evim küçük ama rahat.", hu: "Kicsi, de kényelmes az otthonom." },
      { tr: "Balkonu var.", hu: "Van erkélye." },
      { tr: "Burada yaşıyorum.", hu: "Itt lakom." }
    ],
    motif: "seljuk-star",
    motifLabel: "Selçuklu yıldızı"
  },
  {
    id: "egeszseg",
    sourceDoc: 6,
    number: "06",
    kicker: "Amikor segítség kell",
    title: "Elmondanám, mi fáj",
    description: "Tünetek, testrészek, gyógyszertár és egyszerű segítségkérés utazás közben.",
    turkish: "İyi hissetmiyorum",
    starter: [
      { tr: "İyi hissetmiyorum.", hu: "Nem érzem jól magam." },
      { tr: "Başım ağrıyor.", hu: "Fáj a fejem." },
      { tr: "Eczane nerede?", hu: "Hol van a gyógyszertár?" }
    ],
    motif: "nazar",
    motifLabel: "Nazar"
  },
  {
    id: "konyha",
    sourceDoc: 7,
    number: "07",
    kicker: "Az asztal körül",
    title: "Főznék vagy ételt rendelnék",
    description: "Konyhai eszközök, főzési igék, ízek és mondatok rendeléshez vagy közös főzéshez.",
    turkish: "Afiyet olsun",
    starter: [
      { tr: "Ne tavsiye edersin?", hu: "Mit ajánlasz?" },
      { tr: "Acısız olsun.", hu: "Ne legyen csípős." },
      { tr: "Eline sağlık.", hu: "Köszönöm, nagyon finom lett." }
    ],
    motif: "karanfil",
    motifLabel: "Karanfil"
  },
  {
    id: "fordulatok",
    sourceDoc: 8,
    number: "08",
    kicker: "Ahogy tényleg mondják",
    title: "Természetesebben beszélnék",
    description: "Hétköznapi szófordulatok, reakciók és apró mondatok, amelyektől élőbb lesz a beszéd.",
    turkish: "Aynen öyle",
    starter: [
      { tr: "Fark etmedim.", hu: "Nem vettem észre." },
      { tr: "Buna bayıldım.", hu: "Ez nagyon tetszik." },
      { tr: "Aynen öyle.", hu: "Pontosan így van." }
    ],
    motif: "bulut",
    motifLabel: "Bulut"
  },
  {
    id: "boltok",
    sourceDoc: 9,
    number: "09",
    kicker: "Merre induljunk?",
    title: "Eligazodnék a boltok között",
    description: "Bolttípusok, termékek, útbaigazítás és vásárlási mondatok a pékségtől a patikáig.",
    turkish: "Nerede bulabilirim?",
    starter: [
      { tr: "Nerede bulabilirim?", hu: "Hol találom?" },
      { tr: "Açık mı?", hu: "Nyitva van?" },
      { tr: "Kart geçiyor mu?", hu: "Lehet kártyával fizetni?" }
    ],
    motif: "kocboynuzu",
    motifLabel: "Koçboynuzu"
  },
  {
    id: "penz",
    sourceDoc: 10,
    number: "10",
    kicker: "A lírán túl",
    title: "Pénzről és tervekről beszélnék",
    description: "Árak, fizetés, banki ügyek, megtakarítás és hétköznapi tervek érthető helyzetekben.",
    turkish: "Bütçeme uygun",
    starter: [
      { tr: "Bütçeme uygun.", hu: "Belefér a keretembe." },
      { tr: "Nakit ödeyeceğim.", hu: "Készpénzzel fizetek." },
      { tr: "Biriktiriyorum.", hu: "Félreteszek." }
    ],
    motif: "saz",
    motifLabel: "Saz yaprağı"
  }
];

const typeMap = {
  "Témacím": "section",
  "Használható mondat": "sentence",
  "Párbeszéd": "dialogue",
  "Szó / kifejezés": "phrase",
  "Szókincscsoport": "vocabulary"
};

function cleanText(value) {
  return String(value || "")
    .replace(/www\.torokultanulunk\.hu/gi, "")
    .replace(/^\s*[•·]\s*/, "")
    .replace(/^\s*\d{1,2}[.)]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

const topics = topicMeta.map((meta) => {
  const entries = source.rows
    .filter((row) => Number(row.source_doc) === meta.sourceDoc)
    .map((row) => ({
      id: row.id,
      page: Number(row.source_page),
      kind: typeMap[row.type] || "phrase",
      text: cleanText(row.content)
    }))
    .filter((entry) => entry.text);

  return { ...meta, count: entries.length, entries };
});

const payload = {
  version: 1,
  total: topics.reduce((sum, topic) => sum + topic.entries.length, 0),
  topics
};

const banner = "// Generated from the approved Ali Adventure Knowledge Map. Run: node tools/build-helyzetek-data.js\n";
fs.writeFileSync(outputPath, `${banner}window.ALI_SITUATION_LIBRARY = ${JSON.stringify(payload, null, 2)};\n`, "utf8");

console.log(`Built ${path.basename(outputPath)} with ${payload.total} entries across ${topics.length} topics.`);
