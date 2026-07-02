// Vercel deployment management API.
// Docs: https://vercel.com/docs/rest-api
// Auth: VERCEL_TOKEN (Bearer)
// Base: https://api.vercel.com/

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";
const VERCEL_BASE = "https://api.vercel.com";

type VercelAuth = { token: string; shouldMarkProof: boolean };
type VercelAuthResult = VercelAuth | NotConnectedResult | Record<string, unknown>;

function isVercelAuth(auth: VercelAuthResult): auth is VercelAuth {
  return typeof (auth as { token?: unknown }).token === "string";
}

async function getApiKey(args: Record<string, unknown>): Promise<VercelAuthResult> {
  const resolved = await resolveCredentials("vercel", args);
  if (!("error" in resolved)) {
    const token = String(resolved.api_key ?? resolved.access_token ?? "").trim();
    if (token) return { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) };
  }
  const fallback = requireCredential("vercel", args);
  return typeof fallback === "string"
    ? { token: fallback, shouldMarkProof: false }
    : fallback;
}

async function vercelRequest(
  auth: VercelAuth,
  method: "GET" | "POST" | "DELETE" | "PATCH",
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown }
): Promise<Record<string, unknown>> {
  const qs = opts?.params ? "?" + new URLSearchParams(opts.params).toString() : "";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${auth.token}`,
  };
  const init: RequestInit = { method, headers };
  if (opts?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(opts.body);
  }
  const VERCEL_TIMEOUT_MS = Number(process.env.VERCEL_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), VERCEL_TIMEOUT_MS);
  init.signal = controller.signal;
  let res: Response;
  try {
    res = await fetch(`${VERCEL_BASE}${path}${qs}`, init);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Vercel request timed out after ${VERCEL_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Vercel network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid Vercel token.");
  if (res.status === 403) throw new Error("Vercel: access forbidden. Check token scopes.");
  if (res.status === 404) throw new Error(`Vercel: resource not found at ${path}.`);
  if (res.status === 409) {
    const body = await res.text().catch(() => "");
    throw new Error(`Vercel conflict (409): ${body || "resource already exists."}`);
  }
  if (res.status === 429) throw new Error("Vercel rate limit exceeded.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Vercel HTTP ${res.status}: ${body || res.statusText}`);
  }
  if (auth.shouldMarkProof) await markCredentialLiveTested("vercel");
  // 204 No Content (e.g. DELETE) returns empty body
  if (res.status === 204) return {};
  return res.json() as Promise<Record<string, unknown>>;
}

// Backwards-compat shim for existing callers below.
async function vercelGet(
  auth: VercelAuth,
  path: string,
  params?: Record<string, string>
): Promise<Record<string, unknown>> {
  return vercelRequest(auth, "GET", path, { params });
}

// A Vercel token can belong to a personal account AND one or more teams. The
// REST API scopes list calls to the personal account unless `teamId` is passed,
// so a user whose projects/deployments live under a team gets an empty list
// without it. discoverTeamIds fetches the caller's teams once so the project and
// deployment list calls can fan out across personal + every team scope.
//
// explicitTeamId short-circuits everything: when the caller pins a team_id we
// honor exactly that scope (no discovery, no personal scope) so a targeted query
// stays cheap and predictable. A team listing failure is swallowed - we still
// return the personal-scope results rather than erroring the whole call.
function explicitTeamId(args: Record<string, unknown>): string {
  return String(args.team_id ?? args.teamId ?? "").trim();
}

async function discoverTeamIds(auth: VercelAuth): Promise<string[]> {
  try {
    const data = await vercelGet(auth, "/v2/teams", { limit: "100" });
    const teams = (data.teams as Array<Record<string, unknown>>) ?? [];
    return teams
      .map((t) => String(t.id ?? "").trim())
      .filter(Boolean);
  } catch {
    // No team-read scope or a transient miss: fall back to personal scope only.
    return [];
  }
}

