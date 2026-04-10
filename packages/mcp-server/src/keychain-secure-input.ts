// ─── UnClick Keychain Secure Input ───────────────────────────────────────────
// Two-tier credential collection:
//   Tier 1: Check environment variables (common patterns per platform)
//   Tier 2: Spin up a temporary localhost HTTP server with a masked input page
//
// IMPORTANT: Credentials never appear in any log, response, or chat message.
// The localhost server binds to 127.0.0.1 only. Nonce validation prevents replay attacks.

import { createServer, type Server } from "http";
import { randomBytes } from "crypto";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SecureInputResult {
  value: string;
  source: "env" | "secure_input" | "direct";
}

interface ActiveServer {
  port:   number;
  server: Server;
  nonce:  string;
}

// ─── Module-level state ───────────────────────────────────────────────────────
// These Maps persist across MCP tool calls within the same server process.
// resolvedCredentials: platform -> credential (submitted by user, ready to pick up)
// activeServers: platform -> server info (waiting for user to open browser and submit)

const resolvedCredentials = new Map<string, string>();
const activeServers       = new Map<string, ActiveServer>();

// ─── Tier 1: Environment variable detection ───────────────────────────────────

const ENV_MAPPINGS: Record<string, string[]> = {
  github:       ["GITHUB_TOKEN", "GITHUB_PAT", "GITHUB_API_KEY", "GH_TOKEN"],
  supabase:     ["SUPABASE_KEY", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_ANON_KEY"],
  vercel:       ["VERCEL_TOKEN", "VERCEL_API_TOKEN"],
  stripe:       ["STRIPE_SECRET_KEY", "STRIPE_API_KEY", "STRIPE_KEY"],
  openai:       ["OPENAI_API_KEY", "OPENAI_KEY"],
  anthropic:    ["ANTHROPIC_API_KEY", "ANTHROPIC_KEY"],
  cloudflare:   ["CLOUDFLARE_API_TOKEN", "CF_API_TOKEN", "CLOUDFLARE_TOKEN"],
  slack:        ["SLACK_BOT_TOKEN", "SLACK_TOKEN", "SLACK_API_TOKEN"],
  discord:      ["DISCORD_BOT_TOKEN", "DISCORD_TOKEN"],
  notion:       ["NOTION_API_KEY", "NOTION_TOKEN", "NOTION_INTEGRATION_TOKEN"],
  airtable:     ["AIRTABLE_API_KEY", "AIRTABLE_PAT"],
  linear:       ["LINEAR_API_KEY", "LINEAR_TOKEN"],
  twilio:       ["TWILIO_AUTH_TOKEN"],
  sendgrid:     ["SENDGRID_API_KEY"],
  mailchimp:    ["MAILCHIMP_API_KEY"],
  datadog:      ["DD_API_KEY", "DATADOG_API_KEY"],
  pinecone:     ["PINECONE_API_KEY"],
  deepl:        ["DEEPL_AUTH_KEY", "DEEPL_API_KEY"],
  groq:         ["GROQ_API_KEY"],
  mistral:      ["MISTRAL_API_KEY"],
  cohere:       ["COHERE_API_KEY", "CO_API_KEY"],
  perplexity:   ["PERPLEXITY_API_KEY", "PPLX_API_KEY"],
  replicate:    ["REPLICATE_API_TOKEN"],
  resend:       ["RESEND_API_KEY"],
  postmark:     ["POSTMARK_SERVER_TOKEN"],
  sentry:       ["SENTRY_AUTH_TOKEN"],
  pagerduty:    ["PAGERDUTY_API_KEY"],
  digitalocean: ["DIGITALOCEAN_TOKEN", "DO_API_TOKEN"],
  railway:      ["RAILWAY_API_TOKEN"],
  netlify:      ["NETLIFY_AUTH_TOKEN"],
  neon:         ["NEON_API_KEY"],
  render:       ["RENDER_API_KEY"],
  flyio:        ["FLY_API_TOKEN"],
  algolia:      ["ALGOLIA_API_KEY"],
  mixpanel:     ["MIXPANEL_TOKEN"],
  segment:      ["SEGMENT_WRITE_KEY"],
  assemblyai:   ["ASSEMBLYAI_API_KEY"],
  circleci:     ["CIRCLECI_TOKEN"],
  shopify:      ["SHOPIFY_ACCESS_TOKEN"],
  upstash:      ["UPSTASH_REDIS_REST_TOKEN"],
  turso:        ["TURSO_AUTH_TOKEN"],
  convertkit:   ["CONVERTKIT_API_KEY"],
  gumroad:      ["GUMROAD_ACCESS_TOKEN"],
  lemonsqueezy: ["LEMONSQUEEZY_API_KEY"],
  togetherai:   ["TOGETHER_API_KEY"],
  higgsfield:   ["HIGGSFIELD_API_KEY"],
  heygen:       ["HEYGEN_API_KEY"],
  runway:       ["RUNWAY_API_KEY"],
  pika:         ["PIKA_API_KEY"],
  kling:        ["KLING_API_KEY"],
};

export function checkEnvCredential(platform: string): string | null {
  const vars = ENV_MAPPINGS[platform] ?? [
    `${platform.toUpperCase()}_API_KEY`,
    `${platform.toUpperCase()}_TOKEN`,
  ];
  for (const v of vars) {
    const val = process.env[v];
    if (val && val.length > 5) return val;
  }
  return null;
}

// ─── Tier 2: Temporary localhost secure input page ────────────────────────────

function buildHtml(platform: string, nonce: string, setupUrl?: string): string {
  const setupLink = setupUrl
    ? ` <a href="${setupUrl}" target="_blank">Get your key here</a>.`
    : "";
  return `<!DOCTYPE html>
<html><head>
<title>UnClick BackstagePass - Connect ${platform}</title>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #e0e0e0; font-family: -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 40px; max-width: 480px; width: 100%; }
  h1 { font-size: 20px; margin-bottom: 8px; color: #61c1c4; }
  p { font-size: 14px; color: #888; margin-bottom: 24px; }
  a { color: #61c1c4; }
  label { font-size: 13px; color: #aaa; display: block; margin-bottom: 8px; }
  input[type="password"] { width: 100%; padding: 12px; background: #111; border: 1px solid #333; border-radius: 8px; color: #fff; font-size: 14px; font-family: monospace; }
  input:focus { outline: none; border-color: #61c1c4; }
  button { width: 100%; padding: 12px; background: #61c1c4; color: #0a0a0a; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 16px; }
  button:hover { background: #4fa8ab; }
  .note { font-size: 12px; color: #555; margin-top: 16px; text-align: center; }
  .success { text-align: center; }
  .success h1 { font-size: 24px; margin-bottom: 16px; }
</style>
</head><body>
<div class="card" id="form">
  <h1>Connect ${platform}</h1>
  <p>Paste your API key below. It will be encrypted and stored securely. This page closes automatically after submission.${setupLink}</p>
  <label>API Key</label>
  <input type="password" id="key" placeholder="Paste your key here" autofocus>
  <button onclick="submit()">Connect</button>
  <div class="note">Your key goes directly to local encryption. It never appears in your AI chat.</div>
</div>
<div class="card success" id="done" style="display:none">
  <h1>Connected</h1>
  <p>Your ${platform} key has been encrypted and stored. You can close this tab.</p>
</div>
<script>
async function submit() {
  const key = document.getElementById('key').value.trim();
  if (!key) return;
  const res = await fetch('/submit', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({key, nonce:'${nonce}'}) });
  if (res.ok) { document.getElementById('form').style.display='none'; document.getElementById('done').style.display='block'; setTimeout(() => window.close(), 2000); }
}
document.getElementById('key').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
</script>
</body></html>`;
}

// Start a localhost server for the given platform. Stores result in resolvedCredentials when submitted.
// Returns port number immediately (non-blocking).
export function startSecureInputServer(platform: string, setupUrl?: string): number {
  // If a server for this platform is already running, reuse it
  const existing = activeServers.get(platform);
  if (existing) return existing.port;

  const nonce = randomBytes(8).toString("hex");
  // Use a deterministic-ish port range: 19283-19382
  const port  = 19283 + Math.floor(Math.random() * 100);
  const html  = buildHtml(platform, nonce, setupUrl);

  const server = createServer((req, res) => {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
      return;
    }

    if (req.method === "POST" && req.url === "/submit") {
      let body = "";
      req.on("data", (chunk) => { body += chunk; });
      req.on("end", () => {
        try {
          const data = JSON.parse(body) as { nonce?: string; key?: string };
          if (data.nonce === nonce && data.key && data.key.length > 5) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end('{"ok":true}');
            // Store resolved credential and clean up
            resolvedCredentials.set(platform, data.key);
            activeServers.delete(platform);
            setTimeout(() => server.close(), 3000);
          } else {
            res.writeHead(400);
            res.end("Invalid");
          }
        } catch {
          res.writeHead(400);
          res.end("Bad request");
        }
      });
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  server.listen(port, "127.0.0.1");
  activeServers.set(platform, { port, server, nonce });

  // Auto-shutdown after 5 minutes
  setTimeout(() => {
    if (activeServers.has(platform)) {
      activeServers.delete(platform);
      server.close();
    }
  }, 300_000);

  return port;
}

// Check if a submitted credential is waiting to be picked up
export function popResolvedCredential(platform: string): string | null {
  const val = resolvedCredentials.get(platform);
  if (val !== undefined) {
    resolvedCredentials.delete(platform);
    return val;
  }
  return null;
}

// Check if an input server is currently active for a platform
export function hasActiveServer(platform: string): boolean {
  return activeServers.has(platform);
}

// Main export: resolve a credential via env check or secure input page
// This returns immediately - it never blocks waiting for the browser.
export interface SecureConnectState {
  status:   "found_env" | "found_submitted" | "awaiting_input";
  value?:   string;
  source?:  "env" | "secure_input";
  url?:     string;
  message:  string;
}

export function resolveCredential(platform: string, setupUrl?: string): SecureConnectState {
  // Tier 1: environment
  const envVal = checkEnvCredential(platform);
  if (envVal) {
    return {
      status:  "found_env",
      value:   envVal,
      source:  "env",
      message: `Credential for ${platform} found in environment.`,
    };
  }

  // Check if user already submitted via browser
  const submitted = popResolvedCredential(platform);
  if (submitted) {
    return {
      status:  "found_submitted",
      value:   submitted,
      source:  "secure_input",
      message: `Credential for ${platform} received via secure input page.`,
    };
  }

  // Tier 2: start (or reuse) the localhost server
  const port = startSecureInputServer(platform, setupUrl);
  return {
    status:  "awaiting_input",
    url:     `http://localhost:${port}`,
    message: `Open http://localhost:${port} to securely enter your ${platform} API key. Then call keychain_secure_connect again to complete the connection.`,
  };
}
