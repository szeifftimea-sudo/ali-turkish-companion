import argparse
import json
from pathlib import Path
from pypdf import PdfReader

parser = argparse.ArgumentParser(
    description="Extract the approved Turkish learning PDFs into structured JSON."
)
parser.add_argument(
    "source",
    type=Path,
    help="Directory containing the ten source PDF files.",
)
parser.add_argument(
    "--output",
    type=Path,
    default=Path("tmp/pdfs/knowledge_base_raw.json"),
    help="Destination JSON file (default: tmp/pdfs/knowledge_base_raw.json).",
)
args = parser.parse_args()

source = args.source.expanduser().resolve()
output = args.output
output.parent.mkdir(parents=True, exist_ok=True)

selected = [
    "1. BEMUTATKOZÁS ISMERKEDÉS.pdf",
    "2. SZEMÉLYLEÍRÁS.pdf",
    "3. RUHA VÁSÁRLÁS.pdf",
    "4. ZÖLDSÉGEK GYÜMÖLCSÖK.pdf",
    "5. MILYEN A LAKÁSOD.pdf",
    "6. EGÉSZSÉG.pdf",
    "7. KONYHA FŐZÉS.pdf",
    "8. HÉTKÖZNAPI SZÓFORDULATOK.pdf",
    "9. VÁSÁROLJUNK_BOLT FAJTÁK TÖRÖKORSZÁGBAN.pdf",
    "10. GAZDASÁGI HELYZET MEGTAKARÍTÁS.pdf",
]

records = []
for filename in selected:
    pdf = source / filename
    reader = PdfReader(str(pdf))
    pages = []
    for number, page in enumerate(reader.pages, start=1):
        text = (page.extract_text() or "").replace("\u00a0", " ").strip()
        pages.append({"page": number, "text": text})
    records.append({
        "file": pdf.name,
        "page_count": len(reader.pages),
        "character_count": sum(len(page["text"]) for page in pages),
        "pages": pages,
    })

output.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps([
    {"file": item["file"], "pages": item["page_count"], "characters": item["character_count"]}
    for item in records
], ensure_ascii=False, indent=2))
