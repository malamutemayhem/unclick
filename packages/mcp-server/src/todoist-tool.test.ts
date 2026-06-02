import { afterEach, describe, expect, it, vi } from "vitest";
import { todoistListProjects, todoistCreateTask } from "./todoist-tool.js";

describe("todoist connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" }))); await expect(todoistListProjects({ api_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(todoistListProjects({ api_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("TODOIST_API_TOKEN", ""); const r = await todoistListProjects({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates content", async () => { const r = await todoistCreateTask({ api_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/content is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => "[]" }))); const r = await todoistListProjects({ api_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Todoist/); });
});
