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

assert MANIFEST["name"] == "Cupertino Zotero Soft Theme"
assert ADDON["id"] == "cupertino-with-pdf-background@vict0rg.github.io"
assert ADDON["strict_min_version"] == "7.0"
assert ADDON["strict_max_version"] == "10.0.*"
assert ADDON["update_url"].startswith("https://github.com/vict0rg/")
assert VERSION == "0.5.0", "Review version and release notes before a new release"
STYLE = (SRC / "style.css").read_text(encoding="utf-8")
assert "#menubar-items {\n\tmax-width: 14px" not in STYLE, "Native menu must remain visible"
assert "Native Zotero application menubar is permanently visible" in STYLE
# Regression check: the main titlebar must paint an opaque surface in GTK/KDE.
assert "The upstream transparent backgrounds could expose the desktop wallpaper" in STYLE
assert 'background: var(--color-tabbar, #EEE5DC) !important;' in STYLE
assert '#toolbar-menubar {' in STYLE and 'background-color: var(--color-toolbar, #EEE5DC) !important;' in STYLE
JS = (SRC / "bootstrap.js").read_text(encoding="utf-8")
assert "loadAndRegisterSheet" in JS and "unregisterSheet" in JS
assert "reader-background.js" in JS
READER_COLORS = (SRC / "reader-background.js").read_text(encoding="utf-8")
assert "Zotero.SyncedSettings" in READER_COLORS
assert all(label in READER_COLORS for label in ["Soft Cream","Soft Blue","Soft Sage","Soft Paper"])
assert "reader.lightTheme" in READER_COLORS and "reader.darkTheme" in READER_COLORS
assert '"#FAFAF7"' in READER_COLORS and "migrateLegacyCream" in READER_COLORS
assert 'await applyPreset("customCupertinoPaper")' in READER_COLORS
assert "customCupertinoCream" in READER_COLORS
assert "CUPERTINO SOFT v0.5.0" in STYLE, "Review navigation and zebra fixes"
assert "#zotero-view-item-sidenav" in STYLE and "flex: 0 0 40px !important" in STYLE
assert "#zotero-items-tree .row:not(.selected):nth-child(even)" in STYLE
assert "--cupertino-row-selected-bg: #F5E5E5" in STYLE
assert "CUPERTINO ZOTERO SOFT v0.5.0" in STYLE
assert "#FAFAF7" in STYLE and "#F3F3F3" in STYLE and "#D78381" in STYLE
assert "rgba(215,131,129,.30)" in STYLE
assert not any("\u3400" <= ch <= "\u9fff" for ch in STYLE + JS), "Translate source comments into English"

# Include the reader module in bootstrap.js itself. Gecko's loadSubScript may
# evaluate in a different scope than Zotero's bootstrap, making the hook inert.
# Concatenation creates a single tested global without private loader behavior.
MODULE = (SRC / "reader-background.js").read_text(encoding="utf-8")
BOOTSTRAP_XPI = JS + "\n\n" + MODULE
assert "CupertinoReaderBackground.start(id)" in BOOTSTRAP_XPI
assert "loadSubScript" not in JS
FILES = [
    (SRC / "manifest.json", "manifest.json"),
    (SRC / "style.css", "style.css"),
    (SRC / "icons/icon-48.png", "icons/icon-48.png"),
    (SRC / "icons/icon-96.png", "icons/icon-96.png"),
    (ROOT / "LICENSE", "LICENSE"),
    (ROOT / "CREDITS.md", "CREDITS.md"),
    (ROOT / "NOTICE.md", "NOTICE.md"),
]
OUT.mkdir(exist_ok=True)
XPI = OUT / f"cupertino-zotero-soft-theme-{VERSION}.xpi"
with zipfile.ZipFile(XPI, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    archive.writestr("bootstrap.js", BOOTSTRAP_XPI)
    for source, name in FILES:
        if not source.is_file():
            raise FileNotFoundError(source)
        archive.write(source, name)
with zipfile.ZipFile(XPI) as archive:
    assert archive.testzip() is None
    assert "bootstrap.js" in archive.namelist()
    assert b"CupertinoReaderBackground = " in archive.read("bootstrap.js")
    assert json.loads(archive.read("manifest.json")) == MANIFEST

DOWNLOAD = f"https://github.com/vict0rg/cupertino-zotero-soft-theme/releases/download/v{VERSION}/{XPI.name}"
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
