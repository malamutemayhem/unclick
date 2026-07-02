// GET/POST /api/app-human-checks
//
// The live store behind the "Human checked" column on the admin AppTesting page
// (src/pages/admin/AdminAppTesting.tsx). The automated status says "a tool call
// returned something"; this records the separate, human sign-off that a person
// actually verified the app end to end (checked the real inbox, listed the real
// root folder, etc.). One global boolean per app slug.
//
// Auth: a Supabase admin session JWT whose email is on the ADMIN_EMAILS
// allowlist - the same gate as api/eval-truth-rate.ts. The service-role key is
// used only server-side to read/write the app_human_checks table. UnClick API
// keys (uc_/agt_) are intentionally not accepted: this is an admin-web surface.
//
//   GET  -> { checks: { [slug]: boolean } }   // only explicitly-stored rows
//   POST { slug, checked } -> { success: true, slug, checked }
//
// Reads fail-soft: if the table is not migrated here yet, GET returns an empty
// map so the page still renders its built-in defaults. Writes need the table.
//
// Required env (server-side only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
// ADMIN_EMAILS.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

/** Catalog slugs are lowercase, hyphen-separated (matches APP_CATALOG[].slug). */
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && SLUG_RE.test(slug);
}

function bearerFrom(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Resolve an admin email from a Supabase session JWT, or null. Returns null for
 * missing tokens, UnClick API keys, unverifiable sessions, or emails that are
 * not on the ADMIN_EMAILS allowlist.
 */
async function resolveAdminEmail(
  token: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<string | null> {
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    const email = data?.user?.email?.toLowerCase();
    if (error || !email) return null;
    return adminEmails().includes(email) ? email : null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Database service unavailable" });
  }

  const token = bearerFrom(req);
  if (!token) return res.status(401).json({ error: "Sign in required." });

  const adminEmail = await resolveAdminEmail(token, supabaseUrl, serviceRoleKey);
  if (!adminEmail) return res.status(403).json({ error: "Admin access required" });

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // GET: the full map of explicitly-stored flags. Missing slugs fall back to the
  // page's built-in default, so we only return rows that exist.
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("app_human_checks")
      .select("slug, checked");
    if (error) {
      // Table not migrated in this environment yet: empty map keeps the page on
      // its built-in defaults rather than erroring.
      return res.status(200).json({ checks: {} });
    }
    const checks: Record<string, boolean> = {};
    for (const row of data ?? []) {
      if (typeof row?.slug === "string") checks[row.slug] = row.checked !== false;
    }
    return res.status(200).json({ checks });
  }

  // POST: set one slug's flag (auto-save on each checkbox toggle).
  if (req.method === "POST") {
    const body = (req.body ?? {}) as { slug?: unknown; checked?: unknown };
    if (!isValidSlug(body.slug)) {
      return res.status(400).json({ error: "Valid app slug required." });
    }
    if (typeof body.checked !== "boolean") {
      return res.status(400).json({ error: "checked (boolean) required." });
    }
    const { error } = await supabase
      .from("app_human_checks")
      .upsert(
        {
          slug: body.slug,
          checked: body.checked,
          checked_by: adminEmail,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" },
      );
    if (error) {
      console.error("app-human-checks upsert failed", error.message);
      return res.status(502).json({ error: "Failed to save. Try again." });
    }
    return res.status(200).json({ success: true, slug: body.slug, checked: body.checked });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
