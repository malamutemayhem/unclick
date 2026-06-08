import { describe, it, expect, vi, afterEach } from "vitest";
import { ukPoliceForces, ukPoliceCrimes } from "./ukpolice-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("ukpolice-tool", () => {
  it("ukPoliceForces returns forces list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ id: "metropolitan", name: "Metropolitan Police Service" }],
    }));
    const r = await ukPoliceForces({}) as Record<string, unknown>;
    expect(r.forces).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("ukPoliceCrimes returns crimes at location", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ category: "burglary", month: "2024-01" }],
    }));
    const r = await ukPoliceCrimes({ latitude: 51.5, longitude: -0.1 }) as Record<string, unknown>;
    expect(r.crimes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("ukPoliceCrimes rejects missing coords", async () => {
    const r = await ukPoliceCrimes({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
