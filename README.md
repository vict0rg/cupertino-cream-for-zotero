# Cupertino for Zotero with PDF Background

An independent, English-language fork of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero), designed for a calm reading experience.

> **v0.1.0 preview:** This first milestone restores the permanent native Zotero menu bar and establishes a separate add-on identity. **PDF background color controls are not implemented yet.** The planned PDF feature will be developed and tested separately in v0.2.0.

## Current features

- Original Cupertino-inspired layout: rounded cards, light/dark palettes, restrained red accent, tabs and fluid row animations.
- Always-visible native Zotero application menus: File, Edit, View, Tools and Help (labels follow the language configured in Zotero).
- All new project documentation and extension metadata in English.
- A unique add-on ID; this fork does not overwrite the upstream Cupertino extension.
- Existing tree-motion accessibility preference retained.

## Install

1. Download `cupertino-with-pdf-background-0.1.0.xpi` from [GitHub Releases](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases).
2. In Zotero, select **Tools → Plugins → gear icon → Install Plugin From File**.
3. Disable other full-interface themes (especially the original Cupertino and Pixel-Blue Workspace) during testing to avoid conflicting CSS rules.
4. Check that the application menu remains accessible by mouse and keyboard.

**Compatibility target:** Zotero 7–10. Zotero 11 beta is experimental and not yet tested in a real client.

## Planned reader backgrounds (v0.2.0)

The next milestone will offer **Soft Cream** (`#F7F1E5`), **Soft Blue** (`#EDF4F8`), **Soft Sage** (`#EEF3EA`) and **Soft Paper** (`#FAFAF7`), with English labels, reversible controls and careful testing of PDF text contrast.

Zotero's native reader color schemes will be preferred where supported. The older [Zotero PDF Background](https://github.com/q77190858/zotero-pdf-background) is referenced as functional inspiration only; **its code is not incorporated** without an explicit compatible license.

## Build from source

Requires Python 3 and Node.js (for syntax validation), with no Python third-party dependencies:

```sh
node --check Cupertino-Zotero/bootstrap.js
python3 scripts/build.py
```

The build produces an XPI and an `updates.json` manifest in `dist/`. The GitHub Actions workflow publishes a **pre-release** from the default branch for v0.1.0.

## Credits and licenses

This is a **fork**, not an official Cupertino release. The upstream Git history and original [MIT LICENSE](LICENSE) remain intact.

- [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) — source code and interaction design (MIT).
- [Obsidian Cupertino](https://github.com/aaaaalexis/obsidian-cupertino) — cited by the upstream project as visual inspiration.
- [Zotero PDF Background](https://github.com/q77190858/zotero-pdf-background) — reading-background feature inspiration; no copied source.

See [CREDITS.md](CREDITS.md) and [CHANGELOG.md](CHANGELOG.md). This project is not affiliated with Zotero or the upstream creators.
