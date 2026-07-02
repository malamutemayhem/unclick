# App manual work: what only a human can do

Snapshot date: 2026-07-02. Live source of truth: the **Manual work** column on
`/admin/app-testing` (filter: "Needs a human"). That column is derived per app
by `src/lib/appManualWork.ts` from the connector registries, so it stays
current as connectors change; this file is a readable checklist of the same
data at snapshot time.

The short version: **508 of 675 apps need nothing** (offline utilities, free
public APIs, and UnClick-internal tools). The rest wait on one of four human
steps, listed below from cheapest to most work.

## 1. Sign-ins: click Connect and log in (12 apps)

No key to hunt down. Open the app on the Apps page, click Connect, approve the
provider login. Done once per account.

Dropbox, GitHub, Gmail, Google Drive, Higgsfield, OneDrive, Reddit, Shopify,
Spotify, Supabase, Vercel, Xero

## 2. Bot or app setups (5 apps)

The provider makes you create a bot or app password first, then paste it on the
app's connection page.

| App | Create it at |
|---|---|
| Bluesky | Settings > App passwords on bsky.app |
| Discord | discord.com/developers/applications (Bot > Token) |
| Mastodon | Preferences > Development on your instance |
| Slack | api.slack.com/apps (bot token, xoxb-) |
| Telegram | @BotFather (/newbot) |

## 3. Operator env vars (3 apps)

Shared server-side secrets, set once on the deployment (Vercel env vars), not
per user.

| App | Env var | Get it from |
|---|---|---|
| ABN | `ABN_GUID` | https://abr.business.gov.au/Tools/WebServices (GUID already approved 2026-06-07; just set the var) |
| BoardGameGeek | `BGG_API_TOKEN` | https://boardgamegeek.com/wiki/page/BGG_XML_API2 |
| TAB Australia | `TAB_API_BASE` | https://www.studio.tab.com.au/docs (OAuth registration) |

## 4. Provider API keys (143 apps outstanding)

Each needs an account at the provider and a key from its dashboard, then paste
it on the Apps page (it is live-tested before it stores). The Apps page connect
modal shows the same link per app. Alphabetical:

