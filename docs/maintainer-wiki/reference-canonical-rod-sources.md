# Reference: Canonical ROD Sources

## Source Hierarchy

1. Local protocol/core snapshot: [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp)
2. Official SpaceXpanse project properties documented in workspace rules, including the official site and upstream repositories referenced from local rules.
3. Local runtime implementation: [`js/coin.js`](../../js/coin.js), [`index.html`](../../index.html), and supporting wallet files.
4. API example snapshot: [`docs/rod-api-root.html`](../../docs/rod-api-root.html)

## Canonical vs Visibility-Only

- Canonical for protocol/network facts: upstream core chain parameters, local core snapshot, official SpaceXpanse documentation/repositories.
- Visibility-only for operations and market context: public API responses, explorers, marketing copy, or third-party market aggregators.

## Minimum Citation Rule

When documenting consensus-sensitive facts, cite the exact local source file first. If a fact is not provable from local files, label it `UNVERIFIED` until an upstream canonical source is checked and recorded.
