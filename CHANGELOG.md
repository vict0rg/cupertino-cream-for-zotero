# Changelog

## 0.6.0 — Original gray/red, always-visible toolbar and named reader colors

- Coordinated near-white #FAFAFA, sidebar #EBEBED, metadata #F2F2F4, text #333338 and original red #FF3B30 palette with Obsidian Soft v0.4.0.
- Fixed upstream hover-only controls that hid the item/document toolbar and reduced discoverability of the collection and tab controls.
- Added Soft Gray as the new native PDF/EPUB foreground/background default while retaining prior presets.
- Added a named custom color dialog with editable hex Background and Foreground plus swatches; saves to Zotero SyncedSettings.
- Migrates only the untouched former Soft Paper default, preserving independent user themes, settings and the stable add-on ID.
- Added reader-dialog, color persistence and visible-toolbar regression tests.

## 0.5.0 — Cupertino Zotero Soft Theme

- Final cross-application palette based on default Obsidian layout, Soft Paper page and muted coral selections.
- Accent #D78381, selected row #F5E5E5, gray panels #F3F3F3, alternate list rows #F3F4F2.
- Selection retains visibility in inactive windows; preserved metadata rail fixes and PDF reader choice.
- Renamed project links, update feed, build filenames and public documentation.
- Maintained stable Zotero add-on ID and the credits/license history.



## 0.4.1 — Metadata rail and gray zebra-striped list

- Explicitly reserve a 40px flex sibling for the right-hand sidenav instead of letting it cover the metadata.
- Keep the Zotero Stacked layout and hidden/collapsed states untouched.
- Alternate pale gray rows in the central item list, maintaining separate selected and hover styling.
- Retain PDF Soft Paper and the permanent Linux menubar/titlebar fixes.
- Add layout regression assertions alongside the existing reader and titlebar tests.


## 0.4.0 — Zotero Cupertino Soft Theme

- Renamed the project and all active GitHub/XPI URLs to Zotero Cupertino Soft Theme.
- Used Soft Paper (`#FAFAF7`) for the reading background, pale-gray sidebars and toolbars, gray separators, and subtle coral accents.
- Made Soft Paper the first-use PDF preset **only when the Zotero reader has no existing user theme preferences**.
- Retained the remaining presets, the permanent menubar, Linux opaque titlebar, and repaired metadata pane.
- Preserved the stable add-on ID for updates from previous editions.
- Updated English documentation, credits, license notices and companion references.
- Prepared a request to update the existing Zotero Plugins Atlas listing rather than duplicate it.

## Earlier versions

See the Git history and historical tagged releases for the Cupertino Cream and Cupertino with PDF Background development stages. Their license and source history remain part of this fork.
