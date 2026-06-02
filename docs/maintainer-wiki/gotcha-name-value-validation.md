# Gotcha: Name-Value Validation

SpaceXpanse ROD inherits name-value concepts from the broader ecosystem rules, but this wallet workspace is primarily a transaction/key UI and does not appear to implement dedicated name/value validation flows in the current runtime files.

## Current Workspace State

- No obvious name-registration or name-update UI exists in [`index.html`](../../index.html).
- No focused name/value validation layer is visible in [`js/coin.js`](../../js/coin.js) based on current initialization review.

## Maintenance Risk

- Do not assume the wallet enforces namespace, UTF-8, JSON-object, or length rules for name/value operations unless code is added and cited.
- If name operations are introduced later, document validation behavior explicitly and cross-check it against canonical ROD/SpaceXpanse sources.

## Documentation Rule

Until the repository contains explicit implementation or a stronger local source, any statement about wallet support for strict name/value validation should be marked `UNVERIFIED`.
