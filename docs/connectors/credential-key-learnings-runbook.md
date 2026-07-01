# Credential and key learnings

This is the hard-won knowledge surface for connector credentials, encryption
schemes, and key handling in UnClick. It is the companion to
[`app-connection-readiness.md`](./app-connection-readiness.md): that file is the
rollout contract for whether a connection is wired correctly, this file is the
list of credential and key traps that silently break connections, decryption,
and tenant isolation. Each learning is written so you can recognise the symptom
before you waste an afternoon on it.

## The rule

A stored credential has three independent failure modes that all look the same
from the dashboard:

1. the query that reads it can be malformed (a 400 empties the page)
2. the wrong crypto scheme can make it undecryptable
3. it can be scoped to a key that rotates out from under it

Treat each one as a separate thing to prove. A green badge proves none of them.

## L1 - the `api_keys` table has no plaintext `api_key` column

**Symptom:** the web Connections page goes silently empty, or a connector lookup
returns nothing, with no obvious error in the UI.

**Why:** `public.api_keys` stores only the SHA-256 `key_hash` (plus `user_id`,
`is_active`, `lane_hash`). There is no plaintext `api_key` column. A PostgREST
`select` that names a non-existent column 400s the entire query, so the read
returns nothing and the page renders as if there are no connections.

**Do:** select only columns that exist, for example `select=key_hash` or
`select=user_id,is_active`. Fixed in `backstagepass.ts`,
`backstagepass-settings.ts`, `testpass-run.ts`, and `uxpass-run.ts`.

**Don't:** never write `select=key_hash,api_key` or add `,api_key` to any
`api_keys` select. The hash is the only credential-shaped value the table holds.

## L2 - two crypto schemes live on `user_credentials.enc_scheme`

**Symptom:** a stored credential that used to decrypt suddenly fails with
"Failed to decrypt credentials", or a credential saved from a login session
cannot be read by the agent path (or vice versa).

**Why:** `user_credentials` carries an `enc_scheme` column with two values:

- `apikey` (default): AES-256-GCM with a PBKDF2 key derived from the caller's
  raw `uc_`/`agt_` UnClick key, 100k iterations, stored across four hex columns
  (`encryption_iv`, `encryption_tag`, `encrypted_data`, `encryption_salt`). Only
  the key-holder can decrypt; the key is never stored.
- `server`: AES-256-GCM with a stable server secret bound to the account lane
  (PBKDF2 over `UNCLICK_AI_KEY_SECRET:lane_hash`). Readable from a logged-in
  session alone and untouched by master-key rotation.

**Do:** decrypt vault rows through `api/lib/chat-crypto.ts`, which uses the
100k / four-hex-column scheme that matches what is actually stored.

**Don't:** never run the helpers in `api/lib/crypto-helpers.ts` on vault rows.
That helper uses 210,000 iterations and a dot-joined payload layout and CANNOT
decrypt existing vault rows. The two schemes are not interchangeable.

## L3 - scope durable data by `lane_hash`, never by `key_hash`

**Symptom:** after an API key rotation, a tenant's memory, credentials, or other
durable rows appear to vanish; the data is still in the table but nothing reads
it back.

**Why:** an API key (and therefore its `key_hash` / `api_key_hash`) can rotate.
Any durable row scoped to a hash is stranded the moment the key changes, because
the new key derives a different hash and never matches the old rows.

**Do:** scope durable, key-surviving data by the stable `lane_hash`. The lane
survives rotation, so the data follows the account rather than the key.

**Don't:** never key durable data by `key_hash` or `api_key_hash` alone. See the
[tenant lane split incident](../incidents/2026-06-21-tenant-lane-split.md) and
its [recovery runbook](../incidents/2026-06-21-tenant-lane-split-recovery-runbook.md)
for what stranded data looks like and how it was recovered.

## L4 - an env secret can exist but be empty

**Symptom:** a code path that "checks for" the server secret takes the
configured branch in production, then fails downstream because the secret is
actually blank.

