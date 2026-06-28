# Account-lane deep fix - plan and status (2026-06-24)

Follow-up to the 2026-06 tenant lane-split. Memory + tenant rows are scoped by
`api_key_hash`. Historically that was the *current* key hash, so rotating or
adding a key stranded the operator's data on a fresh, empty lane.

## Shipped on this branch

| Migration | What it does | Risk |
|-----------|--------------|------|
| `20260624120000_account_lane_hash` | Adds `api_keys.lane_hash`, backfills it to `key_hash`. Resolvers return `coalesce(lane_hash, key_hash)`. Rotation (`reset_api_key`) keeps the lane. | Behaviour-neutral on day one |
| `20260624130000_consolidate_account_lanes` | Points ALL of an account's keys at its canonical lane, so multiple keys share one drawer. | No drawer changes; only sibling keys are realigned |

Net effect: **a key can rotate, and an account can hold several keys, without
its memory ever stranding.**

## Remaining (do when it's actually needed - not urgent)

1. **Inherit on new-key creation.** There is no multi-key *creation* endpoint
   today (`generate_api_key` is one-per-user; `reset_api_key` rotates in
   place). When such an endpoint is added, it MUST stamp the new row with the
   account's existing `lane_hash` (inherit), falling back to the new key's own
   hash only when the account has no lane yet. The consolidation migration
   above covers every key that exists today; this keeps future keys correct by
   construction.

2. **(Optional) Anchor the lane on a stable account id.** Today the lane value
   is the first/canonical key's hash. Re-anchoring it on `user_id` would let
   even the very first key be retired with zero special-casing. This is a
   genuine *data move* (memory rows would shift to the new lane), so it must be
   done deliberately, behind a backup, and is NOT required: once an account's
   keys all carry the shared lane (migration 2), deleting any single key row -
   including the first - is already safe because the siblings keep the lane.

## Credentials are a separate problem (cannot be auto-migrated)

BackstagePass / keychain values are encrypted with a key **derived from the raw
`uc_` api_key** (see `api/backstagepass.ts`, `deriveKey(apiKey, salt)`), and
proof-of-possession compares `sha256(submitted_key)` against the stored hash.
That is why `api/backstagepass.ts` deliberately resolves to `key_hash`, NOT the
lane.

Consequence: stranded credentials **cannot be recovered by moving rows.**
Without the original raw key, the encrypted values are undecryptable, so the
only correct recovery is for the operator to **reconnect (re-enter) the
affected services**. Re-stamping the rows would make them *visible* but still
*unreadable*, which is worse than absent. This is by design: secrets are
re-entered after a key rotation.
