// Generates src/data/app-catalog.generated.json - the single source of truth for
// the UnClick Apps library (public app-store page + admin Apps page). It merges:
//   - docs/tool-index.generated.json  (every app + its tools, the spine)
//   - docs/connector-depth-ladder.json (per-connector quality grade L1-L5)
// into one clean, frontend-importable catalog with simple-English names, a clean
// user-facing category, a one-line description, tool count, and quality.
//
// Run:        node scripts/generate-app-catalog.mjs
// Verify CI:  node scripts/generate-app-catalog.mjs --check
//
// No em dashes in generated copy (house rule).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOOL_INDEX = path.join(ROOT, "docs/tool-index.generated.json");
const LADDER = path.join(ROOT, "docs/connector-depth-ladder.json");
const OUT = path.join(ROOT, "src/data/app-catalog.generated.json");

// ─── Clean, user-facing categories (the filter chips) ──────────────────────────
// One bucket per app. Simple English, no internal jargon. Apps not listed fall
// back to "Other" and are reported so the map can be extended.
const CATEGORY_OF = {};
const bucket = (name, slugs) => slugs.forEach((s) => { CATEGORY_OF[s] = name; });

bucket("AI", ["anthropic", "openai", "cohere", "mistral", "groq", "perplexity", "togetherai", "replicate", "stability", "elevenlabs", "heygen", "higgsfield", "kling", "pika", "runway", "assemblyai", "deepl", "csuite"]);
bucket("Developer & infra", ["github", "gitlab", "vercel", "netlify", "render", "flyio", "digitalocean", "circleci", "datadog", "sentry", "pagerduty", "neon", "turso", "upstash", "pinecone", "postman", "segment", "mixpanel", "posthog", "algolia", "keychain", "vault"]);
bucket("Money & payments", ["stripe", "paypal", "square", "plaid", "wise", "xero", "quickbooks", "lemonsqueezy", "splitwise", "gumroad"]);
bucket("Markets & crypto", ["alphavantage", "coingecko", "coinmarketcap", "exchangerate", "openexchangerates"]);
bucket("Messaging & email", ["slack", "discord", "telegram", "whatsapp", "line", "twilio", "email", "resend", "sendgrid", "postmark", "mailchimp", "convertkit", "klaviyo", "pushover", "intercom", "zendesk"]);
bucket("Social", ["reddit", "bluesky", "mastodon", "pinterest", "tiktok", "youtube", "twitch", "hackernews"]);
bucket("News & reading", ["newsapi", "guardian", "gdelt", "feedly", "instapaper", "readwise", "raindrop", "trove"]);
bucket("Productivity", ["notion", "asana", "trello", "clickup", "monday", "linear", "jira", "hubspot", "clockify", "toggl", "calendly", "calcom", "airtable", "monica", "figma", "crews", "typeform", "jobsmith"]);
bucket("Shopping", ["amazon", "ebay", "etsy", "shopify", "woocommerce"]);
bucket("Music & video", ["spotify", "deezer", "lastfm", "genius", "musicbrainz", "discogs", "setlistfm", "podcastindex", "radiobrowser", "tmdb", "omdb"]);
bucket("Games & esports", ["steam", "rawg", "igdb", "bgg", "riot", "bungie", "chessdotcom", "lichess", "speedrun", "pandascore", "supercell", "lego", "sleeper", "fpl", "espn", "openf1"]);
bucket("Travel, maps & local", ["mapbox", "foursquare", "yelp", "ptv", "australiapost", "sendle", "domain", "toilets", "ipapi", "restcountries", "abn", "ipaustralia", "amber", "thelott", "tab"]);
bucket("Weather & science", ["openmeteo", "tomorrowio", "willyweather", "openaq", "nasa", "usgs", "ebird", "carboninterface", "openfoodfacts", "meal", "untappd"]);
bucket("Security", ["abuseipdb", "haveibeenpwned", "shodan", "urlscan", "virustotal", "nvd", "hunter"]);
bucket("Events & tickets", ["ticketmaster", "seatgeek", "eventbrite", "bandsintown"]);
bucket("Content & CMS", ["contentful", "webflow"]);
bucket("Books", ["openlibrary"]);
bucket("Utilities", ["calculator", "color", "datetime", "numbers", "random", "text", "trivia", "unit-converter"]);
bucket("Quality (XPass)", ["testpass", "copypass", "uxpass", "seopass", "sloppass", "legalpass", "compliancepass", "flowpass", "commonsensepass", "fidelitycopy", "igniteonly", "nudgeonly", "pushonly", "qc"]);

