import { describe, it, expect, vi, afterEach } from "vitest";
import { languagetoolCheck, languagetoolLanguages } from "./languagetool-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("languagetool-tool", () => {
  it("languagetoolCheck returns grammar issues", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ matches: [{ message: "Possible spelling mistake", offset: 0, length: 4 }] }),
    }));
    const r = await languagetoolCheck({ text: "Ths is a test" }) as Record<string, unknown>;
    expect(r.matches).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("languagetoolLanguages returns language list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ name: "English", code: "en", longCode: "en-US" }],
    }));
    const r = await languagetoolLanguages({}) as Record<string, unknown>;
    expect(r.languages).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing text", async () => {
    const r = await languagetoolCheck({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
