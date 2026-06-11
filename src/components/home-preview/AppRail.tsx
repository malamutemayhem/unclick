import "./preview.css";

/**
 * AppRail: two slow counter-scrolling rows of real connector names,
 * masked at the edges. Communicates catalog scale in one glance; the
 * station headline above it carries the numbers, so the strip itself
 * stays wordless. Rows pause on hover and stand still under
 * prefers-reduced-motion.
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

function TickerRow({ names, variant }: { names: string[]; variant: "a" | "b" }) {
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
      </div>
    </section>
  );
}