// Returns the set of scopes to query. When a team_id is pinned, that is the only
// scope. Otherwise: personal (no teamId) plus every discovered team.
async function listScopes(auth: VercelAuth, args: Record<string, unknown>): Promise<Array<string | null>> {
  const pinned = explicitTeamId(args);
  if (pinned) return [pinned];
  const teamIds = await discoverTeamIds(auth);
  return [null, ...teamIds];
}

// list_vercel_deployments
export async function listVercelDeployments(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const baseParams: Record<string, string> = {};
    if (args.app) baseParams.app = String(args.app);
    if (args.limit) baseParams.limit = String(args.limit);
    if (args.project_id) baseParams.projectId = String(args.project_id);
    if (args.state) baseParams.state = String(args.state);

    const scopes = await listScopes(token, args);
    const seen = new Set<string>();
    const deployments: Array<Record<string, unknown>> = [];
    let pagination: unknown;
    for (const scope of scopes) {
      const params = { ...baseParams, ...(scope ? { teamId: scope } : {}) };
      const data = await vercelGet(token, "/v6/deployments", params);
      pagination = pagination ?? data.pagination;
      for (const d of (data.deployments as Array<Record<string, unknown>>) ?? []) {
        const uid = String(d.uid ?? "");
        if (uid && seen.has(uid)) continue;
        if (uid) seen.add(uid);
        deployments.push({
          uid: d.uid,
          name: d.name,
          url: d.url,
          state: d.state,
          ready_state: d.readyState,
          created: d.created,
          ready: d.ready,
          target: d.target,
          team_id: scope ?? null,
          creator: (d.creator as Record<string, unknown> | undefined)?.email,
          meta: d.meta,
        });
      }
    }
    return stampMeta({
      count: deployments.length,
      pagination,
      deployments,
    }, {
      source: "Vercel",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use vercel_get_deployment for full detail, or vercel_list_projects for projects."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// get_vercel_deployment
export async function getVercelDeployment(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const id = String((args.deploymentId ?? args.id) ?? "").trim();
    if (!id) return { error: "id is required." };
    const params: Record<string, string> = {};
    if (args.team_id) params.teamId = String(args.team_id);
    const data = await vercelGet(token, `/v13/deployments/${id}`, params);
    return {
      uid: data.uid,
      name: data.name,
      url: data.url,
      state: data.state,
      ready_state: data.readyState,
      created: data.created,
      ready: data.ready,
      building: data.building,
      target: data.target,
      type: data.type,
      regions: data.regions,
      creator: (data.creator as Record<string, unknown> | undefined)?.email,
      error: data.errorCode
        ? { code: data.errorCode, message: data.errorMessage }
        : null,
      meta: data.meta,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// list_vercel_projects
export async function listVercelProjects(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const baseParams: Record<string, string> = {};
    if (args.limit) baseParams.limit = String(args.limit);
    if (args.search) baseParams.search = String(args.search);

    // Vercel scopes /v9/projects to the personal account unless teamId is
    // passed, so a team user sees count:0 without it. Fan out across personal +
    // every team the token can read (unless the caller pinned a team_id).
    const scopes = await listScopes(token, args);
    const seen = new Set<string>();
    const projects: Array<Record<string, unknown>> = [];
    let pagination: unknown;
    for (const scope of scopes) {
      const params = { ...baseParams, ...(scope ? { teamId: scope } : {}) };
      const data = await vercelGet(token, "/v9/projects", params);
      pagination = pagination ?? data.pagination;
      for (const p of (data.projects as Array<Record<string, unknown>>) ?? []) {
        const id = String(p.id ?? "");
        if (id && seen.has(id)) continue;
        if (id) seen.add(id);
        projects.push({
          id: p.id,
          name: p.name,
          framework: p.framework,
          node_version: p.nodeVersion,
          team_id: scope ?? null,
          updated_at: p.updatedAt,
          created_at: p.createdAt,
          latest_deployments: ((p.latestDeployments as Array<Record<string, unknown>>) ?? []).slice(0, 3).map((d) => ({
            uid: d.uid,
            url: d.url,
            state: d.readyState,
            target: d.target,
          })),
        });
      }
    }
    return {
      count: projects.length,
      pagination,
      projects,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// get_vercel_domain
export async function getVercelDomain(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const domain = String(args.domain ?? "").trim();
    if (!domain) return { error: "domain is required." };
    const params: Record<string, string> = {};
    if (args.team_id) params.teamId = String(args.team_id);
    const data = await vercelGet(token, `/v5/domains/${domain}`, params);
    const d = data.domain as Record<string, unknown> | undefined;
    return {
      name: d?.name,
      apex: d?.apexName,
      project_id: d?.projectId,
      verified: d?.verified,
      ns_verified_at: d?.nsVerifiedAt,
      cname_target: d?.cnamTarget,
      service_type: d?.serviceType,
      bought_at: d?.boughtAt,
      expires_at: d?.expiresAt,
      dns: d?.dns,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export function vercelProjectIdArg(args: Record<string, unknown>): string {
  return String(args.project_id ?? args.projectId ?? "").trim();
}

// get_vercel_env
export async function getVercelEnv(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const projectId = vercelProjectIdArg(args);
    if (!projectId) return { error: "project_id is required." };
    const params: Record<string, string> = {};
    if (args.team_id) params.teamId = String(args.team_id);
    if (args.decrypt) params.decrypt = "true";
    const data = await vercelGet(token, `/v9/projects/${projectId}/env`, params);
    const envs = (data.envs as Array<Record<string, unknown>>) ?? [];
    return {
      count: envs.length,
      env: envs.map((e) => ({
        id: e.id,
        key: e.key,
        value: e.value,
        type: e.type,
        target: e.target,
        git_branch: e.gitBranch,
        created_at: e.createdAt,
        updated_at: e.updatedAt,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// create_vercel_env
// Adds a single environment variable to a Vercel project.
// POST /v10/projects/{projectId}/env
// Accepts target as a CSV string ("production,preview,development") or an array.
// type defaults to "plain"; use "encrypted" for secrets or "sensitive" for
// reveal-once values.
export async function createVercelEnv(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const projectId = String(args.project_id ?? "").trim();
    const key = String(args.key ?? "").trim();
    const value = args.value === undefined ? "" : String(args.value);
    if (!projectId) return { error: "project_id is required." };
    if (!key) return { error: "key is required." };
    if (value === "") return { error: "value is required (use an empty string explicitly if intentional)." };

    // Normalize target: accept "production" | "production,preview" | ["production", "preview"]
    let target: string[];
    if (Array.isArray(args.target)) {
      target = (args.target as unknown[]).map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof args.target === "string" && args.target.trim()) {
      target = args.target.split(",").map((t) => t.trim()).filter(Boolean);
    } else {
      // Sensible default: all three environments.
      target = ["production", "preview", "development"];
    }
    const validTargets = new Set(["production", "preview", "development"]);
    for (const t of target) {
      if (!validTargets.has(t)) {
        return { error: `Invalid target "${t}". Must be production, preview, or development.` };
      }
    }

    const type = String(args.type ?? "plain");
    if (!["plain", "encrypted", "sensitive", "secret", "system"].includes(type)) {
      return { error: `Invalid type "${type}".` };
    }

    const body: Record<string, unknown> = { key, value, type, target };
    if (args.comment) body.comment = String(args.comment);
    if (args.git_branch) body.gitBranch = String(args.git_branch);

    const params: Record<string, string> = {};
    if (args.team_id) params.teamId = String(args.team_id);
    // upsert=true lets us overwrite an existing value for the same key/target
    // combination instead of 409-ing. Matches the "just make it so" mental
    // model most agent flows want.
    if (args.upsert !== false) params.upsert = "true";

    const data = await vercelRequest(token, "POST", `/v10/projects/${projectId}/env`, {
      params,
      body,
    });
    // Response shape varies: single item under data.created OR an array.
    const created =
      (data.created as Array<Record<string, unknown>> | Record<string, unknown> | undefined) ??
      data;
    return { ok: true, created };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// delete_vercel_env
// Removes an environment variable by its env id.
// DELETE /v9/projects/{projectId}/env/{envId}
export async function deleteVercelEnv(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const projectId = String(args.project_id ?? "").trim();
    const envId = String(args.env_id ?? "").trim();
    if (!projectId) return { error: "project_id is required." };
    if (!envId) return { error: "env_id is required (get it from vercel_get_env)." };
    const params: Record<string, string> = {};
    if (args.team_id) params.teamId = String(args.team_id);
    await vercelRequest(token, "DELETE", `/v9/projects/${projectId}/env/${envId}`, { params });
    return { ok: true, deleted: envId };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// create_vercel_deployment
// Creates a new deployment, typically to redeploy the latest commit on a
// project, with optional build-cache skipping (the common "cache-off
// redeploy" use case when new serverless functions or env vars need to
// take effect).
// POST /v13/deployments
// Two modes:
//   1. Redeploy an existing deployment: pass { deployment_id }
//      Resolves that deployment, grabs its gitSource, and submits a fresh
//      deploy from the same commit.
//   2. Fresh deploy from git: pass { project_id, git_ref } (branch name or
//      SHA). Uses projects API to discover the repo's gitRepository.
// Pass force_new: true to disable build cache.
export async function createVercelDeployment(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = await getApiKey(args);
    if (!isVercelAuth(token)) return token;
    const teamParam: Record<string, string> = {};
    if (args.team_id) teamParam.teamId = String(args.team_id);
    const forceNew = args.force_new === true || args.force_new === "true";
    const target = args.target === undefined ? "production" : String(args.target);

    let name = args.name ? String(args.name) : "";
    let gitSource: Record<string, unknown> | undefined;
    let meta: Record<string, unknown> | undefined;

    if (args.deployment_id) {
      // Mode 1: redeploy existing
      const depId = String(args.deployment_id).trim();
      const dep = await vercelRequest(token, "GET", `/v13/deployments/${depId}`, {
        params: teamParam,
      });
      name = name || String(dep.name ?? "");
      gitSource = dep.gitSource as Record<string, unknown> | undefined;
      meta = dep.meta as Record<string, unknown> | undefined;
      if (!gitSource) {
        return {
          error: "Source deployment has no gitSource; can't redeploy. Try fresh deploy mode instead.",
        };
      }
    } else if (args.project_id) {
      // Mode 2: fresh deploy from git
      const projectId = String(args.project_id).trim();
      const proj = await vercelRequest(token, "GET", `/v9/projects/${projectId}`, {
        params: teamParam,
      });
      name = name || String(proj.name ?? "");
      const link = proj.link as Record<string, unknown> | undefined;
      if (!link) {
        return { error: "Project is not linked to a git repo; can't deploy from git." };
      }
      const ref = args.git_ref ? String(args.git_ref) : "main";
      gitSource = {
        type: (link.type as string) ?? "github",
        repoId: link.repoId,
        ref,
      };
    } else {
      return { error: "Provide either deployment_id (redeploy) or project_id (fresh deploy)." };
    }

    if (!name) return { error: "Could not determine project name." };

    const body: Record<string, unknown> = {
      name,
      target,
      gitSource,
    };
    if (meta) body.meta = meta;
    // forceNew=1 tells Vercel to skip the build cache for this deployment.
    const params: Record<string, string> = { ...teamParam };
    if (forceNew) params.forceNew = "1";

    const data = await vercelRequest(token, "POST", "/v13/deployments", { params, body });
    return {
      ok: true,
      uid: data.uid ?? data.id,
      url: data.url,
      state: data.readyState ?? data.status,
      target: data.target,
      inspector_url: data.inspectorUrl,
      force_new: forceNew,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
