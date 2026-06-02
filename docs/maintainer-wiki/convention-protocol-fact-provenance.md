# Convention: Protocol Fact Provenance

## Rules

- Prefer exact citations to local canonical sources such as [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp) for network constants.
- Use runtime files such as [`js/coin.js`](../../js/coin.js) only to describe implementation state, not protocol truth.
- If a value cannot be confirmed from a canonical source available in-repo, mark it `UNVERIFIED`.
- Do not silently mix user-facing marketing copy from [`README.md`](../../README.md) or [`index.html`](../../index.html) with protocol facts.

## Code-Wins Policy

For implementation questions, the current repository code wins over prose documentation. For protocol questions, upstream/core-aligned references win over the current wallet implementation if they disagree.

## Update Discipline

When a protocol-sensitive fact changes:

1. Update the relevant wiki page.
2. Add or amend the citation.
3. Record the change in [`log.md`](log.md) and, when release-relevant, [`CHANGELOG.md`](../../CHANGELOG.md).
