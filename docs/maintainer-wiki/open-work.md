# Open Work

- Verify that the randomized hidden-field JavaScript bot-friction guard in [`index.html`](../../index.html) and [`js/coinbin.js`](../../js/coinbin.js) does not interfere with legitimate wallet open, WIF import, wallet send, or raw broadcast flows on current browsers.
- Complete live wallet verification for the updated send-review flow in [`js/coinbin.js`](../../js/coinbin.js), especially multi-UTXO wallets, mixed recipient address types, and an actual relay rejection/retry path.
- Verify wallet network constants in [`js/coin.js`](../../js/coin.js) against current upstream chain parameters, especially extended key prefixes noted as `FIXME` in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Add a documentation validation command such as `docs:check` if the project later adopts a package/tooling manifest; none is present in the current workspace snapshot.
- Review and update stale legacy branding/details in [`README.md`](../../README.md), including the malformed GitHub URL and inherited `coinbin` wording.
- Document or add a committed verification artifact replacement for the `test.html` references mentioned in [`CHANGELOG.md`](../../CHANGELOG.md) if that file is intentionally absent.
