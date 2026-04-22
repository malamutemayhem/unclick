/**
 * build.ts - Proxy to Vibe Kanban REST API for UnClick Build cockpit.
 *
 * All requests require a valid Supabase session JWT from an admin
 * email (ADMIN_EMAILS env var). Credentials for the Vibe Kanban
 * instance are stored in server-side env vars only:
 *   VIBE_KANBAN_URL    - base URL, e.g. https://myapp.up.railway.app
 *   VIBE_KANBAN_TOKEN  - Bearer token obtained from Vibe Kanban login
 *   VIBE_KANBAN_ORG_ID - organization UUID (required for project listing)
 *
 * Actions (all GET unless noted):
 *   list_projects - GET /v1/projects?organization_id=...
 *   list_tasks    - GET /v1/issues?project_id=...  (?project_id=<uuid>)
 *   get_task      - GET /v1/issues/:id             (?id=<uuid>)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ── Auth helpers ──────────────────────────────────────────────────

async function resolveAdminUser(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string; email: string | null } | null> {
  const token = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const client = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

function isAdmin(email: string | null, adminEmailsEnv: string): boolean {
  if (!email) return false;
  const allowed = adminEmailsEnv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

// ── Vibe Kanban proxy helpers ─────────────────────────────────────

async function vkFetch(
  vibeUrl: string,
  vibeToken: string,
  path: string,
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const url = `${vibeUrl.replace(/\/$/, "")}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${vibeToken}`,
        Accept: "application/json",
      },
    });
    let body: unknown = null;
    const text = await res.text();
    if (text) {
      try { body = JSON.parse(text); } catch { body = text; }
    }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, body: (err as Error).message };
  }
}

function json(res: VercelResponse, status: number, body: unknown) {
  res.setHeader("Content-Type", "application/json");
  return res.status(status).json(body);
}

// ── Handler ───────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return json(res, 405, { error: "GET only" });

  const supabaseUrl    = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmailsRaw = process.env.ADMIN_EMAILS ?? "";
  const vibeUrl        = process.env.VIBE_KANBAN_URL;
  const vibeToken      = process.env.VIBE_KANBAN_TOKEN;
  const vibeOrgId      = process.env.VIBE_KANBAN_ORG_ID;

  if (!supabaseUrl || !serviceRoleKey) {
    return json(res, 500, { error: "Server configuration missing (Supabase)." });
  }
  if (!vibeUrl || !vibeToken) {
    return json(res, 503, { error: "Vibe Kanban not configured. Set VIBE_KANBAN_URL and VIBE_KANBAN_TOKEN." });
  }

  // Auth: require session + admin role
  const user = await resolveAdminUser(req, supabaseUrl, serviceRoleKey);
  if (!user) return json(res, 401, { error: "Not signed in." });
  if (!isAdmin(user.email, adminEmailsRaw)) {
    return json(res, 403, { error: "Admin access required." });
  }

  const action = String(req.query.action ?? "").trim();

  // ── list_projects ─────────────────────────────────────────────
  if (action === "list_projects") {
    if (!vibeOrgId) {
      return json(res, 503, { error: "VIBE_KANBAN_ORG_ID not set. Add your Vibe Kanban organization ID to Vercel env vars." });
    }
    const { ok, status, body } = await vkFetch(
      vibeUrl,
      vibeToken,
      `/v1/projects?organization_id=${encodeURIComponent(vibeOrgId)}`,
    );
    if (!ok) return json(res, status || 502, { error: "Vibe Kanban upstream error.", upstream: body });
    const raw = body as { projects?: unknown[] } | null;
    return json(res, 200, { projects: raw?.projects ?? [] });
  }

  // ── list_tasks ────────────────────────────────────────────────
  if (action === "list_tasks") {
    const projectId = String(req.query.project_id ?? "").trim();
    if (!projectId) return json(res, 400, { error: "project_id is required." });
    const { ok, status, body } = await vkFetch(
      vibeUrl,
      vibeToken,
      `/v1/issues?project_id=${encodeURIComponent(projectId)}`,
    );
    if (!ok) return json(res, status || 502, { error: "Vibe Kanban upstream error.", upstream: body });
    const raw = body as { issues?: unknown[] } | null;
    return json(res, 200, { tasks: raw?.issues ?? [] });
  }

  // ── get_task ──────────────────────────────────────────────────
  if (action === "get_task") {
    const id = String(req.query.id ?? "").trim();
    if (!id) return json(res, 400, { error: "id is required." });
    const { ok, status, body } = await vkFetch(vibeUrl, vibeToken, `/v1/issues/${encodeURIComponent(id)}`);
    if (!ok) return json(res, status || 502, { error: "Vibe Kanban upstream error.", upstream: body });
    return json(res, 200, { task: body });
  }

  return json(res, 400, { error: `Unknown action: ${action || "(empty)"}` });
}
