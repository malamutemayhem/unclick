import { describe, it, expect, vi, afterEach } from "vitest";
import { openfigiMapping, openfigiSearch } from "./openfigi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openfigi-tool", () => {
  it("maps a ticker to FIGI", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ data: [{ figi: "BBG000B9XRY4", name: "APPLE INC", exchCode: "US" }] }]),
    }));
    const r = await openfigiMapping({ id_type: "TICKER", id_value: "AAPL" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("searches instruments", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ figi: "BBG000B9XRY4", name: "APPLE INC" }] }),
    }));
    const r = await openfigiSearch({ query: "Apple" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing id_value", async () => {
    const r = await openfigiMapping({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id_value/i);
  });
});
