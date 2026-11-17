# Cupertino Cream for Zotero v0.3.1

**Linux titlebar opacity fix.**

On some KDE and GTK-based Linux desktops, the titlebar and tabs appeared transparent, showing the desktop wallpaper behind Zotero's main menu and reducing readability. This release replaces the inherited transparent surfaces with a solid cream background in light mode and a dark-brown surface in dark mode.

The corrected regions are Zotero's native titlebar, menu strip and tab strip. Native window controls, menu interactions, and dragging behavior are retained.

**No changes** to the reader's PDF background presets (Soft Cream, Soft Blue, Soft Sage, Soft Paper, Original), metadata pane geometry, item-tree motion, or add-on identity. The MIT source licensing and upstream credit documentation remain unchanged.

## Install

Download `cupertino-cream-for-zotero-0.3.1.xpi` and install using **Tools → Plugins → Install Plugin From File**. Restart Zotero after updating and disable other complete UI themes to avoid conflicting CSS.

If the fix does not work in your Linux environment, please report Zotero version, KDE/GNOME/other desktop environment, X11 or Wayland, and a screenshot. The prior [v0.3.0](https://github.com/vict0rg/cupertino-cream-for-zotero/releases/tag/v0.3.0) remains available for rollback.

**Credits:** original Cupertino for Zotero by shenghuang-123 et al. (MIT); Notation by deathau (The Unlicense) as design inspiration; PDF Background projects as feature references without reused source. Details: [CREDITS.md](https://github.com/vict0rg/cupertino-cream-for-zotero/blob/main/CREDITS.md).

**Companion theme:** [Cupertino Cream for Obsidian](https://github.com/vict0rg/obsidian-cupertino-cream).
