# Changelog

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
