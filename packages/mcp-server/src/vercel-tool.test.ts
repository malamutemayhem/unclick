import { afterEach, describe, expect, it, vi } from "vitest";
import { vercelProjectIdArg, listVercelDeployments, getVercelDeployment, listVercelProjects } from "./vercel-tool.js";

describe("vercelProjectIdArg", () => {
  it("uses project_id as the canonical key", () => {
    expect(vercelProjectIdArg({ project_id: " prj_canonical " })).toBe("prj_canonical");
  });

  it("accepts projectId as a legacy alias", () => {
    expect(vercelProjectIdArg({ projectId: " prj_legacy " })).toBe("prj_legacy");
  });
});

// L2 resilience contract for the Vercel connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("vercel connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}), text: async () => "",
    })));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getVercelDeployment({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/id is required/i);
  });

  it("maps deployment listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ deployments: [{ uid: "d1", name: "app", state: "READY" }], pagination: {} }),
    })));
    const result = await listVercelDeployments({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.deployments as Array<Record<string, unknown>>)[0].uid).toBe("d1");
  });
});

// Team-scoping contract: a Vercel token can belong to a personal account AND
// teams. The list calls must fan out across personal + every team so projects
// that live under a team are not silently dropped (the count:0 bug).
describe("vercel team-scoped listing", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  // Minimal fetch-Response stand-in with an explicitly typed header getter so
  // strict tsc does not flag the inline `get` as implicit-any.
  function res(body: unknown, init: { ok?: boolean; status?: number } = {}) {
    return {
      ok: init.ok ?? true,
      status: init.status ?? 200,
      headers: { get: (_name: string): string | null => null },
      json: async () => body,
      text: async () => "",
    };
  }

  it("aggregates projects across personal + discovered teams when no team_id is given", async () => {
    const requested: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      requested.push(url);
      if (url.includes("/v2/teams")) {
        return res({ teams: [{ id: "team_abc" }] });
      }
      // Personal scope (no teamId) is empty; the team scope holds the project.
      if (url.includes("/v9/projects") && url.includes("teamId=team_abc")) {
        return res({ projects: [{ id: "prj_1", name: "unclick-agent-native-endpoints" }] });
      }
      return res({ projects: [] });
    }));

    const result = await listVercelProjects({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    const projects = result.projects as Array<Record<string, unknown>>;
    expect(projects[0].name).toBe("unclick-agent-native-endpoints");
    expect(projects[0].team_id).toBe("team_abc");
    expect(requested.some((u) => u.includes("/v2/teams"))).toBe(true);
    expect(requested.some((u) => u.includes("/v9/projects") && !u.includes("teamId="))).toBe(true);
  });

  it("honors an explicit team_id without discovering teams or querying personal scope", async () => {
    const requested: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      requested.push(url);
      return res({ projects: [{ id: "prj_team", name: "team-only" }] });
    }));

    const result = await listVercelProjects({ api_key: "k", team_id: "team_pinned" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.projects as Array<Record<string, unknown>>)[0].team_id).toBe("team_pinned");
    // No team discovery and no personal-scope call when a team_id is pinned.
    expect(requested.some((u) => u.includes("/v2/teams"))).toBe(false);
    expect(requested.every((u) => u.includes("teamId=team_pinned"))).toBe(true);
  });

  it("falls back to personal scope when team discovery is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/v2/teams")) {
        // No team-read scope on this token.
        return res({}, { ok: false, status: 403 });
      }
      return res({ projects: [{ id: "prj_personal", name: "personal-app" }] });
    }));

    const result = await listVercelProjects({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.projects as Array<Record<string, unknown>>)[0].name).toBe("personal-app");
  });
});
