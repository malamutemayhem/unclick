# Connect-me registry rollout (paste-repeatable "infinity prompt")

> **STATUS: SWEEP COMPLETE (136/136).** Every credential-requiring connector
> already has a `CONNECTOR_SETUP` row. If you were fed the batch prompt below,
> do step 1, find zero unchecked `[ ]` connectors, and STOP. Reply with the
> Progress line and make no code changes. Only resume real work if a brand-new
> connector has been added since (an unchecked box appears in the checklist).
> Do not edit existing rows in bulk and do not re-push an unchanged branch.

This is the single source of truth for rolling the **connect-me onboarding cards**
out across every credential-requiring connector.

Two files do all the work (see `packages/mcp-server/src/`):

- `connection-help.ts` = the MASTER TEMPLATE. Owns the wording/structure of the
  "not connected" card. Tweak it once and every connector's message changes.
- `connector-setup.ts` = the REGISTRY. One row per connector in `CONNECTOR_SETUP`
  holding only that connector's unique vars. Plus `notConnectedFor(id)` and
  `requireCredential(id, args)`.

The rollout = **adding registry rows**, not migrating files. Most of the 450+
catalog endpoints resolve credentials server-side; the registry gives every one
of them a correct local connect-me card (`notConnectedFor("<id>")`) and makes any
future local `*-tool.ts` handler a one-liner (`requireCredential("<id>", args)`).

---

## THE INFINITY PROMPT (paste this verbatim, as many times as you like)

> Work the connect-me registry rollout in `malamutemayhem/unclick` on branch
> `claude/friendly-allen-EH46a`, following `docs/connect-me-rollout.md`.
>
> 1. Read `packages/mcp-server/src/connector-setup.ts` and note which connector
>    ids already have a row in `CONNECTOR_SETUP`.
> 2. Open the checklist at the bottom of `docs/connect-me-rollout.md`. The next
>    batch is the first 10 unchecked `[ ]` connectors.
> 3. For each connector in the batch, add a `CONNECTOR_SETUP` row with its real
>    `displayName`, `credential` (what the user pastes, e.g. "API key",
>    "secret key", "personal access token"), `arg` (the request arg name),
>    `envVar`, `setupUrl` (the exact page where the user creates the credential),
>    and an optional one-line `note`. No em dashes. Verify each setupUrl and env
>    var name against the connector's real docs; do not guess.
> 4. Tick those connectors `[x]` in the checklist and bump the "Progress" line.
> 5. From `packages/mcp-server`, run:
>      `npx vitest run src/connector-setup.test.ts src/connection-help.test.ts`
>    then `npx tsc --noEmit -p tsconfig.json`. Both must pass.
> 6. Commit ("Connect-me registry: add <list of ids>") and
>    `git push -u origin claude/friendly-allen-EH46a` (retry/backoff on network
>    errors). Ensure draft PR #1199 reflects it.
> 7. END your reply with exactly one progress line:
>      `Progress: <done>/<total> connectors on the registry (<remaining> left). This batch: <ids>. Next: <ids>.`
>
> Do one batch of 10, then stop. Do not boil the ocean in a single run.

---

## Rules for a good registry row

- `arg` is the parameter an agent passes inline; `envVar` is the deployment
  fallback. `requireCredential` reads arg first, then env.
- Multi-credential connectors (OAuth client id + secret, Twilio sid + token,
  Twitch/IGDB client id + secret) cannot use `requireCredential` directly. Give
  them a row anyway (use the primary credential for the card) and have any local
  handler read its own values then call `notConnectedFor("<id>")`.
- `credential` is human-facing: name the exact thing to paste.
- `setupUrl` must be the page that actually mints the key, not the marketing site.

## How progress is measured

`done` = rows in `CONNECTOR_SETUP`. `total` = checklist length below.
`remaining` = unchecked boxes. Keep the Progress line in sync each batch.

---

