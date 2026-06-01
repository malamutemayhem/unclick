// ─── Connector setup registry ────────────────────────────────────────────────
// The single place each connector declares its UNIQUE setup variables.
//
// Two files, two jobs:
//   - connection-help.ts  = the master template (how the "not connected" message
//                           is worded and structured). Tweak it once and every
//                           connector's message changes.
//   - connector-setup.ts  = this file. One row per connector holding only the
//                           bits that differ (display name, the credential's
//                           arg/env var, where to get it). Edit one row to change
//                           a single connector; nothing is copy-pasted per call.
//
// A connector then declares nothing but its id:
//   const key = requireCredential("stripe", args);
//   if (typeof key !== "string") return key;   // not-connected card, already built
//
// This mirrors docs/connectors/setup-metadata-vocabulary.md and the
// platform_connectors registry, kept in code so the local (DB-less) MCP path
// works the same as the hosted one.

import {
  notConnected,
  type NotConnectedOptions,
  type NotConnectedResult,
} from "./connection-help.js";

/** Per-connector unique variables. Everything except the connector id, which is the map key. */
export type ConnectorSetup = Omit<NotConnectedOptions, "connector">;

// Rows are grouped only for human readability; lookup is by key. Each row carries
// the connector's REAL arg name and env var (harvested from its *-tool.ts), so the
// "pass X or set Y" line in the card always matches what the handler actually reads.
//
// Multi-credential connectors (OAuth client id + secret, account sid + token,
// store + token) name their PRIMARY credential here for the card and describe the
// rest in `note`. Their handlers read every value themselves and call
// `notConnectedFor(id)`; they do not use the single-value `requireCredential`.
export const CONNECTOR_SETUP: Record<string, ConnectorSetup> = {
  // ─── Payments / commerce ──────────────────────────────────────────────────
  stripe: {
    displayName: "Stripe",
    credential:  "secret key",
    arg:         "secret_key",
    envVar:      "STRIPE_SECRET_KEY",
    setupUrl:    "https://dashboard.stripe.com/apikeys",
    note:        "The Stripe secret key starts with sk_live_ or sk_test_.",
  },
  etsy: {
    displayName: "Etsy",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ETSY_API_KEY",
    setupUrl:    "https://www.etsy.com/developers/your-apps",
  },
  paypal: {
    displayName: "PayPal",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "PAYPAL_CLIENT_ID",
    setupUrl:    "https://developer.paypal.com/dashboard/applications",
    note:        "Also pass client_secret (or set PAYPAL_CLIENT_SECRET).",
  },
  square: {
    displayName: "Square",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "SQUARE_ACCESS_TOKEN",
    setupUrl:    "https://developer.squareup.com/apps",
  },
  shopify: {
    displayName: "Shopify",
    credential:  "Admin API access token",
    arg:         "access_token",
    envVar:      "SHOPIFY_ACCESS_TOKEN",
    setupUrl:    "https://admin.shopify.com/",
    note:        "Also pass store (your-shop or your-shop.myshopify.com).",
  },
  woocommerce: {
    displayName: "WooCommerce",
    credential:  "consumer key",
    arg:         "consumer_key",
    envVar:      "WOOCOMMERCE_CONSUMER_KEY",
    setupUrl:    "https://woocommerce.com/document/woocommerce-rest-api/",
    note:        "Also pass consumer_secret (WooCommerce > Settings > Advanced > REST API).",
  },
  gumroad: {
    displayName: "Gumroad",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "GUMROAD_ACCESS_TOKEN",
    setupUrl:    "https://app.gumroad.com/settings/advanced",
  },
  lemonsqueezy: {
    displayName: "Lemon Squeezy",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "LEMONSQUEEZY_API_KEY",
    setupUrl:    "https://app.lemonsqueezy.com/settings/api",
  },
  quickbooks: {
    displayName: "QuickBooks",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "QUICKBOOKS_ACCESS_TOKEN",
    setupUrl:    "https://developer.intuit.com/app/developer/dashboard",
  },
  xero: {
    displayName: "Xero",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "XERO_ACCESS_TOKEN",
    setupUrl:    "https://developer.xero.com/app/manage",
    note:        "Also pass tenant_id for the Xero organisation.",
  },
  plaid: {
    displayName: "Plaid",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "PLAID_CLIENT_ID",
    setupUrl:    "https://dashboard.plaid.com/team/keys",
    note:        "Also pass secret, and access_token for item endpoints.",
  },
  wise: {
    displayName: "Wise",
    credential:  "API token",
    envVar:      "WISE_API_TOKEN",
    setupUrl:    "https://wise.com/settings/",
  },

  // ─── AI / model providers ─────────────────────────────────────────────────
  openai: {
    displayName: "OpenAI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "OPENAI_API_KEY",
    setupUrl:    "https://platform.openai.com/api-keys",
  },
  anthropic: {
    displayName: "Anthropic",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ANTHROPIC_API_KEY",
    setupUrl:    "https://console.anthropic.com/settings/keys",
  },
  cohere: {
    displayName: "Cohere",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "COHERE_API_KEY",
    setupUrl:    "https://dashboard.cohere.com/api-keys",
  },
  mistral: {
    displayName: "Mistral",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "MISTRAL_API_KEY",
    setupUrl:    "https://console.mistral.ai/api-keys/",
  },
  groq: {
    displayName: "Groq",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "GROQ_API_KEY",
    setupUrl:    "https://console.groq.com/keys",
  },
  perplexity: {
    displayName: "Perplexity",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "PERPLEXITY_API_KEY",
    setupUrl:    "https://www.perplexity.ai/settings/api",
  },
  openrouter: {
    displayName: "OpenRouter",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "OPENROUTER_API_KEY",
    setupUrl:    "https://openrouter.ai/keys",
  },
  togetherai: {
    displayName: "Together AI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "TOGETHERAI_API_KEY",
    setupUrl:    "https://api.together.ai/settings/api-keys",
  },
  replicate: {
    displayName: "Replicate",
    credential:  "API token",
    arg:         "api_token",
    envVar:      "REPLICATE_API_TOKEN",
    setupUrl:    "https://replicate.com/account/api-tokens",
  },
  elevenlabs: {
    displayName: "ElevenLabs",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ELEVENLABS_API_KEY",
    setupUrl:    "https://elevenlabs.io/app/settings/api-keys",
  },
  stability: {
    displayName: "Stability AI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "STABILITY_API_KEY",
    setupUrl:    "https://platform.stability.ai/account/keys",
  },
  pinecone: {
    displayName: "Pinecone",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "PINECONE_API_KEY",
    setupUrl:    "https://app.pinecone.io/",
  },
  assemblyai: {
    displayName: "AssemblyAI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ASSEMBLYAI_API_KEY",
    setupUrl:    "https://www.assemblyai.com/app/account",
  },
  heygen: {
    displayName: "HeyGen",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "HEYGEN_API_KEY",
    setupUrl:    "https://app.heygen.com/settings/api",
  },
  higgsfield: {
    displayName: "Higgsfield",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "HIGGSFIELD_API_KEY",
    setupUrl:    "https://higgsfield.ai/",
  },
  kling: {
    displayName: "Kling",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "KLING_API_KEY",
    setupUrl:    "https://klingai.com/",
  },
  pika: {
    displayName: "Pika",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "PIKA_API_KEY",
    setupUrl:    "https://pika.art/",
  },
  runway: {
    displayName: "Runway",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "RUNWAY_API_KEY",
    setupUrl:    "https://dev.runwayml.com/",
  },

  // ─── Productivity / project management ────────────────────────────────────
  notion: {
    displayName: "Notion",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "NOTION_API_KEY",
    setupUrl:    "https://www.notion.so/my-integrations",
    note:        "Use an Internal Integration Secret and share the pages with it.",
  },
  airtable: {
    displayName: "Airtable",
    credential:  "personal access token",
    arg:         "access_token",
    envVar:      "AIRTABLE_API_KEY",
    setupUrl:    "https://airtable.com/create/tokens",
  },
  asana: {
    displayName: "Asana",
    credential:  "personal access token",
    arg:         "api_key",
    envVar:      "ASANA_API_KEY",
    setupUrl:    "https://app.asana.com/0/my-apps",
  },
  clickup: {
    displayName: "ClickUp",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CLICKUP_API_KEY",
    setupUrl:    "https://app.clickup.com/settings/apps",
  },
  monday: {
    displayName: "monday.com",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "MONDAY_API_KEY",
    setupUrl:    "https://monday.com/developers/v2",
  },
  linear: {
    displayName: "Linear",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "LINEAR_API_KEY",
    setupUrl:    "https://linear.app/settings/api",
  },
  trello: {
    displayName: "Trello",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "TRELLO_API_KEY",
    setupUrl:    "https://trello.com/power-ups/admin",
    note:        "Also pass token (the per-user authorization token).",
  },
  clockify: {
    displayName: "Clockify",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CLOCKIFY_API_KEY",
    setupUrl:    "https://app.clockify.me/user/settings",
  },
  toggl: {
    displayName: "Toggl Track",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "TOGGL_API_KEY",
    setupUrl:    "https://track.toggl.com/profile",
  },
  calendly: {
    displayName: "Calendly",
    credential:  "personal access token",
    arg:         "api_key",
    envVar:      "CALENDLY_API_KEY",
    setupUrl:    "https://calendly.com/integrations/api_webhooks",
  },
  raindrop: {
    displayName: "Raindrop.io",
    credential:  "test token",
    arg:         "token",
    envVar:      "RAINDROP_TOKEN",
    setupUrl:    "https://app.raindrop.io/settings/integrations",
  },
  readwise: {
    displayName: "Readwise",
    credential:  "access token",
    arg:         "token",
    envVar:      "READWISE_TOKEN",
    setupUrl:    "https://readwise.io/access_token",
  },
  instapaper: {
    displayName: "Instapaper",
    credential:  "consumer key",
    arg:         "consumer_key",
    envVar:      "INSTAPAPER_CONSUMER_KEY",
    setupUrl:    "https://www.instapaper.com/main/request_oauth_consumer_token",
    note:        "Also pass consumer_secret, username, and password (xAuth).",
  },
  feedly: {
    displayName: "Feedly",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "FEEDLY_ACCESS_TOKEN",
    setupUrl:    "https://developer.feedly.com/",
  },
  monica: {
    displayName: "Monica",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "MONICA_API_KEY",
    setupUrl:    "https://app.monicahq.com/settings/api",
  },
  postman: {
    displayName: "Postman",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "POSTMAN_API_KEY",
    setupUrl:    "https://go.postman.co/settings/me/api-keys",
  },

  // ─── Messaging / email / comms ────────────────────────────────────────────
  slack: {
    displayName: "Slack",
    credential:  "bot token",
    arg:         "bot_token",
    envVar:      "SLACK_BOT_TOKEN",
    setupUrl:    "https://api.slack.com/apps",
    note:        "The bot token starts with xoxb-.",
  },
  discord: {
    displayName: "Discord",
    credential:  "bot token",
    arg:         "bot_token",
    envVar:      "DISCORD_BOT_TOKEN",
    setupUrl:    "https://discord.com/developers/applications",
  },
  telegram: {
    displayName: "Telegram",
    credential:  "bot token",
    arg:         "bot_token",
    envVar:      "TELEGRAM_BOT_TOKEN",
    setupUrl:    "https://core.telegram.org/bots#botfather",
    note:        "Create the bot and get its token from @BotFather.",
  },
  line: {
    displayName: "LINE",
    credential:  "channel access token",
    arg:         "channel_access_token",
    envVar:      "LINE_CHANNEL_ACCESS_TOKEN",
    setupUrl:    "https://developers.line.biz/console/",
  },
  whatsapp: {
    displayName: "WhatsApp",
    credential:  "bearer token",
    arg:         "bearer_token",
    envVar:      "WHATSAPP_TOKEN",
    setupUrl:    "https://developers.facebook.com/apps",
  },
  twilio: {
    displayName: "Twilio",
    credential:  "account SID",
    arg:         "account_sid",
    envVar:      "TWILIO_ACCOUNT_SID",
    setupUrl:    "https://console.twilio.com/",
    note:        "Also pass auth_token (or set TWILIO_AUTH_TOKEN).",
  },
  sendgrid: {
    displayName: "SendGrid",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "SENDGRID_API_KEY",
    setupUrl:    "https://app.sendgrid.com/settings/api_keys",
  },
  mailchimp: {
    displayName: "Mailchimp",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "MAILCHIMP_API_KEY",
    setupUrl:    "https://admin.mailchimp.com/account/api/",
  },
  postmark: {
    displayName: "Postmark",
    credential:  "server API token",
    arg:         "api_key",
    envVar:      "POSTMARK_API_KEY",
    setupUrl:    "https://account.postmarkapp.com/servers",
  },
  resend: {
    displayName: "Resend",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "RESEND_API_KEY",
    setupUrl:    "https://resend.com/api-keys",
  },
  convertkit: {
    displayName: "Kit (ConvertKit)",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CONVERTKIT_API_KEY",
    setupUrl:    "https://app.convertkit.com/account_settings/advanced_settings",
  },
  pushover: {
    displayName: "Pushover",
    credential:  "application token",
    arg:         "app_token",
    envVar:      "PUSHOVER_APP_TOKEN",
    setupUrl:    "https://pushover.net/apps/build",
    note:        "Also pass user (your Pushover user key).",
  },

  // ─── Social / content ─────────────────────────────────────────────────────
  reddit: {
    displayName: "Reddit",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "REDDIT_ACCESS_TOKEN",
    setupUrl:    "https://www.reddit.com/prefs/apps",
  },
  mastodon: {
    displayName: "Mastodon",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "MASTODON_ACCESS_TOKEN",
    setupUrl:    "https://docs.joinmastodon.org/client/token/",
    note:        "Create the token under Preferences > Development on your instance.",
  },
  pinterest: {
    displayName: "Pinterest",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "PINTEREST_ACCESS_TOKEN",
    setupUrl:    "https://developers.pinterest.com/apps/",
  },
  tiktok: {
    displayName: "TikTok",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "TIKTOK_ACCESS_TOKEN",
    setupUrl:    "https://developers.tiktok.com/",
  },
  youtube: {
    displayName: "YouTube",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "YOUTUBE_API_KEY",
    setupUrl:    "https://console.cloud.google.com/apis/credentials",
  },
  spotify: {
    displayName: "Spotify",
    credential:  "access token",
    arg:         "bearer_token",
    envVar:      "SPOTIFY_ACCESS_TOKEN",
    setupUrl:    "https://developer.spotify.com/dashboard",
  },
  genius: {
    displayName: "Genius",
    credential:  "access token",
    envVar:      "GENIUS_ACCESS_TOKEN",
    setupUrl:    "https://genius.com/api-clients",
  },
  lastfm: {
    displayName: "Last.fm",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "LASTFM_API_KEY",
    setupUrl:    "https://www.last.fm/api/account/create",
  },
  discogs: {
    displayName: "Discogs",
    credential:  "personal access token",
    arg:         "token",
    envVar:      "DISCOGS_TOKEN",
    setupUrl:    "https://www.discogs.com/settings/developers",
  },
  untappd: {
    displayName: "Untappd",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "UNTAPPD_CLIENT_ID",
    setupUrl:    "https://untappd.com/api/",
    note:        "Also pass client_secret (or set UNTAPPD_CLIENT_SECRET).",
  },

  // ─── Developer / infra / observability ────────────────────────────────────
  github: {
    displayName: "GitHub",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "GITHUB_TOKEN",
    setupUrl:    "https://github.com/settings/tokens",
  },
  gitlab: {
    displayName: "GitLab",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "GITLAB_TOKEN",
    setupUrl:    "https://gitlab.com/-/user_settings/personal_access_tokens",
  },
  vercel: {
    displayName: "Vercel",
    credential:  "access token",
    arg:         "api_key",
    envVar:      "VERCEL_TOKEN",
    setupUrl:    "https://vercel.com/account/tokens",
  },
  render: {
    displayName: "Render",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "RENDER_API_KEY",
    setupUrl:    "https://dashboard.render.com/u/settings/api-keys",
  },
  flyio: {
    displayName: "Fly.io",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "FLY_API_KEY",
    setupUrl:    "https://fly.io/user/personal_access_tokens",
  },
  neon: {
    displayName: "Neon",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "NEON_API_KEY",
    setupUrl:    "https://console.neon.tech/app/settings/api-keys",
  },
  turso: {
    displayName: "Turso",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "TURSO_API_KEY",
    setupUrl:    "https://app.turso.tech/",
  },
  circleci: {
    displayName: "CircleCI",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "CIRCLECI_TOKEN",
    setupUrl:    "https://app.circleci.com/settings/user/tokens",
  },
  datadog: {
    displayName: "Datadog",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "DATADOG_API_KEY",
    setupUrl:    "https://app.datadoghq.com/organization-settings/api-keys",
    note:        "Some endpoints also need an application key (app_key).",
  },
  sentry: {
    displayName: "Sentry",
    credential:  "auth token",
    arg:         "auth_token",
    envVar:      "SENTRY_AUTH_TOKEN",
    setupUrl:    "https://sentry.io/settings/account/api/auth-tokens/",
  },
  pagerduty: {
    displayName: "PagerDuty",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "PAGERDUTY_API_KEY",
    setupUrl:    "https://support.pagerduty.com/docs/api-access-keys",
  },
  segment: {
    displayName: "Segment",
    credential:  "write key",
    arg:         "write_key",
    envVar:      "SEGMENT_WRITE_KEY",
    setupUrl:    "https://app.segment.com/",
    note:        "Management API calls use api_token instead of write_key.",
  },
  mixpanel: {
    displayName: "Mixpanel",
    credential:  "service account username",
    arg:         "service_account_username",
    envVar:      "MIXPANEL_SERVICE_ACCOUNT_USERNAME",
    setupUrl:    "https://mixpanel.com/settings/project",
    note:        "Also pass service_account_secret.",
  },

  // ─── Maps / geo / places ──────────────────────────────────────────────────
  foursquare: {
    displayName: "Foursquare",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "FOURSQUARE_API_KEY",
    setupUrl:    "https://foursquare.com/developers/home",
  },
  mapbox: {
    displayName: "Mapbox",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "MAPBOX_ACCESS_TOKEN",
    setupUrl:    "https://account.mapbox.com/access-tokens/",
  },
  yelp: {
    displayName: "Yelp",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "YELP_API_KEY",
    setupUrl:    "https://www.yelp.com/developers/v3/manage_app",
  },

  // ─── Media / entertainment / data ─────────────────────────────────────────
  tmdb: {
    displayName: "TMDB",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "TMDB_API_KEY",
    setupUrl:    "https://www.themoviedb.org/settings/api",
  },
  omdb: {
    displayName: "OMDb",
    credential:  "API key",
    envVar:      "OMDB_API_KEY",
    setupUrl:    "https://www.omdbapi.com/apikey.aspx",
  },
  rawg: {
    displayName: "RAWG",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "RAWG_API_KEY",
    setupUrl:    "https://rawg.io/apidocs",
  },
  igdb: {
    displayName: "IGDB",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "IGDB_CLIENT_ID",
    setupUrl:    "https://api-docs.igdb.com/#account-creation",
    note:        "Also pass client_secret (Twitch developer credentials).",
  },
  ticketmaster: {
    displayName: "Ticketmaster",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "TICKETMASTER_API_KEY",
    setupUrl:    "https://developer.ticketmaster.com/",
  },
  seatgeek: {
    displayName: "SeatGeek",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "SEATGEEK_CLIENT_ID",
    setupUrl:    "https://seatgeek.com/account/develop",
  },
  eventbrite: {
    displayName: "Eventbrite",
    credential:  "private token",
    arg:         "token",
    envVar:      "EVENTBRITE_TOKEN",
    setupUrl:    "https://www.eventbrite.com/platform/api-keys",
  },
  newsapi: {
    displayName: "NewsAPI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "NEWS_API_KEY",
    setupUrl:    "https://newsapi.org/account",
  },
  guardian: {
    displayName: "The Guardian",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "GUARDIAN_API_KEY",
    setupUrl:    "https://open-platform.theguardian.com/access/",
  },
  podcastindex: {
    displayName: "Podcast Index",
    credential:  "API key",
    envVar:      "PODCASTINDEX_API_KEY",
    setupUrl:    "https://api.podcastindex.org/",
    note:        "Also set PODCASTINDEX_API_SECRET.",
  },
  nasa: {
    displayName: "NASA",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "NASA_API_KEY",
    setupUrl:    "https://api.nasa.gov/",
    note:        "Defaults to the shared DEMO_KEY if none is provided.",
  },
  coinmarketcap: {
    displayName: "CoinMarketCap",
    credential:  "API key",
    envVar:      "COINMARKETCAP_API_KEY",
    setupUrl:    "https://pro.coinmarketcap.com/account",
  },
  exchangerate: {
    displayName: "ExchangeRate-API",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "EXCHANGERATE_API_KEY",
    setupUrl:    "https://app.exchangerate-api.com/dashboard",
  },
  deepl: {
    displayName: "DeepL",
    credential:  "auth key",
    arg:         "auth_key",
    envVar:      "DEEPL_AUTH_KEY",
    setupUrl:    "https://www.deepl.com/your-account/keys",
  },

  // ─── Gaming ───────────────────────────────────────────────────────────────
  riot: {
    displayName: "Riot Games",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "RIOT_API_KEY",
    setupUrl:    "https://developer.riotgames.com/",
  },
  bungie: {
    displayName: "Bungie",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "BUNGIE_API_KEY",
    setupUrl:    "https://www.bungie.net/en/Application",
  },
  twitch: {
    displayName: "Twitch",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "TWITCH_CLIENT_ID",
    setupUrl:    "https://dev.twitch.tv/console/apps",
    note:        "Also pass client_secret (or set TWITCH_CLIENT_SECRET).",
  },

  // ─── Security / threat intel ──────────────────────────────────────────────
  shodan: {
    displayName: "Shodan",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "SHODAN_API_KEY",
    setupUrl:    "https://account.shodan.io/",
  },
  virustotal: {
    displayName: "VirusTotal",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "VIRUSTOTAL_API_KEY",
    setupUrl:    "https://www.virustotal.com/gui/my-apikey",
  },
  urlscan: {
    displayName: "urlscan.io",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "URLSCAN_API_KEY",
    setupUrl:    "https://urlscan.io/user/profile/",
  },
  abuseipdb: {
    displayName: "AbuseIPDB",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ABUSEIPDB_API_KEY",
    setupUrl:    "https://www.abuseipdb.com/account/api",
  },
  hunter: {
    displayName: "Hunter",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "HUNTER_API_KEY",
    setupUrl:    "https://hunter.io/api-keys",
  },
  haveibeenpwned: {
    displayName: "Have I Been Pwned",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "HIBP_API_KEY",
    setupUrl:    "https://haveibeenpwned.com/API/Key",
  },

  // ─── Splitwise / misc accounts ────────────────────────────────────────────
  splitwise: {
    displayName: "Splitwise",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "SPLITWISE_API_KEY",
    setupUrl:    "https://secure.splitwise.com/apps",
  },
  ebird: {
    displayName: "eBird",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "EBIRD_API_KEY",
    setupUrl:    "https://ebird.org/api/keygen",
  },
  figma: {
    displayName: "Figma",
    credential:  "personal access token",
    arg:         "personal_access_token",
    envVar:      "FIGMA_ACCESS_TOKEN",
    setupUrl:    "https://www.figma.com/developers/api#access-tokens",
  },
  trove: {
    displayName: "Trove",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "TROVE_API_KEY",
    setupUrl:    "https://trove.nla.gov.au/about/create-something/using-api",
  },
  domain: {
    displayName: "Domain",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "DOMAIN_API_KEY",
    setupUrl:    "https://developer.domain.com.au/",
  },
  amber: {
    displayName: "Amber Electric",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "AMBER_API_KEY",
    setupUrl:    "https://app.amber.com.au/developers",
  },
  sendle: {
    displayName: "Sendle",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "SENDLE_API_KEY",
    setupUrl:    "https://www.sendle.com/",
    note:        "Also pass sendle_id (or set SENDLE_ID).",
  },
  ebay: {
    displayName: "eBay",
    credential:  "client id",
    arg:         "client_id",
    envVar:      "EBAY_CLIENT_ID",
    setupUrl:    "https://developer.ebay.com/my/keys",
    note:        "Also pass client_secret (or set EBAY_CLIENT_SECRET).",
  },
  algolia: {
    displayName: "Algolia",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ALGOLIA_API_KEY",
    setupUrl:    "https://dashboard.algolia.com/account/api-keys/all",
    note:        "Also pass app_id (the Algolia application id).",
  },
  bandsintown: {
    displayName: "Bandsintown",
    credential:  "app id",
    arg:         "app_id",
    envVar:      "BANDSINTOWN_APP_ID",
    setupUrl:    "https://www.artists.bandsintown.com/support/api-installation",
  },

  // ─── Finance / data feeds ─────────────────────────────────────────────────
  alphavantage: {
    displayName: "Alpha Vantage",
    credential:  "API key",
    envVar:      "ALPHAVANTAGE_API_KEY",
    setupUrl:    "https://www.alphavantage.co/support/#api-key",
  },
  coingecko: {
    displayName: "CoinGecko",
    credential:  "API key",
    envVar:      "COINGECKO_API_KEY",
    setupUrl:    "https://www.coingecko.com/en/developers/dashboard",
    note:        "Public endpoints work without a key; a key raises rate limits.",
  },
  openexchangerates: {
    displayName: "Open Exchange Rates",
    credential:  "app id",
    envVar:      "OPENEXCHANGERATES_APP_ID",
    setupUrl:    "https://openexchangerates.org/account/app-ids",
  },

  // ─── Weather ──────────────────────────────────────────────────────────────
  tomorrowio: {
    displayName: "Tomorrow.io",
    credential:  "API key",
    envVar:      "TOMORROWIO_API_KEY",
    setupUrl:    "https://app.tomorrow.io/development/keys",
  },
  willyweather: {
    displayName: "WillyWeather",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "WILLYWEATHER_KEY",
    setupUrl:    "https://www.willyweather.com.au/info/api.html",
  },

  // ─── Shopping / commerce data ─────────────────────────────────────────────
  amazon: {
    displayName: "Amazon Product Advertising",
    credential:  "access key",
    arg:         "access_key",
    envVar:      "AMAZON_ACCESS_KEY",
    setupUrl:    "https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html",
    note:        "Also pass secret_key (or set AMAZON_SECRET_KEY).",
  },

  // ─── Environment / science / civic ────────────────────────────────────────
  carboninterface: {
    displayName: "Carbon Interface",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CARBONINTERFACE_API_KEY",
    setupUrl:    "https://www.carboninterface.com/account/api_tokens",
  },
  openaq: {
    displayName: "OpenAQ",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "OPENAQ_API_KEY",
    setupUrl:    "https://explore.openaq.org/account",
  },
  steam: {
    displayName: "Steam",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "STEAM_API_KEY",
    setupUrl:    "https://steamcommunity.com/dev/apikey",
  },
  setlistfm: {
    displayName: "setlist.fm",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "SETLISTFM_API_KEY",
    setupUrl:    "https://www.setlist.fm/settings/api",
  },
  esports: {
    displayName: "PandaScore",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "PANDASCORE_TOKEN",
    setupUrl:    "https://app.pandascore.co/dashboard/main",
  },
  nvd: {
    displayName: "NVD (NIST)",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "NVD_API_KEY",
    setupUrl:    "https://nvd.nist.gov/developers/request-an-api-key",
    note:        "Optional; a key raises the NVD rate limit.",
  },
  upstash: {
    displayName: "Upstash",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "UPSTASH_API_KEY",
    setupUrl:    "https://console.upstash.com/account/api",
  },

  // ─── Australian / local ───────────────────────────────────────────────────
  australiapost: {
    displayName: "Australia Post",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "AUSPOST_API_KEY",
    setupUrl:    "https://developers.auspost.com.au/",
  },
  ipaustralia: {
    displayName: "IP Australia",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "IPAUSTRALIA_API_KEY",
    setupUrl:    "https://www.ipaustralia.gov.au/tools-and-research/professional-resources/data-and-apis",
  },

  // ─── LEGO / bricks (Rebrickable + Brickset share one tool) ────────────────
  lego: {
    displayName: "LEGO (Rebrickable)",
    credential:  "API key",
    arg:         "rebrickable_api_key",
    envVar:      "REBRICKABLE_API_KEY",
    setupUrl:    "https://rebrickable.com/api/",
  },
  brickset: {
    displayName: "Brickset",
    credential:  "API key",
    arg:         "brickset_api_key",
    envVar:      "BRICKSET_API_KEY",
    setupUrl:    "https://brickset.com/tools/webservices/requestkey",
  },

  // ─── Supercell games (one tool, three game APIs) ──────────────────────────
  coc: {
    displayName: "Clash of Clans",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "COC_API_KEY",
    setupUrl:    "https://developer.clashofclans.com/",
  },
  cr: {
    displayName: "Clash Royale",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CR_API_KEY",
    setupUrl:    "https://developer.clashroyale.com/",
  },
  bs: {
    displayName: "Brawl Stars",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "BS_API_KEY",
    setupUrl:    "https://developer.brawlstars.com/",
  },
  hubspot: {
    displayName: "HubSpot",
    credential:  "Private App access token",
    arg:         "access_token",
    envVar:      "HUBSPOT_ACCESS_TOKEN",
    setupUrl:    "https://app.hubspot.com/settings/integrations/private-apps",
    note:        "Create a Private App and copy its access token; grant the crm.objects.* scopes you need.",
  },
  jira: {
    displayName: "Jira",
    credential:  "API token",
    arg:         "api_token",
    envVar:      "JIRA_API_TOKEN",
    setupUrl:    "https://id.atlassian.com/manage-profile/security/api-tokens",
    note:        "Also pass site (e.g. mycompany) and email, or set JIRA_SITE and JIRA_EMAIL. Auth is your email + the API token.",
  },
  posthog: {
    displayName: "PostHog",
    credential:  "Personal API key",
    arg:         "api_key",
    envVar:      "POSTHOG_API_KEY",
    setupUrl:    "https://app.posthog.com/settings/user-api-keys",
    note:        "Also pass project_id (or set POSTHOG_PROJECT_ID). Default host is US Cloud; pass host for EU or self-hosted.",
  },
  netlify: {
    displayName: "Netlify",
    credential:  "personal access token",
    arg:         "access_token",
    envVar:      "NETLIFY_ACCESS_TOKEN",
    setupUrl:    "https://app.netlify.com/user/applications#personal-access-tokens",
  },
  zendesk: {
    displayName: "Zendesk",
    credential:  "API token",
    arg:         "api_token",
    envVar:      "ZENDESK_API_TOKEN",
    setupUrl:    "https://support.zendesk.com/hc/en-us/articles/4408889192858",
    note:        "Also pass subdomain and email, or set ZENDESK_SUBDOMAIN and ZENDESK_EMAIL. Auth is email/token + the API token.",
  },
  intercom: {
    displayName: "Intercom",
    credential:  "access token",
    arg:         "access_token",
    envVar:      "INTERCOM_ACCESS_TOKEN",
    setupUrl:    "https://developers.intercom.com/building-apps/docs/authentication-types",
  },
  typeform: {
    displayName: "Typeform",
    credential:  "personal access token",
    arg:         "access_token",
    envVar:      "TYPEFORM_ACCESS_TOKEN",
    setupUrl:    "https://admin.typeform.com/account#/section/tokens",
  },
  calcom: {
    displayName: "Cal.com",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "CALCOM_API_KEY",
    setupUrl:    "https://app.cal.com/settings/developer/api-keys",
  },
  contentful: {
    displayName: "Contentful",
    credential:  "Content Delivery API token",
    arg:         "access_token",
    envVar:      "CONTENTFUL_ACCESS_TOKEN",
    setupUrl:    "https://app.contentful.com/",
    note:        "Also pass space_id (or set CONTENTFUL_SPACE_ID). environment defaults to master.",
  },
  webflow: {
    displayName: "Webflow",
    credential:  "API token",
    arg:         "access_token",
    envVar:      "WEBFLOW_ACCESS_TOKEN",
    setupUrl:    "https://developers.webflow.com/data/reference/authentication",
  },
  digitalocean: {
    displayName: "DigitalOcean",
    credential:  "personal access token",
    arg:         "access_token",
    envVar:      "DIGITALOCEAN_ACCESS_TOKEN",
    setupUrl:    "https://cloud.digitalocean.com/account/api/tokens",
  },
  klaviyo: {
    displayName: "Klaviyo",
    credential:  "private API key",
    arg:         "api_key",
    envVar:      "KLAVIYO_API_KEY",
    setupUrl:    "https://www.klaviyo.com/settings/account/api-keys",
    note:        "Use a private API key (starts with pk_).",
  },
};

