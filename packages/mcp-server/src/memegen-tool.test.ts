import { describe, it, expect, vi, afterEach } from "vitest";
import { memegenTemplates, memegenCreate } from "./memegen-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("memegen-tool", () => {
  it("memegenTemplates returns templates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ id: "fry", name: "Futurama Fry" }],
    }));
    const r = await memegenTemplates({}) as Record<string, unknown>;
    expect(r.templates).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("memegenCreate builds URL with template and text", async () => {
    const r = await memegenCreate({ template: "doge", top_text: "such test", bottom_text: "very pass" }) as Record<string, unknown>;
    expect(r.image_url).toBeDefined();
    expect(String(r.image_url)).toContain("doge");
    expect(r.unclick_meta).toBeDefined();
  });
});
