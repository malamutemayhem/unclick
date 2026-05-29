import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import { useMetaTags } from "../hooks/useMetaTags";
import { presets } from "../lib/design-system";
import {
  Mail,
  TrendingUp,
  Shield,
  Share2,
  Cloud,
  Ticket,
  Music,
  Gamepad2,
  Trophy,
  Newspaper,
  ShoppingCart,
  BookOpen,
  UtensilsCrossed,
  MapPin,
  Headphones,
  Rocket,
  Terminal,
  Flag,
  Wrench,
  ArrowRight,
  ChevronRight,
  Home,
} from "lucide-react";

/**
 * Tools (Apple-inspired polish pass 1, 2026-05-28)
 *
 *  - Wrapped in PageShell so hero, halo, eyebrow, headline, lede, CTA
 *    all come from the locked design system.
 *  - animated-grid removed from the hero. Calm.
 *  - One CTA at the top, one at the bottom. Strip the duplicates.
 *  - Sentence case throughout.
 *  - Category data preserved exactly. Featured tables preserved exactly.
 */

const CATEGORIES = [
  { id: "email", name: "Email", icon: Mail, count: 6, desc: "Send, search, read, and manage emails.", tools: ["email_send", "email_search", "email_read_inbox"], featured: true },
  { id: "finance", name: "Finance", icon: TrendingUp, count: 20, desc: "Crypto prices, stock quotes, forex rates, and financial data.", tools: ["crypto_price", "stock_quote", "forex_convert"], featured: true },
  { id: "security", name: "Security", icon: Shield, count: 10, desc: "Threat intel, CVE scanning, breach checks, and IP analysis.", tools: ["virustotal_scan_url", "hibp_check_account", "shodan_search"], featured: true },
  { id: "social-media", name: "Social media", icon: Share2, count: 15, desc: "Post, read, and manage across Reddit, Discord, Telegram, Mastodon, Bluesky.", tools: ["reddit_search", "discord_send", "telegram_send"] },
  { id: "weather", name: "Weather", icon: Cloud, count: 8, desc: "Current conditions, forecasts, surf, and tide data.", tools: ["weather_forecast", "tomorrow_realtime", "willyweather_surf"] },
  { id: "events", name: "Events and tickets", icon: Ticket, count: 12, desc: "Find events on Ticketmaster, SeatGeek, Eventbrite, Bandsintown.", tools: ["tm_search_events", "seatgeek_search_events", "eventbrite_search_events"] },
  { id: "music", name: "Music", icon: Music, count: 15, desc: "Discover music across Deezer, Last.fm, Genius, MusicBrainz, Discogs.", tools: ["deezer_search", "genius_search", "lastfm_chart_top_tracks"] },
  { id: "gaming", name: "Gaming", icon: Gamepad2, count: 15, desc: "Game stats, reviews, and data from RAWG, BGG, Riot, Bungie.", tools: ["rawg_search_games", "bgg_search", "riot_summoner"] },
  { id: "sports", name: "Sports", icon: Trophy, count: 20, desc: "Live scores, F1 data, fantasy football, esports.", tools: ["espn_nfl_scores", "f1_drivers", "fpl_player"] },
  { id: "news", name: "News", icon: Newspaper, count: 8, desc: "Multi-source headlines from NewsAPI, The Guardian, Hacker News.", tools: ["news_top_headlines", "guardian_search_articles", "hn_top_stories"] },
  { id: "shopping", name: "Shopping", icon: ShoppingCart, count: 8, desc: "Amazon search, Shopify store management.", tools: ["amazon_search", "shopify_products"] },
  { id: "books", name: "Books and libraries", icon: BookOpen, count: 6, desc: "Search OpenLibrary, Trove, and discover trending books.", tools: ["openlibrary_search", "trove_search"] },
  { id: "food", name: "Food and drink", icon: UtensilsCrossed, count: 10, desc: "Recipe search, nutrition data, beer ratings.", tools: ["meal_search", "food_search", "untappd_search_beer"] },
  { id: "location", name: "Location and places", icon: MapPin, count: 8, desc: "Find places, read reviews, get recommendations.", tools: ["yelp_search_businesses", "foursquare_search_places"] },
  { id: "podcasts", name: "Podcasts", icon: Headphones, count: 6, desc: "Search, discover, and get episode details.", tools: ["podcast_search", "podcast_trending"] },
  { id: "space", name: "Space", icon: Rocket, count: 4, desc: "NASA APOD, Mars photos, asteroid tracking, Earth imagery.", tools: ["nasa_apod", "nasa_mars_photos"] },
  { id: "dev", name: "Developer and infra", icon: Terminal, count: 8, desc: "GitHub, Vercel, Cloudflare. Manage repos, deployments, and infrastructure.", tools: ["github_list_repos", "vercel_list_projects"] },
  { id: "australia", name: "Australian services", icon: Flag, count: 10, desc: "Amber Electric, AusPost, PTV, Domain, The Lott, Sendle.", tools: ["amber_current_price", "auspost_track_parcel", "ptv_departures"], featured: true },
  { id: "smarthome", name: "Smart home", icon: Home, count: 87, desc: "Home Assistant control. Lights, locks, thermostats, cameras, automations, and 2,000+ device integrations.", tools: ["control_device", "get_entity_state", "trigger_automation"], featured: true },
  { id: "utilities", name: "Utilities", icon: Wrench, count: 15, desc: "Text processing, unit conversion, calculations, random generation, datetime.", tools: ["text_analyse", "convert_weight", "calc_mortgage"] },
];

