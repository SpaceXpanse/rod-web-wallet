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

## Deploying on Cloudflare Pages

This repository is compatible with Cloudflare Pages for static hosting.

Recommended setup:
- Connect the repository to Cloudflare Pages.
- Use the repository root as the build context.
- Use `exit 0` as the Build command.
- Set the Build output directory to `/`.
- For the static site, the Pages deployment will serve `index.html`, `js/`, `css/`, `images/`, and other assets directly.

## Cloudflare Turnstile broadcast proxy

- Client-side Turnstile widgets use the public site key configured in [`js/coin.js`](js/coin.js).
- Direct read-only API calls remain unchanged.
- Protected broadcast can be enabled by setting [`coinjs.broadcastProxy`](js/coin.js) to your deployed Worker `/broadcast` URL.
- The Worker source is provided in [`workers/turnstile-broadcast-proxy.js`](workers/turnstile-broadcast-proxy.js).
- Deploy that Worker code in the Cloudflare dashboard or via Wrangler.
- Set the Turnstile secret only as a Cloudflare Worker secret binding, for example `TURNSTILE_SECRET`.
- Optionally set `ALLOWED_ORIGIN` in the Worker environment to the wallet origin allowed to call the proxy.
- Do not place the Turnstile secret in any static file, commit, or frontend configuration.
- After deploying the Worker, update [`js/coin.js`](js/coin.js) or configure the site to set `coinjs.broadcastProxy` to the Worker `/broadcast` endpoint.

## Deployment checklist

1. Deploy the static wallet to Cloudflare Pages.
2. Deploy [`workers/turnstile-broadcast-proxy.js`](workers/turnstile-broadcast-proxy.js) as a Cloudflare Worker.
3. Configure the Worker's `TURNSTILE_SECRET`.
4. Set `ALLOWED_ORIGIN` to the Pages domain if needed.
5. Set `coinjs.broadcastProxy` to the deployed Worker `/broadcast` URL.
6. Rotate any previously used Turnstile secret before production use.

