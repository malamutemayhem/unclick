import { describe, it, expect } from "vitest";
import { aspectRatio } from "./aspectratio-tool.js";

describe("aspectratio-tool", () => {
  it("calculates 16:9 ratio", async () => {
    const r = await aspectRatio({ width: 1920, height: 1080 }) as Record<string, unknown>;
    expect(r.ratio).toBe("16:9");
    expect(r.name).toMatch(/widescreen/i);
    expect(r.is_landscape).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });

  it("calculates 1:1 square", async () => {
    const r = await aspectRatio({ width: 500, height: 500 }) as Record<string, unknown>;
    expect(r.ratio).toBe("1:1");
    expect(r.is_square).toBe(true);
  });

  it("handles portrait", async () => {
    const r = await aspectRatio({ width: 1080, height: 1920 }) as Record<string, unknown>;
    expect(r.ratio).toBe("9:16");
    expect(r.is_portrait).toBe(true);
  });

  it("rejects missing dimensions", async () => {
    const r = await aspectRatio({}) as Record<string, unknown>;
    expect(r.error).toMatch(/width/i);
  });
});
