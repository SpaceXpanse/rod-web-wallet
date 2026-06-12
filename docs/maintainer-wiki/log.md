# Maintainer Log

- 2026-06-12: Documented the simple JavaScript-only hidden-field bot-friction guard added to [`index.html`](../../index.html) and enforced in [`js/coinbin.js`](../../js/coinbin.js) for wallet open, WIF import, wallet send confirmation, and raw transaction broadcast flows.
- 2026-06-12: Documented wallet send-flow fee estimation fixes in [`js/coinbin.js`](../../js/coinbin.js), including UTXO-count-aware review fee enforcement, per-output address-type sizing, distinct SegWit input sizing for bech32 vs P2SH-SegWit, and loader-state cleanup around review/broadcast async calls.
- 2026-06-02: Initial wiki setup created for `rod-web-wallet`, alongside volatile memory-bank initialization, based on evidence from [`README.md`](../../README.md), [`index.html`](../../index.html), [`js/coin.js`](../../js/coin.js), [`manifest.webmanifest`](../../manifest.webmanifest), [`sw.js`](../../sw.js), and [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
