# Workflows

## Run the Wallet Locally

1. Serve the repository as static files or open a local hosted copy with [`index.html`](../../index.html) as the entry point.
2. For service-worker/PWA behavior, use HTTPS or localhost because registration is gated in [`index.html`](../../index.html).
3. Ensure the public ROD API endpoint in [`js/coin.js`](../../js/coin.js) is reachable if testing balance, UTXO lookup, or broadcast flows.

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
