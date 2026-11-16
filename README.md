# Cupertino for Zotero with PDF Background

An independent, English-language fork of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero), designed for a calm reading experience.

> **v0.2.0 prerelease:** Four soft PDF backgrounds are now available from a **PDF Background** selector in the reader toolbar. Colors use Zotero's native reader theme mechanism, not an overlay. Tested by static builds only, not yet visually in a real Zotero client.

## Choose a PDF background

1. Install the v0.2.0 XPI from the GitHub Release. Disable conflicting full-UI theme add-ons.
2. **Close and reopen your PDF tab** so the reader toolbar is rendered with the new control.
3. Look for **PDF Background** in the reader toolbar and select **Soft Cream**, **Soft Blue**, **Soft Sage**, **Soft Paper**, or **Original**.
4. Alternatively, open the native **Appearance (Aa)** panel at the upper-right of Zotero's PDF reader. Custom themes you selected are also available there.

**Requires Zotero 8+ for native themes.** The Cupertino UI supports Zotero 7, but native reader color presets are not guaranteed there. Selecting a preset changes Zotero's own reader light- and dark-theme preferences; it does not edit or recolor PDF file bytes.

| Name | Background | Foreground |
| --- | --- | --- |
| Soft Cream | `#F7F1E5` | `#252B30` |
| Soft Blue | `#EDF4F8` | `#223648` |
| Soft Sage | `#EEF3EA` | `#25392E` |
| Soft Paper | `#FAFAF7` | `#252B30` |

Themes are saved on selection through Zotero's synced reader themes, preserving previously existing themes. If you remove the extension, your native reader preference and any created custom themes remain until you change or delete them in Zotero's Appearance panel.


## Current features

- Original Cupertino-inspired layout: rounded cards, light/dark palettes, restrained red accent, tabs and fluid row animations.
- Always-visible native Zotero application menus: File, Edit, View, Tools and Help (labels follow the language configured in Zotero).
- All new project documentation and extension metadata in English.
- A unique add-on ID; this fork does not overwrite the upstream Cupertino extension.
- Existing tree-motion accessibility preference retained.

## Install

1. Download `cupertino-with-pdf-background-0.2.0.xpi` from [GitHub Releases](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases).
2. In Zotero, select **Tools → Plugins → gear icon → Install Plugin From File**.
3. Disable other full-interface themes (especially the original Cupertino and Pixel-Blue Workspace) during testing to avoid conflicting CSS rules.
4. Check that the application menu remains accessible by mouse and keyboard.

**Interface target:** Zotero 7–10. **Native PDF background presets:** Zotero 8–10. Zotero 11 beta is experimental and not yet tested in a real client.

## PDF theme implementation

The native reader Appearance panel supports custom reader colors, including scanned PDFs where possible. Cupertino adds a plainly labeled control using Zotero's `renderToolbar` extension event. The palette is original code using `readerCustomThemes`; it does **not** import or reproduce the original Zotero PDF Background implementation. See [CREDITS.md](CREDITS.md).

## Build from source

Requires Python 3 and Node.js (for syntax validation), with no Python third-party dependencies:

```sh
node --check Cupertino-Zotero/bootstrap.js
node --check Cupertino-Zotero/reader-background.js
python3 scripts/build.py
```

The build produces an XPI and an `updates.json` manifest in `dist/`. The GitHub Actions workflow publishes a **pre-release** from the default branch for v0.2.0.

## Credits and licenses

This is a **fork**, not an official Cupertino release. The upstream Git history and original [MIT LICENSE](LICENSE) remain intact.

- [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) — source code and interaction design (MIT).
- [Obsidian Cupertino](https://github.com/aaaaalexis/obsidian-cupertino) — cited by the upstream project as visual inspiration.
- [Zotero PDF Background](https://github.com/q77190858/zotero-pdf-background) — reading-background feature inspiration; no copied source.

See [CREDITS.md](CREDITS.md) and [CHANGELOG.md](CHANGELOG.md). This project is not affiliated with Zotero or the upstream creators.
