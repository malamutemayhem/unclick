import { describe, it, expect, vi, afterEach } from "vitest";
import { bgpviewAsn, bgpviewAsnPrefixes, bgpviewIp } from "./bgpview-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("bgpview-tool", () => {
  it("bgpviewAsn returns ASN details", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { asn: 13335, name: "CLOUDFLARENET", description_short: "Cloudflare" } }),
    }));
    const r = await bgpviewAsn({ asn: "13335" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("bgpviewAsnPrefixes returns prefixes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { ipv4_prefixes: [{ prefix: "1.1.1.0/24" }] } }),
    }));
    const r = await bgpviewAsnPrefixes({ asn: "13335" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("bgpviewIp returns IP info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { ip: "1.1.1.1", ptr_record: "one.one.one.one" } }),
    }));
    const r = await bgpviewIp({ ip: "1.1.1.1" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing ASN", async () => {
    const r = await bgpviewAsn({}) as Record<string, unknown>;
    expect(r.error).toMatch(/asn/i);
  });
});
