"""Extract the 18 A1 vocabulary tables from the supplied coursebook PDF.

Usage:
    python tools/extract-a1-vocabulary.py INPUT.pdf OUTPUT.json
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import pdfplumber


SECTIONS = [
    ((5,), "0A", "Ábécé"),
    ((18,), "1A", "Köszönések és mindennapi kifejezések"),
    ((33,), "1B", "Otthon"),
    ((48, 49), "2A", "Helyek és iskola"),
    ((59, 60, 61), "2B", "Bevásárlás és mennyiségek"),
    ((72, 73), "2C", "Emberek és tulajdonságok"),
    ((89, 90), "3A", "Napi rutin"),
    ((103, 104), "3B", "Cselekvések és hobbik"),
    ((110, 111), "3C", "Ételek és étterem"),
    ((124, 125), "4A", "Család"),
    ((134, 135, 136, 137, 138, 139), "4B", "Országok"),
    ((147, 148), "4C", "Gyakori igék"),
    ((166, 167), "5A", "Idő, napok és hónapok"),
    ((171, 172), "5B", "Utazás és tervek"),
    ((178,), "5C", "Célok és időtartam"),
    ((188, 189), "6A", "Város és környék"),
    ((197, 198), "6B", "Helyek és leírásuk"),
    ((206,), "6C", "Lakás és összehasonlítás"),
]


def normalized_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def join_words(words: list[dict]) -> str:
    return normalized_space(" ".join(word["text"] for word in sorted(words, key=lambda item: item["x0"])))


def grouped_lines(words: list[dict], tolerance: float = 7.0) -> list[list[dict]]:
    lines: list[list[dict]] = []
    for word in sorted(words, key=lambda item: (item["top"], item["x0"])):
        if not lines:
            lines.append([word])
            continue
        anchor = sum(item["top"] for item in lines[-1]) / len(lines[-1])
        if abs(word["top"] - anchor) <= tolerance:
            lines[-1].append(word)
        else:
            lines.append([word])
    return lines


def clean_term(value: str) -> str:
    value = normalized_space(value)
    value = re.sub(r"\s+([.!?,;/])", r"\1", value)
    value = re.sub(r"([(/])\s+", r"\1", value)
    value = re.sub(r"\s+([)])", r"\1", value)
    return value


def extract_section(pages, code: str, title: str) -> dict:
    entries: list[dict[str, str]] = []

    for page in pages:
        for table in page.extract_tables():
            for row in table:
                if len(row) < 3 or not row[1] or not row[2]:
                    continue
                category = normalized_space(row[0] or "")
                terms = [clean_term(value) for value in row[1].splitlines() if clean_term(value)]
                meanings = [clean_term(value) for value in row[2].splitlines() if clean_term(value)]
                if terms and terms[0].casefold() == "kelime":
                    terms = terms[1:]
                if meanings and meanings[0].casefold() in {"anlamı", "anlami"}:
                    meanings = meanings[1:]
                if len(terms) == len(meanings) + 1:
                    for index in range(len(terms) - 1):
                        if "/" in terms[index] and terms[index + 1][:1].islower():
                            terms[index:index + 2] = [clean_term(f"{terms[index]} {terms[index + 1]}")]
                            break
                if len(terms) != len(meanings):
                    raise RuntimeError(f"{code}: eltérő szószám egy táblában ({len(terms)} != {len(meanings)})")
                for term, meaning in zip(terms, meanings):
                    entries.append({"tr": term, "en": meaning, "category": category})

    if code == "4C":
        for index in range(len(entries) - 1):
            if entries[index]["tr"].endswith("milli") and entries[index + 1]["tr"] == "bayramlar":
                entries[index]["tr"] = clean_term(f"{entries[index]['tr']} {entries[index + 1]['tr']}")
                entries[index]["en"] = clean_term(f"{entries[index]['en']} {entries[index + 1]['en']}")
                entries.pop(index + 1)
                break
    entries = [entry for entry in entries if entry["tr"] and entry["en"] and "TURKISHLE" not in entry["tr"]]
    return {"code": code, "title": title, "entries": entries}


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Használat: extract-a1-vocabulary.py INPUT.pdf OUTPUT.json")
    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    with pdfplumber.open(source) as document:
        sections = [extract_section([document.pages[page_number - 1] for page_number in page_numbers], code, title) for page_numbers, code, title in SECTIONS]

    payload = {
        "source": source.name,
        "sectionCount": len(sections),
        "entryCount": sum(len(section["entries"]) for section in sections),
        "sections": sections,
    }
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"sections": payload["sectionCount"], "entries": payload["entryCount"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
