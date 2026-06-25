// Supabase Management API: database write surface for UnClick.
// Docs: https://supabase.com/docs/reference/api/introduction
// Auth: a Supabase Personal Access Token (management scope), pulled per-user
//       from the UnClick keychain under the "supabase" platform slug.
// Base: https://api.supabase.com/v1
//
// This is the WRITE counterpart to the read-only supabase_* tools. It gives
// UnClick the same database power the old Claude-direct connector had
// (run SQL, apply migrations) but scoped to each user's OWN credential, with
// a destructive-statement guard in front so a risky command cannot run by
// accident.
//
// Why the Management API and not the Supabase CLI / pooler: the CLI goes
// through Supavisor, which is flaky on free-tier projects. The Management API
// talks to the database directly and authenticates with the access token, no
// DB password or connection string required. This mirrors the proven
// .github/scripts/apply_migrations.py pipeline.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const SUPABASE_MGMT_BASE = "https://api.supabase.com/v1";

function getAccessToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("supabase", args);
}

function projectRef(args: Record<string, unknown>): string {
  return String(args.project_ref ?? args.project_id ?? args.ref ?? "").trim();
}

async function managementRequest(
  token: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  opts?: { body?: unknown }
): Promise<unknown> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    // Cloudflare fronts api.supabase.com and blocks unusual/empty user agents
    // with error 1010. Any normal UA is fine. Matches apply_migrations.py.
    "User-Agent": "unclick-mcp/1.0 (+https://unclick.world)",
  };
  const init: RequestInit = { method, headers };
  if (opts?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(opts.body);
  }
  const TIMEOUT_MS = Number(process.env.SUPABASE_MGMT_TIMEOUT_MS) || 60000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  init.signal = controller.signal;
  let res: Response;
  try {
    res = await fetch(`${SUPABASE_MGMT_BASE}${path}`, init);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Supabase Management API timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Supabase network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid Supabase access token (expired or wrong token).");
  if (res.status === 403) {
    throw new Error("Supabase: access forbidden. The token needs management scope for this project.");
  }
  if (res.status === 404) throw new Error(`Supabase: not found at ${path} (check the project ref).`);
  if (res.status === 429) throw new Error("Supabase rate limit exceeded. Retry shortly.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase Management API HTTP ${res.status}: ${body || res.statusText}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// ─── Destructive-statement guard (the "safety check in the middle") ─────────
//
// SQL is hard to parse perfectly, so this is deliberately conservative: it
// flags statements that can destroy or expose data and refuses to run them
// unless the caller passes confirm: true. Additive/DDL-create statements and
// plain reads pass through freely.

const DESTRUCTIVE_PATTERNS: Array<{ rule: RegExp; why: string }> = [
  { rule: /\bdrop\s+(table|schema|database|view|function|index|type|role|policy)\b/i, why: "DROP removes objects permanently" },
  { rule: /\btruncate\b/i, why: "TRUNCATE empties a table irreversibly" },
  { rule: /\bdelete\s+from\b(?![\s\S]*\bwhere\b)/i, why: "DELETE without a WHERE clause wipes every row" },
  { rule: /\bupdate\b[\s\S]*\bset\b(?![\s\S]*\bwhere\b)/i, why: "UPDATE without a WHERE clause rewrites every row" },
  { rule: /\balter\s+table\b[\s\S]*\bdrop\s+column\b/i, why: "ALTER TABLE DROP COLUMN destroys a column and its data" },
  { rule: /\b(grant|revoke)\b/i, why: "GRANT/REVOKE changes who can access data" },
];

export interface SqlGuardVerdict {
  destructive: boolean;
  reasons: string[];
}

export function inspectSql(sql: string): SqlGuardVerdict {
  const reasons: string[] = [];
  for (const { rule, why } of DESTRUCTIVE_PATTERNS) {
    if (rule.test(sql)) reasons.push(why);
  }
  return { destructive: reasons.length > 0, reasons };
}

// ─── supabase_execute_sql ───────────────────────────────────────
// Run arbitrary SQL against the caller's project via the Management API.
// Destructive statements require confirm: true.
export async function executeSupabaseSql(args: Record<string, unknown>): Promise<unknown> {
  try {
    // Cheap validation and the safety guard run BEFORE credential resolution,
    // so the caller gets a useful answer (and destructive SQL is refused) even
    // if no token is supplied, and nothing destructive depends on auth state.
    const ref = projectRef(args);
    const sql = String(args.sql ?? args.query ?? "").trim();
    if (!ref) return { error: "project_ref is required (the xxxxx from xxxxx.supabase.co)." };
    if (!sql) return { error: "sql is required." };

    const verdict = inspectSql(sql);
    if (verdict.destructive && args.confirm !== true) {
      return {
        error: "This SQL looks destructive and was blocked.",
        reasons: verdict.reasons,
        how_to_proceed: "Re-run with confirm: true if you are sure.",
        blocked_sql_preview: sql.slice(0, 400),
      };
    }

    const token = getAccessToken(args);
    if (typeof token !== "string") return token;

    const rows = await managementRequest(token, "POST", `/projects/${ref}/database/query`, {
      body: { query: sql },
    });
    return stampMeta(
      {
        ok: true,
        destructive: verdict.destructive,
        rows: Array.isArray(rows) ? rows : rows == null ? [] : [rows],
        row_count: Array.isArray(rows) ? rows.length : rows == null ? 0 : 1,
      },
      {
        source: "Supabase Management API",
        fetched_at: new Date().toISOString(),
        next_steps: ["Use supabase_apply_migration to run + record a versioned migration file."],
      }
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── supabase_apply_migration ───────────────────────────────────
// Run a versioned migration and record it in public._claude_migrations so it is
// applied at most once. Mirrors .github/scripts/apply_migrations.py exactly, so
// migrations applied through this tool and through CI share one ledger.
export async function applySupabaseMigration(args: Record<string, unknown>): Promise<unknown> {
  try {
    const ref = projectRef(args);
    const version = String(args.version ?? "").trim();
    const name = String(args.name ?? args.filename ?? "").trim();
    const sql = String(args.sql ?? args.query ?? "").trim();
    if (!ref) return { error: "project_ref is required." };
    if (!/^\d{14}$/.test(version)) {
      return { error: "version is required and must be a 14-digit timestamp (e.g. 20260625120000)." };
    }
    if (!sql) return { error: "sql is required." };

    const token = getAccessToken(args);
    if (typeof token !== "string") return token;

    const run = (query: string) =>
      managementRequest(token, "POST", `/projects/${ref}/database/query`, { body: { query } });

    // 1. Ensure the shared bookkeeping table exists (same shape as the CI script).
    await run(
      `CREATE TABLE IF NOT EXISTS public._claude_migrations (
        version    TEXT        PRIMARY KEY,
        filename   TEXT        NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );`
    );

    // 2. Skip if already applied (idempotent, like CI).
    const applied = (await run(
      `SELECT version FROM public._claude_migrations WHERE version = '${version.replace(/'/g, "''")}';`
    )) as Array<{ version: string }> | null;
    if (Array.isArray(applied) && applied.length > 0) {
      return stampMeta(
        { ok: true, already_applied: true, version },
        { source: "Supabase Management API", fetched_at: new Date().toISOString(), next_steps: [] }
      );
    }

    // 3. Run the migration SQL, then record it.
    await run(sql);
    const safeName = (name || `${version}.sql`).replace(/'/g, "''");
    await run(
      `INSERT INTO public._claude_migrations (version, filename)
       VALUES ('${version}', '${safeName}')
       ON CONFLICT (version) DO NOTHING;`
    );

    return stampMeta(
      { ok: true, already_applied: false, version, filename: name || `${version}.sql` },
      {
        source: "Supabase Management API",
        fetched_at: new Date().toISOString(),
        next_steps: ["The migration is recorded in public._claude_migrations and will be skipped next time."],
      }
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
