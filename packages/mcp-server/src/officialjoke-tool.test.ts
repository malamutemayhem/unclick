import { describe, it, expect, vi, afterEach } from "vitest";
import { officialJokeRandom, officialJokeByType, officialJokeTen } from "./officialjoke-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("officialjoke-tool", () => {
  it("officialJokeRandom returns a joke", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ type: "general", setup: "Why did the chicken?", punchline: "To get to the other side." }),
    }));
    const r = await officialJokeRandom({}) as Record<string, unknown>;
    expect(r.setup).toBeDefined();
    expect(r.punchline).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("officialJokeByType returns typed jokes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ type: "programming", setup: "Why do programmers?", punchline: "Because." }]),
    }));
    const r = await officialJokeByType({ type: "programming" }) as Record<string, unknown>;
    expect(r.jokes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("officialJokeTen returns 10 jokes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => (Array.from({ length: 10 }, (_, i) => ({ id: i, setup: `Q${i}`, punchline: `A${i}` }))),
    }));
    const r = await officialJokeTen({}) as Record<string, unknown>;
    expect(r.jokes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
