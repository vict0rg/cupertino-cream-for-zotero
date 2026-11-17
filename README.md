# Zotero Cupertino Soft Theme

**Soft Paper PDFs, calm gray Cupertino panels and gently colored details for focused reading in Zotero.**

[**Latest XPI**](https://github.com/vict0rg/zotero-cupertino-soft-theme/releases/latest) · [Releases](https://github.com/vict0rg/zotero-cupertino-soft-theme/releases) · [Credits](CREDITS.md) · [Changelog](CHANGELOG.md)

**Recommended companion:** [Obsidian Cupertino Soft Theme](https://github.com/vict0rg/obsidian-cupertino-soft-theme) — matches the PDF's Soft Paper color in the Obsidian editor. Use both for a consistent research and writing workspace.

## Highlights

- **Soft Paper by default on a fresh reader configuration:** `#FAFAF7`, close to white but less stark.
- **Cupertino gray interface:** `#F1F2F3` navigation sidebars, `#E8EAEC` tabs and menu strip, `#DDE0E3` dividers.
- **Always-visible Zotero menu:** File, Edit, View, Tools and Help stay usable.
- **Metadata panel:** navigation icons no longer expand over bibliographic fields.
- **Native PDF Background selector:** Soft Paper, Soft Cream, Soft Blue, Soft Sage or Original — no changes to PDF file data, annotations or text layers.
- **Accessible palette:** dark-on-light text, small muted coral selection indicators, dark mode and reduced-motion support.
- **Linux window compatibility:** opaque titlebar and menus avoid showing the desktop wallpaper through the window.

## Shared palette

| Element | Color |
| --- | --- |
| Default PDF Soft Paper | `#FAFAF7` |
| Main background | `#FAFAF7` |
| Navigation panes | `#F1F2F3` |
| Toolbars / tabs | `#E8EAEC` |
| Borders | `#DDE0E3` |
| Body text | `#31353A` |
| Soft coral accents | `#C97073` |

## Install or upgrade

1. Download **[zotero-cupertino-soft-theme-0.4.0.xpi](https://github.com/vict0rg/zotero-cupertino-soft-theme/releases/download/v0.4.0/zotero-cupertino-soft-theme-0.4.0.xpi)**.
2. Open Zotero → **Tools → Plugins → gear icon → Install Plugin From File**.
3. Select the XPI, restart Zotero if needed, and reopen PDF tabs.
4. Disable competing *full interface* theme plugins if you see unwanted visual overlap.

**Upgrade continuity:** Earlier versions called “Cupertino for Zotero with PDF Background” and “Cupertino Cream for Zotero” use the **same internal add-on ID**, `cupertino-with-pdf-background@vict0rg.github.io`. The ID stays unchanged to preserve installed upgrades. Do not install two copies as separate add-ons.

## Reader backgrounds

Look in the PDF reader toolbar, near **Appearance (Aa)**, for the **PDF Background** selector.

| Option | Background | Text |
| --- | --- | --- |
| **Soft Paper** | `#FAFAF7` | `#252B30` |
| Soft Cream | `#FFF9EC` | `#332E2B` |
| Soft Blue | `#EDF4F8` | `#223648` |
| Soft Sage | `#EEF3EA` | `#25392E` |
| Original | Zotero original | Zotero original |

For **Zotero 8+**, Soft Paper is selected automatically **only when a new user has no saved reader preferences and no custom reader themes**. Existing users' choices are preserved. If you previously selected Soft Cream, choose Soft Paper manually in the selector. Any existing custom themes remain under the Zotero reader Appearance panel, even after uninstalling this add-on.

## Compatibility and testing

- Main interface: Zotero 7–10
- Native PDF theme controls: Zotero 8–10
- Zotero 11 beta: not verified as compatible
- Linux used for visual testing; other platforms benefit from further reports
- GitHub Actions runs syntax checks, mocked reader controls and titlebar regression tests before publishing an XPI

## Build

Requires Python 3 and Node.js:

```bash
node --check Cupertino-Zotero/bootstrap.js
node --check Cupertino-Zotero/reader-background.js
node tests/reader-background.test.cjs
node tests/opaque-titlebar.test.cjs
python3 scripts/build.py
```

The build produces `dist/zotero-cupertino-soft-theme-0.4.0.xpi` and `dist/updates.json`. Automatic update links point to this renamed repository.

## Plugin directories

An earlier edition is **already listed with grade A** at [Zotero Plugins Atlas](https://zoteroplugins.org/p/cupertino-cream-for-zotero). Because this is the **same repository and same installed add-on ID**, we are requesting an *existing listing update*, not a duplicate submission. See [ATLAS_UPDATE_REQUEST.md](ATLAS_UPDATE_REQUEST.md).

The [Add-on Market for Zotero](https://github.com/syt2/zotero-addons) has a separate submission catalog; see [MARKETPLACE_SUBMISSION.md](MARKETPLACE_SUBMISSION.md).

## Credits and licensing

This is a **GitHub fork** of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) (MIT); the original source, icons, authorship and complete license notice are preserved. Its modifications include accessible menus, native reader colors, softer gray UI, packaging and tests.

Design-only references with **no copied source code or assets**: [Cupertino for Obsidian](https://github.com/svnaxis/obsidian-cupertino) (MIT), [Notation](https://github.com/deathau/Notation-for-Obsidian) (The Unlicense), [Typewriter](https://github.com/crashmoney/obsidian-typewriter) (GPL-3.0), [Shimmering Focus](https://github.com/chrisgrieser/shimmering-focus) (MIT) and [Olivier's Theme](https://github.com/OlivierPS/Olivier-s-Theme) (MIT).

[Zotero PDF Background](https://github.com/wangqian06/zotero-pdf-background) and [azhar-rafiq's fork](https://github.com/azhar-rafiq/zotero-pdf-background) inspired the selector **functionality**, but no unlicensed code or assets were copied. See [CREDITS.md](CREDITS.md), [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

Independent community project by [vict0rg](https://github.com/vict0rg), not endorsed by Zotero or the original authors.