| App | Key page |
|---|---|
| AbuseIPDB | https://www.abuseipdb.com/account/api |
| Airtable | https://airtable.com/create/tokens |
| Algolia | https://dashboard.algolia.com/account/api-keys/all |
| Alpha Vantage | https://www.alphavantage.co/support/#api-key |
| Amazon Product Advertising | https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html |
| Amber Electric | https://app.amber.com.au/developers |
| Anthropic | https://console.anthropic.com/settings/keys |
| Asana | https://app.asana.com/0/my-apps |
| AssemblyAI | https://www.assemblyai.com/app/account |
| Australia Post | https://developers.auspost.com.au/ |
| Bandsintown | https://www.artists.bandsintown.com/bandsintown-api |
| Bitbucket | https://bitbucket.org/account/settings/app-passwords/ |
| Brevo | https://app.brevo.com/settings/keys/api |
| Bungie | https://www.bungie.net/en/Application |
| Cal.com | https://app.cal.com/settings/developer/api-keys |
| Calendly | https://calendly.com/integrations/api_webhooks |
| Carbon Interface | https://www.carboninterface.com/account/api_tokens |
| CircleCI | https://app.circleci.com/settings/user/tokens |
| ClickUp | https://app.clickup.com/settings/apps |
| Clockify | https://app.clockify.me/user/settings |
| Cloudinary | https://console.cloudinary.com/settings/api-keys |
| Coda | https://coda.io/account |
| Cohere | https://dashboard.cohere.com/api-keys |
| CoinMarketCap | https://pro.coinmarketcap.com/account |
| Confluence | https://id.atlassian.com/manage-profile/security/api-tokens |
| Contentful | https://app.contentful.com/ |
| DeepL | https://www.deepl.com/your-account/keys |
| Datadog | https://app.datadoghq.com/organization-settings/api-keys |
| DigitalOcean | https://cloud.digitalocean.com/account/api/tokens |
| Discogs | https://www.discogs.com/settings/developers |
| Domain | https://developer.domain.com.au/ |
| eBay | https://developer.ebay.com/my/keys |
| eBird | https://ebird.org/api/keygen |
| ElevenLabs | https://elevenlabs.io/app/settings/api-keys |
| Email (SMTP/IMAP) | app password from your email provider |
| Etsy | https://www.etsy.com/developers/your-apps |
| Eventbrite | https://www.eventbrite.com/platform/api-keys |
| Feedly | https://developer.feedly.com/ |
| Figma | https://www.figma.com/developers/api#access-tokens |
| Fly.io | https://fly.io/user/personal_access_tokens |
| Foursquare | https://foursquare.com/developers/home |
| Genius | https://genius.com/api-clients |
| Ghost | https://ghost.org/docs/content-api/ |
| Giphy | https://developers.giphy.com/dashboard/ |
| GitLab | https://gitlab.com/-/user_settings/personal_access_tokens |
| Groq | https://console.groq.com/keys |
| Guardian | https://open-platform.theguardian.com/access/ |
| Gumroad | https://app.gumroad.com/settings/advanced |
| Have I Been Pwned | https://haveibeenpwned.com/API/Key |
| HeyGen | https://app.heygen.com/settings/api |
| HubSpot | https://app.hubspot.com/settings/integrations/private-apps |
| Hunter | https://hunter.io/api-keys |
| IGDB | https://api-docs.igdb.com/#account-creation |
| Instapaper | https://www.instapaper.com/main/request_oauth_consumer_token |
| Intercom | https://developers.intercom.com/building-apps/docs/authentication-types |
| IP Australia | https://www.ipaustralia.gov.au/tools-and-research/professional-resources/data-and-apis |
| Jira | https://id.atlassian.com/manage-profile/security/api-tokens |
| Kit (ConvertKit) | https://app.convertkit.com/account_settings/advanced_settings |
| Klaviyo | https://www.klaviyo.com/settings/account/api-keys |
| Kling | https://klingai.com/ |
| Last.fm | https://www.last.fm/api/account/create |
| LEGO (Rebrickable) | https://rebrickable.com/api/ |
| Lemon Squeezy | https://app.lemonsqueezy.com/settings/api |
| LINE | https://developers.line.biz/console/ |
| Linear | https://linear.app/settings/api |
| Lord of the Rings API | https://the-one-api.dev/ |
| Mailchimp | https://admin.mailchimp.com/account/api/ |
| Mapbox | https://account.mapbox.com/access-tokens/ |
| Miro | https://developers.miro.com/ |
| Mistral | https://console.mistral.ai/api-keys/ |
| Mixpanel | https://mixpanel.com/settings/project |
| monday.com | https://monday.com/developers/v2 |
| Monica | https://app.monicahq.com/settings/api |
| Neon | https://console.neon.tech/app/settings/api-keys |
| Netlify | https://app.netlify.com/user/applications#personal-access-tokens |
| NewsAPI | https://newsapi.org/account |
| Notion | https://www.notion.so/my-integrations |
| OMDb | https://www.omdbapi.com/apikey.aspx |
| OpenAI | https://platform.openai.com/api-keys |
| OpenAQ | https://explore.openaq.org/register |
| PagerDuty | https://support.pagerduty.com/docs/api-access-keys |
| PandaScore | https://app.pandascore.co/dashboard/main |
| PayPal | https://developer.paypal.com/dashboard/applications |
| Perplexity | https://www.perplexity.ai/settings/api |
| Pika | https://pika.art/ |
| Pinecone | https://app.pinecone.io/ |
| Pinterest | https://developers.pinterest.com/apps/ |
| Pipedrive | https://app.pipedrive.com/settings/api |
| Plaid | https://dashboard.plaid.com/team/keys |
| Podcast Index | https://api.podcastindex.org/ |
| PostHog | https://app.posthog.com/settings/user-api-keys |
| Postman | https://go.postman.co/settings/me/api-keys |
| Postmark | https://account.postmarkapp.com/servers |
| Pushover | https://pushover.net/apps/build |
| QuickBooks | https://developer.intuit.com/app/developer/dashboard |
| Raindrop.io | https://app.raindrop.io/settings/integrations |
| RAWG | https://rawg.io/apidocs |
| Readwise | https://readwise.io/access_token |
| Render | https://dashboard.render.com/u/settings/api-keys |
| Replicate | https://replicate.com/account/api-tokens |
| Resend | https://resend.com/api-keys |
| Riot Games | https://developer.riotgames.com/ |
| Runway | https://dev.runwayml.com/ |
| SeatGeek | https://seatgeek.com/account/develop |
| Segment | https://app.segment.com/ |
| SendGrid | https://app.sendgrid.com/settings/api_keys |
| Sendle | https://www.sendle.com/ |
| Sentry | https://sentry.io/settings/account/api/auth-tokens/ |
| setlist.fm | https://www.setlist.fm/settings/api |
| Shodan | https://account.shodan.io/ |
| Shortcut | https://app.shortcut.com/settings/account/api-tokens |
| Splitwise | https://secure.splitwise.com/apps |
| Square | https://developer.squareup.com/apps |
| Stability AI | https://platform.stability.ai/account/keys |
| Stripe | https://dashboard.stripe.com/apikeys |
| Supercell games | https://developer.clashofclans.com/ (plus Clash Royale and Brawl Stars portals) |
| Ticketmaster | https://developer.ticketmaster.com/ |
| TikTok | https://developers.tiktok.com/ |
| TMDB | https://www.themoviedb.org/settings/api |
| Todoist | https://app.todoist.com/app/settings/integrations/developer |
| Together AI | https://api.together.ai/settings/api-keys |
| Toggl Track | https://track.toggl.com/profile |
| Tomorrow.io | https://app.tomorrow.io/development/keys |
| Trello | https://trello.com/power-ups/admin |
| Trove | https://trove.nla.gov.au/about/create-something/using-api |
| Turso | https://app.turso.tech/ |
| Twilio | https://console.twilio.com/ |
| Twitch | https://dev.twitch.tv/console/apps |
| Typeform | https://admin.typeform.com/account#/section/tokens |
| Unsplash | https://unsplash.com/oauth/applications |
| Untappd | https://untappd.com/api/ |
| Upstash | https://console.upstash.com/account/api |
| UptimeRobot | https://uptimerobot.com/dashboard#mySettings |
| VirusTotal | https://www.virustotal.com/gui/my-apikey |
| Webflow | https://developers.webflow.com/data/reference/authentication |
| WhatsApp | https://developers.facebook.com/apps |
| WillyWeather | https://www.willyweather.com.au/info/api.html |
| Wise | https://wise.com/settings/ |
| WooCommerce | https://woocommerce.com/document/woocommerce-rest-api/ |
| WordPress | https://wordpress.org/documentation/article/application-passwords/ |
| Yelp | https://www.yelp.com/developers/v3/manage_app |
| YouTube | https://console.cloud.google.com/apis/credentials |
| Zendesk | https://support.zendesk.com/hc/en-us/articles/4408889192858 |

## Needs nothing (for the record)

- Offline utilities and algorithm tools: no network, no account.
- Free public APIs: work without any credential.
- Key-optional apps (NASA, CoinGecko, NVD): already working; a key only raises
  rate limits.
- UnClick-internal tools (the XPass family, Vault, Keychain, Crews, JobSmith,
  C-Suite): nothing external exists to sign up for.

## Known broken upstreams (not a key problem)

- Animal Crossing NH (`acnhapi`): acnhapi.com is dead; migrating to the
  Nookipedia API (which needs a key) is a code task, tracked by its Issue row.
