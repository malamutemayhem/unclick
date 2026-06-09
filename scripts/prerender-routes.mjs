/**
 * Per-route prerender (SSG-lite) for UnClick's public marketing routes.
 *
 * Why: the site is a client-rendered SPA and vercel.json rewrites every route
 * to /index.html. Without this step, no-JS crawlers and AI answer engines get
 * the homepage shell (and the homepage canonical) for /tools, /memory, etc.
 *
 * What: after `vite build`, this clones the built dist/index.html (which already
 * has the correct hashed asset tags and the build-date stamp) and writes one
 * static dist/<route>/index.html per route with route-specific <title>,
 * description, canonical, Open Graph tags, and crawlable #root content. The same
 * app bundle is referenced, so React's createRoot().render() replaces the
 * prerendered #root on mount and users still get the live SPA.
 *
 * Vercel serves these static files in the filesystem phase, before the SPA
 * catch-all rewrite (the `miss`/`rewrite` phase) fires, so /tools resolves to
 * dist/tools/index.html. Routes not listed here keep today's SPA-fallback
 * behaviour, so this change is additive with a bounded downside.
 *
 * Copy is sourced from the live page components (Tools, Memory, Pricing, FAQ,
 * Developers, Docs, Why) so structured data matches visible content. Keep it
 * roughly in sync if those pages change; SEOPass/GEOPass guard the outcome.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const indexPath = join(distDir, "index.html");
const ORIGIN = "https://unclick.world";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const NAV = [
  ["/", "Home"],
  ["/tools", "Apps"],
  ["/memory", "Memory"],
  ["/developers", "Developers"],
  ["/pricing", "Pricing"],
  ["/why", "Why UnClick"],
  ["/faq", "FAQ"],
  ["/docs", "Docs"],
];

function navHtml() {
  return NAV.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join("\n              ");
}

function sectionsHtml(sections = []) {
  return sections
    .map((s) => {
      const parts = [`            <h2>${esc(s.h2)}</h2>`];
      for (const p of s.paragraphs || []) parts.push(`            <p>${esc(p)}</p>`);
      for (const f of s.faq || []) {
        parts.push(`            <h3>${esc(f.q)}</h3>`);
        parts.push(`            <p>${esc(f.a)}</p>`);
      }
      if (s.items) {
        parts.push("            <ul>");
        for (const it of s.items) {
          parts.push(`              <li><strong>${esc(it.title)}:</strong> ${esc(it.desc)}</li>`);
        }
        parts.push("            </ul>");
      }
      return `          <section>\n${parts.join("\n")}\n          </section>`;
    })
    .join("\n\n");
}

function rootHtml(route) {
  return `
      <div class="uc-boot__loader">
        <div class="uc-boot__spinner" role="status" aria-label="Loading UnClick"></div>
      </div>
      <div class="uc-boot">
        <div class="uc-boot__wrap">
          <section class="uc-boot__hero">
            <h1>${esc(route.h1)}</h1>
            <p class="uc-boot__lede">${esc(route.intro)}</p>
            <nav class="uc-boot__nav" aria-label="Primary">
              ${navHtml()}
            </nav>
          </section>

${sectionsHtml(route.sections)}

          <section>
            <h2>Open source and install</h2>
            <p>UnClick is an MCP server you can install in one step and use from any MCP-compatible client.</p>
            <ul>
              <li><a href="https://github.com/malamutemayhem/unclick" rel="noopener">GitHub repository</a></li>
              <li><a href="https://github.com/malamutemayhem/unclick/releases" rel="noopener">GitHub releases</a></li>
              <li><a href="https://www.npmjs.com/package/@unclick/mcp-server" rel="noopener">npm: @unclick/mcp-server</a></li>
              <li><a href="/llms.txt">llms.txt for AI agents</a></li>
            </ul>
          </section>

          <footer class="uc-boot__foot">
            <p>UnClick. The universal remote for AI. Built in Melbourne, Australia.</p>
            <p>Last updated <time datetime="${BUILD_DATE}">${BUILD_DATE}</time>.</p>
          </footer>
        </div>
      </div>`;
}

const ROUTES = [
  {
    path: "/tools",
    title: "Apps. Every tool your agent needs.",
    description: "Built-in apps work straight away. Connected apps sign in once and remember.",
    ogTitle: "Apps. Every tool your agent needs.",
    ogDescription: "Browse built-in apps and connected services for AI agents.",
    h1: "Apps: every tool your agent needs",
    intro:
      "Built-in apps work straight away. Connected apps sign in once and remember. UnClick gives your AI agent 450+ callable endpoints across 60+ integrations in one install, discovered and called over MCP.",
    sections: [
      {
        h2: "What your agent can connect",
        items: [
          { title: "Messaging", desc: "Slack, Discord, Telegram, Twilio, WhatsApp, and LINE." },
          { title: "Social", desc: "Reddit, Bluesky, Mastodon, and more." },
          { title: "Commerce", desc: "Shopify, Amazon, eBay, Etsy, and Gumroad." },
          { title: "Finance", desc: "Stripe, Xero, PayPal, Plaid, Wise, and Square." },
          { title: "Developer", desc: "GitHub, GitLab, Sentry, Vercel, and Netlify." },
          { title: "Security", desc: "VirusTotal, Shodan, Have I Been Pwned, and CVE lookups." },
        ],
      },
    ],
  },
  {
    path: "/memory",
    title: "Persistent memory for AI agents - UnClick",
    description:
      "Give your AI agent an eight-pillar memory: identity, business context, facts, library, sessions, code, recall, and your own data island. Cross-session, cross-agent, stored in your own database.",
    ogTitle: "UnClick Memory - Persistent cross-session memory for AI agents",
    ogDescription:
      "Eight pillars of memory for AI agents: identity, business context, facts, sessions, code, and more. All cross-session.",
    h1: "Persistent memory for AI agents",
    intro:
      "Give your AI agent an eight-pillar memory that is cross-session, cross-agent, and stored in your own database.",
    sections: [
      {
        h2: "Eight pillars of memory",
        items: [
          { title: "Identity", desc: "Who you are and your standing rules. Always loaded, tiny footprint." },
          { title: "Business context", desc: "Your clients, projects, and preferences, loaded every session." },
          { title: "Facts", desc: "Conversations distilled into single facts. Old versions are kept, never lost." },
          { title: "Library and briefs", desc: "Versioned reference docs with full history kept automatically." },
          { title: "Session continuity", desc: "One summary per session: decisions, open loops, key topics." },
          { title: "Code memory", desc: "Code stored on its own, language and file tagged, loaded only when needed." },
          { title: "Recall and hygiene", desc: "Used memories surface first and stale ones fade to save context." },
          { title: "Data island", desc: "It all lives in your own database. We never see it, and your data stays yours." },
        ],
      },
    ],
  },
  {
    path: "/pricing",
    title: "Pricing - UnClick",
    description:
      "Free forever for 100 tool calls/day. Pro at $29/mo unlocks unlimited calls, hosted memory, and priority support.",
    ogTitle: "UnClick Pricing - Free to start, Pro when you need it",
    ogDescription: "Free forever for 100 tool calls/day. Upgrade to Pro for unlimited access across 450+ tools.",
    h1: "UnClick pricing",
    intro:
      "Free forever for 100 tool calls a day. Pro at $29/mo unlocks unlimited calls and hosted memory. Team at $79/mo adds seats and shared context.",
    sections: [
      {
        h2: "Plans",
        items: [
          { title: "Free, $0 forever", desc: "178+ tools (100 calls/day), Arena browsing, self-hosted memory, and Passport with 5 access entries." },
          { title: "Pro, $29/mo", desc: "Unlimited tool calls, managed memory with nightly fact extraction and decay, unlimited Passport, and priority support." },
          { title: "Team, $79/mo", desc: "Everything in Pro, up to 5 seats, multi-user memory, shared business context, and role-based access." },
        ],
      },
    ],
  },
  {
    path: "/why",
    title: "Why UnClick - the layer your AI plugs into",
    description:
      "900+ vetted tools, a memory that stays in your own database, signed permissions, and built-in proof, in one install. An honest look at where UnClick beats wiring up a self-hosted agent, and where those agents still lead.",
    ogTitle: "Why UnClick",
    ogDescription:
      "Every tool. Your memory. Signed permissions. Built-in proof. One install. See what makes UnClick different.",
    h1: "Why UnClick",
    intro:
      "Every tool, a memory that stays in your own database, signed permissions, and built-in proof, in one install. UnClick is the layer your AI plugs into, not a rival runtime.",
    sections: [
      {
        h2: "The five-pillar moat",
        items: [
          { title: "Every tool, one install", desc: "900+ tools and 200+ apps in a single MCP install. No wiring one integration at a time." },
          { title: "Tools you can trust", desc: "Every tool is hardened and tested, stamps where its answer came from, and hands your agent the next step." },
          { title: "Memory that is yours", desc: "One memory across every assistant and device, kept in your own database, with zero lock-in." },
          { title: "Permissions and proof", desc: "Signed, scoped access plus built-in proof the work was done right. Evidence, not vibes." },
          { title: "Calm to own", desc: "One flat subscription. Nothing to host, patch, or secure, and no token meter running while you sleep." },
        ],
      },
      {
        h2: "Honest about the tradeoffs",
        paragraphs: [
          "UnClick is the layer, not the rival. It plugs into Claude, Cursor, ChatGPT, and even a self-hosted agent, and travels with you. Self-hosted agents still lead on full autonomy, running entirely local, and keeping data on your own hardware.",
        ],
      },
    ],
  },
  {
    path: "/developers",
    title: "Developers - Build tools on UnClick",
    description:
      "Build a tool in one TypeScript file, submit it for review, and earn 80% of the revenue it generates. Zero infrastructure to run.",
    ogTitle: "Build tools on UnClick",
    ogDescription: "One TypeScript file, 80% revenue share, zero infrastructure. Publish tools for AI agents.",
    h1: "Build tools on UnClick and earn",
    intro:
      "Build a tool in one TypeScript file, submit it for review, and earn 80% of the revenue it generates. We host, scale, and monitor everything.",
    sections: [
      {
        h2: "How it works",
        items: [
          { title: "Write your tool", desc: "One TypeScript file that exports an array of tool definitions. About 30 minutes for a simple wrapper." },
          { title: "Submit for review", desc: "Founding developers get a 24 hour review with direct feedback." },
          { title: "Earn 80% of revenue", desc: "Your tool earns on every call. No Stripe required to start." },
        ],
      },
      {
        h2: "Why build here",
        items: [
          { title: "Zero infrastructure cost", desc: "We host, scale, and monitor everything. You ship code, not servers." },
          { title: "Instant distribution", desc: "Your tool is available to all UnClick users the moment it goes live." },
          { title: "Transparent earnings", desc: "Real-time dashboard shows calls, revenue, and payout history per tool." },
        ],
      },
    ],
  },
  {
    path: "/docs",
    title: "Docs - UnClick",
    description:
      "API reference for UnClick tools. One key, instant access for Claude, ChatGPT, and any MCP-compatible agent.",
    ogTitle: "Docs - UnClick",
    ogDescription:
      "API reference for all 178 UnClick tools. One key, instant access for Claude, ChatGPT, and any MCP-compatible agent.",
    h1: "What can your AI do with UnClick?",
    intro:
      "API reference for UnClick tools. One key, and your agent gets instant access from Claude, ChatGPT, Cursor, and any MCP-compatible client.",
    sections: [
      {
        h2: "Built-in tools",
        items: [
          { title: "Link-in-Bio", desc: "Create and manage shareable link pages with links, social profiles, themes, and custom domains." },
          { title: "Scheduling", desc: "Manage booking types, availability schedules, and appointments." },
          { title: "Webhooks", desc: "Subscribe to events from any tool. Deliveries are signed with HMAC-SHA256." },
          { title: "API Keys", desc: "Manage your API keys and scopes." },
          { title: "Health", desc: "Service status check. No authentication required." },
        ],
      },
    ],
  },
  {
    path: "/faq",
    title: "FAQ - UnClick",
    description: "Answers to common questions about UnClick, MCP tools, and how to get started.",
    ogTitle: "FAQ - UnClick",
    ogDescription: "Answers to common questions about UnClick, MCP tools, and how to get started.",
    h1: "Frequently asked questions about UnClick",
    intro: "Common questions about UnClick, MCP tools, and getting started.",
    keepFaqSchema: true,
    sections: [
      {
        h2: "Frequently asked questions",
        faq: [
          { q: "What is UnClick?", a: "UnClick is shared agent rails for tools, memory, connections, crews, and Pass family QA checks. You point your AI agent at UnClick and it gets durable context, secure service access, and 178+ real-world tools through one setup." },
          { q: "How does UnClick work?", a: "UnClick exposes its tools over the Model Context Protocol (MCP). You add UnClick's MCP endpoint to your agent's config, provide your API key, and your agent can call any of the 178+ tools with no per-integration setup." },
          { q: "Is UnClick free?", a: "Yes. UnClick has a free tier that gives you access to all 178+ tools with no upfront cost. Sign up with your email to get an API key." },
          { q: "What AI agents work with UnClick?", a: "Any agent that supports MCP, including Claude (Anthropic), ChatGPT, Cursor, OpenClaw, and any custom agent built with an MCP-compatible SDK." },
          { q: "How is UnClick different from other MCP servers?", a: "Most MCP servers focus on one integration. UnClick is the shared layer behind your agent: 178+ tools, persistent memory, Passport, crews, and Pass family checks in one managed setup." },
        ],
      },
    ],
  },
];

function replaceOrThrow(html, regex, replacement, label, route) {
  if (!regex.test(html)) {
    throw new Error(`prerender: could not find ${label} to replace for ${route}. index.html structure changed?`);
  }
  return html.replace(regex, replacement);
}

function buildPage(template, route) {
  let html = template;
  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, "<title>", route.path);
  html = replaceOrThrow(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escAttr(route.description)}" />`,
    "meta description",
    route.path,
  );
  html = replaceOrThrow(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${ORIGIN}${route.path}" />`,
    "canonical",
    route.path,
  );
  // Open Graph + Twitter (best-effort; do not fail the build if absent).
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escAttr(route.ogTitle || route.title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escAttr(route.ogDescription || route.description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${ORIGIN}${route.path}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escAttr(route.ogTitle || route.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escAttr(route.ogDescription || route.description)}" />`);
  // The homepage FAQ JSON-LD only belongs on pages that show that FAQ.
  if (!route.keepFaqSchema) {
    html = html.replace(/\s*<script type="application\/ld\+json" id="faq-schema">[\s\S]*?<\/script>/, "");
  }
  // Swap the crawlable #root content for this route. Vite hoists the entry
  // script into <head>, so in the built HTML #root is closed right before
  // </body>.
  html = replaceOrThrow(
    html,
    /<div id="root">[\s\S]*?<\/div>\s*<\/body>/,
    `<div id="root">${rootHtml(route)}\n    </div>\n  </body>`,
    "#root content",
    route.path,
  );
  return html;
}

function main() {
  if (!existsSync(indexPath)) {
    throw new Error(`prerender: ${indexPath} not found. Run vite build first.`);
  }
  const template = readFileSync(indexPath, "utf8");
  const written = [];
  for (const route of ROUTES) {
    const html = buildPage(template, route);
    const outPath = join(distDir, route.path.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    written.push(route.path);
  }
  console.log(`prerender: wrote ${written.length} route page(s): ${written.join(", ")}`);
}

main();
