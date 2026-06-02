# Maintainer Wiki

This wiki is the canonical maintainer documentation set for `rod-web-wallet`. It supplements the user-facing project overview in [`README.md`](../../README.md) with evidence-backed notes for maintainers, reviewers, and future contributors.

Use [`index.md`](index.md) as the catalog for all pages. Add new pages there when expanding the wiki so maintainers have a single entry point.

The project is a static SpaceXpanse ROD browser wallet centered on [`index.html`](../../index.html), with wallet/network logic in [`js/coin.js`](../../js/coin.js). Volatile session context lives separately in [`.kilocode/rules/memory-bank/`](../../.kilocode/rules/memory-bank/) and is not canonical.
