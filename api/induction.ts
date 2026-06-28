/**
 * Induction API.
 *
 *   GET  /api/induction              -> { rows, is_default } ordered for display
 *   POST /api/induction?action=save  -> bulk-replace the rows (admin only)
 *
 * The Induction is the ordered, grouped, easy-English onboarding a connected AI
 * agent reads when it joins UnClick. It is GLOBAL platform content (one per
 * platform, not per-tenant), edited from /admin/induction, and stored in the
 * service_role-only mc_induction_rows table.
 *
 * When the table is empty (or missing) the built-in DEFAULT_INDUCTION below is
 * returned, so the admin page and the future connect-time gate always have
 * content. Keeping the default here means the wording lives in one place and is
 * shared by both surfaces. Wording is grounded in docs/unclick-context-boot-packet.md
 * and the MCP session protocol; keep it easy-English and nothing personal.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export interface InductionRow {
  section: string;
  section_order: number;
  position: number;
  rule: string;
  why: string;
  enabled: boolean;
}

// Grouped default. Flattened into ordered rows below. Easy-English only.
const DEFAULT_SECTIONS: { section: string; rows: { rule: string; why: string }[] }[] = [
  {
    section: "Start every session",
    rows: [
      { rule: "Call load_memory before your first reply, every session.", why: "Your rules, style, and history live there. The model forgets between chats; UnClick does not." },
      { rule: "If they mention past work, search memory before you answer.", why: "It may already hold the answer or a saved trigger word." },
      { rule: "Save anything worth keeping with save_fact as you go.", why: "So next time nobody has to repeat it." },
      { rule: "Write a short save_session before you finish.", why: "The next session picks up where this one ended." },
    ],
  },
  {
    section: "Use the tools",
    rows: [
      { rule: "One UnClick connection gives you 450+ tools.", why: "You rarely need a separate plugin or a web search." },
      { rule: "Find a tool with unclick_search, then run it with unclick_call.", why: "Prefer a real tool over guessing." },
    ],
  },
  {
    section: "Backstage Pass (keys)",
    rows: [
      { rule: "Connected apps are reused automatically.", why: "A key added once works in every later session." },
      { rule: "Never ask the user to paste API keys into the chat.", why: "Keys live encrypted in the keychain, not in chat." },
      { rule: "If a tool says not connected, do the one-step connect.", why: "keychain_secure_connect finishes it without leaving the chat." },
    ],
  },
  {
    section: "Code work",
    rows: [
      { rule: "Run GitHub, Supabase, and Vercel through UnClick.", why: "The logins are already connected; you do not need the user to set them up." },
      { rule: "Do not ask the user to push, merge, or check CI by hand.", why: "Use the UnClick GitHub tools; database changes apply on merge." },
    ],
  },
  {
    section: "Coordinate",
    rows: [
      { rule: "The Boardroom is the shared room for jobs and handoffs.", why: "Post real changes there, not routine status noise. It is called Fishbowl in the code." },
    ],
  },
  {
    section: "Style and care",
    rows: [
      { rule: "Apply the user's saved style on every reply.", why: "So they never repeat shorter, simpler, or more visual." },
      { rule: "Do not re-ask for anything already in memory.", why: "Search first; only ask when memory truly lacks it." },
      { rule: "Pause before risky or hard-to-undo actions.", why: "Merging, deploying, deleting, or touching secrets needs a clear go-ahead." },
      { rule: "Never print or save secrets, tokens, or keys.", why: "Treat them as private at all times." },
    ],
  },
  {
    section: "Finish",
    rows: [
      { rule: "Prove work with a link, an id, or a test, not a green badge.", why: "A status that says done is not proof it is done." },
      { rule: "Save the session before you go.", why: "Decisions, what shipped, and open loops carry forward." },
    ],
  },
];

export const DEFAULT_INDUCTION: InductionRow[] = DEFAULT_SECTIONS.flatMap((section, sIdx) =>
  section.rows.map((row, rIdx) => ({
    section: section.section,
    section_order: sIdx,
    position: rIdx,
    rule: row.rule,
    why: row.why,
    enabled: true,
  })),
);

const ROW_COLUMNS = "section,section_order,position,rule,why,enabled";

function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function bearer(req: VercelRequest): string | null {
  const raw = req.headers["authorization"] ?? req.headers["Authorization"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  const match = /^Bearer\s+(.+)$/i.exec(value);
  return match ? match[1].trim() : null;
}

// Mirror api/memory-admin.ts resolveSessionUser: verify the Supabase JWT
// server-side. UnClick api_keys (uc_*/agt_*) are never session JWTs.
async function resolveSessionUser(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string; email: string | null } | null> {
  const token = bearer(req);
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

function asString(value: unknown, max: number): string {
  return (typeof value === "string" ? value : "").replace(/\s+/g, " ").trim().slice(0, max);
}

// Recompute section_order/position from array order so the stored order always
// matches what the editor showed, regardless of what the client sent.
function normalizeRows(input: unknown[]): InductionRow[] {
  const sectionOrder = new Map<string, number>();
  const positionInSection = new Map<string, number>();
  const out: InductionRow[] = [];
  for (const raw of input) {
    const r = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const section = asString(r.section, 80) || "General";
    const rule = asString(r.rule, 400);
    if (!rule) continue;
    if (!sectionOrder.has(section)) sectionOrder.set(section, sectionOrder.size);
    const pos = positionInSection.get(section) ?? 0;
    positionInSection.set(section, pos + 1);
    out.push({
      section,
      section_order: sectionOrder.get(section) ?? 0,
      position: pos,
      rule,
      why: asString(r.why, 400),
      enabled: r.enabled === false ? false : true,
    });
  }
  return out;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabase = serviceClient();
  if (!supabase) return res.status(500).json({ error: "Supabase is not configured" });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("mc_induction_rows")
      .select(ROW_COLUMNS)
      .order("section_order", { ascending: true })
      .order("position", { ascending: true });
    if (error || !data || data.length === 0) {
      return res.status(200).json({ rows: DEFAULT_INDUCTION, is_default: true });
    }
    return res.status(200).json({ rows: data, is_default: false });
  }

  if (req.method === "POST") {
    const action = typeof req.query.action === "string" ? req.query.action : "";
    if (action !== "save") return res.status(400).json({ error: "Unknown action" });

    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const user = await resolveSessionUser(req, url, key);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (!isAdminEmail(user.email)) return res.status(403).json({ error: "Admin only" });

    const body = req.body && typeof req.body === "object" ? (req.body as Record<string, unknown>) : {};
    if (!Array.isArray(body.rows)) return res.status(400).json({ error: "rows array required" });
    const rows = normalizeRows(body.rows);

    // Bulk replace: clear, then insert. The table is small and global.
    const del = await supabase.from("mc_induction_rows").delete().not("id", "is", null);
    if (del.error) return res.status(500).json({ error: del.error.message });
    if (rows.length > 0) {
      const ins = await supabase.from("mc_induction_rows").insert(rows);
      if (ins.error) return res.status(500).json({ error: ins.error.message });
    }
    return res.status(200).json({ ok: true, count: rows.length });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
