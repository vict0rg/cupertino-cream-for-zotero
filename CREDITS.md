# Credits, authorship, and license compliance

This document separates **reused code and assets** from **design references** and **feature inspiration**. Not every publicly accessible GitHub repository grants permission to copy its source.

## 1. Cupertino for Zotero — original source, MIT

- **Upstream project:** [shenghuang-123/cupertino-for-zotero](https://github.com/shenghuang-123/cupertino-for-zotero)
- **Authors:** Cupertino for Zotero contributors
- **Original copyright:** Copyright (c) 2026 Cupertino for Zotero contributors
- **License:** MIT, verified in the upstream [LICENSE](https://github.com/shenghuang-123/cupertino-for-zotero/blob/main/LICENSE)
- **Relationship:** This repository is a GitHub fork; its Git history records the derivation.

**Material reused:** upstream `style.css`, `bootstrap.js`, original plugin icons, layout and visual/animation implementation, with modifications. The upstream MIT copyright and complete license text remain in this repository's [LICENSE](LICENSE) and are included in distributable builds. The fork does not represent itself as an official upstream release.

**Changes in this fork:** permanent native menu bar, native-width item details navigation, original English-language PDF background selector using Zotero's reader themes, independent add-on ID, maintenance improvements, English documentation and releases.

## 2. Cupertino for Obsidian — design lineage, MIT

- **Project:** [svnaxis/obsidian-cupertino](https://github.com/svnaxis/obsidian-cupertino), formerly `aaaaalexis/obsidian-cupertino`
- **Author/copyright notice:** Copyright (c) 2026 svnaxis
- **License:** MIT, verified in the [LICENSE.txt](https://github.com/svnaxis/obsidian-cupertino/blob/main/LICENSE.txt)
- **Relationship:** A visual reference cited by the *original* Cupertino for Zotero project.

No code, packaged assets or fonts were imported directly from the Obsidian theme into this derivative. The reference is credited to preserve the project's design lineage.

## 3. Zotero PDF Background — feature inspiration, no verified reuse license

- **Original project:** [wangqian06/zotero-pdf-background](https://github.com/wangqian06/zotero-pdf-background) (also historically accessible as `q77190858/zotero-pdf-background`)
- **Reference fork:** [azhar-rafiq/zotero-pdf-background](https://github.com/azhar-rafiq/zotero-pdf-background)
- **Contribution:** the user-facing idea of selectable PDF background colors and an easily accessible reader control.

**License status:** No explicit redistribution license was identified in the inspected repositories. Because publicly published source is not automatically licensed for reuse, **no PDF Background source code, icons, translations, images, or configuration resources were copied into this project**. The reader-background module was implemented separately using Zotero's native theme settings and reader-toolbar API.

Attribution here acknowledges the concept and research reference; it does **not** claim that these repositories have granted a software license.

## 4. Zotero — platform APIs

- **Project:** [Zotero](https://www.zotero.org/)
- **Relationship:** host application. The plugin integrates through Zotero plugin lifecycle and reader APIs and stores chosen colors as native reader themes.

This project is independent and is not endorsed by Zotero. No Zotero source files are redistributed as part of this fork.

## 5. Cupertino for Zotero with PDF Background — derivative work

- **Maintainer:** [vict0rg](https://github.com/vict0rg)
- **Repository:** [cupertino-for-zotero-with-pdf-background](https://github.com/vict0rg/cupertino-for-zotero-with-pdf-background)
- **New additions:** original PDF preset implementation, menu/sidebar fixes, packaging, tests, English-language documentation and maintenance changes.
- **Distribution license:** MIT, retaining all upstream copyright and license notices. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md).

### Compliance summary

This distribution follows the **MIT license terms applicable to the Cupertino for Zotero source** by retaining the original copyright notice and permission text. The Obsidian Cupertino theme is an MIT-licensed *design reference* without direct code reuse. The PDF Background projects are *feature references only* and are not redistributed, because their source licensing was not confirmed. The provenance and ownership of original works are acknowledged above.

This is a factual description of the materials currently included in this fork; it is not a legal certification of unrelated projects or future third-party contributions.
