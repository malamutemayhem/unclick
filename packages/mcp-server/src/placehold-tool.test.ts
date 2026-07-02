import { describe, it, expect } from "vitest";
import { placeholdImage } from "./placehold-tool.js";

describe("placehold-tool", () => {
  it("builds placeholder image URL with defaults", async () => {
    const r = await placeholdImage({}) as Record<string, unknown>;
    expect(String(r.image_url)).toContain("placehold.co/300x300");
    expect(r.unclick_meta).toBeDefined();
  });

  it("builds URL with custom size and text", async () => {
    const r = await placeholdImage({ width: 600, height: 400, text: "Hello" }) as Record<string, unknown>;
    expect(String(r.image_url)).toContain("600x400");
    expect(String(r.image_url)).toContain("text=Hello");
    expect(r.unclick_meta).toBeDefined();
  });
});
