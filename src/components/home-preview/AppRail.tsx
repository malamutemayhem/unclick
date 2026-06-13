import { SITE_STATS } from "@/config/site-stats";
import "./preview.css";

/**
 * AppRail: three slow counter-scrolling rows of real connector names,
 * masked at the edges, with one plain-English scale line. Rows pause
 * on hover and stand still under prefers-reduced-motion.
 */

const ROW_A = [
  "Gmail", "GitHub", "Slack", "Stripe", "Spotify", "Notion", "Shopify",
  "Vercel", "Discord", "Telegram", "Xero", "Linear", "Figma", "OpenAI",
  "Anthropic", "Mapbox", "Twilio", "Cloudinary",
];

const ROW_B = [
  "YouTube", "Reddit", "HubSpot", "Trello", "Jira", "Calendly", "Mailchimp",
  "Etsy", "eBay", "PayPal", "Sentry", "Netlify", "NASA", "Whatsapp",
  "Asana", "Datadog", "Supabase", "ElevenLabs",
];

const ROW_C = [
  "Airtable", "Dropbox", "Todoist", "Zendesk", "Intercom", "Miro", "Coda",
  "Webflow", "WordPress", "Square", "Wise", "Typeform", "Pinterest",
  "Bluesky", "Mastodon", "Twitch", "PagerDuty", "Klaviyo",
];

function TickerRow({ names, variant }: { names: string[]; variant: "a" | "b" | "c" }) {
  const doubled = [...names, ...names];
  return (
    <div className={`hp-ticker-row hp-ticker-row-${variant}`}>
      {doubled.map((name, i) => (
        <span
          key={`${name}-${i}`}
          aria-hidden={i >= names.length}
          className="inline-flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70"
        >
          <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden="true" />
          {name}
        </span>
      ))}
    </div>
  );
}

export default function AppRail() {
  return (
    <section aria-label="Connected apps" className="relative py-8">
      <div className="hp-ticker space-y-4 overflow-hidden">
        <TickerRow names={ROW_A} variant="a" />
        <TickerRow names={ROW_B} variant="b" />
        <TickerRow names={ROW_C} variant="c" />
      </div>
      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-primary/70">
        {SITE_STATS.ENDPOINTS_DISPLAY} actions · {SITE_STATS.TOOLS_DISPLAY} apps · one connection
      </p>
    </section>
  );
}
