# Concept: Architecture Overview

## Project Type

`rod-web-wallet` is a static, browser-based cryptocurrency wallet for SpaceXpanse ROD. It emphasizes client-side key generation and signing so private keys stay in the browser, as stated in [`index.html`](../../index.html) and [`README.md`](../../README.md).

## Main Directories and Files

- [`index.html`](../../index.html): primary SPA shell, navigation, forms, modals, and script/style loading.
- [`css/`](../../css/): Bootstrap plus project-specific styling in [`css/style.css`](../../css/style.css).
- [`js/`](../../js/): wallet engine, transaction logic, UI orchestration, and supporting crypto/vendor libraries.
- [`images/`](../../images/): branding, icons, and static imagery.
- [`docs/`](../../docs/): local reference snapshots, including upstream ROD chain parameters and API examples.
- [`sw.js`](../../sw.js) and [`manifest.webmanifest`](../../manifest.webmanifest): offline/PWA support.

## Key Entry Points

- Application load starts from [`index.html`](../../index.html).
- Core ROD constants and transaction primitives are defined in [`js/coin.js`](../../js/coin.js).
- UI event handling and wallet actions are coordinated in [`js/coinbin.js`](../../js/coinbin.js).
- Offline caching is handled by [`sw.js`](../../sw.js) after conditional registration in [`index.html`](../../index.html).

## Data Flow Overview

1. A user loads [`index.html`](../../index.html) in a browser.
2. Early page boot in [`index.html`](../../index.html) flips a hidden field from a default value to a JavaScript-confirmed value, providing a lightweight client-side guard intended to stop simple non-JavaScript form and button automation.
3. UI actions invoke logic in [`js/coinbin.js`](../../js/coinbin.js), which uses [`js/coin.js`](../../js/coin.js) to derive keys, build transactions, and sign locally.
3. Read-only blockchain operations such as balance, unspent output lookup, transaction lookup, and broadcast are sent to the configured ROD API endpoint in [`js/coin.js`](../../js/coin.js).
4. Static assets are cached by [`sw.js`](../../sw.js) for repeat loads and offline-friendly behavior.

## Lightweight Bot-Frictions

- [`index.html`](../../index.html) includes a hidden input that defaults to `1` and is changed to `2` by an inline script during page execution.
- [`js/coinbin.js`](../../js/coinbin.js) checks that value before sensitive UI-triggered actions continue.
- Current guarded actions are wallet open, WIF import, wallet send confirmation, and raw transaction broadcast in [`js/coinbin.js`](../../js/coinbin.js).
- This mechanism is implementation-only friction, not a security boundary. It is intended to filter low-effort bots that parse markup but do not execute JavaScript.

## External Dependencies and Services

- Public ROD API at `https://api.spacexpanse.org:1234`.
- Upstream SpaceXpanse core parameters represented locally by [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Browser runtime capabilities for cryptography, storage-less local execution, and optional service-worker support.
