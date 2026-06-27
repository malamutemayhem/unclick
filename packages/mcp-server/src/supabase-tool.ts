// Supabase Management API read tools.
// Docs: https://supabase.com/docs/reference/api/introduction
// OpenAPI: https://api.supabase.com/api/v1-json

import { requireCredential } from "./connector-setup.js";
import { stampMeta } from "./connector-meta.js";
import { type NotConnectedResult } from "./connection-help.js";
import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

const SUPABASE_MANAGEMENT_BASE = "https://api.supabase.com";

type ResolvedCredential = { token: string; shouldMarkProof: boolean };
type CredentialResult = ResolvedCredential | NotConnectedResult | Record<string, unknown>;

function isResolvedCredential(value: CredentialResult): value is ResolvedCredential {
  return typeof (value as { token?: unknown }).token === "string";
}

async function getSupabaseToken(args: Record<string, unknown>): Promise<CredentialResult> {
  const inline = String(args.access_token ?? args.api_key ?? "").trim();
  if (inline) return { token: inline, shouldMarkProof: false };

  const resolved = await resolveCredentials("supabase", args);
  if (!("error" in resolved)) {
    const token = String(resolved.access_token ?? resolved.api_key ?? "").trim();
    if (token) return { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) };
  }

  const fallback = requireCredential("supabase", args);
  return typeof fallback === "string"
    ? { token: fallback, shouldMarkProof: false }
    : fallback;
}

async function supabaseRequest(
  token: string,
  path: string,
  params?: Record<string, string>,
): Promise<unknown> {
  const query = params && Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const timeoutMs = Number(process.env.SUPABASE_MANAGEMENT_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_MANAGEMENT_BASE}${path}${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Supabase request timed out after ${timeoutMs}ms.`);
    }
    throw new Error(`Supabase network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 401) {
    throw new Error("Invalid or expired Supabase token. Reconnect Supabase in UnClick Apps.");
  }
  if (res.status === 403) {
    throw new Error("Supabase access forbidden. Reconnect Supabase and allow Management API project and organization read access.");
  }
  if (res.status === 404) throw new Error(`Supabase resource not found at ${path}.`);
  if (res.status === 429) throw new Error("Supabase rate limit exceeded.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase HTTP ${res.status}: ${body || res.statusText}`);
  }

  return res.json();
}

function arrayFromApi(data: unknown, fallbackKey: string): Record<string, unknown>[] {
  if (Array.isArray(data)) return data.filter((item): item is Record<string, unknown> => item !== null && typeof item === "object" && !Array.isArray(item));
  if (data && typeof data === "object" && Array.isArray((data as Record<string, unknown>)[fallbackKey])) {
    return ((data as Record<string, unknown>)[fallbackKey] as unknown[])
      .filter((item): item is Record<string, unknown> => item !== null && typeof item === "object" && !Array.isArray(item));
  }
  return [];
}

