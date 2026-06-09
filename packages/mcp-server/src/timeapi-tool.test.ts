import { describe, it, expect, vi, afterEach } from "vitest";
import { timeApiCurrentByZone, timeApiTimezones } from "./timeapi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("timeapi-tool", () => {
  it("timeApiCurrentByZone returns current time", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ dateTime: "2024-06-08T12:00:00", timeZone: "America/New_York" }),
    }));
    const r = await timeApiCurrentByZone({ timezone: "America/New_York" }) as Record<string, unknown>;
    expect(r.dateTime).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("timeApiTimezones returns timezone list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ["America/New_York", "Europe/London", "Asia/Tokyo"],
    }));
    const r = await timeApiTimezones({}) as Record<string, unknown>;
    expect(r.timezones).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
