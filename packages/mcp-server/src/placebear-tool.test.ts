import { describe, it, expect } from "vitest";
import { placebearImage } from "./placebear-tool.js";

describe("placebear-tool", () => {
  it("placebearImage returns image URL", async () => {
    const r = await placebearImage({ width: 400, height: 300 }) as Record<string, unknown>;
    expect(r.image_url).toBe("https://placebear.com/400/300");
    expect(r.width).toBe(400);
    expect(r.height).toBe(300);
    expect(r.unclick_meta).toBeDefined();
  });

  it("placebearImage defaults to 300x300", async () => {
    const r = await placebearImage({}) as Record<string, unknown>;
    expect(r.image_url).toBe("https://placebear.com/300/300");
  });
});
