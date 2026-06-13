import { describe, it, expect, vi, afterEach } from "vitest";
import { circlCveLookup, circlCveRecent } from "./cvecircl-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("cvecircl-tool", () => {
  it("circlCveLookup returns CVE details", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ id: "CVE-2024-1234", summary: "A vulnerability", cvss: 7.5 }),
    }));
    const r = await circlCveLookup({ cve_id: "CVE-2024-1234" }) as Record<string, unknown>;
    expect(r.id).toBe("CVE-2024-1234");
    expect(r.unclick_meta).toBeDefined();
  });

  it("circlCveRecent returns recent CVEs", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ id: "CVE-2024-5678", summary: "Recent vuln" }],
    }));
    const r = await circlCveRecent({}) as Record<string, unknown>;
    expect(r.cves).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing CVE ID", async () => {
    const r = await circlCveLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/cve_id/i);
  });
});
