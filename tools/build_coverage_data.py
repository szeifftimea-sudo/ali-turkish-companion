import json
import re
from pathlib import Path

raw = json.loads(Path("tmp/pdfs/knowledge_base_raw.json").read_text(encoding="utf-8"))

stations = [
    {"id": 1, "place": "Galata Bridge", "adventure": "Megérkeztél", "story": "Ali helyet kínál a hídon; az első bemutatkozás megszületik.", "primary": "Bemutatkozás, köszönés, személyes alapadatok", "sources": "1, 8", "active": "Merhaba; Benim adım…; Macarım; Nerelisin?", "culture": "A köszönés mint kapcsolat, nem teljesítmény"},
    {"id": 2, "place": "Karaköy Tea House", "adventure": "Egy tea mellett", "story": "A teázóban kérünk, reagálunk és rövid hétköznapi beszélgetést kezdünk.", "primary": "Udvariasság, rendelés, közérzet, alap társalgás", "sources": "1, 7, 8", "active": "Bir çay, lütfen; Nasılsın?; Teşekkür ederim", "culture": "Tea és vendéglátás"},
    {"id": 3, "place": "Bosphorus Ferry", "adventure": "Arcok a kompon", "story": "Ali és a vendég embereket figyel, majd egymásról beszélget.", "primary": "Külső-belső tulajdonságok, kapcsolatok", "sources": "1, 2", "active": "… gözleri var; Nasıl biri?; Kiminle?", "culture": "Kíváncsiság ítélkezés nélkül"},
    {"id": 4, "place": "Grand Bazaar", "adventure": "Ami jól áll", "story": "Ruhát választunk, méretet kérünk, alkudozunk és döntünk.", "primary": "Ruházat, színek, méret, ár, vásárlási párbeszéd", "sources": "3, 9, 10", "active": "Bu ne kadar?; Deneyebilir miyim?; Biraz indirim olur mu?", "culture": "Alkudozás mint társas helyzet"},
    {"id": 5, "place": "Gülhane Park", "adventure": "Egy kis pihenő", "story": "A séta lelassul; testről, közérzetről és jóllétről beszélünk.", "primary": "Egészség, testrészek, panaszok, tanácsok", "sources": "2, 6", "active": "Neyin var?; … ağrıyor; Geçmiş olsun", "culture": "Figyelmes érdeklődés és jókívánság"},
    {"id": 6, "place": "Nostalgic Tram", "adventure": "Felszállunk", "story": "Jegyet, helyet és irányt kérünk; apró félreértéseket oldunk fel.", "primary": "Hétköznapi szófordulatok, rövid reakciók, irányok", "sources": "8, 9", "active": "Affedersiniz; Müsait mi?; Fark etmedim", "culture": "Udvariasság közös térben"},
    {"id": 7, "place": "Sunset at Üsküdar", "adventure": "Otthon és messzes", "story": "Naplementében otthonról, lakhatásról, munkáról és pénzről beszélgetünk.", "primary": "Lakás, együttélés, kiadások, megtakarítás", "sources": "5, 10", "active": "Evin nasıl?; Kiminle yaşıyorsun?; Biriktiriyorum", "culture": "A város hétköznapi valósága reklám nélkül"},
    {"id": 8, "place": "Simit Bakery", "adventure": "Frissen a sütőből", "story": "Bekukkantunk a pékségbe, eszközöket és műveleteket látunk, majd rendelünk.", "primary": "Konyha, eszközök, főzési igék, ízek", "sources": "4, 7, 9", "active": "Ne lazım?; Karıştır; Pişir; Bir simit alabilir miyim?", "culture": "Ételkészítés és kínálás"},
    {"id": 9, "place": "Blue Mosque Courtyard", "adventure": "Csendes udvar", "story": "Belépés előtt megállunk; tiszteletről, viselkedésről és figyelmességről beszélünk.", "primary": "Hétköznapi viselkedés, érzelmi reakciók, tisztelet", "sources": "6, 8", "active": "Düşünceli; Affedersiniz; Rahatsız etmeyeyim", "culture": "A csend és a helyi szokások tisztelete"},
    {"id": 10, "place": "Waterfront Promenade", "adventure": "A parti piac", "story": "A vízparti piacon zöldséget, gyümölcsöt és mindennapi árut veszünk.", "primary": "Élelmiszer, mennyiség, bolttípusok, árak", "sources": "4, 9, 10", "active": "Bir kilo…; Taze mi?; Başka?; Ne kadar?", "culture": "Piac, kereskedők és szezonális választás"},
]

