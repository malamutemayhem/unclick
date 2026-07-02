import { describe, it, expect, vi, afterEach } from "vitest";
import { poetrySearchByAuthor, poetrySearchByTitle, poetryRandom } from "./poetrydb-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("poetrydb-tool", () => {
  it("poetrySearchByAuthor returns poems", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ title: "Sonnet 18", author: "William Shakespeare", lines: ["Shall I compare thee..."] }]),
    }));
    const r = await poetrySearchByAuthor({ author: "Shakespeare" }) as Record<string, unknown>;
    expect(r.poems).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("poetrySearchByAuthor requires author", async () => {
    const r = await poetrySearchByAuthor({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("poetrySearchByTitle returns poems", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ title: "The Raven", author: "Edgar Allan Poe", lines: ["Once upon a midnight..."] }]),
    }));
    const r = await poetrySearchByTitle({ title: "The Raven" }) as Record<string, unknown>;
    expect(r.poems).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("poetryRandom returns a poem", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ title: "Random Poem", author: "Someone", lines: ["A line."] }]),
    }));
    const r = await poetryRandom({}) as Record<string, unknown>;
    expect(r.poems).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
