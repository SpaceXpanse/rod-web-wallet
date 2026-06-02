# Concept: ROD Chainparams Parity

Wallet behavior must remain aligned with upstream SpaceXpanse ROD network parameters. In this repository, the primary local parity reference is [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp), while the runtime wallet constants live in [`js/coin.js`](../../js/coin.js).

## Fields to Audit

- Mainnet address prefixes: `PUBKEY_ADDRESS = 60`, `SCRIPT_ADDRESS = 75`, `SECRET_KEY = 78` in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Mainnet bech32 HRP: `rod` in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp), reflected in [`js/coin.js`](../../js/coin.js).
- Network ports: P2P `11998` and RPC `11999` per [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Genesis block hash and merkle root assertions in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- Auxiliary chain ID `1899` in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).

## Current Workspace Notes

- [`js/coin.js`](../../js/coin.js) currently matches mainnet base58 and bech32 address constants.
- [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp) flags HD extended key prefixes with `FIXME`; treat those values carefully during wallet HD audits.
- The wallet relies on an API endpoint rather than direct RPC or P2P access, so explorer/API compatibility issues can still break runtime behavior even when address constants are correct.

## Recommended Audit Procedure

1. Confirm upstream chainparams snapshot freshness.
2. Compare runtime constants in [`js/coin.js`](../../js/coin.js) field-by-field.
3. Review user-facing ROD labels and explorer/API URLs in [`index.html`](../../index.html) and [`js/coinbin.js`](../../js/coinbin.js).
4. Mark unresolved mismatches as `UNVERIFIED` in documentation until corrected or reconfirmed.
