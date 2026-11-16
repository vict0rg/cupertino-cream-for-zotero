/*
 * Cupertino for Zotero with PDF Background — forked bootstrap.
 * Upstream: shenghuang-123/cupertino-for-zotero (MIT).
 * The upstream animation captures the tree layout on mouseup, then matches
 * visible rows by element identity and visual top (not DOM order).
 * Newly expanded descendants cascade into view; shifted rows use FLIP.
 */

var registeredSheets = [];
var CupertinoReaderBackground;
var cupertinoAddonEnabled = false;
var windowListener = null;

var ROW_ANIM_CLASS = "cupertino-row-in";
var ROW_SHIFT_CLASS = "cupertino-row-shift";
var TWISTY_WINDOW_MS = 2000;

function getStyleService() {
	return Components.classes["@mozilla.org/content/style-sheet-service;1"]
		.getService(Components.interfaces.nsIStyleSheetService);
}

/* Item expansion and collapse animations */

function onRowAnimationEnd(event) {
	var row = event.currentTarget;
	row.classList.remove(ROW_ANIM_CLASS);
	row.classList.remove(ROW_SHIFT_CLASS);
	row.style.removeProperty("--cupertino-row-delay");
	row.style.removeProperty("--cupertino-row-shift");
}

function trackRowAnimation(row) {
	row.addEventListener("animationend", onRowAnimationEnd, { once: true });
	row.addEventListener("animationcancel", onRowAnimationEnd, { once: true });
}

function animateNewRows(rows) {
	for (var i = 0; i < rows.length; i++) {
		rows[i].style.setProperty("--cupertino-row-delay", Math.min(i * 65, 520) + "ms");
		rows[i].classList.add(ROW_ANIM_CLASS);
		trackRowAnimation(rows[i]);
	}
}

function animateShiftedRows(entries) {
	for (var i = 0; i < entries.length; i++) {
		entries[i].row.style.setProperty("--cupertino-row-shift", entries[i].offset + "px");
		entries[i].row.classList.add(ROW_SHIFT_CLASS);
		trackRowAnimation(entries[i].row);
	}
}

function rowLevel(row) {
	return parseInt(row.getAttribute("aria-level"), 10) || 0;
}

function rowTop(row) {
	return parseFloat(row.style.top) || 0;
}

// Capture visible rows sorted by on-screen top; recycled DOM order is unreliable.


function snapshotRows(inner) {
	var out = [];
	var children = inner.children;
	for (var i = 0; i < children.length; i++) {
		var c = children[i];
		out.push({ elem: c, top: rowTop(c), level: rowLevel(c) });
	}
	out.sort(function (a, b) { return a.top - b.top; });
	return out;
}

function findRowPos(rows, elem) {
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].elem === elem) return i;
	}
	return -1;
}

// Apply the pending tree snapshot, reporting whether an animation was applied.
function applyTreeChangeAnimation(tree) {
	var pending = tree._cupertinoPendingExpand;
	if (!pending) return false;
	var now = snapshotRows(pending.inner);
	// Cancel if the parent row was recycled or scrolled out of view.
	var parentNowPos = findRowPos(now, pending.row);
	if (parentNowPos < 0) {
		tree._cupertinoPendingExpand = null;
		return false;
	}
	var parentOldPos = findRowPos(pending.rows, pending.row);
	if (parentOldPos < 0) {
		tree._cupertinoPendingExpand = null;
		return false;
	}

	// Count descendant rows that were already expanded in the previous snapshot.
	var oldDescendants = 0;
	for (var d = parentOldPos + 1; d < pending.rows.length; d++) {
		if (pending.rows[d].level <= pending.parentLevel) break;
		oldDescendants++;
	}

	// Track previous vertical position by element identity, not DOM order.
	var oldTopMap = new Map();
	for (var m = 0; m < pending.rows.length; m++) {
		oldTopMap.set(pending.rows[m].elem, pending.rows[m].top);
	}

	if (oldDescendants === 0) {
		// Expanding: the new descendants immediately follow the parent visually.
		var childRows = [];
		for (var i = parentNowPos + 1; i < now.length; i++) {
			if (now[i].level <= pending.parentLevel) break;
			childRows.push(now[i].elem);
		}
		if (!childRows.length) return false;
		var childSet = new Set(childRows);
		var shifted = [];
		for (var s = 0; s < now.length; s++) {
			var r = now[s];
			if (childSet.has(r.elem)) continue;
			var ot = oldTopMap.get(r.elem);
			if (ot === undefined || ot === r.top) continue;
			shifted.push({ row: r.elem, offset: ot - r.top });
		}
		animateNewRows(childRows);
		animateShiftedRows(shifted);
		return true;
	}

	// Collapsing: animate surviving rows to their new positions.
	var collapsed = [];
	for (var s2 = 0; s2 < now.length; s2++) {
		var r2 = now[s2];
		var ot2 = oldTopMap.get(r2.elem);
		if (ot2 === undefined || ot2 === r2.top) continue;
		collapsed.push({ row: r2.elem, offset: ot2 - r2.top });
	}
	if (collapsed.length) {
		animateShiftedRows(collapsed);
		return true;
	}
	return false;
}

