# Shared API crypto helpers

Closes UnClick todo "Architecture QC: shared API crypto helper v1".

## What this ships

A single source of truth for PBKDF2 key derivation and AES-256-GCM encrypt/decrypt across the API surface:

| Export | Purpose |
|---|---|
| `derivePbkdf2Key(passphrase, salt?, iterations?)` | Derive a 32-byte AES key from a passphrase. SHA-256, 210_000 iters default. |
| `verifyPbkdf2Key(passphrase, salt, iterations, expectedKey)` | Timing-safe verify a passphrase against a stored derived-key record. |
| `encryptGcm(plaintext, key, { aad? })` | AES-256-GCM with random 12-byte IV. Returns `payload` + raw parts. |
| `decryptGcm(payload, key, { aad? })` | Inverse. Throws `CryptoHelperError` with `code: "auth_failure"` on tag mismatch. |
| `encryptGcmToString` / `decryptGcmToString` | String-only convenience wrappers. |

`CryptoHelperError` carries a stable `code` property so callers can branch without string parsing.

## Canonical ciphertext layout

```
${ivB64}.${tagB64}.${ciphertextB64}
```

Three base64 parts joined by `.`. The receiving side splits, decodes each part, and feeds them into `decryptGcm`. This is the same shape several of the existing duplicated helpers already use; the migration to the shared helper should not change at-rest data.

## Constants (don't drift)

- PBKDF2: `SHA-256`, **210_000 iterations** (OWASP 2023), 16-byte salt, 32-byte derived key.
- AES-GCM: 12-byte IV, 16-byte tag.

If you need to *increase* iterations for new credentials, do so via the optional argument — never decrease. Existing stored records are decrypted using the iteration count stored alongside them (this is why `verifyPbkdf2Key` takes the stored iterations as an argument, not a global constant).

## Why a separate audit script

`scripts/audit-crypto-helper-call-sites.mjs` lists every file currently using `pbkdf2Sync`, `createCipheriv("aes-256-gcm", ...)`, or related inline patterns. Run it before opening the migration PR to size the swap accurately:

```bash
node scripts/audit-crypto-helper-call-sites.mjs --json > crypto-callsites.json
```

The audit is **informational only** (always exits 0). It's a planning aid for the follow-up patch.

## Migration recipe (follow-up PR)

For each call site identified by the audit:

1. **Find** the local `pbkdf2Sync(...)` block.
2. **Replace** with:
   ```ts
   import { derivePbkdf2Key, verifyPbkdf2Key } from "~/api/lib/crypto-helpers";
   const { key, salt, iterations } = derivePbkdf2Key(passphrase);
   ```
3. **Find** any local `createCipheriv("aes-256-gcm", key, iv)` block.
4. **Replace** with:
   ```ts
   import { encryptGcm, decryptGcm } from "~/api/lib/crypto-helpers";
   const enc = encryptGcm(plaintext, key);          // returns { payload, iv, tag, ciphertext }
   const plain = decryptGcm(payload, key);          // returns Buffer
   ```
5. **Verify** the at-rest data layout matches. If the existing helper used a different separator (`:` vs `.`, or concatenated raw bytes), prefer adding a compat-read path to the shared helper rather than breaking stored records. The current canonical format is `.`-separated base64.
6. Run tests + smoke the changed endpoint.

## Why this PR doesn't ALSO patch the call sites

Crypto changes are protected-surface (rank-20). Mixing "ship the new helper" with "swap every call site" inside one PR makes the review surface huge and the rollback path harder. The split:

- PR 1 (this one): adds the helper + tests + audit script. No behaviour change to anything that exists today.
- PR 2 (follow-up): swaps each call site, one or two files at a time, with the audit's output as the punch list.

Each swap PR has a tight blast radius — at most one or two endpoints regress at a time, and reverting a single swap PR doesn't lose the helper.

## Acceptance (ScopePack 10%)

- [x] `api/lib/crypto-helpers.ts` exists with the API surface above.
- [x] `api/lib/crypto-helpers.test.ts` covers happy-path + tampered-ciphertext + AAD mismatch + invalid key/iv/tag length + iteration floor + timing-safe verify.
- [x] `scripts/audit-crypto-helper-call-sites.mjs` lists call sites in informational mode (exit 0).
- [x] Constants documented (PBKDF2 iters/salt/hash, AES-GCM IV/tag bytes, algorithm string).
- [x] Canonical ciphertext layout documented and stable across encode/decode.

## Non-goals (deferred to PR 2)

- No call-site swaps in this PR — surfaces named via the audit, handled separately.
- No key-rotation flow (live keys vs new keys) — separate spec; the helper itself doesn't carry rotation state.
- No HSM / KMS integration — out of scope for v1.
