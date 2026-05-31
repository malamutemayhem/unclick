import { afterEach, describe, expect, it, vi } from "vitest";
import { figmaGetFile } from "./figma-tool.js";

// L2 resilience contract for the Figma connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("figma connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(figmaGetFile({ personal_access_token: "t", file_key: "f" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(figmaGetFile({ personal_access_token: "t", file_key: "f" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(figmaGetFile({ personal_access_token: "t" })).rejects.toThrow(/file_key/i);
  });

  it("maps file responses without surfacing an error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ name: "Design System", lastModified: "2026-01-01", document: { id: "0:0", children: [] } }),
    })));
    const result = await figmaGetFile({ personal_access_token: "t", file_key: "f" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
    expect(result.name).toBe("Design System");
  });
});
