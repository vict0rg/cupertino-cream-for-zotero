/*
 * Cupertino for Zotero with PDF Background — original reader controls, v0.4.0.
 *
 * Uses Zotero's native reader themes, not an overlay on PDF text layers.
 * Inspired by the UI goal of Zotero PDF Background (azhar-rafiq fork);
 * no source or assets from that project have been copied.
 *
 * Themes are saved to Zotero's synced readerCustomThemes setting only when
 * the user selects one; the original reader Appearance panel can edit them.
 */
var CupertinoReaderBackground = (() => {
  const SETTING = "readerCustomThemes";
  const CONTROL = "cupertino-reader-background-picker";
  const ADDON_CLASS = "cupertino-reader-background-control";
  const PRESETS = Object.freeze([
    { id: "customCupertinoPaper", label: "Soft Paper", background: "#FAFAF7", foreground: "#252B30" },
    { id: "customCupertinoCream", label: "Soft Cream", background: "#FFF9EC", foreground: "#332E2B" },
    { id: "customCupertinoBlue", label: "Soft Blue", background: "#EDF4F8", foreground: "#223648" },
    { id: "customCupertinoSage", label: "Soft Sage", background: "#EEF3EA", foreground: "#25392E" }
  ]);
  let installed = false;
  let listener = null;

  function readStoredThemes() {
    const items = Zotero.SyncedSettings?.get(Zotero.Libraries.userLibraryID, SETTING);
    return Array.isArray(items) ? items : [];
  }

  async function applyPreset(id) {
    if (id !== "original") {
      const preset = PRESETS.find(p => p.id === id);
      if (!preset) throw new Error("Unknown PDF background: " + id);
      if (!Zotero.SyncedSettings?.set) {
        throw new Error("Native reader themes require a Zotero version with synced reader settings");
      }
      if (id === "customCupertinoCream") await migrateLegacyCream();
      const themes = readStoredThemes();
      if (!themes.some(x => x.id === id)) {
        // Never replace or remove themes created by other extensions or by the user.
        await Zotero.SyncedSettings.set(Zotero.Libraries.userLibraryID, SETTING, [
          ...themes, { ...preset }
        ]);
      }
    }
    // Apply to both appearance modes, intentionally: PDF background remains
    // consistent even when the user switches the application light/dark mode.
    // Readers react to these preference changes through Zotero's own observer.
    const choice = id === "original" ? false : id;
    Zotero.Prefs.set("reader.lightTheme", choice);
    Zotero.Prefs.set("reader.darkTheme", choice);
  }


  // Preserve the preference key from earlier releases, so existing user choices remain.
  const INITIAL_PREF = "extensions.cupertinoCream.initialReaderTheme";
  // Upgrade only the unchanged legacy preset, never customized user colors.
  async function migrateLegacyCream() {
    if (!Zotero.SyncedSettings?.set) return false;
    const themes = readStoredThemes();
    const legacy = themes.find(t => t?.id === "customCupertinoCream");
    if (!legacy ||
        String(legacy.background).toUpperCase() !== "#F7F1E5" ||
        String(legacy.foreground).toUpperCase() !== "#252B30") return false;
    const preset = PRESETS.find(p => p.id === "customCupertinoCream");
    await Zotero.SyncedSettings.set(Zotero.Libraries.userLibraryID, SETTING,
      themes.map(t => t.id === preset.id
        ? { ...t, background: preset.background, foreground: preset.foreground }
        : t));
    return true;
  }

  // Apply a cream default exactly once, and only to a fresh reader configuration.
  async function initializeReaderTheme() {
    if (Number.parseInt(String(Zotero.version || "0"), 10) < 8 ||
        !Zotero.Prefs?.get || !Zotero.SyncedSettings?.set) return;
    await migrateLegacyCream();
    if (Zotero.Prefs.get(INITIAL_PREF)) return;
    const light = Zotero.Prefs.get("reader.lightTheme");
    const dark = Zotero.Prefs.get("reader.darkTheme");
    if (!light && !dark && readStoredThemes().length === 0) {
      await applyPreset("customCupertinoPaper");
    }
    Zotero.Prefs.set(INITIAL_PREF, true);
  }

  function renderToolbar(event) {
    try {
      const { doc, append } = event;
      if (!doc || typeof append !== "function") return;
      if (doc.getElementById(CONTROL)) return;

      const group = doc.createElement("span");
      group.className = ADDON_CLASS;
      group.style.cssText = "display:inline-flex;align-items:center;gap:5px;margin:0 5px;";

      const label = doc.createElement("label");
      label.textContent = "PDF Background";
      label.setAttribute("for", CONTROL);
      label.style.cssText = "font-size:12px;white-space:nowrap;color:var(--fill-secondary,inherit);";

      const select = doc.createElement("select");
      select.id = CONTROL;
      select.title = "Select a soft PDF reading background";
      select.setAttribute("aria-label", "PDF Background");
      select.style.cssText =
        "font-size:12px;min-width:118px;max-width:150px;padding:3px 7px;" +
        "border-radius:6px;border:1px solid var(--color-border50,#bbb);" +
        "background:var(--material-background,#fff);color:var(--fill-primary,#222);";

      function addOption(id, title) {
        const option = doc.createElement("option");
        option.value = id;
        option.textContent = title;
        select.appendChild(option);
      }
      addOption("original", "Original");
      for (const preset of PRESETS) addOption(preset.id, preset.label);

      const active = Zotero.Prefs.get("reader.lightTheme");
      select.value = PRESETS.some(x => x.id === active) ? active : "original";

      select.addEventListener("change", async () => {
        const previous = activeChoice();
        select.disabled = true;
        try {
          await applyPreset(select.value);
          select.title = "PDF Background: " + select.selectedOptions[0]?.textContent;
        }
        catch (error) {
          Zotero.logError(error);
          select.value = previous;
          try { event.reader?._iframeWindow?.alert("Could not set PDF background. See Zotero's error log."); }
          catch (_) {}
        }
        finally { select.disabled = false; }
      });

      function activeChoice() {
        const selected = Zotero.Prefs.get("reader.lightTheme");
        return PRESETS.some(x => x.id === selected) ? selected : "original";
      }

      group.appendChild(label);
      group.appendChild(select);
      append(group);
    }
    catch (error) { Zotero.logError(error); }
  }

  function start(pluginID) {
    if (installed) return;
    if (!Zotero.Reader?.registerEventListener) {
      Zotero.debug("Cupertino PDF Background: reader toolbar API unavailable.");
      return;
    }
    listener = renderToolbar;
    Zotero.Reader.registerEventListener("renderToolbar", listener, pluginID);
    installed = true;
    Promise.resolve().then(initializeReaderTheme).catch(error => Zotero.logError(error));
  }

  function stop() {
    if (installed && listener) {
      Zotero.Reader?.unregisterEventListener("renderToolbar", listener);
    }
    installed = false;
    listener = null;
    // Remove inserted DOM controls from open readers without altering Zotero's
    // own theme preferences. Users can still select them through Appearance.
    for (const reader of Zotero.Reader?._readers || []) {
      try {
        reader._iframeWindow?.document?.querySelectorAll("." + ADDON_CLASS)
          .forEach(node => node.remove());
      }
      catch (error) { Zotero.logError(error); }
    }
  }

  return { start, stop, applyPreset, migrateLegacyCream, initializeReaderTheme, presets: PRESETS };
})();