// ─── Display-name casing fixes (fallback is Title Case of the slug) ────────────
const NAME_OF = {
  jobsmith: "JobSmith",
  github: "GitHub", gitlab: "GitLab", youtube: "YouTube", tiktok: "TikTok", paypal: "PayPal",
  lastfm: "Last.fm", espn: "ESPN", ebay: "eBay", ebird: "eBird", bluesky: "Bluesky",
  willyweather: "WillyWeather", riot: "Riot Games",
  abn: "ABN", abuseipdb: "AbuseIPDB", alphavantage: "Alpha Vantage", australiapost: "Australia Post",
  bgg: "BoardGameGeek", calcom: "Cal.com", carboninterface: "Carbon Interface", chessdotcom: "Chess.com",
  coingecko: "CoinGecko", coinmarketcap: "CoinMarketCap", commonsensepass: "CommonSensePass",
  compliancepass: "CompliancePass", copypass: "CopyPass", csuite: "C-Suite", digitalocean: "DigitalOcean",
  fidelitycopy: "FidelityCopy", flowpass: "FlowPass", flyio: "Fly.io", fpl: "Fantasy Premier League",
  gdelt: "GDELT", hackernews: "Hacker News", haveibeenpwned: "Have I Been Pwned", hubspot: "HubSpot",
  igdb: "IGDB", igniteonly: "IgniteOnly", ipapi: "IP API", ipaustralia: "IP Australia",
  lemonsqueezy: "Lemon Squeezy", legalpass: "LegalPass", musicbrainz: "MusicBrainz", nasa: "NASA",
  newsapi: "NewsAPI", nudgeonly: "NudgeOnly", nvd: "NVD (CVEs)", omdb: "OMDb", openai: "OpenAI",
  openaq: "OpenAQ", openexchangerates: "Open Exchange Rates", openf1: "OpenF1",
  openfoodfacts: "Open Food Facts", openlibrary: "Open Library", openmeteo: "Open-Meteo",
  pandascore: "PandaScore", podcastindex: "Podcast Index", posthog: "PostHog", ptv: "PTV",
  pushonly: "PushOnly", qc: "QC", radiobrowser: "Radio Browser", restcountries: "REST Countries",
  seopass: "SEOPass", setlistfm: "Setlist.fm", sloppass: "SlopPass", testpass: "TestPass",
  thelott: "The Lott", tmdb: "TMDB", togetherai: "Together AI", tomorrowio: "Tomorrow.io",
  "unit-converter": "Unit Converter", urlscan: "urlscan.io", usgs: "USGS", uxpass: "UXPass",
  virustotal: "VirusTotal", woocommerce: "WooCommerce",
};

// ─── Better one-line blurbs for popular apps (fallback is the app's first tool) ─
const BLURB_OF = {
  github: "Manage repos, issues, pull requests, and Actions.",
  hubspot: "Read and update CRM contacts, companies, and deals.",
  jira: "Search, read, and create issues across your projects.",
  stripe: "Look up customers, charges, invoices, and subscriptions.",
  notion: "Read and write pages and databases in your workspace.",
  slack: "Send and read messages across your channels.",
  ptv: "Live Melbourne train, tram, and bus departures and disruptions.",
  posthog: "Read product analytics, insights, and feature flags.",
  netlify: "List sites and deploys, and catch failed builds.",
  zendesk: "Search, read, and reply to support tickets.",
  openai: "Chat, embeddings, images, and transcription from OpenAI.",
  anthropic: "Chat completions from Claude models.",
  jobsmith: "Check a CV or cover letter against JobSmith's quality rules.",
};