/**
 * Build the standard not-connected result for a connector from its registry row.
 * Pass `overrides` for the rare per-call tweak (for example a different credential
 * label on one action). Unknown ids still produce a sensible generic message.
 */
export function notConnectedFor(
  connector: string,
  overrides?: Partial<ConnectorSetup>,
): NotConnectedResult {
  const base = CONNECTOR_SETUP[connector] ?? {};
  return notConnected({ connector, ...base, ...overrides });
}

/**
 * Resolve a connector's credential from the request args or its documented env
 * var (in that order), using the registry. Returns the credential string when
 * present, or a ready-to-return not-connected result when it is missing.
 *
 * Covers the common single-credential connector. Multi-credential connectors
 * (OAuth client id + secret, account sid + token) read their own values and call
 * `notConnectedFor(id)` directly.
 */
export function requireCredential(
  connector: string,
  args: Record<string, unknown>,
  overrides?: Partial<ConnectorSetup>,
): string | NotConnectedResult {
  const setup = { ...CONNECTOR_SETUP[connector], ...overrides };
  const fromArg = setup.arg ? String(args[setup.arg] ?? "").trim() : "";
  const fromEnv = setup.envVar ? String(process.env[setup.envVar] ?? "").trim() : "";
  const value = fromArg || fromEnv;
  if (!value) return notConnected({ connector, ...setup });
  return value;
}
