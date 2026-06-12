coinbin
=======

A Open Source Browser Based SpaceXpanse ROD Wallet. Version 2.0.2-beta by OutCast3k

Live version available at http://rod-web-wallet/ or coinbin3ravkwb24f7rmxx6w3snkjw45jhs5lxbh3yfeg3vpt6janwqd.onion

Github URL: https://github.com/SpaceXpanse RODio/coinbin/

rod-web-wallet supports a number of key features such as: 

- Offline Compressed & uncompressed Address creation.
- Offline Multisignature Address creation.
- "In browser" Key (re)generation. 
- Send and receive payments.
- Ability to decode transactions, redeem scripts and more offline.
- Build custom transactions offline.
- Sign transactions offline.
- Signatures are deterministic as per RFC 6979 (https://tools.ietf.org/html/rfc6979#section-3.2)
- Broadcast transactions.
- nLockTime support.
- Add custom data to transactions with the use of OP_RETURN.
- Support current Dark Wallet Stealth Address structure (as of version Alpha 7) for outputs.
- Brain wallet support.
- Compatible with bitcoin-qt
- An offical .onion address for tor users.
- Offline qrcode creator and scanning tool.
- HD (bip32) support.
- Supports altcoins such as litecoin.
- Replace by fee (RBF) Support.
- Segwit Support.
- Bech32 address support.
- Fee calculator - https://rod-web-wallet/#fees
  - Uses deterministic local fee guidance for ROD (no Coinb.in fee endpoint dependency).
- Transaction rebuild support for RBF and double spending.
- Broadcast flow is JSON-normalized against the ROD API POST /broadcast response format (`{result,error,id}`).

Donation is disabled by default (`0`) in this ROD build to avoid accidental sends to non-ROD addresses.
ROD API endpoint defaults to `https://api.spacexpanse.org:1234`.

## Cloudflare Worker deployment

This repository now targets a single Cloudflare Worker service that serves the static wallet and handles the protected [`/broadcast`](workers/turnstile-broadcast-proxy.js:17) proxy in the same deployment.

### How the single Worker model is wired

- [`wrangler.jsonc`](wrangler.jsonc) points the Worker entry to [`workers/turnstile-broadcast-proxy.js`](workers/turnstile-broadcast-proxy.js) and binds static assets as `ASSETS`.
- [`scripts/build-worker-assets.mjs`](scripts/build-worker-assets.mjs:1) creates a safe deployable asset tree in [`public/`](public) so Cloudflare does not upload local-only or non-site files from the repository root.
- [`workers/turnstile-broadcast-proxy.js`](workers/turnstile-broadcast-proxy.js) handles `POST` and `OPTIONS` on [`/broadcast`](workers/turnstile-broadcast-proxy.js:17), then falls back to `env.ASSETS.fetch(request)` for all other routes.
- [`js/coin.js`](js/coin.js:37) now uses same-origin [`/broadcast`](workers/turnstile-broadcast-proxy.js:17) by default for protected transaction submission.
- Direct read-only API calls still go straight to `https://api.spacexpanse.org:1234` from [`js/coin.js`](js/coin.js:30).

### Build and deploy with Wrangler

1. Build the static asset directory:
   - `node scripts/build-worker-assets.mjs`
2. Authenticate Wrangler if needed:
   - `npx wrangler login`
3. Set the Turnstile secret as a Worker secret binding:
   - `npx wrangler secret put TURNSTILE_SECRET`
4. Optionally scope browser CORS access for cross-origin callers:
   - `npx wrangler secret put ALLOWED_ORIGIN` is **not** required because [`ALLOWED_ORIGIN`](workers/turnstile-broadcast-proxy.js:149) is a plain text environment value; set it in the Cloudflare dashboard or through Wrangler vars if you need stricter cross-origin behavior.
5. Deploy the combined Worker + assets service:
   - `npx wrangler deploy`

### Deploy from the Cloudflare dashboard

1. Run [`node scripts/build-worker-assets.mjs`](scripts/build-worker-assets.mjs:1).
2. Create or open the Worker service in the dashboard.
3. Upload the Worker code from [`workers/turnstile-broadcast-proxy.js`](workers/turnstile-broadcast-proxy.js).
4. Configure static assets using the generated [`public/`](public) directory.
5. Add the `TURNSTILE_SECRET` secret binding.
6. Optionally add `ALLOWED_ORIGIN` as an environment variable.

### Operational notes

- Do not place the Turnstile secret in [`js/coin.js`](js/coin.js), [`index.html`](index.html), [`wrangler.jsonc`](wrangler.jsonc), or any committed file.
- Rotate any previously exposed Turnstile secret before production rollout.
- If you do not need cross-origin broadcast calls, leave `ALLOWED_ORIGIN` unset and keep the same-origin Worker deployment model.
- Re-run [`node scripts/build-worker-assets.mjs`](scripts/build-worker-assets.mjs:1) before each deployment so [`public/`](public) matches the current wallet files.
