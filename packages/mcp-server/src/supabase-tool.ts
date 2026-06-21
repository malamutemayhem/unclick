// Supabase Management API read tools.
// Docs: https://supabase.com/docs/reference/api/introduction
// OpenAPI: https://api.supabase.com/api/v1-json

import { requireCredential } from "./connector-setup.js";
import { stampMeta } from "./connector-meta.js";
import { type NotConnectedResult } from "./connection-help.js";
import { resolveCredentials } from "./vault-bridge.js";

const SUPABASE_MANAGEMENT_BASE = "https://api.supabase.com";

type CredentialResult = string | NotConnectedResult | Record<string, unknown>;

async function getSupabaseToken(args: Record<string, unknown>): Promise<CredentialResult> {
  const inline = String(args.access_token ?? args.api_key ?? "").trim();
  if (inline) return inline;

  const resolved = await resolveCredentials("supabase", args);
  if (!("error" in resolved)) {
    const token = String(resolved.access_token ?? resolved.api_key ?? "").trim();
    if (token) return token;
  }

  return requireCredential("supabase", args);
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
    throw new Error("Supabase access forbidden. Reconnect Supabase and grant read access to projects and organizations.");
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
    if (typeof token !== "string") return token;

    const params: Record<string, string> = {};
    if (args.organization_id) params.organization_id = String(args.organization_id);

    const data = await supabaseRequest(token, "/v1/projects", params);
    const projects = arrayFromApi(data, "projects");
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
    if (typeof token !== "string") return token;
    const projectRef = String(args.project_ref ?? args.ref ?? "").trim();
    if (!projectRef) return { error: "project_ref is required." };

    const data = await supabaseRequest(token, `/v1/projects/${encodeURIComponent(projectRef)}`);
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
    if (typeof token !== "string") return token;

    const data = await supabaseRequest(token, "/v1/organizations");
    const organizations = arrayFromApi(data, "organizations");
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
