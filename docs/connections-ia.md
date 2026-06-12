# Connections IA: one list, many lenses

**Status:** operator-approved direction (Chris, 2026-06-11)
**Owns:** the information architecture for Apps, Passport, and Websites in the admin. Workers building on these surfaces follow this doc; if reality drifts, fix the source then update this doc.

## The operator's decision (the anchor)

> "The trend I am seeing is Apps covers most bases. Let's just make use of that page holistically to have a consistent side menu filtering, and the same filtering in the top section."

Everything below serves that line. The Apps page is THE list. Other views are filters (lenses) of that one list, never separate lists that drift apart.

## The model, one line each

| Surface | What it is | One-liner for users |
|---|---|---|
| **Connections** | The umbrella: everything UnClick plugs into (outbound) | "What your AI is allowed to reach" |
| **Apps** | The catalog page, used holistically. Every other view is a saved filter of this list | "What your AI can do" |
| **Passport** | The credentials wallet view: OAuth grants, API keys, health, rotation, audit | "What your AI can sign into" |
| **Websites** | Sites UnClick can act on through the Chrome extension | "Where your AI can act on the web" |

The earlier confusion came from "Connected" feeling like a separate place. It is not. Connected is a state an app is in, shown and managed on the Apps list itself; Passport is the deep wallet view behind it.

## Vocabulary (one set of words, everywhere)

**Setup kinds** (what an app needs before first use):

- **Built-in**: works immediately, no setup. No button.
- **Sign-in app**: connects through a login popup (OAuth). Status button: **Connect**. This is the github/spotify/gmail style; the industry term is OAuth, the user-facing term is sign-in.
- **Key app**: needs an API key pasted once. Status button: **Add key**.

**States** (where a connectable app is right now):

- **Connected**: credential saved and live-tested.
- **Not connected**: no credential yet.
- **Needs attention**: had a credential but the last health check failed or it expired.

Sign-in platforms live today (`api/oauth-init.ts` ALLOWED_PLATFORMS): github, xero, reddit, shopify. Gmail, Spotify, and others need a provider added there plus OAuth app registration; until then they present as key apps.

## Lenses (the filtering rule)

Side menu entries and top filter chips are the SAME filter state with two controls. Selecting "Connected" in the side menu lights the same filter as clicking a "Connected" chip. One source of truth for filter state; no view-only forks.

Planned lenses on the Apps list:

- All (default)
- Connected (default lens when arriving from the Connections section)
- Not connected
- Popular
- Sign-in apps / Key apps / Built-in (setup kind)
- Existing category chips (AI, Books, Content, ...) and internet chips (Works offline, Uses internet, Hybrid) stay as they are

## Bridges (how the surfaces hand off)

1. Status column buttons on app rows open the connect wizard (`ConnectAppModal`). On success the wizard says where the credential now lives ("Saved to Passport, live-tested") and the row flips to Connected.
2. Passport rows link back to their app page, so the wallet is never a dead end.
3. The Passport page keeps the audit, rotation, reveal, and health features; it does not grow a second catalog.

## Naming rules

- **Connections** is the section umbrella. **Passport** is the wallet page inside it. **Apps** and **Websites** keep their names.
- Internal names stay in internal contracts only: route `/admin/keychain`, API `/api/backstagepass`. Same approach as the Boardroom rename precedent: rename the user surface, keep the plumbing stable.
- Words retired from visible copy: BackstagePass, Keychain, Vault, Credentials. Enforced by `src/__tests__/passport-public-name-lock.test.ts`.

## Build order and lane ownership

1. **Shipped with this doc:** crash safety in `api/backstagepass.ts` (no more naked 500s; the page now gets a readable error) and a Retry button on the Passport list error banner.
2. **Apps page lenses:** Connected / Not connected / Popular / setup-kind filters with the side-menu-equals-top-chips rule, and a status button on every connectable row. Unowned at the time of writing; claim it as one chip in the Boardroom.
3. **Sidebar grouping:** Apps, Passport, and Websites grouped under a Connections section. `AdminShell.tsx` is ring-fenced by the open AdminShell polish lane; coordinate there before touching.
4. **Websites surface:** lands when the Chrome extension exposes its site-permission list.
5. **Sign-in expansion:** add Google and Spotify providers to `api/oauth-init.ts` and the OAuth callback when prioritized.

## Known issues

- The Advanced system inventory section on the Passport page rendered with overlapping rows (operator screenshot, 2026-06-11, Brave). Not reproducible from static code review; the row markup is a plain CSS grid. Needs a browser devtools look (computed styles on `.divide-y` children) before any fix. Tracked as a Boardroom todo; UXPass before/after screenshot proof required for the fix.
