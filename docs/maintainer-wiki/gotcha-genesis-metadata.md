# Gotcha: Genesis Metadata

Genesis facts are easy to copy incorrectly and should not be edited casually.

## Mainnet Values in Local Snapshot

- Genesis hash assertion: `5d4b20be4fc87d2333aea5235d9de1c685696fc935f806a9ffd71c9f9abf3c57`
- Merkle root assertion: `afdbec35a16bea610dafafeee5a8cd072dc74a056894a12165da027079d5e138`
- Timestamp string source: `NASA has hosted the Martian Metaverse Creation Challenge`

All of the above come from [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).

## Maintenance Guidance

- Do not update genesis values in documentation or wallet assumptions without re-verifying them against upstream core sources.
- Treat premine script/address references in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp) as consensus-sensitive.
- If explorer, API, or wallet displays conflict with these values, document the mismatch and label any unresolved claim `UNVERIFIED`.
