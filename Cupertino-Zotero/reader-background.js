/*
 * Cupertino Zotero Soft Theme — native PDF/EPUB reader colors, v0.6.0.
 * Custom themes use Zotero's synced readerCustomThemes setting, which drives
 * PDFs, EPUBs and snapshots. No pixel filters or PDF text overlays are used.
 * Preserve previous preset IDs and every user-created reader theme.
 */
var CupertinoReaderBackground = (() => {
  const SETTING = "readerCustomThemes";
  const CONTROL = "cupertino-reader-background-picker";
  const ADDON_CLASS = "cupertino-reader-background-control";
  const DEFAULT_MIGRATION_PREF = "extensions.cupertinoSoft.defaultGrayV060";
  const PRESETS = Object.freeze([
    { id: "customCupertinoGray", label: "Soft Gray", background: "#FAFAFA", foreground: "#333338" },
    { id: "customCupertinoPaper", label: "Soft Paper", background: "#FAFAF7", foreground: "#252B30" },
    { id: "customCupertinoCream", label: "Soft Cream", background: "#FFF9EC", foreground: "#332E2B" },
    { id: "customCupertinoBlue", label: "Soft Blue", background: "#EDF4F8", foreground: "#223648" },
    { id: "customCupertinoSage", label: "Soft Sage", background: "#EEF3EA", foreground: "#25392E" }
  ]);
  let installed = false;
  let listener = null;

  function readStoredThemes() {
    const themes = Zotero.SyncedSettings?.get(Zotero.Libraries.userLibraryID, SETTING);
    return Array.isArray(themes) ? themes : [];
  }

  function normalizeHex(value) {
    const color = String(value || "").trim().toUpperCase();
    const normalized = color.startsWith("#") ? color : "#" + color;
    if (!/^#[0-9A-F]{6}$/.test(normalized)) {
      throw new Error("Enter a six-digit color, such as #333338.");
    }
    return normalized;
  }

  function activeChoice() {
    return Zotero.Prefs.get("reader.lightTheme") || "original";
  }

  function selectTheme(id) {
    const selected = id === "original" ? false : id;
    // Zotero's own reader observers update all open PDFs and EPUBs.
    Zotero.Prefs.set("reader.lightTheme", selected);
    Zotero.Prefs.set("reader.darkTheme", selected);
  }

  async function applyPreset(id) {
    if (id === "original") {
      selectTheme(id);
      return;
    }
    const preset = PRESETS.find(theme => theme.id === id);
    const existing = readStoredThemes();
    if (!preset && !existing.some(theme => theme.id === id)) {
      throw new Error("Unknown reading theme: " + id);
    }
    if (preset && !existing.some(theme => theme.id === id)) {
      if (!Zotero.SyncedSettings?.set) {
        throw new Error("Native reader themes require synced reader settings.");
      }
      await Zotero.SyncedSettings.set(Zotero.Libraries.userLibraryID, SETTING, [
        ...existing, { ...preset }
      ]);
    }
    selectTheme(id);
  }

  async function saveCustomTheme(label, background, foreground) {
    const name = String(label || "").trim();
    if (!name || name.length > 48) {
      throw new Error("Give the theme a name of up to 48 characters.");
    }
    if (!Zotero.SyncedSettings?.set) {
      throw new Error("Your Zotero version does not support custom reader themes.");
    }
    const colors = { background: normalizeHex(background), foreground: normalizeHex(foreground) };
    const themes = readStoredThemes();
    if (themes.some(theme => theme.label?.toLowerCase() === name.toLowerCase())) {
      throw new Error("A reading theme with this name already exists.");
    }
    const id = "customCupertinoUser" + Date.now().toString(36) +
      Math.random().toString(36).slice(2, 8);
    const theme = { id, label: name, ...colors };
    await Zotero.SyncedSettings.set(Zotero.Libraries.userLibraryID, SETTING, [
      ...themes, theme
    ]);
    selectTheme(id);
    return theme;
  }

  // Existing cream users keep their edited colors. Only migrate untouched
  // historical values, preserving the original preset identifier.
  async function migrateLegacyCream() {
    if (!Zotero.SyncedSettings?.set) return false;
    const themes = readStoredThemes();
    const legacy = themes.find(t => t?.id === "customCupertinoCream");
    if (!legacy ||
        String(legacy.background).toUpperCase() !== "#F7F1E5" ||
        String(legacy.foreground).toUpperCase() !== "#252B30") return false;
    const preset = PRESETS.find(t => t.id === "customCupertinoCream");
    await Zotero.SyncedSettings.set(Zotero.Libraries.userLibraryID, SETTING,
      themes.map(t => t.id === preset.id
        ? { ...t, background: preset.background, foreground: preset.foreground }
        : t));
    return true;
  }

  // New installations receive Soft Gray. Existing v0.5.0 installations are
  // migrated only if both modes still use the untouched default Soft Paper.
  // Never override a custom foreground/background or a deliberate other theme.
  async function initializeReaderTheme() {
    if (Number.parseInt(String(Zotero.version || "0"), 10) < 8 ||
        !Zotero.Prefs?.get || !Zotero.SyncedSettings?.set) return;
    await migrateLegacyCream();
    if (Zotero.Prefs.get(DEFAULT_MIGRATION_PREF)) return;
    const light = Zotero.Prefs.get("reader.lightTheme");
    const dark = Zotero.Prefs.get("reader.darkTheme");
    const themes = readStoredThemes();
    const paper = themes.find(t => t?.id === "customCupertinoPaper");
    const untouchedPaper = paper &&
      String(paper.background).toUpperCase() === "#FAFAF7" &&
      String(paper.foreground).toUpperCase() === "#252B30";
    if ((!light && !dark && themes.length === 0) ||
        (light === "customCupertinoPaper" && dark === "customCupertinoPaper" && untouchedPaper)) {
      await applyPreset("customCupertinoGray");
    }
    Zotero.Prefs.set(DEFAULT_MIGRATION_PREF, true);
  }

  function createThemeDialog(doc, select) {
    const dlg = doc.createElement("dialog");
    dlg.className = ADDON_CLASS;
    dlg.setAttribute("aria-label", "Create custom reading theme");
    dlg.style.cssText =
      "border:1px solid #D9D9DE;border-radius:12px;padding:20px 22px;" +
      "min-width:290px;max-width:420px;color:#333338;background:#FAFAFA;" +
      "box-shadow:0 18px 48px #0003;font:13px system-ui,sans-serif;";

    const heading = doc.createElement("h3");
    heading.textContent = "Custom Reading Colors";
    heading.style.cssText = "font-size:16px;margin:0 0 14px;color:#333338;";
    dlg.appendChild(heading);

    function inputField(title, value) {
      const label = doc.createElement("label");
      label.textContent = title;
      label.style.cssText = "display:block;margin:10px 0;color:#6D6D75;";
      const row = doc.createElement("div");
      row.style.cssText = "display:flex;gap:8px;margin-top:5px;align-items:center;";
      const text = doc.createElement("input");
      text.type = "text";
      text.value = value;
      text.style.cssText = "flex:1;min-width:0;padding:7px;border:1px solid #D9D9DE;" +
        "border-radius:6px;background:white;color:#333338;";
      row.appendChild(text);
      if (title !== "Theme Name") {
        text.maxLength = 7;
        text.setAttribute("aria-label", title + " hex color");
        const picker = doc.createElement("input");
        picker.type = "color";
        picker.value = value;
        picker.setAttribute("aria-label", "Pick " + title.toLowerCase());
        picker.style.cssText = "width:34px;height:32px;padding:0;border:0;cursor:pointer;";
        text.addEventListener("input", () => {
          try { picker.value = normalizeHex(text.value); } catch (_) {}
        });
        picker.addEventListener("input", () => { text.value = picker.value.toUpperCase(); });
        row.appendChild(picker);
      }
      label.appendChild(row);
      dlg.appendChild(label);
      return text;
    }

    const name = inputField("Theme Name", "My Reading Theme");
    name.maxLength = 48;
    const background = inputField("Background", "#FAFAFA");
    const foreground = inputField("Foreground", "#333338");

    const errorMessage = doc.createElement("p");
    errorMessage.setAttribute("role", "alert");
    errorMessage.style.cssText = "color:#B52B24;min-height:1em;margin:8px 0;";
    dlg.appendChild(errorMessage);

    const actions = doc.createElement("div");
    actions.style.cssText = "display:flex;justify-content:flex-end;gap:8px;margin-top:8px;";
    function makeButton(labelText) {
      const button = doc.createElement("button");
      button.type = "button";
      button.textContent = labelText;
      button.style.cssText = "padding:7px 12px;border-radius:6px;cursor:pointer;";
      actions.appendChild(button);
      return button;
    }
    const cancel = makeButton("Cancel");
    const save = makeButton("Save Theme");
    save.style.background = "#FFE9E8";
    save.style.color = "#B52B24";
    dlg.appendChild(actions);

    function close() {
      if (typeof dlg.close === "function") dlg.close();
      dlg.remove();
    }
    cancel.addEventListener("click", close);
    dlg.addEventListener("close", () => dlg.remove());
    save.addEventListener("click", async () => {
      save.disabled = true;
      errorMessage.textContent = "";
      try {
        const theme = await saveCustomTheme(name.value, background.value, foreground.value);
        const option = doc.createElement("option");
        option.value = theme.id;
        option.textContent = theme.label;
        const newOption = Array.from(select.children).find(el => el.value === "__new__");
        if (newOption) select.insertBefore(option, newOption);
        else select.appendChild(option);
        select.value = theme.id;
        close();
      }
      catch (error) {
        errorMessage.textContent = error.message || "Could not save reading theme.";
        Zotero.logError(error);
      }
      finally { save.disabled = false; }
    });

    doc.body.appendChild(dlg);
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    name.focus?.();
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
      label.textContent = "Reading Colors";
      label.setAttribute("for", CONTROL);
      label.style.cssText = "font-size:12px;white-space:nowrap;color:var(--fill-secondary,inherit);";

      const select = doc.createElement("select");
      select.id = CONTROL;
      select.title = "PDF and EPUB reader foreground/background colors";
      select.setAttribute("aria-label", "Reading Colors");
      select.style.cssText =
        "font-size:12px;min-width:118px;max-width:170px;padding:3px 7px;" +
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
      for (const theme of readStoredThemes()) {
        if (!PRESETS.some(preset => preset.id === theme.id) && theme?.id && theme?.label) {
          addOption(theme.id, theme.label);
        }
      }
      addOption("__new__", "+ Custom Colors…");
      const previous = activeChoice();
      select.value = Array.from(select.children).some(option => option.value === previous)
        ? previous : "original";

      select.addEventListener("change", async () => {
        const chosen = select.value;
        if (chosen === "__new__") {
          select.value = previous === "__new__" ? "original" : activeChoice();
          try { createThemeDialog(doc, select); }
          catch (error) { Zotero.logError(error); }
          return;
        }
        select.disabled = true;
        try {
          await applyPreset(chosen);
          select.title = "Reader Colors: " + select.selectedOptions[0]?.textContent;
        }
        catch (error) {
          Zotero.logError(error);
          select.value = activeChoice();
        }
        finally { select.disabled = false; }
      });

      group.appendChild(label);
      group.appendChild(select);
      append(group);
    }
    catch (error) { Zotero.logError(error); }
  }

  function start(pluginID) {
    if (installed) return;
    if (!Zotero.Reader?.registerEventListener) {
      Zotero.debug("Cupertino Reader Colors: reader toolbar API unavailable.");
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
    for (const reader of Zotero.Reader?._readers || []) {
      try {
        reader._iframeWindow?.document?.querySelectorAll("." + ADDON_CLASS)
          .forEach(node => node.remove());
      }
      catch (error) { Zotero.logError(error); }
    }
  }

  return {
    start, stop, applyPreset, saveCustomTheme, normalizeHex,
    migrateLegacyCream, initializeReaderTheme, presets: PRESETS
  };
})();
