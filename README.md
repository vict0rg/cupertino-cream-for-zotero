# Cupertino Zotero Soft Theme

**Soft Paper PDFs, calm gray Cupertino panels and gently colored details for focused reading in Zotero.**

[**Latest XPI**](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases/latest) · [Releases](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases) · [Credits](CREDITS.md) · [Changelog](CHANGELOG.md)

**Recommended companion:** [Cupertino Obsidian Soft Theme](https://github.com/vict0rg/cupertino-obsidian-soft-theme) — matches the PDF's Soft Paper color in the Obsidian editor. Use both for a consistent research and writing workspace.

## Highlights

- **Soft Paper by default on a fresh reader configuration:** `#FAFAF7`, close to white but less stark.
- **Obsidian-default gray interface:** `#F3F3F3` navigation sidebars, `#EEEEEE` tabs and menu strip, `#DDDEDE` dividers; bibliography list remains on Soft Paper with quiet zebra rows.
- **Always-visible Zotero menu:** File, Edit, View, Tools and Help stay usable.
- **Metadata panel (v0.5.0):** the side-navigation rail reserves its own 40px flex column; metadata wraps in the remaining space instead of passing under its icons.
- **Article list:** alternating soft gray (`#F7F8F9` / `#ECEFF1`) rows, muted selection and a slightly stronger hover shade.
- **Native PDF Background selector:** Soft Paper, Soft Cream, Soft Blue, Soft Sage or Original — no changes to PDF file data, annotations or text layers.
- **Accessible palette:** dark-on-light text, small muted coral selection indicators, dark mode and reduced-motion support.
- **Linux window compatibility:** opaque titlebar and menus avoid showing the desktop wallpaper through the window.

## v0.5.0 coordinated visual design

The **Zotero window now follows the default Obsidian aesthetic**, with neutral grays and native menus rather than opaque cream-colored navigation. Soft Paper (`#FAFAF7`) is the shared reading surface. Pale coral (`#F5E5E5`) identifies selected collections and articles with a restrained edge stripe (`#D78381`) that remains visible but less saturated when the window loses focus. Central list rows alternate Soft Paper and near-gray (`#F3F4F2`).

The coral draws on the source [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero), whose original red (`#FF3B30`) and warm coral (`#FF6B61`) are reduced in saturation. Bibliographic metadata and ranking/status color semantics are otherwise preserved.

## v0.5.0 layout correction

This maintenance release responds to a regression reported with the right-side icon navigation overlapping bibliographic metadata. The standard (non-stacked) details pane now reserves a fixed 40px flex slot for that navigation. Stacked mode is left to Zotero's native layout. The article/ebook list uses pale-gray alternating row backgrounds; **PDF Soft Paper (#FAFAF7)** and reader presets are unchanged.

The fix is covered by structural regression tests but should be confirmed in Zotero's actual desktop UI, because the tests do not simulate Gecko's layout engine. Restart Zotero after installing. If something still overlaps, note the Zotero version, X11/Wayland and panel width in the report.

## Shared palette

| Element | Color |
| --- | --- |
| Default PDF Soft Paper | `#FAFAF7` |
| Main background | `#FAFAF7` |
| Navigation panes | `#F3F3F3` |
| Toolbars / tabs | `#EEEEEE` |
| Borders | `#DDDEDE` |
| Body text | `#31353A` |
| Soft coral accents | `#D78381` |
| Selection background | `#F5E5E5` |
| Alternating table/list rows | `#F3F4F2` |

## Install or upgrade

1. Download **[cupertino-zotero-soft-theme-0.5.0.xpi](https://github.com/vict0rg/cupertino-zotero-soft-theme/releases/download/v0.5.0/cupertino-zotero-soft-theme-0.5.0.xpi)**.
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

The build produces `dist/cupertino-zotero-soft-theme-0.5.0.xpi` and `dist/updates.json`. Automatic update links point to this renamed repository.

## Plugin directories

An earlier edition is **already listed with grade A** at [Zotero Plugins Atlas](https://zoteroplugins.org/p/cupertino-cream-for-zotero). Because this is the **same repository and same installed add-on ID**, we have **filed an [existing-listing update request](https://github.com/iliasbeshimov/zoteroplugins.org/issues/12)**, not a duplicate submission. See [ATLAS_UPDATE_REQUEST.md](ATLAS_UPDATE_REQUEST.md).

The [Add-on Market for Zotero](https://github.com/syt2/zotero-addons) has a separate submission catalog; see [MARKETPLACE_SUBMISSION.md](MARKETPLACE_SUBMISSION.md).

## Credits and licensing

This is a **GitHub fork** of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) (MIT); the original source, icons, authorship and complete license notice are preserved. Its modifications include accessible menus, native reader colors, softer gray UI, packaging and tests.

Design-only references with **no copied source code or assets**: [Cupertino for Obsidian](https://github.com/svnaxis/obsidian-cupertino) (MIT), [Notation](https://github.com/deathau/Notation-for-Obsidian) (The Unlicense), [Typewriter](https://github.com/crashmoney/obsidian-typewriter) (GPL-3.0), [Shimmering Focus](https://github.com/chrisgrieser/shimmering-focus) (MIT) and [Olivier's Theme](https://github.com/OlivierPS/Olivier-s-Theme) (MIT).

[Zotero PDF Background](https://github.com/wangqian06/zotero-pdf-background) and [azhar-rafiq's fork](https://github.com/azhar-rafiq/zotero-pdf-background) inspired the selector **functionality**, but no unlicensed code or assets were copied. See [CREDITS.md](CREDITS.md), [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

Independent community project by [vict0rg](https://github.com/vict0rg), not endorsed by Zotero or the original authors.
