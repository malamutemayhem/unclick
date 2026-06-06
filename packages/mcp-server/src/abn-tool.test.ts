import { afterEach, describe, expect, it, vi } from "vitest";

import { abnLookup, abnSearch } from "./abn-tool.js";

// Colocated ABN (ABR Lookup) connector tests. Exercise the L2 (resilience) behaviour.

describe("abn connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "20" : null) },
    })));
    await expect(abnLookup({ abn: "51824753556" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 20s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(abnLookup({ abn: "51824753556" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when abn is missing", async () => {
    const r = await abnLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/abn is required/i);
  });

  it("parses the JSONP payload", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => 'callback({"Abn":"51824753556","EntityName":"Test Co Pty Ltd","AbnStatus":"Active"})',
    })));
    const r = await abnLookup({ abn: "51 824 753 556" }) as Record<string, any>;
    expect(r.abn).toBe("51824753556");
    expect(r.entity_name).toBe("Test Co Pty Ltd");
  });

  it("threads the shared server-side GUID into the lookup URL and parses string trading names", async () => {
    vi.stubEnv("ABN_GUID", "server-side-guid");
    let captured = "";
    vi.stubGlobal("fetch", vi.fn(async (u: string) => {
      captured = String(u);
      return {
        ok: true,
        status: 200,
        text: async () =>
          'callback({"Abn":"51824753556","EntityName":"Test Co Pty Ltd","AbnStatus":"Active","BusinessName":["Trading One","Trading Two"]})',
      };
    }));
    const r = await abnLookup({ abn: "51824753556" }) as Record<string, any>;
    expect(captured).toContain("AbnDetails.aspx");
    expect(captured).toContain("guid=server-side-guid");
    // BusinessName arrives as an array of plain strings, not objects.
    expect(r.business_names).toEqual(["Trading One", "Trading Two"]);
  });

  it("does NOT add a guid when none is configured (public, key-free fallback)", async () => {
    let captured = "";
    vi.stubGlobal("fetch", vi.fn(async (u: string) => {
      captured = String(u);
      return { ok: true, status: 200, text: async () => 'callback({"Abn":"51824753556","EntityName":"X"})' };
    }));
    await abnLookup({ abn: "51824753556" });
    expect(captured).not.toContain("guid=");
  });

  it("abn_search uses the MatchingNames endpoint with the GUID and parses results", async () => {
    vi.stubEnv("ABN_GUID", "server-side-guid");
    let captured = "";
    vi.stubGlobal("fetch", vi.fn(async (u: string) => {
      captured = String(u);
      return {
        ok: true,
        status: 200,
        text: async () =>
          'callback({"Names":[{"Abn":"51824753556","Name":"Australian Taxation Office","NameType":"Entity Name","AbnStatus":"Active","IsCurrent":true,"State":"ACT","Postcode":"2600","Score":100}]})',
      };
    }));
    const r = await abnSearch({ name: "australian taxation office" }) as Record<string, any>;
    expect(captured).toContain("MatchingNames.aspx");
    expect(captured).toContain("guid=server-side-guid");
    expect(captured).toContain("maxResults=");
    expect(r.count).toBe(1);
    expect(r.results[0].abn).toBe("51824753556");
    expect(r.results[0].name).toBe("Australian Taxation Office");
  });
});
