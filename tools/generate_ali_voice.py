import asyncio
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools" / "edge_tts"))
import edge_tts

VOICE = "tr-TR-AhmetNeural"
OUT = ROOT / "assets" / "audio" / "ali-v1"
LINES = {
    "merhaba": "Merhaba.",
    "ben-ali": "Ben Ali.",
    "benim-adim-ali": "Benim adım Ali.",
    "benim-adim-timi": "Benim adım Timi.",
    "ben-ali-full": "Ben Ali. Benim adım Ali.",
    "kolay-gelsin": "Kolay gelsin.",
    "macarim": "Macarım.",
    "macaristandan-geldim": "Macaristan'dan geldim.",
    "senin-adin-ne": "Senin adın ne?",
    "nasilsin": "Nasılsın?",
    "nerelisin": "Nerelisin?",
    "cay": "Çay.",
    "bir-cay-lutfen": "Bir çay, lütfen.",
    "tesekkur-ederim": "Teşekkür ederim.",
    "iyiyim": "İyiyim.",
    "fena-degilim": "Fena değilim.",
    "sekerli-mi": "Şekerli mi?",
    "evet-sekerli": "Evet, şekerli.",
    "hayir-sekersiz": "Hayır, şekersiz.",
    "ince-belli-cay-bardagi": "İnce belli çay bardağı.",
    "karakoy-intro-good": "Bir çay, lütfen. İyiyim. Teşekkür ederim.",
    "karakoy-intro-okay": "Bir çay, lütfen. Fena değilim. Teşekkür ederim.",
}

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, text in LINES.items():
        audio = edge_tts.Communicate(text, VOICE, rate="-3%", pitch="+2Hz")
        await audio.save(str(OUT / f"{slug}.mp3"))

if __name__ == "__main__":
    asyncio.run(main())