const EMAIL_TOOLS = [
  { name: "email_send", desc: "Send emails via Gmail or IMAP." },
  { name: "email_search", desc: "Search emails in inbox." },
  { name: "email_read_inbox", desc: "Read emails from inbox." },
  { name: "email_get", desc: "Get specific email by UID." },
  { name: "email_mark_read", desc: "Mark email as read." },
  { name: "email_delete", desc: "Delete email by UID." },
];

const FINANCE_TOOLS = [
  { name: "crypto_price", desc: "Get cryptocurrency prices from CoinGecko." },
  { name: "stock_quote", desc: "Get real-time stock quotes from Alpha Vantage." },
  { name: "forex_convert", desc: "Convert currencies using Open Exchange Rates." },
  { name: "crypto_coin", desc: "Get detailed crypto info from CoinGecko." },
  { name: "stock_daily", desc: "Get daily stock price history." },
  { name: "crypto_trending", desc: "Get trending cryptocurrencies." },
];

const SECURITY_TOOLS = [
  { name: "virustotal_scan_url", desc: "Submit URL for scanning on VirusTotal." },
  { name: "hibp_check_account", desc: "Check if email account is in a data breach." },
  { name: "shodan_search", desc: "Search Shodan for internet-connected devices." },
  { name: "virustotal_scan_domain", desc: "Get VirusTotal report for a domain." },
  { name: "hibp_check_password", desc: "Check if a password is in a data breach." },
  { name: "shodan_host_info", desc: "Get Shodan information for an IP address." },
];

const AUSTRALIA_TOOLS = [
  { name: "amber_current_price", desc: "Get current electricity price." },
  { name: "auspost_track_parcel", desc: "Track Australia Post parcel." },
  { name: "ptv_departures", desc: "Get PTV departures for a stop." },
  { name: "domain_search_listings", desc: "Search Australian property listings." },
  { name: "lott_results", desc: "Get Australian lottery results." },
  { name: "sendle_get_quote", desc: "Get shipping quote from Sendle." },
];

