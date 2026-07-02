import { describe, it, expect, vi, afterEach } from "vitest";
import { articSearchArtworks, articGetArtwork } from "./artic-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("artic-tool", () => {
  it("articSearchArtworks returns artworks", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ id: 27992, title: "A Sunday on La Grande Jatte", artist_display: "Georges Seurat" }] }),
    }));
    const r = await articSearchArtworks({ query: "seurat" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("articSearchArtworks requires query", async () => {
    const r = await articSearchArtworks({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("articGetArtwork returns artwork detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { id: 27992, title: "A Sunday on La Grande Jatte", artist_display: "Georges Seurat" } }),
    }));
    const r = await articGetArtwork({ id: 27992 }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
