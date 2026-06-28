import { afterEach, describe, expect, it, vi } from "vitest";
import { WORKSPACE_VISIBLE_TOOLS, handleWorkspaceTool, isWorkspaceTool } from "./workspace-tool.js";

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.UNCLICK_API_KEY;
  delete process.env.UNCLICK_SITE_URL;
});

describe("WORKSPACE_VISIBLE_TOOLS", () => {
  it("exposes put, push, list with the right required fields", () => {
    expect(WORKSPACE_VISIBLE_TOOLS.map((t) => t.name)).toEqual([
      "workspace_put",
      "workspace_push",
      "workspace_list",
    ]);
    const push = WORKSPACE_VISIBLE_TOOLS.find((t) => t.name === "workspace_push")!;
    expect(push.inputSchema.required).toEqual(["workspace_id", "owner", "repo", "branch"]);
  });
});

describe("isWorkspaceTool", () => {
  it("matches only workspace tools", () => {
    expect(isWorkspaceTool("workspace_put")).toBe(true);
    expect(isWorkspaceTool("save_fact")).toBe(false);
  });
});

describe("handleWorkspaceTool", () => {
  it("returns null for non-workspace tools so the caller falls through", async () => {
    expect(await handleWorkspaceTool("save_fact", {})).toBeNull();
  });

  it("errors clearly when no api key is present", async () => {
    const r = await handleWorkspaceTool("workspace_list", { workspace_id: "w" });
    expect(r?.isError).toBe(true);
    expect(r?.content[0].text).toContain("No UnClick API key");
  });

  it("proxies workspace_put as POST ?action=put with the args as the body", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_SITE_URL = "https://unclick.world";
    const calls: Array<{ url: string; init: { method: string; headers: Record<string, string>; body: string } }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: { method: string; headers: Record<string, string>; body: string }) => {
        calls.push({ url, init });
        return { ok: true, status: 200, json: async () => ({ workspace_id: "w1", seq: 0, bytes: 4 }) };
      }),
    );
    const r = await handleWorkspaceTool("workspace_put", { path: "a.ts", content: "AAAA" });
    expect(r?.isError).toBeFalsy();
    expect(calls[0].url).toBe("https://unclick.world/api/workspace?action=put");
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.headers.Authorization).toBe("Bearer uc_test");
    expect(JSON.parse(calls[0].init.body)).toEqual({ path: "a.ts", content: "AAAA" });
    expect(r?.content[0].text).toContain("w1");
  });

  it("proxies workspace_list as GET with the workspace_id url-encoded", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        calls.push(url);
        return { ok: true, status: 200, json: async () => ({ files: [] }) };
      }),
    );
    await handleWorkspaceTool("workspace_list", { workspace_id: "w 1" });
    expect(calls[0]).toBe("https://unclick.world/api/workspace?workspace_id=w%201");
  });

  it("surfaces a non-ok response as isError", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 400, json: async () => ({ error: "bad" }) })));
    const r = await handleWorkspaceTool("workspace_push", { workspace_id: "w", owner: "o", repo: "r", branch: "b" });
    expect(r?.isError).toBe(true);
  });
});
