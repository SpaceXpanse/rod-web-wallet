# Workflows

## Run the Wallet Locally

1. Serve the repository as static files or open a local hosted copy with [`index.html`](../../index.html) as the entry point.
2. For service-worker/PWA behavior, use HTTPS or localhost because registration is gated in [`index.html`](../../index.html).
3. Ensure the public ROD API endpoint in [`js/coin.js`](../../js/coin.js) is reachable if testing balance, UTXO lookup, or broadcast flows.

## Verify Lightweight Bot-Friction Behavior

1. Load [`index.html`](../../index.html) in a normal browser session and confirm the hidden `captcha` field is changed by JavaScript before interaction.
2. Verify normal behavior still works for [`#openBtn`](../../js/coinbin.js:128), [`#openWifBtn`](../../js/coinbin.js:182), [`#walletConfirmSend`](../../js/coinbin.js:287), and [`rawSubmitDefault()`](../../js/coinbin.js:1532).
3. Simulate a non-JavaScript or non-executing automation path by forcing the hidden field away from the expected value in devtools, then confirm those guarded actions return early.
4. Treat this as low-cost bot friction only; do not document it as cryptographic protection, authentication, or server-side validation.

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
- If tooling is added later, document the exact validation command here and run it before documentation-heavy commits.