function ToolsTable({ tools }: { tools: { name: string; desc: string }[] }) {
  return (
    <div className="mt-8 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="py-3 px-4 text-left font-semibold text-heading">Tool name</th>
            <th className="py-3 px-4 text-left font-medium text-body">Description</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, i) => (
            <tr key={tool.name} className={i % 2 === 0 ? "bg-card/40" : ""}>
              <td className="py-3 px-4 font-mono text-xs text-primary">{tool.name}</td>
              <td className="py-3 px-4 text-xs text-body">{tool.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureSection({
  id,
  icon: Icon,
  title,
  lede,
  tools,
  alt = false,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lede: string;
  tools: { name: string; desc: string }[];
  alt?: boolean;
}) {
  return (
    <section id={id} className={`${presets.section} ${alt ? "bg-card/30" : ""}`}>
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-6 w-6 text-primary" />
            <h2 className={presets.h2}>{title}</h2>
          </div>
          <p className="text-body mt-2 max-w-2xl">{lede}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ToolsTable tools={tools} />
        </FadeIn>
      </div>
    </section>
  );
}

const Tools = () => {
  useCanonical("/tools");
  useMetaTags({
    title: "Apps. Every tool your agent needs.",
    description:
      "Built-in apps work straight away. Connected apps sign in once and remember.",
    ogTitle: "Apps. Every tool your agent needs.",
    ogDescription:
      "Browse built-in apps and connected services for AI agents.",
    ogUrl: "https://unclick.world/tools",
  });

  return (
    <PageShell
      eyebrow="Apps"
      title="Every tool your agent needs."
      accent="One install."
      lede="Built-in apps work straight away. Connected apps sign in once and remember."
      cta={{ label: "Get started", href: "/#install" }}
    >
      {/* Category grid */}
      <section id="categories" className={presets.section}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className={presets.sectionHeader}>
              <h2 className={presets.h2}>All categories</h2>
              <p className="mt-3 text-body">
                Built-in actions plus connected services, grouped by what they do.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.id} delay={0.02 * i}>
                <a
                  href={`#${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={presets.tile + " cursor-pointer"}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={presets.tileIcon}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-heading">{cat.name}</h3>
                  <p className="mt-1 text-xs text-body leading-relaxed">{cat.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-2">Example actions:</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.tools.map((tool) => (
                        <span key={tool} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-primary group-hover:gap-2 transition-all text-xs font-medium">
                    Explore <ChevronRight className="h-3 w-3" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection
        id="email"
        icon={Mail}
        title="Email apps"
        lede="AI-powered email management. Search, read, send, and organise. All through natural language."
        tools={EMAIL_TOOLS}
        alt
      />

      <FeatureSection
        id="finance"
        icon={TrendingUp}
        title="Finance apps"
        lede="Unified financial data. Crypto, stocks, and forex in one interface."
        tools={FINANCE_TOOLS}
      />

      <FeatureSection
        id="security"
        icon={Shield}
        title="Security apps"
        lede="Threat intelligence at your fingertips. Scan URLs, check breaches, monitor CVEs."
        tools={SECURITY_TOOLS}
        alt
      />

      <FeatureSection
        id="australia"
        icon={Flag}
        title="Australian services"
        lede="Built in Melbourne. Apps for Australian businesses and residents."
        tools={AUSTRALIA_TOOLS}
      />

      {/* Featured: Smart home */}
      <section id="smarthome" className={`${presets.section} bg-card/20`}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <Home className="h-6 w-6 text-primary" />
              <h2 className={presets.h2}>Smart home</h2>
            </div>
            <p className="text-body mt-2 max-w-2xl">
              Control your whole home through Home Assistant. 87 tools across 23 categories,
              supporting 2,000+ device integrations.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Lights and switches", desc: "All brands via HA" },
                { name: "Climate and HVAC", desc: "Nest, Ecobee, Daikin" },
                { name: "Locks and security", desc: "Yale, August, Ring" },
                { name: "Cameras", desc: "Ring, Arlo, Reolink" },
                { name: "Speakers and media", desc: "Sonos, Chromecast" },
                { name: "Sensors and energy", desc: "Aqara, Shelly" },
                { name: "Automations", desc: "Create and trigger via AI" },
                { name: "Scenes and scripts", desc: "Activate by name" },
              ].map((d) => (
                <div key={d.name} className="rounded-lg border border-border/40 bg-card/40 p-4">
                  <p className="text-sm font-semibold text-heading">{d.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-6 text-center">
              <Link
                to="/smarthome"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                View smart home details <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing line, one CTA */}
      <section className={presets.section}>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className={presets.h2}>
              Every tool. One install.{" "}
              <span className="text-primary">Zero friction.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 flex justify-center">
              <Link to="/#install" className={presets.ctaPrimary}>
                Get started
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default Tools;
