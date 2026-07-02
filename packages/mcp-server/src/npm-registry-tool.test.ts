import { describe, it, expect, vi, afterEach } from "vitest";
import { npmSearch, npmGetPackage } from "./npm-registry-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("npm-registry-tool", () => {
  it("npmSearch returns packages", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ objects: [{ package: { name: "express", version: "4.18.2" } }] }),
    }));
    const r = await npmSearch({ query: "express" }) as Record<string, unknown>;
    expect(r.objects).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("npmGetPackage returns package detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ name: "express", version: "4.18.2", description: "Web framework" }),
    }));
    const r = await npmGetPackage({ name: "express" }) as Record<string, unknown>;
    expect(r.name).toBe("express");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await npmSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
