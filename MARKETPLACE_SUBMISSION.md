# Submitting Cupertino Cream for Zotero to public plugin directories

The presence of an XPI release does not guarantee automatic inclusion in an external directory. Third-party reviewers decide if and when a plugin is listed.

## 1. Zotero Plugins Atlas — zoteroplugins.org

Visit **https://zoteroplugins.org/submit** and paste:

```text
https://github.com/vict0rg/cupertino-cream-for-zotero
```

The Atlas checks for a GitHub release containing an XPI, adds the result as **In review**, and runs its own review/grade. Repeated submissions have no effect.

## 2. Add-on Market for Zotero — syt2

The project [syt2/zotero-addons](https://github.com/syt2/zotero-addons) uses the separate dataset maintained in **[syt2/zotero-addons-scraper](https://github.com/syt2/zotero-addons-scraper)**. Submit to the scraper, not to the main Add-on Market repository.

Its README documents one file per add-on in the `addons/` folder, named `owner@repo`, with up to two tags.

Proposed submission file:

**Path:** `addons/vict0rg@cupertino-cream-for-zotero`

**Content:**

```json
{"tags": ["interface", "reader"]}
```

Suggested pull request title:

`Add Cupertino Cream for Zotero theme and PDF reader presets`

Suggested summary:

`Adds vict0rg/cupertino-cream-for-zotero, a MIT-licensed Cupertino-derived Zotero theme with warm cream UI, permanent menus and native PDF background color presets. Companion theme: vict0rg/obsidian-cupertino-cream. Public XPI release available in GitHub Releases.`

Fork the scraper repository, add the file, and submit a pull request. The maintainer decides when it enters the catalog.

## Source/license scope

The fork incorporates MIT-licensed Cupertino for Zotero code with original notices retained. Notation is an Unlicense visual reference without copied source. Zotero PDF Background projects are functional references without copied code due to no confirmed reuse permission. See [CREDITS.md](CREDITS.md) and [NOTICE.md](NOTICE.md).

These are third-party directories, not official Zotero endorsements.
