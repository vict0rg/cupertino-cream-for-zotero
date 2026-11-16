# Changelog

## 0.2.2 — Public documentation and attribution (no functional changes)

- Reorganized the public README in English with complete installation, palette and compatibility instructions.
- Verified and documented Cupertino for Zotero's MIT licensing and the original Cupertino for Obsidian MIT design reference.
- Credited both the original Zotero PDF Background project and azhar-rafiq's fork strictly as inspiration; their source is not incorporated.
- Added NOTICE.md and specific release notes to clarify provenance and copyright.
- Maintained the successful v0.2.1 menu, metadata sidebar and PDF preset behaviors without functional changes.

## 0.2.1 — Reader toolbar and metadata navigation fixes (experimental)

- Reader background selector: bundle the reader code directly into the Zotero bootstrap script instead of executing it through a separate subscript scope; register the toolbar hook after Zotero UI is ready.
- Right-hand item metadata navigation: remove the original Cupertino 10px hover-to-expand behavior so the navigation rail keeps its native width and does not cover citation metadata.
- Add a mocked reader toolbar test to the GitHub Actions build.
- All v0.2.0 reading colors and earlier changes remain intact.

## 0.2.0 — Soft PDF backgrounds (experimental)

- Added a clearly labeled **PDF Background** control to the native reader toolbar.
- Four preset reading colors: **Soft Cream**, **Soft Blue**, **Soft Sage**, and **Soft Paper**, plus **Original**.
- Uses Zotero's native reader theme system and synced custom themes, rather than painting semi-transparent overlays on PDF text.
- The selected scheme is applied to light and dark reader modes; the themes remain editable in Zotero's own **Appearance (Aa)** panel.
- The plugin does not modify PDF files, stored annotations, or bibliographic records.
- Existing custom reader themes are preserved. New themes are registered only when explicitly selected.
- Removing the add-on removes its toolbar selector, but Zotero retains any native custom themes the user chose.
- Current native reader theme support targets **Zotero 8–10**; the menu and Cupertino UI continue to target Zotero 7, where reader themes may be unavailable.
- Reader UI changes need testing in an actual Zotero session; this is a prerelease.
- The legacy PDF Background add-on was studied for its user-facing idea; no unlicensed source was copied.


## 0.1.0 — First preview

- Forked upstream Cupertino for Zotero v1.7.6 under a distinct add-on name and identifier.
- Removed the rule that automatically collapses the native main application menubar to 14 px and opacity 0.
- Restored persistent access to File, Edit, View, Tools, Help without changing native menu placement.
- Translated CSS/JavaScript code comments to English; added English manifest and documentation.
- Added reproducible XPI packaging, validation and a GitHub Actions pre-release workflow.
- Retained upstream artwork, styling, animations and MIT attribution.

**Not yet included:** PDF color preset controls, despite the long-term project name. Planned for v0.2.0.
