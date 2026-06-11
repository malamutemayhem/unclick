import { describe, it, expect, vi, afterEach } from "vitest";
import { openskyStates, openskyFlights } from "./opensky-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("opensky-tool", () => {
  it("openskyStates returns aircraft states", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ time: 1717800000, states: [["abc123", "UAL123", "United States"]] }),
    }));
    const r = await openskyStates({}) as Record<string, unknown>;
    expect(r.states).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("openskyFlights returns flight data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ icao24: "abc123", estDepartureAirport: "KJFK" }],
    }));
    const r = await openskyFlights({ begin: 1717800000, end: 1717807200 }) as Record<string, unknown>;
    expect(r.flights).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing timestamps", async () => {
    const r = await openskyFlights({}) as Record<string, unknown>;
    expect(r.error).toMatch(/begin/i);
  });
});
