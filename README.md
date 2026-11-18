# Cupertino Zotero Soft Theme

**Original Cupertino gray, red highlights, permanently visible document toolbars and named PDF/EPUB reading colors.**

[**Latest XPI**](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases/latest) · [Releases](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases) · [Credits](CREDITS.md) · [Changelog](CHANGELOG.md)

**Recommended companion:** [Cupertino Obsidian Soft Theme](https://github.com/vict0rg/cupertino-obsidian-soft-theme) — shares the Soft Gray page and #333338 text color. Use both for a consistent research and writing workspace.

## Highlights

- **Soft Gray by default:** reader Background #FAFAFA and Foreground #333338, shared with Obsidian.
- **Original Cupertino gray interface:** `#EBEBED` navigation sidebars, tabs and menu strip, `#D9D9DE` dividers; the bibliography list is nearly white with quiet zebra rows.
- **Always-visible Zotero menu:** File, Edit, View, Tools and Help stay usable.
- **Metadata panel (v0.6.0):** the side-navigation rail reserves its own 40px flex column; metadata wraps in the remaining space instead of passing under its icons.
- **Article list:** alternating soft gray (`#F7F8F9` / `#ECEFF1`) rows, muted selection and a slightly stronger hover shade.
- **Native Reading Colors:** Soft Gray, Soft Paper, Cream, Blue, Sage, Original, and + Custom Colors for a named Foreground/Background pair; PDF/EPUB content is not modified.
- **Readable palette:** #333338 text, original #FF3B30 red indicators, dark mode and reduced-motion support.
- **Linux window compatibility:** opaque titlebar and menus avoid showing the desktop wallpaper through the window.

## v0.6.0 coordinated visual design

The **Zotero window now follows the Cupertino gray aesthetic**, with neutral grays and native menus rather than cream-colored navigation. Soft Gray (`#FAFAFA`) is the shared reading surface. Pale red (`#FFE9E8`) identifies selected collections and articles with a restrained original-red edge stripe (`#FF3B30`) that remains visible but less saturated when the window loses focus. Central list rows alternate near-white and pale gray (`#F5F5F6`).

The original red draws on [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero), using its `#FF3B30` accent with pale selection fills. Bibliographic metadata and ranking/status color semantics are otherwise preserved.

## v0.6.0 permanently visible toolbar and metadata rail

The item toolbar above the document list no longer collapses to 10px or disappears until hovered. Collection and tab controls also remain visible. The previous release repaired right-side icon navigation overlapping bibliographic metadata. The standard (non-stacked) details pane now reserves a fixed 40px flex slot for that navigation. Stacked mode is left to Zotero's native layout. The article/ebook list uses pale-gray alternating row backgrounds. The default reader scheme is now Soft Gray.

The fix is covered by structural regression tests but should be confirmed in Zotero's actual desktop UI, because the tests do not simulate Gecko's layout engine. Restart Zotero after installing. If something still overlaps, note the Zotero version, X11/Wayland and panel width in the report.

## Shared palette

| Element | Color |
| --- | --- |
| Default PDF/EPUB Soft Gray | `#FAFAFA` |
| Main background | `#FAFAFA` |
| Navigation panes | `#EBEBED` |
| Toolbars / tabs | `#EBEBED` |
| Borders | `#D9D9DE` |
| Reader foreground/body text | `#333338` |
| Cupertino red accents | `#FF3B30` |
| Selection background | `#FFE9E8` |
| Alternating table/list rows | `#F5F5F6` |

## Install or upgrade

1. Download **[cupertino-zotero-soft-theme-0.6.0.xpi](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases/download/v0.6.0/cupertino-zotero-soft-theme-0.6.0.xpi)**.
2. Open Zotero → **Tools → Plugins → gear icon → Install Plugin From File**.
3. Select the XPI, restart Zotero if needed, and reopen PDF tabs.
4. Disable competing *full interface* theme plugins if you see unwanted visual overlap.

**Upgrade continuity:** Earlier versions called “Cupertino for Zotero with PDF Background” and “Cupertino Cream for Zotero” use the **same internal add-on ID**, `cupertino-with-pdf-background@vict0rg.github.io`. The ID stays unchanged to preserve installed upgrades. Do not install two copies as separate add-ons.

## Reader foreground and background

Look in the reader toolbar, near **Appearance (Aa)**, for **Reading Colors**. Choose **+ Custom Colors…** to give a theme a name and enter both Background and Foreground in hex (or choose from color swatches); it is saved in Zotero's native synced reader themes.

| Option | Background | Text |
| --- | --- | --- |
| **Soft Gray (default)** | `#FAFAFA` | `#333338` |
| Soft Paper (legacy) | `#FAFAF7` | `#252B30` |
| Soft Cream | `#FFF9EC` | `#332E2B` |
| Soft Blue | `#EDF4F8` | `#223648` |
| Soft Sage | `#EEF3EA` | `#25392E` |
| Original | Zotero original | Zotero original |

For **Zotero 8+**, Soft Gray is selected on a fresh reader configuration. On upgrade, only the untouched v0.5.0 Soft Paper default migrates once; previously edited colors and other selections remain. All custom themes remain under Zotero's native Appearance panel, even after uninstalling. The same themes apply to PDFs, EPUBs and saved web snapshots; complex scanned PDFs may render imperfectly.

## Compatibility and testing

- Main interface: Zotero 7–10
- Native PDF/EPUB theme controls: Zotero 8–10
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

The build produces `dist/cupertino-zotero-soft-theme-0.6.0.xpi` and `dist/updates.json`. Automatic update links point to this renamed repository.

## Plugin directories

The canonical [Zotero Plugins Atlas listing](https://zoteroplugins.org/p/cupertino-zotero-soft-theme) now uses the current repository name. As neither the repository nor the installed add-on ID changed, a routine version update needs no duplicate listing. The historical [migration issue #12](https://github.com/iliasbeshimov/zoteroplugins.org/issues/12) is documented in [ATLAS_UPDATE_REQUEST.md](ATLAS_UPDATE_REQUEST.md).

The [Add-on Market for Zotero](https://github.com/syt2/zotero-addons) has a separate submission catalog; see [MARKETPLACE_SUBMISSION.md](MARKETPLACE_SUBMISSION.md).

## Credits and licensing

This is a **GitHub fork** of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) (MIT); the original source, icons, authorship and complete license notice are preserved. Its modifications include accessible menus, native reader colors, softer gray UI, packaging and tests.

Design-only references with **no copied source code or assets**: [Cupertino for Obsidian](https://github.com/svnaxis/obsidian-cupertino) (MIT), [Notation](https://github.com/deathau/Notation-for-Obsidian) (The Unlicense), [Typewriter](https://github.com/crashmoney/obsidian-typewriter) (GPL-3.0), [Shimmering Focus](https://github.com/chrisgrieser/shimmering-focus) (MIT) and [Olivier's Theme](https://github.com/OlivierPS/Olivier-s-Theme) (MIT).

[Zotero PDF Background](https://github.com/wangqian06/zotero-pdf-background) and [azhar-rafiq's fork](https://github.com/azhar-rafiq/zotero-pdf-background) inspired the selector **functionality**, but no unlicensed code or assets were copied. See [CREDITS.md](CREDITS.md), [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

Independent community project by [vict0rg](https://github.com/vict0rg), not endorsed by Zotero or the original authors.
