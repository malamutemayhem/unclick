import { describe, it, expect, vi, afterEach } from "vitest";
import { openchargemapSearch } from "./openchargemap-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openchargemap-tool", () => {
  it("openchargemapSearch returns stations", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ ID: 1, AddressInfo: { Title: "Station 1", Latitude: 51.5, Longitude: -0.1 } }],
    }));
    const r = await openchargemapSearch({ latitude: 51.5, longitude: -0.1 }) as Record<string, unknown>;
    expect(r.stations).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coordinates", async () => {
    const r = await openchargemapSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
