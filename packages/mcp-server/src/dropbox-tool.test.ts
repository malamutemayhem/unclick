import { afterEach, describe, expect, it, vi } from "vitest";
import {
  dropboxGetAccount,
  dropboxListFolder,
  dropboxSearch,
  unclickWorkspaceList,
  unclickWorkspaceRead,
  unclickWorkspaceWrite,
} from "./dropbox-tool.js";
import { runWithRequestContext } from "./memory/request-context.js";
describe("dropbox (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" }))); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(dropboxListFolder({ access_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("UNCLICK_API_KEY", ""); const r = await dropboxListFolder({}) as Record<string, unknown>; expect(r.error).toMatch(/credentials not configured/i); expect((r.setup as Record<string, unknown>).web).toBe("https://unclick.world/connect/dropbox"); });
  it("validates query", async () => { const r = await dropboxSearch({ access_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => '{"entries":[]}' }))); const r = await dropboxListFolder({ access_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Dropbox/); });
  it("writes live proof after a stored UnClick credential succeeds", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "uc_test");
    vi.stubEnv("UNCLICK_API_URL", "https://unclick.test");
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://unclick.test/api/credentials?platform=dropbox") {
        return { ok: true, status: 200, json: async () => ({ access_token: "stored_dropbox" }) };
      }
      if (url === "https://api.dropboxapi.com/2/users/get_current_account") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer stored_dropbox");
        return { ok: true, status: 200, text: async () => "{\"account_id\":\"dbid:1\"}" };
      }
      if (url === "https://unclick.test/api/credentials") {
        expect(init?.method).toBe("PATCH");
        expect(String(init?.body)).toContain("\"platform\":\"dropbox\"");
        return { ok: true, status: 200, json: async () => ({ success: true }) };
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await dropboxGetAccount({}) as Record<string, unknown>;

    expect(result.unclick_meta).toMatchObject({ source: "Dropbox API v2" });
    expect(fetchMock.mock.calls.map(([input]) => String(input))).toContain("https://unclick.test/api/credentials");
  });
});

describe("restricted UnClick Dropbox workspace", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("rejects path traversal before resolving any credential", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await unclickWorkspaceList({ area: "context", relative_path: "../Credentials" }) as Record<string, unknown>;

    expect(result.error).toMatch(/traversal/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not let a personal Dropbox token substitute for the master workspace", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await runWithRequestContext({ apiKey: "" }, () => unclickWorkspaceRead({
      area: "context",
      relative_path: "project.md",
      access_token: "personal-token-must-not-be-used",
    })) as Record<string, unknown>;

    expect(result.error).toMatch(/restricted UnClick Dropbox workspace/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses the master connector only for an allowlisted write and never returns its token", async () => {
    vi.stubEnv("UNCLICK_API_URL", "https://unclick.test");
    vi.stubEnv("UNCLICK_SYSTEM_CONNECTOR_BROKER_SECRET", "broker-test-secret");
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://unclick.test/api/system-connectors?action=resolve&provider=dropbox") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer signed-superuser-session");
        expect((init?.headers as Record<string, string>)["X-UnClick-System-Connector-Broker"]).toBe("broker-test-secret");
        return new Response(JSON.stringify({ credentials: { access_token: "master-dropbox-token" } }), { status: 200 });
      }
      if (url === "https://content.dropboxapi.com/2/files/upload") {
        expect((init?.headers as Record<string, string>)["Dropbox-API-Arg"]).toContain('"path":"/UnClick/Context/status.md"');
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer master-dropbox-token");
        expect(init?.body).toBe("ready");
        return new Response(JSON.stringify({ name: "status.md", path_display: "/UnClick/Context/status.md" }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runWithRequestContext({ sessionToken: "signed-superuser-session" }, () => unclickWorkspaceWrite({
      area: "context",
      relative_path: "status.md",
      content: "ready",
    })) as Record<string, unknown>;

    expect(result).toMatchObject({ area: "context", relative_path: "status.md", overwrite: false });
    expect(JSON.stringify(result)).not.toContain("master-dropbox-token");
  });
});
