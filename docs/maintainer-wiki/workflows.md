# Workflows

## Run the Wallet Locally

1. Serve the repository as static files or open a local hosted copy with [`index.html`](../../index.html) as the entry point.
2. For service-worker/PWA behavior, use HTTPS or localhost because registration is gated in [`index.html`](../../index.html).
3. Ensure the public ROD API endpoint in [`js/coin.js`](../../js/coin.js) is reachable if testing balance, UTXO lookup, or broadcast flows.
4. For the current Cloudflare deployment model, run [`node scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs:1) so [`public/`](../../public) contains the deployable static site subset referenced by [`wrangler.jsonc`](../../wrangler.jsonc).
5. If testing protected broadcast through the deployed service, set `TURNSTILE_SECRET` as a Worker secret binding, optionally set `ALLOWED_ORIGIN`, and deploy the single Worker defined in [`wrangler.jsonc`](../../wrangler.jsonc), which serves both wallet assets and the same-origin [`/broadcast`](../../workers/turnstile-broadcast-proxy.js:17) endpoint.

## Verify Turnstile Integration

1. Load the wallet from [`index.html`](../../index.html) and confirm the explicit Turnstile loader can render widget slots for wallet-open and broadcast paths, or fall back to the visible notice when the widget cannot load.
2. Confirm [`#openBtn`](../../index.html) and [`#openWifBtn`](../../index.html) remain gated by Turnstile state managed in [`js/coinbin.js`](../../js/coinbin.js), and that logout resets the login-gate widget state.
3. Confirm raw broadcast and wallet confirm-send flows collect the current Turnstile token before calling broadcast logic in [`js/coinbin.js`](../../js/coinbin.js) and [`r.broadcast()`](../../js/coin.js:1252).
4. If [`coinjs.broadcastProxy`](../../js/coin.js) is configured, verify the Worker in [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js) rejects missing/invalid tokens, enforces the `rod-broadcast` action, and forwards accepted raw transactions to the public ROD API.
5. Verify the Turnstile secret is not present in any static file, committed config, or browser-visible payload, and remains only in Worker environment bindings.

## Deploy the Single Worker Service

1. Run [`node scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs:1) to generate the deployable static asset set in [`public/`](../../public).
2. Set the Turnstile secret with Wrangler using `npx wrangler secret put TURNSTILE_SECRET` for the Worker configured in [`wrangler.jsonc`](../../wrangler.jsonc).
3. Optionally configure `ALLOWED_ORIGIN` for stricter cross-origin control if the wallet will not be served from the same Worker origin.
4. Deploy with `npx wrangler deploy`, which publishes [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js) and binds static assets from [`public/`](../../public).
5. After deployment, verify the root path serves [`index.html`](../../index.html), non-file SPA routes fall back to the same page, and [`/broadcast`](../../workers/turnstile-broadcast-proxy.js:17) remains protected by Turnstile validation.

## Verify Wallet Send Fee Behavior

1. Open the wallet locally and unlock a funded wallet through the flow rooted in [`index.html`](../../index.html) and coordinated by [`js/coinbin.js`](../../js/coinbin.js).
2. Use a wallet with more than one spendable UTXO when validating the review modal, because the review-fee floor now depends on the live `listUnspent` result in [`js/coinbin.js`](../../js/coinbin.js).
3. Test at least one send with mixed recipient address types where possible, because output sizing now depends on each recipient address plus the change output in [`getWalletEstimatedTotalOutputBytes()`](../../js/coinbin.js:397).
4. For SegWit verification, test both native bech32 and P2SH-SegWit wallet modes because [`getWalletEstimatedInputBytes()`](../../js/coinbin.js:414) now uses different byte estimates for each path.
5. Confirm the review modal shows an adjusted fee when the current value is below the relay floor enforced by [`ensureWalletFeeMeetsRelayFloor()`](../../js/coinbin.js:437).
6. Confirm the loader remains visible during async review UTXO lookup and final broadcast in [`#walletSendBtn`](../../js/coinbin.js:509) and [`#walletConfirmSend`](../../js/coinbin.js:277).
7. If the API rejects broadcast, confirm the modal closes cleanly, the send button is re-enabled, and the raw signed transaction is exposed through the failure UI in [`js/coinbin.js`](../../js/coinbin.js).

## Update Documentation

1. Update durable maintainer facts in the relevant page under [`docs/maintainer-wiki/`](./).
2. Add any new wiki page to [`index.md`](index.md).
3. Update volatile session context in [`.kilocode/rules/memory-bank/context.md`](../../.kilocode/rules/memory-bank/context.md) and [`.kilocode/rules/memory-bank/active.md`](../../.kilocode/rules/memory-bank/active.md) when current work changes.
4. Add a concise `Unreleased` note to [`CHANGELOG.md`](../../CHANGELOG.md) when repository-visible documentation or behavior changes warrant release tracking.

## Audit ROD Constants

1. Compare wallet constants in [`js/coin.js`](../../js/coin.js) against [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
2. Check at minimum: P2PKH prefix, P2SH prefix, WIF prefix, bech32 HRP, API assumptions, and any explorer links or user-facing network labels.
3. Mark uncertain values as `UNVERIFIED` until confirmed from local core snapshots or upstream core sources referenced in [`reference-canonical-rod-sources.md`](reference-canonical-rod-sources.md).

## Validation Status

- No `npm`, `package.json`, or `docs:check` script exists in the current workspace snapshot, so there is no built-in documentation validation command to run yet.
- Turnstile/Worker sanity can still be checked with `node --check` against [`js/coin.js`](../../js/coin.js), [`js/coinbin.js`](../../js/coinbin.js), and [`workers/turnstile-broadcast-proxy.js`](../../workers/turnstile-broadcast-proxy.js), plus [`node scripts/build-worker-assets.mjs`](../../scripts/build-worker-assets.mjs:1) and `npx wrangler --version`, but that is operational/syntax checking rather than a dedicated documentation validator.
- If tooling is added later, document the exact validation command here and run it before documentation-heavy commits.
