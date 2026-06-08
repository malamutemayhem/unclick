import { describe, it, expect, vi, afterEach } from "vitest";
import { rdapDomain, rdapIp } from "./rdap-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("rdap-tool", () => {
  it("rdapDomain returns registration data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ objectClassName: "domain", ldhName: "example.com" }),
    }));
    const r = await rdapDomain({ domain: "example.com" }) as Record<string, unknown>;
    expect(r.ldhName).toBe("example.com");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rdapIp returns IP info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ objectClassName: "ip network", handle: "NET-8-8-8-0-1" }),
    }));
    const r = await rdapIp({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.handle).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing domain", async () => {
    const r = await rdapDomain({}) as Record<string, unknown>;
    expect(r.error).toMatch(/domain/i);
  });
});