## Progress: 137/137 connectors on the registry (0 left)

The initial sweep landed every credential-requiring connector in one pass
(arg names and env vars were harvested from each connector's *-tool.ts, not
guessed). The list below is the live audit set. If a future connector is
added, drop it in unchecked, give it a row, and bump the Progress line.

`openrouter` was added later: NudgeOnly's API path calls OpenRouter with an
`OPENROUTER_API_KEY` (a real third-party credential), so it earns a registry
row and uses `requireCredential("openrouter", args)`.

The internal UnClick tools (keychain, crews, sloppass, testpass, uxpass)
authenticate with UNCLICK_API_KEY, not a connector credential, so they stay
out of the registry. They no longer throw on a missing key: they return the
same structured not-connected shape via `unclickNotConfigured()` in
`connection-help.ts`, so a setup gap is never mistaken for a tool fault.

## Checklist (credential-requiring connectors)

Tick `[x]` when a row exists in `CONNECTOR_SETUP`. Add any platform you find
missing (cross-check `keychain_list_platforms`).

- [x] abuseipdb
- [x] airtable
- [x] algolia
- [x] alphavantage
- [x] amazon
- [x] amber
- [x] anthropic
- [x] asana
- [x] assemblyai
- [x] australiapost
- [x] bandsintown
- [x] brickset
- [x] bs
- [x] bungie
- [x] calendly
- [x] carboninterface
- [x] circleci
- [x] clickup
- [x] clockify
- [x] coc
- [x] cohere
- [x] coingecko
- [x] coinmarketcap
- [x] convertkit
- [x] cr
- [x] datadog
- [x] deepl
- [x] discogs
- [x] discord
- [x] domain
- [x] ebay
- [x] ebird
- [x] elevenlabs
- [x] esports
- [x] etsy
- [x] eventbrite
- [x] exchangerate
- [x] feedly
- [x] figma
- [x] flyio
- [x] foursquare
- [x] genius
- [x] github
- [x] gitlab
- [x] groq
- [x] guardian
- [x] gumroad
- [x] haveibeenpwned
- [x] heygen
- [x] higgsfield
- [x] hunter
- [x] igdb
- [x] instapaper
- [x] ipaustralia
- [x] kling
- [x] lastfm
- [x] lego
- [x] lemonsqueezy
- [x] line
- [x] linear
- [x] mailchimp
- [x] mapbox
- [x] mastodon
- [x] mistral
- [x] mixpanel
- [x] monday
- [x] monica
- [x] nasa
- [x] neon
- [x] newsapi
- [x] notion
- [x] nvd
- [x] omdb
- [x] openai
- [x] openaq
- [x] openexchangerates
- [x] openrouter
- [x] pagerduty
- [x] paypal
- [x] perplexity
- [x] pika
- [x] pinecone
- [x] pinterest
- [x] plaid
- [x] podcastindex
- [x] postman
- [x] postmark
- [x] pushover
- [x] quickbooks
- [x] raindrop
- [x] rawg
- [x] readwise
- [x] reddit
- [x] render
- [x] replicate
- [x] resend
- [x] riot
- [x] runway
- [x] seatgeek
- [x] segment
- [x] sendgrid
- [x] sendle
- [x] sentry
- [x] setlistfm
- [x] shodan
- [x] shopify
- [x] slack
- [x] splitwise
- [x] spotify
- [x] square
- [x] stability
- [x] steam
- [x] stripe
- [x] telegram
- [x] ticketmaster
- [x] tiktok
- [x] tmdb
- [x] togetherai
- [x] toggl
- [x] tomorrowio
- [x] trello
- [x] trove
- [x] turso
- [x] twilio
- [x] twitch
- [x] untappd
- [x] upstash
- [x] urlscan
- [x] vercel
- [x] virustotal
- [x] whatsapp
- [x] willyweather
- [x] wise
- [x] woocommerce
- [x] xero
- [x] yelp
- [x] youtube
