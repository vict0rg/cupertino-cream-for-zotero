# Cupertino Cream for Zotero

A calm, warm, Cupertino-inspired interface for Zotero, with comfortable PDF background presets and unobstructed menu/navigation controls.

**Obsidian companion:** [Cupertino Cream](https://github.com/vict0rg/obsidian-cupertino-cream) — **recommended** for matching writing, note-taking and reading workspaces across Obsidian and Zotero.

[**Download XPI**](https://github.com/vict0rg/cupertino-cream-for-zotero/releases/download/v0.3.2/cupertino-cream-for-zotero-0.3.2.xpi) · [Releases](https://github.com/vict0rg/cupertino-cream-for-zotero/releases) · [Licensing](CREDITS.md) · [Changelog](CHANGELOG.md)

## Highlights

- **Shared Cupertino Cream palette** with the Obsidian theme: warm paper, creamy sidebars, sand-colored toolbars and restrained Cupertino red accents.
- **Native menus always visible:** File, Edit, View, Tools, Help; translated by Zotero according to your UI language.
- **No metadata overlay:** the right-hand navigation rail no longer expands over bibliographic details.
- **Four PDF reading backgrounds** available from a convenient reader toolbar selector, using Zotero's built-in reader themes.
- **Cupertino UI:** rounded panels, polished tabs, light/dark styles and smooth item-tree animations from the MIT-licensed upstream project.
- **Separate extension identity:** the add-on ID is intentionally unchanged from the earlier "Cupertino for Zotero with PDF Background" releases, preserving existing installations and update compatibility.

## v0.3.2 — Letter Paper

Brighter, gently yellow ivory paper replaces the brown-leaning cream. The **Soft Cream** PDF preset now matches the Obsidian companion note color, `#FFF9EC`.

On Zotero 8+ the extension selects Soft Cream on first install only if no prior reader theme or user theme exists. Existing reader preferences remain intact. An unmodified legacy Soft Cream custom theme is migrated to the new color, while any user-edited colors are preserved. **Original** always restores Zotero's native PDF background.

Typewriter (GPL-3.0), Shimmering Focus (MIT), Olivier's Theme (MIT) and Notation (The Unlicense) are design references only; their CSS is not reused.

## Shared warm palette

| Role | Color |
| --- | --- |
| Main reading surface | `#FFF9EC` |
| PDF Soft Cream preset | `#FFF9EC` |
| Left sidebar | `#F4F0E4` |
| Toolbar and tabs | `#F6EFDE` |
| Body text | `#332E2B` |
| Accent red | `#FF3B30` |

The light interface is deliberately cream rather than pure white. Red is used sparingly for selected rows and navigation focus.

## Linux titlebar fix (v0.3.2)

Some Linux desktop configurations (including KDE/GTK titlebars under X11 or Wayland) revealed the desktop wallpaper through the application menu strip and the tab strip. **v0.3.2 uses opaque cream/dark surfaces for the titlebar, tab container and native menu strip**, while preserving Zotero window controls and menus.

This release does **not** change the PDF reader's background presets, icons or metadata sidebar geometry. If your window still has an unwanted transparent top after upgrading, fully restart Zotero and ensure no other theme extension is active. Report your Zotero version, desktop environment, display protocol (X11/Wayland), and a screenshot with private library details hidden.

You can reinstall [v0.3.0](https://github.com/vict0rg/cupertino-cream-for-zotero/releases/tag/v0.3.0) to revert the styling if needed.

## Install

1. Download the XPI from [Release v0.3.2](https://github.com/vict0rg/cupertino-cream-for-zotero/releases/tag/v0.3.2).
2. In Zotero, open **Tools → Plugins → gear icon → Install Plugin From File**.
3. Disable other full-interface theme plugins during testing to avoid CSS conflicts.
4. Restart Zotero or reopen PDF tabs if a change does not appear immediately.

**Upgrade note:** if you have **Cupertino for Zotero with PDF Background v0.2.x** installed, v0.3.2 is its renamed successor. Its internal add-on ID is unchanged; do **not** install it as a separate competing theme.

## PDF reading backgrounds

Open any PDF and select **PDF Background** from the right end of the reader toolbar, immediately before **Appearance (Aa)**.

| Preset | Background | Text |
| --- | --- | --- |
| Original | Native Zotero defaults | Native defaults |
| Soft Cream | `#FFF9EC` | `#332E2B` |
| Soft Blue | `#EDF4F8` | `#223648` |
| Soft Sage | `#EEF3EA` | `#25392E` |
| Soft Paper | `#FAFAF7` | `#252B30` |

The extension does **not** rewrite PDF files or annotations. It adds selected themes to Zotero's native custom reader theme list only when used. These reader preferences can remain after the extension is disabled and are adjustable in Zotero Appearance.

## Compatibility

- Main interface: Zotero 7–10 (declared minimum 7.0, maximum 10.0.x)
- Native PDF theme presets: Zotero 8–10
- Zotero 11 beta: not yet confirmed in real-client tests
- Tested visually on Linux by the maintainer; other platforms welcome testing

## Build and test

Run with Python 3 and Node.js:

```bash
node --check Cupertino-Zotero/bootstrap.js
node --check Cupertino-Zotero/reader-background.js
node tests/reader-background.test.cjs
python3 scripts/build.py
```

The build creates `dist/cupertino-cream-for-zotero-0.3.2.xpi` and `dist/updates.json`. GitHub Actions publishes tested releases. The add-on identifier remains `cupertino-with-pdf-background@vict0rg.github.io` for upgrade continuity even though the public name and repository changed.

## Get listed

The plugin may be submitted to third-party directories after a public release. See [MARKETPLACE_SUBMISSION.md](MARKETPLACE_SUBMISSION.md) for the [Zotero Plugins Atlas](https://zoteroplugins.org/submit) and the [Add-on Market for Zotero catalog](https://github.com/syt2/zotero-addons-scraper).

Directory appearance requires separate review; this repository's presence on GitHub does not automatically list it.

## Credits and licenses

This repository is a **fork** of [Cupertino for Zotero](https://github.com/shenghuang-123/cupertino-for-zotero) (MIT). It preserves the original license, copyright notice, Git history, and source attribution. The warm design takes inspiration from [Notation](https://github.com/deathau/Notation-for-Obsidian) (The Unlicense), with original palette overrides. [Cupertino for Obsidian](https://github.com/svnaxis/obsidian-cupertino) (MIT) inspired the companion theme's design, not directly included Zotero code.

The original [Zotero PDF Background](https://github.com/wangqian06/zotero-pdf-background) and [azhar-rafiq fork](https://github.com/azhar-rafiq/zotero-pdf-background) are feature references only. **Their unlicensed code was not copied into this plugin.**

See [CREDITS.md](CREDITS.md), [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE) for licensing scope and notices. This is an independent community project, not endorsed by Zotero or the upstream authors.

Maintained by [vict0rg](https://github.com/vict0rg).
