import { afterEach, describe, expect, it, vi } from "vitest";
import { uptimerobotGetMonitors } from "./uptimerobot-tool.js";
describe("uptimerobot (L2/L4/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(uptimerobotGetMonitors({ api_key: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(uptimerobotGetMonitors({ api_key: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("UPTIMEROBOT_API_KEY", ""); const r = await uptimerobotGetMonitors({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("errors on stat fail", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ stat: "fail", error: { message: "bad key" } }) }))); await expect(uptimerobotGetMonitors({ api_key: "k" })).rejects.toThrow(/bad key/i); });
  it("stamps + safe no-op signal when a monitor is down", async () => { vi.stubEnv("UNCLICK_API_KEY", ""); vi.stubEnv("UNCLICK_API_KEY_HASH", ""); vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ stat: "ok", monitors: [{ status: 9, friendly_name: "Site" }] }) }))); const r = await uptimerobotGetMonitors({ api_key: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/UptimeRobot/); });
});