source_assignment = {
    "1": (1, "2, 3"), "2": (3, "5"), "3": (4, "6"), "4": (10, "8"),
    "5": (7, "3"), "6": (5, "9"), "7": (8, "2"), "8": (6, "1, 2, 9"),
    "9": (10, "4, 6, 8"), "10": (7, "4, 10")
}

def source_number(name):
    return re.match(r"(\d+)", name).group(1)

def classify(line):
    letters = [c for c in line if c.isalpha()]
    upper = sum(c.isupper() for c in letters) / max(1, len(letters))
    if len(line) < 90 and upper > .72:
        return "Témacím"
    if "?" in line:
        return "Kérdés / párbeszédminta"
    if "!" in line or any(x in line for x in ["Lütfen", "lütfen", "misin", "mısın", "musun", "müsün"]):
        return "Használható kifejezés"
    if len(line.split()) <= 12:
        return "Szókincs / szókapcsolat"
    return "Magyarázat / példa"

units = []
pages = []
sources = []
seen = {}
for doc in raw:
    number = source_number(doc["file"])
    primary, secondary = source_assignment[number]
    sources.append({
        "source": number, "title": re.sub(r"^\d+\.\s*", "", doc["file"].rsplit(".pdf", 1)[0]), "pages": doc["page_count"],
        "characters": doc["character_count"], "primary_station": primary, "secondary_stations": secondary,
        "coverage": "Teljes szöveg kinyerve"
    })
    for page in doc["pages"]:
        clean_lines = []
        for raw_line in page["text"].splitlines():
            line = re.sub(r"\s+", " ", raw_line).strip(" •\t")
            if not line or "www.torokultanulunk.hu" in line.lower() or line.isdigit():
                continue
            clean_lines.append(line)
        pages.append({
            "source": number, "page": page["page"], "primary_station": primary,
            "secondary_stations": secondary, "unit_count": len(clean_lines),
            "page_preview": " | ".join(clean_lines)[:500]
        })
        for line in clean_lines:
            norm = re.sub(r"[^\wçğıöşüáéíóöőúüű]+", " ", line.lower()).strip()
            duplicate_of = seen.get(norm, "")
            unit_id = f"S{int(number):02d}-P{page['page']:02d}-U{len(units)+1:04d}"
            if norm and not duplicate_of:
                seen[norm] = unit_id
            kind = classify(line)
            units.append({
                "unit_id": unit_id, "source": number, "page": page["page"], "content": line,
                "type": kind, "primary_station": primary, "secondary_stations": secondary,
                "learning_mode": "Aktív használat" if kind in {"Kérdés / párbeszédminta", "Használható kifejezés"} else "Felismerés → későbbi aktiválás",
                "duplicate_of": duplicate_of, "status": "Kiosztva"
            })

blueprints = []
moment_names = ["Megérkezés", "Ali észrevesz valamit", "Első szükséges szó", "Meghallgatás", "Vendég választ", "Helyi reakció", "Kulturális pillanat", "Saját mondat", "Visszhang korábbról", "Útinapló"]
for station in stations:
    for moment, name in enumerate(moment_names, start=1):
        blueprints.append({
            "station": station["id"], "place": station["place"], "moment": moment, "moment_role": name,
            "experience_rule": "A vendég döntése látható reakciót vált ki." if moment in {5, 8} else "A nyelv a helyzetből születik, nem feladatként jelenik meg.",
            "content_focus": station["primary"], "status": "Tervezési keret"
        })

spiral = [
    {"thread": "Köszönés és udvariasság", "first": 1, "returns": "2, 4, 6, 8, 9, 10", "active_by": 2},
    {"thread": "Bemutatkozás és személyes adatok", "first": 1, "returns": "3, 7", "active_by": 3},
    {"thread": "Leírás és tulajdonság", "first": 3, "returns": "4, 5, 7", "active_by": 5},
    {"thread": "Kérés, ár és vásárlás", "first": 2, "returns": "4, 6, 8, 10", "active_by": 4},
    {"thread": "Mennyiség és élelmiszer", "first": 8, "returns": "10", "active_by": 10},
    {"thread": "Otthon, munka és pénz", "first": 1, "returns": "7, 10", "active_by": 7},
    {"thread": "Egészség és közérzet", "first": 2, "returns": "5, 9", "active_by": 5},
    {"thread": "Hétköznapi reakciók", "first": 2, "returns": "3, 4, 6, 8, 9", "active_by": 6},
]

Path("tmp/pdfs/coverage_data.json").write_text(json.dumps({"stations": stations, "sources": sources, "pages": pages, "units": units, "blueprints": blueprints, "spiral": spiral}, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"sources": len(sources), "pages": len(pages), "content_units": len(units), "unique_units": len(seen), "duplicates": sum(bool(x["duplicate_of"]) for x in units)}, ensure_ascii=False))