**Why:** an environment variable can be set to an empty string (length 0). A
bare presence check (`process.env.X !== undefined`, or "the key exists in the
dashboard") passes for a blank value, so the server-scheme branch runs without a
usable secret.

**Do:** check the LENGTH, not the presence. Read the secret, `.trim()` it, and
gate on the resulting non-empty string. The server secret is
`UNCLICK_AI_KEY_SECRET` with a `UNCLICK_AI_KEY_SECRET_V2` fallback.

**Don't:** never rotate `UNCLICK_AI_KEY_SECRET`. Every server-scheme row is
bound to it; rotating it bricks all of them at once.

## L5 - plaintext key vs key hash decide what can be decrypted

**Symptom:** a logged-in web session, or a worker holding only a key hash, can
list connections but cannot actually decrypt and use a stored credential.

**Why:** `UNCLICK_API_KEY` (plaintext) and `UNCLICK_API_KEY_HASH` are not
interchangeable. The hash is enough for read-only status lookups, but it is NOT
enough to decrypt anything. Login/OAuth sessions carry only the hash and cannot
decrypt apikey-scheme credentials at all; to decrypt server-scheme credentials
they need a verified MCP OAuth token, not the bare hash.

**Do:** use the plaintext `UNCLICK_API_KEY` to decrypt apikey-scheme rows, and a
verified MCP OAuth session token to reach server-scheme rows on a keyless login
session. Keep hash-only callers on read-only status.

**Don't:** never expect a key hash alone to decrypt a credential.

## L6 - `connected: true` is not proof

**Symptom:** the dashboard or status call says a connector is connected, but the
real action fails with a 401/403 or a dead token.

**Why:** stored connection state can be stale. A saved row, or proof recorded
hours ago, is not evidence the credential works right now.

**Do:** live-test the real action before trusting a connection. Treat any
`stale` or `needs_recheck` signal as broken, and reconnect through
`/connect/<app>`.

**Don't:** never tell a user a connection is live on the strength of a stored
`connected: true` flag alone.

## L7 - a bare `lane_hash` must never be a decryption credential

**Symptom:** a design where presenting a `lane_hash` (or any unverified bearer)
is enough to decrypt server-scheme rows. This is a cross-tenant leak.

**Why:** a `lane_hash` is not a secret. It leaks through room membership in
`api/chat-threads.ts`, so anyone who can see a room could otherwise read that
lane's credentials. Decryption must require something only the account holder
has.

**Do:** require a verified MCP OAuth token to decrypt server-scheme credentials
from a login session. The token's signature, issuer, audience, and expiry are
verified server-side, and only its subject maps to a lane.

**Don't:** never accept a bare `lane_hash` or unverified bearer as authorization
to decrypt. See PR #1652 (NO-GO) and #1653 (the fix).

## L8 - the Connected list must read server-scheme rows by lane

**Symptom:** a session-saved (server-scheme) connection is missing from the
Connected list even though it was saved successfully.

**Why:** server-scheme rows are stamped to the stable lane. A Connected list
that only filters by `api_key_hash` never sees rows that a session caller wrote
under their lane.

**Do:** read server-scheme rows by `lane_hash` (scoped to `enc_scheme=server`)
in addition to the `api_key_hash` path, so session-saved connections stay
visible.

**Don't:** never build the Connected list on `api_key_hash` alone.

## L9 - AI provider keys live in Seats/API, not Apps

**Symptom:** confusion over where an OpenAI or Anthropic key belongs, or a
provider key entered in the wrong surface.

**Why:** an LLM/brain key (the key that powers inference) is a different product
surface from a tool connector. AI provider keys live in Seats/API under
`/admin/agents/api`, not in the Apps connection flow.

**Do:** route AI provider/LLM keys to `/admin/agents/api`. Remember OpenAI and
Anthropic are dual-role: they can be a tool-connector (an App) AND a brain-key
(a Seats/API provider key), and the two are stored and used separately.

**Don't:** never assume a provider entry under Apps is the same thing as the
brain-key under Seats/API.

## Fast debugging checklist

When a credential or connection misbehaves:

1. Run `npm run check:app-connections`.
2. If the Connections page is empty, check every `api_keys` query selects only
   real columns (L1) - a single bad column 400s the whole read.
3. If decryption fails, confirm which `enc_scheme` the row uses and that the
   matching scheme is being applied: `chat-crypto.ts` for vault rows, never
   `crypto-helpers.ts` (L2).
4. If data vanished after a key change, confirm it is scoped by `lane_hash`, not
   `key_hash` (L3).
5. If a "configured" secret branch fails, confirm the secret has non-zero length
   and was not rotated (L4).
6. If a caller can list but not decrypt, confirm whether it holds the plaintext
   key, a key hash only, or a verified MCP OAuth token (L5, L7).
7. Live-test the real action before calling anything connected; treat stale or
   needs_recheck as broken (L6).
8. If a server-scheme connection is missing from the Connected list, confirm it
   is read by lane, not only by `api_key_hash` (L8).
9. If a provider key seems misplaced, confirm whether it belongs in Apps or in
   Seats/API at `/admin/agents/api` (L9).