export async function listSupabaseProjects(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getSupabaseToken(args);
    if (!isResolvedCredential(token)) return token;

    const params: Record<string, string> = {};
    if (args.organization_id) params.organization_id = String(args.organization_id);

    const data = await supabaseRequest(token.token, "/v1/projects", params);
    const projects = arrayFromApi(data, "projects");
    if (token.shouldMarkProof) await markCredentialLiveTested("supabase");
    return stampMeta({
      count: projects.length,
      projects: projects.map((project) => ({
        id: project.id,
        ref: project.ref,
        name: project.name,
        organization_id: project.organization_id,
        region: project.region,
        status: project.status,
        database: project.database,
        created_at: project.created_at,
      })),
      raw: data,
    }, {
      source: "Supabase Management API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use supabase_get_project with a project_ref for full project details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function getSupabaseProject(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getSupabaseToken(args);
    if (!isResolvedCredential(token)) return token;
    const projectRef = String(args.project_ref ?? args.ref ?? "").trim();
    if (!projectRef) return { error: "project_ref is required." };

    const data = await supabaseRequest(token.token, `/v1/projects/${encodeURIComponent(projectRef)}`);
    if (token.shouldMarkProof) await markCredentialLiveTested("supabase");
    return stampMeta({
      project_ref: projectRef,
      project: data,
    }, {
      source: "Supabase Management API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use supabase_list_projects to discover other project refs."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function listSupabaseOrganizations(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getSupabaseToken(args);
    if (!isResolvedCredential(token)) return token;

    const data = await supabaseRequest(token.token, "/v1/organizations");
    const organizations = arrayFromApi(data, "organizations");
    if (token.shouldMarkProof) await markCredentialLiveTested("supabase");
    return stampMeta({
      count: organizations.length,
      organizations: organizations.map((organization) => ({
        id: organization.id,
        slug: organization.slug,
        name: organization.name,
      })),
      raw: data,
    }, {
      source: "Supabase Management API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use supabase_list_projects to list projects visible to this account."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// --- Write tools: run SQL + apply migrations (Supabase Management API) ---
// Per-user credential via the keychain (reuses getSupabaseToken above). A
// destructive-statement guard blocks anything that can wipe or expose data
// unless the caller explicitly passes confirm: true.

const SUPABASE_DESTRUCTIVE_SQL: Array<{ rule: RegExp; why: string }> = [
  { rule: /\bdrop\s+(table|schema|database|view|function|index|type|role|policy)\b/i, why: "DROP removes objects permanently" },
  { rule: /\btruncate\b/i, why: "TRUNCATE empties a table irreversibly" },
  { rule: /\bdelete\s+from\b(?![\s\S]*\bwhere\b)/i, why: "DELETE without a WHERE clause wipes every row" },
  { rule: /\bupdate\b[\s\S]*\bset\b(?![\s\S]*\bwhere\b)/i, why: "UPDATE without a WHERE clause rewrites every row" },
  { rule: /\balter\s+table\b[\s\S]*\bdrop\s+column\b/i, why: "ALTER TABLE DROP COLUMN destroys a column and its data" },
  { rule: /\b(grant|revoke)\b/i, why: "GRANT/REVOKE changes who can access data" },
];

export function inspectSupabaseSql(sql: string): { destructive: boolean; reasons: string[] } {
  const reasons: string[] = [];
  for (const { rule, why } of SUPABASE_DESTRUCTIVE_SQL) if (rule.test(sql)) reasons.push(why);
  return { destructive: reasons.length > 0, reasons };
}

async function supabasePost(token: string, path: string, body: unknown): Promise<unknown> {
  const timeoutMs = Number(process.env.SUPABASE_MANAGEMENT_TIMEOUT_MS) || 30000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_MANAGEMENT_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "unclick-mcp/1.0 (+https://unclick.world)",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Supabase request timed out after ${timeoutMs}ms.`);
    }
    throw new Error(`Supabase network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 401) throw new Error("Invalid or expired Supabase token. Reconnect Supabase in UnClick Apps.");
  if (res.status === 403) throw new Error("Supabase access forbidden. The token needs Management API write access for this project.");
  if (res.status === 404) throw new Error(`Supabase resource not found at ${path} (check the project ref).`);
  if (res.status === 429) throw new Error("Supabase rate limit exceeded.");
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Supabase HTTP ${res.status}: ${errBody || res.statusText}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

// supabase_execute_sql: run an arbitrary SQL statement against a project's database.
export async function executeSupabaseSql(args: Record<string, unknown>): Promise<unknown> {
  try {
    const projectRef = String(args.project_ref ?? args.ref ?? "").trim();
    const sql = String(args.sql ?? args.query ?? "").trim();
    if (!projectRef) return { error: "project_ref is required (the xxxx in xxxx.supabase.co)." };
    if (!sql) return { error: "sql is required." };

    const verdict = inspectSupabaseSql(sql);
    if (verdict.destructive && args.confirm !== true) {
      return {
        error: "This SQL looks destructive and was blocked.",
        reasons: verdict.reasons,
        how_to_proceed: "Re-run with confirm: true if you are sure.",
        blocked_sql_preview: sql.slice(0, 400),
      };
    }

    const token = await getSupabaseToken(args);
    if (!isResolvedCredential(token)) return token;

    const data = await supabasePost(token.token, `/v1/projects/${encodeURIComponent(projectRef)}/database/query`, { query: sql });
    if (token.shouldMarkProof) await markCredentialLiveTested("supabase");
    const rows = Array.isArray(data) ? data : data == null ? [] : [data];
    return stampMeta({
      ok: true,
      project_ref: projectRef,
      destructive: verdict.destructive,
      row_count: rows.length,
      rows,
    }, {
      source: "Supabase Management API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use supabase_apply_migration to run and record a versioned migration."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// supabase_apply_migration: run a named, tracked migration against a project's database.
export async function applySupabaseMigration(args: Record<string, unknown>): Promise<unknown> {
  try {
    const projectRef = String(args.project_ref ?? args.ref ?? "").trim();
    const name = String(args.name ?? args.filename ?? "").trim();
    const sql = String(args.sql ?? args.query ?? "").trim();
    if (!projectRef) return { error: "project_ref is required." };
    if (!name) return { error: "name is required (a short snake_case migration name)." };
    if (!sql) return { error: "sql is required." };

    const token = await getSupabaseToken(args);
    if (!isResolvedCredential(token)) return token;

    const data = await supabasePost(token.token, `/v1/projects/${encodeURIComponent(projectRef)}/database/migrations`, { name, query: sql });
    if (token.shouldMarkProof) await markCredentialLiveTested("supabase");
    return stampMeta({
      ok: true,
      applied: true,
      project_ref: projectRef,
      name,
      result: data,
    }, {
      source: "Supabase Management API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use supabase_execute_sql with a SELECT to verify the change landed."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
