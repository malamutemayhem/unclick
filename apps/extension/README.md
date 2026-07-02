# UnClick Local (browser extension, Phase 1)

Scoped, approved, revocable local actions for UnClick. The boundary contract is
`docs/rotatepass-local-phase0.md`; the Phase 1 scope is
`docs/prd/unclick-local-extension.md`.

What it never does: read, export, or sync cookies, tokens, passkeys, MFA
material, or sessions. `permissions` is `["storage"]` only, with no host
permissions and no content scripts.

## Load it (Chrome family)

1. Open `chrome://extensions`, enable Developer mode.
2. Load unpacked, select `apps/extension/`.
3. Open the popup: grant a 60 minute mandate for "Wayback archive save",
   paste an `https://unclick.world/...` URL, and request the save.
4. The save page opens in a new tab; a redacted receipt appears in the popup.
5. One-button revoke kills the mandate immediately.

## Tests

Pure logic (mandates, receipts, input gates) runs without a browser:

```bash
node --test apps/extension/test/local-extension.test.mjs
```

## Design notes

- Enforcement lives in the service worker (`background.js`): an execute
  message without a live mandate is refused regardless of what the UI asks.
- Receipts strip secret-material field names by construction (`src/receipts.js`),
  so future capabilities cannot accidentally log forbidden values.
- The launch capability needs zero credentials on purpose: it proves the
  mandate -> execute -> receipt -> revoke loop before anything sensitive
  is ever considered.