// Brand domains for the favicon icon. Known brands show a real favicon (framed
// consistently); unknown apps fall back to the tinted letter chip at render time.
const DOMAIN_OF = {
  github: "github.com", gitlab: "gitlab.com", vercel: "vercel.com", netlify: "netlify.com",
  render: "render.com", flyio: "fly.io", digitalocean: "digitalocean.com", circleci: "circleci.com",
  datadog: "datadoghq.com", sentry: "sentry.io", pagerduty: "pagerduty.com", neon: "neon.tech",
  turso: "turso.tech", upstash: "upstash.com", pinecone: "pinecone.io", postman: "postman.com",
  segment: "segment.com", mixpanel: "mixpanel.com", posthog: "posthog.com", algolia: "algolia.com",
  stripe: "stripe.com", paypal: "paypal.com", square: "squareup.com", plaid: "plaid.com",
  wise: "wise.com", xero: "xero.com", quickbooks: "quickbooks.intuit.com", lemonsqueezy: "lemonsqueezy.com",
  splitwise: "splitwise.com", gumroad: "gumroad.com", coingecko: "coingecko.com", coinmarketcap: "coinmarketcap.com",
  slack: "slack.com", discord: "discord.com", telegram: "telegram.org", whatsapp: "whatsapp.com",
  line: "line.me", twilio: "twilio.com", resend: "resend.com", sendgrid: "sendgrid.com",
  postmark: "postmarkapp.com", mailchimp: "mailchimp.com", convertkit: "convertkit.com", klaviyo: "klaviyo.com",
  pushover: "pushover.net", intercom: "intercom.com", zendesk: "zendesk.com", reddit: "reddit.com",
  bluesky: "bsky.app", mastodon: "joinmastodon.org", pinterest: "pinterest.com", tiktok: "tiktok.com",
  youtube: "youtube.com", twitch: "twitch.tv", hackernews: "ycombinator.com", notion: "notion.so",
  asana: "asana.com", trello: "trello.com", clickup: "clickup.com", monday: "monday.com",
  linear: "linear.app", jira: "atlassian.com", hubspot: "hubspot.com", clockify: "clockify.me",
  toggl: "toggl.com", calendly: "calendly.com", calcom: "cal.com", airtable: "airtable.com",
  figma: "figma.com", typeform: "typeform.com", amazon: "amazon.com", ebay: "ebay.com",
  etsy: "etsy.com", shopify: "shopify.com", woocommerce: "woocommerce.com", spotify: "spotify.com",
  deezer: "deezer.com", lastfm: "last.fm", genius: "genius.com", discogs: "discogs.com",
  tmdb: "themoviedb.org", steam: "steampowered.com", igdb: "igdb.com", riot: "riotgames.com",
  lichess: "lichess.org", lego: "lego.com", mapbox: "mapbox.com", foursquare: "foursquare.com",
  yelp: "yelp.com", ptv: "ptv.vic.gov.au", openai: "openai.com", anthropic: "anthropic.com",
  cohere: "cohere.com", mistral: "mistral.ai", groq: "groq.com", perplexity: "perplexity.ai",
  replicate: "replicate.com", elevenlabs: "elevenlabs.io", heygen: "heygen.com", runway: "runwayml.com",
  deepl: "deepl.com", nasa: "nasa.gov", contentful: "contentful.com", webflow: "webflow.com",
  ticketmaster: "ticketmaster.com", eventbrite: "eventbrite.com", supabase: "supabase.com",
  shodan: "shodan.io", virustotal: "virustotal.com", openmeteo: "open-meteo.com", tomorrowio: "tomorrow.io",
  guardian: "theguardian.com", monica: "monicahq.com", readwise: "readwise.io", raindrop: "raindrop.io",
  instapaper: "instapaper.com", feedly: "feedly.com",
};

function titleCase(slug) {
  return slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function build() {
  const toolIndex = Object.values(JSON.parse(fs.readFileSync(TOOL_INDEX, "utf8")));
  const ladder = JSON.parse(fs.readFileSync(LADDER, "utf8"));
  const levelOf = new Map(ladder.map((r) => [r.connector, { level: r.level, hardened: r.hardened }]));

  const uncategorized = [];
  const apps = toolIndex
    .map((entry) => {
      const slug = entry.app;
      const tools = Array.isArray(entry.tools) ? entry.tools : [];
      const category = CATEGORY_OF[slug] ?? "Other";
      if (category === "Other") uncategorized.push(slug);
      const grade = levelOf.get(slug) ?? null;
      return {
        slug,
        name: NAME_OF[slug] ?? titleCase(slug),
        category,
        blurb: BLURB_OF[slug] ?? (tools[0]?.description ?? `${NAME_OF[slug] ?? titleCase(slug)} tools.`),
        domain: DOMAIN_OF[slug] ?? null,
        toolCount: tools.length,
        tools: tools.map((t) => ({ name: t.name, description: t.description })),
        level: grade?.level ?? null,
        hardened: grade?.hardened ?? false,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const categories = [...new Set(apps.map((a) => a.category))].sort();
  return {
    generatedAt: "static", // kept stable so --check is deterministic
    appCount: apps.length,
    toolCount: apps.reduce((n, a) => n + a.toolCount, 0),
    categories,
    apps,
    _uncategorized: uncategorized,
  };
}

const catalog = build();
const json = JSON.stringify({ ...catalog, _uncategorized: undefined }, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current !== json) {
    console.error("app catalog is stale. Run: node scripts/generate-app-catalog.mjs");
    process.exit(1);
  }
  console.log(`app catalog up to date (${catalog.appCount} apps, ${catalog.toolCount} tools, ${catalog.categories.length} categories).`);
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, json);
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${catalog.appCount} apps, ${catalog.toolCount} tools, ${catalog.categories.length} categories).`);
  if (catalog._uncategorized.length) {
    console.log(`Uncategorized (fall back to "Other"): ${catalog._uncategorized.join(", ")}`);
  }
}
