import { describe, expect, it } from "vitest";
import { dummyImageUrl } from "./dummyimage-tool.js";

describe("dummyimage connector (L2)", () => {
  it("returns a URL with default dimensions", async () => {
    const r = await dummyImageUrl({}) as Record<string, unknown>;
    expect(r.url).toContain("dummyimage.com/600x400");
    expect(r.unclick_meta).toBeDefined();
  });

  it("respects custom dimensions and colors", async () => {
    const r = await dummyImageUrl({ width: 200, height: 100, bg_color: "ff0000", fg_color: "ffffff" }) as Record<string, unknown>;
    expect(r.url).toContain("200x100/ff0000/ffffff");
  });

  it("includes text in the URL", async () => {
    const r = await dummyImageUrl({ text: "Hello World" }) as Record<string, unknown>;
    expect(r.url).toContain("Hello");
  });
});
