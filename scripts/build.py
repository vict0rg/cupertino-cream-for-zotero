#!/usr/bin/env python3
"""Validate and build the Cupertino with PDF Background Zotero extension."""
import hashlib
import json
import pathlib
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "Cupertino-Zotero"
OUT = ROOT / "dist"
MANIFEST = json.loads((SRC / "manifest.json").read_text(encoding="utf-8"))
VERSION = MANIFEST["version"]
ADDON = MANIFEST["applications"]["zotero"]

assert MANIFEST["name"] == "Cupertino for Zotero with PDF Background"
assert ADDON["id"] == "cupertino-with-pdf-background@vict0rg.github.io"
assert ADDON["strict_min_version"] == "7.0"
assert ADDON["strict_max_version"] == "10.0.*"
assert ADDON["update_url"].startswith("https://github.com/vict0rg/")
assert VERSION == "0.1.0", "Review version and release notes before a new release"
STYLE = (SRC / "style.css").read_text(encoding="utf-8")
assert "#menubar-items {\n\tmax-width: 14px" not in STYLE, "Native menu must remain visible"
assert "Native Zotero application menubar is permanently visible" in STYLE
JS = (SRC / "bootstrap.js").read_text(encoding="utf-8")
assert "loadAndRegisterSheet" in JS and "unregisterSheet" in JS
assert not any("\u3400" <= ch <= "\u9fff" for ch in STYLE + JS), "Translate source comments into English"

FILES = [
    (SRC / "manifest.json", "manifest.json"),
    (SRC / "bootstrap.js", "bootstrap.js"),
    (SRC / "style.css", "style.css"),
    (SRC / "icons/icon-48.png", "icons/icon-48.png"),
    (SRC / "icons/icon-96.png", "icons/icon-96.png"),
    (ROOT / "LICENSE", "LICENSE"),
    (ROOT / "CREDITS.md", "CREDITS.md"),
]
OUT.mkdir(exist_ok=True)
XPI = OUT / f"cupertino-with-pdf-background-{VERSION}.xpi"
with zipfile.ZipFile(XPI, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for source, name in FILES:
        if not source.is_file():
            raise FileNotFoundError(source)
        archive.write(source, name)
with zipfile.ZipFile(XPI) as archive:
    assert archive.testzip() is None
    assert archive.namelist()[0] == "manifest.json"
    assert json.loads(archive.read("manifest.json")) == MANIFEST

DOWNLOAD = f"https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases/download/v{VERSION}/{XPI.name}"
UPDATES = {"addons": {ADDON["id"]: {"updates": [{
    "version": VERSION,
    "update_link": DOWNLOAD,
    "update_hash": "sha256:" + hashlib.sha256(XPI.read_bytes()).hexdigest(),
    "applications": {"zotero": {
        "strict_min_version": ADDON["strict_min_version"],
        "strict_max_version": ADDON["strict_max_version"],
    }}
}]}}}
(OUT / "updates.json").write_text(json.dumps(UPDATES, indent=2) + "\n", encoding="utf-8")
print(f"Validated {XPI.name} ({XPI.stat().st_size} bytes)")
print(UPDATES["addons"][ADDON["id"]]["updates"][0]["update_hash"])
