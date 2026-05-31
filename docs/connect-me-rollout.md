# Connect-me registry rollout (paste-repeatable "infinity prompt")

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

## Progress: 13/119 connectors on the registry (106 left)

## Checklist (credential-requiring connectors)

Tick `[x]` when a row exists in `CONNECTOR_SETUP`. Add any platform you find
missing (cross-check `keychain_list_platforms`).

- [x] stripe
- [x] etsy
- [x] foursquare
- [x] airtable
- [x] algolia
- [x] anthropic
- [x] assemblyai
- [x] abuseipdb
- [x] amber
- [x] asana
- [x] bandsintown
- [x] brickset
- [x] bungie
- [ ] calendly
- [ ] circleci
- [ ] clickup
- [ ] clockify
- [ ] cmc
- [ ] cohere
- [ ] convertkit
- [ ] datadog
- [ ] deepl
- [ ] discogs
- [ ] discord
- [ ] domain
- [ ] ebay
- [ ] ebird
- [ ] elevenlabs
- [ ] eventbrite
- [ ] exchangerate
- [ ] feedly
- [ ] figma
- [ ] fly
- [ ] genius
- [ ] github
- [ ] gitlab
- [ ] groq
- [ ] guardian
- [ ] gumroad
- [ ] heygen
- [ ] hibp
- [ ] higgsfield
- [ ] hunter
- [ ] igdb
- [ ] instapaper
- [ ] kling
- [ ] lastfm
- [ ] line
- [ ] linear
- [ ] lemonsqueezy
- [ ] mailchimp
- [ ] mapbox
- [ ] mastodon
- [ ] mistral
- [ ] mixpanel
- [ ] monday
- [ ] monica
- [ ] nasa
- [ ] neon
- [ ] newsapi
- [ ] notion
- [ ] omdb
- [ ] openai
- [ ] pagerduty
- [ ] paypal
- [ ] perplexity
- [ ] pika
- [ ] pinecone
- [ ] pinterest
- [ ] plaid
- [ ] podcastindex
- [ ] postman
- [ ] postmark
- [ ] pushover
- [ ] quickbooks
- [ ] raindrop
- [ ] rawg
- [ ] readwise
- [ ] reddit
- [ ] render
- [ ] replicate
- [ ] resend
- [ ] riot
- [ ] runway
- [ ] seatgeek
- [ ] segment
- [ ] sendgrid
- [ ] sendle
- [ ] sentry
- [ ] shodan
- [ ] shopify
- [ ] slack
- [ ] splitwise
- [ ] spotify
- [ ] square
- [ ] stability
- [ ] stockdata
- [ ] tab
- [ ] telegram
- [ ] tmdb
- [ ] ticketmaster
- [ ] tiktok
- [ ] togetherai
- [ ] toggl
- [ ] trello
- [ ] trove
- [ ] turso
- [ ] twilio
- [ ] twitch
- [ ] untappd
- [ ] urlscan
- [ ] vercel
- [ ] virustotal
- [ ] whatsapp
- [ ] wise
- [ ] woocommerce
- [ ] xero
- [ ] yelp
- [ ] youtube
