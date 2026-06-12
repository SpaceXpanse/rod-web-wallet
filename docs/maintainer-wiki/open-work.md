# Open Work

- Complete live wallet verification for the updated send-review flow in [`js/coinbin.js`](../../js/coinbin.js), especially multi-UTXO wallets, mixed recipient address types, and an actual relay rejection/retry path.
- Complete live end-to-end verification of the single Worker deployment defined by [`wrangler.jsonc`](../../wrangler.jsonc), including static asset serving from [`public/`](../../public), SPA fallback behavior, protected [`/broadcast`](../../workers/turnstile-broadcast-proxy.js:17) valid-token flow, invalid-token rejection, and CORS behavior from the wallet origin.
- Rotate the previously exposed Turnstile secret before relying on the Worker-backed protected broadcast path documented in [`README.md`](../../README.md).
- Confirm operational deployment steps remain accurate in [`README.md`](../../README.md) and [`docs/maintainer-wiki/workflows.md`](workflows.md) after the first real Wrangler-based production deployment.
- Verify wallet network constants in [`js/coin.js`](../../js/coin.js) against current upstream chain parameters, especially extended key prefixes noted as `FIXME` in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Add a documentation validation command such as `docs:check` if the project later adopts a package/tooling manifest; none is present in the current workspace snapshot.
- Review and update stale legacy branding/details in [`README.md`](../../README.md), including the malformed GitHub URL and inherited `coinbin` wording.
- Document or add a committed verification artifact replacement for the `test.html` references mentioned in [`CHANGELOG.md`](../../CHANGELOG.md) if that file is intentionally absent.
