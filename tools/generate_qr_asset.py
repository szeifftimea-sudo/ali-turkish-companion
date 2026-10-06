from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "ali-site-qr.png"
URL = "https://szeifftimea-sudo.github.io/ali-turkish-companion/"

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=12,
    border=4,
)
qr.add_data(URL)
qr.make(fit=True)
image = qr.make_image(fill_color="#173b37", back_color="#fffaf1")
image.save(OUTPUT)
print(OUTPUT)
