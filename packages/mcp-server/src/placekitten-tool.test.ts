import { describe, expect, it } from "vitest";
import { placeholderImage, placekittenImage } from "./placekitten-tool.js";

describe("placekitten connector (L2)", () => {
  it("placeholderImage returns a URL without fetch", async () => {
    const r = await placeholderImage({ width: 400, height: 300, text: "Hello" }) as Record<string, unknown>;
    expect(r.url).toContain("placehold.co/400x300");
    expect(r.url).toContain("Hello");
    expect(r.unclick_meta).toBeDefined();
  });

  it("placekittenImage returns a URL without fetch", async () => {
    const r = await placekittenImage({ width: 500, height: 350 }) as Record<string, unknown>;
    expect(r.url).toContain("placekitten.com/500/350");
    expect(r.unclick_meta).toBeDefined();
  });

  it("placekittenImage supports grayscale", async () => {
    const r = await placekittenImage({ width: 200, height: 200, grayscale: true }) as Record<string, unknown>;
    expect(r.url).toContain("placekitten.com/g/200/200");
  });
});
