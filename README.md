# Cupertino for Zotero with PDF Background

**A calmer, Cupertino-inspired Zotero interface with soft, adjustable PDF reading backgrounds.**

[**Download the latest XPI**](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases/latest) · [Releases](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases) · [Credits and licensing](CREDITS.md) · [Changelog](CHANGELOG.md)

This is an **independent, English-language fork** of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero), retaining the original design and animation features while restoring Zotero's native menu bar and adding comfortable PDF background presets.

## Highlights

- **Always-visible native menu bar:** File, Edit, View, Tools and Help no longer disappear on hover or when the mouse leaves the title area. Menu names follow the Zotero interface language.
- **Cupertino interface:** rounded reading panels, macOS-inspired colors, refined typography, lightweight controls, light/dark modes and smooth tree animations.
- **No overlapping metadata controls:** the details sidebar keeps Zotero's native navigation width instead of expanding over bibliographic fields on hover.
- **PDF Background selector:** a clearly labeled control near **Appearance (Aa)** in the PDF reader, with four soft backgrounds and an **Original** option.
- **Native reader themes:** changes are applied using Zotero's reader theme preferences, not semi-transparent text overlays. Existing PDF files and annotations are not modified.
- **Reversible styling:** disabling the add-on restores Zotero's original interface styling. Reader theme preferences you selected remain under Zotero's own control.

## Install

1. Download **[cupertino-with-pdf-background-0.2.2.xpi](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background/releases/download/v0.2.2/cupertino-with-pdf-background-0.2.2.xpi)**.
2. In Zotero, open **Tools → Plugins → gear icon → Install Plugin From File** and choose the XPI.
3. Disable other full-interface styling plugins, including the upstream Cupertino theme, while testing. Competing stylesheets may conflict.
4. Restart Zotero if needed. Close and reopen PDF tabs to render the additional reader control.

**Updating from v0.2.1?** v0.2.2 is a documentation-and-attribution maintenance release. It does not change the PDF controls, color presets or navigation behavior already validated in v0.2.1.

## PDF background presets

Open a PDF and look at the **right end of the PDF toolbar**, immediately before the native **Appearance (Aa)** control. Choose a background in the **PDF Background** selector.

| Preset | Background | Text color |
| --- | --- | --- |
| **Original** | Zotero default | Zotero default |
| **Soft Cream** | `#F7F1E5` | `#252B30` |
| **Soft Blue** | `#EDF4F8` | `#223648` |
| **Soft Sage** | `#EEF3EA` | `#25392E` |
| **Soft Paper** | `#FAFAF7` | `#252B30` |

The palette is intended to provide subtle alternatives to stark white or dark sepia, not to guarantee eye-strain relief. Brightness, ambient lighting, display characteristics and individual preferences also matter.

### How preferences work

The add-on adds a preset to Zotero's native `readerCustomThemes` only when you select it. It preserves existing custom themes. Selecting a color updates Zotero's light and dark PDF reader theme preferences; you can also manage colors in the native **Appearance (Aa)** panel. **Original** returns to Zotero's default reader theme selection.

Uninstalling the add-on removes its menu and visual styling. **Custom reader themes and Zotero reader preferences may remain** until changed through Zotero's Appearance panel. Zotero's own sync can synchronize those preferences where supported.

## Supported versions and limitations

| Component | Target |
| --- | --- |
| Cupertino interface | Zotero 7–10 |
| Native PDF background presets | Zotero 8–10 |
| Zotero 11 beta | Experimental, not yet verified |
| Platforms | Intended for Zotero desktop; Linux has been visually tested |

The add-on's declared compatibility range is Zotero 7 through 10.0.x. Native custom reader theme availability differs by Zotero release. For best results, test on a current supported Zotero version. Display labels provided by this add-on are in English; Zotero's own menus retain the application's selected language.

## How it works

The original Cupertino CSS is registered as a Zotero author-level stylesheet. The add-on preserves the native menu and sidebar geometry rather than hiding them. A reader-toolbar extension hook exposes background presets using Zotero's own custom reader theme mechanism. No PDF document data is sent to an external service by this add-on; it does not rewrite PDF contents or annotations.

The extension has a unique add-on ID, `cupertino-with-pdf-background@vict0rg.github.io`, separate from the original Cupertino add-on.

## Build from source

Requirements: Python 3 and Node.js for syntax checks; no additional Python packages are needed.

```bash
node --check Cupertino-Zotero/bootstrap.js
node --check Cupertino-Zotero/reader-background.js
node tests/reader-background.test.cjs
python3 scripts/build.py
```

The reproducible build writes an installable `.xpi` and `updates.json` to `dist/`. GitHub Actions runs those checks before creating a tagged release.

## Acknowledgements and licensing

**This project is a fork, not an official release of Cupertino for Zotero or Zotero.**

- **[Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero)** — original source, styling, icons, layout and row animations, available under the **MIT License**. Its original copyright notice and license are retained.
- **[Cupertino for Obsidian](https://github.com/svnaxis/obsidian-cupertino)** (formerly `aaaaalexis/obsidian-cupertino`) — the **MIT-licensed visual inspiration** identified by the original Cupertino for Zotero project. This fork does not directly import code or assets from the Obsidian project.
- **[Zotero PDF Background](https://github.com/wangqian06/zotero-pdf-background)** and **[azhar-rafiq's fork](https://github.com/azhar-rafiq/zotero-pdf-background)** — inspiration for a reader-background selector. No code or artwork was copied from these repositories, since no explicit redistribution license was identified in the inspected versions.
- **[Zotero](https://www.zotero.org/)** — host application and built-in PDF reader/theme APIs. This project is not affiliated with the Zotero team.

For precise licensing scope, acknowledgements and compliance notes see **[CREDITS.md](CREDITS.md)**, **[NOTICE.md](NOTICE.md)** and the preserved **[MIT LICENSE](LICENSE)**. Original project history is retained by the GitHub fork relationship.

## Contributing

Issues and pull requests are welcome for reader accessibility, localization, compatibility, styling conflicts, and regression reports. Please include your Zotero version, operating system, and a description of the behavior. **Remove private library information from screenshots** before posting.

Copyright notices must remain intact when redistributing adapted MIT-licensed code. Avoid importing material without a license that permits reuse.

---

*Maintained by [vict0rg](https://github.com/vict0rg). Independent community project; no endorsement by the referenced projects is implied.*
