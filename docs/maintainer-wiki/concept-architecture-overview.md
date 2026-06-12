# Concept: Architecture Overview

## Project Type

`rod-web-wallet` is a static, browser-based cryptocurrency wallet for SpaceXpanse ROD. It emphasizes client-side key generation and signing so private keys stay in the browser, as stated in [`index.html`](../../index.html) and [`README.md`](../../README.md).

## Main Directories and Files

- [`index.html`](../../index.html): primary SPA shell, navigation, forms, modals, and script/style loading.
- [`css/`](../../css/): Bootstrap plus project-specific styling in [`css/style.css`](../../css/style.css).
- [`js/`](../../js/): wallet engine, transaction logic, UI orchestration, and supporting crypto/vendor libraries.
- [`images/`](../../images/): branding, icons, and static imagery.
- [`docs/`](../../docs/): local reference snapshots, including upstream ROD chain parameters and API examples.
- [`workers/`](../../workers/): optional Cloudflare Worker source for protected transaction broadcast.
- [`sw.js`](../../sw.js) and [`manifest.webmanifest`](../../manifest.webmanifest): offline/PWA support.

## Key Entry Points

- Application load starts from [`index.html`](../../index.html).
- Core ROD constants and transaction primitives are defined in [`js/coin.js`](../../js/coin.js).
- UI event handling and wallet actions are coordinated in [`js/coinbin.js`](../../js/coinbin.js).
- Protected broadcast proxy logic is implemented in [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js).
- Offline caching is handled by [`sw.js`](../../sw.js) after conditional registration in [`index.html`](../../index.html).

## Data Flow Overview

1. A user loads [`index.html`](../../index.html) in a browser.
2. UI actions invoke logic in [`js/coinbin.js`](../../js/coinbin.js), which uses [`js/coin.js`](../../js/coin.js) to derive keys, build transactions, sign locally, and manage Turnstile widget/token state for wallet-open and broadcast flows.
3. Read-only blockchain operations such as balance, unspent output lookup, and transaction lookup are sent directly to the configured ROD API endpoint in [`js/coin.js`](../../js/coin.js).
4. Broadcast operations can either post directly to the ROD API or, when configured, send signed raw transactions plus Turnstile token/action metadata to the Cloudflare Worker in [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js), which validates Turnstile server-side and forwards accepted requests to the public ROD API.
5. Static assets are cached by [`sw.js`](../../sw.js) for repeat loads and offline-friendly behavior.

## External Dependencies and Services

- Public ROD API at `https://api.spacexpanse.org:1234`.
- Cloudflare Turnstile client widget loaded by [`index.html`](../../index.html) and configured in [`js/coin.js`](../../js/coin.js).
- Optional Cloudflare Worker deployment based on [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js) for protected broadcast.
- Upstream SpaceXpanse core parameters represented locally by [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Browser runtime capabilities for cryptography, storage-less local execution, and optional service-worker support.