function ensureTreeObserver(win, tree) {
	if (tree._cupertinoObserver) return;
	var observer = new win.MutationObserver(function () {
		var pending = tree._cupertinoPendingExpand;
		if (!pending) return;
		if (Date.now() - pending.time > TWISTY_WINDOW_MS) {
			tree._cupertinoPendingExpand = null;
			return;
		}
		if (applyTreeChangeAnimation(tree)) {
			tree._cupertinoPendingExpand = null;
		}
	});
	observer.observe(tree, { childList: true, subtree: true });
	tree._cupertinoObserver = observer;
}

function observeItemsTrees(win) {
	if (!win.document) return;
	var trees = win.document.querySelectorAll("#zotero-items-tree");
	for (var i = 0; i < trees.length; i++) {
		ensureTreeObserver(win, trees[i]);
	}
}

function onWindowMouseUp(event) {
	if (event.button !== 0) return;
	var target = event.target;
	if (!target || !target.closest) return;
	var twisty = target.closest(".twisty");
	if (!twisty) return;
	var tree = twisty.closest("#zotero-items-tree");
	if (!tree) return;
	var row = twisty.closest(".row");
	var inner = row && row.parentElement;
	if (!inner) return;
	var level = rowLevel(row);
	if (!level) return;
	tree._cupertinoPendingExpand = {
		inner: inner,
		row: row,
		parentLevel: level,
		rows: snapshotRows(inner),
		time: Date.now()
	};
	// Reattach the observer if Zotero recreated the tree.
	ensureTreeObserver(target.ownerGlobal, tree);
}

// Drop pending snapshots after scrolling because virtualization recycles rows.

function onWindowScroll(event) {
	var node = event.target;
	while (node && node.nodeType === 1) {
		if (node.id === "zotero-items-tree") {
			node._cupertinoPendingExpand = null;
			return;
		}
		node = node.parentElement;
	}
}

/* Window lifecycle */

function attachToWindow(win) {
	if (win._cupertinoAttached) return;
	win._cupertinoAttached = true;
	win.addEventListener("mouseup", onWindowMouseUp, true);
	win.addEventListener("scroll", onWindowScroll, true);
	if (win.document && win.document.readyState === "complete") {
		observeItemsTrees(win);
	}
	else {
		win.addEventListener("load", function () {
			observeItemsTrees(win);
		}, { once: true });
	}
}

function detachFromWindow(win) {
	if (win._cupertinoAttached) {
		win.removeEventListener("mouseup", onWindowMouseUp, true);
		win.removeEventListener("scroll", onWindowScroll, true);
		win._cupertinoAttached = false;
	}
	if (win.document) {
		var trees = win.document.querySelectorAll("#zotero-items-tree");
		for (var i = 0; i < trees.length; i++) {
			if (trees[i]._cupertinoObserver) {
				trees[i]._cupertinoObserver.disconnect();
				trees[i]._cupertinoObserver = null;
			}
			trees[i]._cupertinoPendingExpand = null;
		}
	}
}

function forEachWindow(callback) {
	var enumerator = Services.wm.getEnumerator(null);
	while (enumerator.hasMoreElements()) {
		var win = enumerator.getNext();
		if (win.document) callback(win);
	}
}

/* Plugin lifecycle */

function install(data, reason) {}

function startup({ id, version, resourceURI, rootURI = resourceURI.spec }, reason) {
  cupertinoAddonEnabled = true;
	var styleService = getStyleService();
	var uri = Services.io.newURI(rootURI + "style.css");
	styleService.loadAndRegisterSheet(uri, styleService.AUTHOR_SHEET);
	registeredSheets.push({ uri, type: styleService.AUTHOR_SHEET });

  // Integrate native Zotero reader themes through an optional reader toolbar control.
  // This module is original code; no Zotero PDF Background sources are reused.
  // build.py combines reader-background.js into the XPI bootstrap.js global.
  // No separate subscript scope is needed, so the toolbar hook is reachable.
  Promise.resolve(Zotero.uiReadyPromise).then(() => {
    if (cupertinoAddonEnabled) {
      CupertinoReaderBackground.start(id);
    }
  }).catch(error => Zotero.logError(error));

	// Attach to current windows now and to future windows once loaded.
	forEachWindow(attachToWindow);
	windowListener = {
		onOpenWindow: function (aWindow) {
			var win = aWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
				.getInterface(Components.interfaces.nsIDOMWindow);
			win.addEventListener("load", function () {
				attachToWindow(win);
			}, { once: true });
		},
		onCloseWindow: function () {},
		onWindowTitleChange: function () {}
	};
	Services.wm.addListener(windowListener);
}

function shutdown({ id, version, resourceURI, rootURI = resourceURI.spec }, reason) {
  cupertinoAddonEnabled = false;
  try { CupertinoReaderBackground?.stop(); }
  catch (error) { Zotero.logError(error); }
	var styleService = getStyleService();
	while (registeredSheets.length) {
		var sheet = registeredSheets.pop();
		if (styleService.sheetRegistered(sheet.uri, sheet.type)) {
			styleService.unregisterSheet(sheet.uri, sheet.type);
		}
	}
	if (windowListener) {
		Services.wm.removeListener(windowListener);
		windowListener = null;
	}
	forEachWindow(detachFromWindow);
}
