# Decision Log

| Date | Decision | Rationale | Evidence |
| --- | --- | --- | --- |
| 2026-06-02 | Adopt the standard maintainer wiki structure with a separate volatile memory bank. | Keeps durable documentation under version control while preserving short-lived local context outside canonical docs. | [`wiki-and-memory-bank-init.md`](../../.kilocode/rules/wiki-and-memory-bank-init.md), [`.gitignore`](../../.gitignore) |
| 2026-06-02 | Treat this project as a static web wallet with no build pipeline currently present in-repo. | The workspace contains direct runtime assets (`html`, `css`, `js`, images, service worker) and no package manifest or build config. | [`index.html`](../../index.html), [`sw.js`](../../sw.js), [`.gitignore`](../../.gitignore) |
| 2026-06-02 | Use [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp) as the local canonical snapshot for ROD chain parameters in this repository. | The file embeds upstream ROD network constants, genesis hashes, ports, prefixes, and bech32 HRPs needed to audit wallet values. | [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp) |
