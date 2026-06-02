# Tech Stack

## Runtime Model

- Static single-page web application delivered directly from [`index.html`](../../index.html).
- No package manifest, bundler config, or server-side application code is present in the current repository snapshot.

## Frontend Libraries

- jQuery 1.9.1 loaded from [`js/jquery-1.9.1.min.js`](../../js/jquery-1.9.1.min.js) via [`index.html`](../../index.html).
- Bootstrap UI assets loaded from [`css/bootstrap.min.css`](../../css/bootstrap.min.css) and [`js/bootstrap.min.js`](../../js/bootstrap.min.js) via [`index.html`](../../index.html).
- Bootstrap datetime picker loaded from [`css/bootstrap-datetimepicker.min.css`](../../css/bootstrap-datetimepicker.min.css) and [`js/bootstrap-datetimepicker.min.js`](../../js/bootstrap-datetimepicker.min.js).
- Moment.js loaded from [`js/moment.min.js`](../../js/moment.min.js).

## Cryptography and Wallet Logic

- Core wallet/network implementation in [`js/coin.js`](../../js/coin.js).
- UI behavior and wallet flow orchestration in [`js/coinbin.js`](../../js/coinbin.js).
- Supporting crypto/math libraries: [`js/crypto-min.js`](../../js/crypto-min.js), [`js/crypto-sha256.js`](../../js/crypto-sha256.js), [`js/crypto-sha256-hmac.js`](../../js/crypto-sha256-hmac.js), [`js/sha512.js`](../../js/sha512.js), [`js/ripemd160.js`](../../js/ripemd160.js), [`js/aes.js`](../../js/aes.js), [`js/jsbn.js`](../../js/jsbn.js), and [`js/ellipticcurve.js`](../../js/ellipticcurve.js).

## PWA / Offline Support

- Web app manifest in [`manifest.webmanifest`](../../manifest.webmanifest).
- Service worker cache implementation in [`sw.js`](../../sw.js), registered from [`index.html`](../../index.html).

## External Integrations

- Default public API endpoint: `https://api.spacexpanse.org:1234` configured in [`js/coin.js`](../../js/coin.js).
- Protocol reference snapshot stored in [`docs/chainparams.0.6.9.cpp`](../../docs/chainparams.0.6.9.cpp).
- API reference snapshot stored in [`docs/rod-api-root.html`](../../docs/rod-api-root.html).

## Deployment Shape

- Can be hosted as static files or run from a downloaded local copy per the user-facing note in [`index.html`](../../index.html).
- Uses the service worker only when served from HTTPS or localhost, per the registration guard in [`index.html`](../../index.html).
