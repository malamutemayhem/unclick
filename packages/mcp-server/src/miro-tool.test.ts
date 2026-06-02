import { afterEach, describe, expect, it, vi } from "vitest";
import { miroListBoards, miroGetBoard } from "./miro-tool.js";

describe("miro connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(miroListBoards({ access_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(miroListBoards({ access_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("MIRO_ACCESS_TOKEN", ""); const r = await miroListBoards({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates board_id", async () => { const r = await miroGetBoard({ access_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/board_id is required/i); });
  it("stamps", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) }))); const r = await miroListBoards({ access_token: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Miro/); });
});
