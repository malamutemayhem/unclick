# Connections: Apps as THE list (holistic plan)

Status: operator-directed build, 2026-06-12 ("Apps covers most bases, let's just make use of that page wholistically... consistent side menu filtering, but a same filtering in the top section"; Passport dissolve approved: "could all that be managed in the dropdown of each app?" -> yes -> "ok build")
Companions: `docs/connections-ia.md` (PR #1476, the umbrella tree; this doc supersedes its "Passport keeps its name" line), `docs/prd/connections-circle.md` (Circle + sidebar), `docs/connectors/connections-hardening-plan.md`.

## Principles (the operator's simple logic, made law)

1. **One list, many lenses.** There is exactly one Apps list. Every view (Connected, Popular, Key apps...) is a filter of that list, never a fork or a second page.
2. **One filter state, two controls.** The left rail and the top chips render from the same lens definition array and read/write the same state. Selecting anywhere updates everywhere. State lives in the URL (`?lens=...`) so views are linkable and survive refresh.
3. **Buttons say the action, pills say the truth.** Status pills report proven state (green Connected only after a real test). The action button says what clicking does: Connect (sign-in apps), Add key (key apps), Manage (already connected). Built-in apps need nothing and show no button.
4. **Three setup kinds, plain names.** Sign-in apps (OAuth popup: click, approve, done), Key apps (paste a key once), Built-in (work immediately). Derived from connector `auth_type`: oauth2 -> sign-in; api_key / bot_token -> key; no connector -> built-in.
5. **Truth-locked lenses.** "Popular" is a curated starter set until real usage data exists (the code says so in a comment); "Connected" means a working credential is on file (the pill still distinguishes proven vs saved-untested).

## The lens taxonomy (one source array drives rail + chips)

| Group | Lens | Definition |
|---|---|---|
| Library | All | everything |
| Library | Popular | curated set, catalog-membership-checked |
| Status | Connected | connector credential `is_valid` |
| Status | Not connected | connector exists, no working credential |
| Setup | Sign-in apps | `auth_type === "oauth2"` |
| Setup | Key apps | `auth_type` is api_key or bot_token |
| Setup | Built-in | no connector row |

Lenses compose with the existing search/category/sort (lens narrows first, table filters refine). One lens at a time, App Store style: simple beats clever.

## Phases

**P1 (this PR): lenses + buttons.** `appLenses.ts` (pure, tested) + `AppLensBar` (one component, rail and chips variants) + URL state in AdminTools + `actionOf` button column in AppsTable (additive optional prop; public mode untouched).

**P2: the credential drawer (Passport absorb).** Each connector-backed app row's expansion gains a Credentials section: rows (label, status, last tested), relabel, delete, reveal behind the proof-of-possession prompt, multiple credentials per app. Reuses the existing backstagepass API actions unchanged. Coordinate with PR #1476 (it hardened that API's error handling); land #1476 first.

**P3: retire Passport.** When P2 reaches parity: remove the sidebar entry, `/admin/keychain` redirects to `/admin/apps?lens=connected`, system-credential rows surface under a System lens (most map to existing tiles: Vercel and Supabase are already catalog apps), true infra oddballs move to the internal admin section, global credential audit folds into the existing internal Audit Log page. The Passport label retires at zero contract cost (rename rule: it was only ever a UI label).

**P4: Websites surface** (extension lane: browser-login sites, "local session (this browser)", mandate state) joins the Connections group, which then ships in the sidebar with Circle (already-claimed chip dfa23691).

## Out of scope here

Public /apps page behavior (shares AppsTable; all P1 admin additions are optional props), the sidebar grouping (Circle PR 1), any backstagepass API change, OAuth provider expansion (todo 047a1928: Google, Spotify).
