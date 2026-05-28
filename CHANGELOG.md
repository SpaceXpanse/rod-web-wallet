# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and follows Semantic Versioning principles where practical.

## [Unreleased]

### Added
- Phase 1 PWA installability assets: [`manifest.webmanifest`](manifest.webmanifest), [`images/icon-192.png`](images/icon-192.png), [`images/icon-512.png`](images/icon-512.png), and [`images/icon-512-maskable.png`](images/icon-512-maskable.png).
- Cross-device install metadata in [`index.html`](index.html:12), including manifest link, theme color, icon links, and Apple mobile web app tags.
- ROD API server health/error checking with a visible warning cue in [`index.html`](index.html), [`css/style.css`](css/style.css), [`js/coinbin.js`](js/coinbin.js), and [`js/coin.js`](js/coin.js).

## [2.0.0] - 2026-05-27

### Added (ROD Integration)
- Wallet dashboard refresh guidance in [`index.html`](index.html:245) with supporting styles in [`css/style.css`](css/style.css:484).
- Wallet action workspace placeholder to clarify where action flows open in [`index.html`](index.html:279).

### Changed
- Major wallet UX redesign shipped across [`index.html`](index.html:168), [`css/style.css`](css/style.css:290), and [`js/coinbin.js`](js/coinbin.js:121).
- Wallet page copy now clarifies deterministic behavior: different email/passphrase combinations derive different wallets in [`index.html`](index.html:178).
- Wallet actions now anchor/scroll to the action workspace area for clearer flow in [`js/coinbin.js`](js/coinbin.js:129).
- Tab click behavior now explicitly activates Bootstrap tabs before hash updates to keep navigation state consistent in [`js/coinbin.js`](js/coinbin.js:1661).

### Fixed
- SegWit default option now remains enabled at runtime (no startup override conflict) in [`js/coinbin.js`](js/coinbin.js:133).
- Wallet label presentation now uses normal capitalization (no forced all-caps) in [`css/style.css`](css/style.css:332).
- "Need an offline address? Create one instead." now correctly switches active tab state from wallet to New Address in [`js/coinbin.js`](js/coinbin.js:1661).
- Active tab readability/contrast issues resolved in navbar/tab styling in [`css/style.css`](css/style.css:58).
- Mediator modal readability fixed by high-contrast modal surface/text/button styling in [`css/style.css`](css/style.css:105).

### Verification
- Browser verification completed for wallet open flow, action anchoring, modal readability, active tab readability, and wallet-to-New Address navigation behavior.

### ROD Migration
- Canonical chain parameter snapshot at [`docs/chainparams.0.6.9.cpp`](docs/chainparams.0.6.9.cpp).
- ROD API reference snapshot at [`docs/rod-api-root.html`](docs/rod-api-root.html).
- Persistent ROD compatibility assertions in [`test.html`](test.html).
- Memory bank documentation for project state in [`.kilocode/rules/memory-bank/`](.kilocode/rules/memory-bank/).

### Changed
- Migrated wallet network constants and behavior to SpaceXpanse ROD in [`js/coin.js`](js/coin.js).
- Updated explorer integrations to SpaceXpanse ROD Explorer in [`js/coinbin.js`](js/coinbin.js).
- Updated UI branding/content for SpaceXpanse ROD in [`index.html`](index.html) and [`README.md`](README.md).
- Updated QR/payment URI handling from `bitcoin:` to `rod:` in [`js/coinbin.js`](js/coinbin.js).
- Replaced legacy remote fee-stat dependency with local/offline deterministic fee guidance in [`js/coinbin.js`](js/coinbin.js).

### Fixed
- Normalized broadcast response handling for `{result,error,id}` API format in [`coinjs.transaction().broadcast()`](js/coin.js:1221).
- Corrected settings-reset behavior so ROD HD/network parameters are preserved in [`js/coinbin.js`](js/coinbin.js).
- Guarded donation output paths to avoid invalid/default address usage in [`js/coin.js`](js/coin.js) and [`js/coinbin.js`](js/coinbin.js).
- Fixed stale explorer link targets to official ROD explorer in [`js/coinbin.js`](js/coinbin.js).
- Removed debug artifact from test flow in [`test.html`](test.html).

### Security
- Removed active legacy Chainquery SQL request construction from runtime wallet API flow by moving to direct ROD API integration in [`js/coin.js`](js/coin.js).

### Verification
- Browser-compatible ROD validation matrix completed (16/16 passing).
- Final smoke verification after cleanup completed (13/13 passing).

### Notes
- Public API endpoint currently configured as `http://api.spacexpanse.org:1234` in [`js/coin.js`](js/coin.js) because HTTPS probing for the same host/port failed during implementation.
