import { describe, it, expect, vi, afterEach } from "vitest";
import { pypiGetPackage, pypiGetVersion } from "./pypi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("pypi-tool", () => {
  it("pypiGetPackage returns package info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ info: { name: "requests", version: "2.31.0", summary: "HTTP library" } }),
    }));
    const r = await pypiGetPackage({ name: "requests" }) as Record<string, unknown>;
    expect(r.info).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("pypiGetVersion returns version info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ info: { name: "requests", version: "2.28.0" } }),
    }));
    const r = await pypiGetVersion({ name: "requests", version: "2.28.0" }) as Record<string, unknown>;
    expect(r.info).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing name", async () => {
    const r = await pypiGetPackage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
