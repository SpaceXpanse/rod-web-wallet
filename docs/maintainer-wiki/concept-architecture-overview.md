# Concept: Architecture Overview

## Project Type

`rod-web-wallet` is a static, browser-based cryptocurrency wallet for SpaceXpanse ROD. It emphasizes client-side key generation and signing so private keys stay in the browser, as stated in [`index.html`](../../index.html) and [`README.md`](../../README.md).

## Main Directories and Files

- [`index.html`](../../index.html): primary SPA shell, navigation, forms, modals, and script/style loading.
- [`css/`](../../css/): Bootstrap plus project-specific styling in [`css/style.css`](../../css/style.css).
- [`js/`](../../js/): wallet engine, transaction logic, UI orchestration, and supporting crypto/vendor libraries.
- [`images/`](../../images/): branding, icons, and static imagery.
- [`docs/`](../../docs/): local reference snapshots, including upstream ROD chain parameters and API examples.
- [`workers/`](../../workers/): Cloudflare Worker source for the combined static-site and protected-broadcast deployment entrypoint.
- [`scripts/`](../../scripts/): deployment helper scripts, including [`scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs) for generating safe static assets under [`public/`](../../public).
- [`public/`](../../public): generated deployment output consumed by the Worker asset binding defined in [`wrangler.jsonc`](../../wrangler.jsonc).
- [`sw.js`](../../sw.js) and [`manifest.webmanifest`](../../manifest.webmanifest): offline/PWA support.
- [`wrangler.jsonc`](../../wrangler.jsonc): Cloudflare Worker deployment configuration for one service that combines the Worker script and static assets.

## Key Entry Points

- Application load starts from [`index.html`](../../index.html).
- Core ROD constants and transaction primitives are defined in [`js/coin.js`](../../js/coin.js).
- UI event handling and wallet actions are coordinated in [`js/coinbin.js`](../../js/coinbin.js).
- Protected broadcast proxy logic and Worker-side static asset routing are implemented in [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js).
- Deployment packaging for static assets is prepared by [`scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs).
- Offline caching is handled by [`sw.js`](../../sw.js) after conditional registration in [`index.html`](../../index.html).

## Data Flow Overview

1. A user loads [`index.html`](../../index.html) in a browser.
2. UI actions invoke logic in [`js/coinbin.js`](../../js/coinbin.js), which uses [`js/coin.js`](../../js/coin.js) to derive keys, build transactions, sign locally, and manage Turnstile widget/token state for wallet-open and broadcast flows.
3. For Cloudflare deployment, [`scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs) copies the deployable wallet files into [`public/`](../../public), excluding non-site and local-only artifacts.
4. The deployed Worker defined by [`wrangler.jsonc`](../../wrangler.jsonc) serves static asset requests through `env.ASSETS.fetch()` and falls back to [`index.html`](../../index.html) for non-file SPA routes.
5. Read-only blockchain operations such as balance, unspent output lookup, and transaction lookup are sent directly to the configured ROD API endpoint in [`js/coin.js`](../../js/coin.js).
6. Broadcast operations default to same-origin [`/broadcast`](../../workers/turnstile-broadcast-proxy.js:17), where the Worker validates Turnstile server-side and forwards accepted signed raw transactions to the public ROD API.
7. Static assets are cached by [`sw.js`](../../sw.js) for repeat loads and offline-friendly behavior.

## External Dependencies and Services

- Public ROD API at `https://api.spacexpanse.org:1234`.
- Cloudflare Turnstile client widget loaded by [`index.html`](../../index.html) and configured in [`js/coin.js`](../../js/coin.js).
- Cloudflare Worker deployment defined by [`wrangler.jsonc`](../../wrangler.jsonc), using [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js) plus the [`public/`](../../public) asset binding for same-service hosting and protected broadcast.
- Upstream SpaceXpanse core parameters represented locally by [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Browser runtime capabilities for cryptography, storage-less local execution, and optional service-worker support.
