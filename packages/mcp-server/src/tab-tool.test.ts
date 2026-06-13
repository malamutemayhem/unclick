import { afterEach, describe, expect, it, vi } from "vitest";
import { getTabMeetings } from "./tab-tool.js";

// L2 resilience contract for the TAB connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("tab connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await getTabMeetings({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await getTabMeetings({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getTabMeetings({ race_type: "X" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/race_type/i);
  });

  it("maps meeting listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (h: string): string | null => h.toLowerCase() === "content-type" ? "application/json" : null },
      json: async () => ({ meetings: [{ raceType: "R", meetingId: "m1", meetingName: "Flemington", races: [] }] }),
    })));
    const result = await getTabMeetings({ race_type: "R" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
  });
});
