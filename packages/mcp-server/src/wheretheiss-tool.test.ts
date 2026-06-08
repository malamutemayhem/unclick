import { describe, it, expect, vi, afterEach } from "vitest";
import { issPosition, issPassTimes } from "./wheretheiss-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("wheretheiss-tool", () => {
  it("issPosition returns ISS location", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ name: "iss", id: 25544, latitude: 41.5, longitude: -73.2, altitude: 408.5, velocity: 27580.1 }),
    }));
    const r = await issPosition({}) as Record<string, unknown>;
    expect(r.latitude).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("issPassTimes returns position with observer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ latitude: 41.5, longitude: -73.2 }]),
    }));
    const r = await issPassTimes({ latitude: 40.71, longitude: -74.01 }) as Record<string, unknown>;
    expect(r.position).toBeDefined();
    expect(r.observer).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("issPassTimes requires coordinates", async () => {
    const r = await issPassTimes({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
